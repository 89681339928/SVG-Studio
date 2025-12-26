export interface StructurePart {
  id: string;
  name: string;
  svg: string;
  category?: string;
}

export type StructureCategory = 'ground' | 'foundation' | 'walls' | 'roof' | 'entrance' | 'decor';

const STRUCTURE_BASES = {
  ground: [
    { name: 'Grass Patch', svg: '<rect x="10" y="10" width="180" height="180" rx="20" fill="#166534" opacity="0.8" /><path d="M20,20 L180,20 L180,180 L20,180 Z" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="5,10"/><circle cx="50" cy="50" r="2" fill="#4ade80"/><circle cx="150" cy="140" r="3" fill="#4ade80"/><circle cx="30" cy="160" r="2" fill="#4ade80"/>' },
    { name: 'Cobblestone', svg: '<rect x="10" y="10" width="180" height="180" rx="10" fill="#57534e" /><path d="M10,50 L190,50 M10,100 L190,100 M10,150 L190,150 M50,10 L50,190 M100,10 L100,190 M150,10 L150,190" stroke="#44403c" stroke-width="2"/>' },
    { name: 'Dirt & Mud', svg: '<rect x="15" y="15" width="170" height="170" rx="30" fill="#78350f" /><circle cx="60" cy="60" r="20" fill="#451a03" opacity="0.3"/><circle cx="140" cy="130" r="25" fill="#451a03" opacity="0.3"/>' },
    { name: 'Water Moat', svg: '<rect x="10" y="10" width="180" height="180" rx="40" fill="#2563eb" stroke="#60a5fa" stroke-width="4"/><path d="M30,40 Q50,20 70,40 T110,40 T150,40" fill="none" stroke="white" opacity="0.3"/>' },
    { name: 'None', svg: '' }
  ],
  foundation: [
    { name: 'Stone Base', svg: '<rect x="30" y="30" width="140" height="140" fill="#57534e" stroke="#292524" stroke-width="4"/>' },
    { name: 'Wood Deck', svg: '<rect x="30" y="30" width="140" height="140" fill="#78350f" /><path d="M30,50 L170,50 M30,70 L170,70 M30,90 L170,90 M30,110 L170,110 M30,130 L170,130" stroke="#451a03" stroke-width="2"/>' },
    { name: 'Marble Podium', svg: '<rect x="25" y="25" width="150" height="150" fill="#e5e5e5" stroke="#d4d4d4" stroke-width="1"/><rect x="35" y="35" width="130" height="130" fill="#f5f5f5" stroke="#d4d4d4" stroke-width="1"/>' },
  ],
  walls: [
    // Top-down: Walls are mostly the visible outline around the roof or the front face at the bottom
    { name: 'Brick Walls', svg: '<rect x="35" y="35" width="130" height="130" fill="#b91c1c" stroke="#7f1d1d" stroke-width="6" />' },
    { name: 'Log Cabin', svg: '<rect x="35" y="35" width="130" height="130" fill="#78350f" stroke="#451a03" stroke-width="8" stroke-dasharray="20,2" />' },
    { name: 'Plaster White', svg: '<rect x="35" y="35" width="130" height="130" fill="#e5e5e5" stroke="#a3a3a3" stroke-width="6" />' },
    { name: 'Stone Keep', svg: '<rect x="35" y="35" width="130" height="130" fill="#78716c" stroke="#44403c" stroke-width="8" />' },
  ],
  roof: [
    { name: 'Gable Roof', svg: '<defs><linearGradient id="roofGrad_#ID" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#LIGHT_COLOR"/><stop offset="50%" stop-color="#CURRENT_COLOR"/><stop offset="100%" stop-color="#DARK_COLOR"/></linearGradient></defs><rect x="30" y="30" width="140" height="120" fill="url(#roofGrad_#ID)" /><line x1="30" y1="90" x2="170" y2="90" stroke="#DARK_COLOR" stroke-width="4" opacity="0.5"/>' },
    
    { name: 'Hip Roof', svg: '<defs><linearGradient id="hipGrad_#ID" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#LIGHT_COLOR"/><stop offset="100%" stop-color="#DARK_COLOR"/></linearGradient></defs><rect x="30" y="30" width="140" height="120" fill="#CURRENT_COLOR"/><path d="M30,30 L60,60 M170,30 L140,60 M30,150 L60,120 M170,150 L140,120 M60,60 L140,60 L140,120 L60,120 Z" fill="none" stroke="#DARK_COLOR" stroke-width="2" opacity="0.6"/><rect x="60" y="60" width="80" height="60" fill="#LIGHT_COLOR" opacity="0.2"/>' },
    
    { name: 'Round Tower', svg: '<circle cx="100" cy="100" r="60" fill="#CURRENT_COLOR" stroke="#DARK_COLOR" stroke-width="2"/><circle cx="100" cy="100" r="5" fill="#DARK_COLOR"/><path d="M100,100 L100,40" stroke="#DARK_COLOR"/><path d="M100,100 L160,100" stroke="#DARK_COLOR"/><path d="M100,100 L40,100" stroke="#DARK_COLOR"/><path d="M100,100 L100,160" stroke="#DARK_COLOR"/><circle cx="100" cy="100" r="40" fill="none" stroke="#LIGHT_COLOR" stroke-width="4" opacity="0.3"/>' },
    
    { name: 'Pyramid', svg: '<rect x="40" y="40" width="120" height="120" fill="#CURRENT_COLOR"/><path d="M40,40 L100,100 L160,40" fill="#LIGHT_COLOR" opacity="0.3"/><path d="M40,160 L100,100 L160,160" fill="#DARK_COLOR" opacity="0.3"/><path d="M40,40 L160,160" stroke="#DARK_COLOR" stroke-width="1"/><path d="M160,40 L40,160" stroke="#DARK_COLOR" stroke-width="1"/>' }
  ],
  entrance: [
    { name: 'Wood Door', svg: '<rect x="85" y="155" width="30" height="15" fill="#78350f" stroke="#451a03" stroke-width="2" /><circle cx="110" cy="162" r="2" fill="#fbbf24"/>' },
    { name: 'Stone Steps', svg: '<rect x="80" y="160" width="40" height="20" fill="#a8a29e" /><line x1="80" y1="166" x2="120" y2="166" stroke="#78716c"/><line x1="80" y1="173" x2="120" y2="173" stroke="#78716c"/>' },
    { name: 'Gate', svg: '<rect x="70" y="155" width="60" height="10" fill="#444" /><path d="M70,155 L70,175 M80,155 L80,175 M90,155 L90,175 M100,155 L100,175 M110,155 L110,175 M120,155 L120,175" stroke="#111" stroke-width="2"/>' },
    { name: 'None', svg: '' }
  ],
  decor: [
    { name: 'Chimney', svg: '<rect x="130" y="50" width="20" height="20" fill="#7f1d1d" stroke="#450a0a" stroke-width="2"/><circle cx="140" cy="60" r="6" fill="#111" opacity="0.5"/>' },
    { name: 'Smoke', svg: '<rect x="130" y="50" width="20" height="20" fill="#7f1d1d"/><circle cx="140" cy="40" r="5" fill="#fff" opacity="0.4"/><circle cx="145" cy="30" r="7" fill="#fff" opacity="0.3"/><circle cx="135" cy="20" r="9" fill="#fff" opacity="0.2"/>' },
    { name: 'Skylight', svg: '<rect x="80" y="60" width="40" height="30" fill="#bae6fd" stroke="#0ea5e9" stroke-width="3"/><line x1="100" y1="60" x2="100" y2="90" stroke="#0ea5e9" stroke-width="2"/><line x1="80" y1="75" x2="120" y2="75" stroke="#0ea5e9" stroke-width="2"/>' },
    { name: 'Banner Red', svg: '<path d="M40,160 L40,180 L50,190 L60,180 L60,160 Z" fill="#ef4444" stroke="#991b1b" />' },
    { name: 'Lantern', svg: '<circle cx="160" cy="160" r="5" fill="#facc15" filter="drop-shadow(0 0 5px #facc15)"/>' },
    { name: 'None', svg: '' }
  ]
};

const generateStructureAssets = () => {
  const assets: Record<StructureCategory, StructurePart[]> = {
    ground: STRUCTURE_BASES.ground.map((b, i) => ({...b, id: `gr_${i}`})),
    foundation: STRUCTURE_BASES.foundation.map((b, i) => ({...b, id: `fd_${i}`})),
    walls: STRUCTURE_BASES.walls.map((b, i) => ({...b, id: `wl_${i}`})),
    roof: [],
    entrance: STRUCTURE_BASES.entrance.map((b, i) => ({...b, id: `en_${i}`})),
    decor: STRUCTURE_BASES.decor.map((b, i) => ({...b, id: `dc_${i}`})),
  };

  const roofColors = [
    { name: 'Red', main: '#ef4444', dark: '#991b1b', light: '#fca5a5' },
    { name: 'Blue', main: '#3b82f6', dark: '#1e3a8a', light: '#93c5fd' },
    { name: 'Slate', main: '#475569', dark: '#0f172a', light: '#94a3b8' },
    { name: 'Wood', main: '#78350f', dark: '#451a03', light: '#d4a373' },
    { name: 'Green', main: '#15803d', dark: '#14532d', light: '#86efac' },
    { name: 'Purple', main: '#7e22ce', dark: '#581c87', light: '#d8b4fe' },
  ];

  STRUCTURE_BASES.roof.forEach(base => {
    roofColors.forEach(col => {
      // Need unique ID for gradients within the SVG to prevent clashes
      const uniqueId = Math.random().toString(36).substr(2, 9);
      
      assets.roof.push({
        id: `roof_${base.name}_${col.name}`.replace(/[^a-zA-Z0-9]/g, ''),
        name: `${base.name} (${col.name})`,
        svg: base.svg
          .replace(/#CURRENT_COLOR/g, col.main)
          .replace(/#DARK_COLOR/g, col.dark)
          .replace(/#LIGHT_COLOR/g, col.light)
          .replace(/#ID/g, uniqueId)
      });
    });
  });

  return assets;
};

export const INITIAL_STRUCTURE_ASSETS = generateStructureAssets();

export const getRandomStructureIndex = (max: number) => Math.floor(Math.random() * max);