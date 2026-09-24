import React, { useState } from 'react';
import { CampusZone } from '../types';
import { Sun, Zap, Shield, BatteryCharging, Building, Activity, Layers, Thermometer, Wind } from 'lucide-react';

interface GeospatialZoneMapProps {
  zones: CampusZone[];
  solarAbsorption: number;
  hvacTemp: number;
  evFleet: number;
  selectedZone: CampusZone | null;
  onSelectZone: (zone: CampusZone) => void;
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const GeospatialZoneMap: React.FC<GeospatialZoneMapProps> = ({
  zones,
  solarAbsorption,
  hvacTemp,
  evFleet,
  selectedZone,
  onSelectZone,
  isDarkMode,
  themePalette,
}) => {
  const [activeLayer, setActiveLayer] = useState<'twin' | 'thermal' | 'carbon'>('twin');

  // Heatmap intensity dynamic calculation based on HVAC & Solar
  const getZoneStatusColor = (zone: CampusZone) => {
    // Dynamic status based on controls
    if (zone.id === 'zone-solar') {
      return solarAbsorption > 60 ? 'mint' : 'amber';
    }
    if (zone.id === 'zone-quad' || zone.id === 'zone-labs') {
      return hvacTemp < 21 ? 'amber' : 'mint';
    }
    if (zone.id === 'zone-gateway') {
      return (solarAbsorption > 70 && evFleet > 25) ? 'mint' : 'amber';
    }
    return 'mint';
  };

  return (
    <div className={`relative rounded-32 p-5 border overflow-hidden transition-all ${
      isDarkMode 
        ? 'bg-neutral-900 border-neutral-800' 
        : themePalette === 'sand'
        ? 'bg-[#f5ebe0]/80 border-[#dfc7b2]'
        : 'bg-[#eff7f5] border-[#4d928f]/25'
    }`}>
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-10 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-[#191614] dark:text-sand-100 flex items-center gap-2">
              <span>Geospatial Smart Zone Map</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
                Digital Twin Layer
              </span>
            </h3>
            <p className="text-[11px] text-neutral-500">
              Interactive schematic campus micro-grid • Real-time reactive nodes
            </p>
          </div>
        </div>

        {/* Map Layer Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-black/5 dark:bg-white/5 rounded-full text-[11px] font-medium">
          <button
            onClick={() => setActiveLayer('twin')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeLayer === 'twin' ? 'bg-[#191614] text-white shadow-xs' : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Digital Twin
          </button>
          <button
            onClick={() => setActiveLayer('thermal')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeLayer === 'thermal' ? 'bg-[#191614] text-white shadow-xs' : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Thermal Heatmap
          </button>
          <button
            onClick={() => setActiveLayer('carbon')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeLayer === 'carbon' ? 'bg-[#191614] text-white shadow-xs' : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Solar Density
          </button>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[340px] sm:h-[400px] rounded-24 bg-gradient-to-br from-[#dfc7b2]/30 via-white/50 to-[#e9dacb]/40 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 border border-black/5 dark:border-white/5 overflow-hidden shadow-inner">
        
        {/* Subtle Campus Grid & Road Vector Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#9c6644] dark:text-neutral-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Main campus boulevard vectors */}
          <path d="M 50 100 Q 250 180 550 160 T 900 240" fill="none" stroke="#cfb195" strokeWidth="8" strokeLinecap="round" />
          <path d="M 200 40 L 200 360" fill="none" stroke="#cfb195" strokeWidth="6" strokeDasharray="6 6" />
          <path d="M 500 50 L 500 350" fill="none" stroke="#cfb195" strokeWidth="6" strokeDasharray="6 6" />
          <path d="M 100 280 L 800 280" fill="none" stroke="#cfb195" strokeWidth="6" />

          {/* Interconnect Bus Power Lines with animated energy pulses */}
          <path d="M 180 120 L 480 130 L 780 100 L 750 260 L 460 300 L 220 270 Z" 
                fill="none" 
                stroke={solarAbsorption > 60 ? "#10b981" : "#f59e0b"} 
                strokeWidth="2.5" 
                strokeDasharray="8 6" 
                className="animate-pulse" />
        </svg>

        {/* Dynamic Heatmap Radiant Glow Circles */}
        {activeLayer === 'thermal' && (
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute rounded-full blur-2xl transition-all duration-700 opacity-60"
              style={{
                top: '20%',
                left: '40%',
                width: '180px',
                height: '180px',
                backgroundColor: hvacTemp < 21 ? 'rgba(239, 68, 68, 0.45)' : 'rgba(16, 185, 129, 0.35)'
              }}
            />
            <div 
              className="absolute rounded-full blur-2xl transition-all duration-700 opacity-60"
              style={{
                top: '55%',
                left: '65%',
                width: '200px',
                height: '200px',
                backgroundColor: 'rgba(245, 158, 11, 0.35)'
              }}
            />
          </div>
        )}

        {activeLayer === 'carbon' && (
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute rounded-full blur-3xl transition-all duration-700"
              style={{
                top: '15%',
                left: '10%',
                width: '220px',
                height: '220px',
                backgroundColor: `rgba(16, 185, 129, ${solarAbsorption / 120})`
              }}
            />
          </div>
        )}

        {/* Interactive Zone Pins on Map */}
        {zones.map((zone) => {
          const stateColor = getZoneStatusColor(zone);
          const isOptimized = stateColor === 'mint';
          const isSelected = selectedZone?.id === zone.id;

          const getZoneIcon = (id: string) => {
            if (id.includes('solar')) return <Sun className="w-4 h-4" />;
            if (id.includes('quad')) return <Building className="w-4 h-4" />;
            if (id.includes('gateway')) return <Zap className="w-4 h-4" />;
            if (id.includes('ev')) return <BatteryCharging className="w-4 h-4" />;
            return <Activity className="w-4 h-4" />;
          };

          return (
            <div
              key={zone.id}
              onClick={() => onSelectZone(zone)}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute cursor-pointer group z-20"
            >
              {/* Pulsing indicator ring */}
              <div className="relative flex items-center justify-center">
                <span className={`absolute -inset-2 rounded-full opacity-75 ${
                  isOptimized 
                    ? 'bg-emerald-400 animate-ping-subtle' 
                    : 'bg-amber-400 animate-ping'
                }`} />

                {/* Core Pin Button */}
                <button className={`relative w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all transform group-hover:scale-115 ${
                  isSelected
                    ? 'ring-4 ring-black dark:ring-white scale-110'
                    : ''
                } ${
                  isOptimized
                    ? 'bg-[#10b981] text-white shadow-glow-mint'
                    : 'bg-[#f59e0b] text-neutral-900 shadow-glow-amber'
                }`}>
                  {getZoneIcon(zone.id)}
                </button>

                {/* Node Pill Tag */}
                <div className={`absolute top-full mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight whitespace-nowrap shadow-sm border transition-all ${
                  isDarkMode 
                    ? 'bg-neutral-900/90 border-neutral-700 text-sand-100' 
                    : 'bg-white/95 border-[#dfc7b2] text-[#191614]'
                }`}>
                  <span>{zone.name}</span>
                  <span className={`ml-1.5 font-mono text-[9px] ${
                    isOptimized ? 'text-emerald-600' : 'text-amber-600 font-bold'
                  }`}>
                    {isOptimized ? '● Optimized' : '▲ Load Spike'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Live Legend Micro Card */}
        <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-black/5 dark:border-white/5 text-[10px] flex items-center gap-3 z-20">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping-subtle" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Glow Mint (Optimized)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Pulse Amber (Spike Load)</span>
          </div>
        </div>

        {/* Selected Zone Quick Peek Modal at top right */}
        {selectedZone && (
          <div className="absolute top-3 right-3 p-3.5 rounded-20 bg-[#191614]/90 text-white backdrop-blur-md max-w-xs shadow-2xl border border-neutral-700 z-30 animate-fadeIn text-left">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                  {selectedZone.code}
                </span>
                <h4 className="font-bold text-xs text-sand-100 mt-1">{selectedZone.name}</h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">{selectedZone.temp}°C</span>
            </div>
            <p className="text-[11px] text-neutral-300 mt-1 leading-snug">
              {selectedZone.description}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-neutral-700 text-[10px] font-mono">
              <div>
                <span className="text-neutral-400 block">Demand:</span>
                <span className="font-bold text-amber-300">{selectedZone.currentDemand} kW</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Solar Feed:</span>
                <span className="font-bold text-emerald-400">{selectedZone.solarGen} kW</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
