// src/lib/api/axiosClient.ts
import axios from "axios";

// ✅ Always ends with /api/v1 so all modules (auth, topics, etc.) work directly
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080";

const axiosClient = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  headers: { "Content-Type": "application/json" },
});

// --- Attach bearer token if present ---
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("edulearn_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Refresh Token Logic ---
let isRefreshing = false;
let failedQueue: {
  resolve: (v?: any) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("edulearn_refresh_token");
        if (!refreshToken) throw new Error("No refresh token available");

        // ✅ Correct refresh token path includes /api/v1
        const response = await axios.post(
          `${API_BASE}/api/v1/auth/refresh-token`,
          { refreshToken }
        );

        const newAccessToken =
          response.data?.token || response.data?.accessToken;
        const newRefreshToken =
          response.data?.refreshToken || refreshToken;

        if (newAccessToken)
          localStorage.setItem("edulearn_access_token", newAccessToken);
        if (newRefreshToken)
          localStorage.setItem("edulearn_refresh_token", newRefreshToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("edulearn_access_token");
        localStorage.removeItem("edulearn_refresh_token");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
