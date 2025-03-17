import { defineStore } from 'pinia';
import api from '@/stores/axiosInstance'; // Import Axios instance

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    user: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/auth/login', {
          grant_type: 'password',
          username: email,
          password: password,
          client_id: 'string',
          client_secret: 'string',
        });

        // Store tokens
        this.accessToken = response.data.access_token;
        this.refreshToken = response.data.refresh_token;

        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },

    async logout() {
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
});
