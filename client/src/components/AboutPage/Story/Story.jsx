import React from 'react';
import './Story.css';

const Story = ({ storyRef }) => {
  return (
    <section className="story-section" ref={storyRef}>
      <div className="container">
        <div className="story-content">
          <div className="story-text">
            <h2>About SRYC</h2>
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
          </div>
          <div className="story-image">
            <div className="image-container">
              <img 
                src="/images/sryc-group-photo.jpg" 
                alt="SRYC Youth Group - Empowering 2.2M Youth" 
                className="group-photo"
                onLoad={() => console.log('Image loaded successfully')}
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                  // Show fallback text if image fails
                  const fallback = document.createElement('div');
                  fallback.innerHTML = '<p style="color: white; text-align: center; padding: 2rem;">Image loading...</p>';
                  fallback.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white;';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Full-width text section below the image */}
        <div className="full-width-text">
          <p>
            Our work is grounded in inclusivity, empowerment, and sustainable impact. 
            We believe that investing in youth today creates a stronger, more prosperous tomorrow 
            for our entire community.
          </p>
          <p>
            Our 2025-2029 Strategic Plan marks a new era for the Sidama Region Youth Council. 
            Grounded in inclusion, empowerment, and action, the plan lays a solid foundation to 
            transform the realities of our youth. Through consistent effort, transparent leadership, 
            and strong partnerships, we aim to elevate youth voices and capacities in all spheres of development.
          </p>
          <p>
            By providing the right support, resources, and opportunities, we help them discover their strengths 
            and develop the skills needed to build a brighter future for themselves and their communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story; 