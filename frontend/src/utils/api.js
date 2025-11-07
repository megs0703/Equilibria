import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

export const userAPI = {
  updateProfile: (data) => api.put('/user/profile', data),
  updatePreferences: (data) => api.put('/user/preferences', data),
  getProteinRecommendation: (goal) => api.get(`/user/protein-recommendation?goal=${goal}`),
};

export const workoutAPI = {
  createPlan: (data) => api.post('/workout', data),
  getPlans: () => api.get('/workout'),
  getSuggestions: (goal) => api.get(`/workout/suggestions?goal=${goal}`),
};

export const nutritionAPI = {
  addMeal: (data) => api.post('/nutrition/meal', data),
  getTodayLog: () => api.get('/nutrition/today'),
  getHistory: (days) => api.get(`/nutrition/history?days=${days}`),
  getSuggestions: (mealType, goal) => api.get(`/nutrition/suggestions?mealType=${mealType}&goal=${goal}`),
};

export const waterAPI = {
  addIntake: (glasses) => api.post('/water/add', { glasses }),
  getTodayLog: () => api.get('/water/today'),
  getHistory: (days) => api.get(`/water/history?days=${days}`),
};

export const progressAPI = {
  addEntry: (data) => api.post('/progress', data),
  getHistory: (days) => api.get(`/progress?days=${days}`),
  getAnalytics: () => api.get('/progress/analytics'),
};

export const socialAPI = {
  createPost: (data) => api.post('/social/posts', data),
  getFeed: (page, limit) => api.get(`/social/feed?page=${page}&limit=${limit}`),
  likePost: (postId) => api.post(`/social/posts/${postId}/like`),
  addComment: (postId, content) => api.post(`/social/posts/${postId}/comment`, { content }),
  getMyPosts: () => api.get('/social/posts/my'),
};

export default api;