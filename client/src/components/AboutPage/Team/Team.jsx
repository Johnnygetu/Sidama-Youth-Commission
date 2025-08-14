import React from 'react';
import './Team.css';

const Team = ({ teamRef }) => {
  return (
    <section className="team-section" ref={teamRef}>
      <div className="container">
        <h2 className="section-title">Our Leadership Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <div className="avatar-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
              </div>
              <div className="avatar-overlay"></div>
            </div>
            <div className="member-info">
              <h3>Abebe Kebede</h3>
              <p className="member-role">Executive Director</p>
              <p className="member-bio">
                Leading our organization with over 15 years of experience in youth development 
                and community engagement across the Sidama region.
              </p>
            </div>
          </div>
          <div className="team-member">
            <div className="member-avatar">
              <div className="avatar-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
              </div>
              <div className="avatar-overlay"></div>
            </div>
            <div className="member-info">
              <h3>Fatima Ahmed</h3>
              <p className="member-role">Program Director</p>
              <p className="member-bio">
                Overseeing our educational programs and skills training initiatives 
                to ensure maximum impact for our youth participants.
              </p>
            </div>
          </div>
          <div className="team-member">
            <div className="member-avatar">
              <div className="avatar-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
              </div>
              <div className="avatar-overlay"></div>
            </div>
            <div className="member-info">
              <h3>Dawit Mengistu</h3>
              <p className="member-role">Education Coordinator</p>
              <p className="member-bio">
                Managing our scholarship programs and academic support services 
                to help students excel in their educational journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team; 