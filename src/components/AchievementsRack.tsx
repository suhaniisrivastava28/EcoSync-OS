import React from 'react';
import { Award, Zap, Sun, Thermometer, Car, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
  iconName: 'zap' | 'sun' | 'thermometer' | 'car' | 'shield' | 'award';
  unlockedAt?: string;
}

interface AchievementsRackProps {
  badges: AchievementBadge[];
  totalScore: number;
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const AchievementsRack: React.FC<AchievementsRackProps> = ({
  badges,
  totalScore,
  isDarkMode,
  themePalette,
}) => {
  const getIcon = (name: AchievementBadge['iconName']) => {
    switch (name) {
      case 'zap': return <Zap className="w-4 h-4" />;
      case 'sun': return <Sun className="w-4 h-4" />;
      case 'thermometer': return <Thermometer className="w-4 h-4" />;
      case 'car': return <Car className="w-4 h-4" />;
      case 'shield': return <ShieldAlert className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className={`p-5 rounded-24 border transition-all ${
      isDarkMode 
        ? 'bg-neutral-900 border-neutral-800' 
        : themePalette === 'sand'
        ? 'bg-[#faf6f0] border-[#dfc7b2]/70 shadow-soft'
        : 'bg-white border-[#4d928f]/20 shadow-soft'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-[#191614] dark:text-sand-100">
              Achievements Unlocked
            </h3>
            <p className="text-[11px] text-neutral-500">
              {unlockedCount} of {badges.length} Eco-Badges Collected
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Eco-Score:</span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#191614] text-amber-300 dark:bg-neutral-800">
            {totalScore.toLocaleString()} Pts
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-3 rounded-20 border text-center transition-all flex flex-col items-center justify-between relative group ${
              badge.unlocked
                ? 'bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-950/30 dark:border-emerald-500/40 shadow-sm'
                : 'bg-neutral-100/60 border-neutral-200 dark:bg-neutral-800/40 dark:border-neutral-800 opacity-60'
            }`}
          >
            {badge.unlocked && (
              <span className="absolute top-1.5 right-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </span>
            )}

            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${
              badge.unlocked
                ? 'bg-emerald-500 text-white shadow-glow-mint'
                : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500'
            }`}>
              {getIcon(badge.iconName)}
            </div>

            <p className={`text-[11px] font-bold leading-tight line-clamp-2 ${
              badge.unlocked ? 'text-[#191614] dark:text-sand-100' : 'text-neutral-500'
            }`}>
              {badge.title}
            </p>

            <span className={`text-[10px] font-mono mt-1 font-semibold ${
              badge.unlocked ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'
            }`}>
              +{badge.points} Pts
            </span>

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-[#191614] text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-30">
              <p className="font-bold">{badge.title}</p>
              <p className="text-neutral-300 mt-0.5">{badge.description}</p>
              {badge.unlocked && (
                <p className="text-emerald-400 mt-1 font-mono">Status: Active & Verified</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
