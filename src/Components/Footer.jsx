import React from 'react';
import './Components css/Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Column 1 - About */}
        <div className="footer-column about">
          <h3>ANB Industries</h3>
          <p>
            We specialize in high-quality curtain roller chains, engineered with precision and trusted nationwide.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-column links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/quote">Get Quote</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div className="footer-column contact">
          <h4>Contact Us</h4>
          <p>Shapar-Veraval, Rajkot, Gujarat, India</p>
          <p>Email: <a href="mailto:anbind2020@gmail.com">anbind2020@gmail.com</a></p>
          <p>Phone: <a href="tel:+918460603033">+91 84606 03033</a></p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <p>© {new Date().getFullYear()} ANB Industries. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
