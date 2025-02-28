import axios from "axios";
import './studentService.css';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/student`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getStudents = async (filters = {}) => {
  try {
    const response = await axios.get(`${apiUrl}/api/student`, { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateStudent = async (id, updateData) => {
  try {
    const response = await axios.patch(`${apiUrl}/api/student/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/student/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
