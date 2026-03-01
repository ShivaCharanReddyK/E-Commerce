import axios from 'axios';

/**
 * Axios Instance
 * This is like a "messenger" that talks to our backend
 * It automatically adds the auth token to every request
 */
const api = axios.create({
    baseURL: '/api', // Vite proxy will forward this to http://localhost:5000/api
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to every request automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
