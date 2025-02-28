import axios from "axios";
import './reportService.css';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const generateStudentReport = async (studentId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/report/student/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const generateFacultyReport = async (facultyId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/report/faculty/${facultyId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const computeCGPA = async (studentId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/report/cgpa/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const exportReport = async (reportData, format = "PDF") => {
  try {
    const response = await axios.post(`${apiUrl}/api/report/export`, { reportData, format });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
