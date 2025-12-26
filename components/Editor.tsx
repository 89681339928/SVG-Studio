import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup'; // Load HTML/XML support
import { EditorProps } from '../types';

const Editor: React.FC<EditorProps> = ({ code, onChange, error }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea, pre (highlighting), and line numbers
  const handleScroll = () => {
    const top = textareaRef.current?.scrollTop || 0;
    const left = textareaRef.current?.scrollLeft || 0;

    if (preRef.current) {
      preRef.current.scrollTop = top;
      preRef.current.scrollLeft = left;
    }
    
    // Sync line numbers vertically
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = top;
    }
  };

  // Re-highlight when code changes
  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Basic Tab support
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newValue);

      // Restore cursor position (async to let React render first)
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Generate line numbers
  const lineNumbers = code.split('\n').map((_, i) => i + 1).join('\n');

  return (
    <div className={`relative w-full h-full flex flex-col bg-[#1e1e1e] ${error ? 'border-2 border-red-500' : ''}`}>
      {/* Header/Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] border-b border-gray-700 text-xs text-gray-400 select-none">
        <span>XML / SVG</span>
        {error && <span className="text-red-400 font-semibold truncate max-w-[300px]" title={error}>{error}</span>}
      </div>

      <div className="relative flex-1 overflow-hidden flex font-mono text-sm leading-6">
        {/* Line Numbers */}
        <div 
          ref={lineNumbersRef}
          className="bg-[#1e1e1e] text-gray-600 px-3 py-4 text-right select-none border-r border-gray-800 w-12 flex-shrink-0 overflow-hidden"
        >
           <pre className="m-0 p-0 font-mono text-sm leading-6">{lineNumbers}</pre>
        </div>

        <div className="relative flex-1 h-full overflow-hidden">
           {/* Syntax Highlighted Layer (Visual) */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute top-0 left-0 m-0 p-4 w-full h-full pointer-events-none overflow-hidden language-markup font-mono text-sm leading-6"
            style={{ tabSize: 2 }}
          >
            <code className="language-markup font-inherit">{code}</code>
          </pre>

          {/* Editable Layer (Interaction) */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="absolute top-0 left-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none border-none outline-none overflow-auto whitespace-pre z-10 font-mono text-sm leading-6"
            style={{ tabSize: 2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;