import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Grid & Glows */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(var(--color-primary-rgb), 0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

                    <div className="flex flex-col items-center mb-10 text-center">
                        <div className="size-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center pt-2 mb-6 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.3)]">
                            <Logo className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Datyrix</h1>
                        <p className="text-slate-400 text-sm">Automated Data Orchestration System</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-bold text-center">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Network Credential</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">person</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#0F172A]/80 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between font-bold text-xs uppercase tracking-widest mb-2">
                                <label className="text-slate-400">Access Key</label>
                                <a href="#" className="text-primary hover:underline">Lost Key?</a>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">lock</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0F172A]/80 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm tracking-widest"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-[#0F172A] font-black py-4 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-4"
                        >
                            {isLoading ? (
                                <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                            ) : (
                                <>
                                    <span>Initialize Connection</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-800 pt-6">
                        <p className="text-sm text-slate-400">
                            New to the grid?{' '}
                            <Link to="/signup" className="text-primary hover:underline font-bold">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
