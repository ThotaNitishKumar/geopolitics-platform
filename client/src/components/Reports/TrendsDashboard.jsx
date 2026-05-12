import React, { useEffect, useState } from 'react';
import {
    TrendingUp,
    Activity,
    ShieldAlert,
    Globe,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import api from '../../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TrendsDashboard = () => {
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const { data } = await api.get('/reports/trends');
                setTrends(data);
            } catch (err) {
                console.error('Error fetching trends:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrends();
    }, []);

    const chartOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0a192f',
                borderColor: '#1e3a5f',
                borderWidth: 1,
            },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
            y: { grid: { color: '#1e293b' }, ticks: { color: '#64748b', font: { size: 10 } } },
        },
    };

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map(n => <div key={n} className="h-48 bg-white/5 rounded-2xl" />)}
        </div>
    );

    const conflictData = {
        labels: trends.conflictTrend.map(d => d.year),
        datasets: [{
            data: trends.conflictTrend.map(d => d.value),
            borderColor: '#f87171',
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
        }]
    };

    const instabilityData = {
        labels: trends.economicInstability.map(d => d.month),
        datasets: [{
            data: trends.economicInstability.map(d => d.value),
            borderColor: '#fbbf24',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
        }]
    };

    const spendingData = {
        labels: trends.militarySpending.map(d => d.category),
        datasets: [{
            data: trends.militarySpending.map(d => d.value),
            backgroundColor: '#3b82f6',
            borderRadius: 6,
        }]
    };

    const sanctionsData = {
        labels: trends.sanctionsGrowth.map(d => d.year),
        datasets: [{
            data: trends.sanctionsGrowth.map(d => d.value),
            borderColor: '#a855f7',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 2,
        }]
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <TrendingUp size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Global Trend Analytics</h2>
                        <p className="text-xs text-gray-500">Real-time geopolitical instability indexing</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-widest">
                        <Activity size={10} /> Live Data
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Conflict Trend */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 hover:border-red-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Conflict Index</span>
                        <ArrowUpRight size={14} className="text-red-400" />
                    </div>
                    <div className="h-24">
                        <Line data={conflictData} options={chartOpts} />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <div className="text-2xl font-black text-white">92.4</div>
                        <div className="text-[10px] text-red-400 font-bold">+12% YoY</div>
                    </div>
                </div>

                {/* Economic Instability */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 hover:border-yellow-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Econ Instability Index</span>
                        <ArrowUpRight size={14} className="text-yellow-400" />
                    </div>
                    <div className="h-24">
                        <Line data={instabilityData} options={chartOpts} />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <div className="text-2xl font-black text-white">48.1</div>
                        <div className="text-[10px] text-yellow-400 font-bold">+5.2% MoM</div>
                    </div>
                </div>

                {/* Military Spending */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 hover:border-blue-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Top Military Spenders</span>
                        <ShieldAlert size={14} className="text-blue-400" />
                    </div>
                    <div className="h-24">
                        <Bar data={spendingData} options={chartOpts} />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <div className="text-2xl font-black text-white">$2.4T</div>
                        <div className="text-[10px] text-blue-400 font-bold">Global Total</div>
                    </div>
                </div>

                {/* Sanctions Trend */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 hover:border-purple-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Sanctions Growth</span>
                        <Globe size={14} className="text-purple-400" />
                    </div>
                    <div className="h-24">
                        <Line data={sanctionsData} options={chartOpts} />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                        <div className="text-2xl font-black text-white">15,420</div>
                        <div className="text-[10px] text-purple-400 font-bold">+240% since 2022</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendsDashboard;
