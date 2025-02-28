import React, { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import AdminCourseCard from "../../components/Admin/CourseCard";
import "./CourseManagement.css";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Replace with API call to fetch courses
    setCourses([
      {
        _id: "c1",
        name: "Introduction to Computer Science",
        credits: 3,
        departmentName: "Department of Science",
        description: "Fundamentals of computer science.",
        prerequisites: ["None"],
      },
      {
        _id: "c2",
        name: "Advanced Mathematics",
        credits: 4,
        departmentName: "Department of Arts",
        description: "In-depth study of mathematical concepts.",
        prerequisites: ["Calculus"],
      },
    ]);
  }, []);

  const handleEdit = (course) => {
    console.log("Edit course", course);
  };

  const handleDelete = (id) => {
    console.log("Delete course", id);
    setCourses(courses.filter(course => course._id !== id));
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="course-management-page">
      <Header />
      <Navigation />
      <div className="page-header">
        <h1>Course Management</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span>Course Management</span>
        </nav>
      </div>
      {/* Action Bar */}
      <div className="action-bar">
        <button className="add-button">Add Course</button>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Course List Container */}
      <section className="course-list-container">
        {filteredCourses.map((course) => (
          <AdminCourseCard
            key={course._id}
            course={course}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default CourseManagement;
