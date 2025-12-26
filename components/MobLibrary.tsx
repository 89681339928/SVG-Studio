import React, { useState, useMemo } from 'react';
import { generateMobLibrary, MobCategory, MobDef } from '../mobAssets';
import { Search, Filter, Ghost, ArrowRight, Download } from 'lucide-react';
import { formatXml } from '../utils/formatUtils';

interface MobLibraryProps {
  onGenerate: (svgCode: string) => void;
}

const MobLibrary: React.FC<MobLibraryProps> = ({ onGenerate }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MobCategory | 'All'>('All');
  const [selectedMob, setSelectedMob] = useState<MobDef | null>(null);

  const allMobs = useMemo(() => generateMobLibrary(), []);

  const filteredMobs = allMobs.filter(mob => {
    const matchesSearch = mob.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || mob.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories: MobCategory[] = ['Beasts', 'Undead', 'Humanoids', 'Monsters', 'Insects', 'Bosses', 'Critters'];

  const handleSelect = (mob: MobDef) => {
    setSelectedMob(mob);
  };

  const generateSvg = (mob: MobDef, size: number = 200) => {
    return `<svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- ${mob.name} (${mob.category}) -->
  <filter id="mobShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="0" dy="4" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/> 
      </feMerge>
  </filter>
  <g filter="url(#mobShadow)">
      ${mob.svg}
  </g>
</svg>`;
  };

  const handleExport = () => {
    if (selectedMob) {
      onGenerate(formatXml(generateSvg(selectedMob)));
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-950 text-white overflow-hidden">
      {/* Left: Library Grid */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-gray-800">
        
        {/* Header / Search */}
        <div className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md flex flex-col sm:flex-row gap-4 items-center justify-between z-10">
           <div className="flex items-center gap-2 text-violet-400 font-bold">
              <Ghost size={24} />
              <span>Bestiary</span>
              <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700">{allMobs.length}</span>
           </div>

           <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search mobs..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:border-violet-500 focus:outline-none placeholder-gray-500"
              />
           </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-3 bg-gray-900 border-b border-gray-800 flex gap-2 overflow-x-auto scrollbar-hide">
            <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === 'All' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
                All
            </button>
            {categories.map(cat => (
                 <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-950 scrollbar-thin">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMobs.map(mob => (
                    <div 
                        key={mob.id}
                        onClick={() => handleSelect(mob)}
                        className={`group relative aspect-square bg-gray-900 rounded-xl border-2 transition-all cursor-pointer overflow-hidden ${selectedMob?.id === mob.id ? 'border-violet-500 bg-gray-800 shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'border-gray-800 hover:border-gray-600 hover:bg-gray-800'}`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div 
                                className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                                dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 200 200">${mob.svg}</svg>` }} 
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-gray-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs text-center font-bold text-gray-200 truncate">{mob.name}</p>
                        </div>
                        {selectedMob?.id === mob.id && (
                             <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-500 shadow-sm" />
                        )}
                    </div>
                ))}
            </div>
            {filteredMobs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <Ghost size={48} className="mb-4 opacity-20" />
                    <p>No mobs found matching your criteria.</p>
                </div>
            )}
        </div>
      </div>

      {/* Right: Sidebar / Details */}
      {selectedMob ? (
          <div className="w-full md:w-80 bg-gray-900 border-l border-gray-800 flex flex-col animate-in slide-in-from-right duration-300">
             <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white mb-1">{selectedMob.name}</h2>
                <span className="text-xs font-bold text-violet-400 bg-violet-900/30 px-2 py-0.5 rounded border border-violet-800 uppercase">
                    {selectedMob.category}
                </span>
             </div>

             <div className="p-6 flex-1 overflow-y-auto">
                <div className="w-full aspect-square bg-checkerboard rounded-xl border-2 border-gray-700 flex items-center justify-center p-4 mb-6 relative overflow-hidden">
                    <div 
                        className="w-full h-full filter drop-shadow-xl"
                        dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 200 200">${selectedMob.svg}</svg>` }}
                    />
                     {/* Scale reference */}
                     <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 font-mono">200x200px</div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Technical Info</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                            <span className="text-gray-500">Nodes:</span>
                            <span>{selectedMob.svg.split('<').length - 1}</span>
                            <span className="text-gray-500">Type:</span>
                            <span>SVG Vector</span>
                        </div>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                        Top-down perspective ready for 2D RPGs, RTS, or Roguelike games. Optimized for performance.
                    </p>
                </div>
             </div>

             <div className="p-6 border-t border-gray-800 bg-gray-800/50">
                <button 
                    onClick={handleExport}
                    className="w-full flex items-center justify-center space-x-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-3 rounded-lg font-bold shadow-lg shadow-violet-900/20 transition-all transform hover:translate-y-[-1px]"
                >
                    <span>Export to Editor</span>
                    <ArrowRight size={18} />
                </button>
             </div>
          </div>
      ) : (
          <div className="hidden md:flex w-80 bg-gray-900 border-l border-gray-800 items-center justify-center text-center p-8 text-gray-600">
              <div>
                  <Ghost size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-medium">Select a mob to view details</p>
              </div>
          </div>
      )}
    </div>
  );
};

export default MobLibrary;