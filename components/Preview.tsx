import React, { useState } from 'react';
import { PreviewProps } from '../types';
import { Grid3X3, Sun, Moon } from 'lucide-react';

const Preview: React.FC<PreviewProps> = ({ code, isValid }) => {
  const [showGrid, setShowGrid] = useState(false);
  const [bgMode, setBgMode] = useState<'checker' | 'dark' | 'light'>('checker');

  const toggleBg = () => {
    if (bgMode === 'checker') setBgMode('dark');
    else if (bgMode === 'dark') setBgMode('light');
    else setBgMode('checker');
  };

  const getBgClass = () => {
    switch(bgMode) {
      case 'dark': return 'bg-gray-900';
      case 'light': return 'bg-gray-100';
      default: return 'bg-checkerboard';
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="flex justify-between items-center px-4 py-2 bg-[#f3f4f6] dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 select-none z-10">
        <span>Preview Canvas</span>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowGrid(!showGrid)} 
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${showGrid ? 'text-violet-500 bg-violet-100 dark:bg-violet-900/30' : ''}`}
            title="Toggle Grid"
          >
            <Grid3X3 size={14} />
          </button>
          <button 
            onClick={toggleBg} 
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Background"
          >
            {bgMode === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>
      
      <div className={`flex-1 w-full h-full p-8 ${getBgClass()} overflow-auto flex items-center justify-center relative`}>
        {/* Grid Overlay */}
        {showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-20" 
            style={{ 
              backgroundImage: `linear-gradient(to right, ${bgMode === 'dark' ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(to bottom, ${bgMode === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
        )}

        {isValid ? (
           <div 
             className="shadow-2xl bg-transparent transition-all duration-300 relative z-10"
             dangerouslySetInnerHTML={{ __html: code }} 
             style={{ display: 'inline-block' }}
           />
        ) : (
          <div className="text-gray-500 bg-white/80 p-6 rounded-lg shadow-lg text-center backdrop-blur-sm z-10">
            {code.trim() ? (
              <>
                <h3 className="text-lg font-bold mb-2">Render Failed</h3>
                <p className="text-sm">Fix validation errors in the editor to see the preview.</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">Ready to Start</h3>
                <p className="text-sm">Enter SVG code in the editor to preview it here.</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;