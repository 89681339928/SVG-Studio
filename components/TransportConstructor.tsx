import React, { useState, useEffect } from 'react';
import { ArrowRight, Dice5, ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { VEHICLES, Vehicle, TransportCategory } from '../transportAssets';
import { formatXml } from '../utils/formatUtils';

interface TransportConstructorProps {
  onGenerate: (svgCode: string) => void;
}

const TransportConstructor: React.FC<TransportConstructorProps> = ({ onGenerate }) => {
  const [selectedCategory, setSelectedCategory] = useState<TransportCategory>('Civilian');
  const [vehicleIndex, setVehicleIndex] = useState(0);
  
  const [colors, setColors] = useState({
    body: '#3b82f6',
    glass: '#93c5fd',
    detail: '#facc15',
    tire: '#1f2937'
  });

  const [previewSvg, setPreviewSvg] = useState('');

  const filteredVehicles = VEHICLES.filter(v => v.category === selectedCategory);
  
  // Ensure index is valid when category changes
  useEffect(() => {
    if (vehicleIndex >= filteredVehicles.length) {
      setVehicleIndex(0);
    }
  }, [selectedCategory, filteredVehicles.length]);

  const currentVehicle = filteredVehicles[vehicleIndex] || filteredVehicles[0];

  useEffect(() => {
    if (currentVehicle) {
      setPreviewSvg(buildSvg());
    }
  }, [currentVehicle, colors]);

  const buildSvg = () => {
    if (!currentVehicle) return '';
    
    // Replace placeholders with selected colors
    const coloredSvg = currentVehicle.svg
        .replace(/#BODY/g, colors.body)
        .replace(/#GLASS/g, colors.glass)
        .replace(/#DETAIL/g, colors.detail)
        .replace(/#TIRE/g, colors.tire)
        .replace(/#DARK_COLOR/g, adjustColor(colors.body, -40))
        .replace(/#LIGHT_COLOR/g, adjustColor(colors.body, 40));

    return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Top-Down Vehicle: ${currentVehicle.name} -->
  <defs>
    <filter id="vehShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
      <feOffset dx="2" dy="2" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/> 
      </feMerge>
    </filter>
  </defs>
  
  <g filter="url(#vehShadow)">
    ${coloredSvg}
  </g>
</svg>`;
  };

  // Helper to darken/lighten hex color
  const adjustColor = (hex: string, percent: number) => {
    // Simple mock implementation or use a library. 
    // For now returning generic colors if function not fully implemented
    return hex; 
  };

  const handleRandomize = () => {
    const cats: TransportCategory[] = ['Civilian', 'Emergency', 'Industrial', 'Military', 'Sci-Fi', 'Water', 'Air', 'Misc'];
    const randomCat = cats[Math.floor(Math.random() * cats.length)];
    setSelectedCategory(randomCat);
    
    const catVehicles = VEHICLES.filter(v => v.category === randomCat);
    setVehicleIndex(Math.floor(Math.random() * catVehicles.length));

    // Random colors
    const randomHex = () => '#' + Math.floor(Math.random()*16777215).toString(16);
    setColors({
        body: randomHex(),
        glass: '#93c5fd', // Keep glass mostly blueish
        detail: randomHex(),
        tire: '#1f2937'
    });
  };

  const handleSendToEditor = () => {
    onGenerate(formatXml(previewSvg));
  };

  const categories: TransportCategory[] = ['Civilian', 'Emergency', 'Industrial', 'Military', 'Sci-Fi', 'Water', 'Air', 'Misc'];

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Left: Preview Area */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-8 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800 relative">
        <div className="absolute top-4 left-4 z-10">
             <div className="bg-indigo-900/50 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-indigo-200 border border-indigo-700">
                Vehicle Transport
             </div>
        </div>

        <div className="relative group">
            <div className="w-[300px] h-[300px] bg-checkerboard rounded-xl shadow-2xl overflow-hidden border-4 border-gray-700 relative">
                <div 
                    className="w-full h-full transform transition-transform duration-300 hover:scale-105"
                    dangerouslySetInnerHTML={{ __html: previewSvg }} 
                />
            </div>
            <div className="absolute -bottom-14 w-full flex justify-center">
                 <button 
                    onClick={handleRandomize}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-all shadow-lg text-sm font-bold border border-gray-600"
                 >
                    <Dice5 size={18} className="text-indigo-400" />
                    <span>Randomize</span>
                 </button>
            </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-800 flex flex-col border-l border-gray-700">
         <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-800 z-10 shadow-sm">
            <h2 className="text-lg font-bold text-indigo-400">Transport Config</h2>
         </div>

         <div className="flex-1 overflow-y-auto p-6 scrollbar-thin space-y-6">
            
            {/* Category Selector */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Class</label>
                <div className="flex flex-wrap gap-2">
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setSelectedCategory(c)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                                selectedCategory === c 
                                ? 'bg-indigo-600 border-indigo-500 text-white' 
                                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-gray-700" />

            {/* Vehicle Selector */}
            <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-400 uppercase">Model</label>
                    <span className="text-xs text-gray-500">{vehicleIndex + 1} / {filteredVehicles.length}</span>
                 </div>
                 
                 <div className="flex items-center justify-between bg-gray-900 rounded-lg p-2 border border-gray-700">
                    <button 
                        onClick={() => setVehicleIndex(prev => (prev - 1 + filteredVehicles.length) % filteredVehicles.length)}
                        className="p-2 hover:bg-gray-800 rounded-md text-gray-400"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="font-bold text-sm">{currentVehicle?.name || 'No Vehicle'}</span>
                    <button 
                        onClick={() => setVehicleIndex(prev => (prev + 1) % filteredVehicles.length)}
                        className="p-2 hover:bg-gray-800 rounded-md text-gray-400"
                    >
                        <ChevronRight size={20} />
                    </button>
                 </div>
            </div>

            <hr className="border-gray-700" />

            {/* Color Config */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                    <Palette size={14} /> Paint Job
                </label>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Body Color</label>
                        <div className="flex items-center space-x-2">
                            <input 
                                type="color" 
                                value={colors.body}
                                onChange={(e) => setColors({...colors, body: e.target.value})}
                                className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                            />
                            <span className="text-xs font-mono">{colors.body}</span>
                        </div>
                    </div>
                     <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Detail / Lights</label>
                        <div className="flex items-center space-x-2">
                            <input 
                                type="color" 
                                value={colors.detail}
                                onChange={(e) => setColors({...colors, detail: e.target.value})}
                                className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                            />
                            <span className="text-xs font-mono">{colors.detail}</span>
                        </div>
                    </div>
                     <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Glass / Windows</label>
                        <div className="flex items-center space-x-2">
                            <input 
                                type="color" 
                                value={colors.glass}
                                onChange={(e) => setColors({...colors, glass: e.target.value})}
                                className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                            />
                            <span className="text-xs font-mono">{colors.glass}</span>
                        </div>
                    </div>
                     <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Tires / Tracks</label>
                        <div className="flex items-center space-x-2">
                            <input 
                                type="color" 
                                value={colors.tire}
                                onChange={(e) => setColors({...colors, tire: e.target.value})}
                                className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                            />
                            <span className="text-xs font-mono">{colors.tire}</span>
                        </div>
                    </div>
                </div>
            </div>

         </div>

         <div className="p-6 border-t border-gray-700 bg-gray-800">
            <button 
                onClick={handleSendToEditor}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all transform hover:translate-y-[-1px]"
            >
                <span>Export to Editor</span>
                <ArrowRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default TransportConstructor;