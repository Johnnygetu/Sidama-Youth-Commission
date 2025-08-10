import React from 'react';
import './About.css';

const About = ({ logoImage, aboutRef, statsRefs }) => (
  <section id="about" className="about" ref={aboutRef}>
    <div className="container">
      <h2 className="section-title">About SRYC</h2>
      <div className="about-content">
        <div className="about-text">
          <div className="about-logo">
            <img src={logoImage} alt="Sidama Region Youth Council" className="about-logo-img" />
          </div>
          <div className="about-info">
            <h3>Our Mission</h3>
            <p>
              We are dedicated to empowering and mobilizing the vibrant youth of Sidama Region through innovative advocacy, comprehensive capacity building, active civic engagement, and strategic partnerships that drive positive change.
            </p>
            
            <h3>Our Vision</h3>
            <p>
              We envision a dynamic, empowered, and inclusive youth community in Sidama that actively shapes the future, contributing meaningfully to regional prosperity and national development while fostering unity and innovation.
            </p>
            
            <h3>Who We Are</h3>
            <p>
              The Sidama Region Youth Council (SRYC) stands as a beacon of hope and progress—an independent, inclusive, and youth-led Civil Society Organization that amplifies the voices and champions the interests of all 2.2 million young people across Sidama Region.
            </p>
            
            <p>
              Founded with the visionary guidance of the Ministry of Women and Social Affairs and proudly affiliated with the Ethiopia Youth Council, we are committed to creating an enabling environment where every young person can thrive as an active participant in social, economic, cultural, and political spheres.
            </p>
          </div>
        </div>
        <div className="stats">
          <div 
            className="stat-item" 
            ref={el => statsRefs && (statsRefs[0] = el)}
          >
            <h3>2.2M+</h3>
            <p>Youth Voices Amplified</p>
          </div>
          <div 
            className="stat-item" 
            ref={el => statsRefs && (statsRefs[1] = el)}
          >
            <h3>8</h3>
            <p>Strategic Pillars of Excellence</p>
          </div>
          <div 
            className="stat-item" 
            ref={el => statsRefs && (statsRefs[2] = el)}
          >
            <h3>2025-2029</h3>
            <p>Visionary Strategic Plan</p>
          </div>
          <div 
            className="stat-item" 
            ref={el => statsRefs && (statsRefs[3] = el)}
          >
            <h3>100%</h3>
            <p>Inclusive & Diverse</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About; 