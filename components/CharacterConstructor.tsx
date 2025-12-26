import React, { useState, useEffect } from 'react';
import { ArrowRight, Dice5, ChevronLeft, ChevronRight, Plus, Save, Trash2, Activity } from 'lucide-react';
import { INITIAL_ASSETS, getRandomIndex, CategoryKey, CharacterPart } from '../characterAssets';
import { formatXml } from '../utils/formatUtils';

interface CharacterConstructorProps {
  onGenerate: (svgCode: string) => void;
}

type AnimationType = 'none' | 'idle' | 'walk' | 'attack' | 'float';

const CharacterConstructor: React.FC<CharacterConstructorProps> = ({ onGenerate }) => {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  
  const [config, setConfig] = useState<Record<CategoryKey, number>>({
    floor: 0,
    feet: 0,
    armor: 0,
    helmet: 0,
    weaponRight: 0,
    weaponLeft: 0,
  });

  const [animationType, setAnimationType] = useState<AnimationType>('none');
  const [previewSvg, setPreviewSvg] = useState('');
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  
  const [newAssetCategory, setNewAssetCategory] = useState<CategoryKey>('helmet');
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetSvg, setNewAssetSvg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('svgStudio_customAssets');
    if (saved) {
      try {
        const customParts = JSON.parse(saved);
        setAssets(prev => {
          const merged = { ...prev };
          Object.keys(customParts).forEach(key => {
            const k = key as CategoryKey;
            if (merged[k]) {
              merged[k] = [...merged[k], ...customParts[k]];
            }
          });
          return merged;
        });
      } catch (e) {
        console.error("Failed to load custom assets", e);
      }
    }
  }, []);

  useEffect(() => {
    setPreviewSvg(buildSvg());
  }, [config, assets, animationType]);

  const getAnimationCss = (type: AnimationType) => {
      if (type === 'none') return '';
      
      let css = `<style>
        .char-body { transform-origin: 100px 100px; }
        .char-weapon-r { transform-origin: 150px 100px; }
        .char-weapon-l { transform-origin: 50px 100px; }
        .char-feet { transform-origin: 100px 110px; }
      `;

      if (type === 'idle') {
          css += `
            .char-body { animation: breathe 3s ease-in-out infinite; }
            .char-weapon-r { animation: floatR 3s ease-in-out infinite; animation-delay: 0.5s; }
            .char-weapon-l { animation: floatL 3s ease-in-out infinite; animation-delay: 1s; }
            @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
            @keyframes floatR { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
            @keyframes floatL { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
          `;
      } else if (type === 'walk') {
          css += `
            #character { animation: bob 0.6s infinite; }
            .char-feet { animation: step 0.6s infinite; }
            .char-weapon-r { animation: swing 0.6s infinite; }
            .char-weapon-l { animation: swing 0.6s infinite reverse; }
            @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
            @keyframes step { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.9); } }
            @keyframes swing { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
          `;
      } else if (type === 'attack') {
          css += `
            .char-body { animation: lunge 1s ease-in-out infinite; }
            .char-weapon-r { animation: thrust 1s ease-in-out infinite; }
            @keyframes lunge { 0%, 100% { transform: translateY(0); } 20% { transform: translateY(5px); } 40% { transform: translateY(-10px); } }
            @keyframes thrust { 0%, 100% { transform: rotate(0) translateY(0); } 20% { transform: rotate(-20deg); } 40% { transform: rotate(10deg) translateY(-20px); } }
          `;
      } else if (type === 'float') {
          css += `
            #character { animation: levitate 4s ease-in-out infinite; }
            .char-weapon-r, .char-weapon-l { animation: spinItems 4s ease-in-out infinite; }
            @keyframes levitate { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            @keyframes spinItems { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px) rotate(5deg); } }
          `;
      }

      css += `</style>`;
      return css;
  };

  const buildSvg = () => {
    const getPart = (key: CategoryKey) => assets[key][config[key]] || assets[key][0];

    const floor = getPart('floor');
    const feet = getPart('feet');
    const armor = getPart('armor');
    const helm = getPart('helmet');
    const wR = getPart('weaponRight');
    const wL = getPart('weaponLeft');

    // Updated ViewBox to -50 -50 300 300 to provide 50px padding on all sides
    // Center point is still 100, 100
    return `<svg width="200" height="200" viewBox="-50 -50 300 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Top-Down Character Generated by SVG Studio Pro -->
  ${getAnimationCss(animationType)}
  <defs>
    <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
      <feOffset dx="0" dy="8" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge> 
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/> 
      </feMerge>
    </filter>
  </defs>

  <g id="floor">${floor.svg}</g>
  
  <g id="character" filter="url(#dropShadow)">
    <g id="feet" class="char-feet">${feet.svg}</g>
    <g id="weapon-left" class="char-weapon-l">${wL.svg}</g>
    <g id="armor" class="char-body">${armor.svg}</g>
    <g id="weapon-right" class="char-weapon-r">${wR.svg}</g>
    <g id="helmet" class="char-body">${helm.svg}</g>
  </g>
</svg>`;
  };

  const handleRandomize = () => {
    setConfig({
      floor: getRandomIndex(assets.floor.length),
      feet: getRandomIndex(assets.feet.length),
      armor: getRandomIndex(assets.armor.length),
      helmet: getRandomIndex(assets.helmet.length),
      weaponRight: getRandomIndex(assets.weaponRight.length),
      weaponLeft: getRandomIndex(assets.weaponLeft.length),
    });
  };

  const handleSendToEditor = () => {
    onGenerate(formatXml(previewSvg));
  };

  const changePart = (category: CategoryKey, direction: -1 | 1) => {
    setConfig(prev => {
      const max = assets[category].length;
      let next = prev[category] + direction;
      if (next < 0) next = max - 1;
      if (next >= max) next = 0;
      return { ...prev, [category]: next };
    });
  };

  const handleAddAsset = () => {
    if (!newAssetName || !newAssetSvg) return;

    const newPart: CharacterPart = {
      id: `custom_${Date.now()}`,
      name: newAssetName,
      svg: newAssetSvg,
      category: newAssetCategory
    };

    setAssets(prev => ({
      ...prev,
      [newAssetCategory]: [...prev[newAssetCategory], newPart]
    }));

    const existing = localStorage.getItem('svgStudio_customAssets');
    const storageObj = existing ? JSON.parse(existing) : {};
    if (!storageObj[newAssetCategory]) storageObj[newAssetCategory] = [];
    storageObj[newAssetCategory].push(newPart);
    localStorage.setItem('svgStudio_customAssets', JSON.stringify(storageObj));

    setNewAssetName('');
    setNewAssetSvg('');
    setConfig(prev => ({
      ...prev,
      [newAssetCategory]: assets[newAssetCategory].length
    }));
    
    alert(`Added ${newAssetName}!`);
  };

  const handleClearCustomAssets = () => {
    if(confirm("Delete all custom assets? This cannot be undone.")) {
      localStorage.removeItem('svgStudio_customAssets');
      setAssets(INITIAL_ASSETS);
      setConfig({ floor:0, feet:0, armor:0, helmet:0, weaponRight:0, weaponLeft:0 });
    }
  };

  const categories: { key: CategoryKey; label: string }[] = [
    { key: 'helmet', label: 'Helmet / Head' },
    { key: 'armor', label: 'Armor / Body' },
    { key: 'weaponRight', label: 'Right Hand' },
    { key: 'weaponLeft', label: 'Left Hand' },
    { key: 'feet', label: 'Feet' },
    { key: 'floor', label: 'Floor' },
  ];

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Left: Preview Area */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-8 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800 relative">
        <div className="absolute top-4 left-4 z-10">
             <div className="bg-gray-800/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-400 border border-gray-700 shadow-sm">
                Top-Down Perspective
             </div>
        </div>

        <div className="relative group">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-checkerboard rounded-xl shadow-2xl overflow-hidden border-4 border-gray-700 relative">
                <div 
                    className="w-full h-full transform transition-transform duration-300 hover:scale-105"
                    dangerouslySetInnerHTML={{ __html: previewSvg }} 
                />
                
                {/* Center Crosshair for Alignment Reference */}
                <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                    <div className="w-full h-px bg-red-500 absolute"></div>
                    <div className="h-full w-px bg-red-500 absolute"></div>
                </div>
            </div>
            
            <div className="absolute -bottom-14 w-full flex justify-center">
                 <button 
                    onClick={handleRandomize}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-all shadow-lg hover:shadow-xl text-sm font-bold border border-gray-600"
                 >
                    <Dice5 size={18} className="text-violet-400" />
                    <span>Randomize</span>
                 </button>
            </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-800 flex flex-col border-l border-gray-700">
         {/* Header */}
         <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-800 z-10 shadow-sm">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Character Config
            </h2>
            <button 
                onClick={() => setIsCreatorMode(!isCreatorMode)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isCreatorMode ? 'bg-violet-600 border-violet-500 text-white' : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white'}`}
            >
                <Plus size={14} />
                <span>Custom Part</span>
            </button>
         </div>

         <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            
            {/* Animation Selector */}
            <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-2">
               <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase mb-2">
                 <Activity size={14} /> Animation
               </label>
               <div className="flex gap-2 bg-gray-900 p-1 rounded-lg">
                  {(['none', 'idle', 'walk', 'attack', 'float'] as AnimationType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => setAnimationType(type)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded capitalize transition-colors ${animationType === type ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      >
                        {type}
                      </button>
                  ))}
               </div>
            </div>

            {/* Creator Mode */}
            {isCreatorMode && (
                <div className="mb-6 bg-gray-900/50 border border-violet-500/30 rounded-xl p-5">
                    <h3 className="font-bold text-violet-400 mb-4 text-sm uppercase tracking-wide">New Asset</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Category</label>
                              <select 
                                  value={newAssetCategory}
                                  onChange={(e) => setNewAssetCategory(e.target.value as CategoryKey)}
                                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-violet-500 outline-none"
                              >
                                  {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                              </select>
                          </div>
                          <div>
                              <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Name</label>
                              <input 
                                  type="text"
                                  value={newAssetName}
                                  onChange={(e) => setNewAssetName(e.target.value)}
                                  placeholder="Item Name"
                                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-violet-500 outline-none"
                              />
                          </div>
                        </div>
                        <div>
                            <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">SVG Path / Group</label>
                            <textarea 
                                value={newAssetSvg}
                                onChange={(e) => setNewAssetSvg(e.target.value)}
                                placeholder="<path d='...' fill='red' />"
                                className="w-full h-20 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-xs font-mono focus:border-violet-500 outline-none resize-none"
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button 
                                onClick={handleAddAsset}
                                disabled={!newAssetName || !newAssetSvg}
                                className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Save size={16} /> Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Asset List */}
            <div className="space-y-3">
                {categories.map((cat) => (
                    <div key={cat.key} className="bg-gray-900/40 p-1 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors">
                        <div className="flex items-center">
                            <div className="flex flex-col justify-center items-center w-12 h-14 border-r border-gray-700/50 text-gray-500">
                                <span className="text-[10px] font-bold uppercase rotate-180 writing-vertical-lr">{config[cat.key] + 1}/{assets[cat.key].length}</span>
                            </div>
                            
                            <div className="flex-1 px-4 py-2">
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{cat.label}</div>
                                <div className="text-sm font-medium text-white truncate max-w-[150px] sm:max-w-xs">
                                    {assets[cat.key][config[cat.key]]?.name || 'Empty'}
                                </div>
                            </div>

                            <div className="flex space-x-1 pr-2">
                                <button 
                                    onClick={() => changePart(cat.key, -1)}
                                    className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button 
                                    onClick={() => changePart(cat.key, 1)}
                                    className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         <div className="p-6 border-t border-gray-700 bg-gray-800">
            <button 
                    onClick={handleSendToEditor}
                    className="w-full flex items-center justify-center space-x-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-violet-900/20 transition-all transform hover:translate-y-[-1px]"
                >
                    <span>Export to Editor</span>
                    <ArrowRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default CharacterConstructor;