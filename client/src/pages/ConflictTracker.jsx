import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ShieldAlert, Activity, MapPin, Globe, Shield } from 'lucide-react';

const ConflictTracker = () => {
    const [conflicts, setConflicts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConflicts = async () => {
            try {
                const { data } = await api.get('/conflicts');
                setConflicts(data);
            } catch (error) {
                console.error('Error fetching conflicts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConflicts();

        // Auto-refresh every 2 minutes
        const interval = setInterval(fetchConflicts, 120000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="text-center py-10 text-gray-400">Loading Strategic Data...</div>;

    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-8 border-l-4 border-geo-red pl-4 flex items-center gap-2 uppercase tracking-tighter">
                <ShieldAlert className="text-geo-red" size={32} />
                Global Conflict Tracker
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main List */}
                <div className="lg:col-span-2 space-y-4">
                    {conflicts.length === 0 ? (
                        <div className="text-gray-500 italic">No active conflicts reported in database.</div>
                    ) : (
                        conflicts.map(conflict => (
                            <div key={conflict._id} className="bg-geo-navy border border-gray-800 p-8 rounded-lg hover:border-geo-red transition-all group shadow-xl">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                            {conflict.title}
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${conflict.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/50' :
                                                conflict.riskLevel === 'High' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' :
                                                    'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50'
                                                }`}>{conflict.riskLevel}</span>
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 font-mono">
                                            <MapPin size={14} /> {conflict.region}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-3xl font-black text-geo-red">{conflict.intensity}%</span>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Intensity</span>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-6 text-lg">{conflict.description}</p>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-black/40 p-5 rounded border border-gray-800">
                                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <Globe size={14} /> Main Actors
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {conflict.countriesInvolved.map((country, idx) => (
                                                    <span key={idx} className="bg-geo-red/10 px-3 py-1 rounded text-xs text-geo-red border border-geo-red/30 font-bold">{country}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-black/40 p-5 rounded border border-gray-800">
                                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <Shield size={14} /> Secondary Parties/Allies
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {conflict.secondaryParties?.map((party, idx) => (
                                                    <span key={idx} className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300 border border-gray-700">{party}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-geo-navy/50 p-6 rounded-lg border-l-4 border-amber-600">
                                        <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Activity size={14} /> Recent Strategic Developments
                                        </h4>
                                        <p className="text-sm text-gray-300 italic">{conflict.recentDevelopments || 'Awaiting intelligence confirmation...'}</p>
                                    </div>

                                    <div className="bg-black/20 p-6 rounded-lg border border-gray-800">
                                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Historical Context & Intelligence Background</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">{conflict.historicalContext || 'Contextual analysis being refined by regional experts.'}</p>
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-800">
                                        <div className="flex gap-2">
                                            {conflict.relatedTopics?.map((topic, idx) => (
                                                <span key={idx} className="text-[10px] text-gray-500 font-mono">#{topic}</span>
                                            ))}
                                        </div>
                                        <Link
                                            to={`/?search=${conflict.title}`}
                                            className="inline-flex items-center gap-2 bg-geo-red/20 border border-geo-red/30 px-6 py-2 rounded-md text-sm font-bold text-white hover:bg-geo-red/40 hover:border-geo-red transition-all group shadow-lg shadow-geo-red/5"
                                        >
                                            View Related Intelligence <Activity size={16} className="group-hover:animate-pulse" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Sidebar / Stats */}
                <div className="space-y-6">
                    <div className="bg-geo-navy border border-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Activity size={20} className="text-geo-yellow" /> Threat Assessment</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Critical Conflicts</span>
                                <span className="font-bold text-red-500">
                                    {conflicts.filter(c => c.riskLevel === 'Critical').length}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Top Hotspot</span>
                                <span className="font-bold text-gray-200">{conflicts[0]?.region || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-900/20 to-transparent border border-red-900/50 p-6 rounded-lg">
                        <h4 className="font-bold text-red-400 mb-2">Analyst Note</h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                            Conflict intensity is dynamically updated based on news frequency, diplomatic exchanges, and sentiment analysis from the GeoIntel automated engine. All data is for strategy simulation purposes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConflictTracker;
