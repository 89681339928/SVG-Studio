export enum ExportType {
  PNG_1X = 'png_1x',
  PNG_2X = 'png_2x',
  PNG_4X = 'png_4x',
  SVG = 'svg',
  SVG_LAYERS = 'svg_layers'
}

export type AppTab = 'home' | 'editor' | 'converter' | 'constructor' | 'mobs' | 'structure' | 'environment' | 'landscape' | 'terrain' | 'transport' | 'items' | 'vfx';

export interface ToolbarProps {
  onCopy: () => void;
  onClear: () => void;
  onExport: (type: ExportType) => void;
  isValid: boolean;
  svgCode: string;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export interface EditorProps {
  code: string;
  onChange: (code: string) => void;
  error: string | null;
}

export interface PreviewProps {
  code: string;
  isValid: boolean;
}