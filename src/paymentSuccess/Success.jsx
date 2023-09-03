import React from "react";
import { useLocation } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import "./SuccessPage.css"; // Import your custom CSS file

function SuccessPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get("amount");
  const email = queryParams.get("email");
  const name = queryParams.get("name");
  const address = queryParams.get("address");

  return (
    <div className="success-container">
      <div className="success-icon">
        <FaThumbsUp />
      </div>
      <div className="success-content">
        <h1>Payment Successful!</h1>
        <p>Amount: RS {parseFloat(amount).toFixed(2)}</p>
        <p>Email: {email}</p>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
      </div>
    </div>
  );
}

export default SuccessPage;
