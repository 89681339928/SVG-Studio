export interface Palette {
  id: string;
  name: string;
  skyTop: string;
  skyBottom: string;
  sunColor: string;
  mountainFar: string;
  mountainNear: string;
  hillFar: string;
  hillNear: string;
  water: string;
  starColor?: string;
}

export const LANDSCAPE_PALETTES: Palette[] = [
  {
    id: 'day',
    name: 'Sunny Day',
    skyTop: '#3b82f6',
    skyBottom: '#93c5fd',
    sunColor: '#facc15',
    mountainFar: '#e2e8f0',
    mountainNear: '#cbd5e1',
    hillFar: '#4ade80',
    hillNear: '#16a34a',
    water: '#60a5fa'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    skyTop: '#4c1d95',
    skyBottom: '#f97316',
    sunColor: '#fb923c',
    mountainFar: '#4a044e',
    mountainNear: '#701a75',
    hillFar: '#9d174d',
    hillNear: '#831843',
    water: '#c026d3'
  },
  {
    id: 'night',
    name: 'Midnight',
    skyTop: '#020617',
    skyBottom: '#172554',
    sunColor: '#f1f5f9', // Moon
    mountainFar: '#0f172a',
    mountainNear: '#1e293b',
    hillFar: '#334155',
    hillNear: '#475569',
    water: '#1e3a8a',
    starColor: '#ffffff'
  },
  {
    id: 'mars',
    name: 'Mars Colony',
    skyTop: '#7f1d1d',
    skyBottom: '#f87171',
    sunColor: '#fca5a5',
    mountainFar: '#450a0a',
    mountainNear: '#7f1d1d',
    hillFar: '#991b1b',
    hillNear: '#b91c1c',
    water: '#570404' // Lava?
  },
  {
    id: 'cyber',
    name: 'Cyberpunk',
    skyTop: '#0f172a',
    skyBottom: '#2e1065',
    sunColor: '#f472b6', // Neon Sun
    mountainFar: '#1e1b4b',
    mountainNear: '#312e81',
    hillFar: '#4338ca',
    hillNear: '#22d3ee', // Neon Grid hints
    water: '#c084fc'
  }
];

export const SKY_ASSETS = [
    { id: 'none', name: 'Clear Sky', svg: '' },
    { id: 'clouds_simple', name: 'Simple Clouds', svg: '<path d="M50,80 Q70,60 90,80 T130,80 T170,80" fill="none" stroke="white" stroke-width="10" opacity="0.4" stroke-linecap="round" />' },
    { id: 'stars', name: 'Stars', svg: '<circle cx="50" cy="50" r="1" fill="#fff" opacity="0.8"/><circle cx="150" cy="30" r="1.5" fill="#fff" opacity="0.6"/><circle cx="250" cy="70" r="1" fill="#fff" opacity="0.7"/><circle cx="100" cy="20" r="1" fill="#fff" opacity="0.5"/><circle cx="200" cy="90" r="1.5" fill="#fff" opacity="0.8"/>' },
    { id: 'birds', name: 'Birds', svg: '<path d="M200,60 Q205,55 210,60" fill="none" stroke="black" stroke-width="1" opacity="0.5"/><path d="M220,70 Q225,65 230,70" fill="none" stroke="black" stroke-width="1" opacity="0.5"/>' }
];
