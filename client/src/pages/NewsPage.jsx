import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Footer } from '../components';
import NewsDetail from '../components/NewsDetail/NewsDetail';
import './NewsPage.css';
import logoImage from '/images/mekerbet-logo.jpg';

const NewsPage = () => {
  const newsRef = useRef(null);
  const eventsRef = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsToShow, setNewsToShow] = useState(6); // Show first 6 news articles initially
  const [eventsToShow, setEventsToShow] = useState(6); // Show first 6 events initially

  // News articles data with full content
  const newsArticles = [
    {
      id: 1,
      title: "Youth Leadership Workshop Success",
      day: "15",
      month: "Dec",
      author: "Admin",
      fullDate: "December 15, 2024",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      tags: ["Leadership", "Workshop", "Youth Development"],
      fullContent: [
        "Our recent youth leadership workshop brought together over 100 young leaders from across the region, marking a significant milestone in our commitment to empowering the next generation of community leaders.",
        "The three-day intensive program was designed to equip participants with essential leadership skills, including effective communication, strategic thinking, and community engagement strategies. Through interactive sessions, group activities, and real-world case studies, participants gained practical experience in leading teams and driving positive change.",
        "Key highlights of the workshop included sessions on conflict resolution, project management, and digital leadership. Expert facilitators from various sectors shared their insights and experiences, providing valuable mentorship to the young participants.",
        "The workshop also featured networking opportunities, allowing participants to connect with like-minded individuals and potential collaborators. Many participants expressed their enthusiasm for implementing the skills they learned in their respective communities.",
        "As a result of this successful workshop, we've established a network of young leaders who are now actively working on community projects. The impact of this initiative is already being felt across the region, with several new youth-led initiatives taking shape.",
        "We're proud to announce that this workshop will become an annual event, with plans to expand its reach and impact in the coming years. Our commitment to youth development remains at the core of our mission."
      ]
    },
    {
      id: 2,
      title: "Community Development Project Launch",
      day: "12",
      month: "Dec",
      author: "Admin",
      fullDate: "December 12, 2024",
      category: "Community Development",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
      tags: ["Community", "Development", "Sustainability"],
      fullContent: [
        "We're excited to announce the launch of our new community development project focused on sustainable agriculture and environmental conservation. This comprehensive initiative represents a significant step forward in our commitment to creating lasting positive change in our community.",
        "The project, which spans over 12 months, will focus on three key areas: sustainable farming practices, environmental education, and community capacity building. Through partnerships with local farmers, educational institutions, and environmental experts, we aim to create a model for sustainable community development.",
        "Sustainable agriculture training will be a cornerstone of this project, teaching community members modern farming techniques that are both environmentally friendly and economically viable. Participants will learn about crop rotation, organic pest management, and water conservation methods.",
        "Environmental education programs will be implemented in local schools and community centers, raising awareness about the importance of environmental conservation and sustainable living practices. These programs will target both children and adults, ensuring long-term impact.",
        "Community capacity building initiatives will focus on developing local leadership and organizational skills, enabling community members to take ownership of their development process. This includes training in project management, fundraising, and community mobilization.",
        "The project is expected to benefit over 500 families directly, with indirect benefits reaching thousands more. We're committed to monitoring and evaluating the project's impact, ensuring that our efforts lead to measurable positive outcomes for the community."
      ]
    },
    {
      id: 3,
      title: "Partnership with Universities Announced",
      day: "08",
      month: "Dec",
      author: "Admin",
      fullDate: "December 8, 2024",
      category: "Partnerships",
      image: "https://images.unsplash.com/photo-1523240795131-0a3f4bf0e132?w=400&h=200&fit=crop",
      tags: ["Partnership", "Education", "Research"],
      fullContent: [
        "We're thrilled to announce a groundbreaking partnership with leading universities in the region. This collaboration will create new opportunities for research, education, and community engagement, marking a significant milestone in our organization's development.",
        "The partnership will establish joint research programs focused on youth development, community health, and sustainable development. University researchers will work alongside our team to conduct studies that address real community challenges and develop evidence-based solutions.",
        "Educational programs will be developed to provide young people with access to quality education and training opportunities. This includes scholarship programs, mentorship initiatives, and skills development workshops that align with current market demands.",
        "Community engagement activities will bring university students and faculty into direct contact with our community, creating opportunities for knowledge exchange and mutual learning. These activities will include community service projects, research collaborations, and cultural exchange programs.",
        "The partnership also includes plans for establishing a community learning center that will serve as a hub for educational activities, research projects, and community meetings. This center will be equipped with modern facilities and resources to support various educational and community development initiatives.",
        "We believe this partnership will create lasting benefits for both the academic community and our local population, fostering innovation, knowledge sharing, and sustainable development practices."
      ]
    },
    {
      id: 4,
      title: "Digital Skills Training Program",
      day: "05",
      month: "Dec",
      author: "Admin",
      fullDate: "December 5, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      tags: ["Technology", "Digital Skills", "Training"],
      fullContent: [
        "Our new digital skills training program is now accepting applications from young people interested in developing their technology skills. This comprehensive program is designed to bridge the digital divide and prepare participants for the modern workforce.",
        "The program covers essential digital skills including computer literacy, internet safety, social media management, and basic programming. Participants will also learn about digital entrepreneurship and how to leverage technology for business development.",
        "Training sessions are conducted by experienced IT professionals and educators who are committed to making technology accessible to everyone. The curriculum is designed to be practical and relevant to current market needs.",
        "Participants will have access to modern computer equipment and software, ensuring they gain hands-on experience with the tools they'll need in the workplace. The program also includes career counseling and job placement assistance.",
        "Special attention is given to digital safety and responsible internet use, preparing participants to navigate the digital world safely and ethically. This includes training on cybersecurity, privacy protection, and digital citizenship.",
        "The program is structured to accommodate different skill levels, from complete beginners to those with some computer experience. Flexible scheduling options are available to ensure accessibility for all participants."
      ]
    },
    {
      id: 5,
      title: "Environmental Awareness Campaign",
      day: "01",
      month: "Dec",
      author: "Admin",
      fullDate: "December 1, 2024",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
      tags: ["Environment", "Awareness", "Conservation"],
      fullContent: [
        "Our environmental awareness campaign has reached over 10,000 people across the region, raising awareness about the importance of environmental conservation and sustainable living practices.",
        "The campaign included educational workshops, community clean-up events, and tree planting initiatives. These activities were designed to engage people of all ages and backgrounds in environmental protection efforts.",
        "Educational workshops covered topics such as waste management, water conservation, and renewable energy. Participants learned practical ways to reduce their environmental impact and promote sustainability in their daily lives.",
        "Community clean-up events brought together volunteers from all walks of life to clean public spaces and raise awareness about the importance of keeping our environment clean. These events also served as opportunities for community building and networking.",
        "Tree planting initiatives focused on restoring degraded areas and creating green spaces in urban areas. These efforts contribute to carbon sequestration, improve air quality, and provide habitat for local wildlife.",
        "The campaign's success has inspired similar initiatives in neighboring communities, demonstrating the power of grassroots environmental action. We're committed to continuing these efforts and expanding our environmental programs."
      ]
    },
    {
      id: 6,
      title: "Health and Wellness Initiative",
      day: "28",
      month: "Nov",
      author: "Admin",
      fullDate: "November 28, 2024",
      category: "Health",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
      tags: ["Health", "Wellness", "Community"],
      fullContent: [
        "Our health and wellness initiative has been successfully implemented across multiple communities, providing essential health services and promoting healthy lifestyle choices among community members.",
        "The initiative includes regular health check-ups, nutrition education, and fitness programs designed to improve overall community health. These services are provided free of charge to ensure accessibility for all community members.",
        "Health check-ups are conducted by qualified medical professionals and include screenings for common health conditions, vaccinations, and health counseling. These services help identify health issues early and provide appropriate treatment and prevention strategies.",
        "Nutrition education programs teach community members about healthy eating habits, food preparation, and the importance of a balanced diet. These programs are particularly important for families with children, helping to establish healthy eating patterns from an early age.",
        "Fitness programs include group exercise classes, sports activities, and outdoor recreation opportunities. These activities promote physical health while also providing social interaction and community building opportunities.",
        "The initiative has received positive feedback from participants, with many reporting improved health outcomes and increased awareness of healthy lifestyle choices. We're committed to expanding these services to reach more communities."
      ]
    },
    {
      id: 7,
      title: "Women in Leadership Panel",
      day: "10",
      month: "Nov",
      author: "Admin",
      fullDate: "November 10, 2024",
      category: "Women Empowerment",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop",
      tags: ["Women", "Leadership", "Empowerment"],
      fullContent: [
        "Our women in leadership panel brought together inspiring women leaders from various sectors to share their experiences and encourage young women to take on leadership roles in their communities.",
        "The panel featured successful women from business, politics, education, and community development, providing diverse perspectives on leadership and success. These role models shared their personal journeys, challenges, and strategies for overcoming obstacles.",
        "Key topics discussed included breaking through gender barriers, building confidence, developing leadership skills, and balancing personal and professional responsibilities. Panelists emphasized the importance of mentorship, networking, and continuous learning.",
        "The event also included interactive workshops where participants could practice leadership skills, develop action plans, and connect with potential mentors. These workshops provided practical tools and strategies for leadership development.",
        "Networking opportunities allowed young women to connect with established leaders and build relationships that could support their future endeavors. Many participants reported feeling inspired and motivated to pursue leadership opportunities.",
        "The success of this panel has led to the establishment of a women's leadership network that provides ongoing support, mentorship, and development opportunities for women in our community."
      ]
    },
    {
      id: 8,
      title: "Youth Entrepreneurship Program",
      day: "25",
      month: "Nov",
      author: "Admin",
      fullDate: "November 25, 2024",
      category: "Entrepreneurship",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      tags: ["Entrepreneurship", "Business", "Youth"],
      fullContent: [
        "Our youth entrepreneurship program has successfully launched 15 new businesses, creating employment opportunities and contributing to local economic development. This program provides comprehensive support for young entrepreneurs.",
        "The program includes business planning workshops, financial literacy training, and mentorship from successful entrepreneurs. Participants learn essential business skills including market research, financial management, and marketing strategies.",
        "Business planning workshops help participants develop comprehensive business plans that address market needs, competition analysis, and financial projections. These plans serve as roadmaps for business development and growth.",
        "Financial literacy training covers topics such as budgeting, cash flow management, and access to financing. Participants learn how to manage business finances effectively and make informed financial decisions.",
        "Mentorship programs connect participants with experienced entrepreneurs who provide guidance, advice, and support throughout the business development process. These relationships often continue beyond the program, providing ongoing support.",
        "The program also includes access to business development resources, networking opportunities, and potential funding sources. Many participants have successfully secured funding to start or expand their businesses."
      ]
    },
    {
      id: 9,
      title: "Cultural Heritage Preservation",
      day: "20",
      month: "Nov",
      author: "Admin",
      fullDate: "November 20, 2024",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8a?w=400&h=200&fit=crop",
      tags: ["Culture", "Heritage", "Preservation"],
      fullContent: [
        "Our cultural heritage preservation project has documented and preserved important aspects of our community's cultural traditions, ensuring that future generations can learn about and appreciate their cultural heritage.",
        "The project includes documentation of traditional practices, oral history collection, and cultural education programs. These efforts help preserve cultural knowledge and promote cultural pride among community members.",
        "Traditional practices documentation involves recording traditional crafts, music, dance, and other cultural expressions. This documentation serves as a valuable resource for cultural education and preservation efforts.",
        "Oral history collection captures the stories and experiences of community elders, preserving important historical and cultural information. These stories provide valuable insights into community history and cultural development.",
        "Cultural education programs teach young people about their cultural heritage, promoting cultural pride and understanding. These programs include traditional craft workshops, cultural performances, and historical presentations.",
        "The project has received recognition from cultural preservation organizations and has inspired similar initiatives in other communities. We're committed to continuing these efforts and expanding our cultural preservation programs."
      ]
    }
  ];

  // Events data
  const eventsData = [
    {
      id: 1,
      title: "Annual Youth Summit 2024",
      day: "20",
      month: "Dec",
      time: "9:00 AM - 5:00 PM",
      location: "Hawassa Convention Center",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
      description: "Join us for our annual youth summit where young leaders will discuss important issues affecting our community and share innovative solutions."
    },
    {
      id: 2,
      title: "Christmas Community Service",
      day: "25",
      month: "Dec",
      time: "10:00 AM - 2:00 PM",
      location: "Various Locations",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=200&fit=crop",
      description: "Spread joy and hope this Christmas by participating in our community service activities and helping those in need."
    },
    {
      id: 3,
      title: "New Year Planning Workshop",
      day: "30",
      month: "Dec",
      time: "2:00 PM - 6:00 PM",
      location: "Youth Center",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      description: "Let's plan for an amazing 2024! Join our workshop to set goals and create action plans for personal and community development."
    },
    {
      id: 4,
      title: "Career Guidance Seminar",
      day: "05",
      month: "Jan",
      time: "1:00 PM - 4:00 PM",
      location: "University Auditorium",
      image: "https://images.unsplash.com/photo-1523240795131-0a3f4bf0e132?w=400&h=200&fit=crop",
      description: "Get expert advice on career planning, resume building, and interview preparation from industry professionals and career counselors."
    },
    {
      id: 5,
      title: "Entrepreneurship Bootcamp",
      day: "12",
      month: "Jan",
      time: "9:00 AM - 6:00 PM",
      location: "Business Incubator Center",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
      description: "Learn the fundamentals of starting and running a successful business. This intensive bootcamp covers business planning, marketing, and financial management."
    },
    {
      id: 6,
      title: "Cultural Exchange Program",
      day: "20",
      month: "Jan",
      time: "3:00 PM - 7:00 PM",
      location: "Community Hall",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8a?w=400&h=200&fit=crop",
      description: "Celebrate our diverse cultural heritage through music, dance, food, and storytelling. Connect with youth from different backgrounds and learn about various traditions."
    },
    {
      id: 7,
      title: "Public Speaking Workshop",
      day: "28",
      month: "Jan",
      time: "10:00 AM - 1:00 PM",
      location: "Youth Center",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      description: "Improve your public speaking and presentation skills with hands-on activities and expert feedback."
    },
    {
      id: 8,
      title: "Green Initiative Launch",
      day: "05",
      month: "Feb",
      time: "11:00 AM - 3:00 PM",
      location: "Central Park",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
      description: "Join us as we launch our new environmental sustainability program with tree planting and clean-up activities."
    },
    {
      id: 9,
      title: "Tech for Good Hackathon",
      day: "15",
      month: "Feb",
      time: "8:00 AM - 8:00 PM",
      location: "Innovation Hub",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      description: "Collaborate with fellow youth to build tech solutions for social impact. Prizes for the best projects!"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elementsToObserve = [
      newsRef.current,
      eventsRef.current
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

  return (
    <div className="news-page">
      <Navbar />
      
      {/* Header Section */}
      <section className="news-header">
        <div className="container">
          <div className="header-content">
            <img src={logoImage} alt="Sidama Youth Commission" className="header-logo" />
            <h1 className="header-title">Latest News & Updates</h1>
            <p className="header-subtitle">
              Stay informed about the latest developments, events, and achievements of the Sidama Youth Commission. 
              Discover how we're making a difference in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="news" id="news" ref={newsRef}>
        <div className="container">
          <h2 className="section-title">Latest News</h2>
          <div className="news-grid">
            {newsArticles.slice(0, newsToShow).map((article) => (
                <article key={article.id} className="news-card">
                <div className="news-image" style={{ backgroundImage: `url(${article.image})` }}>
                  <div className="news-date">
                    <span className="day">{article.day}</span>
                    <span className="month">{article.month}</span>
                  </div>
                </div>
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <p className="news-meta">By {article.author} • {article.category}</p>
                  <p>
                    {article.fullContent[0].substring(0, 150)}...
                  </p>
                                    <button 
                    className="read-more" 
                    onClick={() => setSelectedArticle(article)}
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
            {newsArticles.length > newsToShow && (
              <div className="show-more-container">
                <button className="show-more-btn" onClick={() => setNewsToShow(newsArticles.length)}>
                  Show More News
                </button>
              </div>
            )}
            {newsToShow === newsArticles.length && newsArticles.length > 6 && (
              <div className="show-more-container">
                <button className="show-more-btn" onClick={() => setNewsToShow(6)}>
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events" id="events" ref={eventsRef}>
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            {eventsData.slice(0, eventsToShow).map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-header" style={{ backgroundImage: `url(${event.image})` }}>
                  <div className="event-date">
                    <span className="event-day">{event.day}</span>
                    <span className="event-month">{event.month}</span>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-details">
                    <span className="event-time">{event.time}</span>
                    <span className="event-location">{event.location}</span>
                  </div>
                </div>
                <div className="event-content">
                  <p>{event.description}</p>
                  <a href="#" className="btn btn-primary">Register Now</a>
                </div>
              </div>
            ))}
          </div>
          {eventsData.length > eventsToShow && (
            <div className="show-more-container">
              <button className="show-more-btn" onClick={() => setEventsToShow(eventsData.length)}>
                Show More Events
              </button>
            </div>
          )}
          {eventsToShow === eventsData.length && eventsData.length > 6 && (
            <div className="show-more-container">
              <button className="show-more-btn" onClick={() => setEventsToShow(6)}>
                Show Less
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      
      {/* News Detail Modal */}
      {selectedArticle && (
        <NewsDetail 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}
    </div>
  );
};

export default NewsPage; 