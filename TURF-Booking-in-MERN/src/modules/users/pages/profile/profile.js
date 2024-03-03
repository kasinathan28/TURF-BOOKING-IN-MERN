import React, { useState, useEffect } from "react";
import "./profile.css";
import Logo from "../../../../components/logo/logo";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfileContent from "../profileContents/profielContents"; // Import the ProfileContent component
import BookingsContent from "../bookingContents/bookingContents"; // Import the BookingsContent component

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedAvatar, setEditedAvatar] = useState("");
  const [selectedOption, setSelectedOption] = useState("profile");
  const {userid} = useParams();

  useEffect(() => {

    if (userid) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/user/${userid}`
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };

      fetchUserData();
    }
  }, [navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSidebarOption = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUserData(null);
    navigate("/auth");
  };

  return (
    <div className="profilePage">
      <div className="profileNavbar">
        <div>
          <button onClick={handleBack} className="backButton">
            Back
          </button>
        </div>
        <Logo />
      </div>

      <div className="profileContainer">
        <div className="sidebar">
          <div className="sidebarChild1">
            <div className="sidebarAvatar">
              {userData && userData.avatar && (
                <img
                  src={`http://localhost:5000/uploads/${userData.avatar}`}
                  alt="User Avatar"
                />
              )}
            </div>
            <div className="profileName">
              <h2>Welcome back!</h2>
              {userData && <h2>{userData.username}</h2>}
            </div>
          </div>
          <div className="sidebarOptions">
            <ul>
              <li>
                <button onClick={() => handleSidebarOption("profile")}>
                  Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleSidebarOption("bookings")}>
                  Bookings
                </button>
              </li>
              <li>
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="profileContent">
          {selectedOption === "profile" && (
            <ProfileContent userData={userData} />
          )}
          {selectedOption === "bookings" && <BookingsContent />}
        </div>
      </div>
    </div>
  );
}
