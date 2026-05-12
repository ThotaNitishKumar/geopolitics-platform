import { useState, useEffect, useMemo, useRef } from 'react';
import api from '../services/api';
import {
    BarChart3, Shield, Globe, TrendingUp, DollarSign, Zap, Search,
    ArrowLeftRight, Trophy, Cpu, Satellite, Users, MapPin, Landmark,
    Swords, Anchor, Bomb, Plane, Target, ChevronDown, Share2,
    Download, Link, Star, AlertTriangle, CheckCircle, Activity,
    Building2, Leaf, Radio, Eye
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement, RadialLinearScale,
    PointElement, LineElement, Filler, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Bar, Radar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, BarElement, RadialLinearScale,
    PointElement, LineElement, Filler, Tooltip, Legend, ArcElement
);

// ─── Colour palette ─────────────────────────────────────────────────────────
const CA_COLOR = '#3b82f6';   // blue-500
const CB_COLOR = '#ef4444';   // red-500
const CA_BG = 'rgba(59,130,246,0.15)';
const CB_BG = 'rgba(239,68,68,0.15)';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const parseNum = (str) => {
    if (!str && str !== 0) return 0;
    if (typeof str === 'number') return str;
    const s = String(str).replace(/,/g, '').trim();
    const m = s.match(/([\d.]+)\s*(Trillion|Billion|Million|K)?/i);
    if (!m) return parseFloat(s) || 0;
    const n = parseFloat(m[1]);
    const unit = (m[2] || '').toLowerCase();
    if (unit === 'trillion') return n * 1e12;
    if (unit === 'billion') return n * 1e9;
    if (unit === 'million') return n * 1e6;
    if (unit === 'k') return n * 1e3;
    return n;
};

const fmt = (n) => {
    if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    return n.toLocaleString();
};

const winner = (valA, valB, lowerIsBetter = false) => {
    const a = parseNum(valA), b = parseNum(valB);
    if (a === b) return 'tie';
    return lowerIsBetter ? (a < b ? 'A' : 'B') : (a > b ? 'A' : 'B');
};

const chartOpts = (title) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#0a192f',
            borderColor: '#1e3a5f',
            borderWidth: 1,
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
        },
    },
    scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } },
        y: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } },
    },
});

const radarOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        r: {
            ticks: { display: false },
            grid: { color: '#1e293b' },
            pointLabels: { color: '#94a3b8', font: { size: 11 } },
            min: 0, max: 100,
        },
    },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionTitle = ({ icon: Icon, label, color = 'text-blue-400' }) => (
    <div className={`flex items-center gap-3 mb-6 pb-3 border-b border-white/10`}>
        <div className={`p-2 rounded-lg bg-white/5`}>
            <Icon size={18} className={color} />
        </div>
        <h2 className={`text-sm font-bold uppercase tracking-[0.25em] ${color}`}>{label}</h2>
    </div>
);

const ScoreBar = ({ label, scoreA, scoreB, nameA, nameB }) => {
    const total = scoreA + scoreB || 1;
    const pA = Math.round((scoreA / total) * 100);
    const pB = 100 - pA;
    const w = winner(scoreA, scoreB);
    return (
        <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span className={w === 'A' ? 'text-blue-400 font-bold' : ''}>{nameA}</span>
                <span className="text-gray-500">{label}</span>
                <span className={w === 'B' ? 'text-red-400 font-bold' : ''}>{nameB}</span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-gray-800">
                <div className="bg-blue-500 transition-all duration-700" style={{ width: `${pA}%` }} />
                <div className="bg-red-500 transition-all duration-700" style={{ width: `${pB}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-600 mt-0.5">
                <span>{pA}%</span><span>{pB}%</span>
            </div>
        </div>
    );
};

const StatCard = ({ label, valA, valB, icon: Icon, lowerBetter = false }) => {
    const w = winner(valA, valB, lowerBetter);
    return (
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] transition-colors">
            <div className="flex items-center gap-2 mb-3">
                <Icon size={14} className="text-gray-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className={`text-sm font-bold ${w === 'A' ? 'text-blue-400' : 'text-gray-300'}`}>
                    {w === 'A' && <span className="text-[10px] mr-1">🏆</span>}{valA || 'N/A'}
                </div>
                <div className={`text-sm font-bold text-right ${w === 'B' ? 'text-red-400' : 'text-gray-300'}`}>
                    {valB || 'N/A'}{w === 'B' && <span className="text-[10px] ml-1">🏆</span>}
                </div>
            </div>
        </div>
    );
};

const WinnerBadge = ({ label, winner: w, nameA, nameB }) => (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 text-center">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{label}</div>
        <div className={`text-lg font-black ${w === 'A' ? 'text-blue-400' : w === 'B' ? 'text-red-400' : 'text-yellow-400'}`}>
            {w === 'tie' ? '🤝 TIE' : w === 'A' ? `🏆 ${nameA}` : `🏆 ${nameB}`}
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Comparison = () => {
    const [stats, setStats] = useState({});
    const [countryA, setCountryA] = useState('India');
    const [countryB, setCountryB] = useState('China');
    const [searchA, setSearchA] = useState('');
    const [searchB, setSearchB] = useState('');
    const [showDropA, setShowDropA] = useState(false);
    const [showDropB, setShowDropB] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('military');
    const [copied, setCopied] = useState(false);

    const dropARef = useRef(null);
    const dropBRef = useRef(null);

    useEffect(() => {
        const fetchStats = async () => {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            console.log('Comparison: Fetching stats from:', apiBase + '/stats');
            try {
                const { data } = await api.get('/stats');
                console.log('Comparison: Data received, keys:', Object.keys(data).length);
                setStats(data);
                const keys = Object.keys(data);
                if (keys.length >= 2) {
                    setCountryA(keys.includes('India') ? 'India' : keys[0]);
                    setCountryB(keys.includes('China') ? 'China' : keys[1]);
                }
            } catch (e) {
                console.error('Comparison: Fetch error:', e);
                setStats({});
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropARef.current && !dropARef.current.contains(e.target)) setShowDropA(false);
            if (dropBRef.current && !dropBRef.current.contains(e.target)) setShowDropB(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const countries = useMemo(() => Object.keys(stats), [stats]);

    const getAliases = (name) => {
        const aliases = {
            'United States': ['usa', 'us', 'america', 'united states of america'],
            'United Kingdom': ['uk', 'britain', 'gb', 'england'],
            'United Arab Emirates': ['uae', 'dubai', 'abu dhabi'],
            'Russian Federation': ['russia', 'ru'],
            'China': ['prc'],
            'South Korea': ['rok', 'republic of korea'],
            'North Korea': ['dprk'],
        };
        return aliases[name] || [];
    };

    const isMatch = (countryName, query) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;
        const name = countryName.toLowerCase();
        if (name.includes(q)) return true;
        const aliases = getAliases(countryName);
        return aliases.some(a => a.toLowerCase().includes(q));
    };

    const filteredA = useMemo(() => {
        return countries.filter(c => isMatch(c, searchA));
    }, [countries, searchA]);

    const filteredB = useMemo(() => {
        return countries.filter(c => isMatch(c, searchB));
    }, [countries, searchB]);

    const swap = () => { setCountryA(countryB); setCountryB(countryA); };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href + `?a=${countryA}&b=${countryB}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020c1b] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 text-sm tracking-widest uppercase">Loading Intelligence Data...</p>
            </div>
        </div>
    );

    const dA = stats[countryA] || {};
    const dB = stats[countryB] || {};

    // ── Computed scores ──────────────────────────────────────────────────────
    const milScoreA = Math.max(0, 100 - (dA.globalFirepowerRank || dA.militaryPower || 50) * 3);
    const milScoreB = Math.max(0, 100 - (dB.globalFirepowerRank || dB.militaryPower || 50) * 3);
    const ecoScoreA = Math.min(100, Math.round(parseNum(dA.gdp) / 3e11));
    const ecoScoreB = Math.min(100, Math.round(parseNum(dB.gdp) / 3e11));
    const infScoreA = dA.globalInfluenceScore || 50;
    const infScoreB = dB.globalInfluenceScore || 50;
    const techScoreA = Math.max(0, 100 - (dA.aiDevelopmentRank || 20) * 3);
    const techScoreB = Math.max(0, 100 - (dB.aiDevelopmentRank || 20) * 3);
    const growthA = parseFloat(dA.gdpGrowth) || 0;
    const growthB = parseFloat(dB.gdpGrowth) || 0;

    // ── Military bar chart ───────────────────────────────────────────────────
    const milBarData = {
        labels: ['Active Personnel', 'Tanks', 'Fighter Aircraft', 'Naval Ships', 'Nuclear Warheads'],
        datasets: [
            {
                label: countryA,
                data: [
                    parseNum(dA.activePersonnel), parseNum(dA.tanks),
                    parseNum(dA.fighterAircraft), parseNum(dA.navalShips),
                    parseNum(dA.nuclearWarheads),
                ],
                backgroundColor: CA_COLOR,
                borderRadius: 4,
            },
            {
                label: countryB,
                data: [
                    parseNum(dB.activePersonnel), parseNum(dB.tanks),
                    parseNum(dB.fighterAircraft), parseNum(dB.navalShips),
                    parseNum(dB.nuclearWarheads),
                ],
                backgroundColor: CB_COLOR,
                borderRadius: 4,
            },
        ],
    };

    // ── Military radar ───────────────────────────────────────────────────────
    const milRadarData = {
        labels: ['Personnel', 'Armor', 'Air Power', 'Naval', 'Nuclear', 'Budget'],
        datasets: [
            {
                label: countryA,
                data: [
                    Math.min(100, parseNum(dA.activePersonnel) / 20000),
                    Math.min(100, parseNum(dA.tanks) / 60),
                    Math.min(100, parseNum(dA.fighterAircraft) / 20),
                    Math.min(100, parseNum(dA.navalShips) / 5),
                    Math.min(100, parseNum(dA.nuclearWarheads) / 60),
                    Math.min(100, parseNum(dA.defenseBudget) / 9e9),
                ],
                borderColor: CA_COLOR, backgroundColor: CA_BG, borderWidth: 2, pointRadius: 3,
            },
            {
                label: countryB,
                data: [
                    Math.min(100, parseNum(dB.activePersonnel) / 20000),
                    Math.min(100, parseNum(dB.tanks) / 60),
                    Math.min(100, parseNum(dB.fighterAircraft) / 20),
                    Math.min(100, parseNum(dB.navalShips) / 5),
                    Math.min(100, parseNum(dB.nuclearWarheads) / 60),
                    Math.min(100, parseNum(dB.defenseBudget) / 9e9),
                ],
                borderColor: CB_COLOR, backgroundColor: CB_BG, borderWidth: 2, pointRadius: 3,
            },
        ],
    };

    // ── Economic bar chart ───────────────────────────────────────────────────
    const ecoBarData = {
        labels: ['GDP (T USD)', 'Defense Budget (B)', 'Foreign Reserves (B)'],
        datasets: [
            {
                label: countryA,
                data: [
                    parseNum(dA.gdp) / 1e12,
                    parseNum(dA.defenseBudget) / 1e9,
                    parseNum(dA.foreignReserves) / 1e9,
                ],
                backgroundColor: CA_COLOR, borderRadius: 4,
            },
            {
                label: countryB,
                data: [
                    parseNum(dB.gdp) / 1e12,
                    parseNum(dB.defenseBudget) / 1e9,
                    parseNum(dB.foreignReserves) / 1e9,
                ],
                backgroundColor: CB_COLOR, borderRadius: 4,
            },
        ],
    };

    // ── GDP trend (simulated) ────────────────────────────────────────────────
    const baseA = parseNum(dA.gdp) / 1e12;
    const baseB = parseNum(dB.gdp) / 1e12;
    const gA = (parseFloat(dA.gdpGrowth) || 2) / 100;
    const gB = (parseFloat(dB.gdpGrowth) || 2) / 100;
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    const trendA = years.map((_, i) => +(baseA * Math.pow(1 + gA, i - 9)).toFixed(2));
    const trendB = years.map((_, i) => +(baseB * Math.pow(1 + gB, i - 9)).toFixed(2));
    const trendData = {
        labels: years,
        datasets: [
            { label: countryA, data: trendA, borderColor: CA_COLOR, backgroundColor: CA_BG, fill: true, tension: 0.4, pointRadius: 3 },
            { label: countryB, data: trendB, borderColor: CB_COLOR, backgroundColor: CB_BG, fill: true, tension: 0.4, pointRadius: 3 },
        ],
    };
    const trendOpts = {
        ...chartOpts('GDP Trend'),
        plugins: {
            ...chartOpts('GDP Trend').plugins,
            legend: { display: true, labels: { color: '#94a3b8', boxWidth: 12 } },
        },
    };

    // ── Future projection trend ──────────────────────────────────────────────
    const projYears = [2024, 2026, 2028, 2030, 2032, 2035];
    const projA = projYears.map((_, i) => +(baseA * Math.pow(1 + gA, i)).toFixed(2));
    const projB = projYears.map((_, i) => +(baseB * Math.pow(1 + gB, i)).toFixed(2));
    const projData = {
        labels: projYears,
        datasets: [
            { label: countryA, data: projA, borderColor: CA_COLOR, backgroundColor: CA_BG, fill: true, tension: 0.4, borderDash: [5, 5], pointRadius: 4 },
            { label: countryB, data: projB, borderColor: CB_COLOR, backgroundColor: CB_BG, fill: true, tension: 0.4, borderDash: [5, 5], pointRadius: 4 },
        ],
    };

    // ── Overall winner ───────────────────────────────────────────────────────
    const totalA = milScoreA + ecoScoreA + infScoreA + techScoreA + growthA * 5;
    const totalB = milScoreB + ecoScoreB + infScoreB + techScoreB + growthB * 5;
    const overallWinner = totalA > totalB ? countryA : totalB > totalA ? countryB : 'Tie';

    const sections = ['military', 'economic', 'tech', 'influence', 'alliances', 'projections'];

    return (
        <div className="min-h-screen bg-[#020c1b] text-gray-100">
            {Object.keys(stats).length === 0 && !loading && (
                <div className="bg-red-500/20 border-b border-red-500/50 p-4 text-center">
                    <p className="text-red-400 text-sm font-bold flex items-center justify-center gap-2">
                        <AlertTriangle size={16} />
                        Communication Error: Failed to load global intelligence data from backend.
                        Please ensure the server is running on port 5000.
                    </p>
                </div>
            )}

            {/* ── HERO / SELECTOR ─────────────────────────────────────────────── */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0a192f] to-[#020c1b] border-b border-white/[0.06]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
                <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs text-blue-400 font-bold uppercase tracking-widest mb-6">
                            <Activity size={12} /> Intelligence Dashboard
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                            Global Power{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                                Comparison
                            </span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Compare military strength, economic power, global influence, and future projections across world powers.
                        </p>
                    </div>

                    {/* Selector Row */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 max-w-3xl mx-auto">
                        {/* Country A */}
                        <div className="flex-1 relative" ref={dropARef}>
                            <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Country A</label>
                            <button
                                onClick={() => { setShowDropA(!showDropA); setShowDropB(false); }}
                                className="w-full flex items-center justify-between bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/60 rounded-xl px-4 py-3 text-left transition-all"
                            >
                                <span className="font-bold text-white">
                                    {dA.flag && <span className="mr-2">{dA.flag}</span>}{countryA || 'Select Country A'}
                                </span>
                                <ChevronDown size={16} className="text-blue-400" />
                            </button>
                            {showDropA && (
                                <div className="absolute top-full mt-2 w-full bg-[#0a192f] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                                    <div className="p-2 border-b border-white/10">
                                        <input
                                            autoFocus
                                            value={searchA}
                                            onChange={e => setSearchA(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && filteredA.length > 0) {
                                                    setCountryA(filteredA[0]);
                                                    setShowDropA(false);
                                                    setSearchA('');
                                                }
                                            }}
                                            placeholder="Search country..."
                                            className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none"
                                        />
                                    </div>
                                    <div className="p-2 border-b border-white/10 flex justify-between items-center bg-blue-500/5">
                                        <span className="text-[9px] font-bold text-blue-400/60 uppercase tracking-widest">{filteredA.length} Countries Available</span>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                        {filteredA.length > 0 ? (
                                            filteredA.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => { setCountryA(c); setShowDropA(false); setSearchA(''); }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-500/10 transition-colors ${countryA === c ? 'text-blue-400 font-bold bg-blue-500/5' : 'text-gray-300'}`}
                                                >
                                                    {stats[c]?.flag && <span className="mr-2">{stats[c].flag}</span>}{c}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-8 text-center text-gray-500 text-xs italic">
                                                No intelligence data found for "{searchA}"
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Swap */}
                        <button
                            onClick={swap}
                            className="flex-shrink-0 self-end mb-0.5 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-110 active:scale-95"
                            title="Swap countries"
                        >
                            <ArrowLeftRight size={20} className="text-gray-400" />
                        </button>

                        {/* Country B */}
                        <div className="flex-1 relative" ref={dropBRef}>
                            <label className="block text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">Country B</label>
                            <button
                                onClick={() => { setShowDropB(!showDropB); setShowDropA(false); }}
                                className="w-full flex items-center justify-between bg-red-500/10 border border-red-500/30 hover:border-red-500/60 rounded-xl px-4 py-3 text-left transition-all"
                            >
                                <span className="font-bold text-white">
                                    {dB.flag && <span className="mr-2">{dB.flag}</span>}{countryB || 'Select Country B'}
                                </span>
                                <ChevronDown size={16} className="text-red-400" />
                            </button>
                            {showDropB && (
                                <div className="absolute top-full mt-2 w-full bg-[#0a192f] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                                    <div className="p-2 border-b border-white/10">
                                        <input
                                            autoFocus
                                            value={searchB}
                                            onChange={e => setSearchB(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && filteredB.length > 0) {
                                                    setCountryB(filteredB[0]);
                                                    setShowDropB(false);
                                                    setSearchB('');
                                                }
                                            }}
                                            placeholder="Search country..."
                                            className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none"
                                        />
                                    </div>
                                    <div className="p-2 border-b border-white/10 flex justify-between items-center bg-red-500/5">
                                        <span className="text-[9px] font-bold text-red-400/60 uppercase tracking-widest">{filteredB.length} Countries Available</span>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                        {filteredB.length > 0 ? (
                                            filteredB.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => { setCountryB(c); setShowDropB(false); setSearchB(''); }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-red-500/10 transition-colors ${countryB === c ? 'text-red-400 font-bold bg-red-500/5' : 'text-gray-300'}`}
                                                >
                                                    {stats[c]?.flag && <span className="mr-2">{stats[c].flag}</span>}{c}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-8 text-center text-gray-500 text-xs italic">
                                                No intelligence data found for "{searchB}"
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

                {/* ── SECTION 2: SCORECARD ──────────────────────────────────────── */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                    <SectionTitle icon={Trophy} label="Quick Summary Scorecard" color="text-yellow-400" />
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                        <WinnerBadge label="Military" winner={milScoreA > milScoreB ? 'A' : milScoreA < milScoreB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                        <WinnerBadge label="Economic" winner={ecoScoreA > ecoScoreB ? 'A' : ecoScoreA < ecoScoreB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                        <WinnerBadge label="Influence" winner={infScoreA > infScoreB ? 'A' : infScoreA < infScoreB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                        <WinnerBadge label="Technology" winner={techScoreA > techScoreB ? 'A' : techScoreA < techScoreB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                        <WinnerBadge label="Growth" winner={growthA > growthB ? 'A' : growthA < growthB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                    </div>
                    <div className="space-y-3">
                        <ScoreBar label="Military Power" scoreA={milScoreA} scoreB={milScoreB} nameA={countryA} nameB={countryB} />
                        <ScoreBar label="Economic Power" scoreA={ecoScoreA} scoreB={ecoScoreB} nameA={countryA} nameB={countryB} />
                        <ScoreBar label="Global Influence" scoreA={infScoreA} scoreB={infScoreB} nameA={countryA} nameB={countryB} />
                        <ScoreBar label="Technology" scoreA={techScoreA} scoreB={techScoreB} nameA={countryA} nameB={countryB} />
                    </div>
                </div>

                {/* ── SECTION 3: COUNTRY SNAPSHOT ───────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[{ data: dA, name: countryA, color: 'blue' }, { data: dB, name: countryB, color: 'red' }].map(({ data: d, name, color }) => (
                        <div key={name} className={`bg-white/[0.03] border border-${color}-500/20 rounded-2xl p-6`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`text-6xl`}>{d.flag || '🌍'}</div>
                                <div>
                                    <h3 className={`text-2xl font-black text-${color}-400`}>{name}</h3>
                                    <p className="text-gray-500 text-sm">{d.region || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Capital', val: d.capital, icon: MapPin },
                                    { label: 'Population', val: d.population, icon: Users },
                                    { label: 'GDP', val: d.gdp, icon: DollarSign },
                                    { label: 'GDP Growth', val: d.gdpGrowth, icon: TrendingUp },
                                    { label: 'Currency', val: d.currency, icon: Landmark },
                                    { label: 'Government', val: d.government, icon: Building2 },
                                ].map(({ label, val, icon: Icon }) => (
                                    <div key={label} className="bg-white/[0.03] rounded-xl p-3">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Icon size={11} className="text-gray-600" />
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
                                        </div>
                                        <div className="text-sm font-bold text-gray-200">{val || 'N/A'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── SECTION NAV ───────────────────────────────────────────────── */}
                <div className="flex flex-wrap gap-2">
                    {sections.map(s => (
                        <button
                            key={s}
                            onClick={() => setActiveSection(s)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeSection === s
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* ── SECTION 4: MILITARY ───────────────────────────────────────── */}
                {activeSection === 'military' && (
                    <div className="space-y-6">
                        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                            <SectionTitle icon={Shield} label="Military Comparison Dashboard" color="text-red-400" />

                            {/* Key stats grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                                <StatCard label="Active Personnel" valA={dA.activePersonnel} valB={dB.activePersonnel} icon={Users} />
                                <StatCard label="Reserve Personnel" valA={dA.reservePersonnel} valB={dB.reservePersonnel} icon={Users} />
                                <StatCard label="Tanks" valA={dA.tanks} valB={dB.tanks} icon={Target} />
                                <StatCard label="Fighter Aircraft" valA={dA.fighterAircraft} valB={dB.fighterAircraft} icon={Plane} />
                                <StatCard label="Naval Ships" valA={dA.navalShips} valB={dB.navalShips} icon={Anchor} />
                                <StatCard label="Aircraft Carriers" valA={dA.aircraftCarriers} valB={dB.aircraftCarriers} icon={Anchor} />
                                <StatCard label="Nuclear Warheads" valA={dA.nuclearWarheads} valB={dB.nuclearWarheads} icon={Bomb} />
                                <StatCard label="Defense Budget" valA={dA.defenseBudget} valB={dB.defenseBudget} icon={DollarSign} />
                                <StatCard label="GFP Rank" valA={dA.globalFirepowerRank ? `#${dA.globalFirepowerRank}` : `#${dA.militaryPower}`} valB={dB.globalFirepowerRank ? `#${dB.globalFirepowerRank}` : `#${dB.militaryPower}`} icon={Swords} lowerBetter />
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Force Comparison (Bar)</p>
                                    <div className="h-56">
                                        <Bar data={milBarData} options={{ ...chartOpts('Military'), plugins: { ...chartOpts('Military').plugins, legend: { display: true, labels: { color: '#94a3b8', boxWidth: 12 } } } }} />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Capability Radar</p>
                                    <div className="h-56">
                                        <Radar data={milRadarData} options={radarOpts} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── SECTION 5: ECONOMIC ───────────────────────────────────────── */}
                {activeSection === 'economic' && (
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                        <SectionTitle icon={DollarSign} label="Economic Comparison" color="text-green-400" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                            <StatCard label="GDP (Nominal)" valA={dA.gdp} valB={dB.gdp} icon={DollarSign} />
                            <StatCard label="GDP (PPP)" valA={dA.gdpPPP} valB={dB.gdpPPP} icon={DollarSign} />
                            <StatCard label="GDP Growth" valA={dA.gdpGrowth} valB={dB.gdpGrowth} icon={TrendingUp} />
                            <StatCard label="Inflation" valA={dA.inflation} valB={dB.inflation} icon={Activity} lowerBetter />
                            <StatCard label="Foreign Reserves" valA={dA.foreignReserves} valB={dB.foreignReserves} icon={Landmark} />
                            <StatCard label="Debt to GDP" valA={dA.debtToGDP} valB={dB.debtToGDP} icon={AlertTriangle} lowerBetter />
                            <StatCard label="Prime Export" valA={dA.primeExport} valB={dB.primeExport} icon={Globe} />
                            <StatCard label="Major Industries" valA={dA.majorIndustries} valB={dB.majorIndustries} icon={Building2} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Economic Metrics (Bar)</p>
                                <div className="h-56">
                                    <Bar data={ecoBarData} options={{ ...chartOpts('Economic'), plugins: { ...chartOpts('Economic').plugins, legend: { display: true, labels: { color: '#94a3b8', boxWidth: 12 } } } }} />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">GDP Trend (10 Years)</p>
                                <div className="h-56">
                                    <Line data={trendData} options={trendOpts} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── SECTION 6: TECHNOLOGY ─────────────────────────────────────── */}
                {activeSection === 'tech' && (
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                        <SectionTitle icon={Cpu} label="Technology & Space Power" color="text-purple-400" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <StatCard label="Tech Companies" valA={dA.techCompanies} valB={dB.techCompanies} icon={Cpu} />
                            <StatCard label="Semiconductor Capability" valA={dA.semiconductorCap} valB={dB.semiconductorCap} icon={Zap} />
                            <StatCard label="AI Development Rank" valA={dA.aiDevelopmentRank ? `#${dA.aiDevelopmentRank}` : 'N/A'} valB={dB.aiDevelopmentRank ? `#${dB.aiDevelopmentRank}` : 'N/A'} icon={Activity} lowerBetter />
                            <StatCard label="Space Missions" valA={dA.spaceMissions} valB={dB.spaceMissions} icon={Satellite} />
                            <StatCard label="Satellites in Orbit" valA={dA.satellites} valB={dB.satellites} icon={Radio} />
                            <StatCard label="Internet Penetration" valA={dA.internetPenetration} valB={dB.internetPenetration} icon={Globe} />
                            <StatCard label="R&D Spending" valA={dA.rdSpending} valB={dB.rdSpending} icon={TrendingUp} />
                        </div>
                    </div>
                )}

                {/* ── SECTION 7: INFLUENCE ──────────────────────────────────────── */}
                {activeSection === 'influence' && (
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                        <SectionTitle icon={Globe} label="Global Influence Index" color="text-cyan-400" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                            <StatCard label="Soft Power Rank" valA={dA.softPowerRank ? `#${dA.softPowerRank}` : 'N/A'} valB={dB.softPowerRank ? `#${dB.softPowerRank}` : 'N/A'} icon={Star} lowerBetter />
                            <StatCard label="Diplomatic Missions" valA={dA.diplomaticMissions} valB={dB.diplomaticMissions} icon={Globe} />
                            <StatCard label="UN Influence" valA={dA.unInfluence} valB={dB.unInfluence} icon={Landmark} />
                            <StatCard label="Foreign Aid" valA={dA.foreignAid} valB={dB.foreignAid} icon={DollarSign} />
                            <StatCard label="Cultural Influence" valA={dA.culturalInfluence} valB={dB.culturalInfluence} icon={Eye} />
                        </div>
                        {/* Combined Influence Score */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {[{ name: countryA, score: infScoreA, color: 'blue' }, { name: countryB, score: infScoreB, color: 'red' }].map(({ name, score, color }) => (
                                <div key={name} className={`bg-${color}-500/10 border border-${color}-500/20 rounded-xl p-6 text-center`}>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Global Influence Score</div>
                                    <div className={`text-5xl font-black text-${color}-400`}>{score}</div>
                                    <div className="text-sm text-gray-400 mt-1">{name}</div>
                                    <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className={`h-full bg-${color}-500 rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── SECTION 8: ALLIANCES ──────────────────────────────────────── */}
                {activeSection === 'alliances' && (
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                        <SectionTitle icon={Globe} label="Alliances & Geopolitics" color="text-orange-400" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[{ data: dA, name: countryA, color: 'blue' }, { data: dB, name: countryB, color: 'red' }].map(({ data: d, name, color }) => (
                                <div key={name} className={`bg-${color}-500/5 border border-${color}-500/20 rounded-xl p-5`}>
                                    <h3 className={`text-${color}-400 font-bold mb-4 flex items-center gap-2`}>
                                        {d.flag} {name}
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Alliances</div>
                                            <div className="flex flex-wrap gap-2">
                                                {(d.alliances || [d.strategicAlliance]).filter(Boolean).map(a => (
                                                    <span key={a} className={`px-3 py-1 bg-${color}-500/10 border border-${color}-500/20 rounded-full text-xs text-${color}-300 font-medium`}>{a}</span>
                                                ))}
                                            </div>
                                        </div>
                                        {d.rivals?.length > 0 && (
                                            <div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Strategic Rivals</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {d.rivals.map(r => (
                                                        <span key={r} className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-300 font-medium">{r}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Primary Alliance</div>
                                            <div className="text-sm font-bold text-gray-200">{d.strategicAlliance || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── SECTION 9: PROJECTIONS ────────────────────────────────────── */}
                {activeSection === 'projections' && (
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                        <SectionTitle icon={TrendingUp} label="Future Projections — 2035 AI Forecast" color="text-emerald-400" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {[{ data: dA, name: countryA, color: 'blue' }, { data: dB, name: countryB, color: 'red' }].map(({ data: d, name, color }) => {
                                const p = d.projection2035 || {};
                                return (
                                    <div key={name} className={`bg-${color}-500/5 border border-${color}-500/20 rounded-xl p-5`}>
                                        <h3 className={`text-${color}-400 font-bold mb-4`}>{d.flag} {name} — 2035 Outlook</h3>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Projected GDP Rank', val: p.gdpRank ? `#${p.gdpRank}` : 'N/A', icon: TrendingUp },
                                                { label: 'Military Rank', val: p.militaryRank ? `#${p.militaryRank}` : 'N/A', icon: Shield },
                                                { label: 'Population', val: p.population || 'N/A', icon: Users },
                                                { label: 'Climate Risk', val: p.climateRisk || 'N/A', icon: Leaf },
                                                { label: 'Tech Growth', val: p.techGrowth || 'N/A', icon: Cpu },
                                            ].map(({ label, val, icon: Icon }) => (
                                                <div key={label} className="flex items-center justify-between py-2 border-b border-white/5">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Icon size={12} />{label}
                                                    </div>
                                                    <div className="text-sm font-bold text-gray-200">{val}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">GDP Projection to 2035 (Trillion USD)</p>
                            <div className="h-64">
                                <Line data={projData} options={{ ...trendOpts, plugins: { ...trendOpts.plugins, legend: { display: true, labels: { color: '#94a3b8', boxWidth: 12 } } } }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* ── SECTION 10: WINNER VERDICT ────────────────────────────────── */}
                <div className="bg-gradient-to-br from-[#0a192f] to-[#020c1b] border border-yellow-500/20 rounded-2xl p-8">
                    <SectionTitle icon={Trophy} label="Overall Verdict" color="text-yellow-400" />
                    <div className="text-center mb-8">
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Overall Global Power Winner</div>
                        <div className="text-4xl font-black text-yellow-400 mb-2">
                            🏆 {overallWinner === 'Tie' ? 'It\'s a Tie!' : overallWinner}
                        </div>
                        <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-4">
                            This verdict is based on a composite score across military capability, economic output, global influence, technological advancement, and projected growth rate. Results reflect current publicly available data and are subject to geopolitical shifts.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <WinnerBadge label="Military" winner={milScoreA > milScoreB ? 'A' : milScoreA < milScoreB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                        <WinnerBadge label="Economic" winner={ecoScoreA > ecoScoreB ? 'A' : ecoScoreA < ecoScoreB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                        <WinnerBadge label="Influence" winner={infScoreA > infScoreB ? 'A' : infScoreA < infScoreB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                        <WinnerBadge label="Future Growth" winner={growthA > growthB ? 'A' : growthA < growthB ? 'B' : 'tie'} nameA={countryA} nameB={countryB} />
                    </div>
                </div>

                {/* ── SECTION 11: SHARE & EXPORT ────────────────────────────────── */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                    <SectionTitle icon={Share2} label="Share & Export" color="text-blue-400" />
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl text-sm text-blue-400 font-medium transition-all"
                        >
                            <Link size={15} />
                            {copied ? 'Link Copied!' : 'Share Comparison Link'}
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 font-medium transition-all"
                        >
                            <Download size={15} /> Download as PDF
                        </button>
                        <button
                            onClick={() => {
                                const embed = `<iframe src="${window.location.href}?a=${countryA}&b=${countryB}" width="100%" height="800" frameborder="0"></iframe>`;
                                navigator.clipboard.writeText(embed);
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 font-medium transition-all"
                        >
                            <BarChart3 size={15} /> Copy Embed Code
                        </button>
                    </div>
                </div>

                {/* Footer note */}
                <div className="text-center text-gray-600 text-xs pb-8 border-t border-white/5 pt-6">
                    <p>Intelligence data aggregated from open-source strategic datasets. Military figures are estimates based on reported fiscal cycles.</p>
                    <p className="mt-1 italic">Projections are subject to real-time geopolitical shifts and policy adjustments.</p>
                </div>

            </div>
        </div>
    );
};

export default Comparison;
