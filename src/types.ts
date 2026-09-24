export type UserRole = 'Student' | 'Faculty' | 'Admin';

export interface UserProfile {
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  department: string;
}

export interface TelemetryState {
  solarAbsorption: number; // 0 - 100 %
  hvacTempThreshold: number; // 18 - 28 °C
  evFleetDeployment: number; // 0 - 50 vehicles
  aiShadowGridEnabled: boolean;
  weather: 'Sunny' | 'Partly Cloudy' | 'Overcast' | 'Heatwave';
}

export interface CampusZone {
  id: string;
  name: string;
  code: string;
  category: 'Academic' | 'Residential' | 'Labs' | 'Infrastructure' | 'Energy';
  x: number; // percentage on map
  y: number;
  baseDemand: number; // kW
  currentDemand: number; // kW
  solarGen: number; // kW
  temp: number; // °C
  status: 'optimized' | 'elevated' | 'spike' | 'alert';
  description: string;
  nodesCount: number;
}

export interface AutonomousNode {
  id: string;
  name: string;
  category: 'Water' | 'Energy' | 'Waste' | 'HVAC' | 'Lighting' | 'Mobility';
  zone: string;
  status: 'Active' | 'Standby' | 'Degraded' | 'Maintenance';
  efficiency: number; // %
  lastPing: string;
  load: string;
}

export interface IncidentAlert {
  id: string;
  title: string;
  zone: string;
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  timestamp: string;
  status: 'Active' | 'Mitigating' | 'Resolved';
  category: string;
  description: string;
  aiRecommendation: string;
  source: 'Sensor Telemetry' | 'Citizen Report' | 'Predictive AI';
  reporter?: string;
  mitigationProgress?: number;
}

export interface HostelLeaderboardItem {
  id: string;
  name: string;
  rank: number;
  points: number;
  kwhSaved: number;
  waterSavedLiters: number;
  streakDays: number;
  badge: string;
  trend: 'up' | 'down' | 'stable';
}

export interface CarbonCreditToken {
  id: string;
  txHash: string;
  blockHeight: number;
  validatorNode: string;
  carbonOffsetTons: number;
  beneficiaryZone: string;
  timestamp: string;
  verificationBadge: string;
  status: 'Confirmed' | 'Minted' | 'Audited';
}
