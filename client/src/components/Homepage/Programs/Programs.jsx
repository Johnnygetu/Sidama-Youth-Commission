import React from 'react';
import { Link } from 'react-router-dom';
import './Programs.css';

const Programs = ({ programsRef, programCardRefs }) => (
  <section id="programs" className="programs" ref={programsRef}>
    <div className="container">
      <h2 className="section-title">Our Programs</h2>
      <div className="programs-grid">
        <Link 
          to="/about" 
          className="program-card" 
          ref={el => programCardRefs && (programCardRefs[0] = el)}
        >
          <div className="program-icon">🎓</div>
          <h3>Education Support</h3>
          <p>Providing scholarships, tutoring, and educational resources to help youth excel academically.</p>
        </Link>
        <Link 
          to="/about" 
          className="program-card" 
          ref={el => programCardRefs && (programCardRefs[1] = el)}
        >
          <div className="program-icon">💼</div>
          <h3>Skills Training</h3>
          <p>Vocational training and entrepreneurship programs to prepare youth for the workforce.</p>
        </Link>
        <Link 
          to="/about" 
          className="program-card" 
          ref={el => programCardRefs && (programCardRefs[2] = el)}
        >
          <div className="program-icon">🌱</div>
          <h3>Leadership Development</h3>
          <p>Building confident leaders through workshops, mentoring, and community projects.</p>
        </Link>
        <Link 
          to="/about" 
          className="program-card" 
          ref={el => programCardRefs && (programCardRefs[3] = el)}
        >
          <div className="program-icon">🤝</div>
          <h3>Community Service</h3>
          <p>Engaging youth in meaningful community projects that create positive change.</p>
        </Link>
      </div>
    </div>
  </section>
);

export default Programs; 