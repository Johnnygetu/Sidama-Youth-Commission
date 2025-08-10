import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = ({ contactFormRef }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    // Debug logging for client-side submission
    console.log("🔄 Client: Starting message submission...");
    console.log("📝 Client: Form data:", {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      messageLength: formData.message.length,
      timestamp: new Date().toISOString(),
    });

    try {
      console.log("🌐 Client: Sending POST request to createMessage.php");
      const response = await fetch(
        "https://phpsample.eltechsolutions-et.com/messages/createMessage.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("📡 Client: Response status:", response.status);
      console.log(
        "📡 Client: Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      const result = await response.json();
      console.log("📄 Client: Response data:", result);

      if (result.success) {
        console.log("✅ Client: Message sent successfully!");
        console.log("📊 Client: Message ID:", result.data?.id);
        setSubmitStatus("success");
        setSubmitMessage(
          "Message sent successfully! We will get back to you soon."
        );
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        console.log("❌ Client: Message sending failed:", result.message);
        setSubmitStatus("error");
        setSubmitMessage(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.log("💥 Client: Network error occurred:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        "Network error. Please check your connection and try again."
      );
      console.error("Error sending message:", error);
    } finally {
      console.log("🏁 Client: Message submission completed");
      setIsSubmitting(false);
    }
  };
  return (
    <section className="contact-section" ref={contactFormRef}>
      <div className="container contact-grid">
        {/* Contact Form */}
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus && (
              <div className={`submit-message ${submitStatus}`}>
                {submitMessage}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@email.com"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                placeholder="Type your message..."
                required
                disabled={isSubmitting}></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        {/* Contact Info */}
        <div className="contact-info-card">
          <h2>Contact Information</h2>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>Hawassa, Sidama Region, Ethiopia</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📧</span>
            <span>info@sidamayouth.org</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <span>+251 911 234 567</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🌐</span>
            <span>www.sidamayouth.org</span>
          </div>
          <div className="map-placeholder">
            <span role="img" aria-label="map" style={{ fontSize: "2.5rem" }}>
              🗺️
            </span>
            <p>Map Location</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
