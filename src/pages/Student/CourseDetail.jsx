import React from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./CourseDetail.css"; // Optional: custom CSS for Course Detail page

const CourseDetail = () => {
  // Example static data; in production, fetch course data based on route parameter
  const course = {
    id: 1,
    title: "Introduction to Computer Science",
    description:
      "This course covers the basics of computer science including programming fundamentals, data structures, and algorithms.",
    objectives: "Understand programming concepts and problem-solving techniques.",
    creditHours: 3,
    instructor: "Prof. Smith",
    schedule: "Mon/Wed/Fri 10:00-11:00",
    syllabusHighlights: "Introduction, Programming Basics, Data Structures",
    prerequisites: "None",
    materials: [
      {
        id: 1,
        title: "Lecture 1 Slides",
        description: "Introduction to Computer Science",
        link: "/materials/lecture1.pdf",
      },
      {
        id: 2,
        title: "Lecture 2 Slides",
        description: "Programming Basics",
        link: "/materials/lecture2.pdf",
      },
    ],
    announcements: [
      { id: 1, message: "Assignment 1 due next week.", date: "2023-05-01" },
      { id: 2, message: "Mid-term exam scheduled for May 15.", date: "2023-05-05" },
    ],
  };

  return (
    <div className="course-detail-page">
      {/* Header & Breadcrumb Navigation */}
      <Header />
      <Navigation />
      <div className="breadcrumb">
        <span>Home</span> / <span>My Courses</span> / <span>{course.title}</span>
      </div>

      {/* Course Overview Section */}
      <section className="course-overview">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p>
          <strong>Objectives:</strong> {course.objectives}
        </p>
        <p>
          <strong>Credit Hours:</strong> {course.creditHours}
        </p>
        <p>
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p>
          <strong>Schedule:</strong> {course.schedule}
        </p>
        <p>
          <strong>Syllabus Highlights:</strong> {course.syllabusHighlights}
        </p>
        <p>
          <strong>Prerequisites:</strong> {course.prerequisites}
        </p>
      </section>

      {/* Materials & Resources Section */}
      <section className="materials-section">
        <h2>Materials & Resources</h2>
        <div className="materials-list">
          {course.materials.map((material) => (
            <div key={material.id} className="material-card">
              <h3>{material.title}</h3>
              <p>{material.description}</p>
              <a href={material.link} target="_blank" rel="noopener noreferrer">
                View/Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements & Assignments Section */}
      <section className="announcements-section">
        <h2>Announcements & Assignments</h2>
        <ul>
          {course.announcements.map((announcement) => (
            <li key={announcement.id}>
              <p>{announcement.message}</p>
              <small>{announcement.date}</small>
            </li>
          ))}
        </ul>
      </section>

      {/* Action Panel/Call-to-Action Buttons */}
      <section className="action-panel">
        <button>Submit Assignment</button>
        <button>Join Discussion</button>
        <button>View Grades</button>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
