import React from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const GlobalConflictMap = ({ conflicts, onMarkerClick }) => {
    // Helper to get color based on status/risk
    const getCountryColor = (countryName) => {
        const conflict = conflicts.find(c =>
            c.involvedParties.mainActors.includes(countryName)
        );

        if (!conflict) return "#1e293b"; // Default background

        switch (conflict.riskLevel) {
            case 'Critical': return "#ef4444"; // Red
            case 'High': return "#f97316";    // Orange
            case 'Moderate': return "#eab308"; // Yellow
            default: return "#22c55e";        // Green (Peace)
        }
    };

    return (
        <div className="w-full h-[600px] bg-geo-navy rounded-2xl border border-gray-800 relative overflow-hidden shadow-2xl">
            {/* Header Overlay */}
            <div className="absolute top-6 left-6 z-10">
                <h2 className="text-xl font-bold text-white tracking-widest uppercase italic flex items-center gap-2">
                    <span className="w-2 h-2 bg-geo-red rounded-full animate-ping"></span>
                    Live Strategic Map
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mt-1">Satellite Intelligence Flow | Real-Time Assessment</p>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-6 left-6 z-10 space-y-2 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-gray-800">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Conflict Intensity</h4>
                <div className="flex items-center gap-3 text-xs">
                    <span className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
                    <span className="text-gray-300">Active War (Critical)</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                    <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
                    <span className="text-gray-300">Rising Tension (High)</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                    <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
                    <span className="text-gray-300">Frozen Conflict</span>
                </div>
            </div>

            <ComposableMap projectionConfig={{ scale: 160 }}>
                <ZoomableGroup center={[20, 10]} zoom={1}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryColor = getCountryColor(geo.properties.name);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: {
                                                fill: countryColor,
                                                outline: "none",
                                                stroke: "#0f172a",
                                                strokeWidth: 0.5,
                                                transition: "all 500ms"
                                            },
                                            hover: {
                                                fill: "#334155",
                                                outline: "none",
                                                cursor: "pointer"
                                            },
                                            pressed: {
                                                fill: "#ef4444",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>

                    {conflicts.map((conflict) => (
                        <Marker
                            key={conflict._id}
                            coordinates={[conflict.coordinates.lng, conflict.coordinates.lat]}
                            onClick={() => onMarkerClick(conflict)}
                        >
                            <g className="cursor-pointer group">
                                <circle
                                    r={4}
                                    fill={conflict.riskLevel === 'Critical' ? '#ef4444' : '#f97316'}
                                    className="animate-pulse"
                                />
                                <circle
                                    r={8}
                                    fill="transparent"
                                    stroke={conflict.riskLevel === 'Critical' ? '#ef4444' : '#f97316'}
                                    strokeWidth={0.5}
                                    className="animate-ping"
                                />
                                <text
                                    textAnchor="middle"
                                    y={-15}
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        fill: "#fff",
                                        fontSize: 8,
                                        fontWeight: "bold",
                                        textShadow: "0 0 5px rgba(0,0,0,0.8)",
                                        pointerEvents: "none",
                                        visibility: "hidden"
                                    }}
                                    className="group-hover:visible"
                                >
                                    {conflict.title.toUpperCase()}
                                </text>
                            </g>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default GlobalConflictMap;
