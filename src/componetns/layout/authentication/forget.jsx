import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { IoEye, IoEyeOff } from 'react-icons/io5'; // Import icons
import 'react-toastify/dist/ReactToastify.css';
import './ForgetPassword.css';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dosomethingbackend-anish-stack.vercel.app/user/change/password', {
        email,
        newPassword,
      });

      setMessage(response.data.message);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.href = '/login'; 
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
      toast.error('An error occurred');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="forget-container">
      <div className="form-column">
        <h1 className="form-title">Change Password</h1>
        <div className="input-group">
          <span className="icon">✉️</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
       
        <button className="submit-button" type="submit" onClick={handleSubmit}>
          Change Password
        </button>
      </div>
      <div className="image-column">
        <img src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?t=st=1693144526~exp=1693145126~hmac=27fc774552be5930e98251c4b0e2858eefc157c44591cfff0dad743cf938cd93" alt="Password Reset" />
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgetPassword;
