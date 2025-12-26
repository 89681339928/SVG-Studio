/**
 * Formats XML/SVG string with indentation.
 */
export const formatXml = (xml: string): string => {
  if (!xml) return '';
  
  try {
    let formatted = '';
    let pad = 0;
    const indent = '  '; // 2 spaces

    // 1. Remove newlines and extra spaces between tags
    const cleanXml = xml.replace(/>\s*</g, '><').trim();
    
    // 2. Split by tags
    // This matches <tag...> OR content between tags
    const tokens = cleanXml.match(/<[^>]+>|[^<]+/g);
    
    // Fallback if regex fails to match anything meaningful
    if (!tokens || tokens.length === 0) return xml;
    
    tokens.forEach(token => {
        if (!token.trim()) return;

        // Check if it's a closing tag </...>
        const isClosing = token.match(/^<\//);
        // Check if it's a self-closing tag <... />
        const isSelfClosing = token.match(/\/>$/);
        // Check if it's an opening tag <...> (and not processing instruction <?...?> or comment <!--...-->)
        const isOpening = token.match(/^<[a-zA-Z]/) && !isSelfClosing && !isClosing;
        
        // Decrease indent before printing closing tag
        if (isClosing) {
            pad = Math.max(0, pad - 1);
        }

        formatted += indent.repeat(pad) + token + '\n';

        // Increase indent after printing opening tag
        if (isOpening) {
            pad++;
        }
    });
    
    return formatted.trim();
  } catch (e) {
    console.warn("XML Formatting failed, returning raw string", e);
    return xml;
  }
};