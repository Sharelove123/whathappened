import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex items-center">
                            <span className="font-bold text-xl text-blue-600">WhatHappened</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
                        <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
