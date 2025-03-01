import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth Context and Provider
import { AuthProvider, AuthContext } from "./components/Auth/AuthContext";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import FacultyManagement from "./pages/Admin/FacultyManagement";
import DepartmentManagement from "./pages/Admin/DepartmentManagement";
import CourseManagement from "./pages/Admin/CourseManagement";
import StudentManagement from "./pages/Admin/StudentManagement";
import ExamManagement from "./pages/Admin/ExamManagement";
import Reports from "./pages/Admin/Reports";

// Faculty Pages
import FacultyDashboard from "./pages/Faculty/Dashboard";
import FacultyMyCourses from "./pages/Faculty/MyCourses";
import FacultyCourseDetail from "./pages/Faculty/CourseDetail";
import FacultyProfile from "./pages/Faculty/Profile";

// Student Pages
import StudentDashboard from "./pages/Student/Dashboard";
import StudentMyCourses from "./pages/Student/MyCourses";
import StudentCourseDetail from "./pages/Student/CourseDetail";
import StudentProfile from "./pages/Student/Profile";

// Common Components
import Header from "./components/Common/Header"; // Header includes navigation
import Footer from "./components/Common/Footer";
import Sidebar from "./components/Common/Sidebar";
import Navigation from "./components/Common/Navigation"

// Not Found Page
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authenticated, user } = useContext(AuthContext);
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

function App() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          {/* Sidebar Toggle Button (visible on mobile) */}
          <button 
            className="sidebar-toggle" 
            onClick={toggleSidebar} 
            aria-label="Toggle sidebar"
          >
            {sidebarActive ? "✕" : "☰"}
          </button>

          {/* Sidebar */}
          {sidebarActive && (
            <div className="sidebar-wrapper">
              <Sidebar />
            </div>
          )}

          {/* Header (includes primary navigation) */}
          <Navigation />

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/faculty" element={<ProtectedRoute allowedRoles={["admin"]}><FacultyManagement /></ProtectedRoute>} />
              <Route path="/admin/departments" element={<ProtectedRoute allowedRoles={["admin"]}><DepartmentManagement /></ProtectedRoute>} />
              <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={["admin"]}><CourseManagement /></ProtectedRoute>} />
              <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><StudentManagement /></ProtectedRoute>} />
              <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={["admin"]}><ExamManagement /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["admin"]}><Reports /></ProtectedRoute>} />

              {/* Faculty Routes */}
              <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyDashboard /></ProtectedRoute>} />
              <Route path="/faculty/mycourses" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyMyCourses /></ProtectedRoute>} />
              <Route path="/faculty/course/:id" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyCourseDetail /></ProtectedRoute>} />
              <Route path="/faculty/profile" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyProfile /></ProtectedRoute>} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
              <Route path="/student/mycourses" element={<ProtectedRoute allowedRoles={["student"]}><StudentMyCourses /></ProtectedRoute>} />
              <Route path="/student/course/:id" element={<ProtectedRoute allowedRoles={["student"]}><StudentCourseDetail /></ProtectedRoute>} />
              <Route path="/student/profile" element={<ProtectedRoute allowedRoles={["student"]}><StudentProfile /></ProtectedRoute>} />

              {/* Fallback Routes */}
              <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
