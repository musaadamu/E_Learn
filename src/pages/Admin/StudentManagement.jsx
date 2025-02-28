import React, { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import AdminStudentCard from "../../components/Admin/StudentCard";
import "./StudentManagement.css";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Replace with API call to fetch students
    setStudents([
      {
        _id: "s1",
        fullName: "John Doe",
        studentId: "2023001",
        department: "Computer Science",
        status: "Active",
        cgpa: 3.75,
      },
      {
        _id: "s2",
        fullName: "Jane Smith",
        studentId: "2023002",
        department: "Mathematics",
        status: "Active",
        cgpa: 3.90,
      },
    ]);
  }, []);

  const handleEdit = (student) => {
    console.log("Edit student", student);
  };

  const handleDelete = (id) => {
    console.log("Delete student", id);
    setStudents(students.filter(student => student._id !== id));
  };

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-management-page">
      <Header />
      <Navigation />
      <div className="page-header">
        <h1>Student Management</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span>Student Management</span>
        </nav>
      </div>
      {/* Action Bar */}
      <div className="action-bar">
        <button className="add-button">Add Student</button>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Student List Container */}
      <section className="student-list-container">
        {filteredStudents.map((student) => (
          <AdminStudentCard
            key={student._id}
            student={student}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default StudentManagement;
