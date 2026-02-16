import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Calendar, MapPin, ExternalLink, Shield, Globe, Info, TrendingUp, AlertCircle } from 'lucide-react';

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const { data } = await api.get(`/news/${id}`);
                setArticle(data);
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-geo-dark flex flex-col items-center justify-center text-gray-500">
            <div className="w-12 h-12 border-4 border-geo-red border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-mono text-xs uppercase tracking-widest">Decrypting Intelligence Stream...</p>
        </div>
    );

    if (!article) return <div className="text-center py-20 text-red-500">Intelligence Report Not Found</div>;

    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 p-6 pb-20 selection:bg-geo-red selection:text-white">
            <div className="max-w-5xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Strategic Dashboard
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-3 space-y-8">
                        <header className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="bg-geo-red/20 text-geo-red border border-geo-red/30 px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest">
                                    {article.source.name}
                                </span>
                                {article.isHighPriority && (
                                    <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest animate-pulse">
                                        High Priority
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter text-white">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-6">
                                <span className="flex items-center gap-2"><Calendar size={14} className="text-gray-600" /> {new Date(article.publishedAt).toLocaleString()}</span>
                                <span className="flex items-center gap-2 font-mono"><MapPin size={14} className="text-geo-red" /> {article.country || article.continent}</span>
                                <span className="flex items-center gap-2"><Globe size={14} className="text-blue-500" /> {article.continent}</span>
                            </div>
                        </header>

                        {article.urlToImage && (
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative group">
                                <img src={article.urlToImage} alt={article.title} className="w-full h-auto object-cover max-h-[500px] group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-geo-dark via-transparent to-transparent opacity-60"></div>
                            </div>
                        )}

                        <div className="bg-geo-navy/40 border border-gray-800 rounded-2xl p-8 relative overflow-hidden backdrop-blur-md">
                            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 border-b border-gray-800 pb-4 uppercase tracking-tighter">
                                <Shield className="text-geo-red" size={24} />
                                Strategic Briefing Matrix
                            </h3>

                            <div className="space-y-10">
                                <div className="relative">
                                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-geo-red"></div>
                                    <h4 className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Situation Overview</h4>
                                    <p className="text-gray-200 text-xl leading-relaxed font-serif italic text-justify">
                                        {article.summary || article.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-gray-800/50">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold text-geo-red">
                                            <Shield size={14} /> Strategic Impact
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed text-justify">{article.analysis?.strategicImpact}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold text-blue-400">
                                            <TrendingUp size={14} /> Economic Impact
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed text-justify">{article.analysis?.economicImpact}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold text-amber-500">
                                            <Globe size={14} /> Global Reaction
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed text-justify">{article.analysis?.globalReaction}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <Info size={16} /> Detailed Context
                            </h3>
                            <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg">
                                <p>{article.description}</p>
                                <p>Intelligence gathering is ongoing for this specific geopolitical event. Our automated systems are currently cross-referencing this development with existing defense treaties and historical regional dynamics to provide a more granular long-term projection.</p>
                            </div>
                        </section>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-geo-navy/60 border border-gray-800 p-6 rounded-2xl sticky top-6">
                            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                <AlertCircle size={16} className="text-geo-red" /> Intelligence Action
                            </h4>
                            <div className="space-y-4">
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-white text-black py-3 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors uppercase tracking-widest"
                                >
                                    External Feed <ExternalLink size={16} />
                                </a>
                                <button className="w-full border border-gray-700 py-3 rounded-lg font-bold text-sm text-gray-400 hover:border-geo-red hover:text-white transition-all uppercase tracking-widest">
                                    Flag Briefing
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-800 space-y-6">
                                <div>
                                    <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Regional Assignment</h5>
                                    <div className="flex items-center gap-3 text-white font-bold italic">
                                        <MapPin size={16} className="text-geo-red" />
                                        {article.country || 'Global/Multinational'}
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Confidence Rating</h5>
                                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-geo-red h-full w-[92%]"></div>
                                    </div>
                                    <span className="text-[10px] text-gray-500 mt-2 block font-mono text-right">92.4% ADAPTIVE ANALYSIS</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
