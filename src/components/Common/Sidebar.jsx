import React from 'react';
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="site-sidebar">
      {/* User Profile/Quick Info Block */}
      <div className="sidebar-profile">
        <img src="avatar.jpg" alt="Avatar" className="avatar" />
        <div className="user-info">
          <p className="user-name">John Doe</p>
          <p className="user-role">Student</p>
        </div>
      </div>

      {/* Navigation Menu/Links Block */}
      <nav className="sidebar-nav">
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#courses">My Courses</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </nav>

      {/* Additional Utility or Filter Options (Optional) */}
      <div className="sidebar-utilities">
        <input className="sidebar-search" type="text" placeholder="Search..." />
        <button className="create-action">Create New Course</button>
      </div>
    </div>
  );
};

export default Sidebar;