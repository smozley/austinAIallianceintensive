import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  // Get all tasks
  getAllTasks: () => api.get('/tasks'),
  
  // Get single task
  getTask: (id) => api.get(`/tasks/${id}`),
  
  // Create new task
  createTask: (taskData) => api.post('/tasks', taskData),
  
  // Update task
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  
  // Delete task
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  
  // Health check
  healthCheck: () => api.get('/health'),
};

export default api;