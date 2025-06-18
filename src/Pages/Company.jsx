import React from 'react';
import './Pages css/Company.css';

const Company = () => {
  return (
    <div className="company-container">
      <div className="company-wrapper">
        <h1 className="company-title">Our Company</h1>
        <p className="company-intro">
          ANB Industries is a proudly Indian manufacturer based in Shapar-Veraval, Rajkot. Specializing in
          **curtain roller chains**, we bring decades of precision engineering, durability, and innovation to the window hardware market.
        </p>

        <section className="company-section">
          <h2 className="section-heading">Who We Are</h2>
          <p>
            Founded with the goal of contributing to the vision of Atma Nirbhar Bharat, ANB Industries stands for
            integrity, innovation, and local empowerment. Our facilities are equipped with modern technology and
            staffed with experienced professionals who ensure quality at every step.
          </p>
        </section>

        <section className="company-section">
          <h2 className="section-heading">Core Values</h2>
          <ul className="section-list">
            <li>Customer Commitment</li>
            <li>Quality Craftsmanship</li>
            <li>Innovation and Improvement</li>
            <li>Workplace Responsibility</li>
            <li>Community Engagement</li>
          </ul>
        </section>

        <section className="company-section">
          <h2 className="section-heading">Our Infrastructure</h2>
          <p>
            Located at Survey No. 252, Captain Gate, 1st Floor Ghanshyam Eng. Co., Jain Steel Road, Shapar-Veraval,
            our unit houses modern production equipment and strict quality control systems to maintain product consistency.
          </p>
        </section>

        <section className="company-section">
          <h2 className="section-heading">Certifications & Compliance</h2>
          <p>
            ANB Industries adheres to all national manufacturing regulations and is committed to maintaining
            international standards of quality and workplace safety.
          </p>
        </section>

        <section className="company-section">
          <h2 className="section-heading">Leadership</h2>
          <p>
            Our management team combines engineering expertise and market knowledge to guide the company toward growth and innovation.
            We're constantly investing in both machinery and manpower to stay ahead.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Company;
