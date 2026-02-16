import { useState, useEffect } from 'react';
import WorldMap from '../components/Map/WorldMap';
import api from '../services/api';
import { Clock, ExternalLink, Globe } from 'lucide-react';

const MapPage = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryNews, setCountryNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCountryClick = async (countryName) => {
        setSelectedCountry(countryName);
        setLoading(true);
        try {
            // Fetch news related to the selected country
            // We'll search by title/description keywords for the country name
            const { data } = await api.get(`/news?search=${countryName}`);
            setCountryNews(data.articles || []);
        } catch (error) {
            console.error('Error fetching country news:', error);
            setCountryNews([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 p-6">
            <header className="mb-8 pl-4 border-l-4 border-geo-red">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                    Geospatial <span className="text-geo-red">Intelligence</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1">Interactive Global Risk & Sentiment Analysis</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Map Section */}
                <div className="xl:col-span-2 space-y-6">
                    <WorldMap onCountryClick={handleCountryClick} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-geo-navy/50 p-5 rounded-xl border border-gray-800 backdrop-blur-sm">
                            <h3 className="text-sm font-bold text-geo-red uppercase tracking-widest mb-4">Active Conflict Focal Points</h3>
                            <div className="space-y-4">
                                {[
                                    { zone: 'Middle East', level: 'Critical', color: 'text-red-500' },
                                    { zone: 'Eastern Europe', level: 'High', color: 'text-orange-500' },
                                    { zone: 'Indo-Pacific', level: 'Elevated', color: 'text-yellow-500' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs group cursor-default">
                                        <span className="text-gray-300 group-hover:text-white transition-colors">{item.zone}</span>
                                        <span className={`${item.color} font-mono font-bold bg-black/40 px-2 py-0.5 rounded`}>{item.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-geo-navy/50 p-5 rounded-xl border border-gray-800 backdrop-blur-sm">
                            <h3 className="text-sm font-bold text-geo-yellow uppercase tracking-widest mb-4">Sentiment Divergence</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                AI analyzing real-time media flows shows increasing polarization in European trade discourse and stabilizing energy narratives in North America.
                            </p>
                        </div>
                    </div>
                </div>

                {/* News Side Panel */}
                <div className="bg-geo-navy border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[700px]">
                    <div className="p-4 border-b border-gray-800 bg-black/20">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Globe size={18} className="text-geo-red" />
                            {selectedCountry ? `Briefing: ${selectedCountry}` : 'Select a Country'}
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {!selectedCountry ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                <Globe size={48} className="text-gray-700 mb-4 animate-pulse" />
                                <p className="text-gray-500 text-sm">Click on a country on the interactive map to load regional intelligence reports.</p>
                            </div>
                        ) : loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="animate-pulse bg-gray-800/50 h-24 rounded-lg"></div>
                                ))}
                            </div>
                        ) : countryNews.length > 0 ? (
                            <div className="space-y-4">
                                {countryNews.map((article) => (
                                    <div key={article._id} className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-all group">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] text-geo-red font-bold uppercase">{article.source.name}</span>
                                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                <Clock size={10} /> {new Date(article.publishedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold leading-tight mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{article.title}</h4>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-blue-500 flex items-center gap-1 hover:underline"
                                        >
                                            View Full Report <ExternalLink size={10} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-8">
                                <p className="text-gray-500 text-sm">No specific intelligence matches found for this region in the recent flow.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
