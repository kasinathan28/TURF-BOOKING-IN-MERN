// Auth.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Logo from "../../../components/logo/logo";
import main_bottom from "./assets/main_bottom.png";
import LoginForm from "../../../components/loginform/loginForm";
import SignupForm from "../../../components/signup/signupForm";
import ManagerLoginPopup from "../../../components/ManagerLoginPopup/ManagerLoginPopup";

export default function Auth() {
  const [selectedOption, setSelectedOption] = useState("login");
  const [showManagerLoginPopup, setShowManagerLoginPopup] = useState(false); // State to manage the visibility of the popup
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleManager = () => {
    setShowManagerLoginPopup(true);
  };

  const closeManagerLoginPopup = () => {
    setShowManagerLoginPopup(false);
  };

  return (
    <div className="authpage">
      <div className="topContainer">
        <Logo />
      </div>
      <div className="authContainer">
        <div className="leftContainer">
          <div className="left-quate">
            <div className="title1">
              <h1>You make the Tune. We make it Go.</h1>
            </div>
            <div className="sub-title">
              <p>
                We make your life simple by including all the TURFs at one place.
                Check the availability and enjoy the game.
              </p>
            </div>
            <div className="admin-button">
              <button className="admin-login" onClick={handleManager}>
                Manager Login
              </button>
            </div>
          </div>
          <div className="left_image_container">
            <img className={`main-bottom ${selectedOption === "login" ? "show" : ""}`} src={main_bottom} alt="main_bottom" />
          </div>
        </div>

        <div className="rightContainer">
          <div className="form-container">
            <div className="authOptions">
              <div
                className={`option ${selectedOption === "signup" ? "selected" : ""}`}
                onClick={() => handleOptionClick("signup")}
              >
                SIGNUP
              </div>
              <div
                className={`option ${selectedOption === "login" ? "selected" : ""}`}
                onClick={() => handleOptionClick("login")}
              >
                LOGIN
              </div>
            </div>
            <div className="form-title">
              <h1>{selectedOption === "signup" ? "" : ""}</h1>
            </div>
            {selectedOption === "signup" ? (
              <div className="signup-form">
                <SignupForm/>
              </div>
            ) : (
              <div className="login-form">
                <LoginForm />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render ManagerLoginPopup if showManagerLoginPopup is true */}
      {showManagerLoginPopup && (
        <ManagerLoginPopup onClose={closeManagerLoginPopup} />
      )}
    </div>
  );
}
