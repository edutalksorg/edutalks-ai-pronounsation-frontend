// src/lib/api/axiosClient.ts
import axios, { AxiosRequestHeaders } from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ Use backend base URL from .env
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// 🔐 Attach token automatically (if exists)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token") || localStorage.getItem("token");
  if (token) {
    const headers: AxiosRequestHeaders = (config.headers ?? {}) as AxiosRequestHeaders;
    headers.Authorization = `Bearer ${token}`;
    config.headers = headers;
  }
  return config;
});

export default axiosClient;
