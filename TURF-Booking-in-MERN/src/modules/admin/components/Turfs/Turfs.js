import React, { useEffect, useState } from "react";
import axios from "axios";
import EditForm from "../editTurf/EditTurf";
import "./Turf.css";

function Turfs() {
  const [turfsList, setTurfsList] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editTurf, setEditTurf] = useState(null);

  const [formData, setFormData] = useState({
    turfname: "",
    phone: "",
    location: "",
    rate:"",
    openingTime: "",
    closingTime: "",
    sportsItems: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/turfs");
        setTurfsList(response.data.turfs);
      } catch (error) {
        console.error("Error fetching turfs:", error.message);
      }
    };

    fetchTurfs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
  
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      const response = await axios.post(
        "http://localhost:5000/newTurf",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Turf added successfully:", response.data);
  
    } catch (error) {
      console.error("Error adding turf:", error.message);
    }
  };
  
  const handleEditClick = (turf) => {
    setEditTurf(turf);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setEditTurf(null);
  };

  const handleDelete= async (id)=>{
    try{
      const response = await axios.delete(`http://localhost:5000/deleteTurf/${id}`)
    }catch(error){
      console.log("Error while deleting the turf", error);
    }
  }

  return (
    <div className="TurfPage">
      <div>
        <h1>Turfs</h1>
      </div>
      {showEditPopup && (
        <>
          <div className="overlay">
          <EditForm
            turfData={editTurf}
            formData={formData}
            closeEditPopup={closeEditPopup}
            setTurfData={setEditTurf} 
          />
            </div> 
        </>
      )}
      <div className="new-turf">
        <h2>Add new Turf.</h2>
        <div className="turf-form">
          <form onSubmit={handleSubmit}>
            <div className="turf-row">
              <div className="turf-col">
                <label htmlFor="turfname">Turf Name:</label>
                <input
                  type="text"
                  id="turfname"
                  name="turfname"
                  value={formData.turfname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="turf-col">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="turf-row">
              <div className="turf-col">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="turf-col">
                <label htmlFor="sportsItems">Sports Items:</label>
                <input
                  type="text"
                  id="sportsItems"
                  name="sportsItems"
                  value={formData.sportsItems}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="turf-row">
              <div className="turf-col">
                <label htmlFor="openingTime">Opening Time:</label>
                <input
                  type="time"
                  id="openingTime"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="turf-col">
                <label htmlFor="closingTime">Closing Time:</label>
                <input
                  type="time"
                  id="closingTime"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="turf-row">
              <div className="turf-col">
                <label htmlFor="rate">Rate:</label>
                <input
                  type="text"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="turf-row">
              <div className="turf-col">
                <label htmlFor="image">Upload Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="custom-file-input"
                  required
                />
                {formData.image && (
                  <span className="file-name">{formData.image.name}</span>
                )}
              </div>
            </div>

            <button type="submit">Add Turf</button>
          </form>
        </div>
      </div>
      <div className="TurfPageContainer">
        {turfsList.map((turf) => (
          <div key={turf._id} className="turf-card1">
            <div className="turfcard-bg">
              <img
                src={`http://localhost:5000/uploads/${turf.image}`}
                alt={turf.name}
              />
            </div>
            <div>
              <h2>{turf.turfname}</h2>
              <p>Location: {turf.location}</p>
              <p>Phone:+91 {turf.phone}</p>
              <p>Opening Time:{turf.openingTime}</p>
              <p>Closing TIme:{turf.closingTime}</p>
              <p>Rate: {turf.rate}</p> 
              <div className="turf-opt">
                <button id="edit" onClick={() => handleEditClick(turf)}>
                  Edit
                </button>
                <button id="del" onClick={handleDelete(turf.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Turfs;
