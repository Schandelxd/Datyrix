import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuoteWidget = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://api.quotable.io/random');
            // Some networks block quotable.io, handle gracefully
            if (res.ok) {
                const json = await res.json();
                setData(json);
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (e) {
            console.error(e);
            setData({
                content: "The advance of technology is based on making it fit in so that you don't even notice it, so it's part of everyday life.",
                author: "Bill Gates"
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchQuote();
        const interval = setInterval(fetchQuote, 60000); // 1 min (or maybe on refresh only)
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.aside
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-8 right-8 z-40 max-w-xs"
        >
            <div className="glass-card p-5 rounded-xl border-[#F472B6]/30 shadow-[0_0_25px_rgba(244,114,182,0.15)] flex gap-4 transform transition-transform hover:-translate-y-1 bg-card-bg cursor-pointer" onClick={fetchQuote}>
                <div className="text-[#F472B6]">
                    <span className="material-symbols-outlined text-3xl">format_quote</span>
                </div>
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {!loading && data ? (
                            <motion.div
                                key={data._id || data.content}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-sm italic leading-relaxed text-slate-300">
                                    "{data.content}"
                                </p>
                                <p className="text-[10px] mt-2 font-bold uppercase tracking-widest text-[#F472B6]/80">— {data.author}</p>
                            </motion.div>
                        ) : (
                            <div className="h-16 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#F472B6] animate-spin">refresh</span>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.aside>
    );
};

export default QuoteWidget;
