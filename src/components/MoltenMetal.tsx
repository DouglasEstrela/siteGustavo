import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;

  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;
  float g = clamp(intensity, 0.0, 1.0);

  // 4-color gradient through the themes
  vec3 col;
  if (g < 0.33) {
    col = mix(uColor1, uColor2, smoothstep(0.0, 0.33, g));
  } else if (g < 0.66) {
    col = mix(uColor2, uColor3, smoothstep(0.33, 0.66, g));
  } else {
    col = mix(uColor3, uColor4, smoothstep(0.66, 1.0, g));
  }

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * a, a);
}
`;

interface MoltenMetalProps {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  speed?: number;
  scale?: number;
  detail?: number;
  glow?: number;
  coreSize?: number;
  swirl?: number;
  fold?: number;
  blackPoint?: number;
  brightness?: number;
  grain?: boolean;
  grainIntensity?: number;
  opacity?: number;
  mouseStrength?: number;
  enableMouse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MoltenMetal: React.FC<MoltenMetalProps> = ({
  color1 = '#A6FF00',
  color2 = '#8B1E1E',
  color3 = '#FF4D2E',
  color4 = '#8B5CF6',
  speed = 0.25,
  scale = 4,
  detail = 4,
  glow = 1.8,
  coreSize = 0.1,
  swirl = 1.2,
  fold = -0.22,
  blackPoint = 0.04,
  brightness = 1.2,
  grain = true,
  grainIntensity = 0.04,
  opacity = 1.0,
  mouseStrength = 0.18,
  enableMouse = true,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas as HTMLCanvasElement);

    const mouse = { x: 0.5, y: 0.5 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (gl.canvas as HTMLCanvasElement).getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    if (enableMouse) window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', resize);
    resize();

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: [container.clientWidth, container.clientHeight] },
        iTime: { value: 0 },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uDetail: { value: detail },
        uGlow: { value: glow },
        uCoreSize: { value: coreSize },
        uSwirl: { value: swirl },
        uFold: { value: fold },
        uBlackPoint: { value: blackPoint },
        uBrightness: { value: brightness },
        uGrain: { value: grain ? 1 : 0 },
        uGrainIntensity: { value: grainIntensity },
        uOpacity: { value: opacity },
        uMouse: { value: [mouse.x, mouse.y] },
        uMouseStrength: { value: mouseStrength },
        uEnableMouse: { value: enableMouse },
        uColor1: { value: hexToRgb(color1) },
        uColor2: { value: hexToRgb(color2) },
        uColor3: { value: hexToRgb(color3) },
        uColor4: { value: hexToRgb(color4) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    let raf: number;

    const update = (t: number) => {
      raf = requestAnimationFrame(update);
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.iResolution.value = [container.clientWidth, container.clientHeight];
      if (enableMouse) program.uniforms.uMouse.value = [mouse.x, mouse.y];
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (enableMouse) window.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(gl.canvas as HTMLCanvasElement)) {
        container.removeChild(gl.canvas as HTMLCanvasElement);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color1, color2, color3, color4, speed, scale, detail, glow, coreSize, swirl, fold, blackPoint, brightness, grain, grainIntensity, opacity, mouseStrength, enableMouse]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
};

export default MoltenMetal;
