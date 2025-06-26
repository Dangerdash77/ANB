import React, { useState } from 'react';
import './Pages css/Contact.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://anb-nuis.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Your message has been sent successfully!");
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (err) {
      console.error("Error while sending message:", err);
      alert("🚫 Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-container">
        {/* Left - Contact Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <label>Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>Mobile:
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>Subject:
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
            </label>
            <label>Message:
              <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Contact"}
            </button>
          </form>
        </div>

        {/* Right - Contact Info */}
        <div className="contact-info">
          <div className="info-box">
            <FaEnvelope className="icon" />
            <div>
              <h3>Email</h3>
              <p>anbind2020@gmail.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhone className="icon" />
            <div>
              <h3>Phone</h3>
              <p>+91 84606 03033</p>
            </div>
          </div>

          <div className="info-box">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h3>Address</h3>
              <p>Shapar-Veraval,<br />Rajkot, Gujarat, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
