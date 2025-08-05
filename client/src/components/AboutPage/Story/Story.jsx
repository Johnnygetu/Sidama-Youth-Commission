import React from 'react';
import './Story.css';

const Story = ({ storyRef }) => {
  return (
    <section className="story-section" ref={storyRef}>
      <div className="container">
        <div className="story-content">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2018, the Sidama Youth Commission emerged from a deep understanding 
              of the challenges facing young people in our region. We recognized that many 
              talented youth lacked access to educational resources, skill development 
              opportunities, and platforms to develop their leadership potential.
            </p>
            <p>
              What started as a small community initiative has grown into a comprehensive 
              youth development organization. Today, we serve hundreds of young people 
              annually through our various programs, creating a network of empowered 
              individuals who are making positive changes in their communities.
            </p>
            <p>
              Our approach is rooted in the belief that every young person has unique 
              potential waiting to be unlocked. By providing the right support, resources, 
              and opportunities, we help them discover their strengths and develop the 
              skills needed to build a brighter future for themselves and their communities.
            </p>
          </div>
          <div className="story-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <span>📖</span>
                <p>Our Journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story; 