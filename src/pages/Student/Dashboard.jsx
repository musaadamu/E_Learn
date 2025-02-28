import React from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./Dashboard.css"; // Optional: custom CSS for the dashboard

const Dashboard = () => {
  // Example static data; replace with dynamic data as needed.
  const summaryMetrics = [
    { label: "Current Courses", value: 5 },
    { label: "Upcoming Assignments", value: 3 },
    { label: "Upcoming Exams", value: 2 },
    { label: "Overall CGPA", value: 3.85 },
  ];

  const dashboardCards = [
    { title: "My Courses", description: "View all your enrolled courses", link: "/student/mycourses" },
    { title: "Grades", description: "Check your academic performance", link: "/student/profile" },
    { title: "Announcements", description: "Latest updates from your courses", link: "/student/announcements" },
    { title: "Messages", description: "View your messages", link: "/student/messaging" },
  ];

  return (
    <div className="student-dashboard">
      {/* Header & Navigation Block */}
      <Header />
      <Navigation />

      {/* Optional Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> / <span>Dashboard</span>
      </div>

      {/* Welcome & Overview Section */}
      <section className="overview-section">
        <h1>Welcome, [Student Name]</h1>
        <div className="metrics-cards">
          {summaryMetrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <h3>{metric.label}</h3>
              <p>{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Area: Dashboard Cards */}
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

      {/* Footer Block */}
      <Footer />
    </div>
  );
};

export default Dashboard;
