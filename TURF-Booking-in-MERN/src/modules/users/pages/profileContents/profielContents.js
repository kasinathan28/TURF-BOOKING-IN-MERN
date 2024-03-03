import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profileContents.css";

const ProfileContent = ({ userData }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  // const [editedAvatar, setEditedAvatar] = useState(null);

  const imgUrl = 'http://localhost:5000/uploads/'; 


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userData) {
          const response = await axios.get(
            `http://localhost:5000/user/${userData.userId}`
          );
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, [userData]);

  const handleEdit = () => {
    setEditMode(true);
    setEditedUsername(userDetails.username);
    setEditedPhoneNumber(userDetails.phoneNumber);
    setEditedPassword(""); 
    // setEditedAvatar(null);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  // const handleFileChange = (e) => {
  //   setEditedAvatar(e.target.files[0]);
  // };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", editedUsername);
      formData.append("phoneNumber", editedPhoneNumber);
      formData.append("password", editedPassword);
  
      // Log the value using get method
      console.log(formData.get("phoneNumber"));
  
      const response = await axios.put(
        `http://localhost:5000/user/${userDetails.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setUserDetails(response.data);
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };
  


  return (
    <div>
      <h2>Profile</h2>
      <div className="profileContainer1">
        <div className="profile-details">
          {userDetails ? (
            <div className="details-div">
              <div className="avatar">
                <img
                  src={imgUrl + userDetails.avatar}
                  alt={userDetails.username}
                />
              </div>
              <div className="profile-labels">
                <p>Username: {userDetails.username}</p>
                <p>Phone Number: {userDetails.phoneNumber}</p>
              </div>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>

        <div className="profile-editForm">
          {editMode ? (
            <div>
              <label htmlFor="editedUsername">Username:</label>
              <input
                type="text"
                id="editedUsername"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
              <label htmlFor="editedPhoneNumber">Phone Number:</label>
              <input
                type="text"
                id="editedPhoneNumber"
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
              />
              <label htmlFor="editedPassword">Password:</label>
              <input
                type="password"
                id="editedPassword"
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
              />
              {/* <label htmlFor="editedAvatar">Avatar:</label>
              <input
                type="file"
                id="editedAvatar"
                accept="image/*"
                onChange={handleFileChange}
              /> */}
              <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={handleEdit}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
