import { useState } from 'react';
import NewsFeed from '../components/News/NewsFeed';

const Home = () => {
    const [filter, setFilter] = useState('all'); // 'all' or 'priority'

    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 pb-20">
            {/* Hero Section */}
            <div className="relative bg-geo-navy border-b border-gray-800 pt-10 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Global <span className="text-geo-red">Intelligence</span> Dashboard
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Real-time geopolitical analysis, strategic insights, and automated intelligence briefs from across the globe.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h2 className="text-2xl font-bold border-l-4 border-geo-red pl-4">Latest Intelligence Briefs</h2>
                    <div className="flex gap-3 bg-geo-navy p-1 rounded-lg border border-gray-800">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${filter === 'all' ? 'bg-geo-red text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                        >
                            All Intelligence
                        </button>
                        <button
                            onClick={() => setFilter('priority')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${filter === 'priority' ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                        >
                            High Priority
                        </button>
                    </div>
                </div>

                <NewsFeed isHighPriority={filter === 'priority'} />
            </main>
        </div>
    );
};

export default Home;
