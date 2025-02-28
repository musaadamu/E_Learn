import React, { useState, useEffect } from "react";
import "./Grades.css"; // Ensure you add appropriate styling

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate an API call to fetch grades data
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // Replace with your API call (e.g., using axios or fetch)
        // For now, we use dummy data:
        const dummyGrades = [
          { id: 1, course: "Introduction to Computer Science", grade: "A", credits: 3 },
          { id: 2, course: "Data Structures", grade: "B+", credits: 4 },
          { id: 3, course: "Algorithms", grade: "A-", credits: 3 },
          { id: 4, course: "Operating Systems", grade: "B", credits: 3 },
        ];
        // Simulate network delay
        setTimeout(() => {
          setGrades(dummyGrades);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch grades.");
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  if (loading) {
    return <div className="grades-loading">Loading grades...</div>;
  }

  if (error) {
    return <div className="grades-error">Error: {error}</div>;
  }

  return (
    <div className="student-grades">
      <h1>My Grades</h1>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Grade</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item) => (
            <tr key={item.id}>
              <td>{item.course}</td>
              <td>{item.grade}</td>
              <td>{item.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cgpa-summary">
        <p><strong>Overall CGPA:</strong> 3.75</p>
      </div>
    </div>
  );
};

export default Grades;
