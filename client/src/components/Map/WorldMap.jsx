import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useState } from 'react';

// URL for World TopoJSON
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = ({ onCountryClick }) => {
    const [hoveredCountry, setHoveredCountry] = useState(null);

    return (
        <div className="w-full h-[500px] bg-geo-navy rounded-xl border border-gray-800 relative overflow-hidden group">
            {/* Legend */}
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-gray-800 text-[10px] uppercase tracking-widest text-gray-400">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-geo-red shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span> High Tension
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-geo-yellow shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span> Emerging Risk
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span> Strategic Ally
                </div>
            </div>

            {/* Hover Tooltip */}
            {hoveredCountry && (
                <div className="absolute bottom-4 right-4 z-10 bg-geo-red text-white px-3 py-1.5 rounded-md font-bold text-xs animate-pulse shadow-lg">
                    INTEL: {hoveredCountry.toUpperCase()}
                </div>
            )}

            <ComposableMap
                projectionConfig={{ scale: 140 }}
                className="w-full h-full"
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const countryName = geo.properties.name;
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => setHoveredCountry(countryName)}
                                    onMouseLeave={() => setHoveredCountry(null)}
                                    onClick={() => onCountryClick(countryName)}
                                    style={{
                                        default: {
                                            fill: "#1e293b",
                                            outline: "none",
                                            stroke: "#334155",
                                            strokeWidth: 0.5,
                                            transition: "all 250ms"
                                        },
                                        hover: {
                                            fill: "#ef4444",
                                            outline: "none",
                                            stroke: "#fca5a5",
                                            strokeWidth: 1,
                                            cursor: "pointer"
                                        },
                                        pressed: {
                                            fill: "#7f1d1d",
                                            outline: "none"
                                        }
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default WorldMap;
