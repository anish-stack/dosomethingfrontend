import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginSuccess } from "../../../redux/action";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../../App.css'
import "./login.css"
import Metadata from "../home/componetns/layout/Metadata";
import { Link } from "react-router-dom";
const LoginForm = ({dispatchLoginSuccess}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false); // Initially not logged in

  useEffect(() => {
    // Check if a token is present in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://dosomethingbackend-anish-stack.vercel.app/loginUserTest", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const loginData = response.data.login;
      // Assuming response.data.login.avatar contains the avatar URL
const avatar = response.data.login.avatar;
localStorage.setItem('avatar', avatar);

        console.log(avatar)

        // Dispatch the loginSuccess action to store token and login data in Redux
        dispatchLoginSuccess(token, loginData);

        toast.success("Login successful!");
        // window.location.href = "/profile"; // Replace with your login page URL
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error("Login failed: " + error.response.data.error);
      } else {
        toast.error("Login failed: An error occurred.");
      }
    }
  };

  return (
     <section className="bg-white dark:bg-gray-900">
            <Metadata title="login" />

      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex justify-center mx-auto">
          </div>

          <div className="flex items-center justify-center mt-6">
            <Link
              href="#"
              className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
            >
              sign in
            </Link>

            <Link
              href="#"
              className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
            >
              sign up
            </Link>
          </div>

          <div className="relative flex items-center mt-6">
           

            <input
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="email"
            />
          </div>


          <div className="relative flex items-center mt-6">

            <input
              type="text"
              name="name"
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
    
          <div className="mt-6">
            
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign Up
            </button>
            <div className="mt-6 text-center">
              <Link
                to="/forgetpassword"
                className="text-sm text-red-500 hover:underline dark:text-blue-400"
              >
              forgetPassword
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
              I have no on account on DoSomething?
              </Link>
            </div>
          </div>
        </form>
      </div>
      {loggedIn}
      <ToastContainer position="bottom-center" />
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoginSuccess: (token, loginData) =>
      dispatch(loginSuccess(token, loginData)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);