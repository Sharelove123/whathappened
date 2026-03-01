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

export const chatService = {
    fetchChats: async () => {
        const response = await api.get('/chat');
        return response.data;
    },
    accessChat: async (userId) => {
        const response = await api.post('/chat', { userId });
        return response.data;
    },
    createGroupChat: async (name, users) => {
        const response = await api.post('/chat/group', { name, users: JSON.stringify(users.map(u => u._id)) });
        return response.data;
    },
    renameGroup: async (chatId, chatName) => {
        const response = await api.put('/chat/rename', { chatId, chatName });
        return response.data;
    },
    addToGroup: async (chatId, userId) => {
        const response = await api.put('/chat/groupadd', { chatId, userId });
        return response.data;
    },
    removeFromGroup: async (chatId, userId) => {
        const response = await api.put('/chat/groupremove', { chatId, userId });
        return response.data;
    },
};

export const messageService = {
    fetchMessages: async (chatId) => {
        const response = await api.get(`/message/${chatId}`);
        return response.data;
    },
    sendMessage: async (content, chatId) => {
        const response = await api.post('/message', { content, chatId });
        return response.data;
    },
};

export default api;
