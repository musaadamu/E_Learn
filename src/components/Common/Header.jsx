import React from 'react';
import "./Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo/Branding Block (Left) */}
        <div className="header-branding">
          <img src="/assets/images/logo.png" alt="E-Learn Logo" className="logo" />
          <div className="site-name">E-Learn</div>
          <div className="tagline">Empowering Education</div>
        </div>

        {/* Primary Navigation Menu (Center) */}
        <nav className="header-nav">
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>

        {/* Utility/User Actions (Right) */}
        <div className="header-utilities">
          <button className="utility-btn search-btn">🔍</button>
          <button className="utility-btn notifications-btn">🔔</button>
          <a href="/login" className="cta-btn login-btn">Login</a>
          <a href="/register" className="cta-btn register-btn">Register</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
