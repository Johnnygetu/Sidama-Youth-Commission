import React from 'react';
import { useNavigate } from 'react-router-dom';
import degreeImage from '../../../assets/photo_2025-08-14_11-29-28.jpg';
import yishakImage from '../../../assets/photo_2025-08-14_11-53-35.jpg'; // Fixed import path
import ashenafiImage from '../../../assets/photo_2025-08-14_11-58-16.jpg'; // Added import
import vicePresidentImage from '../../../assets/vice president.jpg';
import deputyVicePresidentImage from '../../../assets/vice president2.jpg';
import './Team.css';
import abdulfetahImage from '../../../assets/executive.jpg';
import bontuImage from '../../../assets/bontu.jpg';
import bereketImage from '../../../assets/bereket.jpg';

const Team = ({ teamRef }) => {
  const navigate = useNavigate();

  const teamMembers = [
    // President
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
    // Advisory Board - Head of Women and Gender Affairs
    {
      id: 7,
      name: "Bontu Bogale Tenkolu",
      title: "Head of Women and Gender Affairs, Sidama Regional Youth Council",
      photo: bontuImage,
      expertise: [
        "Women Empowerment",
        "Community Health",
        "Youth-Friendly Services",
        "Program Leadership"
      ],
      fullBio:
        "Bontu Bogale is a dedicated leader serving as the Head of the Women and Gender Affairs Department within the Sidama Regional Youth Council. With a lifelong commitment to empowering women, Bontu works tirelessly to uplift those who have been overlooked, helping them realize their full potential.\n\nWith a professional background in Pharmacy, she has made significant contributions to health services and various community projects across the Sidama region. Her initiatives include Youth-Friendly Services, Integrated Package Delivery (IPD), and collaborations with organizations such as Save the Children, DOT, and Mary Joy Institution.\n\nAs the founder of the Good Seed Charity Organization, Bontu has positively impacted the lives of over 200 vulnerable individuals and leads a network of more than 300 active members. She also serves as the Sidama Region Women’s Voice Coordinator and holds an executive position within the Hawassa City Youth Federation.\n\nVision: Bontu envisions a future where women are empowered, individuals in need receive support, and youth transition from opportunity seekers to opportunity creators. She firmly believes that everyone possesses unique skills, wisdom, and knowledge that, when shared, can contribute to building a stronger and more prosperous nation.",
      email: "bontu.bogale@sryc.org",
      phone: "+251 900 000 008"
    },
    // Advisory Board - Secretary, SRYC (from provided details)
    {
      id: 8,
      name: "Mr. Bereket Beyene Kekebo",
      title: "Secretary of the Sidama Region Youth Council",
      photo: bereketImage,
      expertise: [
        "Public Administration",
        "Youth Leadership",
        "Organizational Development",
        "Community Empowerment"
      ],
      fullBio:
        "Mr. Bereket Beyene Kekebo is a dedicated public servant and an active advocate for youth leadership and community empowerment in the Sidama Region. He holds a Bachelor’s degree in Public Administration and Development Management as well as a Master’s degree in Business Administration (MBA), which provide him with a strong foundation in governance, leadership, and organizational development.\n\nMr. Bereket’s career reflects his deep commitment to advancing youth participation in decision-making and development processes. Over the years, he has taken on significant roles that allow him to contribute both regionally and nationally.\n\nCurrently, Mr. Bereket serves as the Secretary of the Sidama Region Youth Council. He is also the President of the Sidama Region Youth Association, a member of the Federal Youth Council, and an active member of the Sidama Youth Federation. In addition, he serves as the Head of Hawassa City Administration Tula Sub-City Youth Affairs, where he works directly with local communities to create opportunities for young people to thrive.\n\nMr. Bereket’s academic background and professional experience enable him to address pressing challenges faced by the youth while fostering opportunities in leadership, education, and entrepreneurship. A strong believer in justice, equality, and inclusive development, he champions initiatives that promote youth empowerment, social cohesion, and sustainable progress in the Sidama Region.\n\nThrough his work, he continues to inspire, support, and guide the next generation of leaders, making a lasting impact on both the local community and the broader national landscape.",
      email: "bereket.beyene@sryc.org",
      phone: "+251 900 000 009"
    },
    // Vice President
    {
      id: 4,
      name: "Mr. Desta Legese",
      title: "Vice President of the Sidama Region Youth Council",
      photo: vicePresidentImage,
      expertise: ["Youth Leadership", "Computer Science", "Data and Web Engineering", "Public Administration", "Youth Empowerment"],
      fullBio: "Mr. Desta Legese is a dynamic young leader currently serving as the deputy bureau head and head of the Youth Department at the Sidama National Regional State bureau of Women's, Youth and Social Affairs.\n\nHis educational background and experience is a BSC in Computer Science from Mizan Tepi University and an MSC in Data and Web Engineering specialization in Computer Science from Addis Abeba University, and he graduated with very good thesis results.\n\nHe was a former lecturer at Mizan Tepi University from August 2008 E.C. up to May 2013 E.C. and head of public relations and digital technology at the SNRS President office from May 2013 E.C. up to June 2014 E.C. Also, he was a national leader at the Ship for World Youth Program for one month in Japan.\n\nIn his current role, he is dedicated to promoting youth empowerment, advocating for their rights, and implementing programs that foster social and economic development among young people in the region.\n\nHis leadership in a region implies him as exemplary, with the capacity to organize youth-led CSO organizations and lead youth organization forums named Youth Association, Youth Federation, Youth Council, and so on.\n\nAs per his responsibility, the leadership he provides to ensure the comprehensive benefit and participation of the youth is decisive. He is effectively fulfilling his role of coordinating the widespread participation of the youth in voluntary service as well as youth peace and security. In addition, he is providing strategic leadership to create a healthy and economically beneficial youth in the region.\n\nAs an executive member of the Ethiopian Youth Council, Mr. Desta plays a crucial role in shaping national policies and initiatives aimed at addressing the needs and aspirations of the youth across Ethiopia. His leadership in this capacity allows him to collaborate with various stakeholders, including government agencies, NGOs, and community organizations, to create opportunities for youth engagement and participation in decision-making processes.\n\nAdditionally, as the Vice President of the Sidama Region Youth Council, he has been instrumental in mobilizing youth around key issues such as education, employment, health, and civic engagement. His vision for a more inclusive and equitable society drives his efforts to empower young leaders and encourage their active involvement in community development.\n\nMr. Desta's commitment to youth advocacy is reflected in his participation in various forums and conferences, where he shares insights on youth-related challenges and solutions. He is passionate about harnessing the potential of young people to contribute positively to their communities and the nation at large. Through his work, he aims to inspire a new generation of leaders who are equipped to tackle the pressing issues facing their peers and society.",
      email: "desta.legese@sryc.org",
      phone: "+251 944 567 890"
    },
    // Deputy Vice President
    {
      id: 5,
      name: "Essay Petros",
      title: "Deputy Vice President of the Sidama Region Youth Council",
      photo: deputyVicePresidentImage,
      expertise: ["Youth Leadership", "Community Development", "Project Management", "Youth Empowerment"],
      fullBio: "Essay Petros serves as the Deputy Vice President of the Sidama Region Youth Council, supporting the Vice President in leadership and administrative functions. He brings valuable experience in youth development and community engagement to the council.\n\nIn his role as Deputy Vice President, he assists in coordinating youth programs, facilitating community outreach initiatives, and supporting the overall mission of the Sidama Region Youth Council. His dedication to youth empowerment and community development makes him an integral part of the leadership team.\n\nThrough his collaborative approach and strong leadership skills, he contributes to the council's efforts in promoting youth participation, education, and social development across the region.",
      email: "deputy.vp@sryc.org",
      phone: "+251 955 678 901"
    },
    // Executive Head
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
    // Director / Executive for Communication
    {
      id: 3,
      name: "Mr. Ashenafi Abirham Helsso",
      title: "Director of the Northern Sidama Zone Youth Directorate & Executive for Communication",
      photo: ashenafiImage, // Added photo
      expertise: ["Education", "Youth Development", "Community Development", "Communication"],
      fullBio: "Mr. Ashenafi Abirham Helsso is a committed educator and a passionate advocate for youth empowerment in the Sidama Region. He holds a Bachelor's degree in Education and has dedicated his career to teaching and community development. His journey began as a teacher, where he demonstrated exceptional leadership skills, eventually becoming the President of the Teachers Association.\n\nCurrently, Mr. Ashenafi serves as the Director of the Northern Sidama zone Youth Directorate and is an Executive for Communication at the Sidama Region Youth Council. His role is pivotal in shaping policies and initiatives that support the development and empowerment of young people in the region.\n\nIn addition to his extensive experience in education, Mr. Ashenafi has attained a Master's degree in Adult Education & Community Development from Ambo University. His academic background equips him with the knowledge and skills necessary to address the unique challenges faced by the youth today.\n\nMr. Ashenafi is deeply committed to the principles of justice, equality, and community development. He believes in creating opportunities for all young people, ensuring that they have the resources and support needed to thrive. His initiatives focus on fostering leadership skills, promoting social justice, and encouraging active participation in community affairs.\n\nThrough his work, Mr. Ashenafi continues to inspire and empower the youth of the Sidama Region, making a significant impact on their lives and contributing to the overall development of the community. His dedication and experience make him an invaluable asset to the Sidama Region Youth Council and a role model for future generations.",
      email: "ashenafi.helsso@sryc.org",
      phone: "+251 933 456 789"
    },
    // President Office Secretary
    {
      id: 6,
      name: "Abdulfetah Bushura",
      title: "President Office Secretary",
      photo: abdulfetahImage,
      expertise: [
        "LLB in Laws",
        "Trainer",
        "Leader",
        "Advisory Board Member of Sidama Region Youth Council",
      ],
      fullBio: "Abdulfetah Bushura is a dedicated public servant and emerging youth leader serving as the President Office Secretary. With an LLB in Laws, he brings a strong legal foundation to organizational governance, documentation, and policy implementation. Abdulfetah is an experienced trainer and facilitator who champions youth leadership, ethical public service, and inclusive engagement. As an Advisory Board Member of the Sidama Region Youth Council, he collaborates with stakeholders to advance youth rights, civic participation, and community development. Known for his disciplined work ethic, collaborative leadership, and solution-oriented mindset, Abdulfetah is committed to building accountable institutions and empowering the next generation of leaders in the Sidama Region.",
      email: "abdulfetah.bushura@sryc.org",
      phone: "+251 900 000 007"
    }
  ];

  const handleViewMore = (member) => {
    navigate(`/team-member/${member.id}`, { state: { memberData: member } });
  };

  return (
    <section className="team-section" ref={teamRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Team</h2>
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
                className="btn btn-primary"
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