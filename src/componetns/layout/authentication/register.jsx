import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assest/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../home/componetns/layout/Metadata";
const RegisterForm = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    profile: null, // Change this to a File object
  });
  const handleChange = (event, fieldName) => {
    const { value, type } = event.target;

    // Special handling for file inputs
    const newValue = type === "file" ? event.target.files[0] : value;

    setFormData((prevData) => ({ ...prevData, [fieldName]: newValue }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
     
      const requestData = {
        name: formData.username,
        email: formData.email,
        contactNumber: formData.contactNumber,
        password:formData.password
      };

      const response = await fetch("https://dosomethingbackend-anish-stack.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log(response);

      if (response.ok) {
        toast.success("Registration successful. Please check your email for a confirmation link.");


        history.push("/"); // Navigate to the home route
      }
      const errorMessage = await response.text();
      if (errorMessage.includes("Email address is already in use.")) {
        toast.error("Email address is already in use.");
      } else {
        console.log("Register Failed: " + errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <Metadata title="Register" />

      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-10 sm:h-10" src={logo} alt="logo" />
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
              type="text"
              value={formData.username}
              name="name"
              onChange={(event) => handleChange(event, "username")}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
            />
          </div>

          <div className="relative flex items-center mt-6">
            <input
              type="email"
              name="name"
              value={formData.email}
              onChange={(event) => handleChange(event, "email")}
              placeholder="Email-address"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="relative flex items-center mt-6">
            <input
              type="text"
              name="name"
              value={formData.contactNumber}
              onChange={(event) => handleChange(event, "contactNumber")}
              placeholder="Contact-Number"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(event) => handleChange(event, "password")}
              placeholder="Password"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />{" "}
          </div>
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Confirm-password"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />{" "}
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign Up
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/Login"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-center" />
    </section>
  );
};

export default RegisterForm;
