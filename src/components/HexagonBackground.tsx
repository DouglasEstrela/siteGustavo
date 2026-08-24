import React, { useEffect, useRef, useState, useCallback } from 'react';

interface HexagonBackgroundProps {
  hexagonSize?: number;
  hexagonMargin?: number;
  className?: string;
  children?: React.ReactNode;
}

export const HexagonBackground: React.FC<HexagonBackgroundProps> = ({
  hexagonSize = 65,
  hexagonMargin = 3,
  className = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ rows: 0, columns: 0 });

  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.15;
  const rowSpacing = hexagonSize * 0.86;
  const baseMarginTop = -25 - 0.25 * (hexagonSize - 65);
  const computedMarginTop = baseMarginTop + hexagonMargin;

  const updateGrid = useCallback(() => {
    if (!containerRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const rows = Math.ceil(h / rowSpacing) + 2;
    const columns = Math.ceil(w / hexagonWidth) + 2;
    setDimensions({ rows, columns });
  }, [hexagonWidth, rowSpacing]);

  useEffect(() => {
    updateGrid();
    window.addEventListener('resize', updateGrid, { passive: true });
    return () => window.removeEventListener('resize', updateGrid);
  }, [updateGrid]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.setProperty('--mx', `${e.clientX}px`);
      glowRef.current.style.setProperty('--my', `${e.clientY}px`);
      glowRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full min-h-screen overflow-hidden bg-[#06070a] ${className}`}
    >
      {/* Dynamic Ambient Theme Glows Behind Grid (Updated directly on GPU via CSS vars) */}
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: 0,
          background: `
            radial-gradient(circle 450px at var(--mx, -1000px) var(--my, -1000px), rgba(0, 229, 255, 0.22), transparent 80%),
            radial-gradient(circle 700px at 15% 25%, rgba(166, 255, 0, 0.10), transparent 70%),
            radial-gradient(circle 800px at 85% 20%, rgba(139, 92, 246, 0.16), transparent 70%),
            radial-gradient(circle 750px at 80% 80%, rgba(255, 77, 46, 0.12), transparent 70%),
            radial-gradient(circle 600px at 20% 85%, rgba(139, 30, 30, 0.12), transparent 70%)
          `,
        }}
      />

      {/* Hexagon Pattern Grid */}
      <div className="absolute inset-0 pointer-events-auto flex flex-col justify-start items-center overflow-hidden">
        {Array.from({ length: dimensions.rows }).map((_, rowIndex) => {
          const isOdd = rowIndex % 2 !== 0;
          const marginLeft = isOdd ? -(hexagonSize / 2) : hexagonMargin / 2;

          return (
            <div
              key={rowIndex}
              className="flex whitespace-nowrap"
              style={{
                marginTop: rowIndex === 0 ? 0 : `${computedMarginTop}px`,
                marginLeft: `${marginLeft}px`,
              }}
            >
              {Array.from({ length: dimensions.columns }).map((_, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    style={{
                      width: `${hexagonWidth}px`,
                      height: `${hexagonHeight}px`,
                      margin: `0 ${hexagonMargin}px`,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                    className="group relative transition-all duration-500 ease-out cursor-pointer"
                  >
                    {/* Outer Hexagon Border / Background */}
                    <div className="w-full h-full bg-[#131620]/80 group-hover:bg-cyan-500/30 group-hover:scale-[1.04] transition-all duration-300 flex items-center justify-center p-[1px]">
                      {/* Inner Hexagon Core */}
                      <div
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        }}
                        className="w-[calc(100%-2px)] h-[calc(100%-2px)] bg-[#090b10]/95 group-hover:bg-[#0f1422]/90 group-hover:shadow-[inset_0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Vignette & Soft Overlay to emphasize content */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(6,7,10,0.85)_95%)]" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full min-h-screen flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HexagonBackground;
