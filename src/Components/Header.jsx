// src/Components/Header.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Components css/Header.css';

const Header = ({ isLoggedIn, role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();         // Clears state and localStorage
    navigate('/');      // Redirect to homepage
  };

  return (
    <header className="header">
      <div className="logo">ANB Industries</div>
      <nav>
        {isLoggedIn ? (
          <>
            <NavLink to="/company">Company</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            {role === 'owner' && (
              <>
                <NavLink to="/manage-products">Manage Products</NavLink>
                <NavLink to="/view-careers">Career Requests</NavLink>
                <NavLink to="/view-contacts">Contact Requests</NavLink>
              </>
            )}

            {/* Logout Button */}
            <button className="logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/contact-us">Contact Us</NavLink>
            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
