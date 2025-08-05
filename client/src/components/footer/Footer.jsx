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
              <img src={logoImage} alt="Sidama Youth Commission Logo" className="footer-logo-img" />
              <h3>Sidama Youth Commission</h3>
            </div>
            <p>Empowering youth, building communities, creating futures.</p>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 Hawassa, Sidama Region, Ethiopia</p>
            <p>📧 info@sidamayouth.org</p>
            <p>📞 +251 911 234 567</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Volunteer</a></li>
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
          <p>&copy; 2025 Sidama Youth Commission. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 