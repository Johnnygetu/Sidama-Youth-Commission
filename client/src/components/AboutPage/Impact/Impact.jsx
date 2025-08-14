import React from 'react';
import './Impact.css';

const Impact = ({ impactRef }) => {
  return (
    <section className="impact-section" ref={impactRef}>
      <div className="container">
        <h2 className="section-title">Our Strategic Goals & Targets</h2>
        <p className="section-subtitle">
          Building a stronger future for Sidama youth through measurable impact and sustainable development
        </p>
        <div className="impact-grid">
          <div className="impact-stat">
            <div className="stat-number">2.2M+</div>
            <div className="stat-label">Youth Represented</div>
            <div className="stat-description">
              All youth in Sidama Region without discrimination based on any grounds
            </div>
          </div>
          <div className="impact-stat">
            <div className="stat-number">150%</div>
            <div className="stat-label">Membership Growth</div>
            <div className="stat-description">
              Target increase in active youth membership by 2029
            </div>
          </div>
          <div className="impact-stat">
            <div className="stat-number">10,000</div>
            <div className="stat-label">Youth Trained</div>
            <div className="stat-description">
              Target number of youths trained in employability and entrepreneurship by 2029
            </div>
          </div>
          <div className="impact-stat">
            <div className="stat-number">3,000+</div>
            <div className="stat-label">Income Generation</div>
            <div className="stat-description">
              Target youth engaged in income-generating activities by 2029
            </div>
          </div>
          <div className="impact-stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">Environmental Initiatives</div>
            <div className="stat-description">
              Community environmental initiatives to be executed by 2029
            </div>
          </div>
          <div className="impact-stat">
            <div className="stat-number">40%</div>
            <div className="stat-label">Leadership Diversity</div>
            <div className="stat-description">
              Target representation of women and persons with disabilities in leadership by 2028
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact; 