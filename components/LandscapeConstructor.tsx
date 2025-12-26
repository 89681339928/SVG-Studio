import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, RefreshCw, Layers, Sun, Mountain, Cloud } from 'lucide-react';
import { LANDSCAPE_PALETTES, SKY_ASSETS, Palette } from '../landscapeAssets';
import { formatXml } from '../utils/formatUtils';

interface LandscapeConstructorProps {
  onGenerate: (svgCode: string) => void;
}

const LandscapeConstructor: React.FC<LandscapeConstructorProps> = ({ onGenerate }) => {
  // Configuration State
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('day');
  const [skyAssetId, setSkyAssetId] = useState<string>('clouds_simple');
  
  // Complexity Params
  const [mtnJaggedness, setMtnJaggedness] = useState(0.5); // 0 to 1
  const [hillHeight, setHillHeight] = useState(60); 
  const [sunPos, setSunPos] = useState({ x: 70, y: 50 });
  const [waterLevel, setWaterLevel] = useState(0); // 0 = no water, >0 = height from bottom

  // Generated Path Data (Strings)
  const [paths, setPaths] = useState({
    mountainFar: '',
    mountainNear: '',
    hillFar: '',
    hillNear: ''
  });

  const generateTerrainPath = (width: number, height: number, segments: number, roughness: number, baseHeight: number) => {
    let points = [];
    points.push([0, height]); // Bottom Left

    let currentHeight = baseHeight;
    const segmentWidth = width / segments;

    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth;
      // Random walk
      const change = (Math.random() - 0.5) * roughness * 50;
      currentHeight += change;
      // Clamp
      currentHeight = Math.max(20, Math.min(height - 20, currentHeight));
      
      points.push([x, currentHeight]);
    }

    points.push([width, height]); // Bottom Right

    // Convert to SVG Path d string
    // Start
    let d = `M ${points[0][0]} ${points[0][1]} `;
    // Lines
    for(let i=1; i<points.length; i++) {
        d += `L ${points[i][0]} ${points[i][1]} `;
    }
    d += 'Z';
    return d;
  };

  const regenerateTerrain = useCallback(() => {
    setPaths({
        mountainFar: generateTerrainPath(400, 200, 15, mtnJaggedness, 100),
        mountainNear: generateTerrainPath(400, 200, 10, mtnJaggedness * 0.8, 140),
        hillFar: generateTerrainPath(400, 200, 8, mtnJaggedness * 0.5, 160),
        hillNear: generateTerrainPath(400, 200, 5, mtnJaggedness * 0.3, 180),
    });
  }, [mtnJaggedness]);

  // Initial generation
  useEffect(() => {
    regenerateTerrain();
  }, [regenerateTerrain]);

  const palette = LANDSCAPE_PALETTES.find(p => p.id === selectedPaletteId) || LANDSCAPE_PALETTES[0];
  const skyAsset = SKY_ASSETS.find(s => s.id === skyAssetId);

  const buildSvg = () => {
    return `<svg width="800" height="400" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${palette.skyTop}" />
      <stop offset="100%" stop-color="${palette.skyBottom}" />
    </linearGradient>
    <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
  </defs>

  <!-- Sky -->
  <rect x="0" y="0" width="400" height="200" fill="url(#skyGrad)" />
  
  <!-- Sky Details -->
  ${palette.starColor ? `<rect x="0" y="0" width="400" height="200" fill="url(#starsPattern)" opacity="0.5"/>` : ''}
  <g id="skyItems" fill="${palette.starColor || 'white'}">
     ${skyAsset?.svg || ''}
  </g>

  <!-- Celestial Body -->
  <circle cx="${sunPos.x}" cy="${sunPos.y}" r="${palette.id === 'night' ? 12 : 18}" fill="${palette.sunColor}" filter="url(#glow)" />

  <!-- Far Mountains -->
  <path d="${paths.mountainFar}" fill="${palette.mountainFar}" opacity="0.8" />

  <!-- Near Mountains -->
  <path d="${paths.mountainNear}" fill="${palette.mountainNear}" />

  <!-- Far Hills -->
  <path d="${paths.hillFar}" fill="${palette.hillFar}" />

  <!-- Near Hills / Foreground -->
  <path d="${paths.hillNear}" fill="${palette.hillNear}" />

  <!-- Water (Optional) -->
  ${waterLevel > 0 ? `<rect x="0" y="${200 - waterLevel}" width="400" height="${waterLevel}" fill="${palette.water}" opacity="0.6" />` : ''}

</svg>`;
  };

  const handleSendToEditor = () => {
    onGenerate(formatXml(buildSvg()));
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Left: Preview */}
      <div className="w-full md:w-2/3 h-1/2 md:h-full bg-gray-900 border-r border-gray-800 flex flex-col relative">
         <div className="absolute top-4 left-4 z-10">
             <div className="bg-blue-900/50 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-blue-200 border border-blue-700">
                Landscape Generator
             </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 bg-checkerboard">
            <div className="w-full max-w-[800px] aspect-[2/1] bg-gray-800 shadow-2xl rounded-lg overflow-hidden ring-4 ring-gray-700">
                <div 
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: buildSvg() }}
                />
            </div>
        </div>

        <div className="h-16 border-t border-gray-800 bg-gray-900 flex items-center justify-center space-x-4">
             <button 
                onClick={regenerateTerrain}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
             >
                <RefreshCw size={16} />
                <span>Regenerate Terrain Shape</span>
             </button>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full md:w-1/3 h-1/2 md:h-full bg-gray-800 flex flex-col border-l border-gray-700">
        <div className="p-5 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-blue-400">Landscape Config</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin space-y-6">
            
            {/* Palette Selection */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase">
                    <Sun size={14} /> Atmosphere / Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {LANDSCAPE_PALETTES.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setSelectedPaletteId(p.id)}
                            className={`px-3 py-2 rounded text-xs font-medium text-left border transition-all ${
                                selectedPaletteId === p.id 
                                ? 'bg-blue-600 border-blue-500 text-white' 
                                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-gray-700" />

            {/* Terrain Controls */}
            <div className="space-y-4">
                 <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase">
                    <Mountain size={14} /> Terrain
                </label>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Roughness</span>
                        <span>{(mtnJaggedness * 100).toFixed(0)}%</span>
                    </div>
                    <input 
                        type="range" min="0.1" max="1.5" step="0.1" 
                        value={mtnJaggedness}
                        onChange={(e) => setMtnJaggedness(Number(e.target.value))}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Water Level</span>
                        <span>{waterLevel > 0 ? 'Yes' : 'None'}</span>
                    </div>
                    <input 
                        type="range" min="0" max="60" step="10" 
                        value={waterLevel}
                        onChange={(e) => setWaterLevel(Number(e.target.value))}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>
            </div>

            <hr className="border-gray-700" />

            {/* Sky Details */}
            <div className="space-y-2">
                 <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase">
                    <Cloud size={14} /> Sky Elements
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {SKY_ASSETS.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setSkyAssetId(s.id)}
                            className={`px-3 py-2 rounded text-xs font-medium text-left border transition-all ${
                                skyAssetId === s.id 
                                ? 'bg-blue-600 border-blue-500 text-white' 
                                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sun Position */}
            <div className="space-y-2">
                 <label className="text-xs text-gray-500 font-bold uppercase">Celestial Position</label>
                 <div className="flex gap-2">
                    <input 
                        type="range" min="0" max="400" 
                        value={sunPos.x}
                        onChange={(e) => setSunPos(prev => ({...prev, x: Number(e.target.value)}))}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        title="Horizontal"
                    />
                     <input 
                        type="range" min="0" max="150" 
                        value={sunPos.y}
                        onChange={(e) => setSunPos(prev => ({...prev, y: Number(e.target.value)}))}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                        title="Vertical"
                    />
                 </div>
            </div>

        </div>

        <div className="p-6 border-t border-gray-700 bg-gray-800">
            <button 
                onClick={handleSendToEditor}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all transform hover:translate-y-[-1px]"
            >
                <span>Export to Editor</span>
                <ArrowRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default LandscapeConstructor;