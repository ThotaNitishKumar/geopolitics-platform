import React from 'react';
import { ShieldAlert, Users, TrendingUp, Calendar, ArrowRight, Activity } from 'lucide-react';

const ConflictCard = ({ conflict, onClick }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-red-500/10 text-red-500 border-red-500/30';
            case 'Escalating': return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
            case 'Ceasefire': return 'bg-green-500/10 text-green-500 border-green-500/30';
            case 'Frozen': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <div
            onClick={() => onClick(conflict)}
            className="bg-geo-navy border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-geo-red transition-all group relative overflow-hidden flex flex-col h-full"
        >
            {/* Intensity Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-900">
                <div
                    className="h-full bg-geo-red"
                    style={{ width: `${conflict.intensity}%` }}
                ></div>
            </div>

            <div className="flex justify-between items-start mb-4 pt-2">
                <div>
                    <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold tracking-tighter ${getStatusColor(conflict.status)}`}>
                        {conflict.status}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-3 leading-tight group-hover:text-geo-red transition-colors">
                        {conflict.title}
                    </h3>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-black text-geo-red block leading-none">{conflict.riskMeter}%</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Risk Level</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={14} className="text-geo-red" />
                    <span>Started: {conflict.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Activity size={14} className="text-geo-red" />
                    <span>Type: {conflict.type}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users size={14} className="text-geo-red" />
                    <span>Casualties: {conflict.casualties}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <TrendingUp size={14} className="text-geo-red" />
                    <span>Intensity: {conflict.intensity}%</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                <span className="text-[10px] text-gray-500 font-mono italic">
                    REF: {conflict._id.substring(18).toUpperCase()}
                </span>
                <button className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-geo-red transition-all uppercase tracking-widest">
                    Briefing <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default ConflictCard;
