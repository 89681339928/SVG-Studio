import React, { useState } from 'react';
import { Copy, Trash2, Download, Check, ChevronDown, Image as ImageIcon, Layers, FileCode, Edit3, SmilePlus, Home, Trees, Mountain, Map, CarFront, Sparkles, Gem, RefreshCw, PenTool, Ghost, Code } from 'lucide-react';
import { ToolbarProps, ExportType, AppTab } from '../types';

const Toolbar: React.FC<ToolbarProps> = ({ onCopy, onClear, onExport, isValid, svgCode, activeTab, onTabChange }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = (type: ExportType) => {
    onExport(type);
    setIsDownloadOpen(false);
  };

  // If on Landing page, show a cleaner header
  if (activeTab === 'home') {
      return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 z-50">
           <div 
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => onTabChange('home')}
            >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/20 group-hover:shadow-purple-900/40 transition-shadow">
                    <PenTool size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-white leading-none">
                    SVG Studio
                    </h1>
                    <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Pro Edition</span>
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-400">
                    <button onClick={() => onTabChange('editor')} className="hover:text-white transition-colors">Editor</button>
                    <button onClick={() => onTabChange('constructor')} className="hover:text-white transition-colors">Generators</button>
                    <button onClick={() => onTabChange('converter')} className="hover:text-white transition-colors">Converter</button>
                </nav>
                <button 
                    onClick={() => onTabChange('editor')}
                    className="px-5 py-2.5 bg-white text-gray-950 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg shadow-white/5"
                >
                    Launch App
                </button>
            </div>
        </header>
      );
  }

  // --- APP TOOLBAR (When inside a tool) ---

  const getTabClass = (tabName: AppTab) => 
    `flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap border ${
        activeTab === tabName 
        ? 'bg-violet-600 border-violet-500 text-white shadow-md' 
        : 'bg-transparent border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'
    }`;

  return (
    <header className="h-[64px] bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 z-50 relative shrink-0">
      
      {/* Logo Area - Acts as "Back to Home" */}
      <div className="flex items-center pr-4 border-r border-gray-800 mr-2 shrink-0">
         <div 
            className="flex items-center space-x-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => onTabChange('home')}
            title="Back to Home"
         >
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                <PenTool size={16} className="text-white" />
            </div>
         </div>
      </div>

      {/* Navigation Tabs (Scrollable) */}
      <div className="flex-1 overflow-x-auto scrollbar-hide mx-2 mask-linear-fade">
         <div className="flex space-x-1 py-1">
            <button onClick={() => onTabChange('editor')} className={getTabClass('editor')}>
                <Code size={14} />
                <span>Editor</span>
            </button>
            <div className="w-px h-5 bg-gray-700 self-center mx-1 opacity-50" />
            
            <button onClick={() => onTabChange('constructor')} className={getTabClass('constructor')}>
                <SmilePlus size={14} />
                <span>Chars</span>
            </button>
             <button onClick={() => onTabChange('mobs')} className={getTabClass('mobs')}>
                <Ghost size={14} />
                <span>Mobs</span>
            </button>
            <button onClick={() => onTabChange('items')} className={getTabClass('items')}>
                <Gem size={14} />
                <span>Loot</span>
            </button>
            <button onClick={() => onTabChange('structure')} className={getTabClass('structure')}>
                <Home size={14} />
                <span>Builds</span>
            </button>
            <button onClick={() => onTabChange('transport')} className={getTabClass('transport')}>
                <CarFront size={14} />
                <span>Auto</span>
            </button>
             <button onClick={() => onTabChange('vfx')} className={getTabClass('vfx')}>
                <Sparkles size={14} />
                <span>VFX</span>
            </button>
            <button onClick={() => onTabChange('environment')} className={getTabClass('environment')}>
                <Trees size={14} />
                <span>Nature</span>
            </button>
            <button onClick={() => onTabChange('landscape')} className={getTabClass('landscape')}>
                <Mountain size={14} />
                <span>Lands</span>
            </button>
             <button onClick={() => onTabChange('terrain')} className={getTabClass('terrain')}>
                <Map size={14} />
                <span>Tiles</span>
            </button>
            <div className="w-px h-5 bg-gray-700 self-center mx-1 opacity-50" />
            <button onClick={() => onTabChange('converter')} className={getTabClass('converter')}>
                <RefreshCw size={14} />
                <span>Vectorize</span>
            </button>
         </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 shrink-0 pl-4 border-l border-gray-800">
        
        {activeTab === 'editor' && (
            <button
            onClick={onClear}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            title="Clear Editor"
            >
            <Trash2 size={16} />
            </button>
        )}

        {/* Copy Button */}
        <button
        onClick={handleCopy}
        disabled={!svgCode}
        className="hidden sm:flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
        >
        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        {/* Export Dropdown */}
        <div className="relative">
        <button
            onClick={() => setIsDownloadOpen(!isDownloadOpen)}
            disabled={!isValid || !svgCode}
            className="flex items-center space-x-2 px-3 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all shadow-md shadow-violet-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Download size={14} />
            <span>Export</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${isDownloadOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDownloadOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 ring-1 ring-black/50">
            
            <div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-950/50">
                Raster (Image)
            </div>
            <button onClick={() => handleExport(ExportType.PNG_1X)} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-violet-600 hover:text-white flex items-center space-x-3 transition-colors">
                <ImageIcon size={14} /> <span>PNG (Standard)</span>
            </button>
            <button onClick={() => handleExport(ExportType.PNG_2X)} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-violet-600 hover:text-white flex items-center space-x-3 transition-colors">
                <ImageIcon size={14} /> <span>PNG (Retina 2x)</span>
            </button>
            <button onClick={() => handleExport(ExportType.PNG_4X)} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-violet-600 hover:text-white flex items-center space-x-3 transition-colors">
                <ImageIcon size={14} /> <span>PNG (Ultra 4x)</span>
            </button>

            <div className="h-px bg-gray-800 my-1"></div>

            <div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-950/50">
                Vector (Source)
            </div>
            <button onClick={() => handleExport(ExportType.SVG)} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-violet-600 hover:text-white flex items-center space-x-3 transition-colors">
                <FileCode size={14} /> <span>SVG File</span>
            </button>
            <button onClick={() => handleExport(ExportType.SVG_LAYERS)} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-violet-600 hover:text-white flex items-center space-x-3 transition-colors">
                <Layers size={14} /> <span>Separate Layers (ZIP)</span>
            </button>

            </div>
        )}
        
        {isDownloadOpen && (
            <div className="fixed inset-0 z-40" onClick={() => setIsDownloadOpen(false)} />
        )}
        </div>
      </div>
    </header>
  );
};

export default Toolbar;