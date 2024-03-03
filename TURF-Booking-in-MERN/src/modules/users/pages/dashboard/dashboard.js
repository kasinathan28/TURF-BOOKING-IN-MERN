import React, { useEffect, useState } from 'react';
import Navbar from '../../../../components/navbar/navbar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

export default function Dashboard() {
  const location = useLocation();
  const username = location.state ? location.state.username : null;
  const [turfList, setTurfList] = useState([]);
  const navigate = useNavigate(); 
  const demoId = useParams();
  const userId = demoId.userid;

  useEffect(() => {
    const getTurfList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/turfs");
        setTurfList(response.data.turfs);
      } catch (error) {
        console.log("Error fetching the turfs", error);
      }
    };
    getTurfList();
  }, []);

  const handleTurf = (id) => { 
    navigate(`/turfDetails/${userId}/${id}`); 
    console.log(id);
  };

  return (
    <div>
      <Navbar username={username} />

      <div className='userDash-Container'>
        <div className='heading3'>
          <h1>Find Your Nearest Turfs..</h1>
        </div>
        <div className='turf-list'>
          {turfList.map((turf) => (
            <div key={turf._id} className='turf-card'>
              <div
                className='turfcard-bg'
                style={{ backgroundImage: `url(http://localhost:5000/uploads/${turf.image})` }}
              ></div>
              <div className='bottom-details'>
                <div className='title'>
                  <h2>{turf.turfname}</h2>
                  <p>Location: {turf.location}</p>
                  <p>Phone: +91 {turf.phone}</p>
                  <p>Opening Time: {turf.openingTime}</p>
                  <p>Closing Time: {turf.closingTime}</p>
                </div>
                <button onClick={() => handleTurf(turf._id)}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
