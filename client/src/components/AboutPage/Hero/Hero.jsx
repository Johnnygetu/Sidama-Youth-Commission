import React from 'react';
import './Hero.css';

const Hero = ({ logoImage, heroRef }) => {
  return (
    <section className="about-hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              About <span className="gradient-text">Sidama Youth Commission</span>
            </h1>
            <p className="hero-subtitle">
              Empowering the next generation of leaders through education, skills development, and community engagement in the Sidama region.
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

export default Hero; 