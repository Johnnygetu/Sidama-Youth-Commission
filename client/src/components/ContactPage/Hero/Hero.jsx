import React from 'react';
import './Hero.css';

const ContactHero = ({ logoImage, heroRef }) => {
  return (
    <section className="contact-hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Contact <span className="gradient-text">Sidama Youth Commission</span>
            </h1>
            <p className="hero-subtitle">
              We would love to hear from you! Reach out for questions, partnership opportunities, or to get involved.
            </p>
          </div>
          <div className="hero-image">
            <div className="logo-container">
              <img src={logoImage} alt="Sidama Youth Commission" className="hero-logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero; 