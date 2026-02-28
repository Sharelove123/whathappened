import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    if (isAuthPage) return null; // Clean auth pages

    return (
        <nav className="sticky top-0 z-50 w-full glass-panel border-b-0 border-x-0 rounded-none bg-slate-900/80">
            <div className="container mx-auto px-6">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
                                <span className="text-white font-bold text-lg leading-none">W</span>
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-slate-100">
                                WhatHappened
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                                <div className="flex items-center space-x-4 border-l border-slate-700 pl-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                                            <User size={16} className="text-slate-300" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-200">{user.name}</span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors group"
                                        title="Logout"
                                    >
                                        <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4 py-2"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
                                >
                                    Join Us
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
