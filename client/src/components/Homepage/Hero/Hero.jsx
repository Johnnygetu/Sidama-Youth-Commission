import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({ logoImage, heroRef }) => (
  <section id="home" className="hero" ref={heroRef}>
    <div className="hero-content">
      <div className="hero-text">
        <h1 className="hero-title">
          <span className="gradient-text">Sidama Region Youth Council</span>
        </h1>
        <p className="hero-subtitle">
          Empowering Sidama Youth: Locally Rooted, Globally Connected
        </p>
        <p className="hero-description">
          Representing the voices and interests of all 2.2 million youth in Sidama Region—without any discrimination based on gender, ethnicity, political affiliation, education level, disability, religion, or any other grounds.
        </p>
        <div className="hero-buttons">
          <Link to="/about" className="btn btn-primary">Learn More</Link>
          <Link to="/contact" className="btn btn-secondary">Get Involved</Link>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-logo-container">
          <img src={logoImage} alt="Sidama Region Youth Council" className="hero-logo" />
          <div className="hero-logo-overlay">
            <span>Youth Empowerment</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* President's Message Section */}
    <div className="president-message">
      <div className="container">
        <div className="message-content">
          <div className="president-info">
            <div className="president-photo">
              <div className="photo-placeholder">
                <span>President Photo</span>
                <p>Photo of Mr. Yishak Sanbura</p>
              </div>
            </div>
            <div className="president-details">
              <h2>Message from the President</h2>
              <h3>Mr. Yishak Sanbura</h3>
              <p className="president-title">President, Sidama Region Youth Council (SRYC)</p>
            </div>
          </div>
          <div className="message-preview">
            <div className="message-text">
              <p>
                Greetings to all visitors and fellow youth of Sidama, Ethiopia, and beyond.
              </p>
              <p>
                It is with deep pride and great optimism that I welcome you to the official website of the Sidama Region Youth Council (SRYC)—a vibrant, youth-led, and inclusive civil society organization representing the voices and aspirations of over 2.2 million young people in our region...
              </p>
            </div>
            <div className="message-actions">
              <Link to="/president-message" className="btn btn-primary">View the Whole Message</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero; 