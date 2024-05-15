// src/utils/axiosInterceptor.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api', // Set base URL for API requests
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');

      // Add authorization header if token is available
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("fdfdfdfdf",error)
      // Handle error responses here
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error, e.g., redirect to login page
        localStorage.clear();
        window.location.href = '/login'
      }

      return Promise.reject(error);
    }
  );

export default axiosInstance;