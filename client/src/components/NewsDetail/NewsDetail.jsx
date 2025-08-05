import React from 'react';
import './NewsDetail.css';

const NewsDetail = ({ article, onClose }) => {
  if (!article) return null;

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.fullContent[0].substring(0, 200) + '...',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const shareText = `${article.title}\n\n${article.fullContent[0].substring(0, 200)}...\n\nRead more at: ${window.location.href}`;
        await navigator.clipboard.writeText(shareText);
        
        // Show success message
        const shareButton = document.querySelector('.share-button');
        if (shareButton) {
          const originalText = shareButton.textContent;
          shareButton.textContent = 'Copied!';
          shareButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          setTimeout(() => {
            shareButton.textContent = originalText;
            shareButton.style.background = 'linear-gradient(135deg, #ff9219 0%, #ffa726 100%)';
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

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
            <div className="news-detail-overlay-gradient"></div>
          </div>
          
          <div className="news-detail-body">
            <div className="news-detail-header">
              <div className="news-detail-category-badge">
                {article.category}
              </div>
              <h1 className="news-detail-title">{article.title}</h1>
              <div className="news-detail-meta">
                <span className="author">
                  <i className="fas fa-user"></i>
                  By {article.author}
                </span>
                <span className="date">
                  <i className="fas fa-calendar"></i>
                  {article.fullDate}
                </span>
              </div>
            </div>
            
            <div className="news-detail-text">
              {article.fullContent.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'lead-paragraph' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="news-detail-actions">
              <button className="btn btn-primary share-button" onClick={handleShare}>
                <i className="fas fa-share-alt"></i>
                Share Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 