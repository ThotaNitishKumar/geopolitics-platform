import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ShieldAlert, Search, Filter, Globe, Activity, History, Zap } from 'lucide-react';
import GlobalConflictMap from '../components/Conflicts/GlobalConflictMap';
import ConflictCard from '../components/Conflicts/ConflictCard';
import GlobalRiskWidget from '../components/Conflicts/GlobalRiskWidget';
import { motion, AnimatePresence } from 'framer-motion';

const ConflictTracker = () => {
    const navigate = useNavigate();
    const [conflicts, setConflicts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        region: '',
        type: '',
        riskLevel: '',
        isHistorical: false
    });

    const fetchConflicts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (filters.region) params.append('region', filters.region);
            if (filters.type) params.append('type', filters.type);
            if (filters.riskLevel) params.append('riskLevel', filters.riskLevel);
            if (filters.isHistorical) params.append('isHistorical', 'true');

            const { data } = await api.get(`/conflicts?${params.toString()}`);
            setConflicts(data);
        } catch (error) {
            console.error('Error fetching intelligence:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConflicts();
    }, [filters, search]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 p-6 md:p-10">
            {/* Header section with Search */}
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
                <div className="border-l-4 border-geo-red pl-6">
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic flex items-center gap-3">
                        <ShieldAlert className="text-geo-red" size={40} />
                        Global Conflict <span className="text-geo-red">Intelligence</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 font-mono uppercase tracking-[0.2em]">Strategic Monitoring Dashboard | 24/7 Intelligence Flow</p>
                </div>

                <div className="relative w-full xl:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-geo-red transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search regions, actors, or conflicts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-geo-navy border border-gray-800 rounded-xl py-4 pl-12 pr-6 text-sm focus:border-geo-red focus:ring-1 focus:ring-geo-red outline-none transition-all placeholder-gray-600 shadow-2xl"
                    />
                </div>
            </header>

            {/* Top Level Intelligence - Map & Risk */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-12">
                <div className="xl:col-span-3">
                    <GlobalConflictMap conflicts={conflicts} onMarkerClick={(c) => navigate(`/conflicts/${c._id}`)} />
                </div>
                <div className="xl:col-span-1">
                    <GlobalRiskWidget conflicts={conflicts} />
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-geo-navy border border-gray-800 rounded-2xl p-6 mb-12 flex flex-wrap gap-6 items-center shadow-xl">
                <div className="flex items-center gap-3 text-gray-400 mr-4">
                    <Filter size={18} />
                    <span className="text-sm font-bold uppercase tracking-widest">Filters</span>
                </div>

                <select
                    name="region"
                    value={filters.region}
                    onChange={handleFilterChange}
                    className="bg-black/40 border border-gray-800 rounded-lg px-4 py-2 text-xs focus:border-geo-red outline-none transition-colors"
                >
                    <option value="">All Regions</option>
                    <option value="Eastern Europe">Eastern Europe</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Indo-Pacific">Indo-Pacific</option>
                    <option value="South Asia">South Asia</option>
                </select>

                <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="bg-black/40 border border-gray-800 rounded-lg px-4 py-2 text-xs focus:border-geo-red outline-none transition-colors"
                >
                    <option value="">All Types</option>
                    <option value="War">Full Scale War</option>
                    <option value="Civil War">Civil War</option>
                    <option value="Border Dispute">Border Dispute</option>
                    <option value="Rising Tension">Rising Tension</option>
                </select>

                <select
                    name="riskLevel"
                    value={filters.riskLevel}
                    onChange={handleFilterChange}
                    className="bg-black/40 border border-gray-800 rounded-lg px-4 py-2 text-xs focus:border-geo-red outline-none transition-colors"
                >
                    <option value="">All Risk Levels</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High Risk</option>
                    <option value="Moderate">Moderate</option>
                </select>

                <label className="flex items-center gap-3 cursor-pointer group ml-auto">
                    <input
                        type="checkbox"
                        name="isHistorical"
                        checked={filters.isHistorical}
                        onChange={handleFilterChange}
                        className="w-4 h-4 rounded border-gray-800 bg-black text-geo-red focus:ring-geo-red"
                    />
                    <span className="text-xs font-bold text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-widest flex items-center gap-2">
                        <History size={14} /> Historical Archive
                    </span>
                </label>
            </div>

            {/* Conflicts Content */}
            <div className="space-y-16">

                {/* 1. Active Theatres */}
                {!filters.isHistorical && (
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Activity className="text-geo-red" size={20} />
                                Active Operational Theatres
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {conflicts.filter(c => c.status === 'Active').map(conflict => (
                                <ConflictCard key={conflict._id} conflict={conflict} onClick={(c) => navigate(`/conflicts/${c._id}`)} />
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. Rising Tensions */}
                {!filters.isHistorical && !search && (
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Zap className="text-geo-yellow" size={20} />
                                Rising Tensions & Potential Flashpoints
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-90">
                            {conflicts.filter(c => c.status === 'Escalating').map(conflict => (
                                <ConflictCard key={conflict._id} conflict={conflict} onClick={(c) => navigate(`/conflicts/${c._id}`)} />
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Historical Data Section (if active) */}
                {filters.isHistorical && (
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <History className="text-gray-500" size={20} />
                                Historical Conflict Archive
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {conflicts.map(conflict => (
                                <ConflictCard key={conflict._id} conflict={conflict} onClick={(c) => navigate(`/conflicts/${c._id}`)} />
                            ))}
                        </div>
                    </section>
                )}

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-geo-navy/50 h-80 rounded-xl animate-pulse border border-gray-800"></div>
                        ))}
                    </div>
                )}

                {!loading && conflicts.length === 0 && (
                    <div className="text-center py-20 bg-geo-navy/30 border border-gray-800 border-dashed rounded-3xl">
                        <ShieldAlert className="mx-auto text-gray-700 mb-4" size={48} />
                        <p className="text-gray-500 text-lg italic">No intelligence reports match your current filter parameters.</p>
                        <button
                            onClick={() => { setSearch(''); setFilters({ region: '', type: '', riskLevel: '', isHistorical: false }) }}
                            className="mt-6 text-geo-red text-sm font-bold hover:underline uppercase tracking-widest"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConflictTracker;

