import React, { useEffect, useState } from 'react';
import './Pages css/Home.css';
import slider1 from '../assets/image.jpg';
import slider2 from '../assets/logo.png';
import slider3 from '../assets/image.jpg';
import trust1 from '../assets/logo.png';
import trust2 from '../assets/logo.png';
import trust3 from '../assets/logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const images = [slider1, slider2, slider3];

const productData = [
  {
    image: slider1,
    title: 'Premium Roller Chain',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: slider2,
    title: 'Steel Roller Set',
    description: 'Reliable and rust-resistant roller sets used in industrial curtain systems.',
  },
  {
    image: slider3,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Hero slider auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Product slider auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % productData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Full-Screen Hero Image */}
      <div className="hero-slider">
        <img
          src={images[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="hero-image"
        />
      </div>

      {/* Welcome Section */}
      <div className="welcome-section" data-aos="fade-up">
        <h1>Welcome to ANB Industries</h1>
        <p>
          At ANB Industries, we specialize in manufacturing high-quality curtain roller chains,
          offering exceptional durability, precision, and design to meet global industrial standards.
        </p>
        <p>
          Our commitment to excellence and decades of experience have made us a trusted name among
          top manufacturing firms and interior solutions providers.
        </p>
      </div>

      {/* Product Showcase Section */}
      <div className="product-showcase-section" data-aos="fade-up">
        <h2>Our Products</h2>
        <div className="product-auto-slider">
          <div className="product-preview faded">
            <img
              src={productData[(currentProductIndex - 1 + productData.length) % productData.length].image}
              alt="Previous Product"
            />
          </div>

          <div className="product-card-horizontal">
            <img src={productData[currentProductIndex].image} alt="Product" />
            <div className="product-description">
              <h3>{productData[currentProductIndex].title}</h3>
              <p>{productData[currentProductIndex].description}</p>
            </div>
          </div>

          <div className="product-preview faded">
            <img
              src={productData[(currentProductIndex + 1) % productData.length].image}
              alt="Next Product"
            />
          </div>
        </div>

        <button className="product-page-button" onClick={() => navigate('/products')}>
          View All Products
        </button>
      </div>

      {/* Trusted Logos Section */}
      <div className="trusted-section" data-aos="fade-up">
        <h2>Trusted by Leading Companies</h2>
        <p className="trusted-subtext">
          Our products are relied upon by industry leaders for performance, reliability, and precision.
        </p>
        <div className="trusted-logos-grid">
          <img src={trust1} alt="Company 1" />
          <img src={trust2} alt="Company 2" />
          <img src={trust3} alt="Company 3" />
          {/* Add more logos as needed */}
        </div>
      </div>

    </div>
  );
};

export default Home;
