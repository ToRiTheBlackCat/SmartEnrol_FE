import axios from "axios";
import { store } from "../Store/store"; // Import Redux Store


const API_URL = "https://smartenrol2.azurewebsites.net/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

// 🛠️ Interceptor để tự động đính kèm token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; // Lấy token từ Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Thêm headers cho CORS
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Log chi tiết lỗi
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
