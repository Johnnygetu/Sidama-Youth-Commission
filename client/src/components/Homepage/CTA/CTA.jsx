import React from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

const CTA = ({ ctaRef }) => (
  <section className="cta" ref={ctaRef}>
    <div className="container">
      <h2>Ready to Make a Difference?</h2>
      <p>Join us in empowering the next generation of leaders in Sidama region</p>
      <Link to="/contact" className="btn btn-primary">Join Our Mission</Link>
    </div>
  </section>
);

export default CTA; 