import React, { useState } from "react";
import "./footer.css";
import Instagram from "../../components/footer/assets/instagram.png";
import Facebook from "../../components/footer/assets/facebook.png";
import Whatsapp from "../../components/footer/assets/whatapp.png";

export default function Footer() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
  };

  
  return (
    <div className="footerComponents" id="aboutsection">
      <div className="footer">
        <div className="div1">
          <div className="title">
            <h1>ABOUT</h1>
          </div>
          <div className="desc">
            <p>
              The Amigoose foundation is made for the players who deserve a
              place to show their skills and have a period of happiness.
            </p>
          </div>
        </div>
        <div className="div2">
          <div className="title">
            <h1>CONTACTS</h1>
          </div>
          <div className="desc">
            <p>Email: demo@gmail.com</p>
            <p>
              Ph:{" "}
              <a href="tel:+919048xxxxxx">+91 6235837610</a>
            </p>
            <div className="socials">
              <h3>Follow us on :</h3>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={Instagram} alt="Instagram logo" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={Facebook} alt="Facebook logo" />
              </a>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <img src={Whatsapp} alt="Whatsapp logo" />
              </a>
            </div>
          </div>
        </div>
        <div className="div3">
          <div className="title">
            <h1>FEEDBACKS</h1>
          </div>
          <div className="desc">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={feedback.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
