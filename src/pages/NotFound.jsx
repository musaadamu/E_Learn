import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // We'll create this file next

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            Return to Home
          </Link>
          <Link to="/courses" className="courses-button">
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;