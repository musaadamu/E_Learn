import React from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./CourseDetail.css"; // Custom styles for Course Detail page

const CourseDetail = () => {
  // Example static course data; replace with dynamic data based on route params
  const course = {
    id: 1,
    title: "Introduction to Computer Science",
    description:
      "An introductory course covering the fundamentals of computer science, including programming concepts, algorithms, and data structures.",
    objectives: "Understand basic programming and problem-solving techniques.",
    code: "CS101",
    creditHours: 3,
    schedule: "Mon, Wed, Fri 10:00-11:00",
    instructor: "Prof. Smith",
    syllabus: "Introduction, Programming Basics, Data Structures, Algorithms",
    prerequisites: "None",
    materials: [
      { id: 1, title: "Lecture 1 Slides", description: "Introduction to the course", link: "/materials/lecture1.pdf" },
      { id: 2, title: "Lecture 2 Slides", description: "Basics of Programming", link: "/materials/lecture2.pdf" },
    ],
    announcements: [
      { id: 1, message: "Assignment 1 due next week.", date: "2023-05-01" },
      { id: 2, message: "Mid-term exam scheduled for May 15.", date: "2023-05-05" },
    ],
  };

  return (
    <div className="faculty-course-detail">
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
        <p><strong>Objectives:</strong> {course.objectives}</p>
        <p>
          <strong>Course Code:</strong> {course.code} | <strong>Credits:</strong> {course.creditHours}
        </p>
        <p>
          <strong>Schedule:</strong> {course.schedule} | <strong>Instructor:</strong> {course.instructor}
        </p>
        <p><strong>Syllabus:</strong> {course.syllabus}</p>
        <p><strong>Prerequisites:</strong> {course.prerequisites}</p>
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
        <button>Post Announcement</button>
        <button>Edit Course</button>
        <button>Upload Material</button>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
