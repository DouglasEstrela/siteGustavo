import React, { useEffect, useRef } from 'react';

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxHeight?: number;
  opacity?: number;
}

export const Waves: React.FC<WavesProps> = ({
  lineColor = '#1E293B',
  backgroundColor = '#F4F4F6',
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 35,
  waveAmpY = 20,
  xGap = 15,
  yGap = 15,
  friction = 0.92,
  tension = 0.01,
  maxHeight = 200,
  opacity = 0.8,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, lx: -1000, ly: -1000, sx: 0, sy: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Points Grid Matrix for Physics
    let cols = Math.ceil(width / xGap) + 1;
    let rows = Math.ceil(height / yGap) + 1;

    interface Point {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
    }

    let grid: Point[][] = [];

    const initGrid = () => {
      cols = Math.ceil(width / xGap) + 1;
      rows = Math.ceil(height / yGap) + 1;
      grid = [];

      for (let r = 0; r < rows; r++) {
        const rowPoints: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * xGap;
          const y = r * yGap;
          rowPoints.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
          });
        }
        grid.push(rowPoints);
      }
    };

    initGrid();

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      initGrid();
    };

    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const mouse = mouseRef.current;
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };

    const handlePointerLeave = () => {
      const mouse = mouseRef.current;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('touchmove', handlePointerMove);
    container.addEventListener('touchend', handlePointerLeave);

    let step = 0;

    const render = () => {
      step += 1;

      // Mouse velocity
      const mouse = mouseRef.current;
      mouse.sx += (mouse.x - mouse.lx) * 0.1;
      mouse.sy += (mouse.y - mouse.ly) * 0.1;
      mouse.sx *= 0.85;
      mouse.sy *= 0.85;
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Physics update for grid points
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r][c];

          // Harmonic Sine Wave Motion
          const waveX = Math.sin(r * 0.15 + step * waveSpeedX) * waveAmpX;
          const waveY = Math.cos(c * 0.15 + step * waveSpeedY) * waveAmpY;

          const targetX = p.baseX + waveX;
          const targetY = p.baseY + waveY;

          // Mouse Force Field Interaction
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxHeight) {
            const force = (1 - dist / maxHeight) * 14;
            const angle = Math.atan2(dy, dx);

            p.vx -= Math.cos(angle) * force + mouse.sx * 0.15;
            p.vy -= Math.sin(angle) * force + mouse.sy * 0.15;
          }

          // Spring physics back to target
          const ax = (targetX - p.x) * tension;
          const ay = (targetY - p.y) * tension;

          p.vx += ax;
          p.vy += ay;
          p.vx *= friction;
          p.vy *= friction;

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // Draw Grid Lines (Horizontal Curves)
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(grid[r][0].x, grid[r][0].y);

        for (let c = 0; c < cols - 1; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r][c + 1];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
        }

        ctx.stroke();
      }

      // Draw Grid Lines (Vertical Curves)
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(grid[0][c].x, grid[0][c].y);

        for (let r = 0; r < rows - 1; r++) {
          const p1 = grid[r][c];
          const p2 = grid[r + 1][c];
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('touchend', handlePointerLeave);
    };
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, xGap, yGap, friction, tension, maxHeight, opacity]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};
