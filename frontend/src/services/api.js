import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v2',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/user/login-user', { email, password });
        return response.data;
    },
    register: async (name, email, password, avatar) => {
        const response = await api.post('/user/create-user', { name, email, password, avatar });
        return response.data;
    },
    activate: async (activation_token) => {
        const response = await api.post('/user/activation', { activation_token });
        return response.data;
    },
    logout: async () => {
        const response = await api.get('/user/logout');
        return response.data;
    },
    getMe: async () => {
        const response = await api.get('/user/getuser');
        return response.data;
    }
};

export default api;
