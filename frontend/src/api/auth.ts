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

export interface GoogleLoginResponse {
    message: string;
  id_token: string;
}

// Auth API endpoints
export const authAPI = {
  loginWithGoogle: () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? window.location.origin;
      window.location.href = `${baseUrl}/auth/login`;
    } catch (error) {
      console.error("Failed to start Google login:", error);
    }
  },

  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/account/me');
      console.log('Profile response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get profile:', error);
      throw error;
    }
  },

  updateProfile: async (userData: Partial<Pick<User, 'name' | 'email'>>): Promise<User> => {
    try {
      const response = await api.put<User>(`/account/update?name=${userData.name}&email=${userData.email}`);
      return response.data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },

  deleteProfile: async (): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>('/account/delete');
      
      localStorage.removeItem('access_token');
      
      return response.data;
    } catch (error) {
      console.error('Failed to delete profile:', error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
      
      localStorage.removeItem('access_token');
    } catch (error) {
      console.error('Logout failed:', error);
      
      localStorage.removeItem('access_token');
    }
  },


  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  getToken: (): string | null => {
    return localStorage.getItem('access_token');
  },

  setToken: (token: string): void => {
    localStorage.setItem('access_token', token);
  },

  clearAuth: (): void => {
    localStorage.removeItem('access_token');
  }
};

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

export default authAPI;