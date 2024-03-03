import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";
import TimeSlotPopup from "../components/timeSlot/TimeSlot";
import loadRazorpayScript from "../../../components/Razorpay/razorpayLoader";
import "./TurfDetails.css";

function TurfDetails() {
  const { userId, id } = useParams();
  const [turfData, setTurfData] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [price, setPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const UserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userId}`);
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.log("Error fetching the user details", error);
      }
    };
    UserDetails();
  }, []);

  useEffect(() => {
    const fetchTurfData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getTurfData/${id}`);
        setTurfData(response.data);
        console.log(response.data._id);
      } catch (error) {
        console.error("Error fetching the turf details", error);
      }
    };

    loadRazorpayScript()
      .then(() => {
        console.log('Razorpay script loaded');
      })
      .catch((error) => {
        console.error('Failed to load Razorpay script', error);
      });

    fetchTurfData();
  }, [id]);

  const handleBuy = () => {
    setShowPopup(true);
  };

  const handleBook = async () => {
    try {
      console.log("total price:", price);
      console.log("turf name:", turfData.turfname);
      const response = await axios.post(`http://localhost:5000/makePayment`, {
        amount: price,
      });
      console.log(response.data);

      // Extract the order ID from the response
      const orderId = response.data.order.id;
      console.log(orderId);

      const options = {
        key: 'rzp_test_WItU7MPVvXuKom', 
        amount: price * 100, 
        currency: 'INR',
        name: turfData.turfname,
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: orderId,
        handler: async function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);

          try {
            const bookingResponse = await axios.post(`http://localhost:5000/newBooking/${userId}/${response.razorpay_payment_id}`, {
              turfId: turfData._id,
            });
            console.log("Booking created:", bookingResponse.data);
            navigate(`/success/${userId}`);
          } catch (error) {
            console.error("Error creating booking:", error);
          }
        },
        prefill: {
          name: userData.username,
          contact: userData.phoneNumber,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#22395c',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.log("error booking the slots", error);
    }
  };

  const handleTimeSlotSelection = (timeSlot) => {
    const newSelectedTimeSlots = [...selectedTimeSlots, timeSlot];
    setSelectedTimeSlots(newSelectedTimeSlots);
    const selectedSlotsCount = newSelectedTimeSlots.length;
    const pricePerHour = turfData.rate;
    const totalPrice = selectedSlotsCount * pricePerHour;
    setPrice(totalPrice);
    setShowPopup(false);
  };

  return (
    <div>
      <Navbar />
      <div
        className="turf-details-container"
        style={{
          backgroundImage: `url(http://localhost:5000/uploads/${turfData?.image})`,
        }}
      >
        <div className="overlay"></div>
        {turfData && (
          <div className="turf-details-content">
            <div className="image-container">
              <img
                src={`http://localhost:5000/uploads/${turfData.image}`}
                alt={turfData.turfname}
              />
            </div>
            <div className="details">
              <h1>{turfData.turfname}</h1>
              <p>Location: {turfData.location}</p>
              <p>Phone: {turfData.phone}</p>
              <p>Opening Time: {turfData.openingTime}</p>
              <p>Closing Time: {turfData.closingTime}</p>
              <p>Sports Items: {turfData.sportsItems}</p>
              <p>Rate: {turfData.rate}</p>
              <p>Number of Slots selected: {selectedTimeSlots.length}</p>
              <div className="book-button">
                <button className="book-now-button" onClick={handleBuy}>
                  Select Slots
                </button>
                <button className="book-now-button" onClick={handleBook}>Book Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showPopup && (
        <TimeSlotPopup
          openingTime={turfData?.openingTime}
          closingTime={turfData?.closingTime}
          onSelectTimeSlot={handleTimeSlotSelection}
          selectedTimeSlots={selectedTimeSlots}
        />
      )}
    </div>
  );
}

export default TurfDetails;
