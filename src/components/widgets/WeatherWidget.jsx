import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const weatherCodeToIcon = (code) => {
    // WMO Weather interpretation codes
    if (code === 0) return 'clear_day';
    if (code >= 1 && code <= 3) return 'cloud_queue';
    if (code >= 45 && code <= 48) return 'foggy';
    if (code >= 51 && code <= 67) return 'rainy';
    if (code >= 71 && code <= 77) return 'weather_snowy';
    if (code >= 80 && code <= 82) return 'rainy';
    if (code >= 85 && code <= 86) return 'weather_snowy';
    if (code >= 95) return 'thunderstorm';
    return 'cloud';
};

const WeatherWidget = ({ location }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWeather = async () => {
        if (!location) return;
        setLoading(true);
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
            const json = await res.json();
            setData(json.current);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWeather();
        const interval = setInterval(fetchWeather, 600000); // 10 mins
        return () => clearInterval(interval);
    }, [location]);

    if (loading || !data) {
        return (
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-xl flex flex-col justify-center items-center min-h-[220px] border border-white/5"
            >
                <span className="material-symbols-outlined text-primary animate-spin text-3xl">sync</span>
            </motion.div>
        );
    }

    const iconName = weatherCodeToIcon(data.weather_code);

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-xl flex flex-col justify-between group hover:border-primary/40 transition-all border border-white/5 min-h-[220px]"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-primary/60 text-sm font-semibold uppercase tracking-wider">{location.name}</p>
                    <h3 className="text-4xl font-bold mt-1 text-slate-100">{Math.round(data.temperature_2m)}°C</h3>
                </div>
                <span className="material-symbols-outlined text-5xl text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.6)] animate-pulse">
                    {iconName}
                </span>
            </div>
            <div className="mt-8 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Wind Speed</span>
                    <span className="font-mono text-primary">{data.wind_speed_10m} km/h</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Humidity</span>
                    <span className="font-mono text-primary">{data.relative_humidity_2m}%</span>
                </div>
                <div className="w-full bg-primary/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${data.relative_humidity_2m}%` }}
                        transition={{ duration: 1 }}
                        className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.6)]"
                    ></motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherWidget;
