import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState(0);

    const messages = [
        "Establishing quantum link...",
        "Decrypting edge nodes...",
        "Synchronizing global data streams...",
        "Validating telemetry packets...",
        "Initializing visual cortex..."
    ];

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
            }
            setProgress(currentProgress);

            if (currentProgress > 20 && currentProgress <= 40) setStep(1);
            else if (currentProgress > 40 && currentProgress <= 60) setStep(2);
            else if (currentProgress > 60 && currentProgress <= 80) setStep(3);
            else if (currentProgress > 80) setStep(4);
            
            if (currentProgress === 100) {
                clearInterval(interval);
                setTimeout(onComplete, 800);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="relative flex h-screen w-full flex-col items-center justify-center bg-bg-main p-6 text-slate-100 overflow-hidden"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
        >
            {/* Abstract Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                {/* Logo Section */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center gap-4 mb-16"
                >
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]">
                        <Logo className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter text-slate-100 drop-shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.6)]">
                        Datyrix
                    </h1>
                </motion.div>

                {/* Central Neon Spinner */}
                <div className="relative mb-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-24 h-24 rounded-full border-4 border-primary/20 !border-r-primary !border-b-primary !border-l-primary"
                    ></motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-4xl animate-pulse">api</span>
                    </div>
                </div>

                {/* Progress Information */}
                <div className="w-full space-y-6">
                    <div className="flex justify-between items-end mb-1 px-1">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">System Status</span>
                            <p className="text-primary font-medium text-lg leading-none drop-shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.6)]">
                                Rendering dashboard...
                            </p>
                        </div>
                        <span className="text-2xl font-bold text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.6)]">{progress}%</span>
                    </div>

                    {/* Glow Progress Bar */}
                    <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-primary rounded-full drop-shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut" }}
                        ></motion.div>
                    </div>

                    {/* Sub-messages */}
                    <div className="grid grid-cols-1 gap-3 pt-4">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: step >= index ? 1 : 0.4, x: 0 }}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${step >= index ? 'bg-slate-800/50 border-slate-700/50' : 'bg-primary/5 border-primary/20'} ${step === index && progress < 100 ? 'border-primary/50 bg-primary/10' : ''}`}
                            >
                                <span className={`material-symbols-outlined text-sm ${step > index ? 'text-emerald-400' : 'text-primary ' + (step === index ? 'animate-spin' : '')}`}>
                                    {step > index ? 'check_circle' : 'sync'}
                                </span>
                                <p className={`text-sm ${step >= index ? 'text-slate-200' : 'text-slate-400'} font-medium`}>{msg}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Tech Info */}
            <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-center opacity-40">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Node Instance</span>
                    <span className="text-xs font-mono text-slate-400">US-EAST-01-V2</span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Protocol</span>
                    <span className="text-xs font-mono text-slate-400">HTTPS/WSS SH-256</span>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
