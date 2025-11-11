import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const userAPI = {
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  updatePreferences: (preferences) => api.put('/user/preferences', preferences),
  getProteinRecommendation: (goal) => api.get(`/user/protein-recommendation?goal=${goal}`),
  changePassword: (passwordData) => api.put('/user/change-password', passwordData),
};

export default api;