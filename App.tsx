import React, { useState, useRef } from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  RotateCcw, 
  RefreshCw, 
  Compass, 
  Info
} from "lucide-react";

interface TransformState {
  scale: number;
  rotation: number;
  translateX: number;
  translateY: number;
  flipH: boolean;
  flipV: boolean;
}

interface TouchPoint {
  x: number;
  y: number;
}

export default function App() {
  const [imageSrc] = useState<string>("/MAPA PLANALTINA.png");
  
  // Transform Coordinates State
  const [transform, setTransform] = useState<TransformState>({
    scale: 1,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    flipH: false,
    flipV: false
  });

  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag start state references
  const dragStartRef = useRef({
    x: 0,
    y: 0,
    translateX: 0,
    translateY: 0,
    rotation: 0
  });

  // Touch start state references for mobile multi-touch gestures
  const touchStartRef = useRef({
    touches: [] as TouchPoint[],
    translateX: 0,
    translateY: 0,
    scale: 1,
    rotation: 0,
    distance: 0,
    angle: 0,
    center: { x: 0, y: 0 }
  });

  // Translations object
  const t = {
    title: "MAPA PLANALTINA-GO",
    subtitle: "",
    zoomIn: "Aproximar",
    zoomOut: "Afastar",
    rotateCw: "Girar Horário",
    rotateCcw: "Girar Anti-horário",
    flipH: "Espelhar Horizontal",
    flipV: "Espelhar Vertical",
    reset: "Centralizar Imagem",
    infoZoom: "Zoom",
    infoAngle: "Ângulo",
    infoCoordinates: "Posição",
    hudTitle: "Painel de Controle",
    keyboardTipsTitle: "Como navegar:",
    tipScroll: "Use a roda do mouse (Scroll) para dar zoom de forma infinita.",
    tipDrag: "Clique e arraste com o mouse/dedo para mover a imagem livremente.",
    tipPinch: "No celular, use o gesto de pinça com dois dedos para girar e dar zoom simultâneos (nativo).",
    tipReset: "Clique ou toque duas vezes no canvas para recentralizar tudo.",
  };

  // Mouse drag gesture handlers (for panning only, keep it extremely clean)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Allow left-click only
    e.preventDefault();
    setIsDragging(true);

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      translateX: transform.translateX,
      translateY: transform.translateY,
      rotation: transform.rotation
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setTransform(prev => ({
      ...prev,
      translateX: dragStartRef.current.translateX + dx,
      translateY: dragStartRef.current.translateY + dy
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mouse wheel zoom at cursor position (Professional Canvas Zoom)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    const zoomFactor = 1.15;
    const nextScale = e.deltaY < 0 
      ? Math.min(transform.scale * zoomFactor, 15) 
      : Math.max(transform.scale / zoomFactor, 0.1);
    
    // Smooth zoom focused precisely on the mouse pointer position
    const scaleRatio = nextScale / transform.scale;
    const newTranslateX = mouseX - (mouseX - transform.translateX) * scaleRatio;
    const newTranslateY = mouseY - (mouseY - transform.translateY) * scaleRatio;
    
    setTransform(prev => ({
      ...prev,
      scale: nextScale,
      translateX: newTranslateX,
      translateY: newTranslateY
    }));
  };

  // Touch Event Handlers for Mobile Gestures
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touches = Array.from(e.touches).map((t: any) => ({ x: t.clientX, y: t.clientY }));
    
    if (touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: touches[0].x,
        y: touches[0].y,
        translateX: transform.translateX,
        translateY: transform.translateY,
        rotation: transform.rotation
      };
    } else if (touches.length >= 2) {
      setIsDragging(true);
      const p1 = touches[0];
      const p2 = touches[1];
      
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      const center = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
      };

      touchStartRef.current = {
        touches,
        translateX: transform.translateX,
        translateY: transform.translateY,
        scale: transform.scale,
        rotation: transform.rotation,
        distance: dist,
        angle: ang,
        center
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touches = Array.from(e.touches).map((t: any) => ({ x: t.clientX, y: t.clientY }));
    
    if (touches.length === 1 && isDragging) {
      const dx = touches[0].x - dragStartRef.current.x;
      const dy = touches[0].y - dragStartRef.current.y;
      setTransform(prev => ({
        ...prev,
        translateX: dragStartRef.current.translateX + dx,
        translateY: dragStartRef.current.translateY + dy
      }));
    } else if (touches.length >= 2 && isDragging) {
      // Multi-touch interaction: Pinch Zoom + Rotate + Midpoint Pan (natively integrated!)
      const p1 = touches[0];
      const p2 = touches[1];
      
      const currentDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const currentAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      const currentCenter = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
      };

      const start = touchStartRef.current;
      
      // Calculate Pinch Zoom
      const scaleFactor = start.distance > 0 ? (currentDist / start.distance) : 1;
      const newScale = Math.min(Math.max(start.scale * scaleFactor, 0.1), 15);

      // Calculate Rotation Spin
      const angleDelta = currentAngle - start.angle;
      const newRotation = (start.rotation + angleDelta) % 360;

      // Calculate Pan offset shifts
      const dx = currentCenter.x - start.center.x;
      const dy = currentCenter.y - start.center.y;

      setTransform({
        scale: newScale,
        rotation: newRotation,
        translateX: start.translateX + dx,
        translateY: start.translateY + dy,
        flipH: transform.flipH,
        flipV: transform.flipV
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Double tap/double click to reset back to center
  const handleDoubleClick = () => {
    setTransform({
      scale: 1,
      rotation: 0,
      translateX: 0,
      translateY: 0,
      flipH: false,
      flipV: false
    });
  };

  // Quick Action Functions
  const handleZoomIn = () => {
    setTransform(prev => ({ ...prev, scale: Math.min(prev.scale * 1.3, 15) }));
  };

  const handleZoomOut = () => {
    setTransform(prev => ({ ...prev, scale: Math.max(prev.scale / 1.3, 0.1) }));
  };

  const handleRotateCw = () => {
    setTransform(prev => ({ ...prev, rotation: (prev.rotation + 45) % 360 }));
  };

  const handleRotateCcw = () => {
    setTransform(prev => ({ ...prev, rotation: (prev.rotation - 45 + 360) % 360 }));
  };

  const handleFlipH = () => {
    setTransform(prev => ({ ...prev, flipH: !prev.flipH }));
  };

  const handleFlipV = () => {
    setTransform(prev => ({ ...prev, flipV: !prev.flipV }));
  };

  const handleReset = () => {
    setTransform({
      scale: 1,
      rotation: 0,
      translateX: 0,
      translateY: 0,
      flipH: false,
      flipV: false
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-neutral-900 flex flex-col font-sans select-none" id="app-root">
      
      {/* HEADER BAR */}
      <header className="border-b border-neutral-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 px-6 py-3.5 flex justify-between items-center" id="app-header">
        <div className="flex items-center gap-3" id="brand-group">
          <div className="w-9 h-9 bg-neutral-900 rounded-xl flex items-center justify-center text-white" id="brand-logo">
            <Compass size={18} className="animate-spin-slow text-neutral-100" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-neutral-950 flex items-center gap-2 uppercase" id="brand-title">
              {t.title}
            </h1>
          </div>
        </div>
      </header>

      {/* WORKSPACE VIEWPORT */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6" id="app-main-layout">
        
        {/* VIEWPORT PANEL - HERO AREA */}
        <div className="flex-1 flex flex-col gap-4 min-w-0" id="viewer-viewport-panel">

          {/* DYNAMIC CANVAS CONTAINER */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
            className="flex-1 min-h-[450px] md:min-h-[550px] relative rounded-3xl overflow-hidden border-[1.5px] border-neutral-300 bg-white transition-all duration-300 select-none cursor-grab active:cursor-grabbing flex items-center justify-center shadow-sm touch-none"
            id="canvas-gesture-viewport"
          >
            {/* Checkerboard Pattern for Image Transparency */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.25]"
              style={{
                backgroundImage: `linear-gradient(45deg, #cbd5e1 25%, transparent 25%),
                                  linear-gradient(-45deg, #cbd5e1 25%, transparent 25%),
                                  linear-gradient(45deg, transparent 75%, #cbd5e1 75%),
                                  linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)`,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
              }}
              id="viewport-checkered-bg"
            ></div>

            {/* Stage Grid overlay - very subtle accent */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] border border-neutral-900" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }} id="stage-dot-grid"></div>



            {/* IMAGE RENDER PIXEL STAGE */}
            <div 
              className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center transition-transform duration-75"
              id="interactive-image-pivot"
              style={{
                transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
                transformOrigin: "center center"
              }}
            >
              <img
                src={imageSrc}
                alt="Viewer core native graphic"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none drop-shadow-md"
                style={{
                  transform: `scaleX(${transform.flipH ? -1 : 1}) scaleY(${transform.flipV ? -1 : 1})`,
                  imageRendering: "crisp-edges"
                }}
                id="primary-canvas-image"
              />
            </div>
          </div>

          {/* FLOATING ACTION TOOLBAR BELOW VIEWPORT */}
          <div className="bg-white border border-neutral-200/80 p-3 rounded-2xl flex flex-wrap gap-3 items-center justify-between shadow-sm" id="actions-panel-toolbar">
            
            {/* FINE-TUNING BUTTON GROUP */}
            <div className="flex items-center gap-2" id="fine-tune-buttons">
              <button
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-xl flex items-center justify-center text-neutral-700 transition active:scale-90 cursor-pointer"
                title={t.zoomIn}
                id="btn-zoomin"
              >
                <ZoomIn size={18} />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-xl flex items-center justify-center text-neutral-700 transition active:scale-90 cursor-pointer"
                title={t.zoomOut}
                id="btn-zoomout"
              >
                <ZoomOut size={18} />
              </button>
              <span className="w-[1px] h-6 bg-neutral-200 mx-1"></span>
              <button
                onClick={handleRotateCcw}
                className="w-10 h-10 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-xl flex items-center justify-center text-neutral-700 transition active:scale-90 cursor-pointer"
                title={t.rotateCcw}
                id="btn-rotate-ccw"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={handleRotateCw}
                className="w-10 h-10 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-xl flex items-center justify-center text-neutral-700 transition active:scale-90 cursor-pointer"
                title={t.rotateCw}
                id="btn-rotate-cw"
              >
                <RotateCw size={18} />
              </button>
              <span className="w-[1px] h-6 bg-neutral-200 mx-1"></span>
              <button
                onClick={handleFlipH}
                className="px-3 h-10 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-xl flex items-center gap-1.5 text-xs font-semibold text-neutral-700 transition active:scale-90 cursor-pointer"
                title={t.flipH}
                id="btn-fliph"
              >
                <span className="rotate-90 inline-block text-[13px]">⇄</span>
                <span className="hidden sm:inline font-mono text-[10px]">H-FLIP</span>
              </button>
              <button
                onClick={handleFlipV}
                className="px-3 h-10 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-xl flex items-center gap-1.5 text-xs font-semibold text-neutral-700 transition active:scale-90 cursor-pointer"
                title={t.flipV}
                id="btn-flipv"
              >
                <span className="inline-block text-[13px]">⇅</span>
                <span className="hidden sm:inline font-mono text-[10px]">V-FLIP</span>
              </button>
            </div>

            {/* RESET BUTTON */}
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm ml-auto sm:ml-0"
              title={t.reset}
              id="btn-reset-view"
            >
              <RefreshCw size={14} className="text-neutral-300" />
              <span>{t.reset.toUpperCase()}</span>
            </button>
          </div>

        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-neutral-200 bg-white py-4 px-6 text-center" id="app-footer">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-neutral-400 font-mono uppercase tracking-wider" id="footer-inner-bar">
          <div className="flex items-center gap-1.5" id="footer-branding">
            <Compass size={12} className="text-neutral-400 animate-spin-slow" />
            <span>MAPA PLANALTINA-GO © 2026</span>
          </div>
          <div className="flex items-center gap-4" id="footer-metadata">
            <span>Designed with Mathematical Clarity</span>
            <span className="text-neutral-200">|</span>
            <span>Applet: 626251fe</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
