import axios from "axios";

const API_BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔹 Interceptors: Thêm token vào request nếu có
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

// 🔹 Interceptors: Xử lý lỗi phản hồi từ API
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized - Redirecting to login...");
        localStorage.removeItem("access_token");
        window.location.href = "/login"; // 🔹 Chuyển hướng về trang đăng nhập
      }
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;