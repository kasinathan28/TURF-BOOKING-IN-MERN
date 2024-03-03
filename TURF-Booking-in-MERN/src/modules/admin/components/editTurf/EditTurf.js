import React, { useState, useEffect } from "react";
import axios from "axios";
import "./editTurf.css";

function EditForm({ turfData, closeEditPopup, setTurfData }) {
  const [formData, setFormData] = useState({
    turfname: "",
    phone: "",
    location: "",
    rate:"",
    openingTime: "",
    closingTime: "",
    sportsItems: "",
  });

  useEffect(() => {
    setFormData(turfData);
  }, [turfData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/updateTurf/${turfData._id}`, 
        { formData } 
      );
      console.log("Turf updated successfully:", response.data);
      setTurfData(formData); // Update turf data in Turf component
      closeEditPopup();
    } catch (error) {
      console.error("Error updating turf:", error.message);
    }
  };


  return (
    <div className="edit-form">
      <h2>Edit Turf</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="turfname">Turf Name:</label>
        <input
          type="text"
          id="turfname"
          name="turfname"
          value={formData.turfname}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <label htmlFor="rate">Rate:</label>
        <input
          type="text"
          id="rate"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
          required
        />
        <label htmlFor="openingTime">Opening Time:</label>
        <input
          type="time"
          id="openingTime"
          name="openingTime"
          value={formData.openingTime}
          onChange={handleChange}
          required
        />
        <label htmlFor="closingTime">Closing Time:</label>
        <input
          type="time"
          id="closingTime"
          name="closingTime"
          value={formData.closingTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
        <button onClick={closeEditPopup}>Cancel</button>
      </form>
    </div>
  );
}

export default EditForm;
