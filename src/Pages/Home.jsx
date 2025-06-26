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
import img1 from '../assets/product_img/Plastic Endless chain.png';
import img2 from '../assets/product_img/Plastic Operation Chain W.jpg';
import img3 from '../assets/product_img/Plastic Operation Chain Brown.jpg';
import img4 from '../assets/product_img/Plastic Operation Chain S.jpg';
import img5 from '../assets/product_img/Plastic Operation Chain B.jpg';
import img6 from '../assets/product_img/6 Gear Control.png';
import img7 from '../assets/product_img/Zebra Metal.png';
import img8 from '../assets/product_img/Zebra Plastic.png';
// import img9 from '../assets/product_img/Heavy Cord Weight Plain.png';
import img10 from '../assets/product_img/Heavy Cord Weight Printed.png';
import img11 from '../assets/product_img/Oval Cord Weight Plain.png';
// import img12 from '../assets/product_img/Oval Cord Weight Printed.png';
import img13 from '../assets/product_img/Arabian Mindi Runner.png';
import img14 from '../assets/product_img/Arabian Trishul Runner.png';
// import img15 from '../assets/product_img/M Runner Ripple.png';
import img16 from '../assets/product_img/M Runner.png';
import img17 from '../assets/product_img/Roman Control Set.png';
import img18 from '../assets/product_img/Bottom Chain.png';
// import img19 from '../assets/product_img/Plastic Held.png';
// import img20 from '../assets/product_img/Plastic Lotion Pump.png';
// import img21 from '../assets/product_img/Soap Dispenser Pump.png';
import img22 from '../assets/product_img/Chain Stopper Button.png';
import img23 from '../assets/product_img/Chain Stopper Button Trans.png';
import img24 from '../assets/product_img/Chain Stopper Ball.png';
import img25 from '../assets/product_img/Chain Jointer.png';

const images = [slider1, slider2, slider3];

const productData = [
  {
    image: img1,
    title: 'Plastic Endless Chain',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img2,
    title: 'Plastic Operation Chain',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img3,
    title: 'Plastic Operation Chain',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img4,
    title: 'Plastic Operation Chain',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img5,
    title: 'Plastic Operation Chain',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img6,
    title: '6‑Gear Roller Control Unit',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img7,
    title: 'Zebra Control Unit (Metal end caps)',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img8,
    title: 'Zebra Control Unit (Plastic end caps)',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  // {
  //   image: img9,
  //   title: 'Heavy Cord Weight (Plain)',
  //   description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  // },
  {
    image: img10,
    title: 'Heavy Cord Weight (Printed)',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img11,
    title: 'Oval Cord Weight (Plain)',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  // {
  //   image: img12,
  //   title: 'Oval Cord Weight (Printed)',
  //   description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  // },
  {
    image: img13,
    title: 'Arabian Mindi Runner',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img14,
    title: 'Arabian Trishul Runner',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  // {
  //   image: img15,
  //   title: 'M Runner Ripple',
  //   description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  // },
  {
    image: img16,
    title: 'M Runner',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img17,
    title: 'Roman Control Set',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img18,
    title: 'Bottom Chain',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  // {
  //   image: img19,
  //   title: 'Plastic Held',
  //   description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  // },
  // {
  //   image: img20,
  //   title: 'Plastic Lotion Pump',
  //   description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  // },
  // {
  //   image: img21,
  //   title: 'Soap Dispenser Pump',
  //   description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  // },
  {
    image: img22,
    title: 'Chain Stopper Button',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img23,
    title: 'Chain Stopper Button Transparent',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img24,
    title: 'Chain Stopper Ball',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  },
  {
    image: img25,
    title: 'Chain Jointer',
    description: 'High-durability chain designed for smooth curtain operations in all conditions.',
  }
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
