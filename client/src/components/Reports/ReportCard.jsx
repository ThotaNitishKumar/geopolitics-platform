import React from 'react';
import { Download, Bookmark, Clock, Calendar, ExternalLink, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReportCard = ({ report, featured = false }) => {
    const riskColors = {
        'Low': 'text-green-400 bg-green-400/10 border-green-400/20',
        'Medium': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
        'High': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
        'Critical': 'text-red-400 bg-red-400/10 border-red-400/20'
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (featured) {
        return (
            <div className="relative group overflow-hidden bg-gradient-to-br from-[#0a192f] to-[#020c1b] border border-blue-500/30 rounded-3xl p-8 shadow-2xl hover:border-blue-500/50 transition-all duration-500">
                <div className="absolute top-0 right-0 p-6">
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                        Featured Report
                    </div>
                </div>

                <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {report.region}
                        </span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            {report.type}
                        </span>
                        <span className={`px-3 py-1 border rounded-full text-[10px] font-bold uppercase tracking-wider ${riskColors[report.riskLevel]}`}>
                            {report.riskLevel} Risk
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                        {report.title}
                    </h2>

                    <p className="text-gray-400 text-lg mb-8 line-clamp-3 leading-relaxed">
                        {report.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            {formatDate(report.publishDate)}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            {report.readingTime} Reading Time
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to={`/reports/${report.slug}`}
                            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all transform hover:scale-105"
                        >
                            Read Full Report <ExternalLink size={18} />
                        </Link>
                        <button className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl font-bold transition-all">
                            <Download size={18} /> Download PDF
                        </button>
                        <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded-xl transition-all">
                            <Bookmark size={18} />
                        </button>
                    </div>
                </div>

                {report.isPremium && (
                    <div className="absolute bottom-0 right-0 p-8">
                        <div className="flex items-center gap-2 text-yellow-500/50">
                            <ShieldAlert size={20} />
                            <span className="text-sm font-bold uppercase tracking-widest italic">Premium Intelligence</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                        {report.region}
                    </span>
                    <span className={`px-2 py-0.5 border rounded-md text-[9px] font-bold uppercase tracking-wider ${riskColors[report.riskLevel]}`}>
                        {report.riskLevel}
                    </span>
                </div>
                {report.isPremium && <ShieldAlert size={14} className="text-yellow-500/50" />}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                {report.title}
            </h3>

            <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                {report.summary}
            </p>

            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(report.publishDate)}
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {report.readingTime}
                </div>
            </div>

            <div className="flex gap-2">
                <Link
                    to={`/reports/${report.slug}`}
                    className="flex-grow flex items-center justify-center gap-2 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-600/30 rounded-lg text-xs font-bold transition-all"
                >
                    View Analysis
                </Link>
                <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded-lg transition-all" title="Download PDF">
                    <Download size={14} />
                </button>
                <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded-lg transition-all" title="Bookmark">
                    <Bookmark size={14} />
                </button>
            </div>
        </div>
    );
};

export default ReportCard;
