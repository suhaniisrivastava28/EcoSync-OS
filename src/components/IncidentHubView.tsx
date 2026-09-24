import React, { useState } from 'react';
import { IncidentAlert } from '../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Send, 
  Zap, 
  AlertTriangle, 
  Sparkles, 
  User, 
  PlusCircle, 
  Activity,
  Clock,
  Radio,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface IncidentHubViewProps {
  incidents: IncidentAlert[];
  onExecuteFailover: (incidentId: string) => void;
  onAddCrowdsourcedIncident: (newIncident: IncidentAlert) => void;
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const IncidentHubView: React.FC<IncidentHubViewProps> = ({
  incidents,
  onExecuteFailover,
  onAddCrowdsourcedIncident,
  isDarkMode,
  themePalette,
}) => {
  // Form states for citizen reporting
  const [reportTitle, setReportTitle] = useState('');
  const [reportZone, setReportZone] = useState('Academic Quad');
  const [reportCategory, setReportCategory] = useState('Water Reclamation');
  const [reportSeverity, setReportSeverity] = useState<'Critical' | 'High' | 'Moderate' | 'Low'>('High');
  const [reportDesc, setReportDesc] = useState('');
  const [reporterName, setReporterName] = useState('Student Citizen #204');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim() || !reportDesc.trim()) return;

    const newInc: IncidentAlert = {
      id: `crowd-${Date.now().toString().slice(-4)}`,
      title: reportTitle.trim(),
      zone: reportZone,
      severity: reportSeverity,
      timestamp: 'Just now',
      status: 'Active',
      category: reportCategory,
      description: reportDesc.trim(),
      aiRecommendation: 'AI Automated Incident Triage: Analyzing sensor array in target sector and preparing routing failsafe.',
      source: 'Citizen Report',
      reporter: reporterName
    };

    onAddCrowdsourcedIncident(newInc);

    // Reset form
    setReportTitle('');
    setReportDesc('');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#191614] dark:text-sand-100">
            AI Incident Dispatch Hub
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Real-time critical infrastructure telemetry, autonomous AI failover dispatch, and crowdsourced campus alerts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>{incidents.filter(i => i.status === 'Active').length} Active Alerts</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Live Incidents Log (7 Cols) & Citizen Reporting Form (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ACTIVE SIMULATION LOG PANEL (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Live Alert Stream & Autonomous Resolution
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              Sub-second Sensor Polling Active
            </span>
          </div>

          <div className="space-y-3.5">
            {incidents.map((inc) => {
              const isResolved = inc.status === 'Resolved';
              const isMitigating = inc.status === 'Mitigating';

              return (
                <div
                  key={inc.id}
                  className={`p-5 rounded-32 border transition-all ${
                    isResolved
                      ? 'bg-emerald-500/5 border-emerald-500/25 opacity-80'
                      : isMitigating
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : isDarkMode
                      ? 'bg-neutral-900 border-neutral-800 shadow-sm'
                      : themePalette === 'sand'
                      ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
                      : 'bg-white border-[#4d928f]/25 shadow-soft'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        inc.severity === 'Critical'
                          ? 'bg-rose-500 text-white animate-pulse'
                          : inc.severity === 'High'
                          ? 'bg-amber-500 text-neutral-900'
                          : 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                      }`}>
                        {inc.severity}
                      </span>
                      <span className="text-xs font-bold text-neutral-500 font-mono">
                        {inc.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{inc.timestamp}</span>
                      <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
                        {inc.source}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#191614] dark:text-sand-100">
                    {inc.title}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    {inc.description}
                  </p>

                  <div className="mt-3 p-3 rounded-20 bg-black/3 dark:bg-white/3 border border-black/5 dark:border-white/5 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Prescriptive Action Plan:</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {inc.aiRecommendation}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                    <span className="text-[11px] font-mono text-neutral-500">
                      Location: <strong className="text-neutral-700 dark:text-neutral-300">{inc.zone}</strong>
                    </span>

                    {isResolved ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        AI Failover Executed & Mitigated
                      </span>
                    ) : isMitigating ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold font-mono animate-pulse">
                        <Activity className="w-3.5 h-3.5" />
                        Autonomous Microgrid Rerouting...
                      </span>
                    ) : (
                      <button
                        onClick={() => onExecuteFailover(inc.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#191614] hover:bg-neutral-800 text-white text-xs font-semibold shadow-md transition-all transform hover:scale-102 active:scale-98"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Execute AI Failover</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CITIZEN CROWDSOURCED INFRASTRUCTURE REPORTING (5 Cols) */}
        <div className="lg:col-span-5">
          <div className={`p-6 rounded-32 border transition-all sticky top-20 ${
            isDarkMode 
              ? 'bg-neutral-900 border-neutral-800' 
              : themePalette === 'sand'
              ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
              : 'bg-white border-[#4d928f]/20 shadow-soft'
          }`}>
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-[#191614] dark:text-sand-100">
                  Citizen Crowdsourced Reporting
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Submit ground-truth campus anomalies directly to AI dispatch
                </p>
              </div>
            </div>

            {formSubmitted && (
              <div className="mb-4 p-3 rounded-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Report received! AI triage assigned priority queue.</span>
              </div>
            )}

            <form onSubmit={handleSubmitReport} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#191614] dark:text-sand-100 block mb-1">
                  Incident Title / Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Solar Inverter Overheating at West Quad"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-20 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#191614] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#191614]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#191614] dark:text-sand-100 block mb-1">
                    Campus Zone
                  </label>
                  <select
                    value={reportZone}
                    onChange={(e) => setReportZone(e.target.value)}
                    className="w-full px-3 py-2 rounded-20 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#191614] dark:text-white focus:outline-none"
                  >
                    <option value="Academic Quad">Academic Quad</option>
                    <option value="Hostel Infrastructure">Hostel Infrastructure</option>
                    <option value="Main Solar Farm">Main Solar Farm</option>
                    <option value="EV Charging Terminals">EV Terminals</option>
                    <option value="Lab Sub-Grids">Lab Sub-Grids</option>
                    <option value="Tech Park Axis">Tech Park Axis</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#191614] dark:text-sand-100 block mb-1">
                    Severity
                  </label>
                  <select
                    value={reportSeverity}
                    onChange={(e) => setReportSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-20 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#191614] dark:text-white focus:outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191614] dark:text-sand-100 block mb-1">
                  Category
                </label>
                <select
                  value={reportCategory}
                  onChange={(e) => setReportCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-20 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#191614] dark:text-white focus:outline-none"
                >
                  <option value="Power Transmission">Power Transmission / Grid</option>
                  <option value="Water Reclamation">Water Reclamation & Plumbing</option>
                  <option value="HVAC & Thermal">HVAC & Thermal Cooling</option>
                  <option value="EV Mobility">EV Fleet & Charging</option>
                  <option value="Waste Routing">Waste Routing</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191614] dark:text-sand-100 block mb-1">
                  Detailed Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe observed sensor anomaly, visible leak, or electrical fault..."
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-20 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#191614] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#191614]"
                />
              </div>

              <div className="p-3 rounded-20 bg-black/3 dark:bg-white/3 text-[11px] text-neutral-500">
                <span className="font-semibold block mb-0.5">Reporter Credential:</span>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-sand-200 text-[11px] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#191614] text-[#faf6f0] text-xs font-semibold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to AI Incident Dispatch Stream</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
