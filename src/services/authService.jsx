import axios from "axios";
import './authService.css';
// import.meta.env.REACT_APP_API_URL  || 
const apiUrl = "http://localhost:5000";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
    // Store the token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = () => {
  // In a JWT system, logout is typically handled client-side.
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Optional: Validate and decode a JWT token
export const tokenValidation = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/token-validation`, { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Function to get the current user data
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Add token to axios headers for authenticated requests
export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};