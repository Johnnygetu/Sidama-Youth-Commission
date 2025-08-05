import React from 'react';
import './NewsDetail.css';

const NewsDetail = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="news-detail-overlay" onClick={onClose}>
      <div className="news-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <span>×</span>
        </button>
        
        <div className="news-detail-content">
          <div className="news-detail-image" style={{ backgroundImage: `url(${article.image})` }}>
            <div className="news-detail-date">
              <span className="day">{article.day}</span>
              <span className="month">{article.month}</span>
            </div>
          </div>
          
          <div className="news-detail-body">
            <h1 className="news-detail-title">{article.title}</h1>
            <div className="news-detail-meta">
              <span className="author">By {article.author}</span>
              <span className="date">{article.fullDate}</span>
              <span className="category">{article.category}</span>
            </div>
            
            <div className="news-detail-text">
              {article.fullContent.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="news-detail-tags">
              {article.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            
            <div className="news-detail-actions">
              <button className="btn btn-primary">Share Article</button>
              <button className="btn btn-secondary">Print Article</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 