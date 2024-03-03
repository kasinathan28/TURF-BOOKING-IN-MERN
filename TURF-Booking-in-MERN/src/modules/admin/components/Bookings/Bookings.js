import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bookings");
        const bookingsData = response.data;
        const bookingsWithDetails = await Promise.all(bookingsData.map(async (booking) => {
          const userDataResponse = await axios.get(`http://localhost:5000/user/${booking.userId}`);
          const turfDataResponse = await axios.get(`http://localhost:5000/getTurfData/${booking.turfId}`);
          const userData = userDataResponse.data;
          const turfData = turfDataResponse.data;
          return { ...booking, userData, turfData };
        }));
        setBookings(bookingsWithDetails);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="BookingPage">
      <h1>Bookings</h1>
      <div className="BookingPageContainer">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Turf Name</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.userData.username}</td>
                <td>{booking.userData.phoneNumber}</td>
                <td>{booking.turfData.turfname}</td>
                <td>{booking.paymentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
