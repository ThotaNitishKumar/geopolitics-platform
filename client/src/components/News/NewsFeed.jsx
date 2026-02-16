import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

const NewsFeed = ({ isHighPriority = false }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await api.get(`/news?isHighPriority=${isHighPriority}`);
                setArticles(data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

        // Refresh every 5 minutes (reduced frequency to avoid overwhelming)
        const interval = setInterval(fetchNews, 300000);

        return () => clearInterval(interval);
    }, [isHighPriority]);

    if (loading) {
        return <div className="text-center py-10 text-gray-400">Loading Intelligence Details...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <div key={article._id} className="bg-geo-navy border border-gray-800 rounded-lg overflow-hidden hover:border-geo-red transition-all duration-300 shadow-lg group">
                    {article.urlToImage && (
                        <div className="relative h-48 overflow-hidden">
                            <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 text-xs rounded text-white flex items-center gap-1">
                                <MapPin size={12} className="text-geo-red" /> {article.continent}
                            </div>
                        </div>
                    )}
                    <div className="p-5">
                        <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Clock size={12} /> {new Date(article.publishedAt).toLocaleDateString()}</span>
                            <span className="text-geo-red font-semibold uppercase tracking-wider text-[10px]">{article.source.name}</span>
                        </div>

                        <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-geo-red transition-colors">{article.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.description}</p>

                        {/* Analysis Snippet Placeholder */}
                        {article.analysis && (
                            <div className="bg-gray-900/50 p-3 rounded mb-4 text-xs border border-gray-800">
                                <p className="text-gray-300"><span className="text-geo-yellow font-bold">Strategic Impact:</span> {article.analysis.strategicImpact || 'Pending...'}</p>
                            </div>
                        )}


                        <Link to={`/article/${article._id}`} className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                            Read Briefing <ArrowRight size={14} className="ml-1" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsFeed;
