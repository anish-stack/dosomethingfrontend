import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './checkout.css'
import Metadata from '../componetns/layout/home/componetns/layout/Metadata';
import Loader from '../Loder/loder';
import { useSelector } from 'react-redux';
function OrderForm() {
  const [loading, setLoading] = useState(true);
  const UserId = useSelector(state => state.auth.loginData?._id);
  const name = useSelector(state => state.auth.loginData?.name);
  const phoneNumber = useSelector(state => state.auth.loginData?.contactNumber);
  
  console.log(UserId)
  setTimeout(() => {
      setLoading(false);
    }, 3000);
  const deliveryFee = 50; // Delivery fee in your currency

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cartItemsParam = searchParams.get('cartItems');
  const cartItems = cartItemsParam ? JSON.parse(decodeURIComponent(cartItemsParam)) : [];



  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // cartItems.forEach(item => {
  //   console.log("id:", item.id);
  // });  
  const [formDataList, setFormDataList] = useState({
    name,
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phoneNumber,
    user:UserId,
    products: cartItems.map(item => ({
      product: item.id,
      name: item.name,
      price: item.price,
      image: item.productImg,
      quantity: item.quantity,
    })),
  
    itemsPrice: calculateSubtotal(),
    shippingPrice: deliveryFee,
    totalPrice: calculateSubtotal() + deliveryFee // Adjust as needed
  });
  const handleSubmit = () => {

    const dataToStore = {
      formDataList,
      cartItems,
    };

    // Store data in localStorage
    localStorage.setItem('checkoutData', JSON.stringify(dataToStore));

 window.location.href = `/stripe-payment-page`
  };


  return (
    <div className="container">
        {loading && <Loader />}
               <Metadata title="Register" />
    <div className="cart-items">
      <h2 className="section-heading">Your Order</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.productImg[0]} alt={item.name} className="item-image" />
          <div className="item-details">
            <p className="item-name">{item.name}</p>
            <p className="item-price">Rs {item.price}</p>
            <p className="item-quantity">Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="forms-container">
        <div className="form-section">
          <h1 className="section-heading">Order Form</h1>
          <form className="order-form">
      <label htmlFor="address">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          contentEditable="false"
          value={formDataList.name}
          onChange={(e) => setFormDataList({ ...formDataList, name: e.target.value })}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formDataList.address}
          onChange={(e) => setFormDataList({ ...formDataList, address: e.target.value })}
          required
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formDataList.city}
          onChange={(e) => setFormDataList({ ...formDataList, city: e.target.value })}
          required
        />
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formDataList.state}
          onChange={(e) => setFormDataList({ ...formDataList, state: e.target.value })}
          required
        />
        <label htmlFor="pinCode">Pin Code:</label>
        <input
          type="text"
          id="pinCode"
          name="pinCode"
          value={formDataList.pinCode}
          onChange={(e) => setFormDataList({ ...formDataList, pinCode: e.target.value })}
          required
        />
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formDataList.country}
          onChange={(e) => setFormDataList({ ...formDataList, country: e.target.value })}
          required
        />
        <label htmlFor="phoneNo">Phone Number:</label>
        <input
          type="text"
          id="phoneNo"
          name="phoneNo"
          value={phoneNumber}
          onChange={(e) => setFormDataList({ ...formDataList, phoneNo: e.target.value })}
          required
        />
   
      </form>
      <button  onClick={handleSubmit}>Checkout</button>    </div>
    </div>
    </div>
  )
}

export default OrderForm;
