import React from 'react';
import { useNavigate } from 'react-router-dom';
import degreeImage from '../../../assets/photo_2025-08-14_11-29-28.jpg';
import yishakImage from '../../../assets/photo_2025-08-14_11-53-35.jpg'; // Fixed import path
import ashenafiImage from '../../../assets/photo_2025-08-14_11-58-16.jpg'; // Added import
import './Team.css';

const Team = ({ teamRef }) => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: "Mr. Degree H/Mariam",
      title: "Executive Head of Structure and Membership",
      photo: degreeImage,
      expertise: ["Youth Leadership", "Community Development", "Communication"],
      fullBio: "Mr. Degree H/Mariam is a dedicated leader and an advocate for youth empowerment in the Sidama Region. He graduated with a Bachelor of Accounting and Finance degree from Zion University College, where he laid the foundation for a career focused on communication and community development. His commitment to serving the youth began as a Communication Expert at the Sidama Region Central Zone in Dale Woreda, where he worked diligently to bridge gaps in communication and promote effective dialogue within the community.\n\nCurrently, Mr. Degree serves as the President of the Central Sidama Zone Youth Federation, a role that highlights his leadership abilities and dedication to enhancing the lives of young people. He has also held significant positions, including at Sidama Region Health Bureau Member of the Teenagers and Youths Health Council and President of the Central Sidama Zone Clubs Association. In these capacities, he has championed initiatives that empower youth, fostering their leadership skills and encouraging active participation in community affairs.\n\nAt the Sidama Youth Council (SYC), Mr. Degree is the Executive Head of Structure and Membership, where he plays a crucial role in shaping the council's direction and ensuring that the voices of the youth are heard. His work focuses on creating inclusive platforms for young people to engage in discussions that affect their futures.\n\nIn addition to his leadership roles, Mr. Degree is also an Ambassador for Bitania College, where he promotes educational opportunities and encourages youth to pursue their academic ambitions.\n\nMr. Degree's immense experience in community engagement, coupled with his passion for justice and equality, drives his commitment to the development of the Sidama community. He believes in the power of youth to effect positive change and works tirelessly to provide them with the resources and support they need to succeed. Through his initiatives and leadership, Mr. Degree continues to inspire hope and foster a culture of empowerment among the youth of the Sidama Region.",
      email: "degree.mariam@sryc.org",
      phone: "+251 911 234 567"
    },
    {
      id: 2,
      name: "Yishak Sanbure",
      title: "President of the Sidama Region Youth Council",
      photo: yishakImage, // Added photo
      expertise: ["Youth Leadership", "Community Development", "Business Development"],
      fullBio: "My name is Yishak Sanbure, and I currently serve as the President of the Sidama Region Youth Council. I have previously worked as the Communication Executive Director for the Hawassa City Youth Association, where I gained valuable experience in youth engagement and community outreach. Additionally, I held leadership roles as a Team Leader and President within the Hawassa Youth Federation.\n\nI hold a degree in Geomatics Engineering from Wachemo University, which complements my practical experience in community development. Currently, I am also the Executive Director for Business and Commercial Development in the Haqi Dare Sub-City of Hawassa City, where I focus on fostering economic growth and opportunities for the community.",
      email: "yishak.sanbure@sryc.org",
      phone: "+251 922 345 678"
    },
    {
      id: 3,
      name: "Mr. Ashenafi Abirham Helsso",
      title: "Director of the Northern Sidama Zone Youth Directorate & Executive for Communication",
      photo: ashenafiImage, // Added photo
      expertise: ["Education", "Youth Development", "Community Development", "Communication"],
      fullBio: "Mr. Ashenafi Abirham Helsso is a committed educator and a passionate advocate for youth empowerment in the Sidama Region. He holds a Bachelor's degree in Education and has dedicated his career to teaching and community development. His journey began as a teacher, where he demonstrated exceptional leadership skills, eventually becoming the President of the Teachers Association.\n\nCurrently, Mr. Ashenafi serves as the Director of the Northern Sidama zone Youth Directorate and is an Executive for Communication at the Sidama Region Youth Council. His role is pivotal in shaping policies and initiatives that support the development and empowerment of young people in the region.\n\nIn addition to his extensive experience in education, Mr. Ashenafi has attained a Master's degree in Adult Education & Community Development from Ambo University. His academic background equips him with the knowledge and skills necessary to address the unique challenges faced by the youth today.\n\nMr. Ashenafi is deeply committed to the principles of justice, equality, and community development. He believes in creating opportunities for all young people, ensuring that they have the resources and support needed to thrive. His initiatives focus on fostering leadership skills, promoting social justice, and encouraging active participation in community affairs.\n\nThrough his work, Mr. Ashenafi continues to inspire and empower the youth of the Sidama Region, making a significant impact on their lives and contributing to the overall development of the community. His dedication and experience make him an invaluable asset to the Sidama Region Youth Council and a role model for future generations.",
      email: "ashenafi.helsso@sryc.org",
      phone: "+251 933 456 789"
    }
  ];

  const handleViewMore = (member) => {
    navigate(`/team-member/${member.id}`, { state: { memberData: member } });
  };

  return (
    <section className="team-section" ref={teamRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Leadership Team</h2>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member">
              <div className="member-avatar">
                {member.photo ? (
                  <img 
                    src={member.photo} 
                    alt={`${member.name} - ${member.title}`}
                    className="member-photo"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-title">{member.title}</p>
              </div>
              
              <button 
                className="view-more-btn"
                onClick={() => handleViewMore(member)}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team; 