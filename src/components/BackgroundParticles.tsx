import React from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';

interface BackgroundParticlesProps {
  section?: number;
  color?: string;
  density?: number;
  mode?: string;
}

export const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({
  color = '#A6FF00',
  density = 60,
}) => {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  // Constellation Node Network Options matching the screenshot
  const options: ISourceOptions = {
    fpsLimit: 120,
    fullScreen: { enable: false },
    particles: {
      color: {
        value: [color, '#ffffff', '#4ade80'],
      },
      shape: {
        type: ['circle', 'edge'],
      },
      number: {
        value: density,
        density: {
          enable: true,
          width: 800,
          height: 800,
        },
      },
      opacity: {
        value: { min: 0.4, max: 0.9 },
      },
      size: {
        value: { min: 2, max: 5 },
      },
      move: {
        enable: true,
        direction: 'none',
        random: true,
        speed: 1.2,
        straight: false,
        outModes: {
          default: 'out',
        },
      },
      links: {
        enable: true,
        distance: 160,
        color: color,
        opacity: 0.4,
        width: 1.2,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.85,
            color: color,
          },
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#07080c] transition-colors duration-700">
      <ParticlesProvider init={particlesInit}>
        <Particles
          key={color}
          id={`tsparticles-constellation-${color.replace('#', '')}`}
          options={options}
          className="w-full h-full"
        />
      </ParticlesProvider>
    </div>
  );
};
