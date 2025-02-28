import React, { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./MyCourses.css"; // Custom styles for MyCourses page

const MyCourses = () => {
  // Example static data; replace with dynamic API calls as needed.
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulated fetch call (replace with API call)
    setCourses([
      {
        id: 1,
        title: "Introduction to Computer Science",
        description: "Learn the basics of computer science.",
        code: "CS101",
        credits: 3,
      },
      {
        id: 2,
        title: "Data Structures",
        description: "Explore fundamental data structures.",
        code: "CS201",
        credits: 4,
      },
      // More courses...
    ]);
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faculty-my-courses">
      {/* Header & Breadcrumb Navigation */}
      {/* <Header />
      <Navigation /> */}
      <div className="breadcrumb">
        <span>Home</span> / <span>My Courses</span>
      </div>
      <h1>My Courses</h1>

      {/* Search & Filter Bar */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Additional filter options can be added here */}
      </div>

      {/* Course List Container */}
      <section className="course-list">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>
              <strong>Code:</strong> {course.code} | <strong>Credits:</strong> {course.credits}
            </p>
            <a href={`/faculty/course/${course.id}`} className="view-button">
              View Course Details
            </a>
          </div>
        ))}
      </section>

      {/* Optional Pagination Controls */}

      <Footer />
    </div>
  );
};

export default MyCourses;
