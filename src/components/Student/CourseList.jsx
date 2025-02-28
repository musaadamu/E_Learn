import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CourseList.css"; // Make sure to define styles accordingly

const CourseList = () => {
  // Example static data for courses; replace with API data as needed
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate an API call to fetch courses
    const dummyCourses = [
      {
        id: "1",
        title: "Introduction to Computer Science",
        description: "Learn the fundamentals of computer science.",
        code: "CS101",
        credits: 3,
        instructor: "Prof. Smith",
      },
      {
        id: "2",
        title: "Data Structures",
        description: "Explore core data structures and algorithms.",
        code: "CS102",
        credits: 4,
        instructor: "Dr. Johnson",
      },
      // ...additional courses
    ];
    setCourses(dummyCourses);
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-course-list">
      {/* Page Header / Title Block */}
      <header className="page-header">
        <h1>My Courses</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span>My Courses</span>
        </nav>
      </header>

      {/* Search & Filter Section */}
      <section className="search-filter-section">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* Add additional filters (e.g., dropdowns) as needed */}
      </section>

      {/* Course List Container */}
      <section className="course-list-container">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            {/* Course Card */}
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">{course.description}</p>
            <p className="course-details">
              <strong>Code:</strong> {course.code} | <strong>Credits:</strong> {course.credits} |{" "}
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <Link to={`/student/course/${course.id}`} className="view-details-button">
              View Details
            </Link>
          </div>
        ))}
      </section>

      {/* Pagination / Load More Controls (Optional) */}
      <div className="pagination-controls">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
};

export default CourseList;
