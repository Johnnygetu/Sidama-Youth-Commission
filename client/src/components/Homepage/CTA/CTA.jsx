import React from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

const CTA = ({ ctaRef }) => (
  <section className="cta" ref={ctaRef}>
    <div className="container">
      <h2>Empowering Sidama Youth: Locally Rooted, Globally Connected</h2>
      <p>Join us in our mission to represent, empower, and mobilize the 2.2 million youth of Sidama Region through advocacy, capacity building, and strategic partnerships.</p>
      <div className="cta-buttons">
        <Link to="/contact" className="btn btn-primary">Get Involved</Link>
        <Link to="/about" className="btn btn-secondary">Learn More About Our Strategic Plan</Link>
      </div>
    </div>
  </section>
);

export default CTA; 