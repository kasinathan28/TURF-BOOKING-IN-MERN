import React, { useState } from "react";
import Navbar from "../../../../components/navbar/navbar";
import "./adminDashboard.css";
import defaultImage from "../../../../components/assets/showcase-sms.png";
import UsersTable from "../../components/usersTable/UsersTable";
import Payments from "../../components/payments/Payments";
import Turfs from "../../components/Turfs/Turfs";
import Bookings from "../../components/Bookings/Bookings";

export default function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState("Default");

  const handleSidebarClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "Users":
        return <UsersTable />;
      case "Payments":
        return <Payments />;
      case "Turfs":
        return <Turfs />;
      case "Booking":
        return <Bookings />;


      default:
        return (
          <div className="default-image-container">
            <div className="heading1">
              <h1>
                Admin Dashboard.
                <p>Made your job <strong>EASY </strong></p>
              </h1>
            </div>
            <div className="default-image">
              <img src={defaultImage} alt="Default" className="default-image" />
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="admin-navbar">

      <Navbar />
      </div>

      <div className="adminContainer">
        <div className="adminSidebar">
          <ul>
            <li onClick={() => handleSidebarClick("Users")}>Users</li>
            <li onClick={() => handleSidebarClick("Booking")}>Booking</li>
            <li onClick={() => handleSidebarClick("Turfs")}>Turfs</li>
            <li onClick={() => handleSidebarClick("Payments")}>Payments</li>
          </ul>
        </div>
        <div className="adminContent">{renderContent()}</div>
      </div>
    </div>
  );
}
