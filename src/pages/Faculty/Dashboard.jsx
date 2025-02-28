import React from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./Dashboard.css"; // Custom styles for Dashboard (optional)

const Dashboard = () => {
  // Example static summary metrics and dashboard shortcut cards
  const metrics = [
    { label: "My Courses", value: 8 },
    { label: "Announcements", value: 5 },
    { label: "Messages", value: 3 },
    { label: "Performance", value: "85%" },
  ];

  const dashboardCards = [
    { title: "Manage Courses", description: "Create, update, or delete your courses.", link: "/faculty/mycourses" },
    { title: "View Reports", description: "Check course performance and student progress.", link: "/faculty/reports" },
    { title: "Settings", description: "Update your profile and notification preferences.", link: "/faculty/profile" },
  ];

  return (
    <div className="faculty-dashboard">
      {/* Header & Navigation */}
      <Header />
      <Navigation />

      {/* Optional Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> / <span>Dashboard</span>
      </div>

      {/* Welcome & Overview Section */}
      <section className="overview-section">
        <h1>Welcome, Faculty Member</h1>
        <div className="metrics-cards">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <h3>{metric.label}</h3>
              <p>{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Dashboard Shortcut Cards */}
      <section className="dashboard-cards">
        {dashboardCards.map((card, index) => (
          <div key={index} className="dashboard-card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <a href={card.link} className="card-link">
              Go to {card.title}
            </a>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
