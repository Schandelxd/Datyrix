import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WorldClockWidget = ({ location }) => {
    const [timeData, setTimeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        let interval;

        const fetchTime = async () => {
            if (!location || !location.lat || !location.lon) return;
            setLoading(true);
            setError('');
            try {
                // Fetch basic timezone info from coordinate
                const res = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${location.lat}&longitude=${location.lon}`);
                const data = await res.json();
                
                if (isMounted) {
                    setTimeData(data);
                    
                    // We can also start a local interval to tick the clock every second based on the fetched timezone
                    // to avoid spamming the API every second.
                    clearInterval(interval);
                    interval = setInterval(() => {
                        setTimeData((prev) => {
                            if (!prev) return prev;
                            // Simplistic frontend ticking: parse current date as UTC, add 1 sec
                            // But usually, formatting with Intl using prev.timeZone is best
                            const now = new Date();
                            const timeString = new Intl.DateTimeFormat('en-US', {
                                timeZone: prev.timeZone,
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                            }).format(now);
                            
                            // Return pseudo data for the UI
                            return {
                                ...prev,
                                displayTime: timeString
                            };
                        });
                    }, 1000);
                }
            } catch (e) {
                if (isMounted) {
                    setError('Failed to load temporal data.');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchTime();

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [location]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-between"
            style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2322d3ee\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")'
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined neon-glow-primary">schedule</span>
                    <h3 className="font-bold text-sm tracking-widest uppercase">World Clock</h3>
                </div>
                {loading && <span className="material-symbols-outlined animate-spin text-primary text-sm">sync</span>}
            </div>

            {error && (
                <div className="flex flex-col items-center justify-center p-4 h-full">
                    <span className="material-symbols-outlined text-red-400 text-3xl mb-2">error</span>
                    <p className="text-xs text-red-400 text-center">{error}</p>
                </div>
            )}

            {!loading && !error && timeData && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                        <h4 className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.3)] tabular-nums tracking-tight">
                            {timeData.displayTime || timeData.time}
                        </h4>
                    </div>
                    
                    <div className="space-y-1 mt-4">
                        <div className="flex justify-between items-center text-xs border-t border-primary/10 pt-2">
                            <span className="text-slate-500 font-bold uppercase tracking-wider">Timezone</span>
                            <span className="text-slate-300 font-medium bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                                {timeData.timeZone || 'UTC'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-wider">Date</span>
                            <span className="text-slate-300 font-medium">
                                {timeData.date || new Date().toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500 font-bold uppercase tracking-wider">Location</span>
                            <span className="text-primary font-medium truncate max-w-[120px] text-right" title={location?.name}>
                                {location?.name}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Background decorative flair */}
            <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12 pointer-events-none transition-transform group-hover:rotate-45 duration-700">
                <span className="material-symbols-outlined text-[120px] text-primary">language</span>
            </div>
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.div>
    );
};

export default WorldClockWidget;
