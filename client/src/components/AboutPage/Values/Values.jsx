import React from 'react';
import './Values.css';

const Values = ({ valuesRef }) => {
  return (
    <section className="values-section" ref={valuesRef}>
      <div className="container">
        <h2 className="section-title">Our Core Values</h2>
        
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Inclusivity</h3>
            <p>Ensuring equal opportunities for all youth regardless of gender, ethnicity, political affiliation, disability, religion, or socioeconomic status.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">⚖️</div>
            <h3>Equity & Social Justice</h3>
            <p>Advocating for fairness, equality, and justice for all youth, especially marginalized and vulnerable groups.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🔍</div>
            <h3>Transparency & Accountability</h3>
            <p>Maintaining open, honest, and responsible governance in all our operations and decision-making processes.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💪</div>
            <h3>Empowerment & Participation</h3>
            <p>Enabling youth to actively participate in decision-making and take leadership roles in their communities.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>Creating lasting positive impact through sustainable programs, environmental stewardship, and long-term partnerships.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🎭</div>
            <h3>Cultural Pride</h3>
            <p>Celebrating and preserving the rich cultural heritage of Sidama while embracing positive innovation and change.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values; 