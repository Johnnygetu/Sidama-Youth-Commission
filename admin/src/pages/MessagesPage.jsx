import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  // Fetch messages from server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        console.log(
          "Fetching from:",
          `${API_BASE_URL}/messages/allMessages.php`
        ); // Debug log
        const response = await fetch(
          `${API_BASE_URL}/messages/allMessages.php`
        );
        console.log("Response status:", response.status); // Debug log
        const result = await response.json();

        if (result.success) {
          console.log("API Response:", result); // Debug log
          // Transform the data to match the expected format
          const transformedMessages = result.data.map((message) => ({
            id: message.id,
            sender: message.name,
            email: message.email,
            subject: message.subject,
            date: new Date(message.created_at).toLocaleDateString(),
            content: message.message,
            status: message.status,
          }));
          console.log("Transformed Messages:", transformedMessages); // Debug log
          setMessages(transformedMessages);
        } else {
          setError(result.message || "Failed to fetch messages");
        }
      } catch (err) {
        setError("Failed to connect to the server");
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Handle message click to navigate to detail page
  const handleMessageClick = (messageId) => {
    navigate(`/messages/${messageId}`);
  };

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
  }, [messages]); // Add messages as dependency

  if (loading) {
    return (
      <div style={{ width: "100%", textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#666" }}>
          Loading messages...
        </div>
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

  console.log("Current messages state:", messages); // Debug log

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ marginBottom: "2rem" }}>Messages ({messages.length})</h2>
      {messages.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          No messages found.
        </div>
      ) : (
      <div style={{ display: "grid", gap: "1.5rem", width: "100%" }}>
          {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className="news-card"
            ref={(el) => (cardRefs.current[idx] = el)}
              onClick={() => handleMessageClick(msg.id)}
              style={{
                width: "100%",
                cursor: "pointer",
                borderLeft:
                  msg.status === "unread"
                    ? "4px solid #1a75c4"
                    : msg.status === "replied"
                    ? "4px solid #4caf50"
                    : "4px solid #e0e0e0",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
            <div className="news-content" style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}>
              <h3 style={{ margin: 0, color: "#388e3c" }}>{msg.sender}</h3>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      backgroundColor:
                        msg.status === "unread"
                          ? "#e3f2fd"
                          : msg.status === "replied"
                          ? "#e8f5e8"
                          : "#f5f5f5",
                      color:
                        msg.status === "unread"
                          ? "#1976d2"
                          : msg.status === "replied"
                          ? "#4caf50"
                          : "#666",
                    }}>
                    {msg.status}
                  </span>
                </div>
                <div
                  className="news-meta"
                  style={{
                    marginBottom: 8,
                    fontSize: "0.875rem",
                    color: "#666",
                  }}>
                  <strong>Subject:</strong> {msg.subject} •{" "}
                  <strong>Email:</strong> {msg.email} • {msg.date}
              </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#888",
                    fontStyle: "italic",
                  }}>
                  Click to view full message
                </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default MessagesPage;
