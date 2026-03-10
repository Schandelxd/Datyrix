import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
import Logo from './Logo';

const ApiManagement = () => {
    const { connections, addConnection, updateConnection, removeConnection } = useApi();
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApiId, setEditingApiId] = useState(null);
    const [modalForm, setModalForm] = useState({ name: '', endpoint: '', icon: 'api', color: 'primary' });
    const [toastMsg, setToastMsg] = useState('');

    const openModal = (api = null) => {
        if (api) {
            setEditingApiId(api.id);
            setModalForm({ name: api.name, endpoint: api.endpoint, icon: api.icon, color: api.color });
        } else {
            setEditingApiId(null);
            setModalForm({ name: '', endpoint: '', icon: 'api', color: 'primary' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingApiId(null);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editingApiId) {
            updateConnection(editingApiId, modalForm);
            showToast('API Connection updated successfully.');
        } else {
            addConnection(modalForm);
            showToast('New API Connection established.');
        }
        closeModal();
    };

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 3000);
    };

    const getColorClasses = (color) => {
        switch (color) {
            case 'emerald-500': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'red-500': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'purple-500': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'amber-400': return 'bg-amber-400/10 text-amber-500 border-amber-400/20';
            case 'rose-500': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            case 'primary':
            default: return 'bg-primary/10 text-primary border-primary/20';
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-bg-main text-slate-100 font-sans pb-20 lg:pb-0">
            {/* Top Navigation */}
            <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 bg-bg-main/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity">
                        <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg pt-1 border border-primary/40">
                            <Logo className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Datyrix</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Dashboard</Link>
                        <Link to="/api-management" className="text-primary text-sm font-medium border-b-2 border-primary pb-1">API Management</Link>
                        <Link to="/analytics" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Analytics</Link>
                        <Link to="/settings" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Settings</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                        <input className="bg-primary/5 border border-primary/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none w-64 text-slate-100 placeholder-slate-500" placeholder="Search streams..." type="text" />
                    </div>
                    <div className="size-10 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-slate-300">person</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">
                {/* Hero Header Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
                >
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">API Management</h1>
                        <p className="text-slate-400 max-w-md">Orchestrate your futuristic data streams and monitor real-time connectivity status across the grid.</p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)] border border-primary/60 bg-primary text-bg-main font-bold px-6 py-3 rounded-lg flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        Connect New API
                    </button>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                >
                    <div className="glass-card p-6 rounded-xl flex flex-col gap-2">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Throughput</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-100">1.2M</span>
                            <span className="text-emerald-400 text-sm font-medium flex items-center"><span className="material-symbols-outlined text-xs">trending_up</span> 12%</span>
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-xl flex flex-col gap-2">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Average Latency</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-100">42ms</span>
                            <span className="text-primary text-sm font-medium">-4ms</span>
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-xl flex flex-col gap-2 border-l-4 border-l-primary/50">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Stream Nodes</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-100">{connections.length} / 30</span>
                            <span className="text-slate-400 text-sm font-medium">{Math.floor((connections.length / 30) * 100)}% Load</span>
                        </div>
                    </div>
                </motion.div>

                {/* Active Connections List */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <div className="flex items-center justify-between px-2 mb-2">
                        <h2 className="text-xl font-bold text-slate-100">Active Connections</h2>
                        <span className="text-sm text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm animate-spin">sync</span> Refreshing in 5s...</span>
                    </div>

                    {connections.map((api) => (
                        <div key={api.id} className="glass-card rounded-xl p-5 group hover:bg-primary/10 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`size-12 rounded-lg flex items-center justify-center border ${getColorClasses(api.color)}`}>
                                        <span className="material-symbols-outlined">{api.icon}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-slate-100">{api.name}</h3>
                                            <div className={`size-2 rounded-full ${api.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></div>
                                        </div>
                                        <code className="text-xs text-primary/70">{api.endpoint}</code>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="hidden sm:block text-right">
                                        <p className="text-xs text-slate-500 uppercase font-bold">Latency</p>
                                        <p className={`text-sm font-medium ${api.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>{api.latency}</p>
                                    </div>
                                    <div className="hidden sm:block text-right">
                                        <p className="text-xs text-slate-500 uppercase font-bold">Uptime</p>
                                        <p className="text-sm font-medium text-slate-200">{api.uptime}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => openModal(api)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-slate-100 transition-colors">
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button
                                            onClick={() => removeConnection(api.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                                        >
                                            <span className="material-symbols-outlined">link_off</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {api.status === 'error' && (
                                <div className="mt-4 p-3 bg-red-500/5 rounded-lg border border-red-500/10 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-red-400 text-sm">warning</span>
                                    <p className="text-xs text-red-300">{api.errorMsg || 'Endpoint connection failed.'}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Placeholder Card for more */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 border-2 border-dashed border-primary/10 rounded-xl p-10 flex flex-col items-center justify-center text-slate-500 gap-4"
                >
                    <div className="size-12 rounded-full border border-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined">data_object</span>
                    </div>
                    <p className="text-sm">Ready to expand your neural network?</p>
                    <button onClick={() => showToast('Template Gallery modules loading...')} className="text-primary hover:underline font-bold text-sm">Browse Template Gallery</button>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-primary/10 p-6 bg-bg-main/50 mt-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-500">
                        <span className="material-symbols-outlined text-sm">copyright</span>
                        <span className="text-xs">2026 Datyrix Systems. All data encrypted via Quantum Protocol.</span>
                    </div>
                    <div className="flex gap-6">
                        <a className="text-xs text-slate-400 hover:text-primary transition-colors" href="#">Documentation</a>
                        <a className="text-xs text-slate-400 hover:text-primary transition-colors" href="#">API Status</a>
                        <a className="text-xs text-slate-400 hover:text-primary transition-colors" href="#">Support Portal</a>
                    </div>
                </div>
            </footer>
            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card w-full max-w-md rounded-2xl p-6 border border-primary/30 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.2)]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-100">{editingApiId ? 'Edit Connection' : 'Connect New API'}</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Connection Name</label>
                                <input required type="text" value={modalForm.name} onChange={e => setModalForm({...modalForm, name: e.target.value})} className="w-full bg-[#0F172A]/80 border border-slate-700 text-white rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Core Database" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Endpoint URL</label>
                                <input required type="url" value={modalForm.endpoint} onChange={e => setModalForm({...modalForm, endpoint: e.target.value})} className="w-full bg-[#0F172A]/80 border border-slate-700 text-white rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm" placeholder="https://api.example.com/v1" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Icon (Material)</label>
                                    <input required type="text" value={modalForm.icon} onChange={e => setModalForm({...modalForm, icon: e.target.value})} className="w-full bg-[#0F172A]/80 border border-slate-700 text-white rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm" placeholder="api" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Color Theme</label>
                                    <select value={modalForm.color} onChange={e => setModalForm({...modalForm, color: e.target.value})} className="w-full bg-[#0F172A]/80 border border-slate-700 text-white rounded-lg px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                                        <option value="primary">Cyan</option>
                                        <option value="emerald-500">Emerald</option>
                                        <option value="purple-500">Purple</option>
                                        <option value="amber-400">Amber</option>
                                        <option value="rose-500">Rose</option>
                                        <option value="red-500">Red</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-primary text-bg-main font-bold py-3 rounded-lg mt-4 hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]">
                                {editingApiId ? 'Save Changes' : 'Establish Connection'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Toast Notification */}
            {toastMsg && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="fixed bottom-6 right-6 z-[110] glass-card px-6 py-3 rounded-lg border border-primary/50 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)] flex items-center gap-3"
                >
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <p className="text-slate-100 font-medium text-sm">{toastMsg}</p>
                </motion.div>
            )}
        </div>
    );
};

export default ApiManagement;
