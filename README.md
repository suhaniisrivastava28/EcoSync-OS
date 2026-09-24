# EcoSync OS • Smart City & Campus Command Center

[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Runtime Port](https://img.shields.io/badge/Port-5008-10b981?style=flat-square&logo=serverless)](http://localhost:5008)
[![License](https://img.shields.io/badge/License-MIT-amber?style=flat-square)](LICENSE)

> **EcoSync OS** is a high-fidelity, production-grade autonomous Smart Campus and Smart City Command Center & Digital Twin. It bridges real-time renewable energy telemetry, dynamic predictive load balancing, gamified conservation incentives, automated AI incident failover, and voice command accessibility into a unified, editorial operating system.

---

## ⚡ Key Highlights & Core Capabilities

### 1. Telemetry Control Grid & Dynamic Digital Twin
- **Reactive Variable Levers:** Real-time controls for **Solar Grid Absorption (0–100%)**, **Smart HVAC Temp Threshold (18°C–28°C)**, and **Automated EV Fleet Deployment (0–50 Shuttles)**.
- **Client-Side Mathematical Reactivity:** Dynamically recalculates **Power Consumption Demand** vs. **Renewable Generation Supply** curves instantly on custom SVG vector line charts with zero page reloads.
- **AI Predictive Shadow Grid:** Toggleable 12-hour future load forecast projection (dashed curve) to predict and mitigate evening peak-load surges.
- **Bento Metric Cards:** Live calculation of **Carbon Reduction Delta (+t CO₂e)**, **Daily Grid Operational Savings** (with multi-currency `$` / `₹` / `€` switching), and the **Resource Efficiency Index**.

### 2. Central Geospatial Smart Zone Map
- Interactive schematic top-down layout of campus sub-grids (*Academic Quad, Main Solar Farm, Grid Gateway & Substation, EV Charging Terminals, and Lab Cleanrooms*).
- Dynamic node indicator pins that **Glow Mint Green** when optimized and **Pulse Amber** during system load spikes.
- Multi-layer visualization switching: **Digital Twin Schematic**, **Thermal Radiant Heatmap**, and **Solar Density Loop**.

### 3. Gamification Layer & Achievements Engine
- **Eco-League Hostel Leaderboard:** Gamified rankings of dormitories (*Himalaya Hall, Ganga Hostel, Aravali Tower*) displaying real-time eco-points, kWh avoided, water recycled, and conservation streaks, with an interactive "Cheer 👏" celebration.
- **Programmatic Achievement Tracking:** Automatically monitors grid parameters. Shifting variables to optimal green states (Solar > 80% and HVAC > 24°C) instantly triggers celebratory confetti and an animated on-screen alert toast:  
  `Achievement Unlocked: Carbon Neutral Champion (+500 Pts)`  
  while illuminating the verified green badge inside the **Achievements Unlocked** rack.

### 4. Accessibility Voice Command OS
- Global top navbar microphone button powered by the native browser **Web Speech API** (`webkitSpeechRecognition`).
- Hands-free voice parsing for operators:
  - `"Optimize grid"` → Resets all control sliders to maximum green performance states and triggers achievements.
  - `"Show analytics"` or `"Go to resource"` → Switches to the Resource Allocation Matrix.
  - `"Show dashboard"` → Returns to the Telemetry Control Grid.
- Includes an interactive typography fallback list for restricted environments or noisy control rooms.

### 5. AI Incident Dispatch Hub & Crowdsourced Reporting
- Live simulated telemetry stream for mission-critical infrastructure faults (*Zone B Hydro Valve Leaks, Main Gate Grid Congestion, Substation Thermal Spikes*).
- **One-Click Autonomous AI Failover:** Simulates SCADA circuit isolation, automated power rerouting, and diagnostic resolution from `Active` → `Mitigating` → `Resolved`.
- **Citizen Crowdsourced Infrastructure Reporting:** Ground-truth incident reporting form that appends community reports directly into the active priority dispatch queue.

### 6. Immutable ESG Carbon Token Ledger
- Transparent environmental audit ledger recording verifiable on-chain carbon offset minting with cryptographic transaction hashes (`0x...`), validator IDs, block heights, and official Verra VCS / Gold Standard certifications.

---

## 🎨 Design Aesthetic & Palette

EcoSync OS balances high-density industrial telemetry with a warm, human-centered editorial aesthetic:
- **Warm Sand & Latte Palette:** Inspired by modern editorial interfaces (`#FAF6F0`, `#F4EBE1`, `#E9DACB`, `#DFCBBA`).
- **Subtle Muted Mint & Sage Eco Accents:** `#4D928F` (Primary Accent), `#E1F0EC` (Muted Mint), `#F2F8F6` (Base).
- **Bento Grid Architecture:** Ultra-rounded corners (`border-radius: 24px`), crisp micro-borders, and soft depth shadows.
- **Typography:** High-contrast sans-serif (*Plus Jakarta Sans*) harmonized with classic display typography (*Instrument Serif*).
- **Theme Flexibility:** Instant one-click toggle between **Sand & Latte** and **Mint & Sage**, plus smooth dark/light mode transitions.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8 (Hot Module Replacement)
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **Voice Engine:** Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`)
- **Port:** Explicitly configured and strictly pinned to `PORT 5008`

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/suhaniisrivastava28/EcoSync-OS.git
cd EcoSync-OS

# Install dependencies
npm install

# Start development server on secure port 5008
npm run dev
```

The application will be live at:
```
http://localhost:5008/
```

### Production Build

```bash
# Compile and create production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Security & Environment Confirmation

The development environment is explicitly verified to listen strictly on **PORT 5008**:
```
Environment operational on secure port 5008
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

