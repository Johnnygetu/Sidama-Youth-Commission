import React, { useEffect, useRef } from 'react';
import './Partners.css';

const Partners = ({ partnersRef }) => {
  const logosRef = useRef(null);

  useEffect(() => {
    const logos = logosRef.current;
    if (!logos) return;

    // Function to calculate logo dimensions based on screen size
    const getLogoDimensions = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 360) {
        return { width: 160, margin: 6 }; // 0.15rem = 6px
      } else if (screenWidth <= 480) {
        return { width: 180, margin: 8 }; // 0.2rem = 8px
      } else if (screenWidth <= 600) {
        return { width: 200, margin: 10 }; // 0.25rem = 10px
      } else if (screenWidth <= 768) {
        return { width: 220, margin: 12 }; // 0.3rem = 12px
      } else if (screenWidth <= 900) {
        return { width: 240, margin: 16 }; // 0.4rem = 16px
      } else if (screenWidth <= 1200) {
        return { width: 260, margin: 20 }; // 0.5rem = 20px
      } else {
        return { width: 280, margin: 24 }; // 0.5rem = 24px
      }
    };

    // Function to update animation dimensions
    const updateAnimationDimensions = () => {
      const { width, margin } = getLogoDimensions();
      const totalLogoWidth = width + margin;
      const totalWidth = totalLogoWidth * 4; // 4 logos
      logos.style.width = `${totalWidth}px`;
    };

    // Initial setup
    updateAnimationDimensions();

    // Animation function
    const scrollLogos = () => {
      if (!logos) return;
      
      const { width, margin } = getLogoDimensions();
      const totalLogoWidth = width + margin;
      const totalWidth = totalLogoWidth * 4;
      
      if (logos.scrollLeft >= totalWidth) {
        logos.scrollLeft = 0;
      } else {
        logos.scrollLeft += 1;
      }
    };

    // Start the animation with adaptive speed
    let animationSpeed = 50; // Default speed
    let interval = setInterval(scrollLogos, animationSpeed);

    // Function to restart animation with new speed
    const restartAnimation = (newSpeed) => {
      clearInterval(interval);
      animationSpeed = newSpeed;
      interval = setInterval(scrollLogos, animationSpeed);
    };

    // Pause animation on hover for better user experience
    const handleMouseEnter = () => {
      clearInterval(interval);
    };

    const handleMouseLeave = () => {
      // Restart animation when mouse leaves
      interval = setInterval(scrollLogos, animationSpeed);
    };

    // Add touch event handlers for mobile devices
    let isTouching = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e) => {
      isTouching = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      // Pause animation during touch
      clearInterval(interval);
    };

    const handleTouchMove = (e) => {
      if (!isTouching) return;
      
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = Math.abs(touchX - touchStartX);
      const deltaY = Math.abs(touchY - touchStartY);
      
      // If horizontal scroll is more than vertical, prevent default
      if (deltaX > deltaY) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
      const touchDuration = Date.now() - touchStartTime;
      
      // Resume animation after touch ends
      // Use a slight delay to ensure smooth transition
      setTimeout(() => {
        interval = setInterval(scrollLogos, animationSpeed);
      }, 100);
    };

    // Handle window resize
    const handleResize = () => {
      updateAnimationDimensions();
      // Restart animation with new dimensions
      clearInterval(interval);
      interval = setInterval(scrollLogos, animationSpeed);
    };

    // Add event listeners
    logos.addEventListener('mouseenter', handleMouseEnter);
    logos.addEventListener('mouseleave', handleMouseLeave);
    logos.addEventListener('touchstart', handleTouchStart, { passive: false });
    logos.addEventListener('touchmove', handleTouchMove, { passive: false });
    logos.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      clearInterval(interval);
      logos.removeEventListener('mouseenter', handleMouseEnter);
      logos.removeEventListener('mouseleave', handleMouseLeave);
      logos.removeEventListener('touchstart', handleTouchStart);
      logos.removeEventListener('touchmove', handleTouchMove);
      logos.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="partners-section" ref={partnersRef}>
      <div className="container">
        <h2 className="section-title-partners">Our Partner Organizations</h2>
        <p className="section-subtitle">
          Working together with leading organizations to empower Sidama youth
        </p>
        
        <div className="partners-container">
          <div className="logos-wrapper" ref={logosRef}>
            <div className="logos-slide">
              <div className="partner-logo">
                <img 
                  src="/images/logo-of-partner-organizations/photo_2025-08-10_11-37-39.jpg" 
                  alt="Partner Organization 1"
                  onError={(e) => {
                    console.log('Error loading logo 1:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Logo 1 loaded successfully')}
                />
              </div>
              <div className="partner-logo">
                <img 
                  src="/images/logo-of-partner-organizations/photo_2025-08-10_11-35-33.jpg" 
                  alt="Partner Organization 2"
                  onError={(e) => {
                    console.log('Error loading logo 2:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Logo 2 loaded successfully')}
                />
              </div>
              <div className="partner-logo">
                <img 
                  src="/images/logo-of-partner-organizations/photo_2025-08-10_11-35-24.jpg" 
                  alt="Partner Organization 3"
                  onError={(e) => {
                    console.log('Error loading logo 3:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Logo 3 loaded successfully')}
                />
              </div>
              <div className="partner-logo">
                <img 
                  src="/images/logo-of-partner-organizations/selam-hawassa-business-group.jpg" 
                  alt="Selam Hawassa Business Group"
                  onError={(e) => {
                    console.log('Error loading logo 4:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Logo 4 loaded successfully')}
                />
              </div>
              {/* Duplicate logos for seamless loop */}
              <div className="partner-logo">
                <img 
                  src="/images/logo-of-partner-organizations/photo_2025-08-10_11-37-39.jpg" 
                  alt="Partner Organization 1"
                  onError={(e) => {
                    console.log('Error loading logo 1 duplicate:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Logo 1 duplicate loaded successfully')}
                />
              </div>
              <div className="partner-logo">
                <img 
                  src="/images/logo-of-partner-organizations/photo_2025-08-10_11-35-33.jpg" 
                  alt="Partner Organization 2"
                  onError={(e) => {
                    console.log('Error loading logo 2 duplicate:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Logo 2 duplicate loaded successfully')}
                />
              </div>
              <div className="partner-logo">
                <img 
                  src="/images/logo-of-partner-organizations/photo_2025-08-10_11-35-24.jpg" 
                  alt="Partner Organization 3"
                  onError={(e) => {
                    console.log('Error loading logo 3 duplicate:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Logo 3 duplicate loaded successfully')}
                />
              </div>
              <div className="partner-logo">
                <img 
                  src="/images/logo-of-partner-organizations/selam-hawassa-business-group.jpg" 
                  alt="Selam Hawassa Business Group"
                  onError={(e) => {
                    console.log('Error loading logo 4 duplicate:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Logo 4 duplicate loaded successfully')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners; 