import React, { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import AdminDepartmentCard from "../../components/Admin/DepartmentCard";
import "./DepartmentManagement.css";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Replace with API call to fetch departments
    setDepartments([
      { _id: "d1", name: "Department of Arts", facultyName: "Faculty of Arts", description: "Covers visual and performing arts.", courseCount: 12 },
      { _id: "d2", name: "Department of Science", facultyName: "Faculty of Science", description: "Research in various sciences.", courseCount: 8 },
    ]);
  }, []);

  const handleEdit = (department) => {
    console.log("Edit department", department);
  };

  const handleDelete = (id) => {
    console.log("Delete department", id);
    setDepartments(departments.filter(dept => dept._id !== id));
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="department-management-page">
      <Header />
      <Navigation />
      <div className="page-header">
        <h1>Department Management</h1>
        <nav className="breadcrumb">
          <span>Home</span> / <span>Department Management</span>
        </nav>
      </div>
      {/* Action Bar */}
      <div className="action-bar">
        <button className="add-button">Add Department</button>
        <input
          type="text"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Department List Container */}
      <section className="department-list-container">
        {filteredDepartments.map((dept) => (
          <AdminDepartmentCard
            key={dept._id}
            department={dept}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default DepartmentManagement;
