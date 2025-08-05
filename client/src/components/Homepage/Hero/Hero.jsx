import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({ logoImage, heroRef }) => (
  <section id="home" className="hero" ref={heroRef}>
    <div className="hero-content">
      <div className="hero-text">
        <h1 className="hero-title">
          Empowering Youth in <span className="gradient-text">Sidama Region</span>
        </h1>
        <p className="hero-subtitle">
          Building a brighter future through education, skills development, and community engagement
        </p>
        <div className="hero-buttons">
          <Link to="/contact" className="btn btn-primary">Get Involved</Link>
          <Link to="/about" className="btn btn-secondary">Learn More</Link>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-logo-container">
          <img src={logoImage} alt="Sidama Youth Commission" className="hero-logo" />
          <div className="hero-logo-overlay">
            <span>Youth Empowerment</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero; 