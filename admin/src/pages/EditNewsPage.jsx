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
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("id", id);
      fd.append("title", form.title);
      fd.append("author", form.author);
      fd.append("content", form.content);
      files.forEach((file) => fd.append("images[]", file));

      const response = await fetch(`${API_BASE_URL}/news/updateNews.php`, {
        method: "POST",
        body: fd,
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
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label style={{ fontWeight: 600 }}>Images (you can select multiple)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
          {files?.length > 0 && (
            <small style={{ color: "#666" }}>
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </small>
          )}
        </div>
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          disabled={isSubmitting}
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
          style={{ 
            display: "flex", 
            justifyContent: "flex-end", 
            gap: "1rem",
            flexWrap: "wrap"
          }}>
          <button
            type="button"
            onClick={() => navigate("/news")}
            disabled={isSubmitting}
            style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: 4,
              padding: "0.5rem 1.2rem",
              fontSize: "1rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
              opacity: isSubmitting ? 0.6 : 1,
            }}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="premium-btn"
            disabled={isSubmitting}
            style={{ 
              whiteSpace: "nowrap",
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}>
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNewsPage;
