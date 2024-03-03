import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./bookingContents.css";


const BookingsContent = () => {
  const { userid } = useParams();
  const [bookings, setBookings] = useState([]);
  const [turfDetails, setTurfDetails] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/userBookings/${userid}`);
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching the booking details..", error);
      }
    };
    getBookings();
  }, [userid]);

  useEffect(() => {
    const fetchTurfDetailsForBookings = async () => {
      const uniqueTurfIds = new Set(bookings.map(booking => booking.turfId));
      const turfDetailsPromises = Array.from(uniqueTurfIds).map(turfId => {
        return axios.get(`http://localhost:5000/getaturf/${turfId}`)
          .then(response => response.data)
          .catch(error => {
            console.log("Error fetching turf details for turfId:", turfId, error);
            return null;
          });
      });
      Promise.all(turfDetailsPromises)
        .then(data => {
          setTurfDetails(data.filter(turf => turf !== null));
        });
    };

    if (bookings.length > 0) {
      fetchTurfDetailsForBookings();
    }
  }, [bookings]);

  return (
    <div className='bookings'>
      <h2>Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {turfDetails.map((turf, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{turf.turfname}</td>
              <td><img src={`http://localhost:5000/uploads/${turf.image}`} alt={turf.name} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsContent;
