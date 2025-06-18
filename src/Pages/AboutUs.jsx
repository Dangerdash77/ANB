import React from 'react';
import './Pages css/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About ANB Industries</h1>
        <p>Your trusted partner in premium curtain roller chain systems.</p>
      </div>

      <div className="about-section fade-in">
        <h2>Our Story</h2>
        <p>
          Founded in the heart of Shapar-Veraval, Gujarat, ANB Industries has grown to become a key manufacturer in the curtain roller chain market.
          With years of industry experience, we are committed to providing durable, stylish, and affordable products that enhance interior design solutions across India.
        </p>
      </div>

      <div className="about-section fade-in">
        <h2>Our Mission</h2>
        <p>
          Our mission is to innovate and elevate the quality of curtain hardware by blending engineering precision with aesthetic excellence.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card fade-in">
          <h3>Quality</h3>
          <p>Each product is crafted with top-grade materials ensuring long life and smooth operation.</p>
        </div>
        <div className="about-card fade-in">
          <h3>Innovation</h3>
          <p>We invest in R&D to offer modern designs and customizable solutions.</p>
        </div>
        <div className="about-card fade-in">
          <h3>Customer First</h3>
          <p>Client satisfaction drives our approach—from design to delivery.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
