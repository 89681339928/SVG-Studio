import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, RefreshCw, Flame, Droplets, Star, Snowflake, Sun, Ghost, MoveDiagonal, Play, Pause } from 'lucide-react';
import { formatXml } from '../utils/formatUtils';

interface VfxConstructorProps {
  onGenerate: (svgCode: string) => void;
}

type VfxType = 'explosion' | 'magic' | 'electricity' | 'slime' | 'fire' | 'ice' | 'holy' | 'void' | 'slash';

const VfxConstructor: React.FC<VfxConstructorProps> = ({ onGenerate }) => {
  const [type, setType] = useState<VfxType>('explosion');
  const [color1, setColor1] = useState('#fbbf24'); // Primary
  const [color2, setColor2] = useState('#ef4444'); // Secondary
  const [complexity, setComplexity] = useState(5);
  const [seed, setSeed] = useState(Date.now());
  const [isAnimated, setIsAnimated] = useState(true);

  const [previewSvg, setPreviewSvg] = useState('');

  useEffect(() => {
    generateVfx();
  }, [type, color1, color2, complexity, seed, isAnimated]);

  const generateVfx = () => {
    let svgContent = '';
    const size = 200;
    const center = size / 2;

    // Common filters
    const blurFilter = `<filter id="blurFilter"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
    const glowFilter = `<filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;

    svgContent += `<defs>${blurFilter}${glowFilter}</defs>`;

    if (type === 'explosion') {
        for(let i=0; i<3; i++) {
            const radius = 80 - (i * 20);
            const points = [];
            const numPoints = 10 + complexity * 2;
            for(let j=0; j<numPoints; j++) {
                const angle = (j / numPoints) * Math.PI * 2;
                const rVar = radius + (Math.random() * 20 - 10);
                points.push([
                    center + Math.cos(angle) * rVar,
                    center + Math.sin(angle) * rVar
                ]);
            }
            const pathData = `M ${points.map(p => p.join(',')).join(' L ')} Z`;
            const opacity = 1 - (i * 0.2);
            const fill = i === 0 ? color2 : (i === 1 ? color1 : '#ffffff');
            
            let anim = '';
            if (isAnimated) {
                anim = `<animateTransform attributeName="transform" type="scale" values="0.8;1.1;0.9;1" dur="${0.5 + i * 0.2}s" repeatCount="indefinite" additive="sum" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />`;
                anim += `<animate attributeName="opacity" values="${opacity};${opacity * 0.5};${opacity}" dur="0.2s" repeatCount="indefinite" />`;
            }

            svgContent += `<g transform-origin="${center} ${center}"><path d="${pathData}" fill="${fill}" opacity="${opacity}" stroke="${color2}" stroke-width="2" stroke-linejoin="round">${anim}</path></g>`;
        }
        // Debris
        for(let k=0; k<complexity * 3; k++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 90;
            const x = center + Math.cos(angle) * dist;
            const y = center + Math.sin(angle) * dist;
            const s = Math.random() * 5 + 2;
            
            let anim = '';
            if (isAnimated) {
                anim = `<animateTransform attributeName="transform" type="translate" values="0 0; ${(Math.random()-0.5)*20} ${(Math.random()-0.5)*20}; 0 0" dur="${0.5 + Math.random()}s" repeatCount="indefinite" />`;
            }

            svgContent += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${color2}" transform="rotate(${Math.random()*360} ${x} ${y})">${anim}</rect>`;
        }

    } else if (type === 'magic') {
        const rotAnim = isAnimated ? `<animateTransform attributeName="transform" type="rotate" from="0 ${center} ${center}" to="360 ${center} ${center}" dur="10s" repeatCount="indefinite" />` : '';
        const pulseAnim = isAnimated ? `<animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />` : '';
        
        svgContent += `<circle cx="${center}" cy="${center}" r="80" fill="none" stroke="${color1}" stroke-width="2" stroke-dasharray="${complexity}, 5" filter="url(#glow)" opacity="0.8">${rotAnim}${pulseAnim}</circle>`;
        
        const revRotAnim = isAnimated ? `<animateTransform attributeName="transform" type="rotate" from="360 ${center} ${center}" to="0 ${center} ${center}" dur="7s" repeatCount="indefinite" />` : '';
        svgContent += `<circle cx="${center}" cy="${center}" r="75" fill="none" stroke="${color2}" stroke-width="1" opacity="0.5">${revRotAnim}</circle>`;

        const polyPoints = [];
        const sides = Math.max(3, Math.floor(complexity / 2) + 2);
        for(let i=0; i<sides; i++) {
             const angle = (i / sides) * Math.PI * 2 - (Math.PI/2);
             polyPoints.push(`${center + Math.cos(angle)*60},${center + Math.sin(angle)*60}`);
        }
        
        const polyAnim = isAnimated ? `<animateTransform attributeName="transform" type="rotate" from="0 ${center} ${center}" to="-360 ${center} ${center}" dur="15s" repeatCount="indefinite" />` : '';
        svgContent += `<polygon points="${polyPoints.join(' ')}" fill="none" stroke="${color1}" stroke-width="2" filter="url(#glow)" opacity="0.7">${polyAnim}</polygon>`;

        for(let i=0; i<complexity; i++) {
             const angle = (i / complexity) * Math.PI * 2;
             const x = center + Math.cos(angle) * 90;
             const y = center + Math.sin(angle) * 90;
             const particleAnim = isAnimated ? `<animate attributeName="r" values="3;5;3" dur="${1 + Math.random()}s" repeatCount="indefinite" />` : '';
             svgContent += `<circle cx="${x}" cy="${y}" r="3" fill="${color2}" filter="url(#glow)">${particleAnim}</circle>`;
        }

    } else if (type === 'electricity') {
        const generateBolt = (x1: number, y1: number, x2: number, y2: number, displace: number): string => {
             if (displace < 2) return `L ${x2},${y2} `;
             const midX = (x1 + x2) / 2;
             const midY = (y1 + y2) / 2;
             const offsetX = (Math.random() - 0.5) * displace;
             const offsetY = (Math.random() - 0.5) * displace;
             return generateBolt(x1, y1, midX + offsetX, midY + offsetY, displace / 2) + 
                    generateBolt(midX + offsetX, midY + offsetY, x2, y2, displace / 2);
        };

        for(let i=0; i<Math.max(2, complexity/2); i++) {
            const startAngle = Math.random() * Math.PI * 2;
            const endAngle = startAngle + Math.PI + (Math.random() - 0.5); 
            const x1 = center + Math.cos(startAngle) * 20;
            const y1 = center + Math.sin(startAngle) * 20;
            const x2 = center + Math.cos(endAngle) * 90;
            const y2 = center + Math.sin(endAngle) * 90;
            
            const path = `M ${x1},${y1} ` + generateBolt(x1, y1, x2, y2, 50);
            
            const flashAnim = isAnimated ? `<animate attributeName="opacity" values="0;1;0;0;1;0" dur="${0.1 + Math.random()*0.2}s" repeatCount="indefinite" />` : '';

            svgContent += `<path d="${path}" stroke="${color1}" stroke-width="2" fill="none" filter="url(#glow)">${flashAnim}</path>`;
            svgContent += `<path d="${path}" stroke="#ffffff" stroke-width="0.5" fill="none">${flashAnim}</path>`;
        }
        
        const coreAnim = isAnimated ? `<animate attributeName="r" values="15;18;14;16;15" dur="0.1s" repeatCount="indefinite" />` : '';
        svgContent += `<circle cx="${center}" cy="${center}" r="15" fill="${color2}" filter="url(#glow)" opacity="0.6">${coreAnim}</circle>`;

    } else if (type === 'slime') {
        svgContent += `<defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" /><feComposite in="SourceGraphic" in2="goo" operator="atop"/></filter></defs>`;
        
        const mainAnim = isAnimated ? `<animate attributeName="r" values="40;42;38;40" dur="2s" repeatCount="indefinite" />` : '';
        let blobs = `<circle cx="${center}" cy="${center+10}" r="40" fill="${color1}">${mainAnim}</circle>`;
        
        for(let i=0; i<complexity + 3; i++) {
            const angle = (Math.PI) + (Math.random() * Math.PI);
            const dist = Math.random() * 40 + 20;
            const r = Math.random() * 15 + 10;
            const x = center + Math.cos(angle) * dist * 0.8;
            const y = center + Math.sin(angle) * dist * 0.8;
            
            const dripAnim = isAnimated ? `<animate attributeName="cy" values="${y};${y+10};${y}" dur="${2 + Math.random()}s" repeatCount="indefinite" />` : '';
            blobs += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color1}">${dripAnim}</circle>`;
        }
        const bubbles = `<circle cx="${center-15}" cy="${center-10}" r="5" fill="white" opacity="0.4" /><circle cx="${center+20}" cy="${center+5}" r="3" fill="white" opacity="0.3" />`;
        svgContent += `<g filter="url(#goo)">${blobs}</g>${bubbles}`;

    } else if (type === 'fire') {
        let flames = '';
        const count = complexity * 3 + 5;
        for (let i = 0; i < count; i++) {
            const w = Math.random() * 30 + 10;
            const h = Math.random() * 60 + 40;
            const x = center + (Math.random() - 0.5) * 60;
            const y = center + 50 - Math.random() * 20;
            const color = Math.random() > 0.6 ? color1 : color2;
            const opacity = Math.random() * 0.5 + 0.3;
            
            let anim = '';
            if (isAnimated) {
                 anim = `<animateTransform attributeName="transform" type="translate" values="0 0; 0 -20; 0 -40" dur="${0.5 + Math.random()}s" repeatCount="indefinite" />
                         <animate attributeName="opacity" values="${opacity}; 0" dur="${0.5 + Math.random()}s" repeatCount="indefinite" />`;
            }

            flames += `<g><path d="M${x},${y} Q${x-w},${y-h/2} ${x},${y-h} Q${x+w},${y-h/2} ${x},${y} Z" fill="${color}" opacity="${opacity}" transform="rotate(${(Math.random()-0.5)*30} ${x} ${y})"></path>${anim}</g>`;
        }
        svgContent += `<g filter="url(#blurFilter)">${flames}</g>`;
        
        const coreAnim = isAnimated ? `<animate attributeName="rx" values="30;32;28;30" dur="0.2s" repeatCount="indefinite" />` : '';
        svgContent += `<ellipse cx="${center}" cy="${center+40}" rx="30" ry="15" fill="#fff" opacity="0.4" filter="blur(5px)">${coreAnim}</ellipse>`;

    } else if (type === 'ice') {
        const shards = complexity * 2 + 6;
        let path = '';
        for (let i = 0; i < shards * 2; i++) {
            const angle = (i / (shards * 2)) * Math.PI * 2;
            const isTip = i % 2 === 0;
            const len = isTip ? 80 + Math.random() * 20 : 20 + Math.random() * 10;
            const x = center + Math.cos(angle) * len;
            const y = center + Math.sin(angle) * len;
            path += (i === 0 ? `M ${x},${y} ` : `L ${x},${y} `);
        }
        path += 'Z';
        
        const pulseAnim = isAnimated ? `<animate attributeName="opacity" values="0.8;0.4;0.9;0.8" dur="3s" repeatCount="indefinite" />` : '';
        svgContent += `<path d="${path}" fill="${color1}" stroke="${color2}" stroke-width="2" opacity="0.8" filter="url(#glow)">${pulseAnim}</path>`;
        svgContent += `<path d="${path}" fill="white" opacity="0.3" transform="scale(0.7) translate(43 43)"/>`; 

    } else if (type === 'holy') {
        let rays = '';
        for(let i=0; i<complexity*2; i++) {
            const angle = (i / (complexity*2)) * Math.PI * 2;
            const len = 90;
            const x2 = center + Math.cos(angle) * len;
            const y2 = center + Math.sin(angle) * len;
            const width = Math.random() * 4 + 1;
            
            const rayAnim = isAnimated ? `<animate attributeName="stroke-width" values="${width};${width*2};${width}" dur="${1+Math.random()}s" repeatCount="indefinite" />` : '';
            rays += `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" stroke="${color1}" stroke-width="${width}" opacity="${Math.random() * 0.5}" stroke-linecap="round">${rayAnim}</line>`;
        }
        svgContent += `<g filter="url(#blurFilter)">${rays}</g>`;
        svgContent += `<circle cx="${center}" cy="${center}" r="30" fill="${color2}" opacity="0.2" filter="blur(2px)"/>`;
        svgContent += `<circle cx="${center}" cy="${center}" r="20" fill="#fff" opacity="0.8" filter="url(#glow)"/>`;
        
        const rotAnim = isAnimated ? `<animateTransform attributeName="transform" type="rotate" from="0 ${center} ${center}" to="360 ${center} ${center}" dur="20s" repeatCount="indefinite" />` : '';
        svgContent += `<circle cx="${center}" cy="${center}" r="85" fill="none" stroke="${color1}" stroke-width="2" stroke-dasharray="1 10">${rotAnim}</circle>`;

    } else if (type === 'void') {
        let spiral = '';
        const turns = complexity * 30;
        let prevX = center, prevY = center;
        for(let i=0; i<turns; i++) {
            const angle = i * 0.3;
            const radius = i * 0.8;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            if (i > 0) spiral += `<line x1="${prevX}" y1="${prevY}" x2="${x}" y2="${y}" stroke="${color1}" stroke-width="${Math.max(0.5, i/50)}" opacity="0.8" />`;
            prevX = x; prevY = y;
        }
        
        const spinAnim = isAnimated ? `<animateTransform attributeName="transform" type="rotate" from="0 ${center} ${center}" to="-360 ${center} ${center}" dur="5s" repeatCount="indefinite" />` : '';
        
        svgContent += `<g filter="url(#blurFilter)">
            <g transform-origin="${center} ${center}">
                ${spiral}
                ${spinAnim}
            </g>
        </g>`;
        
        svgContent += `<circle cx="${center}" cy="${center}" r="15" fill="black" stroke="${color2}" stroke-width="2"/>`;
        // Particles sucking in
        for(let i=0; i<10; i++) {
             const dist = 50 + Math.random() * 40;
             const angle = Math.random() * Math.PI * 2;
             const x = center + Math.cos(angle) * dist;
             const y = center + Math.sin(angle) * dist;
             
             const suckAnim = isAnimated ? `<animateTransform attributeName="transform" type="translate" values="0 0; ${center-x} ${center-y}" dur="${0.5+Math.random()}s" repeatCount="indefinite" />
                                            <animate attributeName="r" values="3;0" dur="${0.5+Math.random()}s" repeatCount="indefinite" />` : '';

             svgContent += `<circle cx="${x}" cy="${y}" r="${Math.random()*3}" fill="${color2}" opacity="0.6">${suckAnim}</circle>`;
        }

    } else if (type === 'slash') {
        const angle = -45;
        const sparkSize = complexity * 2;

        const swipeAnim = isAnimated ? `
            <animateTransform attributeName="transform" type="translate" values="-20 20; 20 -20" dur="0.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite" />
        ` : '';

        svgContent += `
        <g transform="translate(${center},${center}) rotate(${angle})">
           <g>
                <path d="M -80,0 Q 0,-60 80,0 Q 0,-30 -80,0 Z" fill="${color1}" filter="url(#blurFilter)" opacity="0.6"/>
                <path d="M -75,0 Q 0,-50 75,0 Q 0,-25 -75,0 Z" fill="${color2}" />
                <path d="M -70,0 Q 0,-40 70,0 Q 0,-20 -70,0 Z" fill="#ffffff" opacity="0.8"/>
                ${swipeAnim}
           </g>
        </g>`;
        
        const sparkAnim = isAnimated ? `<animateTransform attributeName="transform" type="scale" values="0;1.5;0" dur="0.4s" repeatCount="indefinite" />` : '';
        svgContent += `<g transform="translate(${center},${center}) rotate(45)">
            <path d="M-${sparkSize},0 L${sparkSize},0 M0,-${sparkSize} L0,${sparkSize}" stroke="white" stroke-width="2">
                ${sparkAnim}
            </path>
        </g>`;
    }

    setPreviewSvg(`<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`);
  };

  const randomize = () => {
    setSeed(Date.now());
  };

  const handleSendToEditor = () => {
    onGenerate(formatXml(previewSvg));
  };

  const applyPreset = (t: VfxType) => {
      setType(t);
      if(t === 'explosion') { setColor1('#fbbf24'); setColor2('#ef4444'); }
      if(t === 'magic') { setColor1('#a855f7'); setColor2('#e879f9'); }
      if(t === 'electricity') { setColor1('#3b82f6'); setColor2('#60a5fa'); }
      if(t === 'slime') { setColor1('#84cc16'); setColor2('#3f6212'); }
      if(t === 'fire') { setColor1('#f97316'); setColor2('#ef4444'); }
      if(t === 'ice') { setColor1('#cffafe'); setColor2('#06b6d4'); }
      if(t === 'holy') { setColor1('#facc15'); setColor2('#fef08a'); }
      if(t === 'void') { setColor1('#4c1d95'); setColor2('#a855f7'); }
      if(t === 'slash') { setColor1('#e5e5e5'); setColor2('#a3a3a3'); }
      randomize();
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Left: Preview */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center p-8 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800 relative">
         <div className="absolute top-4 left-4 z-10">
             <div className="bg-pink-900/50 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-pink-200 border border-pink-700">
                Visual Effects (VFX)
             </div>
        </div>

        <div className="relative group">
            <div className="w-[300px] h-[300px] bg-checkerboard rounded-xl shadow-2xl overflow-hidden border-4 border-gray-700 relative flex items-center justify-center bg-gray-900">
                <div 
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: previewSvg }} 
                />
            </div>
             <div className="absolute -bottom-14 w-full flex justify-center gap-2">
                 <button 
                    onClick={randomize}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-all shadow-lg text-sm font-bold border border-gray-600"
                 >
                    <RefreshCw size={18} className="text-pink-400" />
                    <span>Regenerate</span>
                 </button>
                 
                 <button 
                    onClick={() => setIsAnimated(!isAnimated)}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all shadow-lg text-sm font-bold border border-gray-600 ${isAnimated ? 'bg-pink-700 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                 >
                    {isAnimated ? <Pause size={18} /> : <Play size={18} />}
                    <span>{isAnimated ? 'Animated' : 'Static'}</span>
                 </button>
            </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-800 flex flex-col border-l border-gray-700">
         <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-800 z-10 shadow-sm">
            <h2 className="text-lg font-bold text-pink-400">Effect Settings</h2>
         </div>

         <div className="flex-1 overflow-y-auto p-6 scrollbar-thin space-y-6">
            
            {/* Type Selector */}
            <div className="grid grid-cols-3 gap-3">
                <button 
                    onClick={() => applyPreset('explosion')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'explosion' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Flame size={16} />
                    <span className="text-[10px] font-bold uppercase">Explode</span>
                </button>
                <button 
                    onClick={() => applyPreset('fire')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'fire' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Flame size={16} className="text-orange-500"/>
                    <span className="text-[10px] font-bold uppercase">Fire</span>
                </button>
                <button 
                    onClick={() => applyPreset('ice')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'ice' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Snowflake size={16} />
                    <span className="text-[10px] font-bold uppercase">Ice</span>
                </button>

                <button 
                    onClick={() => applyPreset('magic')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'magic' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Star size={16} />
                    <span className="text-[10px] font-bold uppercase">Arcane</span>
                </button>
                <button 
                    onClick={() => applyPreset('holy')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'holy' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Sun size={16} />
                    <span className="text-[10px] font-bold uppercase">Holy</span>
                </button>
                <button 
                    onClick={() => applyPreset('void')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'void' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Ghost size={16} />
                    <span className="text-[10px] font-bold uppercase">Void</span>
                </button>

                <button 
                    onClick={() => applyPreset('electricity')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'electricity' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Zap size={16} />
                    <span className="text-[10px] font-bold uppercase">Volt</span>
                </button>
                <button 
                    onClick={() => applyPreset('slime')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'slime' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <Droplets size={16} />
                    <span className="text-[10px] font-bold uppercase">Slime</span>
                </button>
                <button 
                    onClick={() => applyPreset('slash')}
                    className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${type === 'slash' ? 'bg-pink-900/40 border-pink-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                >
                    <MoveDiagonal size={16} />
                    <span className="text-[10px] font-bold uppercase">Slash</span>
                </button>
            </div>

            <hr className="border-gray-700" />

            {/* Params */}
            <div className="space-y-4">
                 <div className="flex justify-between text-xs mb-1 text-gray-400 font-bold uppercase">
                    <span>Complexity / Intensity</span>
                    <span>{complexity}</span>
                </div>
                <input 
                    type="range" min="1" max="10" 
                    value={complexity}
                    onChange={(e) => setComplexity(Number(e.target.value))}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1 uppercase font-bold">Primary Color</label>
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
                    <label className="block text-[10px] text-gray-500 mb-1 uppercase font-bold">Secondary Color</label>
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
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-pink-900/20 transition-all transform hover:translate-y-[-1px]"
            >
                <span>Export to Editor</span>
                <ArrowRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default VfxConstructor;