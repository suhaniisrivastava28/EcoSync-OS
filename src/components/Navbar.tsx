import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { 
  Leaf, 
  Shield, 
  Sun, 
  Moon, 
  Palette, 
  Activity, 
  Terminal, 
  User, 
  ChevronDown, 
  LogOut,
  Sparkles,
  Layers
} from 'lucide-react';

interface NavbarProps {
  userProfile: UserProfile;
  onSelectRole: (role: 'Student' | 'Faculty' | 'Admin') => void;
  themePalette: 'sand' | 'eco';
  setThemePalette: (palette: 'sand' | 'eco') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  onSelectRole,
  themePalette,
  setThemePalette,
  isDarkMode,
  setIsDarkMode,
  activeTab,
  setActiveTab
}) => {
  const [time, setTime] = useState<string>('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#181614]/90 border-neutral-800 text-sand-100 backdrop-blur-md' 
        : themePalette === 'sand'
        ? 'bg-[#faf6f0]/90 border-[#dfc7b2]/60 text-[#191614] backdrop-blur-md'
        : 'bg-[#f2f8f6]/95 border-[#4d928f]/20 text-[#1e293b] backdrop-blur-md'
    }`}>
      {/* Top micro-bar: MANDATORY PORT VERIFICATION & TELEMETRY HEARTBEAT */}
      <div className={`py-1 px-4 sm:px-8 text-[11px] font-medium flex items-center justify-between border-b ${
        isDarkMode 
          ? 'bg-neutral-900 border-neutral-800 text-sand-300' 
          : themePalette === 'sand'
          ? 'bg-[#dfc7b2]/30 border-[#dfc7b2]/40 text-[#7f5539]'
          : 'bg-[#e1f0ec] border-[#4d928f]/20 text-[#2b5f5c]'
      }`}>
        <div className="flex items-center gap-2 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping-subtle" />
          <span className="font-semibold tracking-wide">
            Environment operational on secure port 5008
          </span>
          <span className="hidden md:inline text-neutral-400">•</span>
          <span className="hidden md:inline opacity-85">
            Latency: 4.2ms | Micro-Grid Loop Active
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 font-mono">
            <Activity className="w-3 h-3 text-emerald-500" />
            <span>Autonomous AI Mesh: Optimal</span>
          </div>
          <div className="font-mono text-xs font-semibold">
            {time}
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('telemetry')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm ${
              themePalette === 'sand'
                ? 'bg-[#191614] text-[#faf6f0]'
                : 'bg-[#4d928f] text-white'
            }`}>
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-2xl font-bold tracking-tight">
                  EcoSync OS
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  themePalette === 'sand'
                    ? 'bg-[#dfc7b2] text-[#191614]'
                    : 'bg-[#e1f0ec] text-[#2b5f5c]'
                }`}>
                  Smart Campus
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 -mt-0.5 tracking-wide hidden sm:block">
                Autonomous Command & Energy Twin
              </p>
            </div>
          </div>
        </div>

        {/* Right side controls: Role Pill, Palette Switcher, Dark Mode, Auth Showcase */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Palette Switcher Button */}
          <button
            onClick={() => setThemePalette(themePalette === 'sand' ? 'eco' : 'sand')}
            title={`Switch to ${themePalette === 'sand' ? 'Sage/Mint Eco Theme' : 'Warm Sand/Latte Theme (Screenshot Style)'}`}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isDarkMode 
                ? 'bg-neutral-800 text-sand-200 hover:bg-neutral-700' 
                : themePalette === 'sand'
                ? 'bg-[#e9dacb] text-[#191614] hover:bg-[#dfc7b2]'
                : 'bg-[#e1f0ec] text-[#2b5f5c] hover:bg-[#d0e8e2]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{themePalette === 'sand' ? 'Theme: Sand & Latte' : 'Theme: Mint & Sage'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Light / Dark Mode"
            className={`p-2 rounded-full transition-all ${
              isDarkMode 
                ? 'bg-neutral-800 text-amber-300 hover:bg-neutral-700' 
                : 'bg-[#e9dacb] text-[#191614] hover:bg-[#dfc7b2]'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile & Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full border transition-all ${
                isDarkMode 
                  ? 'bg-neutral-800/80 border-neutral-700 text-sand-100 hover:bg-neutral-700' 
                  : themePalette === 'sand'
                  ? 'bg-[#f4ebe1] border-[#dfc7b2] text-[#191614] hover:bg-[#e9dacb]'
                  : 'bg-white border-[#4d928f]/30 text-[#1e293b] hover:bg-[#eff7f5]'
              }`}
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-6 h-6 rounded-full object-cover border border-neutral-300"
              />
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold leading-tight">{userProfile.name}</p>
                <p className="text-[10px] text-neutral-500 capitalize">{userProfile.role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div 
                className={`absolute right-0 mt-2 w-64 rounded-24 p-3 shadow-xl border z-50 animate-fadeIn ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 text-sand-100' 
                    : 'bg-[#faf6f0] border-[#dfc7b2] text-[#191614]'
                }`}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-[#dfc7b2]/40 mb-2">
                  <p className="text-xs font-bold">{userProfile.name}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{userProfile.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#191614] text-[#faf6f0]">
                    Role: {userProfile.role}
                  </span>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1">
                  Switch Active Persona
                </p>
                
                {(['Admin', 'Faculty', 'Student'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onSelectRole(r);
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center justify-between ${
                      userProfile.role === r 
                        ? 'bg-[#191614] text-[#faf6f0]' 
                        : 'hover:bg-[#e9dacb] text-neutral-700'
                    }`}
                  >
                    <span>{r}</span>
                    {userProfile.role === r && <span className="text-[10px] text-emerald-400">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
