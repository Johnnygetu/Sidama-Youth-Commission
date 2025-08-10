import React, { useEffect, useRef } from 'react';
import { Navbar, Footer, ContactForm, PageHeader } from '../components';
import './ContactPage.css';
import logoImage from '/images/mekerbet-logo.jpg';

const ContactPage = () => {
  const headerRef = useRef(null);
  const contactFormRef = useRef(null);

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
      contactFormRef.current
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
    <div className="contact-page">
      <Navbar />
      
      <PageHeader 
        title="Contact Us"
        subtitle="We would love to hear from you! Reach out for questions, partnership opportunities, or to get involved in our community initiatives."
        logoImage={logoImage}
        headerRef={headerRef}
      />

      <ContactForm contactFormRef={contactFormRef} />
      <Footer />
    </div>
  );
};

export default ContactPage; 