import React from "react";
import { Link } from "react-router-dom";
import "./StudentCard.css"; // Customize with your styles

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="admin-student-card">
      {/* Header Block */}
      <div className="card-header">
        <h2>{student.fullName}</h2>
      </div>

      {/* Details Block */}
      <div className="card-details">
        <p>ID: {student.studentId}</p>
        <p>Department: {student.department || "N/A"}</p>
        <p>Enrollment: {student.status}</p>
        {student.cgpa && <p>CGPA: {student.cgpa}</p>}
      </div>

      {/* Action Buttons Block */}
      <div className="card-actions">
        <button onClick={() => onEdit(student)}>Edit Student</button>
        <button onClick={() => onDelete(student._id)}>Delete Student</button>
        <Link to={`/admin/student/${student._id}`} className="manage-link">
          View Profile / Manage Grades
        </Link>
      </div>
    </div>
  );
};

export default StudentCard;
