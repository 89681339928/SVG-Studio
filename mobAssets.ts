export interface MobDef {
  id: string;
  name: string;
  category: MobCategory;
  svg: string;
}

export type MobCategory = 'Beasts' | 'Undead' | 'Humanoids' | 'Monsters' | 'Insects' | 'Bosses' | 'Critters';

// Helper to replace colors
const tpl = (svg: string, col1: string, col2: string, col3: string = '#000') => {
  return svg
    .replace(/#C1/g, col1)
    .replace(/#C2/g, col2)
    .replace(/#C3/g, col3);
};

// Base Shapes (Top-Down)
// #C1 = Main Body, #C2 = Detail/Secondary, #C3 = Eyes/Dark
const SHAPES = {
  // --- BEASTS ---
  wolf: '<ellipse cx="100" cy="110" rx="20" ry="40" fill="#C1"/><circle cx="100" cy="75" r="18" fill="#C1"/><path d="M90,75 L100,55 L110,75" fill="#C1"/><circle cx="95" cy="70" r="2" fill="#C3"/><circle cx="105" cy="70" r="2" fill="#C3"/><path d="M100,140 Q110,160 120,150" stroke="#C1" stroke-width="8" fill="none" stroke-linecap="round"/>',
  bear: '<ellipse cx="100" cy="110" rx="35" ry="45" fill="#C1"/><circle cx="100" cy="75" r="25" fill="#C1"/><circle cx="80" cy="65" r="8" fill="#C1"/><circle cx="120" cy="65" r="8" fill="#C1"/><circle cx="92" cy="70" r="3" fill="#C3"/><circle cx="108" cy="70" r="3" fill="#C3"/><ellipse cx="100" cy="85" rx="10" ry="8" fill="#C2"/>',
  boar: '<ellipse cx="100" cy="100" rx="25" ry="40" fill="#C1"/><path d="M90,65 L90,55 L95,65 M110,65 L110,55 L105,65" stroke="#fff" stroke-width="2"/><circle cx="100" cy="70" r="20" fill="#C1"/><ellipse cx="100" cy="65" rx="8" ry="6" fill="#C2"/>',
  rat: '<ellipse cx="100" cy="110" rx="15" ry="25" fill="#C1"/><circle cx="100" cy="85" r="12" fill="#C1"/><path d="M100,135 Q90,160 110,170" stroke="#C2" stroke-width="3" fill="none"/><circle cx="95" cy="82" r="2" fill="#C3"/><circle cx="105" cy="82" r="2" fill="#C3"/>',
  bat: '<path d="M100,100 L60,80 Q40,110 80,110 L100,100 L120,110 Q160,110 140,80 Z" fill="#C1"/><circle cx="100" cy="95" r="8" fill="#C2"/><circle cx="97" cy="93" r="1" fill="#fff"/><circle cx="103" cy="93" r="1" fill="#fff"/>',

  // --- UNDEAD ---
  skeleton: '<rect x="85" y="90" width="30" height="35" rx="5" fill="#e5e5e5"/><circle cx="100" cy="80" r="12" fill="#e5e5e5"/><rect x="80" y="95" width="5" height="25" fill="#e5e5e5"/><rect x="115" y="95" width="5" height="25" fill="#e5e5e5"/><circle cx="96" cy="78" r="2" fill="#111"/><circle cx="104" cy="78" r="2" fill="#111"/><path d="M85,100 L115,100 M85,110 L115,110" stroke="#999" stroke-width="2"/>',
  zombie: '<circle cx="100" cy="100" r="25" fill="#C1"/><rect x="60" y="85" width="20" height="10" fill="#C1" transform="rotate(20 60 85)"/><rect x="120" y="95" width="20" height="10" fill="#C1" transform="rotate(-10 120 95)"/><circle cx="92" cy="95" r="3" fill="#fff"/><circle cx="108" cy="95" r="2" fill="#fff" opacity="0.5"/>',
  ghost: '<path d="M100,60 Q130,60 130,100 L130,130 Q115,140 100,130 Q85,140 70,130 L70,100 Q70,60 100,60" fill="#C1" opacity="0.8"/><circle cx="90" cy="90" r="4" fill="#000"/><circle cx="110" cy="90" r="4" fill="#000"/><ellipse cx="100" cy="110" rx="5" ry="8" fill="#000"/>',
  lich: '<path d="M100,70 L130,130 L70,130 Z" fill="#C1"/><circle cx="100" cy="80" r="10" fill="#f5f5f5"/><path d="M90,70 Q100,50 110,70" stroke="#C2" stroke-width="2" fill="none"/><circle cx="100" cy="80" r="15" fill="none" stroke="#C2" stroke-width="2"/><circle cx="97" cy="80" r="2" fill="#C3"/><circle cx="103" cy="80" r="2" fill="#C3"/>',

  // --- HUMANOIDS ---
  goblin: '<circle cx="100" cy="100" r="20" fill="#C1"/><ellipse cx="75" cy="100" rx="15" ry="5" fill="#C1" transform="rotate(-20 75 100)"/><ellipse cx="125" cy="100" rx="15" ry="5" fill="#C1" transform="rotate(20 125 100)"/><circle cx="93" cy="95" r="2" fill="#C3"/><circle cx="107" cy="95" r="2" fill="#C3"/><path d="M110,110 L130,120" stroke="#ccc" stroke-width="3"/>',
  orc: '<rect x="80" y="85" width="40" height="30" rx="10" fill="#C2"/><circle cx="100" cy="85" r="18" fill="#C1"/><circle cx="100" cy="100" r="22" fill="#C2"/><circle cx="94" cy="82" r="2" fill="#C3"/><circle cx="106" cy="82" r="2" fill="#C3"/><path d="M130,90 L150,80" stroke="#999" stroke-width="4"/>',
  bandit: '<circle cx="100" cy="100" r="18" fill="#fca5a5"/><path d="M82,90 L118,90 L118,110 L82,110 Z" fill="#C1"/><rect x="75" y="100" width="50" height="20" rx="5" fill="#C2"/><circle cx="100" cy="100" r="22" fill="none" stroke="#C2" stroke-width="2"/>',
  knight: '<rect x="85" y="85" width="30" height="30" fill="#9ca3af"/><circle cx="100" cy="100" r="12" fill="#d1d5db"/><path d="M120,90 L140,90" stroke="#cbd5e1" stroke-width="4"/><circle cx="70" cy="100" r="15" fill="#C1" stroke="#fff" stroke-width="2"/>',

  // --- MONSTERS ---
  slime: '<path d="M100,80 Q140,80 140,110 Q140,140 100,140 Q60,140 60,110 Q60,80 100,80" fill="#C1" opacity="0.8"/><circle cx="110" cy="100" r="5" fill="#fff" opacity="0.5"/><circle cx="90" cy="110" r="15" fill="#C2" opacity="0.3"/>',
  beholder: '<circle cx="100" cy="100" r="40" fill="#C1"/><circle cx="100" cy="100" r="15" fill="#fff"/><circle cx="100" cy="100" r="8" fill="#000"/><path d="M60,100 L40,100 M140,100 L160,100 M100,60 L100,40 M100,140 L100,160 M70,70 L50,50 M130,70 L150,50" stroke="#C1" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="100" r="5" fill="#C2"/><circle cx="160" cy="100" r="5" fill="#C2"/><circle cx="100" cy="40" r="5" fill="#C2"/>',
  elemental: '<path d="M100,130 L70,80 L100,50 L130,80 Z" fill="#C1" opacity="0.8"/><circle cx="80" cy="60" r="10" fill="#C2" opacity="0.6"/><circle cx="120" cy="60" r="10" fill="#C2" opacity="0.6"/><circle cx="100" cy="110" r="20" fill="#C2" opacity="0.6"/><animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="2s" repeatCount="indefinite" />',
  mimic: '<rect x="70" y="80" width="60" height="40" fill="#854d0e"/><rect x="70" y="80" width="60" height="20" fill="#a16207"/><path d="M75,100 L80,110 L85,100 L90,110 L95,100 L100,110 L105,100" fill="none" stroke="#fff" stroke-width="2"/><circle cx="85" cy="90" r="3" fill="#C3"/><circle cx="115" cy="90" r="3" fill="#C3"/>',

  // --- INSECTS ---
  spider: '<circle cx="100" cy="100" r="15" fill="#C1"/><ellipse cx="100" cy="125" rx="20" ry="25" fill="#C1"/><path d="M100,100 L60,80 M100,100 L60,100 M100,100 L60,120 M100,100 L60,140 M100,100 L140,80 M100,100 L140,100 M100,100 L140,120 M100,100 L140,140" stroke="#C1" stroke-width="3" fill="none"/><circle cx="95" cy="95" r="2" fill="#C3"/><circle cx="105" cy="95" r="2" fill="#C3"/>',
  scorpion: '<ellipse cx="100" cy="100" rx="15" ry="25" fill="#C1"/><path d="M100,125 Q100,160 130,140 Q150,120 140,100" stroke="#C1" stroke-width="6" fill="none"/><path d="M140,100 L135,90 L145,90 Z" fill="#C3"/><path d="M90,80 L70,60 M110,80 L130,60" stroke="#C1" stroke-width="4"/><circle cx="70" cy="60" r="5" fill="#C1"/><circle cx="130" cy="60" r="5" fill="#C1"/>',
  beetle: '<ellipse cx="100" cy="110" rx="25" ry="35" fill="#C1"/><path d="M100,75 L100,145" stroke="#000" opacity="0.3"/><circle cx="100" cy="70" r="15" fill="#C2"/><path d="M100,60 L80,40 M100,60 L120,40" stroke="#C2" stroke-width="2"/><path d="M75,90 L50,80 M75,110 L50,110 M75,130 L50,140 M125,90 L150,80 M125,110 L150,110 M125,130 L150,140" stroke="#C2" stroke-width="3"/>',
  
  // --- BOSSES ---
  dragon: '<path d="M100,40 L110,70 L100,90 L90,70 Z" fill="#C1"/><ellipse cx="100" cy="120" rx="30" ry="50" fill="#C1"/><path d="M70,100 L20,60 L70,120 Z" fill="#C2" opacity="0.8"/><path d="M130,100 L180,60 L130,120 Z" fill="#C2" opacity="0.8"/><path d="M100,170 Q120,200 80,220" stroke="#C1" stroke-width="8" fill="none"/><circle cx="95" cy="70" r="3" fill="#C3"/><circle cx="105" cy="70" r="3" fill="#C3"/>',
  demon: '<circle cx="100" cy="90" r="30" fill="#C1"/><path d="M70,90 L30,70 L60,110 Z" fill="#C1"/><path d="M130,90 L170,70 L140,110 Z" fill="#C1"/><path d="M90,70 L80,40 L100,60 Z" fill="#fff"/><path d="M110,70 L120,40 L100,60 Z" fill="#fff"/><circle cx="90" cy="90" r="4" fill="#C3"/><circle cx="110" cy="90" r="4" fill="#C3"/><path d="M90,110 Q100,100 110,110" stroke="#000" stroke-width="3" fill="none"/>',
  golem: '<rect x="70" y="70" width="60" height="50" fill="#C1"/><rect x="50" y="70" width="20" height="40" fill="#C1"/><rect x="130" y="70" width="20" height="40" fill="#C1"/><rect x="85" y="50" width="30" height="20" fill="#C1"/><rect x="90" y="55" width="20" height="5" fill="#C3" opacity="0.8"/><rect x="75" y="120" width="20" height="30" fill="#C1"/><rect x="105" y="120" width="20" height="30" fill="#C1"/>',

  // --- CRITTERS ---
  rabbit: '<ellipse cx="100" cy="100" rx="12" ry="18" fill="#C1"/><ellipse cx="95" cy="80" rx="4" ry="12" fill="#C1"/><ellipse cx="105" cy="80" rx="4" ry="12" fill="#C1"/><circle cx="100" cy="120" r="5" fill="#fff"/>',
  snake: '<path d="M100,50 Q120,70 100,90 T100,130 T100,170" fill="none" stroke="#C1" stroke-width="10" stroke-linecap="round"/><circle cx="100" cy="50" r="8" fill="#C1"/><circle cx="97" cy="48" r="2" fill="#C3"/><circle cx="103" cy="48" r="2" fill="#C3"/>',
  chicken: '<circle cx="100" cy="100" r="15" fill="#fff"/><circle cx="100" cy="90" r="8" fill="#fff"/><path d="M100,85 L100,80 L105,82 Z" fill="#ef4444"/><circle cx="98" cy="88" r="1" fill="#000"/><circle cx="102" cy="88" r="1" fill="#000"/>'
};

const defineMob = (baseId: string, name: string, cat: MobCategory, c1: string, c2: string, c3: string): MobDef => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawSvg = (SHAPES as any)[baseId] || SHAPES.slime;
  return {
    id: `${baseId}_${name.replace(/\s/g, '').toLowerCase()}`,
    name,
    category: cat,
    svg: tpl(rawSvg, c1, c2, c3)
  };
};

export const generateMobLibrary = (): MobDef[] => {
  const mobs: MobDef[] = [];

  // Beasts
  mobs.push(defineMob('wolf', 'Grey Wolf', 'Beasts', '#9ca3af', '#4b5563', '#000'));
  mobs.push(defineMob('wolf', 'Dire Wolf', 'Beasts', '#1f2937', '#000', '#ef4444'));
  mobs.push(defineMob('wolf', 'White Wolf', 'Beasts', '#f3f4f6', '#d1d5db', '#3b82f6'));
  mobs.push(defineMob('bear', 'Brown Bear', 'Beasts', '#78350f', '#451a03', '#000'));
  mobs.push(defineMob('bear', 'Polar Bear', 'Beasts', '#f9fafb', '#e5e7eb', '#111'));
  mobs.push(defineMob('bear', 'Cave Bear', 'Beasts', '#4b5563', '#1f2937', '#ef4444'));
  mobs.push(defineMob('boar', 'Wild Boar', 'Beasts', '#92400e', '#78350f', '#000'));
  mobs.push(defineMob('boar', 'Hell Boar', 'Beasts', '#7f1d1d', '#991b1b', '#facc15'));
  mobs.push(defineMob('rat', 'Giant Rat', 'Beasts', '#a8a29e', '#78716c', '#000'));
  mobs.push(defineMob('rat', 'Plague Rat', 'Beasts', '#3f6212', '#365314', '#a3e635'));
  mobs.push(defineMob('bat', 'Cave Bat', 'Beasts', '#4b5563', '#1f2937', '#ef4444'));
  mobs.push(defineMob('bat', 'Vampire Bat', 'Beasts', '#1e1b4b', '#000', '#dc2626'));

  // Undead
  mobs.push(defineMob('skeleton', 'Skeleton', 'Undead', '#f5f5f5', '#d4d4d4', '#000'));
  mobs.push(defineMob('skeleton', 'Skel. Warrior', 'Undead', '#d4d4d4', '#737373', '#ef4444'));
  mobs.push(defineMob('zombie', 'Zombie', 'Undead', '#86efac', '#166534', '#000'));
  mobs.push(defineMob('zombie', 'Rotting Corpse', 'Undead', '#4d7c0f', '#365314', '#111'));
  mobs.push(defineMob('ghost', 'Spirit', 'Undead', '#e0f2fe', '#bae6fd', '#000'));
  mobs.push(defineMob('ghost', 'Wraith', 'Undead', '#172554', '#1e3a8a', '#60a5fa'));
  mobs.push(defineMob('ghost', 'Spectre', 'Undead', '#f0fdf4', '#86efac', '#16a34a'));
  mobs.push(defineMob('lich', 'Lich', 'Undead', '#4c1d95', '#a855f7', '#facc15'));
  mobs.push(defineMob('lich', 'Necromancer', 'Undead', '#111827', '#374151', '#4ade80'));

  // Humanoids
  mobs.push(defineMob('goblin', 'Goblin', 'Humanoids', '#4ade80', '#16a34a', '#000'));
  mobs.push(defineMob('goblin', 'Hobgoblin', 'Humanoids', '#ea580c', '#c2410c', '#facc15'));
  mobs.push(defineMob('orc', 'Orc Grunt', 'Humanoids', '#65a30d', '#3f6212', '#000'));
  mobs.push(defineMob('orc', 'Orc Berserker', 'Humanoids', '#3f6212', '#7f1d1d', '#fff'));
  mobs.push(defineMob('bandit', 'Bandit', 'Humanoids', '#525252', '#262626', '#000'));
  mobs.push(defineMob('bandit', 'Rogue', 'Humanoids', '#171717', '#404040', '#ef4444'));
  mobs.push(defineMob('knight', 'Dark Knight', 'Humanoids', '#111827', '#dc2626', '#000'));
  mobs.push(defineMob('knight', 'Paladin', 'Humanoids', '#eab308', '#fef08a', '#fff'));

  // Monsters
  mobs.push(defineMob('slime', 'Green Slime', 'Monsters', '#4ade80', '#16a34a', '#000'));
  mobs.push(defineMob('slime', 'Blue Jelly', 'Monsters', '#60a5fa', '#2563eb', '#000'));
  mobs.push(defineMob('slime', 'Magma Cube', 'Monsters', '#ef4444', '#7f1d1d', '#facc15'));
  mobs.push(defineMob('slime', 'Void Ooze', 'Monsters', '#7e22ce', '#3b0764', '#f0abfc'));
  mobs.push(defineMob('beholder', 'Watcher', 'Monsters', '#d97706', '#92400e', '#000'));
  mobs.push(defineMob('beholder', 'Gazer', 'Monsters', '#0891b2', '#0e7490', '#cffafe'));
  mobs.push(defineMob('elemental', 'Fire Elemental', 'Monsters', '#f97316', '#c2410c', '#fff'));
  mobs.push(defineMob('elemental', 'Water Elemental', 'Monsters', '#3b82f6', '#1d4ed8', '#dbeafe'));
  mobs.push(defineMob('elemental', 'Earth Elemental', 'Monsters', '#78350f', '#451a03', '#d6d3d1'));
  mobs.push(defineMob('elemental', 'Air Elemental', 'Monsters', '#e0f2fe', '#bae6fd', '#fff'));
  mobs.push(defineMob('mimic', 'Mimic', 'Monsters', '#854d0e', '#a16207', '#fff'));

  // Insects
  mobs.push(defineMob('spider', 'Giant Spider', 'Insects', '#1f2937', '#000', '#ef4444'));
  mobs.push(defineMob('spider', 'Cave Spider', 'Insects', '#064e3b', '#065f46', '#10b981'));
  mobs.push(defineMob('spider', 'Sand Spider', 'Insects', '#d4a373', '#a16207', '#000'));
  mobs.push(defineMob('scorpion', 'Scorpion', 'Insects', '#d97706', '#92400e', '#000'));
  mobs.push(defineMob('scorpion', 'Black Stinger', 'Insects', '#111827', '#374151', '#ef4444'));
  mobs.push(defineMob('beetle', 'Scarab', 'Insects', '#eab308', '#ca8a04', '#000'));
  mobs.push(defineMob('beetle', 'Dung Beetle', 'Insects', '#4b5563', '#1f2937', '#000'));

  // Bosses
  mobs.push(defineMob('dragon', 'Red Dragon', 'Bosses', '#ef4444', '#991b1b', '#facc15'));
  mobs.push(defineMob('dragon', 'Blue Dragon', 'Bosses', '#3b82f6', '#1e3a8a', '#93c5fd'));
  mobs.push(defineMob('dragon', 'Green Dragon', 'Bosses', '#16a34a', '#14532d', '#86efac'));
  mobs.push(defineMob('dragon', 'Black Dragon', 'Bosses', '#111827', '#374151', '#a855f7'));
  mobs.push(defineMob('demon', 'Demon Lord', 'Bosses', '#991b1b', '#7f1d1d', '#facc15'));
  mobs.push(defineMob('demon', 'Shadow Fiend', 'Bosses', '#111', '#333', '#a855f7'));
  mobs.push(defineMob('golem', 'Iron Golem', 'Bosses', '#9ca3af', '#6b7280', '#ef4444'));
  mobs.push(defineMob('golem', 'Stone Golem', 'Bosses', '#78716c', '#57534e', '#3b82f6'));

  // Critters
  mobs.push(defineMob('rabbit', 'White Rabbit', 'Critters', '#fff', '#e5e5e5', '#000'));
  mobs.push(defineMob('rabbit', 'Brown Rabbit', 'Critters', '#a8a29e', '#78716c', '#000'));
  mobs.push(defineMob('snake', 'Green Snake', 'Critters', '#4ade80', '#16a34a', '#000'));
  mobs.push(defineMob('snake', 'Coral Snake', 'Critters', '#ef4444', '#facc15', '#000'));
  mobs.push(defineMob('chicken', 'Chicken', 'Critters', '#fff', '#e5e5e5', '#000'));
  
  // -- Programmatically fill rest to reach ~200 count with simple variations --
  const modifiers = [
    { suffix: 'Alpha', c1: '#1f2937', c2: '#374151' },
    { suffix: 'Spectral', c1: '#a5f3fc', c2: '#22d3ee' },
    { suffix: 'Corrupted', c1: '#4c1d95', c2: '#2e1065' },
    { suffix: 'Infernal', c1: '#b91c1c', c2: '#fca5a5' }
  ];

  const baseSet = [...mobs]; // Copy current list
  baseSet.forEach(mob => {
     if(mobs.length >= 200) return;
     // Don't modify bosses too much or critters
     if(mob.category === 'Bosses' || mob.category === 'Critters') return;
     
     modifiers.forEach(mod => {
        const rawSvg = (SHAPES as any)[mob.id.split('_')[0]];
        if(rawSvg) {
             mobs.push({
                 id: `${mob.id}_${mod.suffix.toLowerCase()}`,
                 name: `${mod.suffix} ${mob.name}`,
                 category: mob.category,
                 svg: tpl(rawSvg, mod.c1, mod.c2, '#fff')
             });
        }
     });
  });

  return mobs;
};