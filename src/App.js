import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Headers from "./componetns/layout/headers";
import { ProductProvider } from "./componetns/layout/home/componetns/layout/Products/productContext";
import Footer from "./componetns/layout/footer/footer";
import ShoppingCart from "./cart/cart";
import LoginForm from "./componetns/layout/authentication/login";
// import User from "./user/user";
import UserDetail from "./componetns/layout/authentication/userDtail";
import CheckoutPage from "./cheheckout/checkout";
import StripeForm from "./cheheckout/stripe";
import axios from "axios";
import SuccessPage from "./paymentSuccess/Success";
import PaymentForm from "./cheheckout/stripe";
import ProfilePage from "./profile/user";
import Loader from "./Loder/loder";
import ForgetPassword from "./componetns/layout/authentication/forget";

const Home = lazy(() => import("./componetns/layout/home/home"));
const SingleProduct = lazy(() =>
  import("./componetns/layout/home/componetns/layout/singleProduct")
);
const Cate = lazy(() => import("./componetns/layout/category/cate"));
const Contact = lazy(() => import("./componetns/about/contact"));
const LongProduct = lazy(() => import("./productss/product"));
const RegisterForm = lazy(() =>
  import("./componetns/layout/authentication/register")
);
const About = lazy(() => import("./componetns/about/about"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedDataExists = localStorage.length > 2;

    if (storedDataExists) {
      setTimeout(() => {
        setLoading(false);
        localStorage.clear(); // Clear all data in localStorage after 10 seconds
        window.location.href = "/login"; // Redirect to login page
      },  30 * 60 * 1000); // 10 seconds in milliseconds
    } else {
      setLoading(false);
    }
  }, []);





  setTimeout(() => {
    setLoading(false);
  }, 3000);
  const [cartItems, setCartItems] = useState([]);
  const [stripeApiKey, setStripeApiKey] = useState(null);

  async function getStripeKey() {
    try {
      const { data } = await axios.get(
        "https://dosomethingbackend-anish-stack.vercel.app/stripeapikey"
      );
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    getStripeKey();
  }, []);

  // Return loading state if API key is not fetched
  if (!stripeApiKey) {
    return <div> {loading && <Loader />}</div>;
  }

  return (
    <Router>
      <ProductProvider>
        <div>
          <Headers />
          <Suspense fallback={<div> {loading && <Loader />}</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/product/:productId"
                element={
                  <SingleProduct
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <ShoppingCart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                }
              />
              <Route path="/Category" element={<Cate />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/LongProduct" element={<LongProduct />} />

              <Route path="/About" element={<About />} />
              {/* <Route path="/userInfo" element={<User />} /> */}
              <Route path="/detail" element={<UserDetail />}></Route>
              <Route path="/checkout" element={<CheckoutPage />}></Route>

              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/StripeForm"
                element={<StripeForm stripeApiKey={stripeApiKey} />}
              />
              <Route path="/stripe-payment-page" Component={PaymentForm} />

              <Route path="/Success" element={<SuccessPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
    

            </Routes>
          </Suspense>
          <Footer />
        </div>
      </ProductProvider>
    </Router>
  );
}

export default App;
