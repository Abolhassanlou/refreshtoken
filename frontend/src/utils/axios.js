import axios from 'axios';
import router from '../router';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
});

// Add Authorization header dynamically for each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Function to refresh the token before expiration
const refreshAccessTokenBeforeExpiry = () => {
  const expirationTime = localStorage.getItem('access_token_expiration');
  const currentTime = Date.now();
  const timeRemaining = expirationTime - currentTime;

  // Refresh token if it's within 1 minute of expiration (threshold can be adjusted)
  if (timeRemaining <= 60000) {  // Refresh 1 minute before expiration
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (refreshToken) {
      axios.post('http://127.0.0.1:8000/auth/refresh', { refresh_token: refreshToken })
        .then(response => {
          const { access_token, refresh_token: newRefreshToken, expires_in } = response.data;
          
          // Store new tokens
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', newRefreshToken);
          
          // Convert expires_in (seconds) to a timestamp
          const expirationTimestamp = Date.now() + expires_in * 1000;
          localStorage.setItem('access_token_expiration', expirationTimestamp);
          
          // Update axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        })
        .catch(refreshError => {
          console.error('Token refresh failed:', refreshError);
        });
    }
  }
};

// Check token expiration periodically (for example every 30 seconds)
setInterval(refreshAccessTokenBeforeExpiry, 30000); // Check every 30 seconds

// Response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/auth/refresh', { refresh_token: refreshToken });

          const { access_token, refresh_token: newRefreshToken, expires_in } = response.data;

          // Store new tokens
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', newRefreshToken);

          // Convert expires_in (seconds) to a timestamp
          const expirationTimestamp = Date.now() + expires_in * 1000;
          localStorage.setItem('access_token_expiration', expirationTimestamp);

          // Update axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }

      // Clear storage and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token_expiration');
      router.push('/login');
    }

    return Promise.reject(error);
  }
);

export default api;
