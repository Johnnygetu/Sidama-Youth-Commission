import React from 'react';
import './PageHeader.css';
import sidamaImage from '../../assets/sidama2.jpg';

const PageHeader = ({ title, subtitle, logoImage, headerRef, useBackgroundImage = true }) => {
  return (
    <section 
      className={`page-header ${useBackgroundImage ? 'with-background' : ''}`} 
      ref={headerRef}
      style={useBackgroundImage ? {
        backgroundImage: `url(${sidamaImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      <div className="container">
        <div className="header-content">
          <img src={logoImage} alt="Sidama Youth Council" className="header-logo" />
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader; 