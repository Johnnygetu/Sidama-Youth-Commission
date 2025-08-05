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
              <div className="avatar-placeholder">👨‍💼</div>
            </div>
            <h3>Abebe Kebede</h3>
            <p className="member-role">Executive Director</p>
            <p className="member-bio">
              Leading our organization with over 15 years of experience in youth development 
              and community engagement across the Sidama region.
            </p>
          </div>
          <div className="team-member">
            <div className="member-avatar">
              <div className="avatar-placeholder">👩‍💼</div>
            </div>
            <h3>Fatima Ahmed</h3>
            <p className="member-role">Program Director</p>
            <p className="member-bio">
              Overseeing our educational programs and skills training initiatives 
              to ensure maximum impact for our youth participants.
            </p>
          </div>
          <div className="team-member">
            <div className="member-avatar">
              <div className="avatar-placeholder">👨‍🎓</div>
            </div>
            <h3>Dawit Mengistu</h3>
            <p className="member-role">Education Coordinator</p>
            <p className="member-bio">
              Managing our scholarship programs and academic support services 
              to help students excel in their educational journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team; 