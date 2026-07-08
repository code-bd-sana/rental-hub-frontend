import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // For refresh tokens in cookies if needed
});

// Request interceptor to inject access token
apiClient.interceptors.request.use(
  (config) => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const authDataString = localStorage.getItem('roamly_auth');
      if (authDataString) {
        try {
          const authData = JSON.parse(authDataString);
          if (authData?.accessToken) {
            config.headers.Authorization = `Bearer ${authData.accessToken}`;
          }
        } catch (error) {
          console.error('Failed to parse auth data', error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling global errors like 401s
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic for 401 Unauthorized (e.g., redirect to login or clear auth)
      if (typeof window !== 'undefined') {
        // Only clear and redirect if we aren't already on the login/signup page
        const pathname = window.location.pathname;
        if (!pathname.includes('/login') && !pathname.includes('/signup')) {
          localStorage.removeItem('roamly_auth');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
