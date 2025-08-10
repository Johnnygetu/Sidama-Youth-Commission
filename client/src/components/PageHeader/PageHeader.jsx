import React from 'react';
import './PageHeader.css';

const PageHeader = ({ title, subtitle, logoImage, headerRef }) => {
  return (
    <section className="page-header" ref={headerRef}>
      <div className="container">
        <div className="header-content">
          <img src={logoImage} alt="Sidama Youth Commission" className="header-logo" />
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader; 