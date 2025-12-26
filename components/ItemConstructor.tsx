import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, Beaker, Key, Scroll, Gem, Coins, Box } from 'lucide-react';
import { formatXml } from '../utils/formatUtils';

interface ItemConstructorProps {
  onGenerate: (svgCode: string) => void;
}

type ItemType = 'potion' | 'gem' | 'key' | 'scroll' | 'coin';

const ItemConstructor: React.FC<ItemConstructorProps> = ({ onGenerate }) => {
  const [itemType, setItemType] = useState<ItemType>('potion');
  const [color1, setColor1] = useState('#ef4444'); // Primary
  const [color2, setColor2] = useState('#f87171'); // Secondary/Detail
  const [shape, setShape] = useState(0); // Variation index
  const [complexity, setComplexity] = useState(5); // Level of liquid, teeth of key, etc.
  
  const [previewSvg, setPreviewSvg] = useState('');

  useEffect(() => {
    setPreviewSvg(generateItem());
  }, [itemType, color1, color2, shape, complexity]);

  const generateItem = () => {
    let svgContent = '';
    const center = 100;

    // Filters for shiny look
    const shineFilter = `<filter id="shine"><feGaussianBlur stdDeviation="1.5" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="atop"/></filter>`;
    const glowFilter = `<filter id="glowItem"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
    
    svgContent += `<defs>${shineFilter}${glowFilter}</defs>`;

    if (itemType === 'potion') {
        // Shapes: 0=Round Flask, 1=Vial, 2=Square
        const liquidLevel = 160 - (complexity * 10); // Higher complexity = more liquid
        
        if (shape === 0) {
            // Round Flask
            const bottlePath = `M70,40 L70,70 Q50,80 50,110 Q50,150 100,150 Q150,150 150,110 Q150,80 130,70 L130,40 Z`;
            
            // Mask for liquid
            svgContent += `<clipPath id="bottleMask"><path d="${bottlePath}" /></clipPath>`;
            
            // Bottle Back
            svgContent += `<path d="${bottlePath}" fill="#e5e7eb" fill-opacity="0.3" stroke="#9ca3af" stroke-width="2" />`;
            
            // Liquid
            svgContent += `<rect x="0" y="${liquidLevel}" width="200" height="200" fill="${color1}" clip-path="url(#bottleMask)" opacity="0.8">
                 <animate attributeName="y" values="${liquidLevel};${liquidLevel+2};${liquidLevel}" dur="2s" repeatCount="indefinite" />
            </rect>`;
            
            // Surface line
            svgContent += `<path d="M50,${liquidLevel} L150,${liquidLevel}" stroke="${color2}" stroke-width="2" clip-path="url(#bottleMask)" opacity="0.6"/>`;
            
            // Bottle Outline (Front)
            svgContent += `<path d="${bottlePath}" fill="url(#glassGrad)" fill-opacity="0.2" stroke="#374151" stroke-width="3" />`;
            // Cork
            svgContent += `<rect x="65" y="30" width="70" height="15" fill="#78350f" rx="2" />`;

        } else if (shape === 1) {
            // Tube Vial
            const bottlePath = `M80,30 L80,160 Q80,170 100,170 Q120,170 120,160 L120,30 Z`;
            svgContent += `<clipPath id="vialMask"><path d="${bottlePath}" /></clipPath>`;
            svgContent += `<path d="${bottlePath}" fill="#e5e7eb" fill-opacity="0.3" stroke="#9ca3af" stroke-width="2" />`;
            svgContent += `<rect x="0" y="${liquidLevel}" width="200" height="200" fill="${color1}" clip-path="url(#vialMask)" opacity="0.9" />`;
            svgContent += `<path d="${bottlePath}" fill="none" stroke="#374151" stroke-width="3" />`;
            svgContent += `<rect x="75" y="20" width="50" height="15" fill="#78350f" rx="2" />`;
        } else {
             // Square Bottle
             const bottlePath = `M70,40 L130,40 L140,70 L140,150 L60,150 L60,70 Z`;
             svgContent += `<clipPath id="sqMask"><path d="${bottlePath}" /></clipPath>`;
             svgContent += `<path d="${bottlePath}" fill="#e5e7eb" fill-opacity="0.3" stroke="#9ca3af" stroke-width="2" />`;
             svgContent += `<rect x="0" y="${liquidLevel}" width="200" height="200" fill="${color1}" clip-path="url(#sqMask)" opacity="0.9" />`;
             svgContent += `<path d="${bottlePath}" fill="none" stroke="#374151" stroke-width="3" />`;
             svgContent += `<rect x="75" y="25" width="50" height="15" fill="#78350f" rx="2" />`;
        }

        // Bubbles
        svgContent += `<circle cx="90" cy="120" r="3" fill="white" opacity="0.4">
             <animate attributeName="cy" from="140" to="100" dur="2s" repeatCount="indefinite"/>
             <animate attributeName="opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite"/>
        </circle>`;
        svgContent += `<circle cx="110" cy="130" r="2" fill="white" opacity="0.4">
             <animate attributeName="cy" from="140" to="90" dur="2.5s" repeatCount="indefinite"/>
             <animate attributeName="opacity" values="0;0.5;0" dur="2.5s" repeatCount="indefinite"/>
        </circle>`;

        // Shine
        svgContent += `<path d="M85,50 Q85,100 85,140" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.3" filter="url(#shine)" />`;


    } else if (itemType === 'gem') {
        // Shapes: 0=Diamond, 1=Ruby/Octagon, 2=Emerald/Rect
        
        if (shape === 0) { // Diamond
            svgContent += `<g transform="translate(100,100) scale(1.2)">
                <path d="M0,-60 L50,-20 L0,60 L-50,-20 Z" fill="${color1}" stroke="${color2}" stroke-width="2"/>
                <path d="M-50,-20 L0,-60 L50,-20" fill="white" fill-opacity="0.2" />
                <path d="M-50,-20 L0,0 L50,-20" fill="none" stroke="${color2}" />
                <path d="M0,0 L0,60" fill="none" stroke="${color2}" />
                <path d="M-20,-30 L0,-60 L20,-30 L0,0 Z" fill="white" fill-opacity="0.3" />
            </g>`;
        } else if (shape === 1) { // Octagon/Ruby
             svgContent += `<g transform="translate(100,100)">
                <path d="M-30,-50 L30,-50 L50,-30 L50,30 L30,50 L-30,50 L-50,30 L-50,-30 Z" fill="${color1}" stroke="${color2}" stroke-width="2"/>
                <rect x="-30" y="-30" width="60" height="60" fill="white" fill-opacity="0.1" />
                <path d="M-30,-30 L-50,-30 M30,-30 L50,-30 M30,30 L50,30 M-30,30 L-50,30" stroke="${color2}" />
             </g>`;
        } else { // Shard
             svgContent += `<g transform="translate(100,100)">
                <path d="M0,-60 L20,0 L0,60 L-20,0 Z" fill="${color1}" />
                <path d="M20,0 L40,20 L0,60 Z" fill="${color2}" />
                <path d="M-20,0 L-40,20 L0,60 Z" fill="${color2}" />
                <path d="M0,-60 L0,60" stroke="white" stroke-width="1" opacity="0.5"/>
             </g>`;
        }
        // Sparkle
        svgContent += `<path d="M100,60 L105,70 L115,70 L107,80 L110,90 L100,83 L90,90 L93,80 L85,70 L95,70 Z" fill="white" filter="url(#glowItem)" opacity="0.8">
            <animateTransform attributeName="transform" type="scale" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </path>`;

    } else if (itemType === 'key') {
        const teethCount = Math.max(1, Math.min(5, complexity / 2));
        
        svgContent += `<g transform="rotate(45 100 100)">`;
        
        // Handle
        if (shape === 0) {
            svgContent += `<circle cx="60" cy="100" r="25" fill="none" stroke="${color1}" stroke-width="8" />`;
            svgContent += `<circle cx="60" cy="100" r="18" fill="none" stroke="${color2}" stroke-width="2" />`;
        } else {
            svgContent += `<path d="M40,100 L60,80 L80,100 L60,120 Z" fill="none" stroke="${color1}" stroke-width="8" />`;
            svgContent += `<rect x="55" y="95" width="10" height="10" fill="${color2}" />`;
        }

        // Shaft
        svgContent += `<rect x="85" y="94" width="80" height="12" fill="${color1}" />`;
        svgContent += `<rect x="90" y="98" width="70" height="4" fill="${color2}" opacity="0.5"/>`;

        // Teeth
        for(let i=0; i<teethCount; i++) {
             svgContent += `<rect x="${140 + i*10}" y="106" width="6" height="${10 + (i%2)*5}" fill="${color1}" />`;
        }
        
        svgContent += `</g>`;

    } else if (itemType === 'scroll') {
        // Paper color = color2, Ribbon = color1
        const paperColor = color2 === '#f87171' ? '#fef3c7' : color2; // Default to parchment if default red used
        
        if (shape === 0) { // Rolled
            svgContent += `<defs><linearGradient id="scrollGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#d1d5db"/><stop offset="50%" stop-color="${paperColor}"/><stop offset="100%" stop-color="#9ca3af"/></linearGradient></defs>`;
            svgContent += `<rect x="60" y="50" width="80" height="100" fill="${paperColor}" rx="2"/>`; // Body implied inside
            svgContent += `<g transform="translate(100,100) rotate(-45)">
                 <rect x="-30" y="-60" width="60" height="120" fill="url(#scrollGrad)" stroke="#b45309" stroke-width="2" rx="5"/>
                 <rect x="-32" y="-10" width="64" height="10" fill="${color1}" />
                 <circle cx="0" cy="-5" r="8" fill="${color1}" stroke="#b45309" stroke-width="1"/>
            </g>`;
        } else { // Open
            svgContent += `<path d="M50,40 Q100,30 150,40 L150,160 Q100,150 50,160 Z" fill="${paperColor}" stroke="#b45309" stroke-width="2"/>`;
            // Rolled ends
            svgContent += `<rect x="40" y="30" width="20" height="140" rx="5" fill="#d1d5db" stroke="#9ca3af"/>`;
            svgContent += `<rect x="140" y="30" width="20" height="140" rx="5" fill="#d1d5db" stroke="#9ca3af"/>`;
            
            // Text lines
            for(let i=0; i<complexity; i++) {
                svgContent += `<rect x="70" y="${60 + i*15}" width="${60 + (i%3)*10}" height="4" fill="#78350f" opacity="0.6"/>`;
            }
            // Seal
            svgContent += `<circle cx="150" cy="150" r="12" fill="${color1}" stroke="#7f1d1d" stroke-width="2" />`;
            svgContent += `<path d="M145,150 L155,150 M150,145 L150,155" stroke="#7f1d1d" stroke-width="2"/>`;
        }

    } else if (itemType === 'coin') {
        const count = Math.max(1, complexity);
        
        for(let i=0; i<count; i++) {
            const yOffset = 150 - (i * 8);
            const xOffset = 100 + (Math.sin(i)*5);
            svgContent += `<g transform="translate(${xOffset}, ${yOffset}) scale(1, 0.4)">
                <circle cx="0" cy="0" r="30" fill="#b45309" stroke="#78350f" stroke-width="2"/>
                <circle cx="0" cy="-5" r="30" fill="${color1}" stroke="#b45309" stroke-width="2"/>
                <circle cx="0" cy="-5" r="20" fill="none" stroke="#fff" opacity="0.3" />
            </g>`;
        }
        // Sparkle
        svgContent += `<path d="M70,50 L75,60 L85,60 L77,70 L80,80 L70,73 L60,80 L63,70 L55,60 L65,60 Z" fill="white" filter="url(#glowItem)" opacity="0.9">
             <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
        </path>`;
    }

    return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
  };

  const applyPreset = (t: ItemType) => {
      setItemType(t);
      if(t === 'potion') { setColor1('#ef4444'); setColor2('#fca5a5'); }
      if(t === 'gem') { setColor1('#3b82f6'); setColor2('#1d4ed8'); }
      if(t === 'key') { setColor1('#eab308'); setColor2('#a16207'); }
      if(t === 'scroll') { setColor1('#ef4444'); setColor2('#fef3c7'); }
      if(t === 'coin') { setColor1('#fbbf24'); setColor2('#d97706'); }
  };
  
  const handleRandomize = () => {
     setShape(Math.floor(Math.random() * 3));
     const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
     setColor1(randomColor);
  };

  const handleSendToEditor = () => {
    onGenerate(formatXml(previewSvg));
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Left: Preview */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-8 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800 relative">
         <div className="absolute top-4 left-4 z-10">
             <div className="bg-yellow-900/50 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-yellow-200 border border-yellow-700">
                Loot Generator
             </div>
        </div>

        <div className="relative group">
            <div className="w-[300px] h-[300px] bg-checkerboard rounded-xl shadow-2xl overflow-hidden border-4 border-gray-700 relative flex items-center justify-center bg-gray-900/50">
                <div 
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: previewSvg }} 
                />
            </div>
             <div className="absolute -bottom-14 w-full flex justify-center">
                 <button 
                    onClick={handleRandomize}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-all shadow-lg text-sm font-bold border border-gray-600"
                 >
                    <RefreshCw size={18} className="text-yellow-400" />
                    <span>Randomize</span>
                 </button>
            </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-800 flex flex-col border-l border-gray-700">
         <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-800 z-10 shadow-sm">
            <h2 className="text-lg font-bold text-yellow-400">Item Config</h2>
         </div>

         <div className="flex-1 overflow-y-auto p-6 scrollbar-thin space-y-6">
            
            {/* Type Selector */}
            <div className="grid grid-cols-3 gap-3">
                <button 
                    onClick={() => applyPreset('potion')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${itemType === 'potion' ? 'bg-yellow-900/40 border-yellow-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Beaker size={18} />
                    <span className="text-[10px] font-bold uppercase">Potion</span>
                </button>
                <button 
                    onClick={() => applyPreset('gem')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${itemType === 'gem' ? 'bg-yellow-900/40 border-yellow-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Gem size={18} />
                    <span className="text-[10px] font-bold uppercase">Gem</span>
                </button>
                <button 
                    onClick={() => applyPreset('key')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${itemType === 'key' ? 'bg-yellow-900/40 border-yellow-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Key size={18} />
                    <span className="text-[10px] font-bold uppercase">Key</span>
                </button>
                <button 
                    onClick={() => applyPreset('scroll')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${itemType === 'scroll' ? 'bg-yellow-900/40 border-yellow-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Scroll size={18} />
                    <span className="text-[10px] font-bold uppercase">Scroll</span>
                </button>
                <button 
                    onClick={() => applyPreset('coin')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${itemType === 'coin' ? 'bg-yellow-900/40 border-yellow-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Coins size={18} />
                    <span className="text-[10px] font-bold uppercase">Coin</span>
                </button>
            </div>

            <hr className="border-gray-700" />

            {/* Shape Variation */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Shape Style</label>
                <div className="flex bg-gray-900 rounded p-1">
                    <button onClick={() => setShape(0)} className={`flex-1 py-1 text-xs rounded ${shape===0 ? 'bg-yellow-700 text-white' : 'text-gray-400'}`}>Style A</button>
                    <button onClick={() => setShape(1)} className={`flex-1 py-1 text-xs rounded ${shape===1 ? 'bg-yellow-700 text-white' : 'text-gray-400'}`}>Style B</button>
                    <button onClick={() => setShape(2)} className={`flex-1 py-1 text-xs rounded ${shape===2 ? 'bg-yellow-700 text-white' : 'text-gray-400'}`}>Style C</button>
                </div>
            </div>

            {/* Params */}
            <div className="space-y-4">
                 <div className="flex justify-between text-xs mb-1 text-gray-400 font-bold uppercase">
                    <span>Complexity / Level</span>
                    <span>{complexity}</span>
                </div>
                <input 
                    type="range" min="1" max="10" 
                    value={complexity}
                    onChange={(e) => setComplexity(Number(e.target.value))}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1 uppercase font-bold">Main Color</label>
                    <div className="flex items-center space-x-2 bg-gray-900 p-2 rounded border border-gray-700">
                        <input 
                            type="color" 
                            value={color1}
                            onChange={(e) => setColor1(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer bg-transparent border-none"
                        />
                        <span className="text-xs font-mono">{color1}</span>
                    </div>
                </div>
                 <div>
                    <label className="block text-[10px] text-gray-500 mb-1 uppercase font-bold">Detail Color</label>
                    <div className="flex items-center space-x-2 bg-gray-900 p-2 rounded border border-gray-700">
                        <input 
                            type="color" 
                            value={color2}
                            onChange={(e) => setColor2(e.target.value)}
                            className="w-6 h-6 rounded cursor-pointer bg-transparent border-none"
                        />
                        <span className="text-xs font-mono">{color2}</span>
                    </div>
                </div>
            </div>

         </div>

         <div className="p-6 border-t border-gray-700 bg-gray-800">
            <button 
                onClick={handleSendToEditor}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-yellow-900/20 transition-all transform hover:translate-y-[-1px]"
            >
                <span>Export to Editor</span>
                <ArrowRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ItemConstructor;