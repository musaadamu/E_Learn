import axios from "axios";
import './courseService.css';

const apiUrl =  process.env.REACT_APP_API_URL  || "http://localhost:5000";

export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/course`, courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCourses = async (filters = {}) => {
  try {
    const response = await axios.get(`${apiUrl}/api/course`, { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateCourse = async (id, updateData) => {
  try {
    const response = await axios.patch(`${apiUrl}/api/course/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/course/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
