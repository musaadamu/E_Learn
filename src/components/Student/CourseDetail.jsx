import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.css"; // Define styles as needed

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Simulate fetching course details by id (replace with API call)
    const dummyCourse = {
      id,
      title: "Introduction to Computer Science",
      description:
        "An in-depth look at computer science fundamentals including programming, algorithms, and data structures.",
      objectives: "Gain a strong foundation in computing and problem-solving.",
      code: "CS101",
      creditHours: 3,
      schedule: "Mon, Wed, Fri 10:00-11:00",
      instructor: "Prof. Smith",
      syllabus: "Introduction, Programming Basics, Data Structures, Algorithms.",
      prerequisites: "None",
      materials: [
        {
          id: "m1",
          title: "Lecture 1: Introduction",
          description: "Slides covering course introduction.",
          link: "/materials/lecture1.pdf",
        },
        {
          id: "m2",
          title: "Lecture 2: Programming Basics",
          description: "Slides on basic programming concepts.",
          link: "/materials/lecture2.pdf",
        },
      ],
      announcements: [
        { id: "a1", message: "Assignment 1 due next week.", date: "2023-05-01" },
        { id: "a2", message: "Mid-term exam scheduled for May 15.", date: "2023-05-05" },
      ],
    };
    setCourse(dummyCourse);
  }, [id]);

  if (!course) {
    return <div>Loading course details...</div>;
  }

  return (
    <div className="student-course-detail">
      {/* Page Header / Breadcrumb Navigation */}
      <header className="page-header">
        <h1>{course.title}</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span>My Courses</span> / <span>{course.title}</span>
        </nav>
      </header>

      {/* Course Overview Section */}
      <section className="course-overview">
        <p>{course.description}</p>
        <p>
          <strong>Objectives:</strong> {course.objectives}
        </p>
        <p>
          <strong>Course Code:</strong> {course.code} | <strong>Credit Hours:</strong> {course.creditHours}
        </p>
        <p>
          <strong>Schedule:</strong> {course.schedule} | <strong>Instructor:</strong> {course.instructor}
        </p>
        <p>
          <strong>Syllabus:</strong> {course.syllabus}
        </p>
        <p>
          <strong>Prerequisites:</strong> {course.prerequisites}
        </p>
      </section>

      {/* Course Materials & Resources Section */}
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

      {/* Additional Navigation / Action Tabs (Optional) */}
      <section className="additional-tabs">
        <ul>
          <li><a href="#materials">Materials</a></li>
          <li><a href="#assignments">Assignments</a></li>
          <li><a href="#grades">Grades</a></li>
          <li><a href="#discussions">Discussions</a></li>
        </ul>
      </section>
    </div>
  );
};

export default CourseDetail;
