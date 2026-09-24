import React, { useState } from 'react';
import { AutonomousNode, HostelLeaderboardItem } from '../types';
import { 
  PieChart as PieIcon, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Clock, 
  Trophy, 
  Flame, 
  Droplet, 
  Zap, 
  Check, 
  Filter,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResourceMatrixViewProps {
  nodes: AutonomousNode[];
  onToggleNodeStatus: (id: string, newStatus: AutonomousNode['status']) => void;
  leaderboard: HostelLeaderboardItem[];
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const ResourceMatrixView: React.FC<ResourceMatrixViewProps> = ({
  nodes,
  onToggleNodeStatus,
  leaderboard,
  isDarkMode,
  themePalette,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedDonutSegment, setSelectedDonutSegment] = useState<number | null>(0);

  // Campus Zone Distribution data for Donut Chart
  const zoneDistribution = [
    { name: 'Lab Sub-Grids', share: 34, mwh: 430, color: '#4d928f' },
    { name: 'Academic Quad', share: 27, mwh: 340, color: '#9c6644' },
    { name: 'Hostel Infrastructure', share: 23, mwh: 295, color: '#cfb195' },
    { name: 'Tech Park Axis', share: 16, mwh: 205, color: '#dfc7b2' },
  ];

  // Calculate SVG donut slices
  let accumulatedAngle = 0;
  const donutSlices = zoneDistribution.map((item, idx) => {
    const angle = (item.share / 100) * 360;
    const startAngle = accumulatedAngle;
    accumulatedAngle += angle;
    return {
      ...item,
      startAngle,
      endAngle: accumulatedAngle,
    };
  });

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  const filteredNodes = activeCategory === 'All' 
    ? nodes 
    : nodes.filter(n => n.category === activeCategory);

  const handleCheerHostel = (hostelName: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      {/* View Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#191614] dark:text-sand-100">
            Resource Allocation Matrix
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Campus zone power distribution & autonomous node checklist management
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
            {nodes.filter(n => n.status === 'Active').length} of {nodes.length} Nodes Active
          </span>
        </div>
      </div>

      {/* Grid: Donut Chart & Hostel Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* DONUT CHART: Campus Zone Power Distribution (5 Cols) */}
        <div className={`lg:col-span-5 p-6 rounded-32 border transition-all ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : themePalette === 'sand'
            ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
            : 'bg-white border-[#4d928f]/20 shadow-soft'
        }`}>
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <PieIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#191614] dark:text-sand-100">
                Campus Zone Power Distribution
              </h3>
              <p className="text-[11px] text-neutral-500">
                Dynamic load partition across quad quadrants
              </p>
            </div>
          </div>

          {/* Donut SVG */}
          <div className="relative flex items-center justify-center my-4">
            <svg viewBox="0 0 240 240" className="w-56 h-56 transform -rotate-90">
              {donutSlices.map((slice, idx) => {
                const isSelected = selectedDonutSegment === idx;
                return (
                  <path
                    key={slice.name}
                    d={describeArc(120, 120, isSelected ? 82 : 78, slice.startAngle, slice.endAngle - 2)}
                    fill="none"
                    stroke={slice.color}
                    strokeWidth={isSelected ? 26 : 22}
                    className="transition-all duration-300 cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedDonutSegment(idx)}
                  />
                );
              })}
            </svg>

            {/* Donut Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {selectedDonutSegment !== null ? zoneDistribution[selectedDonutSegment].name : 'Total Load'}
              </span>
              <span className="text-2xl font-bold font-mono text-[#191614] dark:text-sand-100">
                {selectedDonutSegment !== null ? `${zoneDistribution[selectedDonutSegment].share}%` : '1,270 kW'}
              </span>
              <span className="text-[10px] text-emerald-600 font-mono">
                {selectedDonutSegment !== null ? `${zoneDistribution[selectedDonutSegment].mwh} MWh` : '99.4% Grid Uptime'}
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="space-y-2 mt-4 pt-3 border-t border-black/5 dark:border-white/5">
            {zoneDistribution.map((item, idx) => (
              <div
                key={item.name}
                onClick={() => setSelectedDonutSegment(idx)}
                className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                  selectedDonutSegment === idx 
                    ? 'bg-black/5 dark:bg-white/5 font-bold' 
                    : 'hover:bg-black/2'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-neutral-700 dark:text-neutral-300">{item.name}</span>
                </div>
                <div className="font-mono text-neutral-600 dark:text-neutral-400">
                  <span className="font-bold">{item.share}%</span> ({item.mwh} kW)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOSTEL SUSTAINABILITY LEADERBOARD (7 Cols) */}
        <div className={`lg:col-span-7 p-6 rounded-32 border transition-all ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : themePalette === 'sand'
            ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
            : 'bg-white border-[#4d928f]/20 shadow-soft'
        }`}>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-[#191614] dark:text-sand-100 flex items-center gap-2">
                  <span>Hostel Sustainability Leaderboard</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-mono">
                    Gamified League
                  </span>
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Weekly eco-points, kWh avoided, and zero-waste streaks
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-semibold text-neutral-500">
              Season 4 • Week 6
            </span>
          </div>

          <div className="space-y-3">
            {leaderboard.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-24 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  item.rank === 1
                    ? 'bg-amber-500/10 border-amber-500/30 dark:bg-amber-950/20'
                    : 'bg-black/2 dark:bg-white/2 border-black/5 dark:border-white/5 hover:border-black/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                    item.rank === 1
                      ? 'bg-amber-500 text-neutral-900 shadow-sm'
                      : item.rank === 2
                      ? 'bg-neutral-300 text-neutral-800'
                      : item.rank === 3
                      ? 'bg-[#cfb195] text-neutral-900'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                  }`}>
                    #{item.rank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#191614] dark:text-sand-100">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-medium">
                        {item.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-1 font-mono">
                      <span className="flex items-center gap-1 text-emerald-600">
                        <Zap className="w-3 h-3" /> {item.kwhSaved} kWh saved
                      </span>
                      <span className="flex items-center gap-1 text-sky-600">
                        <Droplet className="w-3 h-3" /> {item.waterSavedLiters} L water
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-black/5">
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-[#191614] dark:text-sand-100 block">
                      {item.points.toLocaleString()} pts
                    </span>
                    <span className="text-[10px] text-amber-600 font-medium flex items-center gap-0.5 justify-end">
                      <Flame className="w-3 h-3 text-amber-500" />
                      {item.streakDays}-day streak
                    </span>
                  </div>

                  <button
                    onClick={() => handleCheerHostel(item.name)}
                    className="px-3 py-1.5 rounded-full bg-[#191614] text-[#faf6f0] text-xs font-semibold hover:bg-neutral-800 transition-all text-center shadow-xs"
                  >
                    Cheer 👏
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* INTERACTIVE NODE MANAGEMENT CHECKLIST */}
      <div className={`p-6 rounded-32 border transition-all ${
        isDarkMode 
          ? 'bg-neutral-900 border-neutral-800' 
          : themePalette === 'sand'
          ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
          : 'bg-white border-[#4d928f]/20 shadow-soft'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
          <div>
            <h3 className="text-base font-bold tracking-tight text-[#191614] dark:text-sand-100">
              Interactive Autonomous Node Management Checklist
            </h3>
            <p className="text-xs text-neutral-500">
              Click any status chip to cycle operating modes (Active → Standby → Degraded → Maintenance)
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Water', 'Energy', 'HVAC', 'Waste', 'Lighting', 'Mobility'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#191614] text-[#faf6f0]'
                    : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Nodes Checklist Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 text-neutral-400 uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">Autonomous System Node</th>
                <th className="pb-3 font-semibold">Campus Zone</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Efficiency</th>
                <th className="pb-3 font-semibold">Current Flow / Load</th>
                <th className="pb-3 font-semibold">Toggleable Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filteredNodes.map((node) => {
                const getNextStatus = (curr: AutonomousNode['status']): AutonomousNode['status'] => {
                  if (curr === 'Active') return 'Standby';
                  if (curr === 'Standby') return 'Degraded';
                  if (curr === 'Degraded') return 'Maintenance';
                  return 'Active';
                };

                return (
                  <tr key={node.id} className="hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                    <td className="py-3 font-bold text-[#191614] dark:text-sand-100">
                      {node.name}
                      <span className="text-[10px] text-neutral-400 block font-mono font-normal">
                        Ping: {node.lastPing}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-600 dark:text-neutral-400">{node.zone}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[10px] font-medium">
                        {node.category}
                      </span>
                    </td>
                    <td className="py-3 font-mono font-semibold text-emerald-600">
                      {node.efficiency}%
                    </td>
                    <td className="py-3 font-mono text-neutral-500">
                      {node.load}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => onToggleNodeStatus(node.id, getNextStatus(node.status))}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-tight transition-all cursor-pointer shadow-xs ${
                          node.status === 'Active'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                            : node.status === 'Standby'
                            ? 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 hover:bg-sky-500/25'
                            : node.status === 'Degraded'
                            ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                            : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 hover:bg-rose-500/25'
                        }`}
                        title="Click to toggle next state"
                      >
                        ● {node.status}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
