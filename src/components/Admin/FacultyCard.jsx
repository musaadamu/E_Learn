import React from "react";
import { Link } from "react-router-dom";
import "./FacultyCard.css"; // Customize with your styles

const FacultyCard = ({ faculty, onEdit, onDelete }) => {
  return (
    <div className="admin-faculty-card">
      {/* Header Block */}
      <div className="card-header">
        <h2>{faculty.name}</h2>
      </div>

      {/* Details Block */}
      <div className="card-details">
        {faculty.description && <p>{faculty.description}</p>}
        {faculty.departments && (
          <p>Departments: {faculty.departments.length}</p>
        )}
      </div>

      {/* Action Buttons Block */}
      <div className="card-actions">
        <button onClick={() => onEdit(faculty)}>Edit Faculty</button>
        <button onClick={() => onDelete(faculty._id)}>Delete Faculty</button>
        <Link to={`/admin/department/${faculty._id}`} className="manage-link">
          Manage Departments
        </Link>
      </div>
    </div>
  );
};

export default FacultyCard;
