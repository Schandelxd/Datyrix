import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import WeatherWidget from './widgets/WeatherWidget';
import AQIWidget from './widgets/AQIWidget';
import CryptoWidget from './widgets/CryptoWidget';
import QuoteWidget from './widgets/QuoteWidget';
import ChartWidget from './widgets/ChartWidget';
import WorldClockWidget from './widgets/WorldClockWidget';
import Logo from './Logo';
import ErrorBoundary from './ErrorBoundary';

const Dashboard = () => {
    const [location, setLocation] = useState({ name: 'San Francisco', lat: 37.7749, lon: -122.4194 });
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleRefresh = () => {
        // Basic refresh could reload page, or you could lift more state up
        window.location.reload();
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`);
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                setLocation({ name: result.name, lat: result.latitude, lon: result.longitude });
                setSearchQuery('');
            } else {
                alert("City not found");
            }
        } catch (e) {
            console.error(e);
            alert("Error searching location");
        }
        setIsSearching(false);
    };

    const getIpLocation = async () => {
        try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            if (data.city && data.latitude && data.longitude) {
                setLocation({ name: data.city, lat: data.latitude, lon: data.longitude });
            } else {
                alert("Failed to determine location from IP.");
            }
        } catch (e) {
            console.error(e);
            alert("Location access denied and fallback failed.");
        }
    };

    const handleLocateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                        const data = await res.json();
                        setLocation({ name: data.city || data.locality || 'Current Location', lat: latitude, lon: longitude });
                    } catch (e) {
                        setLocation({ name: 'Current Location', lat: latitude, lon: longitude });
                    }
                },
                (error) => {
                    console.warn("Browser geolocation failed, using IP fallback:", error);
                    // Fallback to IP-based location
                    getIpLocation();
                }
            );
        } else {
            console.warn("Geolocation not supported, using IP fallback.");
            getIpLocation();
        }
    };


    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bg-main text-slate-100 selection:bg-primary/30 font-sans pb-20 lg:pb-0">

            {/* Header Section */}
            <header className="sticky top-0 z-50 px-6 py-4 glass-card border-b border-primary/20 bg-bg-main/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-4"
                    >
                        <Link to="/" className="flex items-center gap-3">
                            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/40 hover:bg-primary/30 transition-colors pt-1">
                                <Logo className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.6)]">Datyrix</h1>
                                <p className="text-xs font-medium text-primary/60 uppercase tracking-widest hidden xl:block">Real-time data dashboard</p>
                            </div>
                        </Link>
                        <nav className="hidden lg:flex items-center gap-6 ml-4">
                            <Link to="/" className="text-primary text-sm font-bold border-b-2 border-primary pb-1">Dashboard</Link>
                            <Link to="/api-management" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">API Management</Link>
                            <Link to="/analytics" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Analytics</Link>
                            <Link to="/settings" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Settings</Link>
                        </nav>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="hidden md:flex flex-1 max-w-md mx-8"
                    >
                        <form onSubmit={handleSearch} className="relative w-full flex items-center">
                            <input
                                type="text"
                                placeholder="Search city location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-card-bg/80 text-slate-100 px-4 py-2.5 rounded-lg border border-primary/30 focus:outline-none focus:border-primary placeholder-slate-400 transition-colors"
                            />
                            <button type="submit" className="absolute right-2 p-1 text-primary hover:text-white transition-colors" disabled={isSearching}>
                                <span className={`material-symbols-outlined ${isSearching ? 'animate-spin' : ''}`}>{isSearching ? 'sync' : 'search'}</span>
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-2 sm:gap-4"
                    >
                        <button
                            onClick={handleLocateMe}
                            className="flex items-center gap-2 px-3 py-2.5 glass-card !rounded-lg text-primary font-bold transition-all hover:bg-primary/10"
                            title="Use Current Location"
                        >
                            <span className="material-symbols-outlined text-[20px]">my_location</span>
                        </button>
                        <div className="h-8 w-[1px] bg-primary/20 hidden sm:block"></div>
                        <button
                            onClick={handleRefresh}
                            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-bg-main font-bold rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]"
                        >
                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                            <span className="hidden sm:inline">Refresh Data</span>
                        </button>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto w-full p-6 space-y-6 flex-1">

                {/* Mobile Search Bar (Visible only on small screens) */}
                <div className="md:hidden">
                    <form onSubmit={handleSearch} className="relative w-full flex items-center">
                        <input
                            type="text"
                            placeholder="Search city location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-card-bg/80 text-slate-100 px-4 py-2.5 rounded-lg border border-primary/30 focus:outline-none focus:border-primary placeholder-slate-400 transition-colors"
                        />
                        <button type="submit" className="absolute right-2 p-1 text-primary hover:text-white transition-colors" disabled={isSearching}>
                            <span className={`material-symbols-outlined ${isSearching ? 'animate-spin' : ''}`}>{isSearching ? 'sync' : 'search'}</span>
                        </button>
                    </form>
                </div>

                {/* Widget Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ErrorBoundary><WorldClockWidget location={location} /></ErrorBoundary>
                    <ErrorBoundary><WeatherWidget location={location} /></ErrorBoundary>
                    <ErrorBoundary><AQIWidget location={location} /></ErrorBoundary>
                    <ErrorBoundary><CryptoWidget /></ErrorBoundary>
                </div>

                {/* Main Chart Section */}
                <ErrorBoundary><ChartWidget /></ErrorBoundary>
            </main>

            {/* Floating Quote Widget */}
            <QuoteWidget />

        </div>
    );
};

export default Dashboard;
