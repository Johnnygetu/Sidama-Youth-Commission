import React, { useEffect, useRef } from 'react';
import { Navbar, Footer, MissionVision, Values, Team, Impact, Story, Partners } from '../components';
import './AboutPage.css';

const AboutPage = () => {
  const storyRef = useRef(null);
  const missionVisionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const impactRef = useRef(null);
  const partnersRef = useRef(null);

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
      storyRef.current,
      missionVisionRef.current,
      valuesRef.current,
      teamRef.current,
      impactRef.current,
      partnersRef.current
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
      <Story storyRef={storyRef} />
      <MissionVision missionVisionRef={missionVisionRef} />
      <Values valuesRef={valuesRef} />
      <Team teamRef={teamRef} />
      <Impact impactRef={impactRef} />
      <Partners partnersRef={partnersRef} />
      <Footer />
    </div>
  );
};

export default AboutPage; 