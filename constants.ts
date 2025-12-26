export const INITIAL_SVG = `<svg width="300" height="150" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00a8e1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0077b5;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="cabinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f5f5f5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#cfcfcf;stop-opacity:1" />
    </linearGradient>
  </defs>

  <ellipse cx="150" cy="135" rx="130" ry="10" fill="#000000" opacity="0.2" filter="blur(3px)"/>

  <g id="ozon-van">
    
    <g id="cargo-box">
      <rect x="80" y="20" width="200" height="95" rx="5" fill="url(#bodyGrad)" stroke="#005b9f" stroke-width="2"/>
      
      <clipPath id="box-clip">
        <rect x="80" y="20" width="200" height="95" rx="5"/>
      </clipPath>
      <rect x="60" y="10" width="240" height="60" fill="#ff4081" transform="rotate(20 150 75)" opacity="0.9" clip-path="url(#box-clip)"/>
      
      <g fill="white" transform="translate(130, 65) scale(1.5)">
        <path d="M10,0 A10,10 0 1,0 10,20 A10,10 0 1,0 10,0 M10,5 A5,5 0 1,1 10,15 A5,5 0 1,1 10,5"/>
        <polygon points="25,0 40,0 40,5 30,15 40,15 40,20 22,20 22,15 32,5 22,5"/>
        <path d="M55,0 A10,10 0 1,0 55,20 A10,10 0 1,0 55,0 M55,5 A5,5 0 1,1 55,15 A5,5 0 1,1 55,5" transform="translate(45,0)"/>
        <polygon points="70,0 76,0 86,14 86,0 92,0 92,20 86,20 76,6 76,20 70,20" transform="translate(50,0)"/>
      </g>
    </g>

    <g id="cabin">
      <path d="M 82 25 L 20 35 L 10 60 L 10 105 L 82 105 Z" fill="url(#cabinGrad)" stroke="#9e9e9e" stroke-width="2"/>
      <path d="M 75 40 L 30 45 L 25 65 L 75 65 Z" fill="#b3e5fc" stroke="#81d4fa" stroke-width="1"/>
      <path d="M 28 36 L 12 60 L 22 62 L 32 46 Z" fill="#b3e5fc" opacity="0.7"/>
      <rect x="65" y="75" width="10" height="3" fill="#555"/>
      <path d="M 10 75 L 5 80 L 5 90 L 10 92 Z" fill="#ffeb3b" stroke="#fbc02d"/>
    </g>
    
    <rect x="5" y="100" width="280" height="15" rx="3" fill="#546e7a" />
    
    <g id="wheels">
      <g transform="translate(45, 115)">
        <circle cx="0" cy="0" r="18" fill="#333" stroke="#222" stroke-width="2"/> <circle cx="0" cy="0" r="10" fill="#cfd8dc" stroke="#b0bec5" stroke-width="2"/> <circle cx="0" cy="0" r="3" fill="#546e7a"/> </g>
      <g transform="translate(220, 115)">
        <circle cx="0" cy="0" r="18" fill="#333" stroke="#222" stroke-width="2"/>
        <circle cx="0" cy="0" r="10" fill="#cfd8dc" stroke="#b0bec5" stroke-width="2"/>
        <circle cx="0" cy="0" r="3" fill="#546e7a"/>
      </g>
    </g>
  </g>
</svg>`;