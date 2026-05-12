import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    ChevronDown,
    AlertCircle,
    Layers,
    Mail,
    ArrowRight,
    Loader2,
    Globe,
    Zap,
    Scale,
    Activity,
    ShieldAlert
} from 'lucide-react';
import api from '../services/api';
import ReportCard from '../components/Reports/ReportCard';
import TrendsDashboard from '../components/Reports/TrendsDashboard';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [featuredReport, setFeaturedReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        region: 'Global',
        type: '',
        riskLevel: ''
    });

    const regions = ['Global', 'Asia', 'Europe', 'Middle East', 'Africa', 'Americas'];
    const types = [
        'Conflict Analysis',
        'Military Intelligence',
        'Economic Outlook',
        'Strategic Forecast',
        'Sanctions Report',
        'Energy & Resources',
        'Technology & Cyber Warfare'
    ];
    const riskLevels = ['Low', 'Medium', 'High', 'Critical'];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [reportsRes, featuredRes] = await Promise.all([
                    api.get('/reports', { params: { ...filters, search } }),
                    api.get('/reports/featured')
                ]);
                setReports(reportsRes.data);
                setFeaturedReport(featuredRes.data);
            } catch (err) {
                console.error('Error fetching reports:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [filters, search]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-[#020c1b] text-gray-100 pb-20">
            {/* ── HERO HEADER ────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0a192f] to-[#020c1b] border-b border-white/[0.06] pt-16 pb-24">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_60%)]" />
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-8">
                        <Layers size={14} /> Intelligence Briefing Center
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-tight italic">
                        Strategic Geopolitical<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-red-400">
                            Intelligence Reports
                        </span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
                        Advanced research-based analysis for global policy makers, strategic risk analysts, and international investors.
                    </p>

                    {/* Search & Filters */}
                    <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/[0.07] p-2 rounded-2xl shadow-2xl backdrop-blur-md">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-grow relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search reports, regions, themes..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:outline-none transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 appearance-none min-w-[140px]"
                                    value={filters.region}
                                    onChange={(e) => handleFilterChange('region', e.target.value)}
                                >
                                    {regions.map(r => <option key={r} value={r} className="bg-[#0a192f]">{r}</option>)}
                                </select>
                                <select
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 appearance-none min-w-[180px]"
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                >
                                    <option value="" className="bg-[#0a192f]">All Categories</option>
                                    {types.map(t => <option key={t} value={t} className="bg-[#0a192f]">{t}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-[-60px] relative z-20 space-y-16">

                {/* ── FEATURED REPORT ─────────────────────────────────────────── */}
                {featuredReport && !search && filters.region === 'Global' && (
                    <section>
                        <ReportCard report={featuredReport} featured={true} />
                    </section>
                )}

                {/* ── TREND ANALYTICS ─────────────────────────────────────────── */}
                <section className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-sm">
                    <TrendsDashboard />
                </section>

                {/* ── REPORTS GRID ────────────────────────────────────────────── */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-white italic">Recent Analysis</h2>
                            <p className="text-gray-500 text-sm">Deep strategic risk assessments</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                            <span>{reports.length} Reports Found</span>
                            <div className="h-4 w-px bg-white/10" />
                            <button className="flex items-center gap-1 hover:text-white transition-colors">
                                <Scale size={14} /> Sort by Relevance
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 size={40} className="text-blue-500 animate-spin mb-4" />
                            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Accessing Intel Database...</p>
                        </div>
                    ) : reports.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reports.map(report => (
                                <ReportCard key={report._id} report={report} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/[0.03] border border-dashed border-white/10 rounded-3xl py-20 text-center">
                            <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle size={24} className="text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-400 mb-2">No Reports Found</h3>
                            <p className="text-gray-600 max-w-sm mx-auto">Try adjusting your filters or search query to find more intelligence briefings.</p>
                        </div>
                    )}
                </section>

                {/* ── PREMIUM ACCESS / NEWSLETTER ─────────────────────────────── */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-20 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
                        <div className="relative z-10 flex-grow">
                            <h2 className="text-3xl font-black text-white mb-4">Elite Access Control</h2>
                            <p className="text-blue-100 mb-8 max-w-lg">
                                Unlock professional-grade geopolitical analysis, predictive modeling, and confidential strategy briefings.
                            </p>
                            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2">
                                Subscribe for Full Access <ArrowRight size={18} />
                            </button>
                        </div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            {[
                                { icon: ShieldAlert, label: 'Confidential' },
                                { icon: Zap, label: 'Predictive' },
                                { icon: Globe, label: 'Global' },
                                { icon: Activity, label: 'Real-time' }
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="bg-white/10 border border-white/20 p-4 rounded-2xl flex flex-col items-center gap-2 text-white">
                                    <Icon size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 flex flex-col">
                        <div className="mb-6">
                            <div className="inline-flex p-3 bg-blue-500/10 rounded-xl mb-4">
                                <Mail size={24} className="text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Intel Digest</h3>
                            <p className="text-gray-500 text-sm">Weekly executive summary of global risks and opportunities.</p>
                        </div>
                        <div className="mt-auto space-y-3">
                            <input
                                type="email"
                                placeholder="Enter corporate email..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-gray-600 focus:border-blue-500/50 outline-none transition-all"
                            />
                            <button className="w-full py-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 font-bold transition-all">
                                Join Newsletter
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER / DOWNLOAD INFO ──────────────────────────────────── */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium">
                    <p>© 2026 Strategic Intelligence Briefing Center. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <button className="hover:text-gray-400 transition-colors">Privacy Protocol</button>
                        <button className="hover:text-gray-400 transition-colors">Data Security</button>
                        <button className="hover:text-gray-400 transition-colors">Ethics Guidelines</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reports;
