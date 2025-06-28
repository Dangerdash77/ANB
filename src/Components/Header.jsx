import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Components css/Header.css';
import logo from '../assets/logo.png';

const Header = ({ isLoggedIn, role, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="ANB Industries" />
      </div>

      {isMobile && (
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {(menuOpen || !isMobile) && (
        <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
          {isLoggedIn ? (
            <>
              <NavLink to="/company" onClick={() => setMenuOpen(false)}>Company</NavLink>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>

              {role === 'owner' && (
                <>
                  <NavLink to="/manage-products" onClick={() => setMenuOpen(false)}>Manage Products</NavLink>
                  <NavLink to="/view-careers" onClick={() => setMenuOpen(false)}>Career Requests</NavLink>
                  <NavLink to="/view-contacts" onClick={() => setMenuOpen(false)}>Contact Requests</NavLink>
                </>
              )}

              <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
              <NavLink to="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</NavLink>
              <NavLink to="/careers" onClick={() => setMenuOpen(false)}>Careers</NavLink>
              <NavLink to="/about-us" onClick={() => setMenuOpen(false)}>About Us</NavLink>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
