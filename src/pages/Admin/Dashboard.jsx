import React from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Sidebar from "../../components/Common/Sidebar";
import Footer from "../../components/Common/Footer";
import "./Dashboard.css"; // Custom CSS for Dashboard

const Dashboard = () => {
  // Example dummy data for summary metrics and recent activity
  const metrics = [
    { label: "Faculties", value: 10 },
    { label: "Departments", value: 25 },
    { label: "Courses", value: 120 },
    { label: "Students", value: 1500 },
    { label: "Exams", value: 35 },
  ];

  const recentActivity = [
    "New Faculty added: Faculty of Science",
    "Exam scheduled: Mid-Term for CS101",
    "Department updated: Arts",
    "Course created: Advanced Mathematics",
  ];

  return (
    <div className="admin-dashboard">
      <Header />
      <Navigation />
      <Sidebar />

      <div className="dashboard-content">
        {/* Header/Title Block */}
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <nav className="breadcrumb">
            <span>Home</span> / <span>Dashboard</span>
          </nav>
        </div>

        {/* Quick Stats & Overview Section */}
        <section className="overview-section">
          <div className="metrics-cards">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <h3>{metric.label}</h3>
                <p>{metric.value}</p>
              </div>
            ))}
          </div>
          <div className="charts">
            <div className="chart-placeholder">[Enrollment Trend Chart]</div>
            <div className="chart-placeholder">[Performance Metrics Chart]</div>
          </div>
        </section>

        {/* Recent Activity/Updates Section */}
        <section className="activity-section">
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
