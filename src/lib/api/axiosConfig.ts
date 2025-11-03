import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://edutalks-backend.victoriousmushroom-a657dec3.centralindia.azurecontainerapps.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
