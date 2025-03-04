import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Common/Navigation";
import Footer from "../components/Common/Footer";
import Sidebar from "../components/Common/Sidebar";
import "./Home.css";

const Home = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [stats, setStats] = useState({
    students: 5000,
    courses: 350,
    faculties: 8,
    departments: 25
  });
  
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // Example static data for the faculty showcase section
  const faculties = [
    { 
      id: 1, 
      name: "Faculty of Science", 
      description: "Innovative research and education in natural sciences, mathematics, and computing.",
      courses: 78,
      icon: "/assets/icons/science.png"
    },
    { 
      id: 2, 
      name: "Faculty of Arts", 
      description: "Creative and critical thinking across humanities and social sciences.",
      courses: 92,
      icon: "/assets/icons/arts.png"
    },
    { 
      id: 3, 
      name: "Faculty of Education", 
      description: "Transforming teaching methods and educational practices for the future.",
      courses: 45,
      icon: "/assets/icons/education.png"
    },
    { 
      id: 4, 
      name: "Faculty of Engineering", 
      description: "Practical innovation and technological advancement through applied sciences.",
      courses: 63,
      icon: "/assets/icons/engineering.png"
    }
  ];

  // Popular courses showcase
  const popularCourses = [
    {
      id: 101,
      title: "Introduction to Data Science",
      faculty: "Science",
      instructor: "Dr. Jane Smith",
      students: 324,
      rating: 4.8
    },
    {
      id: 102,
      title: "Modern World History",
      faculty: "Arts",
      instructor: "Prof. Robert Johnson",
      students: 287,
      rating: 4.7
    },
    {
      id: 103,
      title: "Educational Psychology",
      faculty: "Education",
      instructor: "Dr. Maria Garcia",
      students: 198,
      rating: 4.9
    }
  ];

  // Testimonials section
  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      role: "Student",
      text: "E-Learn transformed my learning experience. The interactive courses and organized structure helped me excel in my studies.",
      photo: "/assets/images/testimonial1.jpg"
    },
    {
      id: 2,
      name: "Dr. Thomas",
      role: "Professor",
      text: "As an educator, I find E-Learn's platform intuitive and powerful for delivering content and tracking student progress.",
      photo: "/assets/images/testimonial2.jpg"
    }
  ];

  // Animation effect for stats
  useEffect(() => {
    const animateStats = () => {
      const observerCallback = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.stat-count').forEach(counter => {
              counter.classList.add('animate');
            });
          }
        });
      };
      
      const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
      const statsSection = document.querySelector('.stats-section');
      
      if (statsSection) {
        observer.observe(statsSection);
      }
      
      return () => {
        if (statsSection) {
          observer.unobserve(statsSection);
        }
      };
    };
    
    animateStats();
  }, []);

  return (
    <div className="home-page">


      {/* Sidebar Toggle Button (visible on mobile) */}
      {/* <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle navigation menu">
        {sidebarActive ? "✕" : "☰"}
      </button>
       */}
      {/* Sidebar */}
      <div className={`sidebar-wrapper ${sidebarActive ? 'active' : ''}`}>
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="content-wrapper">
      {/* <Navigation /> */}
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to E-Learn</h1>
            <p>Your comprehensive learning management system for academic excellence.</p>
            <div className="hero-buttons">
              <Link to="/faculty" className="cta-button primary">
                Explore Courses
              </Link>
              <Link to="/register" className="cta-button secondary">
                Sign Up Now
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/images/hero-illustration.png" alt="E-Learn Platform Illustration" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-box">
            <span className="stat-count">{stats.students.toLocaleString()}+</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="stat-box">
            <span className="stat-count">{stats.courses}+</span>
            <span className="stat-label">Courses</span>
          </div>
          <div className="stat-box">
            <span className="stat-count">{stats.faculties}</span>
            <span className="stat-label">Faculties</span>
          </div>
          <div className="stat-box">
            <span className="stat-count">{stats.departments}</span>
            <span className="stat-label">Departments</span>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose E-Learn?</h2>
          <div className="features-container">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/assets/icons/faculty.png" alt="Faculty Management" />
              </div>
              <h3>Faculty & Department Management</h3>
              <p>Efficiently organize academic structures and administrative hierarchies.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/assets/icons/course.png" alt="Course Management" />
              </div>
              <h3>Seamless Course Creation</h3>
              <p>Easy-to-use tools for creating, managing and enrolling in courses.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/assets/icons/exam.png" alt="Exam Management" />
              </div>
              <h3>Automated Exam Scheduling</h3>
              <p>Conflict-free exam scheduling and grading system.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/assets/icons/cgpa.png" alt="CGPA Computation" />
              </div>
              <h3>CGPA Computation</h3>
              <p>Accurate grade calculation and academic progress tracking.</p>
            </div>
          </div>
        </section>

        {/* Faculty Showcase Section */}
        <section className="faculty-showcase-section">
          <h2>Our Faculties</h2>
          <div className="faculty-cards-container">
            {faculties.map((faculty) => (
              <div key={faculty.id} className="faculty-card">
                <div className="faculty-icon">
                  <img src={faculty.icon} alt={faculty.name} />
                </div>
                <h3>{faculty.name}</h3>
                <p>{faculty.description}</p>
                <div className="faculty-meta">
                  <span>{faculty.courses} Courses</span>
                </div>
                <Link to={`/faculty/${faculty.id}`} className="faculty-link">
                  View Faculty
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="popular-courses-section">
          <h2>Popular Courses</h2>
          <div className="courses-container">
            {popularCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <span className="course-faculty">{course.faculty}</span>
                  <span className="course-rating">★ {course.rating}</span>
                </div>
                <h3>{course.title}</h3>
                <p className="course-instructor">By {course.instructor}</p>
                <div className="course-meta">
                  <span>{course.students} students enrolled</span>
                </div>
                <Link to={`/student/course/${course.id}`} className="course-link">
                  View Course
                </Link>
              </div>
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/student/mycourses" className="view-all-link">
              View All Courses
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h2>What Our Users Say</h2>
          <div className="testimonials-container">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-photo">
                    <img src={testimonial.photo} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Join E-Learn Today</h2>
            <p>Sign up or log in to unlock your full learning potential.</p>
            <div className="cta-buttons">
              <Link to="/login" className="cta-button primary">
                Login
              </Link>
              <Link to="/register" className="cta-button secondary">
                Register
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Block */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;