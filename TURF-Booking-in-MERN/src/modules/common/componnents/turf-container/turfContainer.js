import React, { useEffect, useState } from "react";
import axios from "axios";
import "./turf-container.css";


// images
import cardbgdemo from "../../assets/bg.jpeg";

// TurfCard component to render each turf
const TurfCard = ({ turf }) => {
  return (
    <div className="turf-card">
      <div className="turf-title">
      <h2>{turf.turfname}</h2>
      </div>
          <img src={`http://localhost:5000/uploads/${turf.image}`} />
      <div className="turf-card-body">
        <h3>{turf.turfname}</h3>
        <p>Location: {turf.location}</p>
        <p>Phone: {turf.phone}</p>
        <p>Opening Time: {turf.openingTime}</p>
        <p>Closing Time: {turf.closingTime}</p>
      </div>
    </div>
  );
};

export default function TurfContainer() {
  const [selectedCity, setSelectedCity] = useState("");
  const TurfAPIURL = "http://localhost:5000/turfs";
  const [turfs, setTurfs] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get(TurfAPIURL);
        console.log("API Response:", response.data);
        setTurfs(response.data.turfs);
        // Extract locations from turfs and remove duplicates
        const uniqueLocations = Array.from(
          new Set(response.data.turfs.map((turf) => turf.location))
        );
        setLocations(uniqueLocations);
      } catch (error) {
        console.log("Error fetching the turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <div className="main" id="turfSection">
        <div className="turf-heading">
          <h1>TURF NEARBY</h1>
        </div>
        <div className="turf-container">
          <div className="location">
            {/* Dropdown to select city */}
            <label htmlFor="city">Select City:</label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="">-------All Cities-------</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>


          <div className="turf-list">
            {turfs
              .filter((turf) => !selectedCity || turf.location === selectedCity)
              .map((filteredTurf) => (
                <TurfCard key={filteredTurf._id} turf={filteredTurf} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
