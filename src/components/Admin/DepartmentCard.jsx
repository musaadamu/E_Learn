import React from "react";
import { Link } from "react-router-dom";
import "./DepartmentCard.css"; // Customize with your styles

const DepartmentCard = ({ department, onEdit, onDelete }) => {
  return (
    <div className="admin-department-card">
      {/* Header Block */}
      <div className="card-header">
        <h2>{department.name}</h2>
      </div>

      {/* Information Block */}
      <div className="card-info">
        <p>Faculty: {department.facultyName || "Unknown Faculty"}</p>
        {department.description && <p>{department.description}</p>}
        {department.courseCount && <p>Courses: {department.courseCount}</p>}
      </div>

      {/* Action Buttons Block */}
      <div className="card-actions">
        <button onClick={() => onEdit(department)}>Edit Department</button>
        <button onClick={() => onDelete(department._id)}>Delete Department</button>
        <Link
          to={`/admin/course-management?department=${department._id}`}
          className="manage-link"
        >
          Manage Courses
        </Link>
      </div>
    </div>
  );
};

export default DepartmentCard;
