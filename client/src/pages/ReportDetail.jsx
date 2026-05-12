import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Download,
    Share2,
    ArrowLeft,
    Clock,
    Calendar,
    ShieldAlert,
    ChevronRight,
    Search,
    Bookmark,
    Printer,
    Menu,
    X,
    MessageSquare,
    ThumbsUp,
    TrendingUp,
    Scale,
    Activity
} from 'lucide-react';
import api from '../services/api';

const ReportDetail = () => {
    const { slug } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tocOpen, setTocOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('summary');

    const sections = [
        { id: 'summary', title: 'Executive Summary' },
        { id: 'background', title: 'Strategic Background' },
        { id: 'analysis', title: 'Situation Analysis' },
        { id: 'data', title: 'Data & Analytics' },
        { id: 'forecast', title: 'Strategic Forecast' },
        { id: 'risk', title: 'Risk Assessment' },
        { id: 'conclusion', title: 'Policy Implications' }
    ];

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const { data } = await api.get(`/reports/${slug}`);
                setReport(data);
            } catch (err) {
                console.error('Error fetching report:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-[#020c1b] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 text-sm tracking-widest uppercase italic">Deciphering Intelligence Data...</p>
            </div>
        </div>
    );

    if (!report) return (
        <div className="min-h-screen bg-[#020c1b] flex items-center justify-center">
            <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 max-w-md">
                <ShieldAlert size={48} className="text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                <p className="text-gray-500 mb-6">The requested intelligence report could not be found or your access level is insufficient.</p>
                <Link to="/reports" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold inline-flex items-center gap-2">
                    <ArrowLeft size={18} /> Return to Hub
                </Link>
            </div>
        </div>
    );

    const riskColors = {
        'Low': 'text-green-400',
        'Medium': 'text-yellow-400',
        'High': 'text-orange-400',
        'Critical': 'text-red-400'
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#020c1b] text-gray-900 dark:text-gray-100 pb-20 selection:bg-blue-500/30">
            {/* ── TOP NAVIGATION / BREADCRUMBS ────────────────────────────────── */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a192f]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.06] px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/reports" className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-gray-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                            <Link to="/reports" className="hover:text-blue-500">Reports</Link>
                            <ChevronRight size={12} />
                            <span className="text-blue-500 max-w-[200px] truncate">{report.title}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
                            <Download size={16} /> <span className="hidden sm:inline">Export PDF</span>
                        </button>
                        <button className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-500">
                            <Bookmark size={20} />
                        </button>
                        <button className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-500">
                            <Share2 size={20} />
                        </button>
                        <button className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-500 lg:hidden" onClick={() => setTocOpen(!tocOpen)}>
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── REPORT HERO ────────────────────────────────────────────────── */}
            <div className="bg-white dark:bg-[#0a192f] border-b border-gray-200 dark:border-white/[0.06] py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex flex-wrap gap-3 mb-8">
                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">
                            {report.region}
                        </span>
                        <span className="px-3 py-1 bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            {report.type}
                        </span>
                        <span className={`px-3 py-1 bg-white/5 border border-transparent rounded-full text-[10px] font-black uppercase tracking-widest ${riskColors[report.riskLevel]}`}>
                            {report.riskLevel} Risk Level
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-tight italic">
                        {report.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500 border-t border-gray-100 dark:border-white/5 pt-8">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">AG</div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">Anti-Gravity Intel</p>
                                <p className="text-xs uppercase tracking-widest">Strategic Analyst</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            {new Date(report.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            {report.readingTime}
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldAlert size={18} />
                            {report.isPremium ? 'Confidential Class' : 'Open Source'}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── REPORT CONTENT LAYOUT ──────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-12 flex gap-12">

                {/* STICKY TOC ────────────────────────────────────────────────── */}
                <aside className={`fixed inset-0 z-50 bg-white dark:bg-[#020c1b] lg:relative lg:bg-transparent lg:z-auto lg:block w-72 flex-shrink-0 transition-all ${tocOpen ? 'block' : 'hidden lg:block'}`}>
                    <div className="lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide">
                        <div className="flex lg:hidden justify-between items-center mb-8 p-6 border-b dark:border-white/5">
                            <span className="font-bold uppercase tracking-widest text-xs">Table of Contents</span>
                            <button onClick={() => setTocOpen(false)}><X /></button>
                        </div>
                        <h4 className="hidden lg:block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">In this report</h4>
                        <nav className="space-y-1">
                            {sections.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => { setActiveSection(s.id); setTocOpen(false); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${activeSection === s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${activeSection === s.id ? 'bg-white' : 'bg-gray-600'}`} />
                                    {s.title}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                            <h5 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Newsletter Intel</h5>
                            <p className="text-[11px] text-gray-500 mb-4 italic">Get more briefings like this delivered to your secure terminal weekly.</p>
                            <input type="text" placeholder="Invite Code..." className="w-full bg-white dark:bg-white/5 border dark:border-white/10 rounded-lg px-3 py-2 text-xs mb-2 outline-none" />
                            <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Join Global Network</button>
                        </div>
                    </div>
                </aside>

                {/* MAIN ARTICLE ──────────────────────────────────────────────── */}
                <article className="flex-grow max-w-3xl prose prose-blue dark:prose-invert prose-lg selection:text-white">

                    {/* 1. Executive Summary */}
                    <section id="summary" className="mb-20 scroll-mt-32">
                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-blue-600 pl-6">Executive Summary</h2>
                        <div className="bg-white dark:bg-[#0a192f] border border-gray-200 dark:border-white/[0.06] rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 text-blue-500">Key Findings</h3>
                            <ul className="space-y-4 mb-8">
                                {report.executiveSummary?.keyFindings?.map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start text-gray-700 dark:text-gray-300">
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-xl font-bold mb-6 text-red-400">Strategic Risks</h3>
                            <ul className="space-y-4 mb-8">
                                {report.executiveSummary?.strategicRisks?.map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start text-gray-700 dark:text-gray-300">
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8 border-t border-gray-100 dark:border-white/5 mt-8">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Future Outlook</h3>
                                <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                                    "{report.executiveSummary?.futureOutlook}"
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 2. Background */}
                    <section id="background" className="mb-20 scroll-mt-32">
                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-blue-600 pl-6">Strategic Background</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
                            {report.background?.context}
                        </p>
                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Historical Timeline</h3>
                            {report.background?.timeline?.map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-20 flex-shrink-0 text-blue-500 font-bold text-sm pt-0.5">{item.date}</div>
                                    <div className="relative pb-6 border-l-2 border-gray-200 dark:border-white/10 pl-8">
                                        <div className="absolute top-1.5 -left-[5px] w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-blue-500 transition-colors" />
                                        <div className="font-bold text-gray-900 dark:text-white text-lg">{item.event}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. Analysis */}
                    <section id="analysis" className="mb-20 scroll-mt-32">
                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-blue-600 pl-6">Situation Analysis</h2>

                        <div className="space-y-12">
                            <div>
                                <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-blue-400">
                                    <Scale className="text-blue-500" size={20} /> Political Dynamics
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {report.analysis?.politicalDynamics}
                                </p>
                            </div>

                            <div>
                                <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-red-400">
                                    <ShieldAlert className="text-red-500" size={20} /> Military Movements
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {report.analysis?.militaryMovements}
                                </p>
                            </div>

                            <div>
                                <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-green-400">
                                    <TrendingUp className="text-green-500" size={20} /> Economic Effects
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {report.analysis?.economicEffects}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 4. Data & Charts */}
                    <section id="data" className="mb-20 scroll-mt-32">
                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-blue-600 pl-6">Data & Analytics</h2>
                        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-3xl p-1 justify-center flex py-20 text-center">
                            <div>
                                <Activity size={48} className="text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-sm">Real-time data visualization module is active for subscribers only.</p>
                                <button className="mt-4 text-blue-500 font-bold hover:underline">Request Data Access</button>
                            </div>
                        </div>
                    </section>

                    {/* 5. Forecast */}
                    <section id="forecast" className="mb-20 scroll-mt-32">
                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-blue-600 pl-6">Strategic Forecast</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'Short Term', period: '12 Months', data: report.strategicForecast?.shortTerm, color: 'border-blue-500/30' },
                                { title: 'Medium Term', period: '5 Years', data: report.strategicForecast?.mediumTerm, color: 'border-indigo-500/30' },
                                { title: 'Long Term', period: '10+ Years', data: report.strategicForecast?.longTerm, color: 'border-purple-500/30' }
                            ].map(item => (
                                <div key={item.title} className={`bg-white dark:bg-[#0a192f] border-t-4 ${item.color} rounded-2xl p-6 shadow-sm`}>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</div>
                                    <div className="text-sm text-gray-500 mb-4">{item.period}</div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.data}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 6. Risk Assessment Section */}
                    <section id="risk" className="mb-20 scroll-mt-32">
                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-blue-600 pl-6">Risk Assessment Panel</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Escalation Probability', value: report.riskAssessment?.escalationProbability, color: 'text-orange-500' },
                                { label: 'Nuclear Risk Level', value: report.riskAssessment?.nuclearRisk, color: 'text-red-500' },
                                { label: 'Regional Spillover', value: report.riskAssessment?.regionalSpillover, color: 'text-yellow-500' },
                                { label: 'Global Impact Risk', value: report.riskAssessment?.globalImpact, color: 'text-red-400' }
                            ].map(item => (
                                <div key={item.label} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500">{item.label}</span>
                                    <span className={`text-lg font-black uppercase italic ${item.color}`}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 7. Conclusion & Policy */}
                    <section id="conclusion" className="mb-20 scroll-mt-32">
                        <h2 className="text-3xl font-black italic mb-8 border-l-4 border-blue-600 pl-6">Policy Implications</h2>
                        <div className="space-y-10">
                            <div className="bg-blue-600 rounded-3xl p-8 text-white">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Scale size={20} /> For Governments</h3>
                                <ul className="space-y-4">
                                    {report.conclusion?.policyImplications?.map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start"><div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-200 flex-shrink-0" /> {item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-emerald-600 rounded-3xl p-8 text-white">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><TrendingUp size={20} /> For Investors</h3>
                                <ul className="space-y-4">
                                    {report.conclusion?.investorWatchlist?.map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start"><div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-200 flex-shrink-0" /> {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                </article>

                {/* INFO PANEL ────────────────────────────────────────────────── */}
                <aside className="hidden xl:block w-72 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white dark:bg-[#0a192f] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6">
                            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Report Meta</h5>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Class</span>
                                    <span className="font-bold">{report.isPremium ? 'Premium' : 'Standard'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">ID</span>
                                    <span className="font-mono text-[10px] pt-1 uppercase">{report.slug.substring(0, 10)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Views</span>
                                    <span className="font-bold">1,420 Executive</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 text-white shadow-xl">
                            <h5 className="font-black italic text-lg mb-2">Expert Consultation</h5>
                            <p className="text-xs text-blue-200 mb-6 italic">Connect with an analyst for deep-dive strategy sessions on this topic.</p>
                            <button className="w-full py-3 bg-white text-blue-900 rounded-xl font-bold text-xs uppercase tracking-widest">Connect to Secure Node</button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-500 hover:text-blue-500 transition-all">
                                <Printer size={14} /> Print Briefing
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-500 hover:text-blue-500 transition-all">
                                <MessageSquare size={14} /> Commentary
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-500 hover:text-blue-500 transition-all">
                                <ThumbsUp size={14} /> Endorse Analysis
                            </button>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default ReportDetail;
