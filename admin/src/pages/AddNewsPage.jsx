import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function AddNewsPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    image_url: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

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
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/news/createNews.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (result.success) {
        navigate("/news");
      } else {
        alert(result.message || "Failed to create news");
      }
    } catch (err) {
      alert("Failed to connect to the server");
      console.error("Error creating news:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="premium-form">
      <h2 style={{ marginTop: 0 }}>Add News</h2>
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
        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          disabled={isSubmitting}
        />
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
          <button
            type="submit"
            className="premium-btn"
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}>
            {isSubmitting ? "Creating..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewsPage;
