import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import {
    Activity, ShieldAlert, Globe, TrendingUp, AlertTriangle,
    Zap, Search, ChevronDown, BarChart3, Target,
    Flame, Cpu, Info, RefreshCw, Layers, Shield
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, Title, Tooltip, Legend, Filler, RadialLinearScale
} from 'chart.js';
import { Line, Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, Title, Tooltip, Legend, Filler, RadialLinearScale
);

const PredictionEngine = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState('USA');
    const [scenario, setScenario] = useState('taiwan_invasion');
    const [simResults, setSimResults] = useState(null);
    const [simLoading, setSimLoading] = useState(false);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const { data: predData } = await api.get('/predictions');
                setData(predData);
                setSimResults(predData.scenarios[scenario]);
            } catch (err) {
                console.error('Error fetching predictions:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPredictions();
    }, []);

    const handleSimulate = async (id) => {
        setSimLoading(true);
        setScenario(id);
        try {
            const { data: res } = await api.post('/predictions/simulate', { scenarioId: id });
            setSimResults(res);
        } catch (err) {
            console.error('Simulation error:', err);
        } finally {
            setSimLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020c1b] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 text-sm tracking-widest uppercase">Initializing Prediction Engine...</p>
            </div>
        </div>
    );

    if (!data) return (
        <div className="min-h-screen bg-[#020c1b] flex items-center justify-center p-6">
            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl max-w-md text-center">
                <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
                <h2 className="text-xl font-black uppercase text-white mb-2">Intelligence Drop Failed</h2>
                <p className="text-gray-400 text-sm mb-6">Unable to establish secure connection to prediction nodes. Ensure backend server is active on port 5000.</p>
                <button onClick={() => window.location.reload()} className="bg-red-500 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
            </div>
        </div>
    );

    const { globalRisk, flashpoints, predictions, powerForecast } = data;

    return (
        <div className="min-h-screen bg-[#020c1b] text-gray-100 font-sans pb-20">
            {/* ── HERO / MONITOR STATUS ────────────────────────────────────────── */}
            <div className="relative border-b border-white/[0.06] bg-gradient-to-b from-red-950/10 to-[#020c1b]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.1),transparent_70%)]" />
                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1 text-[10px] text-red-500 font-black uppercase tracking-[0.2em] mb-4">
                                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                                Top Secret // AI Prediction Engine Active
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">
                                Strategic <span className="text-red-500">Forecasting</span>
                            </h1>
                            <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
                                AI-driven systemic risk analysis modeling conflict escalation,
                                economic shocks, and geopolitical power transitions over a 20-year horizon.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
                                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Global War Risk</div>
                                <div className="text-3xl font-black text-red-500">{globalRisk.warProbability}%</div>
                                <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-red-500 h-full" style={{ width: `${globalRisk.warProbability}%` }} />
                                </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-center">
                                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Economic Crisis</div>
                                <div className="text-3xl font-black text-yellow-500">{globalRisk.economicInstability}%</div>
                                <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-yellow-500 h-full" style={{ width: `${globalRisk.economicInstability}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ── LEFT COLUMN: FLASHPOINTS ─────────────────────────────────── */}
                <div className="lg:col-span-4 space-y-6">
                    <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                        <Flame size={14} className="text-red-500" /> Critical Flashpoints
                    </h2>
                    {flashpoints.map(fp => (
                        <div key={fp.id} className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 p-5 rounded-2xl transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-sm tracking-tight group-hover:text-red-400 transition-colors uppercase">{fp.name}</h3>
                                <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${fp.status === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                                    }`}>
                                    {fp.status}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-2">
                                <span className="flex items-center gap-1"><Target size={10} /> Risk Index: {fp.riskScore}</span>
                                <span className={`flex items-center gap-1 ${fp.trend === 'Escalating' ? 'text-red-400' : 'text-blue-400'}`}>
                                    <TrendingUp size={10} /> {fp.trend}
                                </span>
                            </div>
                            <p className="text-[11px] text-gray-500 leading-normal line-clamp-2 italic">"{fp.description}"</p>
                        </div>
                    ))}
                </div>

                {/* ── MIDDLE COLUMN: PREDICTION PANELS ─────────────────────────── */}
                <div className="lg:col-span-8 space-y-8">

                    {/* SCENARIO SIMULATOR (FEATURED) */}
                    <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <RefreshCw size={120} className={`text-blue-500/5 ${simLoading ? 'animate-spin' : ''}`} />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">Scenario Simulation</h2>
                            <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-8">Test Geopolitical Chain Reactions</p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {Object.keys(data.scenarios).map(id => (
                                    <button
                                        key={id}
                                        onClick={() => handleSimulate(id)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-tight transition-all border ${scenario === id
                                            ? 'bg-blue-500 text-white border-blue-500 shadow-xl shadow-blue-500/20'
                                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        {id.replace(/_/g, ' ')}
                                    </button>
                                ))}
                            </div>

                            {simResults && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="space-y-4">
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                            <div className="text-[10px] text-blue-400 font-bold uppercase mb-2">Military Impact</div>
                                            <p className="text-xs text-gray-300 leading-relaxed font-medium">{simResults.military_consequences}</p>
                                        </div>
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                            <div className="text-[10px] text-blue-400 font-bold uppercase mb-2">Market Reaction</div>
                                            <p className="text-xs text-gray-300 leading-relaxed font-medium">{simResults.economic_impact}</p>
                                        </div>
                                    </div>
                                    <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20 flex flex-col justify-center items-center text-center">
                                        <div className="text-[10px] text-red-500 font-bold uppercase mb-2">Escalation Probability</div>
                                        <div className="text-5xl font-black text-white mb-2">{simResults.escalation_probability}%</div>
                                        <div className="text-[9px] text-red-400 font-bold uppercase tracking-[0.2em]">Extreme Risk Level</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TWO COLUMN GRID FOR OTHER MODULES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Conflict Escalator */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <AlertTriangle size={14} className="text-orange-500" /> Conflict Escalator
                            </h3>
                            <div className="text-center mb-6">
                                <div className="text-4xl font-black text-orange-500">{predictions.conflict.escalation}%</div>
                                <div className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mt-1">Escalation Prob. (6mo)</div>
                            </div>
                            <div className="space-y-3">
                                {predictions.conflict.drivers.map(d => (
                                    <div key={d} className="flex items-center justify-between text-[11px] bg-white/5 rounded-lg px-3 py-2">
                                        <span className="text-gray-400 font-medium">{d}</span>
                                        <span className="text-orange-400 font-black">HIGH IMPACT</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Power Transition Forecast */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Globe size={14} className="text-blue-500" /> Power Index 2040
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(powerForecast["2040"]).slice(0, 4).map(([name, scores]) => (
                                    <div key={name}>
                                        <div className="flex justify-between text-[10px] font-bold uppercase mb-1.5">
                                            <span className="text-white">{name}</span>
                                            <span className="text-blue-400">{scores.influence}% Projected Influence</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${scores.influence}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI TRANSPARENCY PANEL */}
                    <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-3xl p-8 text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 mb-4">
                            <Info size={18} className="text-gray-500" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Model Transparency Panel</h3>
                        <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed mb-6">
                            Predictions are generated using a multi-agent adversarial network processing 4.2M distinct data points including satellite imagery,
                            diplomatic cables, and market volatility indexes.
                        </p>
                        <div className="grid grid-cols-3 gap-10 max-w-sm mx-auto">
                            <div>
                                <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Confidence</div>
                                <div className="text-sm font-black text-green-500">HIGH</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Data Recency</div>
                                <div className="text-sm font-black text-white">4m ago</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Model ID</div>
                                <div className="text-sm font-black text-white">v8.2-PRO</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ALERT CTA */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="bg-red-500 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Stay Ahead of Global Hazards</h2>
                        <p className="text-red-100 text-sm font-medium">Subscribe to secure real-time intelligence alerts for your AOI.</p>
                    </div>
                    <button className="relative z-10 bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                        Activate Secure Alerts
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PredictionEngine;
