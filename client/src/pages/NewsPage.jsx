import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Footer, PageHeader } from '../components';
import NewsDetail from '../components/NewsDetail/NewsDetail';
import './NewsPage.css';
import logoImage from '/images/mekerbet-logo.jpg';
import { API_BASE_URL } from '../config/api';

const NewsPage = () => {
  const headerRef = useRef(null);
  const newsRef = useRef(null);
  const eventsRef = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsToShow, setNewsToShow] = useState(6); // Show first 6 news articles initially
  const [eventsToShow, setEventsToShow] = useState(6); // Show first 6 events initially
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("Here");
        
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/news/allNews.php`);
        const result = await response.json();
        console.log(result);
        
        if (result.success) {
          // Transform the data to match the expected format
          const transformedNews = result.data.map(article => ({
            id: article.id,
            title: article.title,
            day: new Date(article.created_at).getDate().toString().padStart(2, '0'),
            month: new Date(article.created_at).toLocaleDateString('en-US', { month: 'short' }),
            author: article.author,
            fullDate: new Date(article.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            category: "News", // Default category since it's not in the database
            image: article.image_url || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
            tags: ["News", "Community"], // Default tags
            fullContent: article.content.split('\n').filter(paragraph => paragraph.trim() !== '')
          }));
          setNewsArticles(transformedNews);
          console.log(transformedNews);          
        } else {
          setError(result.message || 'Failed to fetch news');
        }
      } catch (err) {
        setError('Failed to connect to the server');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
      headerRef.current,
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
      
      <PageHeader 
        title="Latest News & Updates"
        subtitle="Stay informed about the latest developments, events, and achievements of the Sidama Youth Commission. Discover how we're making a difference in our community."
        logoImage={logoImage}
        headerRef={headerRef}
      />

      {/* Latest News Section */}
      <section className="news" id="news" ref={newsRef}>
        <div className="container">
          <h2 className="section-title">Latest News</h2>
          
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading news...</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button 
                className="retry-btn" 
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}
          
          {!loading && !error && newsArticles.length === 0 && (
            <div className="no-news-container">
              <p>No news articles available at the moment.</p>
            </div>
          )}
          
          {!loading && !error && newsArticles.length > 0 && (
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
                      {article.fullContent[0] ? article.fullContent[0].substring(0, 150) + '...' : 'No content available...'}
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
          )}
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