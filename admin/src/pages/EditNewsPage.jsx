import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function EditNewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    image_url: "",
  });

  // Fetch news data for editing
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/news/getNews.php?id=${id}`
        );
        const result = await response.json();

        if (result.success) {
          setForm({
            title: result.data.title,
            author: result.data.author,
            content: result.data.content,
            image_url: result.data.image_url || "",
          });
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

    if (id) {
      fetchNews();
    }
  }, [id]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.classList.add("visible");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/news/updateNews.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          ...form,
        }),
      });

      const result = await response.json();

      if (result.success) {
        navigate("/news");
      } else {
        setError(result.message || "Failed to update news");
      }
    } catch (err) {
      setError("Failed to connect to the server");
      console.error("Error updating news:", err);
    }
  };

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
        <button
          onClick={() => navigate("/news")}
          style={{
            background: "#1a75c4",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "1rem",
          }}>
          Back to News
        </button>
      </div>
    );
  }

  return (
    <div ref={formRef} className="premium-form">
      <h2 style={{ marginTop: 0 }}>Edit News</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          style={{
            minHeight: "150px",
            resize: "vertical",
            padding: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontFamily: "inherit",
          }}
        />
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button
            type="button"
            onClick={() => navigate("/news")}
            style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: 4,
              padding: "0.5rem 1.2rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}>
            Cancel
          </button>
          <button type="submit" className="premium-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNewsPage;
