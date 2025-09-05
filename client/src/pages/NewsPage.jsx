import React, { useEffect, useRef, useState } from "react";
import { Navbar, Footer, PageHeader } from "../components";
import NewsDetail from "../components/NewsDetail/NewsDetail";
import "./NewsPage.css";
import logoImage from "/images/mekerbet-logo.jpg";
import { API_BASE_URL } from "../config/api";

const NewsPage = () => {
  const headerRef = useRef(null);
  const newsRef = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsToShow, setNewsToShow] = useState(6); // Show first 6 news articles initially
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("Here");

        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/news/allNews.php`);
        const result = await response.json();
        console.log(result);

        if (result.success) {
          // Transform the data to match the expected format
          const transformedNews = result.data.map((article) => ({
            id: article.id,
            title: article.title,
            day: new Date(article.created_at)
              .getDate()
              .toString()
              .padStart(2, "0"),
            month: new Date(article.created_at).toLocaleDateString("en-US", {
              month: "short",
            }),
            author: article.author,
            fullDate: new Date(article.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            category: "News", // Default category since it's not in the database
            image:
              article.image_url ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
            tags: ["News", "Community"], // Default tags
            fullContent: article.content
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== ""),
          }));
          setNewsArticles(transformedNews);
          console.log(transformedNews);
        } else {
          setError(result.message || "Failed to fetch news");
        }
      } catch (err) {
        setError("Failed to connect to the server");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elementsToObserve = [headerRef.current, newsRef.current].filter(
      Boolean
    );

    elementsToObserve.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elementsToObserve.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="news-page">
      <Navbar />

      <PageHeader
        title="Latest News & Updates"
        subtitle="Stay informed about the latest developments, events, and achievements of the Sidama Youth Commission. Discover how we're making a difference in our community."
        logoImage={logoImage}
        headerRef={headerRef}
      />

      {/* Latest News Section */}
      <section className="news" id="news" ref={newsRef}>
        <div className="container">
          <h2 className="section-title">Latest News</h2>

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading news...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button
                className="retry-btn"
                onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && newsArticles.length === 0 && (
            <div className="no-news-container">
              <p>No news articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && newsArticles.length > 0 && (
            <div className="news-grid">
              {newsArticles.slice(0, newsToShow).map((article) => (
                <article key={article.id} className="news-card">
                  <div
                    className="news-image"
                    style={{ backgroundImage: `url(${article.image})` }}>
                    <div className="news-date">
                      <span className="day">{article.day}</span>
                      <span className="month">{article.month}</span>
                    </div>
                  </div>
                  <div className="news-content">
                    <h3>{article.title}</h3>
                    <p className="news-meta">
                      By {article.author} • {article.category}
                    </p>
                    <p>
                      {article.fullContent[0]
                        ? article.fullContent[0].substring(0, 150) + "..."
                        : "No content available..."}
                    </p>
                    <button
                      className="read-more"
                      onClick={() => setSelectedArticle(article)}>
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
              {newsArticles.length > newsToShow && (
                <div className="show-more-container">
                  <button
                    className="show-more-btn"
                    onClick={() => setNewsToShow(newsArticles.length)}>
                    Show More News
                  </button>
                </div>
              )}
              {newsToShow === newsArticles.length &&
                newsArticles.length > 6 && (
                  <div className="show-more-container">
                    <button
                      className="show-more-btn"
                      onClick={() => setNewsToShow(6)}>
                      Show Less
                    </button>
                  </div>
                )}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* News Detail Modal */}
      {selectedArticle && (
        <NewsDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default NewsPage;
