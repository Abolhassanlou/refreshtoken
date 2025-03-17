import { defineStore } from 'pinia';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Update this with your API URL
});

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    expiresIn: localStorage.getItem('expiresIn') || null,
    tokenType: localStorage.getItem('tokenType') || null,
    role: localStorage.getItem('role') || null,
  }),

  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User set:', user);
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
      console.log('Access Token set:', accessToken);
    },
    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
      localStorage.setItem('refreshToken', refreshToken);
      console.log('Refresh Token set:', refreshToken);
    },
    setExpiresIn(expiresIn) {
      this.expiresIn = expiresIn;
      localStorage.setItem('expiresIn', expiresIn);
      console.log('Expires In set:', expiresIn);
    },
    setTokenType(tokenType) {
      this.tokenType = tokenType;
      localStorage.setItem('tokenType', tokenType);
      console.log('Token Type set:', tokenType);
    },
    setRole(role) {
      this.role = role;
      localStorage.setItem('role', role);
      console.log('Role set:', role);
    },
    clearUser() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.expiresIn = null;
      this.tokenType = null;
      this.role = null;

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('tokenType');
      localStorage.removeItem('role');
      console.log('User cleared');
    },

    async fetchUser() {
      try {
        const currentTime = Date.now();
        if (this.expiresIn && currentTime >= this.expiresIn) {
          console.log('Token expired, refreshing token...');
          await this.refreshToken();
        }

        const response = await axiosInstance.get('/users/me', {
          headers: {
            Authorization: `${this.tokenType} ${this.accessToken}`,
          },
        });

        this.setUser(response.data);
        this.role = response.data.role;
        console.log('User fetched:', response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    },

    async refreshToken() {
      try {
        const response = await axiosInstance.post('/auth/refresh', {}, {
          headers: {
            Authorization: `Bearer ${this.refreshToken}`,
          },
        });

        this.setAccessToken(response.data.access_token);
        this.setExpiresIn(Date.now() + response.data.expires_in * 1000);
        this.setTokenType(response.data.token_type);
        this.setRefreshToken(response.data.refresh_token);
        console.log('Tokens refreshed:', response.data);
        return response.data.access_token;
      } catch (error) {
        console.error('Refresh token failed:', error);
        this.clearUser();
        window.location.href = '/login'; // Redirect to login page after token refresh failure
        throw error;
      }
    },

    logout() {
      this.clearUser();
      window.location.href = '/login';
    },
  },
});

// Set up Axios interceptor to handle token expiration globally
axiosInstance.interceptors.response.use(
  (response) => response, // If the request was successful, just return the response
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Flag to prevent infinite retry loop

      try {
        // Try to refresh the token
        await useUserStore().refreshToken();

        // Retry the original request after refreshing the token
        originalRequest.headers['Authorization'] = `Bearer ${useUserStore().accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        useUserStore().clearUser();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
