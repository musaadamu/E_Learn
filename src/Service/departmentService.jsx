import axios from "axios";
import './departmentService.css'
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const createDepartment = async (deptData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/department`, deptData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDepartments = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/department`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateDepartment = async (id, updateData) => {
  try {
    const response = await axios.patch(`${apiUrl}/api/department/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/department/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
