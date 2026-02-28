import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Axios interceptor to add JWT token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: async (email, password) => {
        // For now, returning mock data until backend is ready
        // const response = await api.post('/auth/login', { email, password });
        // return response.data;
        return new Promise((resolve) =>
            setTimeout(() => resolve({ token: 'mock-jwt-token', user: { id: 1, name: 'Test User', email } }), 500)
        );
    },
    register: async (name, email, password) => {
        // const response = await api.post('/auth/register', { name, email, password });
        // return response.data;
        return new Promise((resolve) =>
            setTimeout(() => resolve({ token: 'mock-jwt-token', user: { id: 1, name, email } }), 500)
        );
    }
};

export default api;
