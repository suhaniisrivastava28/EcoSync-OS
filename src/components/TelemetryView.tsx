import React, { useState } from 'react';
import { CampusZone, TelemetryState } from '../types';
import { TelemetryChart } from './TelemetryChart';
import { GeospatialZoneMap } from './GeospatialZoneMap';
import { AchievementsRack, AchievementBadge } from './AchievementsRack';
import { 
  Sun, 
  Thermometer, 
  Car, 
  Leaf, 
  DollarSign, 
  Zap, 
  Sliders, 
  RefreshCw, 
  RotateCcw,
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface TelemetryViewProps {
  telemetry: TelemetryState;
  setTelemetry: React.Dispatch<React.SetStateAction<TelemetryState>>;
  zones: CampusZone[];
  achievements: AchievementBadge[];
  totalScore: number;
  onOptimizeGrid: () => void;
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const TelemetryView: React.FC<TelemetryViewProps> = ({
  telemetry,
  setTelemetry,
  zones,
  achievements,
  totalScore,
  onOptimizeGrid,
  isDarkMode,
  themePalette,
}) => {
  const [currency, setCurrency] = useState<'$' | '₹' | '€'>('$');
  const [selectedZone, setSelectedZone] = useState<CampusZone | null>(zones[0]);

  // Derived calculations based on telemetry sliders
  // 1. Carbon reduction delta in tons (based on solar absorption and ev fleet)
  const carbonDelta = +( (telemetry.solarAbsorption * 0.42) + (telemetry.evFleetDeployment * 0.18) + ((telemetry.hvacTempThreshold - 18) * 0.65) ).toFixed(1);

  // 2. Grid operational savings
  const baseSavingsUSD = Math.round( (telemetry.solarAbsorption * 125) + (telemetry.evFleetDeployment * 48) + ((telemetry.hvacTempThreshold - 18) * 110) );
  const formattedSavings = currency === '₹' 
    ? `₹${(baseSavingsUSD * 86).toLocaleString()}` 
    : currency === '€' 
    ? `€${Math.round(baseSavingsUSD * 0.92).toLocaleString()}` 
    : `$${baseSavingsUSD.toLocaleString()}`;

  // 3. Resource Efficiency Index %
  const efficiencyIndex = Math.min(99.4, Math.round( 60 + (telemetry.solarAbsorption * 0.22) + (telemetry.evFleetDeployment * 0.24) + ((telemetry.hvacTempThreshold - 18) * 0.9) ));

  const handleSliderChange = (key: keyof TelemetryState, value: any) => {
    setTelemetry(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      {/* Top Banner & Quick Optimize */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#191614] dark:text-sand-100">
            Telemetry Control Grid
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Real-time digital twin variables • Dynamic vector grid load balancing • Sub-second telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOptimizeGrid}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-glow-mint transition-all transform hover:scale-102 active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Auto-Optimize Grid</span>
          </button>
          
          <button
            onClick={() => setTelemetry({
              solarAbsorption: 65,
              hvacTempThreshold: 22,
              evFleetDeployment: 24,
              aiShadowGridEnabled: true,
              weather: 'Sunny'
            })}
            className={`p-2 rounded-full border transition-colors ${
              isDarkMode ? 'border-neutral-700 hover:bg-neutral-800' : 'border-[#dfc7b2] hover:bg-[#e9dacb]'
            }`}
            title="Reset to Balanced Defaults"
          >
            <RotateCcw className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      </div>

      {/* Bento Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Carbon Reduction Delta */}
        <div className={`p-5 rounded-24 border transition-all ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : themePalette === 'sand'
            ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
            : 'bg-white border-[#4d928f]/25 shadow-soft'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Carbon Delta</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-[#191614] dark:text-sand-100">
              +{carbonDelta}
            </span>
            <span className="text-xs font-semibold text-emerald-600">tons CO₂e</span>
          </div>
          <p className="text-[10px] text-neutral-400 mt-2">
            Dynamic client delta vs fossil benchmark
          </p>
        </div>

        {/* Card 2: Grid Operational Savings */}
        <div className={`p-5 rounded-24 border transition-all ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : themePalette === 'sand'
            ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
            : 'bg-white border-[#4d928f]/25 shadow-soft'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Daily Grid Savings</span>
            <div className="flex items-center gap-1 p-0.5 bg-black/5 dark:bg-white/5 rounded-full text-[10px] font-bold font-mono">
              {(['$', '₹', '€'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    currency === c ? 'bg-[#191614] text-white' : 'text-neutral-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-[#191614] dark:text-sand-100">
              {formattedSavings}
            </span>
            <span className="text-xs font-semibold text-emerald-600">/ 24 hrs</span>
          </div>
          <p className="text-[10px] text-neutral-400 mt-2">
            Avoided peak demand surge tariff
          </p>
        </div>

        {/* Card 3: Resource Efficiency Index */}
        <div className={`p-5 rounded-24 border transition-all ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : themePalette === 'sand'
            ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
            : 'bg-white border-[#4d928f]/25 shadow-soft'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Efficiency Index</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-[#191614] dark:text-sand-100">
              {efficiencyIndex}%
            </span>
            <span className="text-xs font-semibold text-emerald-600">Optimal</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${efficiencyIndex}%` }}
            />
          </div>
        </div>

        {/* Card 4: Net Campus Micro-Grid Flow */}
        <div className={`p-5 rounded-24 border transition-all ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : themePalette === 'sand'
            ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
            : 'bg-white border-[#4d928f]/25 shadow-soft'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Renewable Feed</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600">
              <Sun className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-[#191614] dark:text-sand-100">
              {Math.round(telemetry.solarAbsorption * 7.8)} kW
            </span>
            <span className="text-xs font-semibold text-sky-600">Active</span>
          </div>
          <p className="text-[10px] text-neutral-400 mt-2">
            V2G Storage: {telemetry.evFleetDeployment * 12} kWh Buffer
          </p>
        </div>

      </div>

      {/* Main Grid: Variable Sliders & Vector Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Variable Sliders */}
        <div className={`p-5 rounded-32 border transition-all flex flex-col justify-between ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : themePalette === 'sand'
            ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
            : 'bg-white border-[#4d928f]/25 shadow-soft'
        }`}>
          <div>
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-black/5 dark:border-white/5">
              <div className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-[#191614] dark:text-white">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-[#191614] dark:text-sand-100">
                  Interactive Variable Controls
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Sliders reactively modulate the live vector chart & heatmap
                </p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Slider 1: Solar Grid Absorption */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-[#191614] dark:text-sand-100 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    Solar Grid Absorption
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                    {telemetry.solarAbsorption}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={telemetry.solarAbsorption}
                  onChange={(e) => handleSliderChange('solarAbsorption', Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#4d928f]"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>0% (Grid Only)</span>
                  <span>100% (Full Net-Zero)</span>
                </div>
              </div>

              {/* Slider 2: Smart HVAC Temperature Threshold */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-[#191614] dark:text-sand-100 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-sky-500" />
                    Smart HVAC Temp Threshold
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600">
                    {telemetry.hvacTempThreshold}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="28"
                  step="0.5"
                  value={telemetry.hvacTempThreshold}
                  onChange={(e) => handleSliderChange('hvacTempThreshold', Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#4d928f]"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>18°C (High Load)</span>
                  <span>24°C (Eco)</span>
                  <span>28°C (Eco Max)</span>
                </div>
              </div>

              {/* Slider 3: Automated EV Fleet Deployment */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-[#191614] dark:text-sand-100 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-emerald-500" />
                    Automated EV Fleet Deployment
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                    {telemetry.evFleetDeployment} Vehicles
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={telemetry.evFleetDeployment}
                  onChange={(e) => handleSliderChange('evFleetDeployment', Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#4d928f]"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>0 (Depot)</span>
                  <span>25 (Peak Transit)</span>
                  <span>50 (Max V2G)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Autonomous Dispatch Scenarios
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTelemetry(prev => ({ ...prev, solarAbsorption: 95, hvacTempThreshold: 25, evFleetDeployment: 42 }))}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold hover:bg-emerald-500/20 text-center"
              >
                🌿 Net-Zero Peak
              </button>
              <button
                onClick={() => setTelemetry(prev => ({ ...prev, solarAbsorption: 30, hvacTempThreshold: 19, evFleetDeployment: 10 }))}
                className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-semibold hover:bg-amber-500/20 text-center"
              >
                🔥 Heatwave Surge
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Vector Chart */}
        <div className="lg:col-span-2">
          <TelemetryChart
            solarAbsorption={telemetry.solarAbsorption}
            hvacTemp={telemetry.hvacTempThreshold}
            evFleet={telemetry.evFleetDeployment}
            aiShadowGridEnabled={telemetry.aiShadowGridEnabled}
            onToggleShadowGrid={() => setTelemetry(prev => ({ ...prev, aiShadowGridEnabled: !prev.aiShadowGridEnabled }))}
            isDarkMode={isDarkMode}
            themePalette={themePalette}
          />
        </div>

      </div>

      {/* Central "Geospatial Smart Zone Map" & Heatmap */}
      <GeospatialZoneMap
        zones={zones}
        solarAbsorption={telemetry.solarAbsorption}
        hvacTemp={telemetry.hvacTempThreshold}
        evFleet={telemetry.evFleetDeployment}
        selectedZone={selectedZone}
        onSelectZone={setSelectedZone}
        isDarkMode={isDarkMode}
        themePalette={themePalette}
      />

      {/* Achievements Rack Widget */}
      <AchievementsRack
        badges={achievements}
        totalScore={totalScore}
        isDarkMode={isDarkMode}
        themePalette={themePalette}
      />
    </div>
  );
};
