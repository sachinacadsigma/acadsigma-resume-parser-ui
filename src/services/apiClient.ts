import axios from 'axios';
import { API_URL } from '../utils/constants';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

type DecodedToken = {
  exp?: number;
};

const getToken = () => {
  return localStorage.getItem('token');
};

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // If no exp claim, consider invalid
    if (!decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = decoded.exp - currentTime;

    const expired = timeRemaining <= 0;

    if (import.meta.env.MODE === 'development') {
      console.log('🔑 Token expired:', expired);
      console.log('⏳ Time remaining (s):', timeRemaining);
    }

    return expired;
  } catch {
    // Invalid token format
    return true;
  }
};

const apiClient = axios.create({
  baseURL: API_URL || 'https://acadsigma-resume-parser.azurewebsites.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      if (isTokenExpired(token)) {
        toast.error('Login expired!');
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default apiClient;
