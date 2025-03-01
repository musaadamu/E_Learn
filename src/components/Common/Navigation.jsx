import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="main-navigation">
      {/* Navbar Title */}
      <div className="navbar-header">
       
        <button 
          className="hamburger" 
          onClick={toggleMenu} 
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-icon">
            {menuOpen ? "✖" : "☰"}
          </span>
        </button>
      </div>
      
      {/* Primary Navigation Menu */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/student/mycourses" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/faq" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            FAQ
          </NavLink>
        </li>
        <li className="nav-cta">
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Login
          </NavLink>
        </li>
        <li className="nav-cta">
          <NavLink 
            to="/register" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;