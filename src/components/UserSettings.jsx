import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const UserSettings = () => {
    const { logout, user, updateProfile } = useAuth();
    const { accentColor, setAccentColor, themeMode, setThemeMode } = useTheme();

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editName, setEditName] = useState(user?.name || '');
    const [editAvatar, setEditAvatar] = useState(user?.avatar || '');
    const [isSaving, setIsSaving] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 3000);
    };

    useEffect(() => {
        if (user) {
            setEditName(user.name || '');
            setEditAvatar(user.avatar || '');
        }
    }, [user]);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            await updateProfile(editName, editAvatar);
            setIsEditingProfile(false);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-bg-main text-slate-100 font-sans pb-20 lg:pb-0">
            {/* Header Section */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/10 bg-bg-main/80 backdrop-blur-md px-6 md:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-4 text-primary hover:opacity-80 transition-opacity">
                        <div className="size-8 bg-primary/20 rounded-lg flex items-center justify-center pt-1 border border-primary/40">
                            <Logo className="w-5 h-5" />
                        </div>
                        <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-tight">Datyrix API</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-9">
                        <Link to="/" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Dashboard</Link>
                        <Link to="/api-management" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">API Management</Link>
                        <Link to="/analytics" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Analytics</Link>
                        <Link to="/settings" className="text-primary text-sm font-bold border-b-2 border-primary pb-1">Settings</Link>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end gap-4 items-center">
                    <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-primary/20">
                            <div className="text-slate-400 flex bg-primary/5 items-center justify-center pl-4">
                                <span className="material-symbols-outlined text-xl">search</span>
                            </div>
                            <input className="w-full border-none bg-primary/5 text-slate-100 focus:ring-0 placeholder:text-slate-500 text-sm px-2 outline-none" placeholder="Search documentation..." />
                        </div>
                    </label>
                    <div className="flex gap-2">
                        <button onClick={() => showToast('You have no new notifications.')} className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-primary/30" style={{ backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUzNLJaLPCSCzARFwHFrIgo2ISp_RvBfAuZDpCAkJLRhb_0i_h3Q1pLoAw8bhCJfa6x1B3ldUJUY8gSoL11tgKB9cM-cTgmuATXyOEHI7CXS-CrnVmDUrqmOckHVjszOTnlhJVJ38evEzZ5EjPt7ZL5K0MDiu-bKl93t_Q0YgbCCeiQK1PDxnHyRywQKRK6Zei2XxnSzNRlPL372Ebpv4DQYC1OYBItFOTU8BqnWdyTjsJN7haXmLHbCyxjirb7YdpB1z1e4kOg04r'}")` }}></div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-2 mb-10"
                >
                    <h1 className="text-slate-100 text-4xl font-black tracking-tight">Settings</h1>
                    <p className="text-slate-400 text-lg">Control your account, security, and developer preferences.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Profile & Security */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-7 flex flex-col gap-8"
                    >
                        {/* User Profile Section */}
                        <section className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    User Profile
                                </h3>
                                {!isEditingProfile ? (
                                    <button onClick={() => setIsEditingProfile(true)} className="text-primary text-sm font-bold hover:underline">Edit Profile</button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button onClick={() => setIsEditingProfile(false)} className="text-slate-400 text-sm font-bold hover:text-white transition-colors">Cancel</button>
                                        <button onClick={handleSaveProfile} disabled={isSaving} className="text-bg-main bg-primary px-3 py-1 rounded text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-colors">
                                            {isSaving ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {!isEditingProfile ? (
                                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                    <div className="relative">
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-28 border-2 border-primary ring-4 ring-primary/10" style={{ backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsy-NL9mHnAdnMac1s4BTXLTRRtYdGghGeI0atIPYJYoe-xpbcSRscWSTQ7wASNu2wKBrJ0XemPsQi3kQGuescQzUwj6GxTeoXTfC0WSX1lRebx7Xh12eT_RIROJNLXO4uub3DLkkBFD2jDuqJ6c0tWuXnYEQu6f1uvJKHyXsa5tEfc7Pi4m4NX3x6_1PWer_BbnGXcCezsdrCWAOrVVUUjhYX-COB223gADqHhm8DzXAespA2c5dRfLqkQYcQWxLQhwIJAHT2vUHX'}")` }}></div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 flex-1">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Full Name</p>
                                            <p className="text-slate-100 font-medium">{user?.name || "Neon User"}</p>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</p>
                                            <p className="text-slate-100 font-medium break-all">{user?.email || "user@datyrix.io"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Organization Role</p>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{user?.role || "User"}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Timezone</p>
                                            <p className="text-slate-100 font-medium">UTC-07:00 (Pacific Time)</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Display Name</label>
                                        <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-[#0F172A]/80 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-sm" placeholder="Enter display name" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Avatar URL</label>
                                        <input type="url" value={editAvatar} onChange={(e) => setEditAvatar(e.target.value)} className="w-full bg-[#0F172A]/80 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans text-sm" placeholder="https://..." />
                                        <p className="text-xs text-slate-500 mt-2">Provide a valid image sequence or URL to override your default hologram avatar.</p>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Account Security Section */}
                        <section className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors">
                            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-8">
                                <span className="material-symbols-outlined text-primary">security</span>
                                Account Security
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between py-4 border-b border-primary/5">
                                    <div>
                                        <p className="text-slate-100 font-bold">Password</p>
                                        <p className="text-slate-400 text-sm">Last changed 4 months ago</p>
                                    </div>
                                    <button onClick={() => showToast('Password reset instructions sent to your email.')} className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-bold hover:bg-primary/20 transition-all">Change Password</button>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="text-slate-100 font-bold">Two-Factor Authentication</p>
                                        <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* API Keys Management Section */}
                        <section className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">key</span>
                                    API Keys
                                </h3>
                                <button onClick={() => showToast('New API Key generated: np_live_1xx...v9z')} className="flex items-center gap-2 bg-primary text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)] hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.6)]">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Generate New Key
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-primary/10">
                                            <th className="pb-4">Name</th>
                                            <th className="pb-4">Key ID</th>
                                            <th className="pb-4">Status</th>
                                            <th className="pb-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b border-primary/5 hover:bg-white/5 transition-colors">
                                            <td className="py-4 text-slate-100 font-medium px-2 rounded-l-md">Production Primary</td>
                                            <td className="py-4 font-mono text-slate-400">np_live_482...k9f2</td>
                                            <td className="py-4">
                                                <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                                                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                                                    Active
                                                </span>
                                            </td>
                                            <td className="py-4 text-right space-x-2 px-2 rounded-r-md">
                                                <button onClick={() => showToast('API Key copied to clipboard.')} className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                                </button>
                                                <button onClick={() => showToast('API Key revoked.')} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 text-slate-100 font-medium px-2 rounded-l-md">Testing Env</td>
                                            <td className="py-4 font-mono text-slate-400">np_test_019...m2n7</td>
                                            <td className="py-4">
                                                <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                    <span className="size-2 rounded-full bg-slate-500"></span>
                                                    Inactive
                                                </span>
                                            </td>
                                            <td className="py-4 text-right space-x-2 px-2 rounded-r-md">
                                                <button onClick={() => showToast('API Key copied to clipboard.')} className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                                </button>
                                                <button onClick={() => showToast('API Key revoked.')} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </motion.div>

                    {/* Right Column: Preferences & Appearance */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-5 flex flex-col gap-8"
                    >
                        {/* Notification Preferences Section */}
                        <section className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors">
                            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-8">
                                <span className="material-symbols-outlined text-primary">notifications_active</span>
                                Notifications
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-100 font-bold">Email Notifications</p>
                                        <p className="text-slate-400 text-sm">Summary of API usage & alerts</p>
                                    </div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-100 font-bold">Push Notifications</p>
                                        <p className="text-slate-400 text-sm">Browser critical error alerts</p>
                                    </div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="pt-6 border-t border-primary/10">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Connected Channels</p>
                                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 bg-[#4A154B] rounded flex items-center justify-center">
                                                <svg className="size-5" fill="white" viewBox="0 0 24 24"><path d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 0V9a2 2 0 1 1 4 0v6H6zM15 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm0 0h6a2 2 0 1 1 0 4h-6V6zM18 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 0V21a2 2 0 1 1-4 0v-6h4zM9 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0 0H3a2 2 0 1 1 0-4h6v4z"></path></svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-100">Slack</p>
                                                <p className="text-[10px] text-emerald-400">Connected to #ops-alerts</p>
                                            </div>
                                        </div>
                                        <button onClick={() => showToast('Slack integration disconnected.')} className="text-slate-400 hover:text-red-400 transition-colors">
                                            <span className="material-symbols-outlined text-sm">logout</span>
                                        </button>
                                    </div>
                                    <button onClick={() => showToast('Redirecting to Slack OAuth...')} className="w-full mt-2 py-2 border border-dashed border-primary/30 rounded-lg text-xs font-bold text-primary hover:bg-primary/5 transition-all">
                                        + Connect Workspace
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Appearance Settings Section */}
                        <section className="glass-card rounded-xl p-8 hover:border-primary/30 transition-colors">
                            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-8">
                                <span className="material-symbols-outlined text-primary">palette</span>
                                Appearance
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-slate-100 font-bold mb-4">Interface Theme</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button
                                            onClick={() => setThemeMode('dark')}
                                            className={`flex flex-col gap-2 items-center p-3 rounded-xl border ${themeMode === 'dark' ? 'border-primary shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.2)]' : 'border-slate-800 bg-slate-900/50 grayscale hover:grayscale-0 opacity-50'} transition-all`}
                                        >
                                            <div className="w-full aspect-video bg-[#0F172A] rounded border border-primary/30 flex items-center justify-center">
                                                <div className="w-1/2 h-2 bg-primary/20 rounded-full"></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-primary">Neon Dark</span>
                                        </button>
                                        <button
                                            onClick={() => setThemeMode('light')}
                                            className={`flex flex-col gap-2 items-center p-3 rounded-xl border ${themeMode === 'light' ? 'border-black shadow-[0_0_10px_rgba(0,0,0,0.2)] grayscale-0 opacity-100' : 'border-slate-800 bg-slate-900/50 grayscale hover:grayscale-0 opacity-50'} transition-all`}
                                        >
                                            <div className="w-full aspect-video bg-slate-100 rounded border border-slate-300 flex items-center justify-center">
                                                <div className="w-1/2 h-2 bg-slate-300 rounded-full"></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500">Day Light</span>
                                        </button>
                                        <button
                                            onClick={() => setThemeMode('midnight')}
                                            className={`flex flex-col gap-2 items-center p-3 rounded-xl border ${themeMode === 'midnight' ? 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)] grayscale-0 opacity-100' : 'border-slate-800 bg-slate-900/50 grayscale hover:grayscale-0 opacity-50'} transition-all`}
                                        >
                                            <div className="w-full aspect-video bg-slate-800 rounded border border-slate-700 flex items-center justify-center overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500">Midnight</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-slate-100 font-bold">Accent Color</p>
                                        <span className="text-xs font-mono text-primary uppercase">{accentColor}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <div onClick={() => setAccentColor('#22D3EE')} className={`size-8 rounded-full bg-[#22D3EE] cursor-pointer transition-all ${accentColor === '#22D3EE' ? 'border-4 border-white shadow-[0_0_10px_#22D3EE] scale-110' : 'hover:scale-110'}`}></div>
                                        <div onClick={() => setAccentColor('#A855F7')} className={`size-8 rounded-full bg-[#A855F7] cursor-pointer transition-all ${accentColor === '#A855F7' ? 'border-4 border-white shadow-[0_0_10px_#A855F7] scale-110' : 'hover:scale-110'}`}></div>
                                        <div onClick={() => setAccentColor('#F59E0B')} className={`size-8 rounded-full bg-[#F59E0B] cursor-pointer transition-all ${accentColor === '#F59E0B' ? 'border-4 border-white shadow-[0_0_10px_#F59E0B] scale-110' : 'hover:scale-110'}`}></div>
                                        <div onClick={() => setAccentColor('#10B981')} className={`size-8 rounded-full bg-[#10B981] cursor-pointer transition-all ${accentColor === '#10B981' ? 'border-4 border-white shadow-[0_0_10px_#10B981] scale-110' : 'hover:scale-110'}`}></div>
                                        <div onClick={() => setAccentColor('#F43F5E')} className={`size-8 rounded-full bg-[#F43F5E] cursor-pointer transition-all hidden lg:block ${accentColor === '#F43F5E' ? 'border-4 border-white shadow-[0_0_10px_#F43F5E] scale-110' : 'hover:scale-110'}`}></div>
                                        <div className="size-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-sm text-slate-400">colorize</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Danger Zone */}
                        <section className="rounded-xl border border-red-900/30 bg-red-950/20 p-8 mt-auto">
                            <div className="flex items-start gap-4">
                                <div className="size-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">warning</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-red-400 font-bold mb-1">Danger Zone</h4>
                                    <p className="text-red-400/60 text-sm mb-4">Permanently delete your account or sign out of the active session on this device.</p>
                                    <div className="flex gap-4">
                                        <button onClick={logout} className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-700 transition-all w-full sm:w-auto">
                                            Sign Out
                                        </button>
                                        <button onClick={() => showToast('Account deletion initiated. Confirm via email.')} className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all w-full sm:w-auto">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                </div>
            </main>

            {/* Footer Meta */}
            <footer className="mt-auto px-6 py-8 border-t border-primary/5 text-center">
                <p className="text-slate-500 text-xs">Datyrix API Platform • v2.4.0-stable • © 2026</p>
            </footer>

            {/* Toast Notification */}
            {toastMsg && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="fixed bottom-6 right-6 z-[110] glass-card px-6 py-3 rounded-lg border border-primary/50 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)] flex items-center gap-3"
                >
                    <span className="material-symbols-outlined text-primary">info</span>
                    <p className="text-slate-100 font-medium text-sm">{toastMsg}</p>
                </motion.div>
            )}
        </div>
    );
};

export default UserSettings;
