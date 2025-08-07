import React, { useRef, useEffect } from "react";

const dummyMessages = [
  {
    id: 1,
    sender: "John Doe",
    date: "2024-06-01",
    content: "Hello, I am interested in your youth programs. How can I join?",
  },
  {
    id: 2,
    sender: "Sara Ali",
    date: "2024-06-02",
    content:
      "Thank you for organizing the leadership workshop! It was amazing.",
  },
  {
    id: 3,
    sender: "Mekdes T.",
    date: "2024-06-03",
    content: "Can you provide more information about the upcoming events?",
  },
  {
    id: 4,
    sender: "Samuel B.",
    date: "2024-06-04",
    content: "I would like to volunteer for the environmental campaign.",
  },
  {
    id: 5,
    sender: "Amina Yusuf",
    date: "2024-06-05",
    content: "Is there a way to donate to support your initiatives?",
  },
];

function MessagesPage() {
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
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ marginBottom: "2rem" }}>Messages</h2>
      <div style={{ display: "grid", gap: "1.5rem", width: "100%" }}>
        {dummyMessages.map((msg, idx) => (
          <div
            key={msg.id}
            className="news-card"
            ref={(el) => (cardRefs.current[idx] = el)}
            style={{ width: "100%" }}>
            <div className="news-content" style={{ flex: 1 }}>
              <h3 style={{ margin: 0, color: "#388e3c" }}>{msg.sender}</h3>
              <div className="news-meta" style={{ marginBottom: 8 }}>
                {msg.date}
              </div>
              <p style={{ margin: 0 }}>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessagesPage;
