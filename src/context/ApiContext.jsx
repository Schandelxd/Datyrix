import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [connections, setConnections] = useState(() => {
        const saved = localStorage.getItem('datyrix_apis');
        if (saved) return JSON.parse(saved);
        
        return [
            {
                id: 'api_1',
                name: 'Global Weather Grid',
                endpoint: 'https://api.datyrix.io/v1/weather/global',
                icon: 'cloudy_snowing',
                color: 'emerald-500',
                latency: '18ms',
                uptime: '99.9%',
                status: 'active'
            },
            {
                id: 'api_2',
                name: 'AQI Realtime Monitor',
                endpoint: 'https://api.datyrix.io/v1/environment/aqi',
                icon: 'air',
                color: 'red-500',
                latency: 'TIMEOUT',
                uptime: '84.2%',
                status: 'error',
                errorMsg: 'Endpoint returned 502 Bad Gateway. Attempting to reconnect via Tokyo Node...'
            },
            {
                id: 'api_3',
                name: 'Quantum Crypto Exchange',
                endpoint: 'https://api.datyrix.io/v1/finance/crypto-flux',
                icon: 'currency_bitcoin',
                color: 'primary',
                latency: '12ms',
                uptime: '100%',
                status: 'active'
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('datyrix_apis', JSON.stringify(connections));
    }, [connections]);

    const addConnection = (api) => {
        const newApi = {
            ...api,
            id: `api_${Date.now()}`,
            status: 'active',
            latency: Math.floor(Math.random() * 50 + 10) + 'ms',
            uptime: '100%'
        };
        setConnections(prev => [newApi, ...prev]);
    };

    const updateConnection = (id, updatedData) => {
        setConnections(prev => prev.map(api => api.id === id ? { ...api, ...updatedData } : api));
    };

    const removeConnection = (id) => {
        setConnections(prev => prev.filter(api => api.id !== id));
    };

    return (
        <ApiContext.Provider value={{ connections, addConnection, updateConnection, removeConnection }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
