import axios from "axios";
import { store } from "../Store/store"; // Import Redux Store


const API_URL = "https://smartenrol2.azurewebsites.net/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛠️ Interceptor để tự động đính kèm token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; // Lấy token từ Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
