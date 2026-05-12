import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
    Shield, Target, Users, Landmark,
    ArrowLeft, Clock, TrendingUp, Zap,
    Globe, AlertCircle, Info, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

const ConflictDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [conflict, setConflict] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConflict = async () => {
            try {
                const { data } = await api.get(`/conflicts/${id}`);
                setConflict(data);
            } catch (error) {
                console.error('Error fetching intelligence:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchConflict();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-geo-dark">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-geo-red"></div>
        </div>
    );

    if (!conflict) return <div className="text-center py-20 text-gray-400">Intelligence Record Not Found.</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-geo-dark text-gray-100 p-6 md:p-10"
        >
            {/* Navigation & Title */}
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate('/conflicts')}
                    className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em] mb-8"
                >
                    <ArrowLeft size={16} /> Back to Strategic Overview
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-gray-800 pb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-red-900/40 text-red-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/30">
                                {conflict.riskLevel} Risk
                            </span>
                            <span className="text-gray-600 font-mono text-xs uppercase tracking-widest">ID: {conflict._id.substring(18)}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                            {conflict.title.split(' vs ').map((part, i) => (
                                <span key={i} className={i === 1 ? 'text-geo-red' : ''}>
                                    {part} {i === 0 && <span className="text-gray-700 text-3xl mx-4">VS</span>}
                                </span>
                            ))}
                        </h1>
                    </div>
                    <div className="bg-geo-navy border border-gray-800 p-6 rounded-2xl flex items-center gap-8 shadow-2xl">
                        <div className="text-center border-r border-gray-800 pr-8">
                            <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Status</span>
                            <span className="text-xl font-black text-geo-red uppercase">{conflict.status}</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Intensity</span>
                            <span className="text-4xl font-black text-white">{conflict.intensity}%</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column - Analysis & Timeline */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* 1. Overview Section */}
                        <section>
                            <h3 className="text-sm font-bold text-geo-red uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
                                <Shield size={18} /> Deep Intelligence Overview
                            </h3>
                            <div className="bg-geo-navy/40 border border-gray-800 p-8 rounded-3xl space-y-6">
                                <p className="text-xl text-gray-300 leading-relaxed font-light border-l-2 border-geo-red pl-6">
                                    {conflict.overview}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-800/50">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Info size={14} className="text-blue-500" /> Ground Situation
                                        </h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">{conflict.situationSummary}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <AlertCircle size={14} className="text-amber-500" /> Strategic Rationale
                                        </h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">{conflict.whyItExists}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. Military Dashboard */}
                        <section>
                            <h3 className="text-sm font-bold text-geo-red uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
                                <Target size={18} /> Military Capabilities Dashboard
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[conflict.militaryStats.sideA, conflict.militaryStats.sideB].map((side, i) => (
                                    <div key={i} className="bg-black/40 border border-gray-800 rounded-2xl p-6 relative overflow-hidden group">
                                        <div className={`absolute top-0 right-0 w-24 h-24 ${i === 0 ? 'bg-blue-500/5' : 'bg-red-500/5'} rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000`}></div>
                                        <h4 className={`text-2xl font-black uppercase italic mb-6 ${i === 0 ? 'text-blue-500' : 'text-geo-red'}`}>{side.name}</h4>
                                        <div className="space-y-4">
                                            <StatLine label="Trained Assets" value={side.troops} icon={<Users size={12} />} />
                                            <StatLine label="Armored Division" value={side.tanks} icon={<Shield size={12} />} />
                                            <StatLine label="Aerial Superiority" value={side.aircraft} icon={<Zap size={12} />} />
                                            <StatLine label="Naval Fleet" value={side.naval} icon={<Globe size={12} />} />
                                            <StatLine label="Nuclear Deterrent" value={side.nuclear ? 'ACTIVE' : 'NONE'} color={side.nuclear ? 'text-red-500 font-black' : ''} icon={<Zap size={12} />} />
                                            <StatLine label="Annual Allocation" value={side.budget} icon={<Landmark size={12} />} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Timeline */}
                        <section>
                            <h3 className="text-sm font-bold text-geo-red uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
                                <Clock size={18} /> Strategic Timeline
                            </h3>
                            <div className="relative pl-8 border-l border-gray-800 space-y-10">
                                {conflict.timeline.map((event, i) => (
                                    <div key={i} className="relative">
                                        <span className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 border-geo-dark ${event.isMilestone ? 'bg-geo-red' : 'bg-gray-700'}`}></span>
                                        <div className="bg-geo-navy/20 border border-gray-800/50 p-6 rounded-2xl hover:bg-geo-navy/40 transition-all">
                                            <span className="text-[10px] font-mono text-geo-red font-bold mb-2 block">{event.date}</span>
                                            <h5 className="text-lg font-bold text-white mb-2">{event.event}</h5>
                                            <p className="text-sm text-gray-500 leading-relaxed font-light">{event.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Secondary Analysis */}
                    <div className="space-y-12">
                        {/* Who is Involved */}
                        <section className="bg-geo-navy border border-gray-800 rounded-3xl p-8 overflow-hidden relative">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Users size={16} className="text-geo-red" /> Operational Actors
                            </h3>
                            <div className="space-y-8">
                                <ActorList title="Main Forces" actors={conflict.involvedParties.mainActors} color="bg-red-500/20 text-red-500 border-red-500/30" />
                                <ActorList title="Global Support" actors={conflict.involvedParties.supporters} color="bg-blue-500/20 text-blue-500 border-blue-500/30" />
                                <ActorList title="Proxy Entities" actors={conflict.involvedParties.proxyGroups} color="bg-gray-800 text-gray-400 border-gray-700" />
                                <div>
                                    <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">UN Stance</h5>
                                    <p className="text-xs text-gray-400 leading-relaxed italic border-l border-gray-800 pl-3">{conflict.involvedParties.internationalStance}</p>
                                </div>
                            </div>
                        </section>

                        {/* Economic Impact */}
                        <section className="bg-geo-navy border border-gray-800 rounded-3xl p-8">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <BarChart3 size={16} className="text-geo-yellow" /> Economic Fallout
                            </h3>
                            <div className="space-y-6">
                                <ImpactItem label="Energy Sector" value={conflict.economicImpact.oilGasImpact} />
                                <ImpactItem label="Maritime Trade" value={conflict.economicImpact.tradeDisruption} />
                                <ImpactItem label="Sanctions Flow" value={conflict.economicImpact.sanctions} />
                                <ImpactItem label="Migration/Crisis" value={conflict.economicImpact.refugees} />

                                <div className="pt-6 border-t border-gray-800">
                                    <h5 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">Risk Indices</h5>
                                    <div className="space-y-4">
                                        {conflict.economicImpact.charts?.map((chart, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
                                                    <span className="text-gray-400">{chart.label}</span>
                                                    <span className="text-white">{chart.value}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                                                    <div className="h-full bg-geo-red" style={{ width: `${chart.value}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Latest Updates Feed */}
                        <section className="bg-black/60 border border-gray-800 rounded-3xl p-8">
                            <h3 className="text-xs font-bold text-geo-red uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <TrendingUp size={16} /> Signal Intelligence
                            </h3>
                            <div className="space-y-6">
                                {conflict.latestUpdates.map((update, i) => (
                                    <div key={i} className={`p-4 rounded-xl border ${update.isBreaking ? 'bg-red-900/10 border-red-900/30 shadow-[0_0_15px_rgba(220,38,38,0.05)]' : 'bg-geo-navy/30 border-gray-800'} relative`}>
                                        {update.isBreaking && <span className="absolute -top-2 left-4 bg-red-600 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">Breaking</span>}
                                        <p className="text-xs text-gray-300 leading-relaxed mb-2 font-light">{update.content}</p>
                                        <span className="text-[10px] text-gray-600 font-mono block text-right italic">
                                            {new Date(update.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* Helper Components */
const StatLine = ({ label, value, icon, color }) => (
    <div className="flex justify-between items-center text-xs border-b border-gray-800/10 pb-3">
        <span className="text-gray-500 font-light flex items-center gap-2 italic">{icon} {label}</span>
        <span className={`text-gray-200 font-mono ${color}`}>{value}</span>
    </div>
);

const ImpactItem = ({ label, value }) => (
    <div className="space-y-1">
        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{label}</span>
        <p className="text-xs text-gray-400 font-light leading-relaxed">{value}</p>
    </div>
);

const ActorList = ({ title, actors, color }) => (
    <div>
        <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 italic">{title}</h5>
        <div className="flex flex-wrap gap-2">
            {actors?.map((actor, i) => (
                <span key={i} className={`text-[10px] px-2 py-1 rounded border font-bold ${color}`}>
                    {actor}
                </span>
            ))}
        </div>
    </div>
);

export default ConflictDetail;
