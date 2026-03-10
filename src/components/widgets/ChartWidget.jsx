import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ChartWidget = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [activeTab, setActiveTab] = useState('24H');

    useEffect(() => {
        const chart = chartRef.current;
        const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
        const btcTrend = [61200, 61500, 60800, 61900, 62400, 62100, 62140];
        const aqiTrend = [45, 50, 80, 110, 95, 75, 40];

        // Safe default structure even before chart area is rendered
        let gradient = 'rgba(168, 85, 247, 0.2)'; // Fallback purple

        if (chart && chart.chartArea) {
            const { ctx, chartArea } = chart;
            
            // Canvas gradients do not dynamically read CSS variables (e.g., rgba(var(--color-primary-rgb), 0.4)).
            // We must resolve the CSS variable to a literal string first.
            const rawColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb') || '168, 85, 247';
            const resolvedColor = rawColor.trim();

            gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, `rgba(${resolvedColor}, 0.4)`); // Primary
            gradient.addColorStop(1, `rgba(${resolvedColor}, 0.0)`);
        }

        const data = {
            labels,
            datasets: [
                {
                    label: 'BTC Price (USD)',
                    data: btcTrend,
                    borderColor: 'var(--color-primary)',
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: 'var(--color-primary)',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    yAxisID: 'y',
                },
                {
                    label: 'Air Quality Index',
                    data: aqiTrend,
                    borderColor: '#FACC15',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#FACC15',
                    yAxisID: 'y1',
                }
            ],
        };

        setChartData(data);
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                titleColor: '#94A3B8',
                bodyColor: '#F8FAFC',
                borderColor: 'rgba(var(--color-primary-rgb), 0.3)',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748B',
                    font: {
                        size: 10,
                        weight: 'bold',
                    }
                }
            },
            y: {
                type: 'linear',
                display: false,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: false,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 rounded-xl relative overflow-hidden border border-white/5"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-100 drop-shadow-sm">Combined Trend Analytics</h2>
                    <p className="text-slate-400 text-sm">Historical correlation between market volatility and local environmental data</p>
                </div>
                <div className="flex bg-primary/10 rounded-lg p-1 self-start sm:self-auto">
                    {['24H', '7D', '1M'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1 text-xs font-bold rounded-md transition-colors ${activeTab === tab ? 'bg-primary text-bg-main' : 'text-primary/60 hover:text-primary'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative h-[300px] w-full mt-4">
                {chartData.datasets.length > 0 ? (
                    <Line ref={chartRef} options={options} data={chartData} />
                ) : (
                    // Initial empty state before ref attaches to canvas
                    <Line ref={chartRef} options={options} data={{ labels: [], datasets: [] }} />
                )}
            </div>
        </motion.div>
    );
};

export default ChartWidget;
