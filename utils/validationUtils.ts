/**
 * Validates XML string using DOMParser.
 * Returns null if valid, or an error message string if invalid.
 */
export const validateXML = (xml: string): string | null => {
  if (!xml.trim()) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "image/svg+xml");
  
  const parserError = doc.querySelector("parsererror");
  if (parserError) {
    // Extract a readable error message
    const div = parserError.querySelector("div");
    return div ? div.textContent : parserError.textContent || "Invalid XML syntax";
  }

  // Basic check for SVG tag to ensure it's not just valid XML but likely SVG
  if (doc.documentElement.tagName.toLowerCase() !== 'svg') {
    return "Root element must be <svg>";
  }

  return null;
};