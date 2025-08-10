import React from 'react';
import './Footer.css';
import logoImage from '/images/mekerbet-logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logoImage} alt="Sidama Region Youth Council Logo" className="footer-logo-img" />
              <h3>Sidama Region Youth Council (SRYC)</h3>
            </div>
            <p className="footer-motto">"Empowering Sidama Youth: Locally Rooted, Globally Connected."</p>
            <p>Representing the voices and interests of all 2.2 million youth in Sidama Region.</p>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 Hawassa, Sidama Region, Ethiopia</p>
            <p>📧 info@sryc.org.et</p>
            <p>📞 +251 911 234 567</p>
            <p>🏛️ Ministry of Women & Social Affairs</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Strategic Pillars</h4>
            <ul>
              <li>Institutional Strengthening</li>
              <li>Youth Empowerment</li>
              <li>Climate Justice</li>
              <li>Digital Engagement</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Sidama Region Youth Council (SRYC). All rights reserved.</p>
          <p>Affiliated with Ethiopia Youth Council | Supervised by Ministry of Women & Social Affairs</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 