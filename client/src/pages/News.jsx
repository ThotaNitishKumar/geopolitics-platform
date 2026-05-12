import { useState } from 'react';
import { Link } from 'react-router-dom';
import NewsFeed from '../components/News/NewsFeed';
import {
    Zap, Globe, Shield, TrendingUp,
    ChevronRight, Map, Newspaper, Activity
} from 'lucide-react';

const News = () => {
    const [activeTab, setActiveTab] = useState('Global');
    const continents = ['Global', 'Asia', 'Europe', 'Americas', 'Africa'];

    return (
        <div className="min-h-screen bg-[#020c1b] text-gray-100 font-sans pb-20">
            {/* ── TOP STORY / HERO ────────────────────────────────────────────── */}
            <div className="border-b border-white/[0.06] bg-gradient-to-b from-[#0a192f] to-[#020c1b]">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8">
                            <div className="inline-flex items-center gap-2 bg-geo-red/10 border border-geo-red/20 rounded-full px-4 py-1 text-[10px] text-geo-red font-black uppercase tracking-[0.2em] mb-6">
                                <Zap size={12} className="fill-current" /> Breaking Intelligence
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[0.9] uppercase italic">
                                Global <span className="text-geo-red">Frontline</span> <br />
                                <span className="text-gray-500">Intelligence.</span>
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                                Real-time strategic monitoring of shifting power dynamics,
                                critical conflicts, and global economic volatility.
                            </p>
                        </div>

                        <div className="lg:col-span-4 hidden lg:block">
                            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">System Status</h3>
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div className="text-[10px] text-gray-500 font-bold uppercase">Escalation Index</div>
                                        <div className="text-xl font-black text-white italic">4.2/10</div>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-geo-red h-full w-[42%]" />
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-[10px] text-gray-500 font-bold uppercase">Stability Ratio</div>
                                        <div className="text-xl font-black text-white italic">HIGH</div>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full w-[78%]" />
                                    </div>
                                </div>
                                <Link to="/world-map">
                                    <button className="w-full mt-10 bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-geo-red hover:text-white transition-all transform hover:-translate-y-1">
                                        Full Operations Map
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN NEWS FEED ─────────────────────────────────────────────── */}
            <main className="max-w-7xl mx-auto px-6 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Primary Feed */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Section Header with Tabs */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-widest text-geo-red flex items-center gap-2 mb-2">
                                    <Activity size={14} /> Regional Intelligence
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {continents.map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-tight transition-all ${activeTab === tab
                                                ? 'bg-white text-black shadow-xl'
                                                : 'text-gray-500 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <NewsFeed
                            continent={activeTab === 'Global' ? '' : activeTab}
                            limit={9}
                        />
                    </div>

                    {/* Secondary/Sidebar */}
                    <div className="lg:col-span-4 space-y-12">

                        {/* Strategic High Priority List */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 mb-8">
                                <Shield size={14} className="text-geo-red" /> Priority Alerts
                            </h3>
                            <NewsFeed isHighPriority={true} limit={4} viewMode="list" />
                        </div>

                        {/* Analysis Box */}
                        <div className="bg-geo-red p-8 rounded-[2rem] text-white relative overflow-hidden shadow-2xl skew-y-1">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <TrendingUp size={100} />
                            </div>
                            <div className="relative z-10 -skew-y-1">
                                <h3 className="text-2xl font-black uppercase leading-tight mb-4 tracking-tighter">Strategic Deep Dive</h3>
                                <p className="text-red-100 text-xs font-medium leading-relaxed mb-6">
                                    Unlock exhaustive intelligence reports and predictive modeling on high-stakes geopolitical shifts.
                                </p>
                                <Link to="/reports">
                                    <button className="bg-white text-red-600 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all">
                                        Access Reports
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Quick Stats Sidebar */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 mb-4">
                                <Globe size={14} /> Global Pulse
                            </h3>
                            {['Oil Futures', 'Gold Reserve', 'Semi Index', 'Defense Burn'].map((stat, i) => (
                                <div key={stat} className="flex justify-between items-center py-3 border-b border-white/5">
                                    <span className="text-[11px] font-bold text-gray-400 uppercase">{stat}</span>
                                    <span className={`text-xs font-black ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {i % 2 === 0 ? '+' : '-'}{(Math.random() * 5).toFixed(2)}%
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default News;
