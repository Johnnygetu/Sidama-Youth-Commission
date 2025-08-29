import React from "react";
import "./TeamMemberCard.css";

const TeamMemberCard = ({ member, onViewProfile }) => {
  return (
    <div className="team-member">
      <div className="member-avatar">
        {member.photo ? (
          <img
            src={member.photo}
            alt={`${member.name} - ${member.title}`}
            className="member-photo"
          />
        ) : (
          <div className="avatar-placeholder">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-title">{member.title}</p>
      </div>

      <button className="btn btn-primary" onClick={() => onViewProfile(member)}>
        View Profile
      </button>
    </div>
  );
};

export default TeamMemberCard;
