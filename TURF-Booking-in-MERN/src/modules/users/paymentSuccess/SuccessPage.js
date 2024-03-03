import React, { useEffect, useState } from "react";
import "./successPage.css";

import playimg from "../../../components/assets/playimg.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function SuccessPage() {

    const [user, setUser] = useState();
    const {userId} = useParams();
    const navigate = useNavigate();
    
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userId}`);
        setUser(response.data);
        console.log(user.username);
      } catch (error) {
        console.log("Error fetching the user data", error);
      }
    };
    userData();
  }, []);

  const handleBack =()=>{
    console.log("btaskdj");
    navigate(`/dashboard/${userId}`);
  }

  return (
    <div className="successPage">
      <div className="main">
        <div>
          {/* <h1 className="name">👋{user.username}</h1> */}

          <h1> Payment Success..!</h1>
        </div>

        <div>
          <h2>Lets play together and grow together.</h2>
          <h3>Thanks for your checking on us and happy playing.</h3>
        </div>
        <div className="go-back">
            <button onClick={handleBack}>Continue Browsing</button>
        </div>
      </div>
      <div className="playimg">
        <img src={playimg} />
      </div>
    </div>
  );
}

export default SuccessPage;
