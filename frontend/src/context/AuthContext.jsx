import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await authService.getMe();
                if (data.success) setUser(data.user);
            } catch (err) {
                console.error("Not authenticated");
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setUser(data.user);
    };

    const register = async (name, email, password, avatar) => {
        const data = await authService.register(name, email, password, avatar);
        return data; // Registration requires activation step
    };

    const activate = async (token) => {
        const data = await authService.activate(token);
        setUser(data.user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, activate, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
