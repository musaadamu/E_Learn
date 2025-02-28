import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css"; // Customize with your styles

const CourseCard = ({ course, onEdit, onDelete }) => {
  return (
    <div className="admin-course-card">
      {/* Header Block */}
      <div className="card-header">
        <h2>{course.name}</h2>
      </div>

      {/* Details Block */}
      <div className="card-details">
        <p>Credits: {course.credits}</p>
        <p>Department: {course.departmentName || "Unknown"}</p>
        {course.description && <p>{course.description}</p>}
        {course.prerequisites && course.prerequisites.length > 0 && (
          <p>Prerequisites: {course.prerequisites.join(", ")}</p>
        )}
      </div>

      {/* Action Buttons Block */}
      <div className="card-actions">
        <button onClick={() => onEdit(course)}>Edit Course</button>
        <button onClick={() => onDelete(course._id)}>Delete Course</button>
        <Link to={`/admin/course/${course._id}`} className="manage-link">
          Manage Enrollments/Modules
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
