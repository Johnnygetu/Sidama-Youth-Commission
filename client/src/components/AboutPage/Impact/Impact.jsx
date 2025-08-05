import React from 'react';
import './Impact.css';

const Impact = ({ impactRef }) => {
  return (
    <section className="impact-section" ref={impactRef}>
      <div className="container">
        <h2 className="section-title">Our Impact</h2>
        <div className="impact-grid">
          <div className="impact-stat">
            <div className="stat-number">500+</div>
            <div className="stat-label">Youth Empowered</div>
            <div className="stat-description">
              Young people who have participated in our programs and gained valuable skills
            </div>
          </div>
          <div className="impact-stat">
            <div className="stat-number">15</div>
            <div className="stat-label">Active Programs</div>
            <div className="stat-description">
              Comprehensive programs covering education, skills training, and leadership
            </div>
          </div>
          <div className="impact-stat">
            <div className="stat-number">25</div>
            <div className="stat-label">Community Partners</div>
            <div className="stat-description">
              Local organizations and institutions supporting our mission
            </div>
          </div>
          <div className="impact-stat">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
            <div className="stat-description">
              Participants who report improved skills and confidence after our programs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact; 