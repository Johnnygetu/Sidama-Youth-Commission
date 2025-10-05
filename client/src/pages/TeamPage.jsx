import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, PageHeader, TeamMemberCard } from "../components";
import degreeImage from "../assets/photo_2025-08-14_11-29-28.jpg";
import yishakImage from "../assets/photo_2025-08-14_11-53-35.jpg";
import ashenafiImage from "../assets/photo_2025-08-14_11-58-16.jpg";
import yabseraImage from "../assets/yabseraImage.jpg";
import logoImage from "/images/mekerbet-logo.jpg";
import "./TeamPage.css";
import solomonImage from "../assets/solomonImage.jpg";
import mesayImage from "../assets/mesayImage.jpg";
import temesgenImage from "../assets/temesgenImage.jpg";
import danielImage from "../assets/danielImage.jpg";
import bekaluImage from "../assets/bekaluImage.jpg";
import nigussieImage from "../assets/nigussieImage.jpg";
import honelignImage from "../assets/honelignImage.JPG";
import vicePresidentImage from "../assets/vice president.jpg";
import deputyVicePresidentImage from "../assets/vice president2.jpg";
import abdulfetahImage from "../assets/executive.jpg";
import bontuImage from "../assets/bontu.jpg";
import bereketImage from "../assets/bereket.jpg";

const TeamPage = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const teamRef = useRef(null);
  const advisoryRef = useRef(null);
  const auditRef = useRef(null);

  const teamMembers = [
    // President
    {
      id: 2,
      name: "Yishak Sanbure",
      title: "President of the Sidama Region Youth Council",
      photo: yishakImage,
      expertise: [
        "Youth Leadership",
        "Community Development",
        "Business Development",
      ],
      fullBio:
        "My name is Yishak Sanbure, and I currently serve as the President of the Sidama Region Youth Council. I have previously worked as the Communication Executive Director for the Hawassa City Youth Association, where I gained valuable experience in youth engagement and community outreach. Additionally, I held leadership roles as a Team Leader and President within the Hawassa Youth Federation.\n\nI hold a degree in Geomatics Engineering from Wachemo University, which complements my practical experience in community development. Currently, I am also the Executive Director for Business and Commercial Development in the Haqi Dare Sub-City of Hawassa City, where I focus on fostering economic growth and opportunities for the community.",
      email: "yishak.sanbure@sryc.org",
      phone: "+251 922 345 678",
    },
    // Vice President
    {
      id: 4,
      name: "Mr. Desta Legese",
      title: "Vice President of the Sidama Region Youth Council",
      photo: vicePresidentImage,
      expertise: [
        "Youth Leadership",
        "Computer Science",
        "Data and Web Engineering",
        "Public Administration",
        "Youth Empowerment",
      ],
      fullBio:
        "Mr. Desta Legese is a dynamic young leader currently serving as the deputy bureau head and head of the Youth Department at the Sidama National Regional State bureau of Women's, Youth and Social Affairs.\n\nHis educational background and experience is a BSC in Computer Science from Mizan Tepi University and an MSC in Data and Web Engineering specialization in Computer Science from Addis Abeba University, and he graduated with very good thesis results.\n\nHe was a former lecturer at Mizan Tepi University from August 2008 E.C. up to May 2013 E.C. and head of public relations and digital technology at the SNRS President office from May 2013 E.C. up to June 2014 E.C. Also, he was a national leader at the Ship for World Youth Program for one month in Japan.\n\nIn his current role, he is dedicated to promoting youth empowerment, advocating for their rights, and implementing programs that foster social and economic development among young people in the region.\n\nHis leadership in a region implies him as exemplary, with the capacity to organize youth-led CSO organizations and lead youth organization forums named Youth Association, Youth Federation, Youth Council, and so on.\n\nAs per his responsibility, the leadership he provides to ensure the comprehensive benefit and participation of the youth is decisive. He is effectively fulfilling his role of coordinating the widespread participation of the youth in voluntary service as well as youth peace and security. In addition, he is providing strategic leadership to create a healthy and economically beneficial youth in the region.\n\nAs an executive member of the Ethiopian Youth Council, Mr. Desta plays a crucial role in shaping national policies and initiatives aimed at addressing the needs and aspirations of the youth across Ethiopia. His leadership in this capacity allows him to collaborate with various stakeholders, including government agencies, NGOs, and community organizations, to create opportunities for youth engagement and participation in decision-making processes.\n\nAdditionally, as the Vice President of the Sidama Region Youth Council, he has been instrumental in mobilizing youth around key issues such as education, employment, health, and civic engagement. His vision for a more inclusive and equitable society drives his efforts to empower young leaders and encourage their active involvement in community development.\n\nMr. Desta's commitment to youth advocacy is reflected in his participation in various forums and conferences, where he shares insights on youth-related challenges and solutions. He is passionate about harnessing the potential of young people to contribute positively to their communities and the nation at large. Through his work, he aims to inspire a new generation of leaders who are equipped to tackle the pressing issues facing their peers and society.",
      email: "desta.legese@sryc.org",
      phone: "+251 944 567 890",
    },
    // Deputy Vice President
    {
      id: 5,
      name: "Essay Petros",
      title: "Deputy Vice President of the Sidama Region Youth Council",
      photo: deputyVicePresidentImage,
      expertise: [
        "Youth Leadership",
        "Community Development",
        "Project Management",
        "Youth Empowerment",
      ],
      fullBio:
        "Essay Petros serves as the Deputy Vice President of the Sidama Region Youth Council, supporting the Vice President in leadership and administrative functions. He brings valuable experience in youth development and community engagement to the council.\n\nIn his role as Deputy Vice President, he assists in coordinating youth programs, facilitating community outreach initiatives, and supporting the overall mission of the Sidama Region Youth Council. His dedication to youth empowerment and community development makes him an integral part of the leadership team.\n\nThrough his collaborative approach and strong leadership skills, he contributes to the council's efforts in promoting youth participation, education, and social development across the region.",
      email: "deputy.vp@sryc.org",
      phone: "+251 955 678 901",
    },
    // Executive Head
    {
      id: 1,
      name: "Mr. Degree H/Mariam",
      title: "Executive Head of Structure and Membership",
      photo: degreeImage,
      expertise: ["Youth Leadership", "Community Development", "Communication"],
      fullBio:
        "Mr. Degree H/Mariam is a dedicated leader and an advocate for youth empowerment in the Sidama Region. He graduated with a Bachelor of Accounting and Finance degree from Zion University College, where he laid the foundation for a career focused on communication and community development. His commitment to serving the youth began as a Communication Expert at the Sidama Region Central Zone in Dale Woreda, where he worked diligently to bridge gaps in communication and promote effective dialogue within the community.\n\nCurrently, Mr. Degree serves as the President of the Central Sidama Zone Youth Federation, a role that highlights his leadership abilities and dedication to enhancing the lives of young people. He has also held significant positions, including at Sidama Region Health Bureau Member of the Teenagers and Youths Health Council and President of the Central Sidama Zone Clubs Association. In these capacities, he has championed initiatives that empower youth, fostering their leadership skills and encouraging active participation in community affairs.\n\nAt the Sidama Youth Council (SYC), Mr. Degree is the Executive Head of Structure and Membership, where he plays a crucial role in shaping the council's direction and ensuring that the voices of the youth are heard. His work focuses on creating inclusive platforms for young people to engage in discussions that affect their futures.\n\nIn addition to his leadership roles, Mr. Degree is also an Ambassador for Bitania College, where he promotes educational opportunities and encourages youth to pursue their academic ambitions.\n\nMr. Degree's immense experience in community engagement, coupled with his passion for justice and equality, drives his commitment to the development of the Sidama community. He believes in the power of youth to effect positive change and works tirelessly to provide them with the resources and support they need to succeed. Through his initiatives and leadership, Mr. Degree continues to inspire hope and foster a culture of empowerment among the youth of the Sidama Region.",
      email: "degree.mariam@sryc.org",
      phone: "+251 911 234 567",
    },
    // Director / Executive for Communication
    {
      id: 3,
      name: "Mr. Ashenafi Abirham Helsso",
      title:
        "Director of the Northern Sidama Zone Youth Directorate & Executive for Communication",
      photo: ashenafiImage,
      expertise: [
        "Education",
        "Youth Development",
        "Community Development",
        "Communication",
      ],
      fullBio:
        "Mr. Ashenafi Abirham Helsso is a committed educator and a passionate advocate for youth empowerment in the Sidama Region. He holds a Bachelor's degree in Education and has dedicated his career to teaching and community development. His journey began as a teacher, where he demonstrated exceptional leadership skills, eventually becoming the President of the Teachers Association.\n\nCurrently, Mr. Ashenafi serves as the Director of the Northern Sidama zone Youth Directorate and is an Executive for Communication at the Sidama Region Youth Council. His role is pivotal in shaping policies and initiatives that support the development and empowerment of young people in the region.\n\nIn addition to his extensive experience in education, Mr. Ashenafi has attained a Master's degree in Adult Education & Community Development from Ambo University. His academic background equips him with the knowledge and skills necessary to address the unique challenges faced by the youth today.\n\nMr. Ashenafi is deeply committed to the principles of justice, equality, and community development. He believes in creating opportunities for all young people, ensuring that they have the resources and support needed to thrive. His initiatives focus on fostering leadership skills, promoting social justice, and encouraging active participation in community affairs.\n\nThrough his work, Mr. Ashenafi continues to inspire and empower the youth of the Sidama Region, making a significant impact on their lives and contributing to the overall development of the community. His dedication and experience make him an invaluable asset to the Sidama Region Youth Council and a role model for future generations.",
      email: "ashenafi.helsso@sryc.org",
      phone: "+251 933 456 789",
    },
    // Executive - Secretary (placed second to last)
    {
      id: 8,
      name: "Mr. Bereket Beyene Kekebo",
      title: "Secretary of the Sidama Region Youth Council",
      photo: bereketImage,
      expertise: [
        "Public Administration",
        "Youth Leadership",
        "Organizational Development",
        "Community Empowerment",
      ],
      fullBio:
        "Mr. Bereket Beyene Kekebo is a dedicated public servant and an active advocate for youth leadership and community empowerment in the Sidama Region. He holds a Bachelor’s degree in Public Administration and Development Management and a Master’s degree in Business Administration (MBA).\n\nHis career reflects a deep commitment to advancing youth participation in decision-making and development processes. Currently, he serves as the Secretary of the Sidama Region Youth Council, President of the Sidama Region Youth Association, a member of the Federal Youth Council, and an active member of the Sidama Youth Federation. In addition, he is Head of Hawassa City Administration Tula Sub-City Youth Affairs.\n\nWith a strong academic and professional foundation, Mr. Bereket addresses pressing challenges facing youth while fostering opportunities in leadership, education, and entrepreneurship. A strong believer in justice, equality, and inclusive development, he champions initiatives that promote youth empowerment, social cohesion, and sustainable progress in the Sidama Region.\n\nThrough his work, he continues to inspire, support, and guide the next generation of leaders, making a lasting impact on both the local community and the broader national landscape.",
      email: "bereket.beyene@sryc.org",
      phone: "+251 900 000 009",
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
      fullBio:
        "Abdulfetah Bushura is a dedicated public servant and emerging youth leader serving as the President Office Secretary. With an LLB in Laws, he brings a strong legal foundation to organizational governance, documentation, and policy implementation. Abdulfetah is an experienced trainer and facilitator who champions youth leadership, ethical public service, and inclusive engagement. As an Advisory Board Member of the Sidama Region Youth Council, he collaborates with stakeholders to advance youth rights, civic participation, and community development. Known for his disciplined work ethic, collaborative leadership, and solution-oriented mindset, Abdulfetah is committed to building accountable institutions and empowering the next generation of leaders in the Sidama Region.",
      email: "abdulfetah.bushura@sryc.org",
      phone: "+251 900 000 007",
    },
  ];

  const advisoryBoardMembers = [
    // Added per request: Bontu Bogale Tenkolu
    {
      id: 101,
      name: "Bontu Bogale Tenkolu",
      title:
        "Head of Women and Gender Affairs, Sidama Regional Youth Council",
      photo: bontuImage,
      expertise: [
        "Women Empowerment",
        "Community Health",
        "Youth-Friendly Services (YFS)",
        "Program Leadership",
      ],
      fullBio:
        "Bontu Bogale is a dedicated leader serving as the Head of the Women and Gender Affairs Department within the Sidama Regional Youth Council. With a lifelong commitment to empowering women, Bontu works tirelessly to uplift those who have been overlooked, helping them realize their full potential.\n\nWith a professional background in Pharmacy, she has made significant contributions to health services and various community projects across the Sidama region. Her initiatives include Youth-Friendly Services, Integrated Package Delivery (IPD), and collaborations with organizations such as Save the Children, DOT, and Mary Joy Institution.\n\nAs the founder of the Good Seed Charity Organization, Bontu has positively impacted the lives of over 200 vulnerable individuals and leads a network of more than 300 active members. She also serves as the Sidama Region Women’s Voice Coordinator and holds an executive position within the Hawassa City Youth Federation.\n\nVision: Bontu envisions a future where women are empowered, individuals in need receive support, and youth transition from opportunity seekers to opportunity creators. She believes that everyone possesses unique skills, wisdom, and knowledge that, when shared, can build a stronger and more prosperous nation.",
      email: "bontu.bogale@sryc.org",
      phone: "+251 900 000 008",
    },
    {
      id: 1,
      name: "Yabsera Fierw",
      title:
        "Advisory Board Member of Sidama Region Youth Council | Youth Women Disability Empowerment",
      photo: yabseraImage,
      expertise: [
        "Business Management",
        "Youth Empowerment",
        "Disability Rights",
        "Women Empowerment",
      ],
      fullBio:
        "YABSERA Fierw is a dedicated advocate for youth women disability empowerment and holds a Bachelor's degree in Business Management. She brings a unique perspective and valuable expertise to the Sidama Region Youth Council through her commitment to inclusive development and equal opportunities for all.\n\nAs an Advisory Board Member, YABSERA focuses on ensuring that the council's programs and initiatives are accessible and beneficial to youth with disabilities, particularly young women. Her background in business management enables her to provide strategic insights into organizational development and program implementation.\n\nYABSERA's work emphasizes the importance of creating inclusive spaces where young women with disabilities can thrive, develop their skills, and contribute meaningfully to their communities. She advocates for policies and programs that address the specific challenges faced by this demographic while promoting their strengths and capabilities.\n\nThrough her role on the Advisory Board, YABSERA helps guide the council's efforts in creating more inclusive and empowering opportunities for all youth in the Sidama Region, with particular attention to the intersection of gender, disability, and youth development.",
      email: "yabsera.fierw@sryc.org",
      phone: "+251 911 000 000",
    },
    {
      id: 2,
      name: "Solomon Ermias",
      title:
        "BSC in SOFTWARE ENGINEERING & MA IN ORGANIZATIONAL LEADERSHIP | SPEAKER | Counselor | Advisory Board Member of Sidama Region Youth Council",
      photo: solomonImage,
      expertise: [
        "Software Engineering",
        "Organizational Leadership",
        "Public Speaking",
        "Counseling",
      ],
      fullBio:
        "Solomon Ermias holds a BSc in Software Engineering and an MA in Organizational Leadership. He is a speaker and counselor, and serves as an Advisory Board Member of the Sidama Region Youth Council.",
      email: "solomon.ermias@sryc.org",
      phone: "+251 900 000 000",
    },
    {
      id: 3,
      name: "Mesay Samuel",
      title:
        "Strategic partnership head | law student | peace advocate | youth empowerment | member of youth council advisory board",
      photo: mesayImage,
      expertise: [
        "Strategic Partnerships",
        "Law Student",
        "Peace Advocacy",
        "Youth Empowerment",
      ],
      fullBio:
        "Mesay Samuel is a law student, peace advocate, and youth empowerment champion serving as Strategic Partnership Head and a member of the Youth Council Advisory Board.",
      email: "mesay.samuel@sryc.org",
      phone: "+251 900 000 001",
    },
    {
      id: 4,
      name: "Temesgen Guye Bele",
      title:
        "Head of Structure and Planning | BA in Accounting and Finance | Member of Advisory Board of Sidama Region Youth Council",
      photo: temesgenImage,
      expertise: [
        "Structure and Planning",
        "Accounting and Finance",
        "Youth Council Advisory",
      ],
      fullBio:
        "Temesgen Guye Bele is Head of Structure and Planning with a BA in Accounting and Finance, and serves as a Member of the Advisory Board of the Sidama Region Youth Council.",
      email: "temesgen.bele@sryc.org",
      phone: "+251 900 000 002",
    },
    {
      id: 5,
      name: "Daniel Gabiba Gabiso",
      title:
        "BSc Hydraulic and Water Resources Engineering | MSc Planning and Project Management | Event Coordinator in Sidama Region Youth Council (Advisory Board)",
      photo: danielImage,
      expertise: [
        "Hydraulic and Water Resources Engineering",
        "Planning and Project Management",
        "Event Coordination",
      ],
      fullBio:
        "Daniel Gabiba Gabiso holds a BSc in Hydraulic and Water Resources Engineering and an MSc in Planning and Project Management. He serves as Event Coordinator in the Sidama Region Youth Council and is a member of the Advisory Board.",
      email: "daniel.gabiso@sryc.org",
      phone: "+251 900 000 003",
    },
  ];

  const auditAndInspectionMembers = [
    {
      id: 1,
      name: "Mr. Bekalu Meseret Girefe",
      title:
        "Head of the Audit and Inspection Committee | President, Hawassa City Youth Association | Executive Director, Meqrez Integrated Youth Development Organization",
      photo: bekaluImage,
      expertise: [
        "Audit and Inspection",
        "Youth Leadership",
        "Project Management",
        "Entrepreneurship Training",
      ],
      fullBio:
        "Mr. Bekalu Meseret Girefe is a dynamic and vibrant leader dedicated to youth development in the Hawassa and Sidama regions. He holds a Bachelor's degree in Psychology and a Master's degree in Project Management, equipping him with a unique blend of knowledge and skills to address the challenges faced by young people today. At just 29 years old, he embodies the spirit of youth empowerment.\n\nAs the President of the Hawassa City Youth Association, Mr. Bekalu plays a crucial role in advocating for the needs and aspirations of the youth. His leadership extends to his position as the Executive Director of Meqrez Integrated Youth Development Organization, where he oversees initiatives aimed at empowering young individuals through education, skill development, and community engagement.\n\nMr. Bekalu is also a certified life skills and entrepreneurship trainer, passionate about equipping youth with essential skills for personal and professional growth. His commitment to fostering a culture of entrepreneurship and self-reliance among young people is evident in the programs he implements.\n\nBelieving in the potential of every young person, Mr. Bekalu emphasizes the importance of leadership, social responsibility, and active participation in community affairs. His initiatives focus on creating opportunities for youth to thrive, ensuring they have the resources and support necessary to succeed.\n\nThrough his unwavering dedication and innovative approach, Mr. Bekalu Meseret Girefe continues to inspire the youth, making a significant impact on their lives and contributing to the overall development of the community. Currently, he serves as the Head of the Audit and Inspection Committee for the Sidama Youth Council, ensuring accountability and transparency in youth programs. His vision and leadership make him a role model for future generations.",
      email: "bekalu.girefe@sryc.org",
      phone: "+251 900 000 004",
    },
    {
      id: 2,
      name: "Mr. Nigussie Worku Wogaaso",
      title:
        "Member, Audit and Inspection Committee | President, Sidama Youth Federation",
      photo: nigussieImage,
      expertise: [
        "Educational Sport Science",
        "Business Administration",
        "Life Skills Training",
        "Youth Empowerment",
      ],
      fullBio:
        "Mr. Nigussie is a dedicated leader focused on youth empowerment in the Sidama region. With a strong educational foundation, he addresses the challenges faced by young people and advocates for their needs and aspirations. As a certified life skills trainer, he equips youth with essential skills for personal and professional growth.\n\nCore Beliefs: Mr. Nigussie believes in the potential of every young individual. He emphasizes the importance of leadership, social responsibility, and active community engagement, striving to create opportunities for young people to thrive.\n\nImpact: Through his innovative approach and unwavering dedication, Mr. Nigussie is making a significant difference in the lives of youth. He fosters a culture of self-reliance and inspires the next generation through his vision and leadership.\n\nRole Model: His commitment to youth development and community improvement makes him a role model for young people, guiding them towards a brighter future.",
      email: "nigussie.wogaaso@sryc.org",
      phone: "+251 900 000 005",
    },
    {
      id: 3,
      name: "Mr. Honelign Leta Kayamo",
      title:
        "Secretary General, Hawassa City Youth Federation | President, Nisir Volunteer Association",
      photo: honelignImage,
      expertise: [
        "Accounting and Finance",
        "Youth Leadership",
        "Community Development",
        "Mentorship and Training",
      ],
      fullBio:
        "Overview\n\nMr. Honelign Leta Kayamo is an energetic and visionary leader dedicated to advancing youth development in the Hawassa and Sidama regions. With a robust educational background in accounting and finance, he is well-equipped to tackle the challenges faced by young people today. His commitment to youth empowerment embodies the spirit of innovation and progress.\n\nLeadership Roles\n\nsecratery general, Hawassa City Youth Federation In this pivotal role, Mr. Honelign champions the ambitions and interests of young people, advocating for their rights and needs within the community.\nPresident, Nisir Volunteer Association He directs impactful initiatives focused on education, skills training, and community engagement, fostering a supportive environment for youth development.\n\nSkills and Certifications\n\nVision and Impact\n\nBelieving in the potential of every young individual, Mr. Honelign works tirelessly to create inclusive opportunities for youth to excel. His initiatives are designed to provide the necessary resources and mentorship, ensuring young people can thrive in various aspects of their lives.\n\nThrough his steadfast commitment and forward-thinking approach, Mr. Honelign continues to inspire and empower the younger generation. His vision and achievements position him as a true role model, significantly contributing to the broader development of his community and leaving a lasting impact on the lives of many.",
      email: "honelign.kayamo@sryc.org",
      phone: "+251 900 000 006",
    },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elementsToObserve = [
      headerRef.current,
      teamRef.current,
      advisoryRef.current,
      auditRef.current,
    ].filter(Boolean);

    elementsToObserve.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elementsToObserve.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleViewMore = (member) => {
    navigate(`/team-member/${member.id}`, { state: { memberData: member } });
  };

  return (
    <div className="team-page">
      <Navbar />

      <PageHeader
        title="Our Team"
        subtitle="Meet the dedicated people who are driving positive change and empowering youth in the Sidama Region. Our team brings together diverse expertise and a shared commitment to community development."
        logoImage={logoImage}
        headerRef={headerRef}
      />

      {/* Team Section */}
      <section className="team" id="team" ref={teamRef}>
        <div className="container">
          <h2 className="section-title">Executives</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onViewProfile={handleViewMore}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board Section */}
      <section className="advisory-board" id="advisory-board" ref={advisoryRef}>
        <div className="container">
          <h2 className="section-title">Advisory Board</h2>
          <div className="team-grid">
            {advisoryBoardMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onViewProfile={handleViewMore}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Audit and Inspection Team Section */}
      <section className="team" id="audit-inspection" ref={auditRef}>
        <div className="container">
          <h2 className="section-title">Audit and Inspection Team</h2>
          <div className="team-grid">
            {auditAndInspectionMembers.length === 0 ? (
              <p>No members added yet.</p>
            ) : (
              auditAndInspectionMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onViewProfile={handleViewMore}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
