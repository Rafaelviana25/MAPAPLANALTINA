import { PresetImage, SequencePreset, Translations } from "./types";

// Programmatic SVGs to avoid CORS / slow network requests
const BLUEPRINT_SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" style="background:#0a1e36; font-family:monospace;">
  <!-- Grid Lines -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#004b87" stroke-width="0.5"/>
      <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#0066b2" stroke-width="1.2"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#061324"/>
  <rect width="100%" height="100%" fill="url(#grid)" />
  
  <!-- Outer Tech Border -->
  <rect x="20" y="20" width="760" height="760" fill="none" stroke="#00a2e8" stroke-width="2" stroke-opacity="0.5"/>
  <rect x="25" y="25" width="750" height="750" fill="none" stroke="#00a2e8" stroke-width="0.5" stroke-dasharray="10, 5" stroke-opacity="0.3"/>
  
  <!-- Technical Schematics -->
  <!-- Main Circle Assembly -->
  <circle cx="400" cy="400" r="180" fill="none" stroke="#00a2e8" stroke-width="3" stroke-opacity="0.8"/>
  <circle cx="400" cy="400" r="220" fill="none" stroke="#00a2e8" stroke-width="1" stroke-dasharray="15, 10" stroke-opacity="0.6"/>
  <circle cx="400" cy="400" r="100" fill="none" stroke="#00a2e8" stroke-width="1.5" stroke-opacity="0.7"/>
  <circle cx="400" cy="400" r="50" fill="none" stroke="#00a2e8" stroke-width="2" stroke-opacity="0.9"/>
  
  <!-- Gears / Teeth -->
  <g transform="translate(400, 400)">
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(30)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(30)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(60)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(60)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(90)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(90)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(120)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(120)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(150)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(150)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(180)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(180)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(210)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(210)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(240)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(240)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(270)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(270)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(300)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(300)" />
    <line x1="0" y1="-180" x2="0" y2="-200" stroke="#00a2e8" stroke-width="4" stroke-opacity="0.8" transform="rotate(330)" />
    <circle cx="0" cy="-140" r="6" fill="none" stroke="#00a2e8" stroke-width="1.5" transform="rotate(330)" />
  </g>
  
  <!-- Dimensions Lines -->
  <line x1="150" y1="400" x2="650" y2="400" stroke="#00ffff" stroke-width="0.8" stroke-dasharray="5,5" stroke-opacity="0.4" />
  <line x1="400" y1="150" x2="400" y2="650" stroke="#00ffff" stroke-width="0.8" stroke-dasharray="5,5" stroke-opacity="0.4" />
  
  <!-- Precision Dimension Callouts -->
  <g stroke="#00ffff" stroke-width="1" fill="#00ffff" font-size="12">
    <!-- horizontal indicator -->
    <path d="M 220 380 L 220 350 M 580 380 L 580 350" fill="none" stroke-opacity="0.7"/>
    <path d="M 220 360 L 580 360" fill="none" stroke-opacity="0.7"/>
    <text x="400" y="352" text-anchor="middle">Ø 360.00 mm</text>
    
    <!-- vertical indicator -->
    <path d="M 420 220 L 450 220 M 420 580 L 450 580" fill="none" stroke-opacity="0.7"/>
    <path d="M 440 220 L 440 580" fill="none" stroke-opacity="0.7"/>
    <text x="455" y="405" text-anchor="start" transform="rotate(90 455 405)">H-DIM: 360.00 mm</text>
  </g>

  <!-- Technical Labels -->
  <g fill="#00a2e8" font-size="11" opacity="0.8">
    <text x="40" y="55">MODEL: CORE-VISUALIZER-V2</text>
    <text x="40" y="75">SCALE: 1:1 FULL PRECISION</text>
    <text x="40" y="95">MATERIAL: Programmatic Canvas</text>
    <text x="40" y="115">UNIT: METRIC (MM)</text>
    
    <text x="760" y="55" text-anchor="end">SYS_STATUS: ACTIVE</text>
    <text x="760" y="75" text-anchor="end">ANGLE_STEP: 360° VIEW</text>
    <text x="760" y="95" text-anchor="end">COMPILER: GEMINI-3.5</text>
  </g>

  <!-- Corner Tech Borders -->
  <path d="M 20 50 L 20 20 L 50 20" fill="none" stroke="#00ffff" stroke-width="4"/>
  <path d="M 780 50 L 780 20 L 750 20" fill="none" stroke="#00ffff" stroke-width="4"/>
  <path d="M 20 750 L 20 780 L 50 780" fill="none" stroke="#00ffff" stroke-width="4"/>
  <path d="M 780 750 L 780 780 L 750 780" fill="none" stroke="#00ffff" stroke-width="4"/>

  <!-- Logo Widget -->
  <g transform="translate(620, 680)">
    <rect width="140" height="80" fill="#004b87" fill-opacity="0.2" stroke="#00a2e8" stroke-width="1.5" />
    <text x="70" y="25" fill="#00ffff" font-size="12" font-weight="bold" text-anchor="middle">APPROVED</text>
    <line x1="10" y1="35" x2="130" y2="35" stroke="#00a2e8" stroke-width="1" />
    <text x="70" y="55" fill="#00a2e8" font-size="10" text-anchor="middle">ENGINEERING CORP</text>
    <text x="70" y="70" fill="#00a2e8" font-size="8" text-anchor="middle">ID: 626251FE</text>
  </g>
</svg>`;

const GEOMETRIC_MAP_SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" style="background:#020617;">
  <!-- Grid -->
  <defs>
    <pattern id="gridMap" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#090d16"/>
  <rect width="100%" height="100%" fill="url(#gridMap)" />

  <!-- Dotted world map representation (glowing nodes) -->
  <g opacity="0.6">
    <!-- North America -->
    <path d="M 120 200 L 180 180 L 240 230 L 220 320 L 160 300 Q 120 280 120 200 Z" fill="#22c55e" fill-opacity="0.2" stroke="#22c55e" stroke-width="2"/>
    <circle cx="150" cy="220" r="12" fill="#22c55e" fill-opacity="0.4" />
    <circle cx="210" cy="260" r="8" fill="#22c55e" fill-opacity="0.4" />
    
    <!-- South America -->
    <path d="M 220 380 L 280 400 L 270 540 L 230 580 L 200 480 Z" fill="#22c55e" fill-opacity="0.2" stroke="#22c55e" stroke-width="2"/>
    <circle cx="250" cy="450" r="15" fill="#22c55e" fill-opacity="0.4" />
    <circle cx="230" cy="520" r="10" fill="#22c55e" fill-opacity="0.4" />

    <!-- Eurasia -->
    <path d="M 380 160 L 520 150 L 680 180 L 700 320 L 580 340 L 460 300 Z" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
    <circle cx="450" cy="200" r="18" fill="#10b981" fill-opacity="0.4" />
    <circle cx="580" cy="240" r="14" fill="#10b981" fill-opacity="0.4" />
    <circle cx="630" cy="210" r="10" fill="#10b981" fill-opacity="0.4" />

    <!-- Africa -->
    <path d="M 380 350 L 450 340 L 490 420 L 450 520 L 410 460 Q 380 400 380 350 Z" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
    <circle cx="430" cy="400" r="14" fill="#10b981" fill-opacity="0.4" />
    <circle cx="450" cy="470" r="9" fill="#10b981" fill-opacity="0.4" />

    <!-- Australia -->
    <path d="M 600 460 L 680 470 L 670 540 L 590 520 Z" fill="#059669" fill-opacity="0.2" stroke="#059669" stroke-width="2"/>
    <circle cx="630" cy="500" r="11" fill="#059669" fill-opacity="0.4" />
  </g>

  <!-- Navigation Grid / Earth Lat-Long circles -->
  <circle cx="400" cy="400" r="320" fill="none" stroke="#334155" stroke-width="1.5" />
  <circle cx="400" cy="400" r="240" fill="none" stroke="#334155" stroke-width="1" stroke-dasharray="8,4" />
  <circle cx="400" cy="400" r="150" fill="none" stroke="#334155" stroke-width="1" />
  
  <!-- Equator Line -->
  <line x1="50" y1="400" x2="750" y2="400" stroke="#475569" stroke-width="1.5" stroke-dasharray="10, 5" />
  <!-- Prime Meridian Line -->
  <line x1="400" y1="50" x2="400" y2="750" stroke="#475569" stroke-width="1.5" stroke-dasharray="10, 5" />

  <!-- Compass Rose -->
  <g transform="translate(120, 680)">
    <circle cx="0" cy="0" r="45" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.4"/>
    <path d="M 0 -55 L 8 -15 L 0 0 L -8 -15 Z" fill="#10b981" />
    <path d="M 0 55 L 8 15 L 0 0 L -8 15 Z" fill="#047857" />
    <path d="M 55 0 L 15 8 L 0 0 L 15 -8 Z" fill="#10b981" />
    <path d="M -55 0 L -15 8 L 0 0 L -15 -8 Z" fill="#047857" />
    <text x="0" y="-60" fill="#10b981" font-size="12" font-family="monospace" text-anchor="middle" font-weight="bold">N</text>
    <text x="0" y="70" fill="#10b981" font-size="12" font-family="monospace" text-anchor="middle" font-weight="bold">S</text>
    <text x="70" y="4" fill="#10b981" font-size="12" font-family="monospace" text-anchor="middle" font-weight="bold">E</text>
    <text x="-75" y="4" fill="#10b981" font-size="12" font-family="monospace" text-anchor="middle" font-weight="bold">W</text>
  </g>

  <!-- HUD telemetry -->
  <g fill="#10b981" font-family="monospace" font-size="11" opacity="0.8">
    <text x="600" y="650">COORDINATES: WORLDPROJ_V4</text>
    <text x="600" y="670">LATITUDE : 23° 32' 51" S</text>
    <text x="600" y="690">LONGITUDE: 46° 38' 10" W</text>
    <text x="600" y="710">BEARING  : 142.8° SW</text>
    <text x="600" y="730">ALTITUDE : 760m ASL</text>
  </g>
</svg>`;

const NEON_GRID_SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" style="background:#0b0214;">
  <!-- Futuristic grid effect -->
  <defs>
    <linearGradient id="neonGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ec4899" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>

  <!-- Horizontal grid radiating from center perspective -->
  <g stroke="#8b5cf6" stroke-opacity="0.2" stroke-width="1.5">
    <line x1="0" y1="0" x2="0" y2="800" />
    <line x1="40" y1="0" x2="40" y2="800" />
    <line x1="80" y1="0" x2="80" y2="800" />
    <line x1="120" y1="0" x2="120" y2="800" />
    <line x1="160" y1="0" x2="160" y2="800" />
    <line x1="200" y1="0" x2="200" y2="800" />
    <line x1="240" y1="0" x2="240" y2="800" />
    <line x1="280" y1="0" x2="280" y2="800" />
    <line x1="320" y1="0" x2="320" y2="800" />
    <line x1="360" y1="0" x2="360" y2="800" />
    <line x1="400" y1="0" x2="400" y2="800" />
    <line x1="440" y1="0" x2="440" y2="800" />
    <line x1="480" y1="0" x2="480" y2="800" />
    <line x1="520" y1="0" x2="520" y2="800" />
    <line x1="560" y1="0" x2="560" y2="800" />
    <line x1="600" y1="0" x2="600" y2="800" />
    <line x1="640" y1="0" x2="640" y2="800" />
    <line x1="680" y1="0" x2="680" y2="800" />
    <line x1="720" y1="0" x2="720" y2="800" />
    <line x1="760" y1="0" x2="760" y2="800" />
    <line x1="800" y1="0" x2="800" y2="800" />

    <line x1="0" y1="0" x2="800" y2="0" />
    <line x1="0" y1="40" x2="800" y2="40" />
    <line x1="0" y1="80" x2="800" y2="80" />
    <line x1="0" y1="120" x2="800" y2="120" />
    <line x1="0" y1="160" x2="800" y2="160" />
    <line x1="0" y1="200" x2="800" y2="200" />
    <line x1="0" y1="240" x2="800" y2="240" />
    <line x1="0" y1="280" x2="800" y2="280" />
    <line x1="0" y1="320" x2="800" y2="320" />
    <line x1="0" y1="360" x2="800" y2="360" />
    <line x1="0" y1="400" x2="800" y2="400" />
    <line x1="0" y1="440" x2="800" y2="440" />
    <line x1="0" y1="480" x2="800" y2="480" />
    <line x1="0" y1="520" x2="800" y2="520" />
    <line x1="0" y1="560" x2="800" y2="560" />
    <line x1="0" y1="600" x2="800" y2="600" />
    <line x1="0" y1="640" x2="800" y2="640" />
    <line x1="0" y1="680" x2="800" y2="680" />
    <line x1="0" y1="720" x2="800" y2="720" />
    <line x1="0" y1="760" x2="800" y2="760" />
    <line x1="0" y1="800" x2="800" y2="800" />
  </g>

  <!-- Outer HUD circle elements -->
  <circle cx="400" cy="400" r="300" fill="none" stroke="#ec4899" stroke-width="2" stroke-opacity="0.4" />
  <circle cx="400" cy="400" r="280" fill="none" stroke="#3b82f6" stroke-width="1" stroke-dasharray="5,15" stroke-opacity="0.6" />
  <circle cx="400" cy="400" r="150" fill="none" stroke="url(#neonGlow)" stroke-width="4" stroke-opacity="0.7" />

  <!-- Trippy concentric shapes -->
  <polygon points="400,200 573,300 573,500 400,600 227,500 227,300" fill="none" stroke="#ec4899" stroke-width="2" stroke-opacity="0.5" />
  <polygon points="400,250 530,325 530,475 400,550 270,475 270,325" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.6" />
  
  <!-- Glowing central core -->
  <circle cx="400" cy="400" r="40" fill="#ffffff" />
  <circle cx="400" cy="400" r="60" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.8" />

  <!-- Floating HUD nodes -->
  <g fill="#ec4899" font-family="monospace" font-size="12" font-weight="bold">
    <text x="400" y="80" text-anchor="middle" fill="#ec4899">CYBER-SYNAPSE NETWORK v9.0</text>
    <rect x="300" y="100" width="200" height="4" fill="#ec4899" />
    <text x="140" y="300" text-anchor="end" fill="#3b82f6">NODE_01: ACTIVE</text>
    <text x="140" y="320" text-anchor="end" fill="#3b82f6">DATA_STREAM: SECURE</text>
    <text x="660" y="300" text-anchor="start" fill="#ec4899">RESONANCE: 98.4%</text>
    <text x="660" y="320" text-anchor="start" fill="#ec4899">SYNAPSE: CLAMPED</text>
  </g>
</svg>`;

const FINE_ART_SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" style="background:#fff7ed;">
  <!-- Abstract artistic background -->
  <defs>
    <linearGradient id="warmSun" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffedd5" />
      <stop offset="50%" stop-color="#fdba74" />
      <stop offset="100%" stop-color="#f97316" />
    </linearGradient>
    <linearGradient id="coolSky" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
  </defs>

  <!-- Large structural organic shapes -->
  <path d="M 100 800 Q 200 450 400 550 T 700 800 Z" fill="#ea580c" opacity="0.8" />
  <path d="M 0 600 Q 150 400 300 480 T 600 600 Z" fill="#f97316" opacity="0.6" />
  
  <!-- Big artistic glowing sun -->
  <circle cx="400" cy="300" r="160" fill="url(#warmSun)" />
  <circle cx="400" cy="300" r="180" fill="none" stroke="#ea580c" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="5,10" />

  <!-- Geometric intersecting lines for art contrast -->
  <line x1="100" y1="100" x2="700" y2="700" stroke="#78350f" stroke-width="2" stroke-opacity="0.4" />
  <line x1="700" y1="100" x2="100" y2="700" stroke="#78350f" stroke-width="1" stroke-opacity="0.4" />
  
  <!-- Modernist black focal curves -->
  <path d="M 200 200 Q 400 100 600 200" fill="none" stroke="#1c1917" stroke-width="6" stroke-linecap="round" />
  <path d="M 200 250 Q 400 150 600 250" fill="none" stroke="#1c1917" stroke-width="3" stroke-linecap="round" />
  <path d="M 200 300 Q 400 200 600 300" fill="none" stroke="#1c1917" stroke-width="1.5" stroke-linecap="round" />

  <!-- Small details (modern abstract composition) -->
  <circle cx="300" cy="220" r="18" fill="#0284c7" />
  <circle cx="500" cy="220" r="14" fill="#0f766e" />
  <rect x="380" y="440" width="40" height="120" fill="#1c1917" rx="6" />
  <circle cx="400" cy="510" r="8" fill="#fff7ed" />

  <!-- Frame Border -->
  <rect x="30" y="30" width="740" height="740" fill="none" stroke="#78350f" stroke-width="3" stroke-opacity="0.6" />
</svg>`;

export const BLUEPRINT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(BLUEPRINT_SVG_CONTENT)}`;
export const GEOMETRIC_MAP_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(GEOMETRIC_MAP_SVG_CONTENT)}`;
export const NEON_GRID_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(NEON_GRID_SVG_CONTENT)}`;
export const FINE_ART_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(FINE_ART_SVG_CONTENT)}`;

export const PRESET_IMAGES: PresetImage[] = [
  {
    id: "blueprint",
    namePt: "Esquemático Técnico (Azul)",
    nameEn: "Technical Blueprint (Blue)",
    url: BLUEPRINT_SVG,
    category: "diagram",
  },
  {
    id: "map",
    namePt: "Mapa Global de Navegação",
    nameEn: "Global Navigation Map",
    url: GEOMETRIC_MAP_SVG,
    category: "texture",
  },
  {
    id: "neon",
    namePt: "Grelha Cibernética Holográfica",
    nameEn: "Holographic Cyber Grid",
    url: NEON_GRID_SVG,
    category: "texture",
  },
  {
    id: "art",
    namePt: "Pintura Abstrata Minimalista",
    nameEn: "Minimalist Abstract Art",
    url: FINE_ART_SVG,
    category: "art",
  },
];

export const SEQUENCE_PRESETS: SequencePreset[] = [
  {
    id: "globe",
    namePt: "Globo Terrestre Holográfico",
    nameEn: "Holographic Earth Globe",
    framesCount: 18,
    type: "globe",
  },
  {
    id: "watch",
    namePt: "Relógio de Luxo Mecânico",
    nameEn: "Mechanical Luxury Watch",
    framesCount: 18,
    type: "watch",
  },
  {
    id: "camera",
    namePt: "Câmera Vintage Analógica",
    nameEn: "Retro Analog Camera",
    framesCount: 18,
    type: "camera",
  },
  {
    id: "shoe",
    namePt: "Tênis Esportivo Futurista",
    nameEn: "Futuristic Sport Sneaker",
    framesCount: 18,
    type: "shoe",
  },
];

export const TRANSLATIONS: Record<"pt" | "en", Translations> = {
  pt: {
    title: "Visualizador 3D de Imagens",
    subtitle: "Gire em 3D, aplique filtros de iluminação e explore imagens sob qualquer ângulo",
    uploadBtn: "Selecionar Imagem",
    dragDropText: "Arraste e solte uma imagem aqui",
    or: "ou",
    webcamBtn: "Tirar Foto com Webcam",
    presetsTitle: "Galeria de Amostras",
    modeTitle: "Modo de Projeção",
    modePlane: "Plano Interativo",
    modeCube: "Cubo 3D Mapeado",
    modeCylinder: "Cilindro Texturizado",
    modeSphere: "Esfera / Globo 3D",
    modeSequence: "Objeto 360° Realista",
    adjustmentsTitle: "Filtros e Ajustes de Imagem",
    brightness: "Brilho",
    contrast: "Contraste",
    saturation: "Saturação",
    hueRotate: "Matiz (Hue)",
    grayscale: "Grayscale (Cinza)",
    sepia: "Efeito Sépia",
    blur: "Desfoque",
    invert: "Inverter Cores",
    resetAdjustments: "Redefinir Filtros",
    resetAll: "Redefinir Tudo",
    transformsTitle: "Rotação Tridimensional (3D)",
    rotationX: "Rotação X (Inclinar)",
    rotationY: "Rotação Y (Girar Lado)",
    rotationZ: "Rotação Z (Inclinar Lado)",
    zoom: "Nível de Zoom / Escala",
    quickAngles: "Ângulos Rápidos de Visualização",
    front: "Frente",
    back: "Costas",
    top: "Topo",
    bottom: "Base",
    left: "Esquerda",
    right: "Direita",
    isometric: "Isométrica",
    lightingTitle: "Projeção de Iluminação Dinâmica",
    enableLight: "Ativar Ponto de Luz Seguidor do Cursor",
    lightIntensity: "Intensidade da Luz",
    lightColor: "Cor do Refletor",
    anaglyphTitle: "Efeito 3D Anáglifo Estereoscópico",
    enableAnaglyph: "Ativar Modo 3D (para Óculos Vermelho-Azul)",
    instructionDrag: "Arraste e mova com o mouse para rotacionar o objeto em 3D.",
    instructionScroll: "Use a roda do mouse (scroll) para aproximar ou afastar (Zoom).",
    instructionPan: "Segure a tecla SHIFT (ou clique direito) e arraste para reposicionar a imagem.",
    cameraActive: "Câmera Iniciada",
    captureBtn: "Tirar Foto",
    cancelBtn: "Cancelar",
    sequenceControl: "Controle Sequencial 360°",
    sequenceDragInstruction: "Arraste horizontalmente sobre o objeto para girá-lo em 360 graus.",
    unsupportedWebcam: "Acesso à webcam indisponível ou permissão não concedida.",
    noImage: "Sem imagem selecionada. Carregue um arquivo local ou escolha um modelo acima para iniciar.",
  },
  en: {
    title: "3D Image Viewer",
    subtitle: "Rotate in 3D, apply custom filters, map to shapes, and analyze from every angle",
    uploadBtn: "Select Local Image",
    dragDropText: "Drag and drop an image here",
    or: "or",
    webcamBtn: "Take Photo with Webcam",
    presetsTitle: "Sample Gallery",
    modeTitle: "Projection Mode",
    modePlane: "Interactive Plane",
    modeCube: "Mapped 3D Cube",
    modeCylinder: "Textured Cylinder",
    modeSphere: "3D Sphere / Globe",
    modeSequence: "Realistic 360° Object",
    adjustmentsTitle: "Image Adjustments & Filters",
    brightness: "Brightness",
    contrast: "Contrast",
    saturation: "Saturation",
    hueRotate: "Hue Shift",
    grayscale: "Grayscale",
    sepia: "Sepia Effect",
    blur: "Blur Strength",
    invert: "Invert Colors",
    resetAdjustments: "Reset Filters",
    resetAll: "Reset All Controls",
    transformsTitle: "Three-Dimensional Rotation (3D)",
    rotationX: "Rotation X (Pitch)",
    rotationY: "Rotation Y (Yaw)",
    rotationZ: "Rotation Z (Roll)",
    zoom: "Zoom Level / Scale",
    quickAngles: "Quick Preset Angles",
    front: "Front",
    back: "Back",
    top: "Top",
    bottom: "Bottom",
    left: "Left",
    right: "Right",
    isometric: "Isometric",
    lightingTitle: "Dynamic Interactive Lighting",
    enableLight: "Enable Cursor-Following Spotlight",
    lightIntensity: "Light Intensity",
    lightColor: "Spotlight Tint",
    anaglyphTitle: "Stereoscopic 3D Effect",
    enableAnaglyph: "Enable Anaglyph Mode (Red-Cyan 3D Glasses)",
    instructionDrag: "Left click and drag to rotate the object in 3D space.",
    instructionScroll: "Scroll the mouse wheel to zoom in or zoom out.",
    instructionPan: "Hold SHIFT key (or right click) and drag to pan/move the view.",
    cameraActive: "Webcam Stream Active",
    captureBtn: "Capture Frame",
    cancelBtn: "Cancel",
    sequenceControl: "360° Sequence Control",
    sequenceDragInstruction: "Drag horizontally over the object to smoothly spin it 360 degrees.",
    unsupportedWebcam: "Webcam access is unavailable or permission was denied.",
    noImage: "No image loaded. Please upload an image file or choose a sample template to begin.",
  },
};
