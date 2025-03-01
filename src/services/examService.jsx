import axios from "axios";
import './examService.css'

const apiUrl =  process.env.REACT_APP_API_URL  || "http://localhost:5000";

export const createExam = async (examData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/exam`, examData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getExams = async (filters = {}) => {
  try {
    const response = await axios.get(`${apiUrl}/api/exam`, { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateExam = async (id, updateData) => {
  try {
    const response = await axios.patch(`${apiUrl}/api/exam/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteExam = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/exam/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const gradeExam = async (id, gradingData) => {
  try {
    const response = await axios.patch(`${apiUrl}/api/exam/${id}/grade`, gradingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
