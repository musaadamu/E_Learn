import React from "react";
import "./ExamManagement.css"; // Customize with your styles

const ExamManagement = ({ exams, onCreateExam, onEditExam, onDeleteExam, onGradeExam }) => {
  return (
    <div className="admin-exam-management">
      {/* Page Header */}
      <header className="page-header">
        <h1>Exam Management</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span>Exam Management</span>
        </nav>
      </header>
      
      {/* Top Action Bar */}
      <div className="action-bar">
        <button className="add-button" onClick={onCreateExam}>
          Create Exam/Test
        </button>
        <input type="text" placeholder="Search exams..." className="search-input" />
      </div>
      
      {/* Exam List Container */}
      <div className="exam-list">
        {exams && exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam._id} className="exam-card">
              {/* Exam Entry Block */}
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
                <button onClick={() => onEditExam(exam)}>Edit Exam</button>
                <button onClick={() => onDeleteExam(exam._id)}>Delete Exam</button>
                <button onClick={() => onGradeExam(exam)}>Grade/Review</button>
              </div>
            </div>
          ))
        ) : (
          <p>No exams scheduled.</p>
        )}
      </div>
      
      {/* Optional Footer/Pagination */}
      <div className="pagination">
        {/* Pagination controls if needed */}
      </div>
    </div>
  );
};

export default ExamManagement;
