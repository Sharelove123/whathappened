import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, you would fetch the /me endpoint here to get user details
        if (token) {
            // Temporary mock user setup
            setUser({ id: 1, name: 'Test User' });
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };

    const register = async (name, email, password) => {
        const data = await authService.register(name, email, password);
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
