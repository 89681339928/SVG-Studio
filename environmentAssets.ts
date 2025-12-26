export interface EnvironmentPart {
  id: string;
  name: string;
  svg: string;
  category?: string;
}

export type EnvironmentCategory = 'ground' | 'main' | 'detail' | 'shadow';

const ENV_BASES = {
  ground: [
    { name: 'None', svg: '' },
    { name: 'Grass Circle', svg: '<circle cx="100" cy="100" r="70" fill="#166534" opacity="0.4" filter="blur(2px)" />' },
    { name: 'Dirt Patch', svg: '<path d="M60,60 Q80,40 120,50 Q150,70 140,110 Q120,150 80,140 Q40,120 60,60" fill="#573a25" opacity="0.6" />' },
    { name: 'Water', svg: '<path d="M50,80 Q75,60 100,80 T150,80 T200,80" fill="none" stroke="#3b82f6" stroke-width="120" opacity="0.3" /><path d="M60,80 Q80,70 100,80" stroke="white" fill="none" opacity="0.3"/><path d="M120,110 Q140,100 160,110" stroke="white" fill="none" opacity="0.3"/>' }
  ],
  main: [
    { name: 'Oak Tree', svg: '<g><path d="M95,100 L90,160 L110,160 L105,100 Z" fill="#5D2E0E"/><circle cx="75" cy="90" r="30" fill="#CURRENT_COLOR" /><circle cx="125" cy="90" r="30" fill="#CURRENT_COLOR" /><circle cx="100" cy="70" r="35" fill="#LIGHT_COLOR" /><circle cx="100" cy="100" r="35" fill="#DARK_COLOR" /></g>' },
    { name: 'Pine Tree', svg: '<g><rect x="95" y="130" width="10" height="40" fill="#5D2E0E"/><path d="M100,20 L130,60 L70,60 Z" fill="#LIGHT_COLOR"/><path d="M100,40 L140,90 L60,90 Z" fill="#CURRENT_COLOR"/><path d="M100,70 L150,130 L50,130 Z" fill="#DARK_COLOR"/></g>' },
    { name: 'Large Rock', svg: '<path d="M70,120 L60,80 L90,60 L130,70 L140,110 L110,140 Z" fill="#57534e" stroke="#44403c" stroke-width="2"/><path d="M70,120 L90,60 L110,140" fill="none" stroke="#44403c" stroke-width="1" opacity="0.5"/><path d="M90,60 L130,70" stroke="#a8a29e" stroke-width="4" opacity="0.3"/>' },
    { name: 'Boulder Cluster', svg: '<circle cx="80" cy="110" r="25" fill="#78716c" /><circle cx="120" cy="120" r="20" fill="#57534e" /><circle cx="100" cy="90" r="15" fill="#a8a29e" />' },
    { name: 'Bush', svg: '<circle cx="80" cy="110" r="20" fill="#CURRENT_COLOR"/><circle cx="120" cy="110" r="22" fill="#CURRENT_COLOR"/><circle cx="100" cy="90" r="25" fill="#LIGHT_COLOR"/><circle cx="100" cy="115" r="20" fill="#DARK_COLOR"/>' },
    { name: 'Stump', svg: '<ellipse cx="100" cy="120" rx="20" ry="15" fill="#5D2E0E"/><ellipse cx="100" cy="110" rx="18" ry="12" fill="#8B4513"/><path d="M100,110 L100,115" stroke="#3e1f08" stroke-width="20" opacity="0.1"/><ellipse cx="100" cy="110" rx="14" ry="9" fill="none" stroke="#3e1f08" stroke-width="1"/><ellipse cx="100" cy="110" rx="8" ry="5" fill="none" stroke="#3e1f08" stroke-width="1"/>' }
  ],
  detail: [
    { name: 'None', svg: '' },
    { name: 'Mushrooms', svg: '<g fill="#ef4444"><circle cx="70" cy="130" r="5"/><circle cx="80" cy="140" r="4"/><circle cx="60" cy="135" r="3"/></g>' },
    { name: 'Flowers', svg: '<g><circle cx="130" cy="130" r="3" fill="#fbbf24"/><circle cx="130" cy="130" r="6" fill="none" stroke="#f472b6" stroke-width="3" stroke-dasharray="2 2"/><circle cx="150" cy="120" r="3" fill="#fbbf24"/><circle cx="150" cy="120" r="6" fill="none" stroke="#a78bfa" stroke-width="3" stroke-dasharray="2 2"/></g>' },
    { name: 'Moss', svg: '<path d="M90,80 Q100,70 110,80" stroke="#4ade80" stroke-width="3" fill="none" opacity="0.6"/><path d="M95,100 Q100,90 105,100" stroke="#4ade80" stroke-width="3" fill="none" opacity="0.6"/>' },
    { name: 'Pebbles', svg: '<circle cx="80" cy="140" r="3" fill="#9ca3af"/><circle cx="140" cy="135" r="4" fill="#9ca3af"/><circle cx="110" cy="150" r="2" fill="#6b7280"/>' }
  ],
  shadow: [
    { name: 'None', svg: '' },
    { name: 'Drop Shadow', svg: '<ellipse cx="105" cy="145" rx="40" ry="15" fill="#000" opacity="0.3" filter="blur(4px)" />' },
    { name: 'Long Shadow', svg: '<path d="M100,140 L160,180 L140,180 L80,140 Z" fill="#000" opacity="0.2" filter="blur(4px)"/>' }
  ]
};

const generateAssets = () => {
  const assets: Record<EnvironmentCategory, EnvironmentPart[]> = {
    ground: ENV_BASES.ground.map((b, i) => ({...b, id: `g_${i}`})),
    main: [],
    detail: ENV_BASES.detail.map((b, i) => ({...b, id: `d_${i}`})),
    shadow: ENV_BASES.shadow.map((b, i) => ({...b, id: `s_${i}`})),
  };

  const foliageColors = [
    { name: 'Green', main: '#16a34a', dark: '#14532d', light: '#4ade80' },
    { name: 'Autumn', main: '#ea580c', dark: '#9a3412', light: '#fdba74' },
    { name: 'Cherry', main: '#db2777', dark: '#831843', light: '#f9a8d4' },
    { name: 'Snow', main: '#e2e8f0', dark: '#94a3b8', light: '#f8fafc' },
    { name: 'Dead', main: '#78350f', dark: '#451a03', light: '#a8a29e' },
  ];

  ENV_BASES.main.forEach(base => {
    if (base.svg.includes('#CURRENT_COLOR')) {
        foliageColors.forEach(col => {
            assets.main.push({
                id: `env_${base.name}_${col.name}`.replace(/[^a-zA-Z0-9]/g, ''),
                name: `${base.name} (${col.name})`,
                svg: base.svg
                    .replace(/#CURRENT_COLOR/g, col.main)
                    .replace(/#DARK_COLOR/g, col.dark)
                    .replace(/#LIGHT_COLOR/g, col.light)
            });
        });
    } else {
        assets.main.push({
            id: `env_${base.name}`.replace(/[^a-zA-Z0-9]/g, ''),
            name: base.name,
            svg: base.svg
        });
    }
  });

  return assets;
};

export const INITIAL_ENV_ASSETS = generateAssets();
export const getRandomEnvIndex = (max: number) => Math.floor(Math.random() * max);