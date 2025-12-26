import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Settings, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import ImageTracer from 'imagetracerjs';
import { formatXml } from '../utils/formatUtils';

interface ImageConverterProps {
  onConvert: (svgCode: string) => void;
}

const ImageConverter: React.FC<ImageConverterProps> = ({ onConvert }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Tracing Options
  const [colors, setColors] = useState<number>(8);
  const [blur, setBlur] = useState<number>(2);
  const [scale, setScale] = useState<number>(1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleConvert = () => {
    if (!imageUrl) return;
    setIsProcessing(true);

    // Use a timeout to ensure the UI updates to "Processing" state
    setTimeout(() => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      img.onload = () => {
        try {
          // 1. Draw image to canvas to get pixel data
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            throw new Error("Could not create canvas context");
          }

          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);

          // 2. Load Library
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tracer = (ImageTracer as any).default || ImageTracer;

          if (!tracer || typeof tracer.imagedataToSVG !== 'function') {
             console.error("Library loaded:", tracer);
             throw new Error("ImageTracer library not loaded correctly (missing imagedataToSVG).");
          }

          // 3. Configure Options
          const options = {
            // Tracing
            ltres: 1, 
            qtres: 1, 
            pathomit: 8, 
            rightangleenhance: false, 
            
            // Color quantization
            colorsampling: 2, 
            numberofcolors: colors, 
            mincolorratio: 0.02, 
            colorquantcycles: 3, 
            
            // Layering
            layering: 0,
            
            // Blur (Pre-processing)
            blurradius: blur, 
            blurdelta: 20, 
            
            // Output
            scale: scale,
            linefilter: true,
            viewbox: true,
            desc: false
          };

          // 4. Convert synchronously using image data
          const svgString = tracer.imagedataToSVG(imageData, options);

          setIsProcessing(false);
          
          if (!svgString) {
             throw new Error("Conversion resulted in empty string");
          }

          // 5. Format and complete
          const formatted = formatXml(svgString);
          onConvert(formatted);

        } catch (error) {
          console.error("Conversion failed:", error);
          setIsProcessing(false);
          alert(`Error during conversion: ${(error as Error).message}`);
        }
      };

      img.onerror = (err) => {
        console.error("Image load failed", err);
        setIsProcessing(false);
        alert("Failed to load the image file for processing.");
      };

    }, 100);
  };

  const handleReset = () => {
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-6 bg-gray-900 text-white overflow-auto">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Panel: Upload & Preview */}
        <div className="flex flex-col">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl min-h-[400px] flex flex-col">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="text-violet-500" /> Source Image
            </h2>
            
            <div className="flex-1 flex items-center justify-center bg-gray-900/50 rounded-lg p-2">
              <div className="relative bg-checkerboard rounded-lg overflow-hidden border-2 border-dashed border-gray-600 group hover:border-violet-500 transition-colors w-full h-full flex items-center justify-center">
                {imageUrl ? (
                  <>
                    <img 
                      src={imageUrl} 
                      alt="Upload preview" 
                      className="max-w-full max-h-[500px] object-contain shadow-lg w-auto h-auto mx-auto" 
                    />
                    <button 
                      onClick={handleReset}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-md z-10"
                      title="Remove Image"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </>
                ) : (
                  <div 
                    className="text-center cursor-pointer p-10 w-full h-full flex flex-col items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-600 transition-colors">
                      <Upload size={32} className="text-gray-300 group-hover:text-white" />
                    </div>
                    <p className="text-gray-300 font-medium">Click to Upload PNG/JPG</p>
                    <p className="text-gray-500 text-sm mt-2">Analyzes pixels to generate vector paths</p>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/png, image/jpeg" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Controls */}
        <div className="flex flex-col">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl h-full">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Settings className="text-violet-500" /> Vector Settings
            </h2>

            <div className="space-y-8">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                 <p className="text-sm text-gray-400">
                   <strong>Tip:</strong> To merge different shades into one color, reduce "Color Precision" and increase "Smoothing".
                 </p>
              </div>

              {/* Colors Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Color Precision</label>
                  <span className="text-sm font-mono text-violet-400">{colors} colors</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="32" 
                  step="1"
                  value={colors} 
                  onChange={(e) => setColors(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Flat / Logo</span>
                  <span>Photo</span>
                </div>
              </div>

              {/* Blur Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Smoothing (Merge Shades)</label>
                  <span className="text-sm font-mono text-violet-400">{blur}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  step="1"
                  value={blur} 
                  onChange={(e) => setBlur(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <p className="text-xs text-gray-500 mt-1">Higher values blend noisy pixels into solid shapes.</p>
              </div>

               {/* Scale Slider */}
               <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Output Scale</label>
                  <span className="text-sm font-mono text-violet-400">{scale}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="4" 
                  step="0.5"
                  value={scale} 
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>

              <button 
                onClick={handleConvert}
                disabled={!imageUrl || isProcessing}
                className={`mt-8 w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-lg
                  ${!imageUrl 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white hover:shadow-violet-500/25'
                  }
                `}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Generate SVG</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;