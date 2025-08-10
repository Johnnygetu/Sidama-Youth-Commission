import React from 'react';
import './MissionVision.css';

const MissionVision = ({ missionVisionRef }) => {
  return (
    <section className="mission-vision" ref={missionVisionRef}>
      <div className="container">
        <div className="content-grid">
          <div className="mission-card">
            <div className="card-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>
              To represent, empower, and mobilize the youth of Sidama Region through innovative advocacy, 
              comprehensive capacity building, active civic engagement, and strategic partnerships that drive positive change.
            </p>
          </div>
          <div className="vision-card">
            <div className="card-icon">🌟</div>
            <h2>Our Vision</h2>
            <p>
              We envision a dynamic, empowered, and inclusive youth community in Sidama that actively 
              shapes the future, contributing meaningfully to regional prosperity and national development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision; 