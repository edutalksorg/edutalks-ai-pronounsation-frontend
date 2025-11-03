// src/lib/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_BASE_URL ||
    "https://edutalks-backend.victoriousmushroom-a657dec3.centralindia.azurecontainerapps.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

//  Automatically attach Bearer token from localStorage
axiosClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("edulearn_access_token") ||
      localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handler (optional: handle 401 refresh later)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized. Token may have expired.");
      // Optional: clear token or trigger re-login here
      // localStorage.removeItem("edulearn_access_token");
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
