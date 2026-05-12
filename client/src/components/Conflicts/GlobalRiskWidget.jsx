import React from 'react';
import { ShieldAlert, Zap, Globe, AlertTriangle } from 'lucide-react';

const GlobalRiskWidget = ({ conflicts }) => {
    // Calculate aggregate risk (sample logic)
    const avgRisk = Math.round(conflicts.reduce((acc, curr) => acc + curr.riskMeter, 0) / conflicts.length) || 0;
    const nuclearActive = conflicts.some(c => c.militaryStats.sideA.nuclear || c.militaryStats.sideB.nuclear);

    return (
        <div className="bg-gradient-to-br from-geo-navy to-black border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-geo-red/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-4">
                <ShieldAlert className="text-geo-red" />
                Global Threat Assessment
            </h3>

            <div className="space-y-8">
                {/* Nuclear Risk Gauge */}
                <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Zap size={12} className="text-yellow-500" /> Nuclear Escalation Risk
                        </span>
                        <span className={`text-xs font-black font-mono ${nuclearActive ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                            {nuclearActive ? 'HIGH' : 'LOW'}
                        </span>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-900 border border-gray-800">
                        <div
                            style={{ width: nuclearActive ? "85%" : "15%" }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${nuclearActive ? 'bg-red-600' : 'bg-green-600'}`}
                        ></div>
                    </div>
                </div>

                {/* Overall Instability Score */}
                <div className="flex items-center justify-between bg-black/40 p-5 rounded-xl border border-gray-800">
                    <div>
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Instability Score</h4>
                        <p className="text-2xl font-black text-white">{avgRisk}<span className="text-geo-red text-sm">/100</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-geo-red/20 border-t-geo-red animate-spin"></div>
                </div>

                {/* Hotspot Indicators */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={12} /> Critical Fronts
                    </h4>
                    {conflicts.filter(c => c.riskLevel === 'Critical').slice(0, 3).map((c, i) => (
                        <div key={i} className="flex justify-between items-center text-xs group">
                            <span className="text-gray-400 group-hover:text-white transition-colors">{c.title}</span>
                            <span className="bg-red-900/30 text-red-500 px-2 py-0.5 rounded border border-red-900/50 font-mono font-bold">
                                {c.intensity}%
                            </span>
                        </div>
                    ))}
                </div>

                {/* Analyst Warning */}
                <div className="mt-6 p-4 bg-red-900/10 border border-red-900/30 rounded-lg flex gap-3">
                    <AlertTriangle className="text-red-500 shrink-0" size={18} />
                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                        "Instability score has risen by 12% in the last 48 hours due to naval deployment in the Indo-Pacific region. Strategic readiness recommended."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GlobalRiskWidget;
