import React, { useState, useEffect } from 'react';
import { ArrowRight, RotateCw, Map as MapIcon, Grip } from 'lucide-react';
import { BIOMES, ROAD_SHAPES, ROAD_SURFACES, WATER_SHAPES, generateNoise, TerrainBiome, TerrainFeature, RoadSurface } from '../terrainAssets';
import { formatXml } from '../utils/formatUtils';

interface TerrainConstructorProps {
  onGenerate: (svgCode: string) => void;
}

const TerrainConstructor: React.FC<TerrainConstructorProps> = ({ onGenerate }) => {
  // Config State
  const [biomeId, setBiomeId] = useState('grass');
  const [featureMode, setFeatureMode] = useState<'none' | 'road' | 'water'>('none');
  const [featureId, setFeatureId] = useState('none');
  const [roadSurfaceId, setRoadSurfaceId] = useState('dirt');
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [detailLevel, setDetailLevel] = useState(50);

  const [previewSvg, setPreviewSvg] = useState('');

  const biome = BIOMES.find(b => b.id === biomeId) || BIOMES[0];
  const roadSurface = ROAD_SURFACES.find(r => r.id === roadSurfaceId) || ROAD_SURFACES[0];
  
  // Logic to determine which feature list to show
  const currentFeatureList = featureMode === 'road' ? ROAD_SHAPES : (featureMode === 'water' ? WATER_SHAPES : []);

  useEffect(() => {
    // Reset feature ID if mode changes
    if (featureMode === 'none') setFeatureId('none');
    else {
        const list = featureMode === 'road' ? ROAD_SHAPES : WATER_SHAPES;
        if (!list.find(f => f.id === featureId)) {
            setFeatureId(list[1].id); // Default to first real option
        }
    }
  }, [featureMode]);

  useEffect(() => {
    setPreviewSvg(buildSvg());
  }, [biomeId, featureMode, featureId, roadSurfaceId, rotation, detailLevel]);

  const buildSvg = () => {
    const feature = currentFeatureList.find(f => f.id === featureId);
    
    // Texture Generation
    let textureSvg = '';
    if (biome.texture === 'noise') {
        textureSvg = `<g fill="${biome.colors.detail}">${generateNoise(123, detailLevel, 200, 200)}</g>`;
    } else if (biome.texture === 'dots') {
        textureSvg = `<pattern id="dots-${biome.id}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="${biome.colors.detail}" opacity="0.3"/>
            <circle cx="12" cy="12" r="2" fill="${biome.colors.detail}" opacity="0.3"/>
        </pattern>
        <rect width="200" height="200" fill="url(#dots-${biome.id})" />`;
    } else if (biome.texture === 'lines') {
        textureSvg = `<pattern id="lines-${biome.id}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="${biome.colors.detail}" stroke-width="2" opacity="0.2"/>
        </pattern>
        <rect width="200" height="200" fill="url(#lines-${biome.id})" />`;
    }

    // Feature Drawing
    let featureSvg = '';
    if (feature && feature.type !== 'none') {
        if (feature.type === 'road') {
            const surfaceTexture = roadSurface.texture ? `<defs>${roadSurface.texture}</defs><rect width="200" height="200" fill="url(#p_${roadSurface.id})" />${roadSurface.id === 'asphalt_line' ? roadSurface.texture : ''}` : '';
            
            // Clean road rendering without stripes
            featureSvg = `
            <g transform="rotate(${rotation} 100 100)">
                <defs>
                    <clipPath id="roadClip">
                        ${feature.svg}
                    </clipPath>
                    ${roadSurface.texture ? roadSurface.texture : ''}
                </defs>
                
                <!-- Road Outline/Border -->
                ${roadSurface.lineWidth > 0 ? `
                <g stroke="${roadSurface.strokeColor}" stroke-width="${roadSurface.lineWidth + 4}" fill="none">
                   ${feature.svg}
                </g>` : ''}
                
                <!-- Road Surface (Base Color) -->
                <g fill="${roadSurface.mainColor}">
                   ${feature.svg}
                </g>

                <!-- Road Texture / Patterns (Clipped to Shape) -->
                <g clip-path="url(#roadClip)">
                    ${roadSurface.texture ? `<rect width="200" height="200" fill="url(#p_${roadSurface.id})" opacity="0.5"/>` : ''}
                    ${roadSurface.id === 'asphalt_line' ? '<path d="M100,0 L100,200 M0,100 L200,100" stroke="#fbbf24" stroke-width="2" stroke-dasharray="20 10" />' : ''}
                </g>
            </g>`;
        } else if (feature.type === 'water') {
            featureSvg = `
            <g transform="rotate(${rotation} 100 100)">
                <defs>
                   <pattern id="waterWave" width="20" height="10" patternUnits="userSpaceOnUse">
                      <path d="M0,5 Q5,0 10,5 T20,5" fill="none" stroke="#60a5fa" opacity="0.5" />
                   </pattern>
                </defs>
                <!-- Water Area -->
                <g fill="#2563eb">
                   ${feature.svg}
                </g>
                <!-- Water Highlight -->
                <g fill="url(#waterWave)">
                   ${feature.svg}
                </g>
                <!-- Coastline Foam -->
                <g stroke="#bfdbfe" stroke-width="6" fill="none" opacity="0.5">
                   ${feature.svg}
                </g>
            </g>`;
        }
    }

    return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Top-Down Terrain Tile -->
  
  <!-- Base Biome -->
  <rect width="200" height="200" fill="${biome.colors.base}" />
  
  <!-- Biome Texture -->
  ${textureSvg}
  
  <!-- Feature Layer -->
  ${featureSvg}
</svg>`;
  };

  const handleSendToEditor = () => {
    onGenerate(formatXml(previewSvg));
  };

  const rotate = () => {
      setRotation(prev => (prev + 90) % 360);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Left: Preview */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-8 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800 relative">
        <div className="absolute top-4 left-4 z-10">
             <div className="bg-amber-900/50 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-amber-200 border border-amber-700">
                Terrain Tile Generator
             </div>
        </div>

        <div className="relative group">
            <div className="w-[300px] h-[300px] bg-checkerboard rounded-xl shadow-2xl overflow-hidden border-4 border-gray-700 relative">
                <div 
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: previewSvg }} 
                />
            </div>
             <div className="absolute -bottom-14 w-full flex justify-center">
                 <button 
                    onClick={rotate}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-all shadow-lg text-sm font-bold border border-gray-600"
                 >
                    <RotateCw size={18} className="text-amber-400" />
                    <span>Rotate Feature</span>
                 </button>
            </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-800 flex flex-col border-l border-gray-700">
         <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-800 z-10 shadow-sm">
            <h2 className="text-lg font-bold text-amber-400">Tile Configuration</h2>
         </div>

         <div className="flex-1 overflow-y-auto p-6 scrollbar-thin space-y-6">
            
            {/* Biome Selector */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Base Biome</label>
                <div className="grid grid-cols-3 gap-2">
                    {BIOMES.map(b => (
                        <button
                            key={b.id}
                            onClick={() => setBiomeId(b.id)}
                            className={`p-2 rounded text-xs font-medium border transition-all ${
                                biomeId === b.id 
                                ? 'bg-amber-700 border-amber-500 text-white' 
                                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {b.name}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-gray-700" />

            {/* Feature Mode */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Feature Layer</label>
                <div className="flex rounded-lg bg-gray-900 p-1 border border-gray-700">
                     <button 
                        onClick={() => setFeatureMode('none')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded ${featureMode === 'none' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                     >None</button>
                     <button 
                        onClick={() => setFeatureMode('road')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded ${featureMode === 'road' ? 'bg-amber-700 text-white' : 'text-gray-400 hover:text-white'}`}
                     >Roads</button>
                     <button 
                        onClick={() => setFeatureMode('water')}
                        className={`flex-1 py-1.5 text-xs font-medium rounded ${featureMode === 'water' ? 'bg-blue-700 text-white' : 'text-gray-400 hover:text-white'}`}
                     >Water/Coast</button>
                </div>
            </div>

            {/* Road Surface Selection */}
            {featureMode === 'road' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Paving Style</label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto scrollbar-thin">
                        {ROAD_SURFACES.map(s => (
                            <button
                                key={s.id}
                                onClick={() => setRoadSurfaceId(s.id)}
                                className={`p-2 rounded text-xs font-medium border text-left transition-all ${
                                    roadSurfaceId === s.id 
                                    ? 'bg-amber-800 border-amber-500 text-white' 
                                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Feature Shape Selection */}
            {featureMode !== 'none' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Shape</label>
                    <div className="grid grid-cols-2 gap-2">
                        {currentFeatureList.filter(f => f.type !== 'none').map(f => (
                            <button
                                key={f.id}
                                onClick={() => setFeatureId(f.id)}
                                className={`flex items-center gap-2 p-2 rounded text-xs font-medium border text-left transition-all ${
                                    featureId === f.id 
                                    ? 'bg-gray-600 border-white text-white' 
                                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                <Grip size={14} opacity={0.5} />
                                {f.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <hr className="border-gray-700" />

            {/* Detail Density */}
            <div>
                 <div className="flex justify-between text-xs mb-1 text-gray-400 font-bold uppercase">
                    <span>Texture Density</span>
                    <span>{detailLevel}</span>
                </div>
                <input 
                    type="range" min="0" max="200" 
                    value={detailLevel}
                    onChange={(e) => setDetailLevel(Number(e.target.value))}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
            </div>

         </div>

         <div className="p-6 border-t border-gray-700 bg-gray-800">
            <button 
                onClick={handleSendToEditor}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-amber-900/20 transition-all transform hover:translate-y-[-1px]"
            >
                <span>Export to Editor</span>
                <ArrowRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default TerrainConstructor;