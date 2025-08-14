import React from 'react';
import { PageHeader } from '../../';
import './Story.css';
import logoImage from '/images/mekerbet-logo.jpg';

const Story = ({ storyRef }) => {
  return (
    <section className="story-section" ref={storyRef}>
      {/* Use the actual PageHeader component like other pages */}
      <PageHeader 
        title="About SRYC"
        subtitle="Empowering 2.2 million youth across Sidama Region through inclusive leadership and sustainable development"
        logoImage={logoImage}
        headerRef={storyRef}
      />

      {/* Simple, clean content section */}
      <div className="story-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="text-content">
              <h2>Our Story & Mission</h2>
              <p>
                The Sidama Region Youth Council (SRYC) is an independent, inclusive, and youth-led 
                Civil Society Organization (CSO) representing the voices and interests of all 2.2 million 
                youth in Sidama Region—without any discrimination based on gender, ethnicity, political 
                affiliation, education level, disability, religion, or any other grounds.
              </p>
              <p>
                Founded with the guidance of the Ministry of Women and Social Affairs and affiliated 
                with the Ethiopia Youth Council, SRYC is committed to creating an enabling environment 
                where youth are active participants in social, economic, cultural, and political spheres.
              </p>
              <p>
                Our work is grounded in inclusivity, empowerment, and sustainable impact. 
                We believe that investing in youth today creates a stronger, more prosperous tomorrow 
                for our entire community.
              </p>
            </div>
            
            <div className="image-content">
              <div className="image-container">
                <img 
                  src="/images/sryc-group-photo.jpg" 
                  alt="SRYC Youth Group - Empowering 2.2M Youth" 
                  className="group-photo"
                  onLoad={() => console.log('Image loaded successfully')}
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.innerHTML = '<p style="color: #64748b; text-align: center; padding: 2rem;">Image loading...</p>';
                    fallback.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #64748b;';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story; 