import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { BarChart3, Shield, Globe, TrendingUp, DollarSign, Zap, Search } from 'lucide-react';

const Comparison = () => {
    const [stats, setStats] = useState({});
    const [countryA, setCountryA] = useState('');
    const [countryB, setCountryB] = useState('');
    const [searchA, setSearchA] = useState('');
    const [searchB, setSearchB] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/stats');
                setStats(data);
                const countries = Object.keys(data);
                if (countries.length >= 2) {
                    setCountryA(countries[0]);
                    setCountryB(countries[1]);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const countries = Object.keys(stats);

    const filteredA = useMemo(() =>
        countries.filter(c => c.toLowerCase().includes(searchA.toLowerCase())),
        [countries, searchA]
    );

    const filteredB = useMemo(() =>
        countries.filter(c => c.toLowerCase().includes(searchB.toLowerCase())),
        [countries, searchB]
    );

    if (loading) return <div className="text-center py-20 text-gray-500">Loading Global Metrics...</div>;

    const dataA = stats[countryA];
    const dataB = stats[countryB];

    const StatRow = ({ label, valA, valB, icon: Icon, color }) => (
        <div className="border-b border-gray-800 py-4 hover:bg-white/[0.02] transition-colors rounded px-2">
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <Icon size={14} className={color} /> {label}
            </div>
            <div className="grid grid-cols-2 gap-8">
                <div className="text-lg font-bold text-white tracking-tight">{valA || 'N/A'}</div>
                <div className="text-lg font-bold text-white text-right tracking-tight">{valB || 'N/A'}</div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 p-6 pb-20">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">
                        Strategic <span className="text-geo-red">Comparison</span> Matrix
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Cross-border military and economic capability analysis spanning all major geopolitical powers.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Country A Selection */}
                    <div className="space-y-4 bg-geo-navy/30 p-6 rounded-xl border border-gray-800">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Search size={14} /> Search Primary Country
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Start typing country name..."
                                value={searchA}
                                onChange={(e) => setSearchA(e.target.value)}
                                className="w-full bg-black/40 border border-gray-800 p-3 rounded-lg text-white mb-2 focus:border-geo-red outline-none transition-all placeholder:text-gray-600"
                            />
                            <div className="max-h-32 overflow-y-auto bg-black/60 rounded-lg border border-gray-800 scrollbar-hide">
                                {filteredA.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => { setCountryA(c); setSearchA(''); }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-geo-red/20 transition-colors ${countryA === c ? 'text-geo-red font-bold' : 'text-gray-400'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Country B Selection */}
                    <div className="space-y-4 bg-geo-navy/30 p-6 rounded-xl border border-gray-800">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 justify-end">
                            Search Comparison Country <Search size={14} />
                        </label>
                        <div className="relative text-right">
                            <input
                                type="text"
                                placeholder="Start typing country name..."
                                value={searchB}
                                onChange={(e) => setSearchB(e.target.value)}
                                className="w-full bg-black/40 border border-gray-800 p-3 rounded-lg text-white mb-2 focus:border-geo-red outline-none transition-all text-right placeholder:text-gray-600"
                            />
                            <div className="max-h-32 overflow-y-auto bg-black/60 rounded-lg border border-gray-800 scrollbar-hide text-right">
                                {filteredB.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => { setCountryB(c); setSearchB(''); }}
                                        className={`w-full text-right px-4 py-2 text-sm hover:bg-geo-red/20 transition-colors ${countryB === c ? 'text-geo-red font-bold' : 'text-gray-400'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-geo-navy border border-gray-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="bg-black/60 p-10 border-b border-gray-800 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-geo-red/5 to-transparent pointer-events-none"></div>
                        <div className="z-10">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] mb-2">Primary Entity</div>
                            <div className="text-5xl font-black text-white italic uppercase tracking-tighter">{countryA}</div>
                        </div>
                        <div className="z-10 text-right">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] mb-2 text-right">Comparison Entity</div>
                            <div className="text-5xl font-black text-white italic uppercase tracking-tighter text-right">{countryB}</div>
                        </div>
                    </div>

                    <div className="p-10 space-y-4">
                        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2 border-b border-blue-400/20 pb-2">
                            <DollarSign size={18} /> Economic Indicators
                        </h3>
                        <StatRow label="Nominal GDP" valA={dataA?.gdp} valB={dataB?.gdp} icon={TrendingUp} color="text-green-500" />
                        <StatRow label="Annual GDP Growth" valA={dataA?.gdpGrowth} valB={dataB?.gdpGrowth} icon={TrendingUp} color="text-green-500" />
                        <StatRow label="Current Inflation" valA={dataA?.inflation} valB={dataB?.inflation} icon={TrendingUp} color="text-red-500" />
                        <StatRow label="Strategic Exports" valA={dataA?.primeExport} valB={dataB?.primeExport} icon={Globe} color="text-blue-500" />

                        <div className="py-8"></div>

                        <h3 className="text-sm font-bold text-geo-red uppercase tracking-[0.3em] mb-6 flex items-center gap-2 border-b border-geo-red/20 pb-2">
                            <Shield size={18} /> Military Architecture
                        </h3>
                        <StatRow label="Global Power Index Rank" valA={`#${dataA?.militaryPower}`} valB={`#${dataB?.militaryPower}`} icon={Zap} color="text-geo-yellow" />
                        <StatRow label="Defense Expenditure" valA={dataA?.defenseBudget} valB={dataB?.defenseBudget} icon={DollarSign} color="text-green-500" />
                        <StatRow label="Active Combat Personnel" valA={dataA?.activePersonnel} valB={dataB?.activePersonnel} icon={Globe} color="text-geo-red" />
                        <StatRow label="Nuclear Deterrent Capability" valA={dataA?.nuclearWarheads} valB={dataB?.nuclearWarheads} icon={Shield} color="text-red-500" />
                        <StatRow label="Naval Power (Aircraft Carriers)" valA={dataA?.aircraftCarriers} valB={dataB?.aircraftCarriers} icon={Shield} color="text-blue-500" />
                        <StatRow label="Key Strategic Alliance" valA={dataA?.strategicAlliance} valB={dataB?.strategicAlliance} icon={Globe} color="text-white" />
                    </div>
                </div>

                <div className="mt-12 text-center text-gray-500 text-sm max-w-3xl mx-auto border-t border-gray-800 pt-8">
                    <p className="mb-4">Intelligence Note: Data is aggregated from multiple open-source strategic intelligence datasets. Figures for military personnel and defense budgets are estimated based on reported fiscal cycles.</p>
                    <p className="italic">Projections are subject to real-time geopolitical shifts and policy adjustments.</p>
                </div>
            </div>
        </div>
    );
};

export default Comparison;
