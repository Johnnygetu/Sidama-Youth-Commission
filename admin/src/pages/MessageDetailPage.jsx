import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function MessageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  // Fetch message details
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/messages/getMessage.php?id=${id}`
        );
        const result = await response.json();

        if (result.success) {
          const transformedMessage = {
            id: result.data.id,
            sender: result.data.name,
            email: result.data.email,
            subject: result.data.subject,
            date: new Date(result.data.created_at).toLocaleDateString(),
            content: result.data.message,
            status: result.data.status,
          };
          setMessage(transformedMessage);
        } else {
          setError(result.message || "Failed to fetch message");
        }
      } catch (err) {
        setError("Failed to connect to the server");
        console.error("Error fetching message:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMessage();
    }
  }, [id]);

  // Handle reply submission
  const handleReply = async () => {
    if (!replyText.trim()) return;

    // Debug logging for admin-side reply
    console.log("🔄 Admin: Starting reply submission...");
    console.log("📝 Admin: Reply data:", {
      messageId: message.id,
      toEmail: message.email,
      toName: message.sender,
      subject: message.subject,
      replyLength: replyText.length,
      timestamp: new Date().toISOString(),
    });

    setIsReplying(true);
    try {
      console.log("🌐 Admin: Sending PUT request to markAsReplied.php");
      const response = await fetch(
        `${API_BASE_URL}/messages/markAsReplied.php`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: message.id,
            reply: replyText,
          }),
        }
      );

      console.log("📡 Admin: Response status:", response.status);
      console.log(
        "📡 Admin: Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      const result = await response.json();
      console.log("📄 Admin: Response data:", result);

      if (result.success) {
        console.log("✅ Admin: Reply sent successfully!");
        console.log("📊 Admin: Message deleted from database");
        setReplyText("");
        alert("Reply sent successfully and message deleted!");
        // Redirect back to messages list since the message is now deleted
        navigate("/messages");
      } else {
        console.log("❌ Admin: Reply sending failed:", result.message);
        alert(result.message || "Failed to send reply");
      }
    } catch (error) {
      console.log("💥 Admin: Network error occurred:", error);
      alert("Failed to send reply. Please try again.");
      console.error("Error sending reply:", error);
    } finally {
      console.log("🏁 Admin: Reply submission completed");
      setIsReplying(false);
    }
  };

  if (loading) {
    return (
      <div style={{ width: "100%", textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#666" }}>
          Loading message...
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
        <button
          onClick={() => navigate("/messages")}
          style={{
            marginTop: "1rem",
            background: "#1a75c4",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}>
          Back to Messages
        </button>
      </div>
    );
  }

  if (!message) {
    return (
      <div style={{ width: "100%", textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#666" }}>
          Message not found
        </div>
        <button
          onClick={() => navigate("/messages")}
          style={{
            marginTop: "1rem",
            background: "#1a75c4",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}>
          Back to Messages
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}>
      {/* Header with Back Button */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/messages")}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#666",
            marginRight: "1rem",
          }}>
          ←
        </button>
        <h1 style={{ margin: 0, color: "#333" }}>Message Details</h1>
      </div>

      {/* Message Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
        }}>
        {/* Message Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ margin: "0 0 1rem 0", color: "#333" }}>
            {message.subject}
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              fontSize: "0.9rem",
              color: "#666",
            }}>
            <div>
              <strong>From:</strong> {message.sender}
            </div>
            <div>
              <strong>Email:</strong> {message.email}
            </div>
            <div>
              <strong>Date:</strong> {message.date}
            </div>
            <div>
              <span
                style={{
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  backgroundColor:
                    message.status === "unread"
                      ? "#e3f2fd"
                      : message.status === "replied"
                      ? "#e8f5e8"
                      : "#f5f5f5",
                  color:
                    message.status === "unread"
                      ? "#1976d2"
                      : message.status === "replied"
                      ? "#4caf50"
                      : "#666",
                }}>
                {message.status}
              </span>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#333" }}>Message:</h3>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
            }}>
            {message.content}
          </div>
        </div>
      </div>

      {/* Reply Section */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}>
        <h3 style={{ margin: "0 0 1rem 0", color: "#333" }}>Reply:</h3>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply here..."
          style={{
            width: "100%",
            minHeight: "120px",
            padding: "1rem",
            border: "2px solid #e1e5e9",
            borderRadius: "8px",
            fontSize: "1rem",
            fontFamily: "inherit",
            resize: "vertical",
            marginBottom: "1rem",
          }}
          disabled={isReplying}
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={handleReply}
            disabled={isReplying || !replyText.trim()}
            style={{
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              cursor:
                isReplying || !replyText.trim() ? "not-allowed" : "pointer",
              opacity: isReplying || !replyText.trim() ? 0.6 : 1,
            }}>
            {isReplying ? "Sending..." : "Send Reply"}
          </button>
          <button
            onClick={() => navigate("/messages")}
            style={{
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}>
            Back to Messages
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageDetailPage;
