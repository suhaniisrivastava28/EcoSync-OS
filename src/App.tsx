import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TelemetryView } from './components/TelemetryView';
import { ResourceMatrixView } from './components/ResourceMatrixView';
import { IncidentHubView } from './components/IncidentHubView';
import { EsgLedgerView } from './components/EsgLedgerView';
import { VoiceCommandModal } from './components/VoiceCommandModal';
import { AchievementBadge } from './components/AchievementsRack';
import { 
  initialUserProfile, 
  campusZones as initialZones, 
  initialAutonomousNodes, 
  initialIncidentAlerts, 
  hostelLeaderboardData, 
  carbonCreditLedgerData 
} from './data/mockData';
import { UserProfile, UserRole, TelemetryState, CampusZone, AutonomousNode, IncidentAlert, CarbonCreditToken } from './types';
import { Mic, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  // Navigation & theme
  const [activeTab, setActiveTab] = useState<string>('telemetry');
  const [themePalette, setThemePalette] = useState<'sand' | 'eco'>('sand');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState<boolean>(false);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);

  // Telemetry variables
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    solarAbsorption: 72,
    hvacTempThreshold: 23.5,
    evFleetDeployment: 28,
    aiShadowGridEnabled: true,
    weather: 'Sunny'
  });

  // Zones, Nodes, Incidents, Ledger data
  const [zones, setZones] = useState<CampusZone[]>(initialZones);
  const [nodes, setNodes] = useState<AutonomousNode[]>(initialAutonomousNodes);
  const [incidents, setIncidents] = useState<IncidentAlert[]>(initialIncidentAlerts);
  const [ledger, setLedger] = useState<CarbonCreditToken[]>(carbonCreditLedgerData);

  // Gamification & Badges
  const [totalScore, setTotalScore] = useState<number>(3450);
  const [unlockedToast, setUnlockedToast] = useState<{ title: string; pts: number } | null>(null);

  const [achievements, setAchievements] = useState<AchievementBadge[]>([
    {
      id: 'b1',
      title: 'Carbon Neutral Champion',
      description: 'Programmatic trigger: Solar > 80% & HVAC > 24°C',
      points: 500,
      unlocked: false,
      iconName: 'zap'
    },
    {
      id: 'b2',
      title: 'Solar Titan',
      description: 'Surpassed 90% peak solar grid absorption',
      points: 350,
      unlocked: false,
      iconName: 'sun'
    },
    {
      id: 'b3',
      title: 'Thermal Maestro',
      description: 'Smart campus HVAC balanced within optimal comfort eco-band',
      points: 250,
      unlocked: true,
      iconName: 'thermometer'
    },
    {
      id: 'b4',
      title: 'V2G Grid Master',
      description: 'Mobilized >35 bidirectional EV batteries for peak buffering',
      points: 400,
      unlocked: false,
      iconName: 'car'
    },
    {
      id: 'b5',
      title: 'AI Failover Hero',
      description: 'Executed automated AI failover on critical infrastructure fault',
      points: 600,
      unlocked: false,
      iconName: 'shield'
    },
    {
      id: 'b6',
      title: 'Eco-League Pioneer',
      description: 'Enrolled in active campus zero-carbon leaderboard challenges',
      points: 200,
      unlocked: true,
      iconName: 'award'
    }
  ]);

  // Programmatic tracking logic:
  // When variables are shifted to optimal values (Solar > 80% and HVAC > 24°C), trigger toast and unlock badge!
  useEffect(() => {
    if (telemetry.solarAbsorption > 80 && telemetry.hvacTempThreshold > 24) {
      triggerUnlockBadge('b1', 'Carbon Neutral Champion', 500);
    }
    if (telemetry.solarAbsorption >= 90) {
      triggerUnlockBadge('b2', 'Solar Titan', 350);
    }
    if (telemetry.evFleetDeployment > 35) {
      triggerUnlockBadge('b4', 'V2G Grid Master', 400);
    }
  }, [telemetry.solarAbsorption, telemetry.hvacTempThreshold, telemetry.evFleetDeployment]);

  const triggerUnlockBadge = (id: string, title: string, pts: number) => {
    setAchievements(prev => {
      const target = prev.find(b => b.id === id);
      if (target && !target.unlocked) {
        // Trigger Toast & Confetti
        setUnlockedToast({ title, pts });
        setTotalScore(s => s + pts);

        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.25 }
        });

        setTimeout(() => {
          setUnlockedToast(null);
        }, 4500);

        return prev.map(b => b.id === id ? { ...b, unlocked: true } : b);
      }
      return prev;
    });
  };

  // Handler for AI Grid Auto-Optimize
  const handleOptimizeGrid = () => {
    setTelemetry({
      solarAbsorption: 92,
      hvacTempThreshold: 24.5,
      evFleetDeployment: 40,
      aiShadowGridEnabled: true,
      weather: 'Sunny'
    });
    triggerUnlockBadge('b1', 'Carbon Neutral Champion', 500);
    triggerUnlockBadge('b2', 'Solar Titan', 350);
    triggerUnlockBadge('b4', 'V2G Grid Master', 400);
  };

  // Voice command dispatcher
  const handleVoiceCommand = (cmd: 'show-analytics' | 'show-dashboard' | 'optimize-grid' | 'show-incidents' | 'show-ledger') => {
    if (cmd === 'show-analytics') {
      setActiveTab('matrix');
    } else if (cmd === 'show-dashboard') {
      setActiveTab('telemetry');
    } else if (cmd === 'optimize-grid') {
      handleOptimizeGrid();
    } else if (cmd === 'show-incidents') {
      setActiveTab('incidents');
    } else if (cmd === 'show-ledger') {
      setActiveTab('ledger');
    }
  };

  // Incident failover execution
  const handleExecuteFailover = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: 'Mitigating',
          aiRecommendation: 'Phase 1: Circuit isolated. Phase 2: Autonomous battery feed rerouted. Phase 3: Mitigated.'
        };
      }
      return inc;
    }));

    setTimeout(() => {
      setIncidents(prev => prev.map(inc => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'Resolved'
          };
        }
        return inc;
      }));
      triggerUnlockBadge('b5', 'AI Failover Hero', 600);
    }, 2200);
  };

  // Crowdsourced incident insertion
  const handleAddCrowdsourcedIncident = (newInc: IncidentAlert) => {
    setIncidents(prev => [newInc, ...prev]);
  };

  // Node toggle
  const handleToggleNodeStatus = (id: string, newStatus: AutonomousNode['status']) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, status: newStatus } : n));
  };

  // Ledger mint
  const handleMintCredit = (token: CarbonCreditToken) => {
    setLedger(prev => [token, ...prev]);
  };

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'Admin') {
      setUserProfile(initialUserProfile);
    } else if (role === 'Faculty') {
      setUserProfile({
        name: 'Prof. Marcus Sterling',
        role: 'Faculty',
        email: 'm.sterling@campus.faculty.edu',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        department: 'Renewable Energy & IoT Department'
      });
    } else {
      setUserProfile({
        name: 'Alex Chen',
        role: 'Student',
        email: 'a.chen@campus.student.edu',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        department: 'Clean Tech Major'
      });
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-[#141211] text-sand-100' : themePalette === 'sand' ? 'bg-[#f7f1e9] text-[#191614]' : 'bg-[#f2f8f6] text-[#1e293b]'} min-h-screen transition-colors duration-300 flex flex-col`}>
      
      {/* GLOBAL TOP NAVBAR WITH VOICE COMMAND OS BUTTON & PORT NOTIFICATION */}
      <Navbar
        userProfile={userProfile}
        onSelectRole={handleRoleSelect}
        themePalette={themePalette}
        setThemePalette={setThemePalette}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Floating Micro Voice Command Bar Button (Prominently Accessible) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setVoiceModalOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#191614] text-[#faf6f0] dark:bg-neutral-800 dark:text-sand-100 shadow-2xl border-2 border-[#dfc7b2] dark:border-neutral-700 hover:scale-105 active:scale-95 transition-all group"
          title="Voice Command OS (Speech API)"
        >
          <div className="relative">
            <Mic className="w-4 h-4 text-emerald-400 group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping-subtle" />
          </div>
          <span className="text-xs font-bold tracking-wide">
            Voice Command OS
          </span>
          <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-white/10 font-mono">
            Speak
          </span>
        </button>
      </div>

      {/* ON-SCREEN ANIMATED TOAST NOTIFICATION FOR ACHIEVEMENTS */}
      {unlockedToast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce transition-all">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-24 bg-[#191614] text-[#faf6f0] shadow-2xl border-2 border-emerald-400">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Achievement Unlocked!
              </p>
              <p className="text-xs font-bold text-white">
                {unlockedToast.title} (+{unlockedToast.pts} Pts)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Body Layout: Sidebar + Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeIncidentsCount={incidents.filter(i => i.status === 'Active').length}
          isDarkMode={isDarkMode}
          themePalette={themePalette}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-hidden">
          {activeTab === 'telemetry' && (
            <TelemetryView
              telemetry={telemetry}
              setTelemetry={setTelemetry}
              zones={zones}
              achievements={achievements}
              totalScore={totalScore}
              onOptimizeGrid={handleOptimizeGrid}
              isDarkMode={isDarkMode}
              themePalette={themePalette}
            />
          )}

          {activeTab === 'matrix' && (
            <ResourceMatrixView
              nodes={nodes}
              onToggleNodeStatus={handleToggleNodeStatus}
              leaderboard={hostelLeaderboardData}
              isDarkMode={isDarkMode}
              themePalette={themePalette}
            />
          )}

          {activeTab === 'incidents' && (
            <IncidentHubView
              incidents={incidents}
              onExecuteFailover={handleExecuteFailover}
              onAddCrowdsourcedIncident={handleAddCrowdsourcedIncident}
              isDarkMode={isDarkMode}
              themePalette={themePalette}
            />
          )}

          {activeTab === 'ledger' && (
            <EsgLedgerView
              tokens={ledger}
              onMintCredit={handleMintCredit}
              carbonDelta={+( (telemetry.solarAbsorption * 0.42) + (telemetry.evFleetDeployment * 0.18) ).toFixed(1)}
              isDarkMode={isDarkMode}
              themePalette={themePalette}
            />
          )}
        </main>
      </div>

      {/* VOICE COMMAND INTERACTION MODAL */}
      <VoiceCommandModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onExecuteCommand={handleVoiceCommand}
        isDarkMode={isDarkMode}
        themePalette={themePalette}
      />
    </div>
  );
};
export default App;
