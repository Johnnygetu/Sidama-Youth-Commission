import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sampleNews = [
  {
    id: 1,
    title: "Youth Leadership Workshop Success",
    day: "15",
    month: "Dec",
    author: "Admin",
    category: "Leadership",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    fullContent: [
      "Our recent youth leadership workshop brought together over 100 young leaders from across the region, marking a significant milestone in our commitment to empowering the next generation of community leaders.",
    ],
  },
  {
    id: 2,
    title: "Community Development Project Launch",
    day: "12",
    month: "Dec",
    author: "Admin",
    category: "Community Development",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    fullContent: [
      "We're excited to announce the launch of our new community development project focused on sustainable agriculture and environmental conservation.",
    ],
  },
  {
    id: 3,
    title: "Partnership with Universities Announced",
    day: "08",
    month: "Dec",
    author: "Admin",
    category: "Partnerships",
    image:
      "https://images.unsplash.com/photo-1523240795131-0a3f4bf0e132?w=400&h=200&fit=crop",
    fullContent: [
      "We're thrilled to announce a groundbreaking partnership with leading universities in the region.",
    ],
  },
];

function NewsPage() {
  const [news] = useState(sampleNews);
  const navigate = useNavigate();
  const cardRefs = useRef([]);

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
      <div style={{ display: "grid", gap: "1.5rem", width: "100%" }}>
        {news.map((article, idx) => (
          <div
            key={article.id}
            className="news-card"
            ref={(el) => (cardRefs.current[idx] = el)}
            style={{ width: "100%" }}>
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
    </div>
  );
}

export default NewsPage;
