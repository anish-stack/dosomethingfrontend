import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../redux/cartReducer";
import {
  CardNumberElement,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../componetns/layout/home/componetns/layout/Metadata";
import "./stipe.css"
function PaymentForm() {
  const UserId = useSelector(state => state.auth.loginData?._id);
  const Useremail = useSelector(state => state.auth.loginData?.email);
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const dispatch = useDispatch();
  
  if(!UserId){
    toast.error("please login To checkoute")
    // setTimeout(()=>{
    //   window.location.href="/login"
    // },3000)
  }

  console.log(UserId)
  const [loadedData, setLoadedData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const token = useSelector((state) => state.auth.token);



  useEffect(() => {
    const formData = localStorage.getItem("checkoutData");
    if (formData) {
      const parsedData = JSON.parse(formData);
      setLoadedData(parsedData);

      if (parsedData.formDataList) {
        const itemsPrice = parsedData.formDataList.itemsPrice;
        const shippingPrice = 50; // Assuming you want to add a fixed shipping price
        const calculatedTotalPrice = itemsPrice + shippingPrice;
        setTotalPrice(calculatedTotalPrice);
      }
      if (!parsedData.cartItems || parsedData.cartItems.length === 0) {
        toast.error("No cart items found.");
      }
    }
  }, []);

  useEffect(() => {
    // Calculate the total price based on cart items
    const itemsPrice = cartItems.reduce((total, item) => total + item.price, 0);
    const shippingPrice = 50; // Assuming you want to add a fixed shipping price
    const calculatedTotalPrice = itemsPrice + shippingPrice;
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  const handleAddToCart = (item) => {
    // Dispatch an action to add an item to the cart
    dispatch(addToCart(item));
  };
  useEffect(() => {
    async function fetchClientSecret() {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.post(
            "https://dosomethingbackend-anish-stack.vercel.app/payment/process",
            {
              amount: parseFloat(totalPrice) * 100, // Convert to cents
            },
            config
          );
          setClientSecret(response.data.client_secret);
        } catch (error) {
          console.error("Error fetching client secret:", error.message);
        }
      } else {
        toast.error("Please login first For Checkout");
      }
    }
    fetchClientSecret();
  }, [totalPrice, token]);

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);

    if (error.code === "payment_intent_authentication_failure") {
      toast.error("Payment failed due to authentication failure.");
    } else if (error.code === "card_declined") {
      if (error.decline_code === "insufficient_funds") {
        toast.error("Payment failed due to insufficient funds.");
      } else if (error.decline_code === "incorrect_cvc") {
        toast.error("Incorrect CVV.");
      } else {
        toast.error("Payment declined. Reason: " + error.decline_code);
      }
    } else {
      toast.error("Payment failed: " + error.message);
    }
  };

  const handlePaymentSuccess = async (paymentIntent, UserId) => {
    console.log("Payment succeeded:", paymentIntent.id);
    setPaymentSuccess(true);

    const currentDate = new Date();
    const formattedPaidAt = currentDate.toISOString();

    if (!UserId) {
      console.log("User ID is not available yet.");
    } else {
      const paymentData = {
        shippingInfo: {
          address: loadedData.formDataList.address,
          city: loadedData.formDataList.city,
          country: loadedData.formDataList.country,
          pinCode:loadedData.formDataList.pinCode,
          state:loadedData.formDataList.state
        },
        userInfo: {  // Use lowercase keys here
          userId: UserId,     // Use uppercase keys here
          UserEmail: Useremail, // Use uppercase keys here
        },
        orderItems: loadedData.cartItems,
        orderStatus: "Processing",
        paidAt: formattedPaidAt,
        totalPrice: loadedData.formDataList.totalPrice,
        shippingPrice: loadedData.formDataList.shippingPrice,
        taxPrice: loadedData.formDataList.taxPrice,
        itemsPrice: loadedData.formDataList.itemsPrice,
     
        paymentInfo: {
          id: paymentIntent.id,
          status: paymentIntent.status,
        },
      };

      if (!paymentData.orderItems) {
        console.log("No order items to save.");
      } else {
        await saveData(paymentData);
        localStorage.removeItem("checkoutData");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    event.target.disabled = true;
    const cardElement = elements.getElement(CardNumberElement);

    try {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email,
            name,
            address: {
              line1: loadedData.formDataList.address,
            },
          },
        },
        setup_future_usage: "off_session",
      });

      if (paymentResult.error) {
        handlePaymentError(paymentResult.error);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        handlePaymentSuccess(paymentResult.paymentIntent, UserId);
      }
    } catch (error) {
      handlePaymentError(error);
    } finally {
      event.target.disabled = false;
    }
  };

  const saveData = async (paymentData) => {
    try {
      const response = await axios.post(
        "https://dosomethingbackend-anish-stack.vercel.app/order/new",
        paymentData
      );
  
      if (response.status === 201) {
        console.log("Data is saved and sent successfully", response);
  
        // Redirect here
        console.log("Payment succeeded. Redirecting...");
        const paymentDetails = {
          amount: totalPrice,
          email,
          name,
          address: loadedData.formDataList.address,
          // Add more payment details as needed
        };
  
        const queryString = new URLSearchParams(paymentDetails).toString();
        window.location.href = `/Success?${queryString}`;
      } else {
        console.log("Data was not saved successfully", response);
        // Handle the case where the data was not saved successfully
      }
    } catch (error) {
      toast.error("Error", error.message);
      console.error("Error", error);
    }
  };
  

  

  return (
    <div className="payment-form-container">
      <Metadata title="payment-page" />
      <form onSubmit={handleSubmit} className="payment-form">
        <label className="payment-form-label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="payment-form-input"chrome
          />
        </label>
        <label className="payment-form-label">
          Address
          <input
            type="text"
            value={loadedData?.formDataList.address || ""}
            className="payment-form-input"
          />
        </label>
        <label className="payment-form-label">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="payment-form-input"
          />
        </label>
        <label className="payment-form-label">
          Card Number
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff', // Set the text color to white
                  '::placeholder': {
                    color: '#A9A9A9',
                  },
                },
              },
            }}
            className="payment-form-input stripe-input"
          />
        </label>
        <label className="payment-form-label">
          Expiration Date
          <CardExpiryElement
           options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff', // Set the text color to white
                '::placeholder': {
                  color: '#A9A9A9',
                },
              },
            },
          }}
            className="payment-form-input stripe-input"
          />
        </label>
        <label className="payment-form-label">
          CVC
          <CardCvcElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff', // Set the text color to white
                  '::placeholder': {
                    color: '#A9A9A9',
                  },
                },
              },
            }}
            className="payment-form-input stripe-input"
          />
        </label>
        <button
          type="submit"
          disabled={!stripe}
          className="payment-form-button"
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
