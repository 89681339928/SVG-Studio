import React from 'react';
import { ArrowRight, PenTool, Ghost, SmilePlus, Gem, Home, Trees, RefreshCw, Zap, Layers, Code, MonitorPlay } from 'lucide-react';
import { AppTab } from '../types';

interface LandingProps {
  onNavigate: (tab: AppTab) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-gray-950 text-white selection:bg-violet-500/30">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-full px-3 py-1 mb-8">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium text-gray-300">v2.0 Pro Edition Now Live</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Design Game Assets <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">In Seconds</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                The ultimate SVG studio for developers and designers. Create characters, mobs, items, and environments with procedural generation and a powerful code editor.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                    onClick={() => onNavigate('editor')}
                    className="px-8 py-4 bg-white text-gray-950 rounded-xl font-bold text-lg hover:bg-gray-100 transition-transform hover:scale-105 shadow-xl shadow-white/10 flex items-center gap-2"
                >
                    <Code size={20} />
                    <span>Open Editor</span>
                </button>
                <button 
                    onClick={() => onNavigate('constructor')}
                    className="px-8 py-4 bg-gray-900 border border-gray-800 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center gap-2"
                >
                    <MonitorPlay size={20} />
                    <span>Try Generators</span>
                </button>
            </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 pb-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature Cards */}
            <FeatureCard 
                icon={<SmilePlus className="text-orange-400" />}
                title="Character Creator"
                desc="Mix and match armor, weapons, and accessories to create unique RPG heroes."
                color="hover:border-orange-500/50 hover:bg-orange-500/5"
                onClick={() => onNavigate('constructor')}
            />
            
            <FeatureCard 
                icon={<Ghost className="text-purple-400" />}
                title="Mob Bestiary"
                desc="Access a library of 200+ procedural enemies, from skeletons to dragons."
                color="hover:border-purple-500/50 hover:bg-purple-500/5"
                onClick={() => onNavigate('mobs')}
            />

            <FeatureCard 
                icon={<Gem className="text-yellow-400" />}
                title="Loot Generator"
                desc="Generate potions, scrolls, keys, and gems with customizable styles."
                color="hover:border-yellow-500/50 hover:bg-yellow-500/5"
                onClick={() => onNavigate('items')}
            />

            <FeatureCard 
                icon={<Home className="text-blue-400" />}
                title="Structure Builder"
                desc="Construct buildings, houses, and dungeons with modular parts."
                color="hover:border-blue-500/50 hover:bg-blue-500/5"
                onClick={() => onNavigate('structure')}
            />

            <FeatureCard 
                icon={<Trees className="text-green-400" />}
                title="Nature & Environment"
                desc="Procedural trees, rocks, and terrain tiles for your game world."
                color="hover:border-green-500/50 hover:bg-green-500/5"
                onClick={() => onNavigate('environment')}
            />

             <FeatureCard 
                icon={<RefreshCw className="text-pink-400" />}
                title="Image to SVG"
                desc="Convert raster images (PNG/JPG) into editable SVG vectors instantly."
                color="hover:border-pink-500/50 hover:bg-pink-500/5"
                onClick={() => onNavigate('converter')}
            />

         </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-12">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
             <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <PenTool size={16} className="text-white" />
                </div>
                <span className="font-bold text-gray-300">SVG Studio Pro</span>
             </div>
             <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Documentation</a>
                <a href="#" className="hover:text-white transition-colors">License</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
             </div>
             <div className="mt-4 md:mt-0">
                &copy; {new Date().getFullYear()} SVG Studio. All rights reserved.
             </div>
          </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color, onClick }: { icon: React.ReactNode, title: string, desc: string, color: string, onClick: () => void }) => (
    <div 
        onClick={onClick}
        className={`group bg-gray-900 border border-gray-800 p-6 rounded-2xl cursor-pointer transition-all duration-300 ${color} hover:-translate-y-1 hover:shadow-xl`}
    >
        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-950 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            {title}
            <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gray-500" />
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
            {desc}
        </p>
    </div>
);

export default Landing;