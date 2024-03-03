import React, { useState, useEffect } from "react";
import "../navbar/style/style.css";
import logo from "../assets/logo.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function Navbar() {
  const [weather, setWeather] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token'); // Corrected line
  
  const { userid } = useParams();
  console.log(userid);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "572a88b3000f8591f695ca31b526de29";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=alappuzha&appid=${apiKey}`
        );
        const data = await response.json();

        const temperatureCelsius = data.main.temp - 273.15;
        data.main.temp = temperatureCelsius;

        setWeather(data);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    console.log("Location Pathname:", location.pathname);
  }, [location.pathname]);

  const getWeatherIcon = () => {
    if (weather && weather.main.temp > 27) {
      return "☀️";
    } else {
      return "🌧️";
    }
  };

  const handleAuth = () => {
    navigate("/auth");
  };

  const handleTurfClick = () => {
    const turfSection = document.getElementById("turfSection");
    if (turfSection) {
      turfSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleAboutclick = () => {
    const turfSection = document.getElementById("aboutsection");
    if (turfSection) {
      turfSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAdminLogout =()=>{
    window.localStorage.removeItem("adminToken");
    navigate("/");
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    navigate("/");
  };

  const handleProfile =()=>{
    navigate(`/profile/${userid}`);
  }

  const renderNavbarItems = () => {
    console.log("Location Pathname in renderNavbarItems:", location.pathname);

    if (location.pathname === `/dashboard/${userid}`) {
      console.log("Rendering Dashboard Navbar Items");
      return (
        <>
          <li onClick={handleProfile}>Profile</li>
          <li id="logout" onClick={handleLogout}>Logout</li>
        </>
      );
    } else if (location.pathname === "/adminDash") {
      console.log("Rendering Admin Dashboard Navbar Items");
      return <li onClick={handleAdminLogout}>Logout</li>;
    } else {
      console.log("Rendering Default Navbar Items");
      return (
        <>
          <li onClick={handleTurfClick}>TURFS</li>
          <li onClick={handleAboutclick}>ABOUT</li>
          <li onClick={handleAuth}>Get a slot</li>
        </>
      );
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <h1>
          Amigoose <img src={logo} alt="logo" className="logo" />{" "}
        </h1>
      </div>
      <div className="weather">
        {weather && (
          <div>
            <p>Temperature: {weather.main.temp.toFixed(2)} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p className="weather-icon">{getWeatherIcon()}</p>
          </div>
        )}
      </div>
      <div className="right">
        <ul>
          {renderNavbarItems()}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
