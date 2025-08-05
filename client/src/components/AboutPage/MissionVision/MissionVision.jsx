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
              To empower young people in the Sidama region by providing comprehensive 
              educational support, skill development programs, and leadership opportunities 
              that enable them to become active contributors to their communities.
            </p>
          </div>
          <div className="vision-card">
            <div className="card-icon">🌟</div>
            <h2>Our Vision</h2>
            <p>
              A thriving Sidama region where every young person has access to quality 
              education, meaningful opportunities, and the support they need to reach 
              their full potential and create positive change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision; 