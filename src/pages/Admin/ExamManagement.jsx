import React, { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./ExamManagement.css";

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Replace with API call to fetch exams
    setExams([
      {
        _id: "e1",
        title: "Mid-Term Exam - CS101",
        type: "Mid-Term",
        date: "2023-05-15",
        duration: 90,
        courseName: "Introduction to Computer Science",
      },
      {
        _id: "e2",
        title: "Final Exam - MATH301",
        type: "Final",
        date: "2023-06-20",
        duration: 120,
        courseName: "Advanced Mathematics",
      },
    ]);
  }, []);

  const handleEditExam = (exam) => {
    console.log("Edit exam", exam);
  };

  const handleDeleteExam = (id) => {
    console.log("Delete exam", id);
    setExams(exams.filter(exam => exam._id !== id));
  };

  const handleGradeExam = (exam) => {
    console.log("Grade exam", exam);
  };

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="exam-management-page">
      <Header />
      <Navigation />
      <div className="page-header">
        <h1>Exam Management</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span>Exam Management</span>
        </nav>
      </div>
      {/* Top Action Bar */}
      <div className="action-bar">
        <button className="add-button">Create Exam/Test</button>
        <input
          type="text"
          placeholder="Search exams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Exam List Container */}
      <section className="exam-list-container">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <div key={exam._id} className="exam-card">
              <div className="exam-header">
                <h2>{exam.title}</h2>
              </div>
              <div className="exam-details">
                <p>Type: {exam.type}</p>
                <p>Date: {exam.date}</p>
                <p>Duration: {exam.duration} mins</p>
                <p>Course: {exam.courseName || "Unknown Course"}</p>
              </div>
              <div className="exam-actions">
                <button onClick={() => handleEditExam(exam)}>Edit Exam</button>
                <button onClick={() => handleDeleteExam(exam._id)}>Delete Exam</button>
                <button onClick={() => handleGradeExam(exam)}>Grade/Review</button>
              </div>
            </div>
          ))
        ) : (
          <p>No exams scheduled.</p>
        )}
      </section>
      {/* Optional Pagination Controls */}
      <div className="pagination">
        {/* Add pagination controls here if needed */}
      </div>
      <Footer />
    </div>
  );
};

export default ExamManagement;
