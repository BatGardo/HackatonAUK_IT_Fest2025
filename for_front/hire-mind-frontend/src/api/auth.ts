import api, { type ApiResponse } from './axios';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  access_token?: string;
  message: string;
}

export interface ProfileResponse {
  user: User;
}

export interface GoogleLoginResponse {
    message: string;
  id_token: string;
}

// Auth API endpoints
export const authAPI = {
  loginWithGoogle: async () => {
    try {
        const response = await api.get<ApiResponse<GoogleLoginResponse>>('/auth/login');
        localStorage.setItem('access_token', response.data.data.id_token);
    } catch (error) {
        console.error('Failed to login with Google:', error);
    }
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get<ApiResponse<ProfileResponse>>('/auth/profile');
      return response.data.data.user;
    } catch (error) {
      console.error('Failed to get profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<Pick<User, 'name' | 'email'>>): Promise<User> => {
    try {
      const response = await api.put<ApiResponse<ProfileResponse>>('/auth/profile', userData);
      return response.data.data.user;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },

  // Delete user profile
  deleteProfile: async (): Promise<{ message: string }> => {
    try {
      const response = await api.delete<ApiResponse<{ message: string }>>('/auth/profile');
      
      // Clear local storage on successful deletion
      localStorage.removeItem('access_token');
      
      return response.data.data;
    } catch (error) {
      console.error('Failed to delete profile:', error);
      throw error;
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('access_token');
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Even if logout fails, clear local data and redirect
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  // Get stored token
  getToken: (): string | null => {
    return localStorage.getItem('access_token');
  },

  // Set token (used after successful login)
  setToken: (token: string): void => {
    localStorage.setItem('access_token', token);
  },

  // Clear authentication data
  clearAuth: (): void => {
    localStorage.removeItem('access_token');
  }
};

// Export individual functions for easier importing
export const {
  loginWithGoogle,
  getProfile,
  updateProfile,
  deleteProfile,
  logout,
  isAuthenticated,
  getToken,
  setToken,
  clearAuth
} = authAPI;

// Default export
export default authAPI;