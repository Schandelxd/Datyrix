import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const DetailedAnalytics = () => {
    const [toastMsg, setToastMsg] = useState('');

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 3000);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-bg-main text-slate-100 font-sans pb-20 lg:pb-0" style={{ backgroundImage: 'radial-gradient(rgba(var(--color-primary-rgb), 0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
            {/* Header Section */}
            <header className="flex items-center justify-between border-b border-primary/20 px-8 py-4 sticky top-0 z-50 bg-bg-main/80 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                        <Logo className="w-8 h-8" />
                        <h2 className="text-xl font-extrabold tracking-tighter uppercase hidden sm:block mt-1">Datyrix</h2>
                    </Link>
                    <div className="h-6 w-px bg-primary/20 mx-2 hidden sm:block"></div>
                    <nav className="flex items-center gap-2 text-sm font-medium">
                        <Link to="/" className="text-slate-400 hover:text-primary transition-colors">Dashboard</Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-secondary">Analytics</span>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex bg-primary/10 rounded-lg p-1 border border-primary/20">
                        <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-primary text-bg-main">24H</button>
                        <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-400 hover:text-primary">7D</button>
                        <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-400 hover:text-primary">30D</button>
                    </div>
                    <button onClick={() => showToast('Exporting Analytics Report to CSV...')} className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-bold hover:bg-primary/20 transition-all">
                        <span className="material-symbols-outlined text-sm">download</span>
                        <span className="hidden sm:inline">Export Data</span>
                    </button>
                    <div className="size-10 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-slate-300">person</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
                {/* Top Metrics Grid */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <div className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-primary/40 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-5xl text-primary">swap_calls</span>
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Requests</p>
                        <h3 className="text-3xl font-black text-white">42.8M</h3>
                        <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs font-bold">
                            <span className="material-symbols-outlined text-xs">trending_up</span>
                            +12.4% <span className="text-slate-500 font-normal ml-1 text-[10px]">vs last period</span>
                        </div>
                    </div>
                    <div className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-red-500/40 border-red-500/20 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-5xl text-red-500">error</span>
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Error Rate</p>
                        <h3 className="text-3xl font-black text-white">0.04%</h3>
                        <div className="flex items-center gap-1 mt-2 text-red-400 text-xs font-bold">
                            <span className="material-symbols-outlined text-xs">trending_down</span>
                            -0.01% <span className="text-slate-500 font-normal ml-1 text-[10px]">improvement</span>
                        </div>
                    </div>
                    <div className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-primary/40 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-5xl text-primary">timer</span>
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Avg Response Time</p>
                        <h3 className="text-3xl font-black text-white">124ms</h3>
                        <div className="flex items-center gap-1 mt-2 text-primary text-xs font-bold">
                            <span className="material-symbols-outlined text-xs">horizontal_rule</span>
                            Stable <span className="text-slate-500 font-normal ml-1 text-[10px]">p95: 210ms</span>
                        </div>
                    </div>
                    <div className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-secondary/40 border-secondary/20 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-5xl text-secondary">speed</span>
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Peak Throughput</p>
                        <h3 className="text-3xl font-black text-white">8.2k<span className="text-sm font-normal text-slate-500">/sec</span></h3>
                        <div className="flex items-center gap-1 mt-2 text-secondary text-xs font-bold">
                            <span className="material-symbols-outlined text-xs">bolt</span>
                            New Record <span className="text-slate-500 font-normal ml-1 text-[10px]">2h ago</span>
                        </div>
                    </div>
                </motion.section>

                {/* Mock Bar Chart Section */}
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card rounded-2xl p-6 lg:p-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-white">Requests vs Errors</h2>
                            <p className="text-slate-400 text-sm">Real-time traffic throughput across all clusters</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="size-3 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)]"></span>
                                <span className="text-xs font-bold text-slate-300">Requests</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="size-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                <span className="text-xs font-bold text-slate-300">Errors</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-80 w-full relative flex items-end gap-1">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                            <div className="border-t border-primary/40 w-full h-px"></div>
                            <div className="border-t border-primary/40 w-full h-px"></div>
                            <div className="border-t border-primary/40 w-full h-px"></div>
                            <div className="border-t border-primary/40 w-full h-px"></div>
                            <div className="border-t border-primary/40 w-full h-px"></div>
                        </div>

                        {/* Bars (Mock Data) */}
                        {[
                            { r: 40, e: 2 }, { r: 55, e: 3 }, { r: 70, e: 1 }, { r: 65, e: 4 },
                            { r: 85, e: 2, active: true }, { r: 75, e: 3 }, { r: 60, e: 2 },
                            { r: 80, e: 1 }, { r: 45, e: 5 }, { r: 50, e: 2 }, { r: 68, e: 1 },
                            { r: 92, e: 2 }
                        ].map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 group cursor-pointer h-full relative">
                                {data.active && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:block z-20">
                                        <div className="glass-card rounded-lg p-3 text-xs min-w-[120px] shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]">
                                            <p className="text-slate-400 mb-1">14:00 - 14:15</p>
                                            <div className="flex justify-between gap-4 mb-1">
                                                <span className="text-primary font-bold">Requests:</span>
                                                <span className="text-white">8.4k</span>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <span className="text-red-400 font-bold">Errors:</span>
                                                <span className="text-white">12</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className={`w-full ${data.active ? 'bg-primary/40 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]' : 'bg-primary/20 group-hover:bg-primary/40'} rounded-t-sm transition-all`} style={{ height: `${data.r}%` }}></div>
                                <div className={`w-full ${data.active ? 'bg-red-500/60' : 'bg-red-500/40'} rounded-b-sm`} style={{ height: `${data.e}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>12:00</span>
                        <span>13:00</span>
                        <span>14:00</span>
                        <span>15:00</span>
                        <span>16:00</span>
                        <span>17:00</span>
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Geographic Distribution */}
                    <motion.section
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-2xl p-6 overflow-hidden relative"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">public</span>
                                Geographic Distribution
                            </h2>
                            <button onClick={() => showToast('Initializing interactive global map view...')} className="text-xs text-primary font-bold hover:underline">View Map</button>
                        </div>
                        <div className="space-y-4 relative z-10">
                            {[
                                { loc: 'US-East', code: 'USA', val: '12.4M', pct: '85%' },
                                { loc: 'EU-Central', code: 'EUR', val: '8.9M', pct: '60%' },
                                { loc: 'Singapore', code: 'ASI', val: '5.1M', pct: '40%' },
                                { loc: 'Brazil', code: 'LAT', val: '2.2M', pct: '25%' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10 backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-5 bg-bg-main rounded flex items-center justify-center text-[10px] font-bold text-slate-300 border border-white/5">{item.code}</span>
                                        <span className="text-sm font-semibold text-white">{item.loc}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-white">{item.val}</p>
                                        <div className="w-24 h-1 bg-bg-main border border-white/5 rounded-full mt-1 overflow-hidden relative">
                                            <div className="bg-primary h-full" style={{ width: item.pct }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Map Background visual */}
                        <div className="absolute bottom-0 right-0 left-0 h-32 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(var(--color-primary-rgb),0.4), transparent 70%)' }}></div>
                    </motion.section>

                    {/* Endpoint Performance Table */}
                    <motion.section
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary">analytics</span>
                                Endpoint Performance
                            </h2>
                            <button onClick={() => showToast('Generating full PDF endpoint performance report...')} className="text-xs text-secondary font-bold hover:underline">Full Report</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-3">
                                <thead>
                                    <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        <th className="px-2 pb-2">Route</th>
                                        <th className="px-2 pb-2 text-center">Latency</th>
                                        <th className="px-2 pb-2 text-center">Uptime</th>
                                        <th className="px-2 pb-2 text-right">Success</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { route: '/v1/auth/login', meth: 'POST', lat: '42ms', up: '99.99%', suc: '98.2%', color: 'emerald-400', bcolor: 'emerald-500' },
                                        { route: '/v1/stream/data', meth: 'GET', lat: '245ms', up: '100%', suc: '99.8%', color: 'primary', bcolor: 'emerald-500' },
                                        { route: '/v2/compute/job', meth: 'PUT', lat: '890ms', up: '98.4%', suc: '94.5%', color: 'yellow-400', bcolor: 'yellow-500' },
                                        { route: '/v1/user/settings', meth: 'PATCH', lat: '18ms', up: '100%', suc: '100%', color: 'emerald-400', bcolor: 'emerald-500' },
                                    ].map((row, i) => (
                                        <tr key={i} className="bg-bg-main/40 border border-white/5 rounded-lg group hover:bg-white/5 transition-colors">
                                            <td className="px-3 py-4 rounded-l-lg border-y border-l border-white/5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white">{row.route}</span>
                                                    <span className="text-[10px] text-slate-500 uppercase">{row.meth}</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-4 text-center border-y border-white/5">
                                                <span className={`text-sm font-mono text-${row.color}`}>{row.lat}</span>
                                            </td>
                                            <td className="px-3 py-4 text-center border-y border-white/5">
                                                <span className="text-xs font-bold text-white">{row.up}</span>
                                            </td>
                                            <td className="px-3 py-4 text-right rounded-r-lg border-y border-r border-white/5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-sm font-bold text-white">{row.suc}</span>
                                                    <div className={`size-2 rounded-full bg-${row.bcolor} shadow-[0_0_8px_green]`}></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.section>
                </div>
            </main>

            <footer className="mt-auto border-t border-primary/10 px-8 py-6 text-center">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    © 2026 Datyrix Systems • High-Throughput API Gateway • System Status: <span className="text-emerald-500">OPTIMAL</span>
                </p>
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

export default DetailedAnalytics;
