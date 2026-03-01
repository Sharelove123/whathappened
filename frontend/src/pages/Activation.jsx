import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Activation() {
    const { token } = useParams();
    const { activate } = useAuth();
    const navigate = useNavigate();

    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [message, setMessage] = useState('Verifying your account...');

    useEffect(() => {
        const activateAccount = async () => {
            if (!token) {
                setStatus('error');
                setMessage('Invalid activation token.');
                return;
            }
            try {
                await activate(token);
                setStatus('success');
                setMessage('Account activated successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } catch (err) {
                setStatus('error');
                setMessage(err?.response?.data?.message || 'Failed to activate account. The token may be invalid or expired.');
            }
        };

        activateAccount();
    }, [token, activate, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-900">
            {/* Background Decor */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

            <div className="w-full max-w-md relative z-10 text-center glass-panel rounded-2xl p-8">
                {status === 'loading' && (
                    <div className="animate-pulse">
                        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-purple-500 border-b-indigo-500 border-l-indigo-500 rounded-full animate-rotate mx-auto mb-6"></div>
                        <h2 className="text-xl font-bold text-white">{message}</h2>
                    </div>
                )}
                {status === 'success' && (
                    <div>
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-white mb-2">{message}</h2>
                    </div>
                )}
                {status === 'error' && (
                    <div>
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-white mb-4">Activation Failed</h2>
                        <p className="text-slate-400 mb-6">{message}</p>
                        <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                            Try signing up again
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
