import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import Footer from '../../footer/Footer';
import './TeamMemberProfile.css';

const TeamMemberProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const memberData = location.state?.memberData;

  const goBack = () => {
    navigate('/about');
  };

  if (!memberData) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-main">
          <div className="profile-container">
            <div className="error-box">
              <h2>Member not found</h2>
              <p>Please go back to the team page to select a member.</p>
              <button className="back-btn" onClick={goBack}>
                ← Back to Team
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-main">
        <div className="profile-container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              {memberData.photo ? (
                <img 
                  src={memberData.photo} 
                  alt={`${memberData.name} - ${memberData.title}`}
                  className="profile-photo"
                />
              ) : (
                <div className="avatar-placeholder-large">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="member-info">
              <h1>{memberData.name}</h1>
              <h2>{memberData.title}</h2>
              <div className="contact-details">
                <div className="contact-item">
                  <span>📧</span>
                  <span>{memberData.email}</span>
                </div>
                <div className="contact-item">
                  <span>📞</span>
                  <span>{memberData.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="member-content">
            <div className="about-section">
              <h3>About</h3>
              <p>{memberData.fullBio}</p>
            </div>
          </div>

          {/* Back Button - SUPER VISIBLE */}
          <div className="button-section">
            <button className="back-btn" onClick={goBack}>
              ← Back to Team
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamMemberProfile;
