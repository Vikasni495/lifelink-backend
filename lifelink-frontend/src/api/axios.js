import axios from "axios";

// Use the hosted backend URL for deployed testing
const API_BASE_URL = "https://lifelink-backend-1.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token from localStorage on each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
