import React, { useEffect, useRef } from 'react';

interface BeamsProps {
  section?: number;
  color?: string;
  beamCount?: number;
  speed?: number;
  thickness?: number;
}

export const Beams: React.FC<BeamsProps> = ({
  section = 1,
  color = '#A6FF00',
  beamCount = 28,
  speed = 1.0,
  thickness = 2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize Beams
    interface Beam {
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
      width: number;
      opacity: number;
      pulse: number;
    }

    const generateBeams = (): Beam[] => {
      return Array.from({ length: beamCount }, () => {
        const isHorizontal = section === 3;
        const angle = isHorizontal
          ? (Math.random() - 0.5) * 0.15
          : section === 1
          ? Math.PI * 0.25 + (Math.random() - 0.5) * 0.2
          : (Math.random() * Math.PI) / 2;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          length: 120 + Math.random() * 280,
          angle: angle,
          speed: (0.8 + Math.random() * 1.5) * speed,
          width: (thickness + Math.random() * 2.5),
          opacity: 0.2 + Math.random() * 0.55,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    };

    const beams = generateBeams();

    const render = () => {
      ctx.fillStyle = '#07080c';
      ctx.fillRect(0, 0, width, height);

      // Section-specific background glow
      const ambientGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.65
      );
      ambientGrad.addColorStop(0, `${color}18`);
      ambientGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      beams.forEach((beam) => {
        beam.pulse += 0.02 * speed;
        const currentOpacity = Math.max(0.1, beam.opacity + Math.sin(beam.pulse) * 0.15);

        // Move beam along its angle vector
        beam.x += Math.cos(beam.angle) * beam.speed;
        beam.y += Math.sin(beam.angle) * beam.speed;

        // Wrap around canvas screen bounds
        if (beam.x > width + beam.length) beam.x = -beam.length;
        if (beam.x < -beam.length) beam.x = width + beam.length;
        if (beam.y > height + beam.length) beam.y = -beam.length;
        if (beam.y < -beam.length) beam.y = height + beam.length;

        // Draw Beam Line Gradient
        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate(beam.angle);

        const beamGrad = ctx.createLinearGradient(-beam.length * 0.5, 0, beam.length * 0.5, 0);
        beamGrad.addColorStop(0, 'transparent');
        beamGrad.addColorStop(0.3, `${color}30`);
        beamGrad.addColorStop(0.5, color);
        beamGrad.addColorStop(0.7, `${color}30`);
        beamGrad.addColorStop(1, 'transparent');

        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = beam.width;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.moveTo(-beam.length * 0.5, 0);
        ctx.lineTo(beam.length * 0.5, 0);
        ctx.stroke();

        // Glowing Core Pulse Head at beam center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, beam.width * 0.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [section, color, beamCount, speed, thickness]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
};
