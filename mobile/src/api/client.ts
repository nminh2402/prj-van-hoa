import axios from 'axios';
import { Platform } from 'react-native';

// Khi chạy Android Emulator, localhost của máy host là 10.0.2.2. Trên iOS Simulator là localhost.
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:5000/api/v1',
  ios: 'http://localhost:5000/api/v1',
  default: 'http://localhost:5000/api/v1',
});

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor log & xử lý token
apiClient.interceptors.request.use(
  async config => {
    // Có thể gắn token Firebase Auth tại đây
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);
