import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {
    const location = useLocation();

    // Hidden on auth pages
    if (location.pathname === '/login' || location.pathname === '/signup') return null;

    const navItems = [
        { path: '/', icon: 'dashboard', label: 'Dashboard' },
        { path: '/api-management', icon: 'api', label: 'APIs' },
        { path: '/analytics', icon: 'analytics', label: 'Analytics' },
        { path: '/settings', icon: 'settings', label: 'Settings' }
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 w-full glass-card border-t border-primary/20 bg-bg-main/90 backdrop-blur-xl z-[100] flex justify-around items-center py-3 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center gap-1 transition-colors px-4 ${
                        location.pathname === item.path ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                    <span className="material-symbols-outlined text-[24px]">
                        {item.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default MobileNav;
