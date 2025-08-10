import React, { useEffect, useRef } from 'react';
import './Partners.css';

const Partners = ({ partnersRef }) => {
  const logosRef = useRef(null);

  useEffect(() => {
    const logos = logosRef.current;
    if (!logos) return;

    // Calculate the exact width needed for seamless loop
    const logoWidth = 280; // logo width in px
    const logoMargin = 8; // margin in px (0.5rem = 8px)
    const totalLogoWidth = logoWidth + logoMargin;
    const totalWidth = totalLogoWidth * 4; // 4 logos

    // Set the width to exactly match the content
    logos.style.width = `${totalWidth}px`;

    const scrollLogos = () => {
      if (logos.scrollLeft >= totalWidth) {
        logos.scrollLeft = 0;
      } else {
        logos.scrollLeft += 1;
      }
    };

    const interval = setInterval(scrollLogos, 50);
    return () => clearInterval(interval);
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