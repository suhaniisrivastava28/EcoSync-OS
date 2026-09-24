import { CampusZone, AutonomousNode, IncidentAlert, HostelLeaderboardItem, CarbonCreditToken, UserProfile } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Dr. Sarah Vance',
  role: 'Admin',
  email: 's.vance@ecosync.campus.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Smart Infrastructure & Decarbonization'
};

export const campusZones: CampusZone[] = [
  {
    id: 'zone-solar',
    name: 'Main Solar Farm',
    code: 'SOL-01',
    category: 'Energy',
    x: 18,
    y: 24,
    baseDemand: 45,
    currentDemand: 52,
    solarGen: 480,
    temp: 24.2,
    status: 'optimized',
    description: '3.2 MW Photovoltaic bifacial tracking array powering northwestern science quad.',
    nodesCount: 6
  },
  {
    id: 'zone-quad',
    name: 'Academic Quad',
    code: 'ACAD-QUAD',
    category: 'Academic',
    x: 48,
    y: 32,
    baseDemand: 320,
    currentDemand: 340,
    solarGen: 120,
    temp: 22.8,
    status: 'optimized',
    description: 'Central lecture halls, library atrium, auditorium with automated solar blinds.',
    nodesCount: 14
  },
  {
    id: 'zone-gateway',
    name: 'Grid Gateway & Substation',
    code: 'GRID-GW',
    category: 'Infrastructure',
    x: 82,
    y: 22,
    baseDemand: 110,
    currentDemand: 165,
    solarGen: 0,
    temp: 31.4,
    status: 'spike',
    description: 'High-voltage grid interconnect point with dynamic solid-state transformers.',
    nodesCount: 8
  },
  {
    id: 'zone-ev',
    name: 'EV Charging Terminals',
    code: 'EV-DOCK-1',
    category: 'Infrastructure',
    x: 22,
    y: 72,
    baseDemand: 190,
    currentDemand: 220,
    solarGen: 85,
    temp: 25.1,
    status: 'optimized',
    description: '48 DC Fast-charging bays with V2G bidirectional power buffer exchange.',
    nodesCount: 5
  },
  {
    id: 'zone-labs',
    name: 'Lab Sub-Grids & Cleanrooms',
    code: 'LAB-CORE',
    category: 'Labs',
    x: 75,
    y: 68,
    baseDemand: 410,
    currentDemand: 430,
    solarGen: 60,
    temp: 21.0,
    status: 'elevated',
    description: 'High-precision physics, nanotech fabrication, and supercomputing clusters.',
    nodesCount: 18
  },
  {
    id: 'zone-hostel',
    name: 'Hostel Infrastructure',
    code: 'RES-AXIS',
    category: 'Residential',
    x: 46,
    y: 78,
    baseDemand: 280,
    currentDemand: 295,
    solarGen: 140,
    temp: 23.5,
    status: 'optimized',
    description: '5 Residential towers, smart dining halls, greywater recycling loops.',
    nodesCount: 12
  },
  {
    id: 'zone-techpark',
    name: 'Tech Park Axis',
    code: 'TECH-HUB',
    category: 'Academic',
    x: 70,
    y: 40,
    baseDemand: 260,
    currentDemand: 275,
    solarGen: 95,
    temp: 23.0,
    status: 'optimized',
    description: 'Incubator hubs, robotics prototyping hangars, and startup studios.',
    nodesCount: 9
  }
];

export const initialAutonomousNodes: AutonomousNode[] = [
  {
    id: 'node-1',
    name: 'Central Water Reclamation Plant',
    category: 'Water',
    zone: 'Hostel Infrastructure',
    status: 'Active',
    efficiency: 96.4,
    lastPing: '2s ago',
    load: '142 kL/h'
  },
  {
    id: 'node-2',
    name: 'Automated Solid Waste Pneumatic Routing',
    category: 'Waste',
    zone: 'Tech Park Axis',
    status: 'Active',
    efficiency: 92.1,
    lastPing: '4s ago',
    load: '3.8 tons/day'
  },
  {
    id: 'node-3',
    name: 'Smart Rainwater Harvesting Sump Matrix',
    category: 'Water',
    zone: 'Academic Quad',
    status: 'Active',
    efficiency: 98.0,
    lastPing: '1s ago',
    load: '94% capacity'
  },
  {
    id: 'node-4',
    name: 'Geothermal Heat Pump Sub-loop 3',
    category: 'HVAC',
    zone: 'Lab Sub-Grids',
    status: 'Active',
    efficiency: 94.8,
    lastPing: '12s ago',
    load: '18.4 kW thermal'
  },
  {
    id: 'node-5',
    name: 'Smart Sensor Streetlighting Matrix',
    category: 'Lighting',
    zone: 'EV Charging Terminals',
    status: 'Standby',
    efficiency: 88.5,
    lastPing: '1m ago',
    load: '4.2 kW (dimmed)'
  },
  {
    id: 'node-6',
    name: 'Air Quality Ionization Scrubbers',
    category: 'HVAC',
    zone: 'Academic Quad',
    status: 'Active',
    efficiency: 91.2,
    lastPing: '5s ago',
    load: 'AQI 24 (Good)'
  },
  {
    id: 'node-7',
    name: 'Micro-hydro Turbine Bypass',
    category: 'Energy',
    zone: 'Main Solar Farm',
    status: 'Degraded',
    efficiency: 71.0,
    lastPing: '18s ago',
    load: '12 kW (flow capped)'
  },
  {
    id: 'node-8',
    name: 'Automated EV Bus Charging Station 2',
    category: 'Mobility',
    zone: 'EV Charging Terminals',
    status: 'Active',
    efficiency: 95.7,
    lastPing: '7s ago',
    load: '75 kW V2G active'
  }
];

export const initialIncidentAlerts: IncidentAlert[] = [
  {
    id: 'inc-101',
    title: 'Zone B Hydro Valve Leak Alert',
    zone: 'Main Solar Farm / Hydro Basin',
    severity: 'High',
    timestamp: '3 mins ago',
    status: 'Active',
    category: 'Water Reclamation',
    description: 'Pressure spike detected in tertiary bypass valve. Secondary drainage operating at 84% capacity.',
    aiRecommendation: 'Activate automated solenoid bypass and throttle pressure valve 12B to divert excess run-off to detention basin 3.',
    source: 'Sensor Telemetry'
  },
  {
    id: 'inc-102',
    title: 'Main Gate Grid Congestion',
    zone: 'Grid Gateway & Substation',
    severity: 'Critical',
    timestamp: '7 mins ago',
    status: 'Active',
    category: 'Power Transmission',
    description: 'Unplanned phase imbalance in feeder line C-3. External grid draw exceeding target threshold by 24.6%.',
    aiRecommendation: 'Discharge 150 kWh from EV fleet V2G reserve buffers and isolate non-critical outdoor illuminations.',
    source: 'Predictive AI'
  },
  {
    id: 'inc-103',
    title: 'Substation 4 Thermal Spike',
    zone: 'Lab Sub-Grids & Cleanrooms',
    severity: 'High',
    timestamp: '14 mins ago',
    status: 'Active',
    category: 'Electrical Safety',
    description: 'Transformer core temperature reading 74.2°C, approaching upper safety tolerance (80°C).',
    aiRecommendation: 'Engage auxiliary cooling fans and route 20% lab load to North microgrid inverter bank.',
    source: 'Sensor Telemetry'
  },
  {
    id: 'inc-104',
    title: 'Solar Array Inverter 2 Frequency Drift',
    zone: 'Main Solar Farm',
    severity: 'Moderate',
    timestamp: '28 mins ago',
    status: 'Active',
    category: 'Renewable Generation',
    description: '50.2 Hz frequency aberration detected during rapid cloud transit over array quadrant 2.',
    aiRecommendation: 'Calibrate reactive power injection via smart inverter firmware modulation loop.',
    source: 'Sensor Telemetry'
  }
];

export const hostelLeaderboardData: HostelLeaderboardItem[] = [
  {
    id: 'h1',
    name: 'Himalaya Hall',
    rank: 1,
    points: 9840,
    kwhSaved: 1420,
    waterSavedLiters: 4200,
    streakDays: 18,
    badge: '🏆 Net-Zero Pioneer',
    trend: 'up'
  },
  {
    id: 'h2',
    name: 'Ganga Hostel',
    rank: 2,
    points: 8920,
    kwhSaved: 1280,
    waterSavedLiters: 3900,
    streakDays: 14,
    badge: '⚡ Grid Innovator',
    trend: 'up'
  },
  {
    id: 'h3',
    name: 'Aravali Tower',
    rank: 3,
    points: 7650,
    kwhSaved: 1110,
    waterSavedLiters: 3100,
    streakDays: 9,
    badge: '💧 Water Steward',
    trend: 'stable'
  },
  {
    id: 'h4',
    name: 'Nilgiri House',
    rank: 4,
    points: 6940,
    kwhSaved: 950,
    waterSavedLiters: 2750,
    streakDays: 7,
    badge: '🌱 Eco Challenger',
    trend: 'down'
  },
  {
    id: 'h5',
    name: 'Shivalik Residency',
    rank: 5,
    points: 5820,
    kwhSaved: 780,
    waterSavedLiters: 2100,
    streakDays: 4,
    badge: '♻️ Rising Star',
    trend: 'up'
  }
];

export const carbonCreditLedgerData: CarbonCreditToken[] = [
  {
    id: 'tx-001',
    txHash: '0x8f2a93c71e03948b...4d92',
    blockHeight: 1894204,
    validatorNode: 'CAMPUS-VALIDATOR-N1',
    carbonOffsetTons: 14.8,
    beneficiaryZone: 'Academic Quad Solar Loop',
    timestamp: '2026-09-15 14:45:10',
    verificationBadge: 'Verra VCS-2026',
    status: 'Minted'
  },
  {
    id: 'tx-002',
    txHash: '0x3c81e9b22a0018f5...7e21',
    blockHeight: 1894182,
    validatorNode: 'ECOSYNC-MINT-ZERO',
    carbonOffsetTons: 22.4,
    beneficiaryZone: 'Hostel Greywater Loop',
    timestamp: '2026-09-15 13:20:05',
    verificationBadge: 'Gold Standard GS-812',
    status: 'Confirmed'
  },
  {
    id: 'tx-003',
    txHash: '0xaa4276f1082c914d...5a99',
    blockHeight: 1894145,
    validatorNode: 'CAMPUS-VALIDATOR-N2',
    carbonOffsetTons: 9.6,
    beneficiaryZone: 'EV Smart Charging Hub',
    timestamp: '2026-09-15 11:55:40',
    verificationBadge: 'IEEE CleanTech 2026',
    status: 'Audited'
  },
  {
    id: 'tx-004',
    txHash: '0x55ef0921bb14a72e...19b4',
    blockHeight: 1894098,
    validatorNode: 'ECOSYNC-MINT-ZERO',
    carbonOffsetTons: 18.2,
    beneficiaryZone: 'Central Solar Farm B',
    timestamp: '2026-09-15 09:30:18',
    verificationBadge: 'Verra VCS-2026',
    status: 'Minted'
  }
];
