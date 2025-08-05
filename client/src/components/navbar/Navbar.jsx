import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from '/images/mekerbet-logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={handleClose}>
          <img src={logoImage} alt="Sidama Youth Commission Logo" className="logo-img" />
        </Link>
        <button className="nav-toggle" onClick={handleToggle} aria-label="Toggle menu">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleClose}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={handleClose}>About</Link>
          </li>
          <li className="nav-item">
            <Link to="/news" className="nav-link" onClick={handleClose}>News</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={handleClose}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 