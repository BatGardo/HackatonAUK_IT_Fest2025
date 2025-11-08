import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: "https://hackatonauk-it-fest2025.onrender.com",
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // Include cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });

    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access denied');
    } else if (error.response?.status >= 500) {
      // Server errors
      console.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

export default api;

// Export types for API responses
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

// Helper functions for common API calls
export const apiHelpers = {
  // GET request
  get: <T>(url: string, params?: any) => 
    api.get<ApiResponse<T>>(url, { params }),
  
  // POST request
  post: <T>(url: string, data?: any) => 
    api.post<ApiResponse<T>>(url, data),
  
  // PUT request
  put: <T>(url: string, data?: any) => 
    api.put<ApiResponse<T>>(url, data),
  
  // DELETE request
  delete: <T>(url: string) => 
    api.delete<ApiResponse<T>>(url),
  
  // PATCH request
  patch: <T>(url: string, data?: any) => 
    api.patch<ApiResponse<T>>(url, data),
};