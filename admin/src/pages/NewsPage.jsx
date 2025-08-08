import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  // Fetch news from server
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/news/allNews.php`);
        const result = await response.json();

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
            category: "News", // Default category since it's not in the database
            image:
              article.image_url ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
            fullContent: article.content
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== ""),
          }));
          setNews(transformedNews);
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

  // Intersection observer for animations
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, [news]);

  if (loading) {
    return (
      <div style={{ width: "100%", textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#666" }}>Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: "100%", textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#d32f2f" }}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}>
        <h2>News List</h2>
        <button
          onClick={() => navigate("/news/add")}
          style={{
            background: "#1a75c4",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}>
          + Add News
        </button>
      </div>
      {news.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          No news articles found.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem", width: "100%" }}>
          {news.map((article, idx) => (
            <div
              key={article.id}
              className="news-card"
              ref={(el) => (cardRefs.current[idx] = el)}
              style={{
                width: "100%",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onClick={() => navigate(`/news/edit/${article.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <div
                className="news-image"
                style={{ backgroundImage: `url(${article.image})` }}></div>
              <div className="news-content" style={{ flex: 1 }}>
                <h3>{article.title}</h3>
                <div className="news-meta">
                  {article.day} {article.month} • {article.author} •{" "}
                  {article.category}
                </div>
                <p style={{ margin: 0 }}>{article.fullContent[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsPage;
