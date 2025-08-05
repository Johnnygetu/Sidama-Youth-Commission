import React, { useEffect, useRef } from 'react';
import { Navbar, Footer, Hero, MissionVision, Values, Team, Impact, Story } from '../components';
import './AboutPage.css';
import logoImage from '/images/mekerbet-logo.jpg';

const AboutPage = () => {
  const heroRef = useRef(null);
  const missionVisionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const impactRef = useRef(null);
  const storyRef = useRef(null);

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
      heroRef.current,
      missionVisionRef.current,
      valuesRef.current,
      teamRef.current,
      impactRef.current,
      storyRef.current
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
    <div className="about-page">
      <Navbar />
      <Hero logoImage={logoImage} heroRef={heroRef} />
      <MissionVision missionVisionRef={missionVisionRef} />
      <Values valuesRef={valuesRef} />
      <Team teamRef={teamRef} />
      <Impact impactRef={impactRef} />
      <Story storyRef={storyRef} />
      <Footer />
    </div>
  );
};

export default AboutPage; 