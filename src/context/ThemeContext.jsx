import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { user } = useAuth();
    
    // Default to midnight and purple
    const [accentColor, setAccentColor] = useState('#A855F7');
    const [themeMode, setThemeMode] = useState('midnight');

    // Load from user preferences when user changes
    useEffect(() => {
        if (user) {
            const savedTheme = localStorage.getItem(`datyrix_theme_${user.id}`);
            const savedColor = localStorage.getItem(`datyrix_color_${user.id}`);
            if (savedTheme) setThemeMode(savedTheme);
            else setThemeMode('midnight'); // Default
            
            if (savedColor) setAccentColor(savedColor);
            else setAccentColor('#A855F7'); // Default purple
        } else {
            // Default when logged out
            setThemeMode('midnight');
            setAccentColor('#A855F7');
        }
    }, [user]);

    // Save to localStorage when theme changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(`datyrix_theme_${user.id}`, themeMode);
            localStorage.setItem(`datyrix_color_${user.id}`, accentColor);
        }
    }, [themeMode, accentColor, user]);

    useEffect(() => {
        const root = document.documentElement;

        // Convert hex to rgb for text-shadow compatibilities
        const hexToRgb = (hex) => {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '168, 85, 247'; // Default purple RGB
        };

        // Update Accent Color
        root.style.setProperty('--color-primary', accentColor);
        root.style.setProperty('--color-primary-rgb', hexToRgb(accentColor));

        // Update Base Theme
        if (themeMode === 'light') {
            root.style.setProperty('--color-bg-main', '#F8FAFC');
            root.style.setProperty('--color-card-bg', '#FFFFFF');
            root.style.setProperty('--color-text-color', '#0F172A');
        } else if (themeMode === 'midnight') {
            root.style.setProperty('--color-bg-main', '#020617');
            root.style.setProperty('--color-card-bg', '#0F172A');
            root.style.setProperty('--color-text-color', '#E5E7EB');
        } else {
            // Default Dark
            root.style.setProperty('--color-bg-main', '#0F172A');
            root.style.setProperty('--color-card-bg', '#1E293B');
            root.style.setProperty('--color-text-color', '#E5E7EB');
        }
    }, [accentColor, themeMode]);

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor, themeMode, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
