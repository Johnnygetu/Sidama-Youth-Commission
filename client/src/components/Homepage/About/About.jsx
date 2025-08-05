import React from 'react';
import './About.css';

const About = ({ logoImage, aboutRef, statsRefs }) => (
  <section id="about" className="about" ref={aboutRef}>
    <div className="container">
      <h2 className="section-title">About Us</h2>
      <div className="about-content">
        <div className="about-text">
          <div className="about-logo">
            <img src={logoImage} alt="Sidama Youth Commission" className="about-logo-img" />
          </div>
          <p>
            Sidama Youth Commission is dedicated to empowering young people in the Sidama region 
            through comprehensive programs that focus on education, skill development, leadership, 
            and community service.
          </p>
          <p>
            We believe that investing in youth today creates a stronger, more prosperous 
            tomorrow for our entire community.
          </p>
        </div>
        <div className="stats">
          <div 
            className="stat-item" 
            ref={el => statsRefs && (statsRefs[0] = el)}
          >
            <h3>500+</h3>
            <p>Youth Empowered</p>
          </div>
          <div 
            className="stat-item" 
            ref={el => statsRefs && (statsRefs[1] = el)}
          >
            <h3>15</h3>
            <p>Active Programs</p>
          </div>
          <div 
            className="stat-item" 
            ref={el => statsRefs && (statsRefs[2] = el)}
          >
            <h3>25</h3>
            <p>Community Partners</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About; 