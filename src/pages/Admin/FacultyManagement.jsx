import React, { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import AdminFacultyCard from "../../components/Admin/FacultyCard";
import "./FacultyManagement.css";

const FacultyManagement = () => {
  const [faculties, setFaculties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Replace with API call to fetch faculties
    setFaculties([
      { _id: "1", name: "Faculty of Science", description: "Focuses on research and innovation.", departments: [/* ... */] },
      { _id: "2", name: "Faculty of Arts", description: "Creative arts and humanities.", departments: [] },
    ]);
  }, []);

  const handleEdit = (faculty) => {
    console.log("Edit faculty", faculty);
  };

  const handleDelete = (id) => {
    console.log("Delete faculty", id);
    setFaculties(faculties.filter(f => f._id !== id));
  };

  const filteredFaculties = faculties.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faculty-management-page">
      <Header />
      <Navigation />
      <div className="page-header">
        <h1>Faculty Management</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span>Faculty Management</span>
        </nav>
      </div>
      {/* Action Bar */}
      <div className="action-bar">
        <button className="add-button">Add Faculty</button>
        <input
          type="text"
          placeholder="Search faculties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Faculty List Container */}
      <section className="faculty-list-container">
        {filteredFaculties.map((faculty) => (
          <AdminFacultyCard
            key={faculty._id}
            faculty={faculty}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </section>
      {/* Pagination/Navigation Controls (Optional) */}
      <Footer />
    </div>
  );
};

export default FacultyManagement;
