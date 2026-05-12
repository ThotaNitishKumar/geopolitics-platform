import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

const NewsFeed = ({ isHighPriority = false, continent = '', limit = 10, viewMode = 'grid' }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                let url = `/news?isHighPriority=${isHighPriority}&limit=${limit}`;
                if (continent) url += `&continent=${continent}`;
                const { data } = await api.get(url);
                setArticles(data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
        const interval = setInterval(fetchNews, 60000);
        return () => clearInterval(interval);
    }, [isHighPriority, continent, limit]);

    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-white/5 animate-pulse rounded-xl" />
                ))}
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                <Globe className="mx-auto text-gray-700 mb-4" size={48} />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No Intelligence Available for this Sector</p>
            </div>
        );
    }

    if (viewMode === 'list') {
        return (
            <div className="space-y-4">
                {articles.map((article) => (
                    <Link to={`/article/${article._id}`} key={article._id} className="flex gap-4 p-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-xl transition-all group">
                        {article.urlToImage && (
                            <div className="w-24 h-24 flex-shrink-0">
                                <img src={article.urlToImage} alt="" className="w-full h-full object-cover rounded-lg" />
                            </div>
                        )}
                        <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1 uppercase font-bold tracking-tight">
                                <span className="text-geo-red">{article.source.name}</span>
                                <span>•</span>
                                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-sm font-bold text-gray-200 group-hover:text-geo-red transition-colors line-clamp-2 leading-snug">{article.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <div key={article._id} className="bg-geo-navy border border-gray-800 rounded-lg overflow-hidden hover:border-geo-red transition-all duration-300 shadow-lg group flex flex-col">
                    {article.urlToImage && (
                        <div className="relative h-48 overflow-hidden">
                            <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 text-xs rounded text-white flex items-center gap-1">
                                <MapPin size={12} className="text-geo-red" /> {article.continent}
                            </div>
                        </div>
                    )}
                    <div className="p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Clock size={12} /> {new Date(article.publishedAt).toLocaleDateString()}</span>
                            <span className="text-geo-red font-semibold uppercase tracking-wider text-[10px]">{article.source.name}</span>
                        </div>

                        <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-geo-red transition-colors">{article.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.description}</p>

                        <div className="mt-auto">
                            {article.analysis && (
                                <div className="bg-gray-900/50 p-3 rounded mb-4 text-[10px] border border-gray-800 leading-normal">
                                    <p className="text-gray-300"><span className="text-geo-yellow font-black uppercase tracking-tighter mr-1">Strategic Impact:</span> {article.analysis.strategicImpact || 'Analysis Pending...'}</p>
                                </div>
                            )}
                            <Link to={`/article/${article._id}`} className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                Read Briefing <ArrowRight size={14} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsFeed;
