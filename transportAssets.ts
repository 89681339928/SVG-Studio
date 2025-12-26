export interface Vehicle {
  id: string;
  name: string;
  category: string;
  svg: string; // Inner SVG
}

export type TransportCategory = 'Civilian' | 'Emergency' | 'Industrial' | 'Military' | 'Sci-Fi' | 'Water' | 'Air' | 'Misc';

// Colors to be replaced at runtime
// #BODY = Main body color
// #GLASS = Windshield color
// #DETAIL = Lights/accents
// #TIRE = Wheel/Track color

export const VEHICLES: Vehicle[] = [
    // --- CIVILIAN ---
    { id: 'c_sedan', name: 'Sedan', category: 'Civilian', 
      svg: '<rect x="75" y="40" width="50" height="120" rx="8" fill="#BODY"/><rect x="78" y="70" width="44" height="40" fill="#GLASS" rx="4"/><rect x="78" y="115" width="44" height="5" fill="#DETAIL"/><rect x="68" y="55" width="6" height="15" fill="#TIRE"/><rect x="126" y="55" width="6" height="15" fill="#TIRE"/><rect x="68" y="130" width="6" height="15" fill="#TIRE"/><rect x="126" y="130" width="6" height="15" fill="#TIRE"/>' },
    { id: 'c_suv', name: 'SUV', category: 'Civilian', 
      svg: '<rect x="70" y="30" width="60" height="140" rx="6" fill="#BODY"/><rect x="75" y="60" width="50" height="60" fill="#GLASS"/><rect x="75" y="130" width="50" height="10" fill="#DETAIL"/><rect x="62" y="50" width="8" height="18" fill="#TIRE"/><rect x="130" y="50" width="8" height="18" fill="#TIRE"/><rect x="62" y="130" width="8" height="18" fill="#TIRE"/><rect x="130" y="130" width="8" height="18" fill="#TIRE"/>' },
    { id: 'c_pickup', name: 'Pickup Truck', category: 'Civilian', 
      svg: '<rect x="70" y="30" width="60" height="140" rx="4" fill="#BODY"/><rect x="75" y="60" width="50" height="35" fill="#GLASS"/><rect x="75" y="100" width="50" height="60" fill="#111" opacity="0.3"/><rect x="62" y="50" width="8" height="18" fill="#TIRE"/><rect x="130" y="50" width="8" height="18" fill="#TIRE"/><rect x="62" y="130" width="8" height="18" fill="#TIRE"/><rect x="130" y="130" width="8" height="18" fill="#TIRE"/>' },
    { id: 'c_van', name: 'Delivery Van', category: 'Civilian', 
      svg: '<rect x="70" y="30" width="60" height="140" rx="4" fill="#BODY"/><rect x="72" y="35" width="56" height="20" fill="#GLASS"/><rect x="62" y="50" width="8" height="18" fill="#TIRE"/><rect x="130" y="50" width="8" height="18" fill="#TIRE"/><rect x="62" y="130" width="8" height="18" fill="#TIRE"/><rect x="130" y="130" width="8" height="18" fill="#TIRE"/>' },
    { id: 'c_sport', name: 'Sports Car', category: 'Civilian', 
      svg: '<path d="M80,40 L120,40 L125,60 L125,140 L120,160 L80,160 L75,140 L75,60 Z" fill="#BODY"/><rect x="80" y="70" width="40" height="40" fill="#GLASS" rx="5"/><rect x="70" y="55" width="6" height="15" fill="#TIRE"/><rect x="124" y="55" width="6" height="15" fill="#TIRE"/><rect x="70" y="130" width="8" height="18" fill="#TIRE"/><rect x="122" y="130" width="8" height="18" fill="#TIRE"/>' },
    
    // --- EMERGENCY ---
    { id: 'e_police', name: 'Police Cruiser', category: 'Emergency', 
      svg: '<rect x="75" y="40" width="50" height="120" rx="8" fill="#BODY"/><rect x="78" y="70" width="44" height="40" fill="#GLASS" rx="4"/><rect x="85" y="85" width="30" height="6" fill="#ef4444"/><rect x="85" y="85" width="15" height="6" fill="#3b82f6"/><path d="M75,40 L75,160" stroke="#fff" stroke-width="2" opacity="0.5"/><rect x="68" y="55" width="6" height="15" fill="#TIRE"/><rect x="126" y="55" width="6" height="15" fill="#TIRE"/><rect x="68" y="130" width="6" height="15" fill="#TIRE"/><rect x="126" y="130" width="6" height="15" fill="#TIRE"/>' },
    { id: 'e_ambulance', name: 'Ambulance', category: 'Emergency', 
      svg: '<rect x="70" y="30" width="60" height="140" rx="4" fill="#fff"/><rect x="85" y="80" width="30" height="60" fill="none" stroke="#ef4444" stroke-width="8"/><path d="M100,80 L100,140 M85,110 L115,110" stroke="#ef4444" stroke-width="8"/><rect x="72" y="35" width="56" height="20" fill="#GLASS"/><rect x="62" y="50" width="8" height="18" fill="#TIRE"/><rect x="130" y="50" width="8" height="18" fill="#TIRE"/><rect x="62" y="130" width="8" height="18" fill="#TIRE"/><rect x="130" y="130" width="8" height="18" fill="#TIRE"/>' },
    { id: 'e_fire', name: 'Fire Engine', category: 'Emergency', 
      svg: '<rect x="65" y="20" width="70" height="160" rx="4" fill="#ef4444"/><rect x="70" y="30" width="60" height="30" fill="#GLASS"/><rect x="75" y="70" width="50" height="100" fill="#cc0000"/><rect x="80" y="80" width="40" height="80" fill="#eee" opacity="0.5"/><rect x="60" y="40" width="6" height="20" fill="#TIRE"/><rect x="134" y="40" width="6" height="20" fill="#TIRE"/><rect x="60" y="120" width="6" height="20" fill="#TIRE"/><rect x="134" y="120" width="6" height="20" fill="#TIRE"/><rect x="60" y="150" width="6" height="20" fill="#TIRE"/><rect x="134" y="150" width="6" height="20" fill="#TIRE"/>' },
    
    // --- INDUSTRIAL ---
    { id: 'i_taxi', name: 'Taxi', category: 'Civilian', 
      svg: '<rect x="75" y="40" width="50" height="120" rx="8" fill="#facc15"/><rect x="78" y="70" width="44" height="40" fill="#GLASS" rx="4"/><rect x="75" y="40" width="50" height="20" fill="#000" opacity="0.1"/><rect x="68" y="55" width="6" height="15" fill="#TIRE"/><rect x="126" y="55" width="6" height="15" fill="#TIRE"/><rect x="68" y="130" width="6" height="15" fill="#TIRE"/><rect x="126" y="130" width="6" height="15" fill="#TIRE"/>' },
    { id: 'i_truck', name: 'Semi Truck (Cab)', category: 'Industrial', 
      svg: '<rect x="65" y="50" width="70" height="60" rx="4" fill="#BODY"/><rect x="70" y="55" width="60" height="20" fill="#GLASS"/><rect x="60" y="60" width="6" height="20" fill="#TIRE"/><rect x="134" y="60" width="6" height="20" fill="#TIRE"/><rect x="60" y="100" width="6" height="20" fill="#TIRE"/><rect x="134" y="100" width="6" height="20" fill="#TIRE"/><rect x="90" y="110" width="20" height="10" fill="#333"/>' },
    { id: 'i_trailer', name: 'Cargo Trailer', category: 'Industrial', 
      svg: '<rect x="65" y="20" width="70" height="160" fill="#e5e5e5" stroke="#999" stroke-width="2"/><line x1="65" y1="60" x2="135" y2="60" stroke="#ccc"/><line x1="65" y1="100" x2="135" y2="100" stroke="#ccc"/><line x1="65" y1="140" x2="135" y2="140" stroke="#ccc"/>' },
    { id: 'i_bus', name: 'City Bus', category: 'Industrial', 
      svg: '<rect x="65" y="10" width="70" height="180" rx="6" fill="#BODY"/><rect x="70" y="20" width="60" height="20" fill="#GLASS"/><rect x="70" y="50" width="60" height="100" fill="#GLASS" opacity="0.6"/><rect x="60" y="40" width="6" height="20" fill="#TIRE"/><rect x="134" y="40" width="6" height="20" fill="#TIRE"/><rect x="60" y="150" width="6" height="20" fill="#TIRE"/><rect x="134" y="150" width="6" height="20" fill="#TIRE"/>' },
    { id: 'i_excavator', name: 'Excavator', category: 'Industrial', 
      svg: '<rect x="70" y="60" width="60" height="60" fill="#facc15"/><rect x="60" y="50" width="10" height="80" fill="#333"/><rect x="130" y="50" width="10" height="80" fill="#333"/><circle cx="100" cy="90" r="15" fill="#GLASS" opacity="0.5"/><rect x="90" y="20" width="20" height="60" fill="#facc15"/><rect x="80" y="10" width="40" height="10" fill="#333"/>' },
    { id: 'i_bulldozer', name: 'Bulldozer', category: 'Industrial', 
      svg: '<rect x="70" y="50" width="60" height="70" fill="#facc15"/><rect x="60" y="50" width="10" height="70" fill="#333"/><rect x="130" y="50" width="10" height="70" fill="#333"/><rect x="50" y="20" width="100" height="20" fill="#333"/><path d="M70,40 L70,50 M130,40 L130,50" stroke="#333" stroke-width="4"/>' },
    { id: 'i_forklift', name: 'Forklift', category: 'Industrial', 
      svg: '<rect x="80" y="80" width="40" height="50" fill="#facc15"/><rect x="60" y="40" width="80" height="5" fill="#333"/><line x1="80" y1="45" x2="80" y2="80" stroke="#333" stroke-width="4"/><line x1="120" y1="45" x2="120" y2="80" stroke="#333" stroke-width="4"/><rect x="75" y="90" width="6" height="10" fill="#TIRE"/><rect x="119" y="90" width="6" height="10" fill="#TIRE"/><rect x="85" y="125" width="6" height="10" fill="#TIRE"/><rect x="109" y="125" width="6" height="10" fill="#TIRE"/>' },

    // --- MILITARY ---
    { id: 'm_tank', name: 'Main Battle Tank', category: 'Military', 
      svg: '<rect x="65" y="40" width="70" height="120" rx="2" fill="#BODY"/><rect x="55" y="30" width="15" height="140" fill="#TIRE"/><rect x="130" y="30" width="15" height="140" fill="#TIRE"/><circle cx="100" cy="100" r="25" fill="#DARK_COLOR"/><rect x="95" y="10" width="10" height="90" fill="#DARK_COLOR"/><rect x="90" y="100" width="20" height="10" fill="#DETAIL"/>' },
    { id: 'm_apc', name: 'APC', category: 'Military', 
      svg: '<rect x="65" y="30" width="70" height="140" rx="4" fill="#BODY"/><rect x="60" y="40" width="8" height="25" fill="#TIRE"/><rect x="132" y="40" width="8" height="25" fill="#TIRE"/><rect x="60" y="80" width="8" height="25" fill="#TIRE"/><rect x="132" y="80" width="8" height="25" fill="#TIRE"/><rect x="60" y="120" width="8" height="25" fill="#TIRE"/><rect x="132" y="120" width="8" height="25" fill="#TIRE"/><circle cx="100" cy="80" r="12" fill="#DARK_COLOR"/>' },
    { id: 'm_jeep', name: 'Military Jeep', category: 'Military', 
      svg: '<rect x="70" y="40" width="60" height="100" rx="4" fill="#BODY"/><rect x="75" y="70" width="50" height="5" fill="#GLASS"/><rect x="62" y="50" width="8" height="18" fill="#TIRE"/><rect x="130" y="50" width="8" height="18" fill="#TIRE"/><rect x="62" y="120" width="8" height="18" fill="#TIRE"/><rect x="130" y="120" width="8" height="18" fill="#TIRE"/><circle cx="100" cy="130" r="10" fill="#DETAIL" opacity="0.5"/>' },
    { id: 'm_truck', name: 'Troop Truck', category: 'Military', 
      svg: '<rect x="65" y="20" width="70" height="160" rx="2" fill="#BODY"/><rect x="70" y="30" width="60" height="30" fill="#GLASS" opacity="0.3"/><rect x="70" y="70" width="60" height="100" fill="#DARK_COLOR" opacity="0.4"/><path d="M65,70 L135,70 M65,100 L135,100 M65,130 L135,130 M65,160 L135,160" stroke="#DARK_COLOR" opacity="0.5"/>' },
    { id: 'm_missile', name: 'Missile Launcher', category: 'Military', 
      svg: '<rect x="65" y="30" width="70" height="140" fill="#BODY"/><rect x="75" y="80" width="10" height="80" fill="#fff"/><rect x="95" y="80" width="10" height="80" fill="#fff"/><rect x="115" y="80" width="10" height="80" fill="#fff"/><circle cx="80" cy="80" r="4" fill="#ef4444"/><circle cx="100" cy="80" r="4" fill="#ef4444"/><circle cx="120" cy="80" r="4" fill="#ef4444"/>' },

    // --- SCI-FI ---
    { id: 's_hover', name: 'Hover Car', category: 'Sci-Fi', 
      svg: '<path d="M80,40 Q120,40 120,60 L120,140 Q120,160 80,160 Q40,160 40,140 L40,60 Q40,40 80,40" transform="translate(20,0)" fill="#BODY"/><circle cx="100" cy="100" r="15" fill="#DETAIL" filter="blur(5px)" opacity="0.6"/><rect x="60" y="50" width="10" height="20" fill="#06b6d4" filter="blur(2px)"/><rect x="130" y="50" width="10" height="20" fill="#06b6d4" filter="blur(2px)"/><rect x="60" y="130" width="10" height="20" fill="#06b6d4" filter="blur(2px)"/><rect x="130" y="130" width="10" height="20" fill="#06b6d4" filter="blur(2px)"/>' },
    { id: 's_mech', name: 'Battle Mech', category: 'Sci-Fi', 
      svg: '<circle cx="100" cy="100" r="30" fill="#BODY"/><rect x="50" y="80" width="20" height="40" rx="5" fill="#DARK_COLOR"/><rect x="130" y="80" width="20" height="40" rx="5" fill="#DARK_COLOR"/><rect x="40" y="60" width="10" height="30" fill="#DETAIL"/><rect x="150" y="60" width="10" height="30" fill="#DETAIL"/><circle cx="100" cy="100" r="10" fill="#GLASS"/>' },
    { id: 's_bike', name: 'Light Cycle', category: 'Sci-Fi', 
      svg: '<rect x="90" y="40" width="20" height="120" fill="#BODY"/><rect x="92" y="60" width="16" height="40" fill="#GLASS"/><line x1="100" y1="40" x2="100" y2="180" stroke="#DETAIL" stroke-width="2" filter="blur(1px)"/><rect x="85" y="140" width="30" height="10" fill="#TIRE"/>' },
    { id: 's_drone', name: 'Cargo Drone', category: 'Sci-Fi', 
      svg: '<circle cx="100" cy="100" r="20" fill="#BODY"/><line x1="50" y1="50" x2="150" y2="150" stroke="#DARK_COLOR" stroke-width="4"/><line x1="150" y1="50" x2="50" y2="150" stroke="#DARK_COLOR" stroke-width="4"/><circle cx="50" cy="50" r="15" fill="#GLASS" opacity="0.5"/><circle cx="150" cy="50" r="15" fill="#GLASS" opacity="0.5"/><circle cx="50" cy="150" r="15" fill="#GLASS" opacity="0.5"/><circle cx="150" cy="150" r="15" fill="#GLASS" opacity="0.5"/>' },
    { id: 's_tank', name: 'Hover Tank', category: 'Sci-Fi', 
      svg: '<path d="M60,40 L140,40 L150,160 L50,160 Z" fill="#BODY"/><circle cx="100" cy="110" r="25" fill="#DARK_COLOR"/><rect x="95" y="10" width="10" height="100" fill="#DETAIL"/><circle cx="100" cy="160" r="10" fill="#06b6d4" filter="blur(5px)"/>' },

    // --- AIR ---
    { id: 'a_heli', name: 'Helicopter', category: 'Air', 
      svg: '<ellipse cx="100" cy="100" rx="20" ry="40" fill="#BODY"/><rect x="95" y="130" width="10" height="60" fill="#BODY"/><rect x="80" y="180" width="40" height="5" fill="#BODY"/><circle cx="100" cy="100" r="5" fill="#DARK_COLOR"/><line x1="50" y1="50" x2="150" y2="150" stroke="#333" stroke-width="2" opacity="0.5"/><line x1="150" y1="50" x2="50" y2="150" stroke="#333" stroke-width="2" opacity="0.5"/><circle cx="100" cy="100" r="70" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="5 5" opacity="0.3"/>' },
    { id: 'a_plane', name: 'Small Plane', category: 'Air', 
      svg: '<path d="M95,20 L105,20 L105,160 L100,180 L95,160 Z" fill="#BODY"/><rect x="20" y="60" width="160" height="20" fill="#BODY"/><rect x="70" y="160" width="60" height="10" fill="#BODY"/><circle cx="100" cy="20" r="2" fill="#DETAIL"/><rect x="95" y="50" width="10" height="10" fill="#GLASS"/>' },
    { id: 'a_jet', name: 'Fighter Jet', category: 'Air', 
      svg: '<path d="M100,10 L115,100 L150,140 L150,160 L110,150 L110,170 L120,180 L80,180 L90,170 L90,150 L50,160 L50,140 L85,100 Z" fill="#BODY"/><rect x="95" y="60" width="10" height="20" fill="#GLASS"/>' },
    { id: 'a_airliner', name: 'Airliner', category: 'Air', 
      svg: '<rect x="90" y="20" width="20" height="160" rx="10" fill="#BODY"/><path d="M90,70 L10,100 L10,120 L90,100" fill="#BODY"/><path d="M110,70 L190,100 L190,120 L110,100" fill="#BODY"/><path d="M90,160 L70,180 L130,180 L110,160" fill="#BODY"/>' },

    // --- WATER ---
    { id: 'w_boat', name: 'Speedboat', category: 'Water', 
      svg: '<path d="M100,10 Q140,40 140,160 L100,160 L60,160 Q60,40 100,10" fill="#BODY"/><rect x="70" y="100" width="60" height="40" fill="#GLASS" opacity="0.5"/><rect x="70" y="150" width="60" height="10" fill="#DETAIL"/>' },
    { id: 'w_yacht', name: 'Yacht', category: 'Water', 
      svg: '<path d="M100,10 Q150,50 150,180 L50,180 Q50,50 100,10" fill="#fff"/><rect x="70" y="80" width="60" height="80" fill="#e5e5e5"/><rect x="60" y="160" width="80" height="10" fill="#d4a373"/>' },
    { id: 'w_sub', name: 'Submarine', category: 'Water', 
      svg: '<rect x="80" y="20" width="40" height="160" rx="20" fill="#BODY"/><circle cx="100" cy="100" r="10" fill="#GLASS"/><line x1="100" y1="20" x2="100" y2="180" stroke="#333" opacity="0.2"/><rect x="70" y="80" width="10" height="20" fill="#BODY"/><rect x="120" y="80" width="10" height="20" fill="#BODY"/>' },
    { id: 'w_jetski', name: 'Jet Ski', category: 'Water', 
      svg: '<path d="M100,50 Q120,70 120,130 L80,130 Q80,70 100,50" fill="#BODY"/><rect x="85" y="90" width="30" height="10" fill="#333"/><line x1="80" y1="100" x2="120" y2="100" stroke="#333" stroke-width="2"/>' },
    { id: 'w_barge', name: 'Cargo Barge', category: 'Water', 
      svg: '<rect x="60" y="20" width="80" height="160" fill="#57534e"/><rect x="70" y="30" width="60" height="120" fill="#333"/><rect x="75" y="35" width="50" height="30" fill="#ef4444"/><rect x="75" y="70" width="50" height="30" fill="#3b82f6"/><rect x="75" y="105" width="50" height="30" fill="#eab308"/>' },

    // --- MISC ---
    { id: 'x_bike', name: 'Bicycle', category: 'Misc', 
      svg: '<rect x="98" y="50" width="4" height="100" fill="#BODY"/><rect x="80" y="50" width="40" height="2" fill="#333"/><rect x="90" y="140" width="20" height="5" fill="#333"/><line x1="100" y1="40" x2="100" y2="160" stroke="#333" stroke-width="2" opacity="0.5"/>' },
    { id: 'x_moto', name: 'Motorcycle', category: 'Misc', 
      svg: '<rect x="95" y="50" width="10" height="100" fill="#BODY"/><rect x="85" y="60" width="30" height="10" fill="#333"/><rect x="90" y="110" width="20" height="20" fill="#333"/><rect x="95" y="40" width="10" height="20" fill="#TIRE"/><rect x="95" y="140" width="10" height="20" fill="#TIRE"/>' },
    { id: 'x_ufo', name: 'UFO', category: 'Misc', 
      svg: '<circle cx="100" cy="100" r="40" fill="#e5e5e5"/><circle cx="100" cy="100" r="15" fill="#GLASS"/><circle cx="100" cy="65" r="3" fill="#DETAIL"/><circle cx="135" cy="100" r="3" fill="#DETAIL"/><circle cx="100" cy="135" r="3" fill="#DETAIL"/><circle cx="65" cy="100" r="3" fill="#DETAIL"/>' }
];
