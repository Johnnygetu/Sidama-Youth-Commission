import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import './NewsDetailPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareAlt, faCalendar, faUser, faTag } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { API_BASE_URL } from '../config/api';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/news/getNews.php?id=${id}`);
        const result = await response.json();
        
        if (result.success) {
          // Transform the data to match the expected format
          const transformedArticle = {
            id: result.data.id,
            title: result.data.title,
            day: new Date(result.data.created_at).getDate().toString().padStart(2, '0'),
            month: new Date(result.data.created_at).toLocaleDateString('en-US', { month: 'short' }),
            author: result.data.author,
            fullDate: new Date(result.data.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            category: "News",
            // Support for multiple images - if image_url contains multiple URLs separated by comma
            images: result.data.image_url ? 
              result.data.image_url.split(',').map(url => url.trim()).filter(url => url) : 
              [],
            mainImage: result.data.image_url ? 
              result.data.image_url.split(',').map(url => url.trim()).filter(url => url)[0] : 
              null,
            tags: ["News", "Community"],
            fullContent: result.data.content.split('\n').filter(paragraph => paragraph.trim() !== ''),
            createdAt: result.data.created_at
          };
          setArticle(transformedArticle);
        } else {
          setError(result.message || 'Failed to fetch news');
        }
      } catch (err) {
        setError('Failed to connect to the server');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  const handleShare = async (platform) => {
    const shareData = {
      title: article.title,
      text: article.fullContent[0]?.substring(0, 200) + '...',
      url: window.location.href
    };

    try {
      switch (platform) {
        case 'native':
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            // Fallback: copy to clipboard
            const shareText = `${article.title}\n\n${article.fullContent[0]?.substring(0, 200)}...\n\nRead more at: ${window.location.href}`;
            await navigator.clipboard.writeText(shareText);
            alert('Link copied to clipboard!');
          }
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`, '_blank');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const nextImage = () => {
    if (article.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % article.images.length);
    }
  };

  const prevImage = () => {
    if (article.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + article.images.length) % article.images.length);
    }
  };

  if (loading) {
    return (
      <div className="news-detail-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading news article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="news-detail-page">
        <Navbar />
        <div className="error-container">
          <h2>Error Loading Article</h2>
          <p>{error || 'Article not found'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/news')}>
            Back to News
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <Navbar />
      
      {/* Hero Section with Main Image */}
      {article.images.length > 0 ? (
        <section className="news-hero">
          <div className="hero-image-container">
            {article.images.length > 1 ? (
              <div className="image-gallery">
                <img 
                  src={article.images[currentImageIndex]} 
                  alt={`${article.title} - Image ${currentImageIndex + 1}`}
                  className="hero-image"
                />
              </div>
            ) : (
              <img 
                src={article.mainImage} 
                alt={article.title}
                className="hero-image"
              />
            )}
          </div>
        </section>
      ) : (
        <section className="news-hero no-image">
          <div className="hero-no-image-container">
            <div className="no-image-placeholder">
              <h1 className="article-title-no-image">{article.title}</h1>
              <div className="article-meta-no-image">
                <span className="meta-item">
                  <FontAwesomeIcon icon={faUser} />
                  By {article.author}
                </span>
                <span className="meta-item">
                  <FontAwesomeIcon icon={faCalendar} />
                  {article.fullDate}
                </span>
                <span className="meta-item">
                  <FontAwesomeIcon icon={faTag} />
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lightboxes Section - Only show when there are images */}
      {article.images.length > 0 && (
        <section className="lightboxes-section">
          <div className="container">
            <div className="lightboxes-container">
              <div className="lightboxes-grid">
                {article.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`lightbox ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${article.title} - Image ${index + 1}`}
                      className="lightbox-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="article-content">
        <div className="container">
          <div className="article-back">
            <Link to="/news" className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to News
            </Link>
          </div>
          <article className="news-article">
            <header className="article-header">
              {article.images.length === 0 && (
                <>
                  <h1 className="article-title">{article.title}</h1>
                  <div className="article-meta">
                    <span className="meta-item">
                      <FontAwesomeIcon icon={faUser} />
                      By {article.author}
                    </span>
                    <span className="meta-item">
                      <FontAwesomeIcon icon={faCalendar} />
                      {article.fullDate}
                    </span>
                    <span className="meta-item">
                      <FontAwesomeIcon icon={faTag} />
                      {article.category}
                    </span>
                  </div>
                </>
              )}
            </header>

            <div className="article-body">
              {article.fullContent.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'lead-paragraph' : 'content-paragraph'}>
                  {paragraph}
                </p>
              ))}
            </div>



            {/* Share Section */}
            <div className="share-section">
              <h4>Share This Article</h4>
              <div className="share-buttons">
                <button 
                  className="share-btn native" 
                  onClick={() => handleShare('native')}
                >
                  <FontAwesomeIcon icon={faShareAlt} />
                  Share
                </button>
                <button 
                  className="share-btn facebook" 
                  onClick={() => handleShare('facebook')}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                  Facebook
                </button>
                <button 
                  className="share-btn twitter" 
                  onClick={() => handleShare('twitter')}
                >
                  <FontAwesomeIcon icon={faTwitter} />
                  Twitter
                </button>
                <button 
                  className="share-btn linkedin" 
                  onClick={() => handleShare('linkedin')}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                  LinkedIn
                </button>
                <button 
                  className="share-btn whatsapp" 
                  onClick={() => handleShare('whatsapp')}
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                  WhatsApp
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsDetailPage;
