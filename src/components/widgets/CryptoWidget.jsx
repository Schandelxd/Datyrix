import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CryptoWidget = () => {
    const [data, setData] = useState({ bitcoin: null, ethereum: null });
    const [loading, setLoading] = useState(true);

    const fetchCrypto = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true');
            const json = await res.json();
            setData({ bitcoin: json.bitcoin, ethereum: json.ethereum });
        } catch (e) {
            console.error(e);
            // Fallback data in case of rate limit
            setData({
                bitcoin: { usd: 62140, usd_24h_change: 2.4 },
                ethereum: { usd: 3200, usd_24h_change: -1.1 }
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCrypto();
        const interval = setInterval(fetchCrypto, 60000); // 1 min (careful w/ rate limits)
        return () => clearInterval(interval);
    }, []);

    if (loading || !data.bitcoin) {
        return (
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 rounded-xl flex flex-col justify-center items-center min-h-[220px] border border-white/5"
            >
                <span className="material-symbols-outlined text-orange-500 animate-spin text-3xl">sync</span>
            </motion.div>
        );
    }

    const renderCoin = (coin, label, colorClass, bgClass, delay) => {
        if (!coin) return null;
        const isUp = coin.usd_24h_change >= 0;

        return (
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: delay }}
                        className={`size-8 rounded ${bgClass} flex items-center justify-center ${colorClass} font-bold text-xs`}
                    >
                        {label}
                    </motion.div>
                    <span className="font-bold text-slate-100">${coin.usd.toLocaleString()}</span>
                </div>
                <div className={`flex items-center ${isUp ? 'text-emerald-400' : 'text-rose-400'} text-sm font-bold`}>
                    <span className="material-symbols-outlined text-sm">{isUp ? 'trending_up' : 'trending_down'}</span>
                    {Math.abs(coin.usd_24h_change).toFixed(1)}%
                </div>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 rounded-xl flex flex-col justify-between group hover:border-orange-500/40 transition-all border border-white/5 min-h-[220px]"
        >
            <div className="flex justify-between items-start mb-4">
                <p className="text-orange-500/80 text-sm font-semibold uppercase tracking-wider">Markets</p>
                <span className="material-symbols-outlined text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">currency_bitcoin</span>
            </div>
            <div className="space-y-4">
                {renderCoin(data.bitcoin, 'BTC', 'text-orange-500', 'bg-orange-500/20', 0)}
                {renderCoin(data.ethereum, 'ETH', 'text-indigo-500', 'bg-indigo-500/20', 1)}
            </div>
        </motion.div>
    );
};

export default CryptoWidget;
