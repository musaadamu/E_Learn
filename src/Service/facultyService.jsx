import axios from "axios";
import './facultyService.css';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const createFaculty = async (facultyData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/faculty`, facultyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getFaculties = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/faculty`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateFaculty = async (id, updateData) => {
  try {
    const response = await axios.patch(`${apiUrl}/api/faculty/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteFaculty = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/faculty/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
