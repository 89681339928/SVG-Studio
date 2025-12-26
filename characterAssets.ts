export interface CharacterPart {
  id: string;
  name: string;
  svg: string; // Inner SVG content
  category?: string;
}

export type CategoryKey = 'floor' | 'feet' | 'armor' | 'helmet' | 'weaponRight' | 'weaponLeft';

// HIGH FIDELITY TOP-DOWN ASSETS
// CENTER POINT IS X=100, Y=100 for all assets
const BASES = {
  floor: [
    { name: 'None', svg: '' },
    { name: 'Shadow', svg: '<ellipse cx="100" cy="100" rx="50" ry="50" fill="#000" opacity="0.3" filter="blur(5px)" />' },
    { name: 'Magic Circle', svg: '<circle cx="100" cy="100" r="70" fill="none" stroke="#a855f7" stroke-width="2" opacity="0.6" stroke-dasharray="8 4" /><path d="M100,40 L152,130 L48,130 Z" fill="none" stroke="#d8b4fe" stroke-width="1" opacity="0.4" transform="rotate(180 100 100)"/>' },
    { name: 'Selection Ring', svg: '<circle cx="100" cy="100" r="70" fill="none" stroke="#4ade80" stroke-width="3" opacity="0.8" stroke-dasharray="15 5" />' },
  ],
  feet: [
    // Feet are placed around Y=110 to show they are below the body but visible
    { name: 'Standard Boots', svg: '<ellipse cx="85" cy="110" rx="12" ry="16" fill="#3f2e18" /><ellipse cx="115" cy="110" rx="12" ry="16" fill="#3f2e18" />' },
    { name: 'Armored Boots', svg: '<rect x="72" y="98" width="24" height="24" rx="6" fill="#334155" stroke="#1e293b" stroke-width="2"/><rect x="104" y="98" width="24" height="24" rx="6" fill="#334155" stroke="#1e293b" stroke-width="2"/>' },
    { name: 'Sandals', svg: '<ellipse cx="85" cy="110" rx="11" ry="15" fill="#d4a373" /><path d="M75,105 L95,105" stroke="#5c4033" stroke-width="2"/><ellipse cx="115" cy="110" rx="11" ry="15" fill="#d4a373" /><path d="M105,105 L125,105" stroke="#5c4033" stroke-width="2"/>' },
  ],
  armor: [
    // Body is centered at 100,100. Shoulders extend to ~70 and 130.
    { name: 'Plate Armor', svg: '<rect x="70" y="70" width="60" height="60" rx="15" fill="#DARK_COLOR" stroke="#111" stroke-width="1"/><circle cx="70" cy="100" r="18" fill="#LIGHT_COLOR" stroke="#DARK_COLOR" stroke-width="2"/><circle cx="130" cy="100" r="18" fill="#LIGHT_COLOR" stroke="#DARK_COLOR" stroke-width="2"/><rect x="80" y="80" width="40" height="40" rx="5" fill="#CURRENT_COLOR" opacity="0.8"/>' },
    
    { name: 'Wizard Robe', svg: '<circle cx="100" cy="100" r="35" fill="#CURRENT_COLOR" stroke="#DARK_COLOR" stroke-width="2"/><path d="M65,100 Q65,140 100,140 Q135,140 135,100" fill="#DARK_COLOR" opacity="0.3"/><circle cx="70" cy="100" r="15" fill="#CURRENT_COLOR"/><circle cx="130" cy="100" r="15" fill="#CURRENT_COLOR"/>' },
    
    { name: 'Leather Vest', svg: '<rect x="75" y="75" width="50" height="50" rx="10" fill="#78350f" /><rect x="65" y="90" width="15" height="20" rx="5" fill="#78350f"/><rect x="120" y="90" width="15" height="20" rx="5" fill="#78350f"/><path d="M75,85 L125,85" stroke="#451a03" stroke-width="2"/><path d="M75,95 L125,95" stroke="#451a03" stroke-width="2"/><path d="M75,105 L125,105" stroke="#451a03" stroke-width="2"/>' },
    
    { name: 'T-Shirt', svg: '<rect x="72" y="80" width="56" height="40" rx="8" fill="#CURRENT_COLOR" /><circle cx="68" cy="100" r="12" fill="#fca5a5"/><circle cx="132" cy="100" r="12" fill="#fca5a5"/>' }
  ],
  helmet: [
    // Head centered exactly at 100,100
    { name: 'Short Hair', svg: '<circle cx="100" cy="100" r="26" fill="#CURRENT_COLOR"/><path d="M80,85 Q100,65 120,85" fill="none" stroke="#LIGHT_COLOR" stroke-width="3" opacity="0.5"/>' },
    
    { name: 'Long Hair', svg: '<ellipse cx="100" cy="100" rx="30" ry="32" fill="#CURRENT_COLOR"/><path d="M70,100 Q60,125 75,140" stroke="#CURRENT_COLOR" stroke-width="12" fill="none"/><path d="M130,100 Q140,125 125,140" stroke="#CURRENT_COLOR" stroke-width="12" fill="none"/>' },
    
    { name: 'Knight Helm', svg: '<rect x="78" y="78" width="44" height="44" rx="12" fill="#CURRENT_COLOR" stroke="#DARK_COLOR" stroke-width="2"/><line x1="100" y1="78" x2="100" y2="122" stroke="#DARK_COLOR" stroke-width="2"/><line x1="80" y1="100" x2="120" y2="100" stroke="#DARK_COLOR" stroke-width="2"/>' },
    
    { name: 'Hood', svg: '<path d="M70,100 Q70,70 100,70 Q130,70 130,100 Q130,130 100,130 Q70,130 70,100" fill="#CURRENT_COLOR"/><circle cx="100" cy="100" r="15" fill="#111" opacity="0.7"/>' },
  ],
  weaponRight: [
    // Right hand items centered at X=150, Y=100
    { name: 'None', svg: '' },
    { name: 'Sword', svg: '<rect x="150" y="50" width="8" height="80" fill="#e2e8f0" stroke="#475569" stroke-width="1"/><rect x="142" y="100" width="24" height="6" fill="#475569" /><circle cx="154" cy="110" r="6" fill="#475569"/>' },
    { name: 'Axe', svg: '<rect x="152" y="40" width="6" height="100" fill="#78350f" /><path d="M155,50 L180,35 L180,65 L155,50" fill="#94a3b8" stroke="#475569" stroke-width="2"/>' },
    { name: 'Staff', svg: '<rect x="152" y="30" width="6" height="140" fill="#5b21b6" /><circle cx="155" cy="30" r="10" fill="#d8b4fe" filter="drop-shadow(0 0 5px #a855f7)"/>' },
    { name: 'Pistol', svg: '<rect x="150" y="90" width="12" height="20" fill="#333"/><rect x="150" y="80" width="12" height="12" fill="#555"/><rect x="154" y="60" width="4" height="30" fill="#777"/>' }
  ],
  weaponLeft: [
    // Left hand items centered at X=50, Y=100
    { name: 'None', svg: '' },
    { name: 'Round Shield', svg: '<circle cx="50" cy="100" r="28" fill="#CURRENT_COLOR" stroke="#e2e8f0" stroke-width="3"/><circle cx="50" cy="100" r="6" fill="#e2e8f0"/>' },
    { name: 'Square Shield', svg: '<rect x="25" y="70" width="50" height="60" rx="4" fill="#CURRENT_COLOR" stroke="#e2e8f0" stroke-width="3"/><path d="M25,70 L75,130" stroke="#fff" opacity="0.2"/><path d="M75,70 L25,130" stroke="#fff" opacity="0.2"/>' },
    { name: 'Dagger', svg: '<rect x="46" y="80" width="8" height="30" fill="#cbd5e1" stroke="#475569" stroke-width="1"/><rect x="40" y="100" width="20" height="4" fill="#475569"/>' },
    { name: 'Book', svg: '<rect x="30" y="85" width="40" height="30" fill="#CURRENT_COLOR" rx="2"/><line x1="50" y1="85" x2="50" y2="115" stroke="#fff" stroke-width="1" opacity="0.5"/>' }
  ]
};

const generateVariants = () => {
  const assets: Record<CategoryKey, CharacterPart[]> = {
    floor: BASES.floor.map((item, idx) => ({ ...item, id: `floor_${idx}` })),
    feet: BASES.feet.map((item, idx) => ({ ...item, id: `feet_${idx}` })),
    armor: [],
    helmet: [],
    weaponRight: [],
    weaponLeft: [],
  };

  const colors = [
    { name: 'Red', main: '#ef4444', dark: '#991b1b', light: '#fca5a5' },
    { name: 'Blue', main: '#3b82f6', dark: '#1e3a8a', light: '#93c5fd' },
    { name: 'Green', main: '#15803d', dark: '#14532d', light: '#86efac' },
    { name: 'Purple', main: '#7e22ce', dark: '#581c87', light: '#d8b4fe' },
    { name: 'Steel', main: '#94a3b8', dark: '#475569', light: '#cbd5e1' },
    { name: 'Gold', main: '#eab308', dark: '#a16207', light: '#fde047' },
    { name: 'Black', main: '#374151', dark: '#111827', light: '#6b7280' },
  ];

  const processCategory = (category: CategoryKey, baseList: {name: string, svg: string}[]) => {
    baseList.forEach(base => {
        if (base.svg.includes('#CURRENT_COLOR')) {
            colors.forEach(col => {
                assets[category].push({
                    id: `${category}_${base.name}_${col.name}`.replace(/[^a-zA-Z0-9]/g, ''),
                    name: `${base.name} (${col.name})`,
                    svg: base.svg
                        .replace(/#CURRENT_COLOR/g, col.main)
                        .replace(/#DARK_COLOR/g, col.dark)
                        .replace(/#LIGHT_COLOR/g, col.light)
                });
            });
        } else {
            assets[category].push({
                id: `${category}_${base.name}`.replace(/[^a-zA-Z0-9]/g, ''),
                name: base.name,
                svg: base.svg
            });
        }
    });
  };

  processCategory('armor', BASES.armor);
  processCategory('helmet', BASES.helmet);
  processCategory('weaponRight', BASES.weaponRight);
  processCategory('weaponLeft', BASES.weaponLeft);

  return assets;
};

export const INITIAL_ASSETS = generateVariants();
export const getRandomIndex = (max: number) => Math.floor(Math.random() * max);