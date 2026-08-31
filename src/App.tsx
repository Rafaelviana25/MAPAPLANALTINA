import React, { useState, useRef, useEffect } from "react";
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
  const [imageSrc] = useState<string>("/mapa-planaltina.png");
  
  // Pre-decode and cache original high-resolution image in RAM once
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    if (img.decode) {
      img.decode().catch(() => {});
    }
  }, [imageSrc]);
  
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

  // Synchronize state references to avoid listener re-binding and retain maximum responsiveness
  const transformRef = useRef(transform);
  const isDraggingRef = useRef(isDragging);

  useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Non-passive Touch Engine for Butter-Smooth Mobile Pinch-to-Zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStartRaw = (e: TouchEvent) => {
      // Completely block native browser scrolling, page bouncing, and system viewport zooming
      if (e.cancelable) {
        e.preventDefault();
      }
      
      const touches = Array.from(e.touches).map(t => ({ x: t.clientX, y: t.clientY }));
      const currentTransform = transformRef.current;
      
      if (touches.length === 1) {
        setIsDragging(true);
        dragStartRef.current = {
          x: touches[0].x,
          y: touches[0].y,
          translateX: currentTransform.translateX,
          translateY: currentTransform.translateY,
          rotation: currentTransform.rotation
        };
      } else if (touches.length >= 2) {
        setIsDragging(true);
        const p1 = touches[0];
        const p2 = touches[1];
        
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
        const center = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2
        };

        touchStartRef.current = {
          touches,
          translateX: currentTransform.translateX,
          translateY: currentTransform.translateY,
          scale: currentTransform.scale,
          rotation: currentTransform.rotation,
          distance: dist,
          angle: ang,
          center
        };
      }
    };

    const onTouchMoveRaw = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      
      const touches = Array.from(e.touches).map(t => ({ x: t.clientX, y: t.clientY }));
      const currentTransform = transformRef.current;
      
      if (touches.length === 1 && isDraggingRef.current) {
        const dx = touches[0].x - dragStartRef.current.x;
        const dy = touches[0].y - dragStartRef.current.y;
        setTransform(prev => ({
          ...prev,
          translateX: dragStartRef.current.translateX + dx,
          translateY: dragStartRef.current.translateY + dy
        }));
      } else if (touches.length >= 2 && isDraggingRef.current) {
        const p1 = touches[0];
        const p2 = touches[1];
        
        const currentDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const currentAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
        const currentCenter = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2
        };

        const start = touchStartRef.current;
        if (!start) return;

        const rect = container.getBoundingClientRect();
        
        const startCenterX = start.center.x - rect.left - rect.width / 2;
        const startCenterY = start.center.y - rect.top - rect.height / 2;
        
        const currentCenterX = currentCenter.x - rect.left - rect.width / 2;
        const currentCenterY = currentCenter.y - rect.top - rect.height / 2;
        
        // Calculate dynamic scale factor
        const scaleFactor = start.distance > 0 ? (currentDist / start.distance) : 1;
        const newScale = Math.min(Math.max(start.scale * scaleFactor, 0.1), 15);

        // Calculate dynamic rotation angle delta
        const angleDelta = currentAngle - start.angle;
        const newRotation = (start.rotation + angleDelta) % 360;

        // Rigid 2D Coordinate transformation matrix for combined rotation + zooming about touch center
        const rad = (angleDelta * Math.PI) / 180;
        const vx = startCenterX - start.translateX;
        const vy = startCenterY - start.translateY;

        const rX = vx * Math.cos(rad) - vy * Math.sin(rad);
        const rY = vx * Math.sin(rad) + vy * Math.cos(rad);

        const scaleRatio = newScale / start.scale;
        const newTranslateX = currentCenterX - rX * scaleRatio;
        const newTranslateY = currentCenterY - rY * scaleRatio;

        setTransform({
          scale: newScale,
          rotation: newRotation,
          translateX: newTranslateX,
          translateY: newTranslateY,
          flipH: currentTransform.flipH,
          flipV: currentTransform.flipV
        });
      }
    };

    const onTouchEndRaw = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      setIsDragging(false);
    };

    // Passive false options override the standard browser default gestures
    container.addEventListener("touchstart", onTouchStartRaw, { passive: false });
    container.addEventListener("touchmove", onTouchMoveRaw, { passive: false });
    container.addEventListener("touchend", onTouchEndRaw, { passive: false });
    container.addEventListener("touchcancel", onTouchEndRaw, { passive: false });

    return () => {
      container.removeEventListener("touchstart", onTouchStartRaw);
      container.removeEventListener("touchmove", onTouchMoveRaw);
      container.removeEventListener("touchend", onTouchEndRaw);
      container.removeEventListener("touchcancel", onTouchEndRaw);
    };
  }, []);

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
    <div className="w-screen h-screen h-[100dvh] relative overflow-hidden bg-neutral-900 text-neutral-900 font-sans select-none flex flex-col" id="app-root">
      
      {/* FLOATING HEADER BAR */}
      <header className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-lg rounded-2xl px-4 py-2.5 flex items-center gap-3 pointer-events-auto" id="app-header">
        <div className="flex items-center gap-3.5" id="brand-group">
          <div className="w-8 h-8 bg-neutral-950 rounded-xl flex items-center justify-center text-white" id="brand-logo">
            <Compass size={16} className="animate-spin-slow text-neutral-100" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-neutral-950 uppercase" id="brand-title">
              {t.title}
            </h1>
          </div>
        </div>
      </header>

      {/* FLOATING ZOOM PERCENT INDICATOR (TOP-RIGHT) */}
      <div className="absolute top-4 right-4 z-30 bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-lg rounded-2xl px-3 py-2 flex items-center gap-2 text-xs font-mono font-bold text-neutral-700 pointer-events-none" id="zoom-indicator">
        <ZoomIn size={14} className="text-neutral-500" />
        <span>{Math.round(transform.scale * 100)}%</span>
      </div>

      {/* FULL SCREEN CANVAS CONTAINER */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        className="absolute inset-0 w-full h-full bg-neutral-950 select-none cursor-grab active:cursor-grabbing flex items-center justify-center touch-none overflow-hidden z-0"
        id="canvas-gesture-viewport"
      >
        {/* Checkerboard Pattern for Image Transparency */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.2]"
          style={{
            backgroundImage: `linear-gradient(45deg, #e2e8f0 25%, transparent 25%),
                              linear-gradient(-45deg, #e2e8f0 25%, transparent 25%),
                              linear-gradient(45deg, transparent 75%, #e2e8f0 75%),
                              linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)`,
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0px"
          }}
          id="viewport-checkered-bg"
        ></div>

        {/* Stage Grid overlay - very subtle accent */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] border border-neutral-900" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }} id="stage-dot-grid"></div>

        {/* IMAGE RENDER PIXEL STAGE */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          id="interactive-image-pivot"
          style={{
            transform: `translate3d(${transform.translateX}px, ${transform.translateY}px, 0) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
            transformOrigin: "center center"
          }}
        >
          <img
            src={imageSrc}
            alt="Viewer core native graphic"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="sync"
            className="max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none"
            style={{
              transform: `scaleX(${transform.flipH ? -1 : 1}) scaleY(${transform.flipV ? -1 : 1})`,
              imageRendering: "auto"
            }}
            id="primary-canvas-image"
          />
        </div>
      </div>

      {/* FLOATING ACTION TOOLBAR AT THE BOTTOM CENTER */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-lg bg-white/95 backdrop-blur-md border border-neutral-200/80 p-2.5 rounded-2xl flex items-center justify-between gap-2 shadow-xl pointer-events-auto" id="actions-panel-toolbar">
        
        {/* FINE-TUNING BUTTON GROUP */}
        <div className="flex items-center gap-1.5 overflow-x-auto" id="fine-tune-buttons">
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
          <span className="w-[1px] h-6 bg-neutral-200 mx-0.5"></span>
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
          <span className="w-[1px] h-6 bg-neutral-200 mx-0.5"></span>
          <button
            onClick={handleFlipH}
            className="px-2.5 h-10 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-xl flex items-center gap-1 text-xs font-semibold text-neutral-700 transition active:scale-90 cursor-pointer"
            title={t.flipH}
            id="btn-fliph"
          >
            <span className="rotate-90 inline-block text-[13px]">⇄</span>
            <span className="hidden sm:inline font-mono text-[9px] uppercase">H-Flip</span>
          </button>
          <button
            onClick={handleFlipV}
            className="px-2.5 h-10 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-xl flex items-center gap-1 text-xs font-semibold text-neutral-700 transition active:scale-90 cursor-pointer"
            title={t.flipV}
            id="btn-flipv"
          >
            <span className="inline-block text-[13px]">⇅</span>
            <span className="hidden sm:inline font-mono text-[9px] uppercase">V-Flip</span>
          </button>
        </div>

        {/* RESET BUTTON */}
        <button
          onClick={handleReset}
          className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold rounded-xl flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
          title={t.reset}
          id="btn-reset-view"
        >
          <RefreshCw size={12} className="text-neutral-300" />
          <span className="hidden xs:inline">CENTRALIZAR</span>
        </button>
      </div>

      {/* TINY FLOATING COPYRIGHT CORNER (BOTTOM-RIGHT) */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden md:flex items-center gap-1.5 text-[9px] text-white/55 font-mono uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md" id="footer-inner-bar">
        <Compass size={10} className="animate-spin-slow" />
        <span>MAPA PLANALTINA-GO</span>
      </div>

    </div>
  );
}
