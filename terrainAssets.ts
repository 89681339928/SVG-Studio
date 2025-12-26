export interface TerrainBiome {
  id: string;
  name: string;
  colors: {
    base: string;
    light: string;
    dark: string;
    detail: string;
  };
  texture: 'noise' | 'dots' | 'lines';
}

export interface TerrainFeature {
  id: string;
  name: string;
  svg: string; // SVG path data (d) or group content
  type: 'road' | 'water' | 'wall' | 'none';
}

export interface RoadSurface {
  id: string;
  name: string;
  mainColor: string;
  detailColor: string;
  strokeColor: string;
  texture?: string; // Optional SVG pattern def
  lineWidth?: number; // 0 for no edge
}

export const BIOMES: TerrainBiome[] = [
  { 
    id: 'grass', name: 'Grassland', 
    colors: { base: '#16a34a', light: '#4ade80', dark: '#14532d', detail: '#15803d' }, 
    texture: 'noise' 
  },
  { 
    id: 'dirt', name: 'Dirt / Barren', 
    colors: { base: '#78350f', light: '#b45309', dark: '#451a03', detail: '#92400e' }, 
    texture: 'dots' 
  },
  { 
    id: 'sand', name: 'Desert Sand', 
    colors: { base: '#eab308', light: '#fde047', dark: '#a16207', detail: '#ca8a04' }, 
    texture: 'lines' 
  },
  { 
    id: 'snow', name: 'Snow / Tundra', 
    colors: { base: '#f1f5f9', light: '#ffffff', dark: '#cbd5e1', detail: '#94a3b8' }, 
    texture: 'noise' 
  },
  { 
    id: 'stone', name: 'Dungeon Stone', 
    colors: { base: '#475569', light: '#64748b', dark: '#1e293b', detail: '#334155' }, 
    texture: 'dots' 
  },
  { 
    id: 'water', name: 'Ocean', 
    colors: { base: '#2563eb', light: '#60a5fa', dark: '#1e3a8a', detail: '#3b82f6' }, 
    texture: 'lines' 
  }
];

export const ROAD_SURFACES: RoadSurface[] = [
    { id: 'dirt', name: 'Dirt Path', mainColor: '#78350f', detailColor: '#5d2e0e', strokeColor: 'none', lineWidth: 0 },
    { id: 'gravel', name: 'Gravel Road', mainColor: '#a8a29e', detailColor: '#d6d3d1', strokeColor: '#78716c', lineWidth: 2, texture: '<pattern id="p_gravel" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#78716c" opacity="0.5"/><circle cx="6" cy="6" r="1.5" fill="#78716c" opacity="0.3"/></pattern>' },
    { id: 'asphalt_clean', name: 'Asphalt (Clean)', mainColor: '#374151', detailColor: '#1f2937', strokeColor: '#111827', lineWidth: 2 },
    { id: 'asphalt_line', name: 'Asphalt (Highway)', mainColor: '#374151', detailColor: '#1f2937', strokeColor: '#111827', lineWidth: 2, texture: '<path d="M98,0 L98,200" stroke="#facc15" stroke-width="2" stroke-dasharray="20 10"/>' },
    { id: 'cobble', name: 'Cobblestone', mainColor: '#78716c', detailColor: '#57534e', strokeColor: '#44403c', lineWidth: 3, texture: '<pattern id="p_cobble" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="none" stroke="#44403c" stroke-width="1" opacity="0.5"/></pattern>' },
    { id: 'brick', name: 'Red Brick', mainColor: '#991b1b', detailColor: '#7f1d1d', strokeColor: '#b91c1c', lineWidth: 2, texture: '<pattern id="p_brick" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0,5 L10,5 M5,0 L5,5 M5,10 L5,5" stroke="#7f1d1d" stroke-width="1"/></pattern>' },
    { id: 'sandstone', name: 'Sandstone', mainColor: '#d4d4d4', detailColor: '#a8a29e', strokeColor: '#78716c', lineWidth: 2 },
    { id: 'gold', name: 'Golden Road', mainColor: '#fbbf24', detailColor: '#f59e0b', strokeColor: '#b45309', lineWidth: 2 },
    { id: 'lava', name: 'Hardened Lava', mainColor: '#18181b', detailColor: '#27272a', strokeColor: '#ef4444', lineWidth: 2, texture: '<path d="M0,0 Q10,20 20,0" stroke="#ef4444" stroke-width="1" fill="none" opacity="0.8"/>' },
    { id: 'scifi', name: 'Cyber Neon', mainColor: '#0f172a', detailColor: '#1e293b', strokeColor: '#06b6d4', lineWidth: 4, texture: '<rect x="0" y="0" width="200" height="200" fill="none"/><path d="M0,10 L200,10 M0,190 L200,190" stroke="#06b6d4" stroke-width="2" opacity="0.8"/>' },
    { id: 'ice', name: 'Ice Sheet', mainColor: '#cffafe', detailColor: '#a5f3fc', strokeColor: '#22d3ee', lineWidth: 1 }
];

export const ROAD_SHAPES: TerrainFeature[] = [
  { id: 'none', name: 'None', type: 'none', svg: '' },
  { id: 'road_straight', name: 'Straight', type: 'road', svg: '<rect x="70" y="-10" width="60" height="220" />' },
  { id: 'road_corner', name: 'Corner', type: 'road', svg: '<path d="M70,210 L130,210 L130,130 Q130,70 210,70 L210,130 Q160,130 130,160 L70,210 Z" />' },
  { id: 'road_t', name: 'T-Split', type: 'road', svg: '<rect x="70" y="-10" width="60" height="220" /><rect x="70" y="70" width="140" height="60" />' },
  { id: 'road_cross', name: 'Cross', type: 'road', svg: '<rect x="70" y="-10" width="60" height="220" /><rect x="-10" y="70" width="220" height="60" />' },
  { id: 'road_end', name: 'Dead End', type: 'road', svg: '<rect x="70" y="70" width="60" height="140" /><circle cx="100" cy="70" r="30" />' },
  { id: 'road_circle', name: 'Roundabout', type: 'road', svg: '<circle cx="100" cy="100" r="50" /><rect x="70" y="-10" width="60" height="60" /><rect x="70" y="150" width="60" height="60" /><rect x="-10" y="70" width="60" height="60" /><rect x="150" y="70" width="60" height="60" />' }
];

export const WATER_SHAPES: TerrainFeature[] = [
  { id: 'none', name: 'None', type: 'none', svg: '' },
  { id: 'coast_straight', name: 'Straight Coast', type: 'water', svg: '<rect x="0" y="0" width="200" height="100" />' },
  { id: 'coast_corner_out', name: 'Outer Corner', type: 'water', svg: '<rect x="0" y="0" width="200" height="100" /><rect x="0" y="0" width="100" height="200" />' },
  { id: 'coast_corner_in', name: 'Inner Corner', type: 'water', svg: '<path d="M0,0 L200,0 L200,200 L100,200 L100,100 L0,100 Z" />' },
  { id: 'river_straight', name: 'River', type: 'water', svg: '<rect x="60" y="0" width="80" height="200" />' },
  { id: 'island', name: 'Island', type: 'water', svg: '<path d="M0,0 L200,0 L200,200 L0,200 Z" /><circle cx="100" cy="100" r="60" fill="transparent" />' }
];

// Helper to generate noise dots
export const generateNoise = (seed: number, count: number, width: number, height: number) => {
    let svg = '';
    for(let i=0; i<count; i++) {
        // pseudo random
        const x = (Math.sin(seed + i) * 10000) % width;
        const y = (Math.cos(seed + i * 2) * 10000) % height;
        const size = (Math.sin(seed * i) + 2) * 2;
        svg += `<circle cx="${Math.abs(x)}" cy="${Math.abs(y)}" r="${Math.abs(size)/2}" opacity="0.5" />`;
    }
    return svg;
};
