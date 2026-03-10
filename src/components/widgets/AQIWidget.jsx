import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const getAqiInfo = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-emerald-400', bg: 'bg-emerald-400', border: 'border-emerald-400', desc: 'Air quality is satisfactory.' };
    if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400', border: 'border-yellow-400', desc: 'Acceptable air quality.' };
    if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: 'text-orange-400', bg: 'bg-orange-400', border: 'border-orange-400', desc: 'Sensitive groups may experience health effects.' };
    if (aqi <= 200) return { label: 'Unhealthy', color: 'text-rose-500', bg: 'bg-rose-500', border: 'border-rose-500', desc: 'Everyone may begin to experience health effects.' };
    return { label: 'Hazardous', color: 'text-purple-500', bg: 'bg-purple-500', border: 'border-purple-500', desc: 'Health warnings of emergency conditions.' };
};

const AQIWidget = ({ location }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAqi = async () => {
        if (!location) return;
        setLoading(true);
        try {
            // Migrated to Open-Meteo Air Quality to avoid rate/demo issues
            const res = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.lat}&longitude=${location.lon}&current=us_aqi`);
            const json = await res.json();
            if (json.current && json.current.us_aqi !== undefined) {
                setData({ aqi: json.current.us_aqi });
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAqi();
        const interval = setInterval(fetchAqi, 600000); // 10 mins
        return () => clearInterval(interval);
    }, [location]);

    if (loading || !data) {
        return (
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-xl flex flex-col justify-center items-center min-h-[220px] border border-white/5"
            >
                <span className="material-symbols-outlined text-secondary animate-spin text-3xl">sync</span>
            </motion.div>
        );
    }

    const aqiInfo = getAqiInfo(data.aqi);

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`glass-card p-6 rounded-xl flex flex-col justify-between group hover:border-secondary/40 transition-all border border-white/5 min-h-[220px]`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-secondary text-sm font-semibold uppercase tracking-wider">{location.name} AQI</p>
                    <h3 className={`text-4xl font-bold mt-1 ${aqiInfo.color} drop-shadow-md`}>{data.aqi}</h3>
                </div>
                <div className={`size-12 rounded-full border-4 border-white/5 ${aqiInfo.border} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${aqiInfo.color}`}>air</span>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`size-2 rounded-full ${aqiInfo.bg} animate-ping`}></div>
                    <span className={`${aqiInfo.color} font-bold tracking-wide drop-shadow-sm`}>{aqiInfo.label}</span>
                </div>
                <p className="text-sm text-slate-400">{aqiInfo.desc}</p>
            </div>
        </motion.div>
    );
};

export default AQIWidget;
