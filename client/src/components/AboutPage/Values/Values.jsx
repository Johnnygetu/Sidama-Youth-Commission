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
            <h3>Community</h3>
            <p>Building strong, supportive communities where youth can thrive and contribute meaningfully.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">📚</div>
            <h3>Education</h3>
            <p>Providing access to quality education and learning opportunities for all young people.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💪</div>
            <h3>Empowerment</h3>
            <p>Enabling youth to develop confidence, skills, and leadership abilities.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>Creating lasting positive impact through sustainable programs and partnerships.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values; 