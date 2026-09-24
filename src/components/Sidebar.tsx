import React from 'react';
import { 
  Activity, 
  PieChart, 
  ShieldAlert, 
  Coins, 
  Smartphone, 
  Cpu, 
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeIncidentsCount: number;
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeIncidentsCount,
  isDarkMode,
  themePalette,
}) => {
  const navItems = [
    {
      id: 'telemetry',
      label: 'Telemetry Control Grid',
      short: 'Telemetry',
      icon: Activity,
      tag: 'Live Twin',
    },
    {
      id: 'matrix',
      label: 'Resource Allocation Matrix',
      short: 'Analytics',
      icon: PieChart,
      tag: 'Zones',
    },
    {
      id: 'incidents',
      label: 'AI Incident Dispatch Hub',
      short: 'Safety Hub',
      icon: ShieldAlert,
      badge: activeIncidentsCount > 0 ? activeIncidentsCount : undefined,
    },
    {
      id: 'ledger',
      label: 'ESG Carbon Credit Ledger',
      short: 'Token Log',
      icon: Coins,
      tag: 'Immutable',
    }
  ];

  return (
    <aside className={`w-full md:w-64 lg:w-72 p-3 sm:p-4 shrink-0 transition-colors ${
      isDarkMode 
        ? 'bg-neutral-900/60 border-neutral-800' 
        : themePalette === 'sand'
        ? 'bg-[#f5ebe0]/60 border-[#dfc7b2]/60'
        : 'bg-[#e1f0ec]/40 border-[#4d928f]/20'
    } md:border-r`}>
      
      {/* Sidebar header indicator */}
      <div className="hidden md:block mb-4 px-3 pt-1">
        <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold uppercase tracking-wider">
          <span>Command Navigation</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-mono">
            V 2.4 Active
          </span>
        </div>
      </div>

      {/* Navigation Pill Links */}
      <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-24 transition-all text-xs font-semibold whitespace-nowrap md:whitespace-normal group ${
                isActive
                  ? 'bg-[#191614] text-[#faf6f0] shadow-md scale-[1.01]'
                  : isDarkMode
                  ? 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                  : themePalette === 'sand'
                  ? 'text-[#524b46] hover:bg-[#e9dacb] hover:text-[#191614]'
                  : 'text-neutral-700 hover:bg-[#d5ebe5] hover:text-[#1e293b]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-neutral-800 text-amber-200' 
                    : isDarkMode 
                    ? 'bg-neutral-800 text-neutral-400 group-hover:text-white' 
                    : 'bg-[#dfc7b2]/50 text-[#7f5539] group-hover:text-black'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block leading-tight">{item.label}</span>
                  <span className="text-[10px] opacity-70 block font-normal md:hidden">
                    {item.short}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 ml-2">
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.tag && !item.badge && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full hidden lg:inline-block font-mono ${
                    isActive
                      ? 'bg-neutral-800 text-sand-300'
                      : isDarkMode
                      ? 'bg-neutral-800 text-neutral-400'
                      : 'bg-[#dfc7b2]/60 text-[#7f5539]'
                  }`}>
                    {item.tag}
                  </span>
                )}
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block ${
                  isActive ? 'opacity-100 text-sand-300' : ''
                }`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* System Status Mini Widget on Sidebar Bottom */}
      <div className={`hidden md:block mt-8 p-4 rounded-24 border ${
        isDarkMode 
          ? 'bg-neutral-900 border-neutral-800 text-sand-100' 
          : themePalette === 'sand'
          ? 'bg-[#dfc7b2]/35 border-[#dfc7b2] text-[#191614]'
          : 'bg-[#e1f0ec] border-[#4d928f]/30 text-[#1e293b]'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-emerald-600 animate-spin-slow" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Grid Engine</span>
        </div>
        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Dynamic load balancing is autonomously shifting 140 kW from Academic Quad to Battery storage.
        </p>
        <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono">
          <span className="text-neutral-500">Sub-grid Efficiency</span>
          <span className="font-bold text-emerald-600">94.8%</span>
        </div>
      </div>
    </aside>
  );
};
