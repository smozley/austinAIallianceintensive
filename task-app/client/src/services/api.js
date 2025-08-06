import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    const customError = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };

    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      customError.message = 'Request timed out. Please try again.';
    } else if (error.code === 'ERR_NETWORK') {
      customError.message = 'Network error. Please check your connection and ensure the server is running.';
    } else if (error.response?.status >= 500) {
      customError.message = 'Server error. Please try again later.';
    }

    console.error('API Error:', customError);
    return Promise.reject(customError);
  }
);

export const taskAPI = {
  // Get all tasks
  getAllTasks: () => api.get('/tasks'),
  
  // Get single task
  getTask: (id) => {
    if (!id) throw new Error('Task ID is required');
    return api.get(`/tasks/${id}`);
  },
  
  // Create new task
  createTask: (taskData) => {
    if (!taskData || !taskData.title?.trim()) {
      throw new Error('Task title is required');
    }
    return api.post('/tasks', {
      title: taskData.title.trim(),
      description: taskData.description?.trim() || null,
    });
  },
  
  // Update task
  updateTask: (id, taskData) => {
    if (!id) throw new Error('Task ID is required');
    if (!taskData) throw new Error('Task data is required');
    
    const cleanData = {};
    if (taskData.title !== undefined) cleanData.title = taskData.title?.trim();
    if (taskData.description !== undefined) cleanData.description = taskData.description?.trim();
    if (taskData.completed !== undefined) cleanData.completed = Boolean(taskData.completed);
    
    return api.put(`/tasks/${id}`, cleanData);
  },
  
  // Delete task
  deleteTask: (id) => {
    if (!id) throw new Error('Task ID is required');
    return api.delete(`/tasks/${id}`);
  },
  
  // Health check
  healthCheck: () => api.get('/health'),
};

export default api;