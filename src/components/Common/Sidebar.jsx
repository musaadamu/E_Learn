import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = () => {
  // Determine if user is admin, faculty or student
  // This could be fetched from auth context or session
  const userRole = "Student"; // Example: can be "Admin", "Faculty", or "Student"
  
  return (
    <div className="site-sidebar">
      {/* User Profile/Quick Info Block */}
      <div className="sidebar-profile">
        <img src="/src/assets/images/avatar.jpg" alt="Avatar" className="avatar" />
        <div className="user-info">
          <p className="user-name">Musa Adamu</p>
          <p className="user-role">{userRole}</p>
        </div>
      </div>
      
      Navigation Menu/Links Block */}
      <nav className="sidebar-nav">
        <ul>
          {/* Common Pages
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
           */}
          {/* Role-based Pages
          {userRole === "Admin" && (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/facultymanagement">Faculty Management</Link></li>
              <li><Link to="/admin/departmentmanagement">Department Management</Link></li>
              <li><Link to="/admin/coursemanagement">Course Management</Link></li>
              <li><Link to="/admin/studentmanagement">Student Management</Link></li>
              <li><Link to="/admin/exammanagement">Exam Management</Link></li>
              <li><Link to="/admin/reports">Reports</Link></li>
            </>
          )}
          
          {userRole === "Faculty" && (
            <>
              <li><Link to="/faculty/dashboard">Dashboard</Link></li>
              <li><Link to="/faculty/mycourses">My Courses</Link></li>
              <li><Link to="/faculty/profile">Profile</Link></li>
            </>
          )}
          
          {userRole === "Student" && (
            <>
              <li><Link to="/student/dashboard">Dashboard</Link></li>
              <li><Link to="/student/mycourses">My Courses</Link></li>
              <li><Link to="/student/coursedetail">Course Details</Link></li>
              <li><Link to="/student/profile">Profile</Link></li>
            </>
          )}
          
          {/* Services Section */}
          {/* <li className="sidebar-section-title">Services</li>
          <li><Link to="/services/auth">Authentication</Link></li>
          <li><Link to="/services/faculty">Faculty Services</Link></li>
          <li><Link to="/services/department">Department Services</Link></li>
          <li><Link to="/services/course">Course Services</Link></li>
          <li><Link to="/services/student">Student Services</Link></li>
          <li><Link to="/services/exam">Exam Services</Link></li>
          <li><Link to="/services/report">Report Services</Link></li>
           */}
          {/* Auth */}
          {/* <li className="sidebar-section-title">Account</li> */}
          <li><Link to="/auth/login">Login</Link></li>
          <li><Link to="/auth/register">Register</Link></li>
        </ul>
      </nav>
      
      {/* Additional Utility or Filter Options (Optional) */}
      {/* <div className="sidebar-utilities">
        <input className="sidebar-search" type="text" placeholder="Search..." />
        <button className="create-action">Create New Course</button>
      </div> */}
    </div>
  );
};

export default Sidebar;