import React from "react";
import Navbar from "../../../components/navbar/navbar";
import "../style/style.css";
import cricket from "../assets/cricket.jpeg";
import football from "../assets/football.jpeg";
import golf from "../assets/golf.jpeg";
import TurfContainer from "../componnents/turf-container/turfContainer";
import Footer from "../../../components/footer/footer";

export default function Index() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="heading">
          <h1>Made you play simple.<p id="sub-title">Book your slots for any games easily.</p></h1>
        </div>
        <div className="display">
          <div className="card">
            <img src={cricket} alt="cricket" />
            <div className="card-body">
              <h1 className="card-title">Cricket</h1>
              <h2 className="sub-title">aasd</h2>
              <p className="description">jd kajsdgh kljahd l lkajsd akljdh klajsdh laskdgh alshj aldkjahd ajklsdh   </p>
              <button type="button">Explore</button>
            </div>
          </div>
          <div className="card">
            <img src={football} alt="football" />
            <div className="card-body">
              <h1 className="card-title">Football</h1>
              <h2 className="sub-title">aasd</h2>
              <p className="description">jd kajsdgh kljahd l lkajsd</p>
              <button type="button">Explore</button>
            </div>
          </div>
          <div className="card">
            <img src={golf} alt="golf" />
            <div className="card-body">
              <h1 className="card-title">Golf</h1>
              <h2 className="sub-title">aasd</h2>
              <p className="description">jd kajsdgh kljahd l lkajsd</p>
              <button type="button">Explore</button>
            </div>
          </div>
        </div>
      </div>
      <TurfContainer/>
      <Footer/>
    </div>
  );
}


