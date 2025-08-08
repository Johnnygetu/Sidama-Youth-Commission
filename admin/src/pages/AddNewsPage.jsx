import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddNewsPage() {
  const [form, setForm] = useState({
    title: "",
    day: "",
    month: "",
    author: "",
    category: "",
    image: "",
    content: "",
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would add the news to the backend or state
    navigate("/news");
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
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            name="day"
            placeholder="Day (e.g. 15)"
            value={form.day}
            onChange={handleChange}
            required
            style={{ width: 80 }}
          />
          <input
            name="month"
            placeholder="Month (e.g. Dec)"
            value={form.month}
            onChange={handleChange}
            required
            style={{ width: 80 }}
          />
        </div>
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <input
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewsPage;
