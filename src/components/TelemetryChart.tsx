import React, { useState } from 'react';
import { TrendingUp, Activity, Sparkles } from 'lucide-react';

interface TelemetryChartProps {
  solarAbsorption: number;
  hvacTemp: number;
  evFleet: number;
  aiShadowGridEnabled: boolean;
  onToggleShadowGrid: () => void;
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({
  solarAbsorption,
  hvacTemp,
  evFleet,
  aiShadowGridEnabled,
  onToggleShadowGrid,
  isDarkMode,
  themePalette,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Time labels 06:00 to 18:00 (12 hours)
  const hours = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  const forecastHours = ['20:00', '22:00', '00:00', '02:00', '04:00', '06:00'];

  // Base curves modified directly by sliders
  // HVAC temp lower -> higher demand; EV fleet adds battery charging buffer
  const hvacFactor = (28 - hvacTemp) * 12; // 18 -> 120 extra demand, 28 -> 0
  const evDemand = evFleet * 3.5;
  const solarFactor = (solarAbsorption / 100) * 480;

  // Demand baseline points
  const demandPoints = [
    320 + hvacFactor * 0.4 + evDemand * 0.2,
    460 + hvacFactor * 0.7 + evDemand * 0.5,
    620 + hvacFactor * 1.0 + evDemand * 0.8,
    710 + hvacFactor * 1.2 + evDemand * 0.9,
    680 + hvacFactor * 1.1 + evDemand * 0.7,
    590 + hvacFactor * 0.8 + evDemand * 0.6,
    490 + hvacFactor * 0.5 + evDemand * 0.4,
  ];

  // Renewable Generation Supply points (bell curve for solar)
  const supplyPoints = [
    80 + solarFactor * 0.15,
    290 + solarFactor * 0.55,
    580 + solarFactor * 0.90,
    790 + solarFactor * 1.15,
    740 + solarFactor * 1.05,
    480 + solarFactor * 0.70,
    140 + solarFactor * 0.25,
  ];

  // AI Shadow Forecast points (dashed 12-hour future)
  const shadowForecastPoints = [
    420 + hvacFactor * 0.3,
    360 + hvacFactor * 0.2,
    290 + hvacFactor * 0.1,
    260 + hvacFactor * 0.1,
    310 + hvacFactor * 0.2,
    380 + hvacFactor * 0.3,
  ];

  // Chart dimensions
  const svgWidth = 640;
  const svgHeight = 240;
  const paddingX = 40;
  const paddingY = 30;
  const maxVal = 1050;

  const getX = (index: number, total: number) => {
    return paddingX + (index / (total - 1)) * (svgWidth - paddingX * 2);
  };

  const getY = (val: number) => {
    return svgHeight - paddingY - (val / maxVal) * (svgHeight - paddingY * 2);
  };

  // Build SVG path strings
  const buildSmoothPath = (points: number[]) => {
    return points.reduce((acc, curr, idx) => {
      const x = getX(idx, points.length);
      const y = getY(curr);
      if (idx === 0) return `M ${x} ${y}`;
      const prevX = getX(idx - 1, points.length);
      const prevY = getY(points[idx - 1]);
      const cp1x = prevX + (x - prevX) / 2;
      const cp1y = prevY;
      const cp2x = prevX + (x - prevX) / 2;
      const cp2y = y;
      return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
    }, '');
  };

  const demandPath = buildSmoothPath(demandPoints);
  const supplyPath = buildSmoothPath(supplyPoints);

  // Area under supply path for glowing gradient
  const supplyArea = `${supplyPath} L ${getX(supplyPoints.length - 1, supplyPoints.length)} ${svgHeight - paddingY} L ${getX(0, supplyPoints.length)} ${svgHeight - paddingY} Z`;

  // Shadow grid forecast path
  const shadowPath = shadowForecastPoints.reduce((acc, curr, idx) => {
    // connect from last demand point
    const x = svgWidth / 2 + (idx / (shadowForecastPoints.length - 1)) * ((svgWidth - paddingX) - svgWidth / 2);
    const y = getY(curr);
    if (idx === 0) return `M ${getX(demandPoints.length - 1, demandPoints.length)} ${getY(demandPoints[demandPoints.length - 1])} L ${x} ${y}`;
    return `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className={`p-5 rounded-32 border transition-all ${
      isDarkMode 
        ? 'bg-neutral-900 border-neutral-800' 
        : themePalette === 'sand'
        ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
        : 'bg-white border-[#4d928f]/20 shadow-soft'
    }`}>
      {/* Chart Top Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold tracking-tight text-[#191614] dark:text-sand-100">
              Real-Time Vector Power Load vs Generation
            </h3>
          </div>
          <p className="text-[11px] text-neutral-500 mt-0.5">
            Dynamic client-side vector curve updating instantly with micro-grid slider telemetry
          </p>
        </div>

        {/* Shadow Grid Toggle Switch */}
        <div className="flex items-center gap-2.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Enable AI Predictive Shadow Grid
            </span>
            <div 
              onClick={onToggleShadowGrid}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                aiShadowGridEnabled ? 'bg-emerald-600' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform transform shadow-sm ${
                aiShadowGridEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
          </label>
        </div>
      </div>

      {/* SVG Chart Graphic */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none overflow-visible">
          <defs>
            <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4d928f" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4d928f" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[200, 400, 600, 800, 1000].map((val) => (
            <g key={val}>
              <line
                x1={paddingX}
                y1={getY(val)}
                x2={svgWidth - paddingX}
                y2={getY(val)}
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-neutral-200 dark:text-neutral-800"
                strokeDasharray="4 4"
              />
              <text
                x={paddingX - 8}
                y={getY(val) + 3}
                textAnchor="end"
                className="text-[9px] fill-neutral-400 font-mono"
              >
                {val}kW
              </text>
            </g>
          ))}

          {/* Area Fill for Supply */}
          <path d={supplyArea} fill="url(#supplyGradient)" />

          {/* Supply Curve (Mint / Accent) */}
          <path
            d={supplyPath}
            fill="none"
            stroke="#4d928f"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Demand Curve (Slate / Dark) */}
          <path
            d={demandPath}
            fill="none"
            stroke={isDarkMode ? '#e2e8f0' : '#191614'}
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* AI Predictive Shadow Grid (Dashed Amber/Cyan Line for next 12h) */}
          {aiShadowGridEnabled && (
            <g className="animate-fadeIn">
              <path
                d={shadowPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
              <text
                x={svgWidth - paddingX - 10}
                y={getY(shadowForecastPoints[shadowForecastPoints.length - 1]) - 10}
                textAnchor="end"
                className="text-[9px] fill-amber-500 font-mono font-bold"
              >
                12h Forecast (+14% buffer)
              </text>
            </g>
          )}

          {/* Data point dots & hover triggers */}
          {demandPoints.map((dp, idx) => {
            const x = getX(idx, demandPoints.length);
            const yDemand = getY(dp);
            const ySupply = getY(supplyPoints[idx]);
            const isHover = hoverIndex === idx;

            return (
              <g key={idx} onMouseEnter={() => setHoverIndex(idx)} onMouseLeave={() => setHoverIndex(null)} className="cursor-pointer">
                {/* Vertical guide line on hover */}
                {isHover && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={svgHeight - paddingY}
                    stroke="#7f5539"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Supply point */}
                <circle cx={x} cy={ySupply} r={isHover ? 6 : 4} fill="#4d928f" stroke="#fff" strokeWidth="2" />
                {/* Demand point */}
                <circle cx={x} cy={yDemand} r={isHover ? 6 : 4} fill="#191614" stroke="#fff" strokeWidth="2" />

                {/* Time Axis Labels */}
                <text
                  x={x}
                  y={svgHeight - paddingY + 16}
                  textAnchor="middle"
                  className={`text-[10px] font-mono ${isHover ? 'fill-neutral-900 font-bold dark:fill-white' : 'fill-neutral-400'}`}
                >
                  {hours[idx]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip if Hovering */}
        {hoverIndex !== null && (
          <div 
            className="absolute top-2 p-2.5 rounded-xl bg-[#191614] text-white text-[11px] font-mono pointer-events-none shadow-xl border border-neutral-700 animate-fadeIn"
            style={{
              left: `${(hoverIndex / (demandPoints.length - 1)) * 75 + 10}%`
            }}
          >
            <p className="font-bold text-neutral-300">Time: {hours[hoverIndex]}</p>
            <p className="text-emerald-400">Gen Supply: {Math.round(supplyPoints[hoverIndex])} kW</p>
            <p className="text-amber-300">Net Demand: {Math.round(demandPoints[hoverIndex])} kW</p>
            <p className="text-neutral-400 text-[9px] mt-0.5">
              Balance: {Math.round(supplyPoints[hoverIndex] - demandPoints[hoverIndex]) > 0 ? '+ Surplus Export' : '- Grid Draw'}
            </p>
          </div>
        )}
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-black/5 dark:border-white/5 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#191614] dark:bg-white" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Power Consumption Demand</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#4d928f]" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Renewable Generation Supply</span>
          </div>
          {aiShadowGridEnabled && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-amber-500 border border-dashed border-amber-600" />
              <span className="font-medium text-amber-600 dark:text-amber-400">AI Predictive Shadow (12h Forecast)</span>
            </div>
          )}
        </div>

        <div className="text-[11px] font-mono text-neutral-500">
          Delta: <span className="font-bold text-emerald-600">{Math.round(solarFactor - hvacFactor)} kW Clean Offset</span>
        </div>
      </div>
    </div>
  );
};
