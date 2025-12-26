import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import Landing from './components/Landing';
import CharacterConstructor from './components/CharacterConstructor';
import StructureConstructor from './components/StructureConstructor';
import EnvironmentConstructor from './components/EnvironmentConstructor';
import LandscapeConstructor from './components/LandscapeConstructor';
import TerrainConstructor from './components/TerrainConstructor';
import TransportConstructor from './components/TransportConstructor';
import VfxConstructor from './components/VfxConstructor';
import ItemConstructor from './components/ItemConstructor';
import ImageConverter from './components/ImageConverter';
import MobLibrary from './components/MobLibrary';
import { INITIAL_SVG } from './constants';
import { validateXML } from './utils/validationUtils';
import { downloadPng, downloadSvgFile, downloadSvgLayers } from './utils/exportUtils';
import { ExportType, AppTab } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState<string>(INITIAL_SVG);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>('home'); // Default to Landing Page

  useEffect(() => {
    const validationError = validateXML(code);
    setError(validationError);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleClear = () => {
    setCode('');
  };

  const handleExport = async (type: ExportType) => {
    if (error || !code) return;
    try {
      switch (type) {
        case ExportType.PNG_1X:
          await downloadPng(code, 1);
          break;
        case ExportType.PNG_2X:
          await downloadPng(code, 2);
          break;
        case ExportType.PNG_4X:
          await downloadPng(code, 4);
          break;
        case ExportType.SVG:
          downloadSvgFile(code);
          break;
        case ExportType.SVG_LAYERS:
          await downloadSvgLayers(code);
          break;
      }
    } catch (e) {
      console.error("Export failed:", e);
      alert("Failed to export. Please check the console.");
    }
  };

  const handleGeneratorComplete = (svgCode: string) => {
    setCode(svgCode);
    setActiveTab('editor');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Landing onNavigate={setActiveTab} />;
      case 'editor':
        return (
          <div className="w-full h-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-700 flex flex-col">
              <Editor code={code} onChange={setCode} error={error} />
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 dark:bg-gray-800">
              <Preview code={code} isValid={!error && code.length > 0} />
            </div>
          </div>
        );
      case 'converter':
        return (
            <div className="w-full h-full">
                <ImageConverter onConvert={handleGeneratorComplete} />
            </div>
        );
      case 'constructor':
        return (
          <div className="w-full h-full">
            <CharacterConstructor onGenerate={handleGeneratorComplete} />
          </div>
        );
      case 'mobs':
        return (
          <div className="w-full h-full">
            <MobLibrary onGenerate={handleGeneratorComplete} />
          </div>
        );
      case 'structure':
        return (
          <div className="w-full h-full">
            <StructureConstructor onGenerate={handleGeneratorComplete} />
          </div>
        );
      case 'environment':
        return (
          <div className="w-full h-full">
            <EnvironmentConstructor onGenerate={handleGeneratorComplete} />
          </div>
        );
      case 'landscape':
        return (
          <div className="w-full h-full">
            <LandscapeConstructor onGenerate={handleGeneratorComplete} />
          </div>
        );
      case 'terrain':
        return (
            <div className="w-full h-full">
              <TerrainConstructor onGenerate={handleGeneratorComplete} />
            </div>
        );
      case 'transport':
        return (
            <div className="w-full h-full">
              <TransportConstructor onGenerate={handleGeneratorComplete} />
            </div>
        );
      case 'items':
        return (
            <div className="w-full h-full">
              <ItemConstructor onGenerate={handleGeneratorComplete} />
            </div>
        );
      case 'vfx':
        return (
            <div className="w-full h-full">
              <VfxConstructor onGenerate={handleGeneratorComplete} />
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden font-sans">
      {/* 
        We render toolbar inside the main layout, but Toolbar itself handles 
        looking like a Landing Header vs App Toolbar based on activeTab 
      */}
      <Toolbar 
        onCopy={handleCopy} 
        onClear={handleClear} 
        onExport={handleExport} 
        isValid={!error && code.length > 0} 
        svgCode={code}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;