import React from 'react';
import './ContactForm.css';

const ContactForm = ({ contactFormRef }) => {
  return (
    <section className="contact-section" ref={contactFormRef}>
      <div className="container contact-grid">
        {/* Contact Form */}
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="you@email.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Type your message..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
        {/* Contact Info */}
        <div className="contact-info-card">
          <h2>Contact Information</h2>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>Hawassa, Sidama Region, Ethiopia</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📧</span>
            <span>info@sidamayouth.org</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <span>+251 911 234 567</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🌐</span>
            <span>www.sidamayouth.org</span>
          </div>
          <div className="map-placeholder">
            <span role="img" aria-label="map" style={{fontSize: '2.5rem'}}>🗺️</span>
            <p>Map Location</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 