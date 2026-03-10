import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch current session on mount
        const getSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (session) {
                // Map Supabase user to our local user structure
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.username || 'Neon User',
                    avatar: session.user.user_metadata?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsy-NL9mHnAdnMac1s4BTXLTRRtYdGghGeI0atIPYJYoe-xpbcSRscWSTQ7wASNu2wKBrJ0XemPsQi3kQGuescQzUwj6GxTeoXTfC0WSX1lRebx7Xh12eT_RIROJNLXO4uub3DLkkBFD2jDuqJ6c0tWuXnYEQu6f1uvJKHyXsa5tEfc7Pi4m4NX3x6_1PWer_BbnGXcCezsdrCWAOrVVUUjhYX-COB223gADqHhm8DzXAespA2c5dRfLqkQYcQWxLQhwIJAHT2vUHX',
                    role: 'User'
                });
            }
            setIsLoading(false);
        };

        getSession();

        // Listen for auth state changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.username || 'Neon User',
                    avatar: session.user.user_metadata?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsy-NL9mHnAdnMac1s4BTXLTRRtYdGghGeI0atIPYJYoe-xpbcSRscWSTQ7wASNu2wKBrJ0XemPsQi3kQGuescQzUwj6GxTeoXTfC0WSX1lRebx7Xh12eT_RIROJNLXO4uub3DLkkBFD2jDuqJ6c0tWuXnYEQu6f1uvJKHyXsa5tEfc7Pi4m4NX3x6_1PWer_BbnGXcCezsdrCWAOrVVUUjhYX-COB223gADqHhm8DzXAespA2c5dRfLqkQYcQWxLQhwIJAHT2vUHX',
                    role: 'User'
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data.user;
    };

    const signup = async (email, password, username) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username,
                    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsy-NL9mHnAdnMac1s4BTXLTRRtYdGghGeI0atIPYJYoe-xpbcSRscWSTQ7wASNu2wKBrJ0XemPsQi3kQGuescQzUwj6GxTeoXTfC0WSX1lRebx7Xh12eT_RIROJNLXO4uub3DLkkBFD2jDuqJ6c0tWuXnYEQu6f1uvJKHyXsa5tEfc7Pi4m4NX3x6_1PWer_BbnGXcCezsdrCWAOrVVUUjhYX-COB223gADqHhm8DzXAespA2c5dRfLqkQYcQWxLQhwIJAHT2vUHX'
                }
            }
        });
        if (error) throw error;
        return data.user;
    };

    const updateProfile = async (username, avatar_url) => {
        const { data, error } = await supabase.auth.updateUser({
            data: { username, avatar_url }
        });
        if (error) throw error;

        // Update local state immediately
        setUser(prev => ({
            ...prev,
            name: username || prev.name,
            avatar: avatar_url || prev.avatar
        }));
        return data.user;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isLoading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
