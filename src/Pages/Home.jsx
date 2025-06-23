import React, { useEffect, useState } from 'react';
import './Pages css/Home.css';
import slider1 from '../assets/Banner 1.jpg';
import slider2 from '../assets/Banner 2.jpg';
import slider3 from '../assets/Banner 3.jpg';
import trust1 from '../assets/logo.png';
import trust2 from '../assets/logo.png';
import trust3 from '../assets/logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/product img/6 Gear Control.png';
import img2 from '../assets/product img/Zebra Metal.png';
import img3 from '../assets/product img/Zebra Plastic.png';
import img4 from '../assets/product img/Roman Control.png';
import img5 from '../assets/product img/M Runner.png';
import img6 from '../assets/product img/Arabian Trishul.png';
import img7 from '../assets/product img/Arabian Mindi.png';
import img8 from '../assets/product img/Bottom Chain.png';
import img9 from '../assets/product img/Endless chain.png';
import img10 from '../assets/product img/Endlesswhite.jpg';
import img11 from '../assets/product img/Operation Chain B.jpg';
import img12 from '../assets/product img/Operation Chain Brown.jpg';
import img13 from '../assets/product img/Operation Chain S.jpg';
import img14 from '../assets/product img/Cod Weight 1.png';
import img15 from '../assets/product img/Cod Weight 2.png';

const images = [slider1, slider2, slider3];

const productData = [
  {
    image: img1,
    title: 'Premium Roller Chain',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img2,
    title: 'Steel Roller Set',
    description: 'Reliable and rust-resistant roller sets used in industrial curtain systems.',
  },
  {
    image: img3,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img4,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img5,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img6,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img7,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img8,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img9,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img10,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img11,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img12,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img13,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img14,
    title: 'Aluminum Roller System',
    description: 'Lightweight and corrosion-free curtain rolling solution for modern interiors.',
  },
    {
    image: img15,
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
    }, 3000);
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
