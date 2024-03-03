import React, { useState } from "react";
import "./ManagerLogin.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManagerLoginPopup = ({ onClose }) => {
  const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate();



  const handleLogin = async () => {
    const apiUrl = 'http://localhost:5000/adminLogin';
  
    try {
      const response = await axios.post(apiUrl, {
        secretKey,
      });
  
      if (response.status === 200) {
        console.log("Login Success");
        navigate("/adminDash")
      } else {
        console.error("Login Failed");
      }
    } catch (error) {
      console.log("API Request Error:", error);
      // Handle other errors, such as network issues, etc.
    }
  
    onClose();
  };
  

  return (
    <div className="manager-login-popup">
      <div className="popup-content">
        <h2>Manager Login</h2>
        <label htmlFor="secretKey">Enter Secret Key:</label>
        <input
          type="password"
          id="secretKey"
          value={secretKey}
          placeholder="Secret key"
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ManagerLoginPopup;
