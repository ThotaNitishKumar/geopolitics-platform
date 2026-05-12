import { Link } from 'react-router-dom';
import {
    Globe, Shield, BarChart3, Bookmark,
    Activity, Newspaper, ChevronRight, Zap,
    TrendingUp, Lock, Users, Target
} from 'lucide-react';
import { useEffect, useState } from 'react';

const FeatureCard = ({ icon: Icon, title, description, to, delay }) => (
    <Link
        to={to}
        className="group relative bg-white/[0.02] border border-white/5 p-6 rounded-[1.5rem] overflow-hidden hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1"
        style={{ animationDelay: `${delay}ms` }}
    >
        {/* Hover Glow */}
        <div className="absolute -inset-24 bg-geo-red/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center mb-5 mx-auto group-hover:scale-110 group-hover:bg-geo-red/10 group-hover:border-geo-red/20 transition-all duration-500">
                <Icon className="text-gray-400 group-hover:text-geo-red transition-colors" size={24} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 italic">{title}</h3>
            <p className="text-gray-500 text-[11px] leading-relaxed mb-4 group-hover:text-gray-400 transition-colors">
                {description}
            </p>
            <div className="flex items-center justify-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-geo-red opacity-0 group-hover:opacity-100 transition-all translate-x-[-5px] group-hover:translate-x-0">
                Initialize <ChevronRight size={12} />
            </div>
        </div>
    </Link>
);

const Home = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: Globe,
            title: "World Map Intelligence",
            description: "Interactive geospatial conflict and risk visualization across all nations.",
            to: "/world-map",
            delay: 100
        },
        {
            icon: Shield,
            title: "Active Conflict Monitoring",
            description: "Real-time tracking of global war theatres, escalation risk, and military movements.",
            to: "/conflicts",
            delay: 200
        },
        {
            icon: BarChart3,
            title: "Global Power Comparison",
            description: "Compare military, economic, technological, and influence metrics between nations.",
            to: "/comparison",
            delay: 300
        },
        {
            icon: Bookmark,
            title: "Strategic Intelligence Reports",
            description: "In-depth geopolitical analysis designed for decision-makers and investors.",
            to: "/reports",
            delay: 400
        },
        {
            icon: Activity,
            title: "AI Strategic Forecasting",
            description: "Predictive modeling of future conflicts, economic shocks, and global power shifts.",
            to: "/predictions",
            delay: 500
        },
        {
            icon: Newspaper,
            title: "Latest Intelligence Briefs",
            description: "Daily curated geopolitical insights and real-time risk alerts.",
            to: "/news",
            delay: 600
        }
    ];

    return (
        <div className="min-h-screen bg-[#020c1b] text-gray-100 selection:bg-geo-red selection:text-white">

            {/* ── HERO SECTION ────────────────────────────────────────────────── */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background Grid & Glow */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-geo-red/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10 animate-fade-in">
                        <Lock size={12} className="text-geo-red" /> Secure Access: Level 4 Intelligence
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.85] uppercase italic">
                        <span className="block animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                            Global <span className="text-geo-red">Intelligence.</span>
                        </span>
                        <span className="block text-white/20 animate-slide-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                            Real-Time Awareness.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-gray-500 text-base md:text-lg font-medium leading-relaxed mb-10 animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                        Advanced geopolitical monitoring, conflict analysis, power comparison,
                        and AI-driven forecasting across global hotspots.
                        Strategic decision support for a volatile world.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                        <Link to="/world-map" className="group relative px-10 py-4 bg-white text-black rounded-xl font-black uppercase text-[10px] tracking-[0.2em] overflow-hidden hover:scale-105 active:scale-95 transition-all">
                            <span className="relative z-10">Explore Global Map</span>
                            <div className="absolute inset-0 bg-geo-red translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                        <Link to="/predictions" className="px-10 py-4 bg-white/[0.03] border border-white/10 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/[0.08] hover:border-white/20 transition-all">
                            View Predictions
                        </Link>
                    </div>
                </div>

                {/* Bottom Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-600">
                    <div className="text-[9px] font-black uppercase tracking-[0.4em]">Initialize Terminal</div>
                    <div className="w-px h-10 bg-gradient-to-b from-gray-800 to-transparent" />
                </div>
            </div>

            {/* ── CORE FEATURES ───────────────────────────────────────────────── */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-geo-red mb-4 flex items-center gap-3">
                            <span className="w-8 h-px bg-geo-red" /> Strategic Capabilities
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-black uppercase italic leading-none">
                            Institutional Grade <br />
                            <span className="text-gray-500">Intelligence Tools.</span>
                        </h3>
                    </div>
                    <div className="text-gray-500 text-xs max-w-xs font-medium leading-relaxed">
                        Access the full suite of GEOINTEL resources for comprehensive global landscape monitoring.
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <FeatureCard key={i} {...f} />
                    ))}
                </div>
            </section>

            {/* ── LIVE RISK BAR ───────────────────────────────────────────────── */}
            <section className="py-20 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-shrink-0">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Real-Time Risk</h4>
                            <div className="text-4xl font-black italic uppercase text-geo-red">Global Instability Index</div>
                        </div>

                        <div className="flex-grow w-full space-y-4">
                            <div className="flex justify-between items-end">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white">Current Escalation Probability</div>
                                <div className="text-3xl font-black italic text-white leading-none">68.4%</div>
                            </div>
                            <div className="w-full h-4 bg-white/[0.03] rounded-full overflow-hidden p-1 border border-white/5">
                                <div className="h-full bg-gradient-to-r from-blue-500 via-yellow-500 to-geo-red rounded-full" style={{ width: '68.4%' }} />
                            </div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
                                <span>Low Risk</span>
                                <span>Moderate</span>
                                <span>Critical Flashpoint</span>
                            </div>
                        </div>

                        <Link to="/conflicts" className="group flex items-center gap-4 bg-geo-red p-1 rounded-2xl pr-8 hover:pr-10 transition-all">
                            <div className="w-14 h-14 bg-white text-black rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <Activity size={24} />
                            </div>
                            <div className="text-left">
                                <div className="text-[10px] font-black uppercase tracking-widest text-red-100">Conflict Monitor</div>
                                <div className="text-sm font-black uppercase text-white tracking-widest">Dashboard</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── WHY GEOINTEL ────────────────────────────────────────────────── */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic italic mb-8">Why GEOINTEL?</h2>
                    <div className="w-24 h-2 bg-geo-red mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {[
                        {
                            icon: TrendingUp,
                            title: "Data-Driven Modeling",
                            desc: "Leveraging million-point datasets to map hidden correlations in global geopolitics."
                        },
                        {
                            icon: Zap,
                            title: "AI-Enhanced Forecasting",
                            desc: "Predictive neural networks trained on historical conflict patterns and economic shifts."
                        },
                        {
                            icon: Target,
                            title: "Real-Time Monitoring",
                            desc: "Live intelligence feeds and satellite metric integration for zero-latency awareness."
                        }
                    ].map((item, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-20 h-20 bg-white/[0.03] border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-geo-red/10 group-hover:border-geo-red/20 transition-all duration-500 group-hover:rotate-12">
                                <item.icon className="text-gray-400 group-hover:text-geo-red" size={40} />
                            </div>
                            <h4 className="text-xl font-black uppercase italic mb-4 text-white">{item.title}</h4>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA SECTION ─────────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-geo-red" />
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#020c1b] to-transparent" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white mb-10 leading-[0.85]">
                        Monitor the World <br />
                        <span className="text-black/30">Before It Moves.</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/news" className="px-10 py-4 bg-white text-black rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-2xl">
                            Intelligence Dashboard
                        </Link>
                        <Link to="/comparison" className="px-10 py-4 bg-black/10 border border-white/20 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black/20 transition-all">
                            Strategic Analysis
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
