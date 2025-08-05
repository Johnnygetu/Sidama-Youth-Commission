import React, { useEffect, useRef } from 'react';
import './HomePage.css';
import logoImage from '/images/mekerbet-logo.jpg';
import { Navbar, Footer } from '../components';
import Hero from '../components/Homepage/Hero/Hero';
import About from '../components/Homepage/About/About';
import Programs from '../components/Homepage/Programs/Programs';
import CTA from '../components/Homepage/CTA/CTA';

const HomePage = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const programsRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRefs = useRef([]);
  const programCardRefs = useRef([]);

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
      aboutRef.current,
      programsRef.current,
      ctaRef.current,
      ...statsRefs.current,
      ...programCardRefs.current
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
    <div className="homepage">
      <Navbar />
      <Hero logoImage={logoImage} heroRef={heroRef} />
      <About logoImage={logoImage} aboutRef={aboutRef} statsRefs={statsRefs.current} />
      <Programs programsRef={programsRef} programCardRefs={programCardRefs.current} />
      <CTA ctaRef={ctaRef} />
      <Footer />
    </div>
  );
};

export default HomePage; 