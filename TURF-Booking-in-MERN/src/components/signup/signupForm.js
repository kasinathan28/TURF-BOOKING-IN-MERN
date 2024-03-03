import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signupform.css";
import Avatar from "../loginform/assets/avatar.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSignup = async () => {
    const apiUrl = "http://localhost:5000/signup";

    const formData = new FormData();
    formData.append("username", username);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Signup successful");
        toast.success("Signup successful");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      toast.error("Error during signup");
      window.location.reload();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignup();
    }
  };

  return (
    <div className="signupform show" onKeyDown={handleKeyDown}>
      <div className="signup-form-container">
        <div className="avatar">
          <img src={Avatar} alt="Avatar image" />
        </div>
        <div className="login-form-title">Sign Up</div>
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tel">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Profile Picture:</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleFileChange}
            onKeyDown={handleKeyDown}
          />
          {/* <img id='preview' alt='Profile Preview' style={{ maxWidth: '100px', marginTop: '10px' }} /> */}
        </div>
        <button className="signup-button" onClick={handleSignup}>
          Signup
        </button>
        <div className="back-to-login">
          Already have an account? <a href="#">Login</a>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
