import JSZip from 'jszip';
import { ExportType } from '../types';

/**
 * Helper to download a Blob
 */
const saveBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Downloads the current SVG code as a single .svg file
 */
export const downloadSvgFile = (svgString: string, filename: string = 'image.svg') => {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  saveBlob(blob, filename);
};

/**
 * Parses SVG, extracts EVERY shape into a separate SVG file (preserving layout), zips them and downloads.
 */
export const downloadSvgLayers = async (svgString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  
  // Select all graphical primitives that constitute "layers"
  const selector = 'path, rect, circle, ellipse, line, polyline, polygon, text, image, use';
  const allShapes = Array.from(doc.querySelectorAll(selector));

  if (allShapes.length === 0) {
    alert("No shapes found to export.");
    return;
  }

  // Ensure unique IDs for reliable selection in clones
  const seenIds = new Set<string>();
  allShapes.forEach((shape, index) => {
    let id = shape.id;
    if (!id || seenIds.has(id)) {
      // Generate a base name
      const baseName = shape.tagName.toLowerCase();
      let newId = id || `${baseName}_${index + 1}`;
      
      // If collision, resolve it
      let counter = 1;
      while (seenIds.has(newId)) {
        newId = `${baseName}_${index + 1}_${counter}`;
        counter++;
      }
      shape.id = newId;
    }
    seenIds.add(shape.id);
  });

  const zip = new JSZip();
  let processedCount = 0;

  // Process each shape
  allShapes.forEach((shape) => {
    const shapeId = shape.id;

    // Clone the entire document to preserve definitions, styles, and hierarchy
    const layerDoc = doc.cloneNode(true) as Document;
    const layerRoot = layerDoc.documentElement;

    // Find the target element in the clone
    const targetInClone = layerDoc.getElementById(shapeId);
    if (!targetInClone) return;

    // Identify the path of ancestors to keep the structure valid
    const ancestors = new Set<Node>();
    let current: Node | null = targetInClone;
    while (current && current !== layerDoc) {
      ancestors.add(current);
      current = current.parentNode;
    }

    // Recursive function to remove unrelated elements
    const cleanTree = (node: Element) => {
      const tagName = node.tagName.toLowerCase();
      
      // Always keep definitions and metadata
      if (['defs', 'style', 'metadata', 'title', 'desc'].includes(tagName)) return;

      // If this is our target, stop (keep it and its children)
      if (node === targetInClone) return;

      // If this is an ancestor, we must keep it but filter its children
      if (ancestors.has(node)) {
        Array.from(node.children).forEach(child => cleanTree(child));
        return;
      }

      // If it's not an ancestor and not the target, remove it
      // This hides siblings and unrelated branches
      node.remove();
    };

    // Start cleaning from the root's children
    Array.from(layerRoot.children).forEach(child => cleanTree(child));

    // Serialize and add to zip
    const serializer = new XMLSerializer();
    const fileContent = serializer.serializeToString(layerDoc);
    
    zip.file(`${shapeId}.svg`, fileContent);
    processedCount++;
  });

  if (processedCount === 0) {
    alert("Could not process layers.");
    return;
  }

  const content = await zip.generateAsync({ type: "blob" });
  saveBlob(content, "svg-layers-separated.zip");
};

/**
 * Downloads the SVG string as a PNG image at the specified scale.
 */
export const downloadPng = async (svgString: string, scale: number) => {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    
    // Create a Blob from the SVG
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      
      // Determine size
      let width = img.width;
      let height = img.height;

      if (width === 0 || height === 0) {
        const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
        if (viewBoxMatch) {
          const parts = viewBoxMatch[1].split(' ').map(Number);
          if (parts.length === 4) {
            width = parts[2];
            height = parts[3];
          }
        }
      }
      
      width = width || 800;
      height = height || 600;

      canvas.width = width * scale;
      canvas.height = height * scale;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          saveBlob(blob, `image-x${scale}.png`);
          URL.revokeObjectURL(url);
          resolve();
        } else {
          reject(new Error("Canvas export failed"));
        }
      }, 'image/png');
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };

    img.src = url;
  });
};