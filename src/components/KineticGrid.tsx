import React, { useEffect, useRef } from 'react';

interface KineticGridProps {
  className?: string;
  children?: React.ReactNode;
  gridSpacing?: number;
  squareSize?: number;
  mouseRadius?: number;
  mouseStrength?: number;
  backgroundColor?: string;
}

interface Point {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  intensity: number;
  speed: number;
}

export const KineticGrid: React.FC<KineticGridProps> = ({
  className = '',
  children,
  gridSpacing = 28,
  squareSize = 3.5,
  mouseRadius = 220,
  mouseStrength = 40,
  backgroundColor = '#F2F2F4', // Elegant off-white / light gray tone
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    const ripples: Ripple[] = [];

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const initPoints = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      points = [];
      const cols = Math.ceil(width / gridSpacing) + 2;
      const rows = Math.ceil(height / gridSpacing) + 2;

      const offsetX = (width - (cols - 1) * gridSpacing) / 2;
      const offsetY = (height - (rows - 1) * gridSpacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = offsetX + c * gridSpacing;
          const baseY = offsetY + r * gridSpacing;
          points.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    initPoints();

    const handleResize = () => {
      initPoints();
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      ripples.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.75,
        intensity: 1.0,
        speed: 7,
      });
    };

    const windowParent = canvas.parentElement || window;
    window.addEventListener('resize', handleResize);
    windowParent.addEventListener('mousemove', handlePointerMove as EventListener);
    windowParent.addEventListener('mouseleave', handlePointerLeave);
    windowParent.addEventListener('click', handleClick as EventListener);

    const springConstant = 0.08;
    const damping = 0.82;
    const waveWidth = 70;

    const render = () => {
      // Smooth mouse movement
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.15;
        mouse.y += (-1000 - mouse.y) * 0.15;
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.intensity *= 0.965;
        if (r.radius > r.maxRadius || r.intensity < 0.01) {
          ripples.splice(i, 1);
        }
      }

      // Clear canvas with chosen off-white/light gray background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Render subtle grid background texture
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
      ctx.lineWidth = 0.5;

      // Update points and render kinetic SQUARES
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // 1. Target displacement from mouse
        let targetX = p.baseX;
        let targetY = p.baseY;

        const dx = p.baseX - mouse.x;
        const dy = p.baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 0.1) {
          const factor = Math.pow(1 - dist / mouseRadius, 2);
          const pull = factor * mouseStrength;
          targetX -= (dx / dist) * pull;
          targetY -= (dy / dist) * pull;
        }

        // 2. Ripple displacement
        for (let j = 0; j < ripples.length; j++) {
          const r = ripples[j];
          const rdx = p.baseX - r.x;
          const rdy = p.baseY - r.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);

          if (rdist > 0.1) {
            const diff = Math.abs(rdist - r.radius);
            if (diff < waveWidth) {
              const wave = Math.sin((1 - diff / waveWidth) * Math.PI);
              const push = wave * r.intensity * 35;
              targetX += (rdx / rdist) * push;
              targetY += (rdy / rdist) * push;
            }
          }
        }

        // 3. Physics integration
        const fx = (targetX - p.x) * springConstant;
        const fy = (targetY - p.y) * springConstant;

        p.vx = (p.vx + fx) * damping;
        p.vy = (p.vy + fy) * damping;

        p.x += p.vx;
        p.y += p.vy;

        // 4. Calculate displacement distance
        const disp = Math.sqrt((p.x - p.baseX) ** 2 + (p.y - p.baseY) ** 2);
        const intensityFactor = Math.min(disp / 25, 1);

        // Square dimensions
        const currentSize = squareSize + intensityFactor * 2.5;
        const halfSize = currentSize / 2;

        const alpha = 0.3 + intensityFactor * 0.65;

        // When mouse passes / displaced -> turn BLACK, otherwise dark slate square
        if (intensityFactor > 0.12) {
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`; // PURE BLACK on mouse interaction
        } else {
          ctx.fillStyle = `rgba(100, 116, 139, ${alpha * 0.8})`; // Neutral dark slate square at rest
        }

        ctx.fillRect(p.x - halfSize, p.y - halfSize, currentSize, currentSize);
      }

      // Draw active ripple expanding square rings (solid black accent)
      for (let j = 0; j < ripples.length; j++) {
        const r = ripples[j];
        ctx.beginPath();
        ctx.rect(r.x - r.radius, r.y - r.radius, r.radius * 2, r.radius * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${r.intensity * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      windowParent.removeEventListener('mousemove', handlePointerMove as EventListener);
      windowParent.removeEventListener('mouseleave', handlePointerLeave);
      windowParent.removeEventListener('click', handleClick as EventListener);
    };
  }, [gridSpacing, squareSize, mouseRadius, mouseStrength, backgroundColor]);

  return (
    <div className={`relative w-full h-full min-h-screen overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
