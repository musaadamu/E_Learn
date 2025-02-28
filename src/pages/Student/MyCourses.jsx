import React, { useState } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./MyCourses.css"; // Optional: custom CSS for My Courses page

const MyCourses = () => {
  // Example static data; replace with dynamic data from API as needed.
  const [courses] = useState([
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Learn the fundamentals of computing.",
      code: "CS101",
      schedule: "Mon/Wed/Fri 10:00-11:00",
      instructor: "Prof. Smith",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      description: "Explore advanced mathematical theories.",
      code: "MATH301",
      schedule: "Tue/Thu 14:00-15:30",
      instructor: "Dr. Jones",
    },
    // Additional courses...
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-courses-page">
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
        {/* Optionally add additional filter options */}
      </div>

      {/* Course List Container */}
      <div className="course-list">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>
              <strong>Code:</strong> {course.code}
            </p>
            <p>
              <strong>Schedule:</strong> {course.schedule}
            </p>
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <a href={`/student/course/${course.id}`} className="view-button">
              View Course Details
            </a>
          </div>
        ))}
      </div>

      {/* Optional: Pagination / Load More Controls */}

      <Footer />
    </div>
  );
};

export default MyCourses;
