import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
import Home from './pages2/Home';
import About from './pages2/About';
import Contact from './pages2/Contact';
import FAQ from './pages2/FAQ';

// Auth Pages
import Login from './pages2/Auth/Login';
import Register from './pages2/Auth/Register';
import ForgotPassword from './pages2/Auth/ForgotPassword';

// Admin Pages
import AdminDashboard from './pages2/Admin/Dashboard';
import FacultyManagement from './pages2/Admin/FacultyManagement';
import DepartmentManagement from './pages2/Admin/DepartmentManagement';
import CourseManagement from './pages2/Admin/CourseManagement';
import StudentManagement from './pages2/Admin/StudentManagement';
import ExamManagement from './pages2/Admin/ExamManagement';
import Reports from './pages2/Admin/Reports';

// Faculty Pages
import FacultyDashboard from './pages2/Faculty/Dashboard';
import FacultyMyCourses from './pages2/Faculty/MyCourses';
import FacultyCourseDetail from './pages2/Faculty/CourseDetail';
import FacultyProfile from './pages2/Faculty/Profile';

// Student Pages
import StudentDashboard from './pages2/Student/Dashboard';
import StudentMyCourses from './pages2/Student/MyCourses';
import StudentCourseDetail from './pages2/Student/CourseDetail';
import StudentProfile from './pages2/Student/Profile';

const RoutesComponent = () => {
  return (
    <Router>
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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/faculty-management" element={<FacultyManagement />} />
        <Route path="/admin/department-management" element={<DepartmentManagement />} />
        <Route path="/admin/course-management" element={<CourseManagement />} />
        <Route path="/admin/student-management" element={<StudentManagement />} />
        <Route path="/admin/exam-management" element={<ExamManagement />} />
        <Route path="/admin/reports" element={<Reports />} />

        {/* Faculty Routes */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/mycourses" element={<FacultyMyCourses />} />
        <Route path="/faculty/course/:id" element={<FacultyCourseDetail />} />
        <Route path="/faculty/profile" element={<FacultyProfile />} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/mycourses" element={<StudentMyCourses />} />
        <Route path="/student/course/:id" element={<StudentCourseDetail />} />
        <Route path="/student/profile" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
