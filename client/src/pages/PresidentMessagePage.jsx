import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './PresidentMessagePage.css';
import logoImage from '/images/mekerbet-logo.jpg';
import { Navbar, Footer } from '../components';

const PresidentMessagePage = () => {
  const messageRef = useRef(null);

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
      messageRef.current
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
    <div className="president-message-page">
      <Navbar />
      
      <section className="president-message-full" ref={messageRef}>
        <div className="container">
          <div className="message-content">
            <div className="president-info">
              <div className="president-photo">
                <div className="photo-placeholder">
                  <span>President Photo</span>
                  <p>Photo of Mr. Yishak Sanbura</p>
                </div>
              </div>
              <div className="president-details">
                <h2>Mr. Yishak Sanbura</h2>
                <p className="president-title">President, Sidama Region Youth Council (SRYC)</p>
                <Link to="/" className="btn btn-secondary">← Back to Home</Link>
              </div>
            </div>
            
            <div className="message-text">
              <p>
                Greetings to all visitors and fellow youth of Sidama, Ethiopia, and beyond.
              </p>
              <p>
                It is with deep pride and great optimism that I welcome you to the official website of the Sidama Region Youth Council (SRYC)—a vibrant, youth-led, and inclusive civil society organization representing the voices and aspirations of over 2.2 million young people in our region. Founded with the support of the Ministry of Women and Social Affairs and affiliated with the Ethiopia Youth Council, SRYC is committed to empowering all youth—regardless of gender, background, or belief—through programs grounded in equity, justice, integrity, and sustainability.
              </p>
              <p>
                As President, I am honored to lead this powerful movement driven by youth for youth. Our 2025–2029 Strategic Plan outlines our priorities, including grassroots institutional strengthening, youth employment and entrepreneurship, justice and human rights advocacy, gender and disability inclusion, climate action, cultural preservation, and digital transformation. These pillars guide our mission to ensure youth are not just beneficiaries, but leaders of change.
              </p>
              <p>
                Looking forward, we aim to expand our reach to every woreda and kebele, build innovation hubs, create meaningful opportunities, and elevate youth voices in policymaking. But we cannot do it alone. I warmly invite development partners, government bodies, NGOs, academic institutions, businesses, and individuals to collaborate with us and support the youth of Sidama in shaping a brighter, more inclusive future.
              </p>
              <p>
                This platform is your gateway to connect, engage, and be part of our journey. Together, let us empower Sidama youth—locally rooted, globally connected.
              </p>
              <p className="message-signature">
                With hope and solidarity,<br />
                <strong>Yishak Sanbura</strong><br />
                President, Sidama Region Youth Council (SRYC)
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PresidentMessagePage; 