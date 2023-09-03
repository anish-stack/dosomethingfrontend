import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../App.css";
import { useNavigate } from 'react-router-dom'; 
import Metadata from "../home/componetns/layout/Metadata";

const UserDetail = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(`https://dosomethingbackend-anish-stack.vercel.app/user/email/${email}`, config)
        .then((response) => {
          setUserDetails(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setLoggedIn(false); // Handle errors by setting loggedIn to false
        });
    } else {
      setLoggedIn(false);
    }
  }, [token, email]);

  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return navigate('/login'); // Redirect to login page after logout or in case of error
  }

  return (
    <div className="user-details-container">
      <Metadata title="user-detail" />
      <div className="user-card">
        <div className="user-avatar">
          {/* <img src={userDetails.avatar.Url} alt="User Avatar" /> */}
        </div>
        <div className="user-info">
          <h2>{userDetails?.name}</h2>
          <p>Email: {userDetails?.email}</p>
          <p>Role: {userDetails?.role}</p>
          <p>id: {userDetails?._id}</p>

        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default UserDetail;