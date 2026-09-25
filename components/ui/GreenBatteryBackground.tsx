'use client';

import React, { useEffect, useRef } from 'react';

interface GreenBatteryBackgroundProps {
  className?: string;
  active?: boolean;
  blurAmount?: number;
  showFrostedOverlay?: boolean;
}

interface BatteryCell {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  type: 'cylindrical' | 'prismatic' | 'pack' | 'nano';
  charge: number; // 0 to 1
  chargeSpeed: number;
  voltage: string;
  soh: string;
  label: string;
  angle: number;
  angularVelocity: number;
  phase: number;
  scale: number;
  opacity: number;
  pulseTime: number;
  particles: Array<{ x: number; y: number; vy: number; size: number; alpha: number }>;
}

interface IonParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
}

interface EnergyPulse {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  color: string;
}

/**
 * GreenBatteryBackground
 * 
 * An ultra-smooth, professional, climate-tech inspired background for Light Mode.
 * Features:
 * - Floating cylindrical 4680/21700 EV cells, prismatic packs, and energy capsules
 * - Real-time green charging flow animations with oscillating liquid energy waves
 * - Animated green ion particles, circuit connection lines, and data pulses
 * - High-DPI canvas rendering with smooth delta-time physics and mouse parallax
 * - Carefully tuned emerald, mint, and forest green palette for maximum readability and luxury aesthetic
 */
export function GreenBatteryBackground({
  className = '',
  active = true,
  blurAmount = 5,
  showFrostedOverlay = true
}: GreenBatteryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = active;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const setupDimensions = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupDimensions();

    const handleResize = () => {
      setupDimensions();
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking with smooth lerp
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize Battery Cells with realistic EV tech metadata
    const batteryTypes: Array<'cylindrical' | 'prismatic' | 'pack' | 'nano'> = [
      'cylindrical',
      'prismatic',
      'pack',
      'cylindrical',
      'prismatic',
      'nano',
      'cylindrical',
      'pack',
      'prismatic',
      'cylindrical',
      'nano',
      'prismatic',
      'cylindrical'
    ];

    const cellLabels = [
      { v: '4.2V', soh: '99% SOH', l: 'CATL-4680' },
      { v: '3.7V', soh: '96% SOH', l: 'LFP-GEN3' },
      { v: '4.1V', soh: '98% SOH', l: 'RX-NMC90' },
      { v: '3.8V', soh: '94% SOH', l: 'PANASONIC' },
      { v: '4.2V', soh: '100% SOH', l: 'SOLID-STATE' },
      { v: '3.6V', soh: '97% SOH', l: 'BYD-BLADE' },
      { v: '4.0V', soh: '95% SOH', l: 'SVOLT-L600' },
      { v: '3.9V', soh: '99% SOH', l: 'TESLA-TABLESS' },
    ];

    const cells: BatteryCell[] = batteryTypes.map((type, idx) => {
      const scale = 0.75 + Math.random() * 0.45;
      const w = type === 'cylindrical' ? 44 * scale : type === 'prismatic' ? 56 * scale : type === 'pack' ? 68 * scale : 34 * scale;
      const h = type === 'cylindrical' ? 78 * scale : type === 'prismatic' ? 62 * scale : type === 'pack' ? 52 * scale : 52 * scale;

      const startX = (width / (batteryTypes.length + 1)) * (idx + 0.6) + (Math.random() - 0.5) * 80;
      const startY = (Math.random() * (height * 0.85)) + height * 0.08;

      const meta = cellLabels[idx % cellLabels.length];

      // Internal charging spark particles
      const particles = Array.from({ length: 4 }).map(() => ({
        x: (Math.random() - 0.5) * (w * 0.6),
        y: Math.random() * h,
        vy: 0.2 + Math.random() * 0.5,
        size: 1 + Math.random() * 1.5,
        alpha: Math.random() * 0.7 + 0.2
      }));

      return {
        x: startX,
        y: startY,
        baseX: startX,
        baseY: startY,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.2,
        width: w,
        height: h,
        type,
        charge: 0.35 + Math.random() * 0.55,
        chargeSpeed: 0.0006 + Math.random() * 0.0012,
        voltage: meta.v,
        soh: meta.soh,
        label: meta.l,
        angle: (Math.random() - 0.5) * 0.35,
        angularVelocity: (Math.random() - 0.5) * 0.0015,
        phase: Math.random() * Math.PI * 2,
        scale,
        opacity: 0.65 + Math.random() * 0.3,
        pulseTime: Math.random() * 10,
        particles
      };
    });

    // Initialize floating Ion Particles
    const ionCount = 36;
    const ions: IonParticle[] = Array.from({ length: ionCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.1, // subtle upward thermodynamic drift
      radius: Math.random() * 2.2 + 1,
      alpha: Math.random() * 0.4 + 0.15,
      baseAlpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: 1 + Math.random() * 2
    }));

    // Energy pulses between cells
    const pulses: EnergyPulse[] = [];

    let lastTime = performance.now();
    let globalTime = 0;

    const render = (time: number) => {
      if (!isRunning) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.06);
      lastTime = time;
      globalTime += dt;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient green lighting gradient & soft climate-tech aura
      const ambientGrad1 = ctx.createRadialGradient(
        width * 0.15 + Math.sin(globalTime * 0.2) * 50,
        height * 0.25 + Math.cos(globalTime * 0.2) * 40,
        10,
        width * 0.15,
        height * 0.25,
        width * 0.45
      );
      ambientGrad1.addColorStop(0, 'rgba(16, 185, 129, 0.065)');
      ambientGrad1.addColorStop(0.6, 'rgba(52, 211, 153, 0.025)');
      ambientGrad1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = ambientGrad1;
      ctx.fillRect(0, 0, width, height);

      const ambientGrad2 = ctx.createRadialGradient(
        width * 0.85 + Math.cos(globalTime * 0.18) * 60,
        height * 0.65 + Math.sin(globalTime * 0.22) * 50,
        20,
        width * 0.85,
        height * 0.65,
        width * 0.5
      );
      ambientGrad2.addColorStop(0, 'rgba(5, 150, 105, 0.055)');
      ambientGrad2.addColorStop(0.5, 'rgba(16, 185, 129, 0.02)');
      ambientGrad2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = ambientGrad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw subtle hexagonal/grid conductive lines connecting nearby battery cells
      ctx.save();
      for (let i = 0; i < cells.length; i++) {
        for (let j = i + 1; j < cells.length; j++) {
          const dx = cells[i].x - cells[j].x;
          const dy = cells[i].y - cells[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 230) {
            const lineAlpha = (1 - dist / 230) * 0.22;

            // Draw circuit-style segmented line
            ctx.beginPath();
            ctx.moveTo(cells[i].x, cells[i].y);

            // Slight circuit kink for high-tech aesthetic
            const midX = (cells[i].x + cells[j].x) / 2;
            const midY = (cells[i].y + cells[j].y) / 2;
            ctx.quadraticCurveTo(midX + Math.sin(globalTime + i) * 10, midY, cells[j].x, cells[j].y);

            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Randomly spawn energy pulse if none exists between these two
            if (Math.random() < 0.003 && pulses.length < 8) {
              pulses.push({
                fromX: cells[i].x,
                fromY: cells[i].y,
                toX: cells[j].x,
                toY: cells[j].y,
                progress: 0,
                speed: 0.6 + Math.random() * 0.8,
                color: 'rgba(52, 211, 153, 0.8)'
              });
            }
          }
        }
      }
      ctx.restore();

      // 3. Update & render energy pulses along conductors
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const p = pulses[pIdx];
        p.progress += p.speed * dt;

        if (p.progress >= 1) {
          pulses.splice(pIdx, 1);
          continue;
        }

        const currX = p.fromX + (p.toX - p.fromX) * p.progress;
        const currY = p.fromY + (p.toY - p.fromY) * p.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 4. Update & render ambient green Lithium-Ion particles
      for (const ion of ions) {
        ion.x += ion.vx * dt * 60;
        ion.y += ion.vy * dt * 60;

        if (ion.x < 0) ion.x = width;
        if (ion.x > width) ion.x = 0;
        if (ion.y < 0) ion.y = height;
        if (ion.y > height) ion.y = 0;

        // Subtle mouse repulsion
        if (mouse.active) {
          const mdx = ion.x - mouse.x;
          const mdy = ion.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 100 && mdist > 0) {
            const force = (100 - mdist) / 100;
            ion.x += (mdx / mdist) * force * 1.2;
            ion.y += (mdy / mdist) * force * 1.2;
          }
        }

        const alpha = ion.baseAlpha + Math.sin(globalTime * ion.pulseSpeed) * 0.1;
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, ion.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${Math.max(0.05, alpha)})`;
        ctx.fill();
      }

      // 5. Update & Render Battery Cells
      for (let cIdx = 0; cIdx < cells.length; cIdx++) {
        const c = cells[cIdx];

        // Smooth physics & harmonic floating
        c.phase += dt * 0.8;
        c.angle += c.angularVelocity;

        // Gentle bounds on angle to keep it professional (no upside-down spinning)
        if (c.angle > 0.28) c.angularVelocity = -Math.abs(c.angularVelocity);
        if (c.angle < -0.28) c.angularVelocity = Math.abs(c.angularVelocity);

        // Hover offset using harmonic sines
        const floatX = Math.sin(c.phase * 0.6 + cIdx) * 14;
        const floatY = Math.cos(c.phase * 0.8 + cIdx * 1.5) * 18;

        // Mouse Parallax & Soft Interactive Repulsion
        let mouseOffsetX = 0;
        let mouseOffsetY = 0;
        if (mouse.active) {
          const dx = c.x - mouse.x;
          const dy = c.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            const push = ((180 - dist) / 180) * 25;
            mouseOffsetX = (dx / dist) * push;
            mouseOffsetY = (dy / dist) * push;
          }
        }

        c.x = c.baseX + floatX + mouseOffsetX;
        c.y = c.baseY + floatY + mouseOffsetY;

        // Continuous green battery charging cycle
        c.charge += c.chargeSpeed;
        if (c.charge >= 1.0) {
          c.charge = 0.25; // Reset smoothly
          // Trigger a subtle pulse ring
          c.pulseTime = 0;
        }

        c.pulseTime += dt;

        // Render Battery
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.angle);

        // Draw Expanding Ripple if just hit 100%
        if (c.pulseTime < 1.2) {
          const rProg = c.pulseTime / 1.2;
          ctx.beginPath();
          ctx.ellipse(0, 0, (c.width + 20) * (1 + rProg * 0.6), (c.height + 20) * (1 + rProg * 0.6), 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(52, 211, 153, ${(1 - rProg) * 0.35})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Distinct Render Styles based on Battery Type
        if (c.type === 'cylindrical') {
          drawCylindricalCell(ctx, c, globalTime);
        } else if (c.type === 'prismatic') {
          drawPrismaticModule(ctx, c, globalTime);
        } else if (c.type === 'pack') {
          drawBatteryPack(ctx, c, globalTime);
        } else {
          drawMinimalistCell(ctx, c, globalTime);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden transition-opacity duration-700 ${className}`}>
      {/* Soft Luxury Green Ambient Blurred Orbs */}
      <div
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-emerald-400/25 blur-[100px] pointer-events-none animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-teal-400/20 blur-[110px] pointer-events-none animate-pulse"
        style={{ animationDuration: '10s' }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-[520px] h-[520px] rounded-full bg-green-500/20 blur-[95px] pointer-events-none animate-pulse"
        style={{ animationDuration: '9s' }}
      />

      {/* Soft Luxury Green Mesh Underlayer */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 85% 75%, rgba(5, 150, 105, 0.07) 0%, transparent 45%),
            linear-gradient(rgba(16, 185, 129, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px'
        }}
      />

      {/* Animated Canvas with Gaussian Blur Filter */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none transition-all duration-500"
        style={{
          filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
          transform: blurAmount > 0 ? 'scale(1.05)' : 'none',
        }}
      />

      {/* Frosted Glass Diffusion Overlay for Smooth Luxury Feel */}
      {showFrostedOverlay && (
        <div className="absolute inset-0 backdrop-blur-[6px] bg-white/20 pointer-events-none" />
      )}
    </div>
  );
}

/**
 * High-Tech 4680 / 21700 Cylindrical EV Battery Cell
 */
function drawCylindricalCell(ctx: CanvasRenderingContext2D, c: BatteryCell, time: number) {
  const halfW = c.width / 2;
  const halfH = c.height / 2;
  const radius = 8 * c.scale;
  const capW = halfW * 0.65;
  const capH = 5 * c.scale;

  // 1. Positive Terminal Cap (+ Anode Nub)
  ctx.beginPath();
  ctx.roundRect(-capW / 2, -halfH - capH, capW, capH, [3, 3, 0, 0]);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.65)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(5, 150, 105, 0.8)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 2. Main Outer Glass Casing
  ctx.beginPath();
  ctx.roundRect(-halfW, -halfH, c.width, c.height, radius);

  // Clean Glassmorphism gradient
  const glassGrad = ctx.createLinearGradient(-halfW, -halfH, halfW, halfH);
  glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  glassGrad.addColorStop(0.5, 'rgba(240, 253, 244, 0.6)');
  glassGrad.addColorStop(1, 'rgba(220, 252, 231, 0.7)');
  ctx.fillStyle = glassGrad;
  ctx.fill();

  // Subtle Outer Green Glow Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(16, 185, 129, 0.25)';
  ctx.shadowBlur = 12 * c.scale;
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.restore();

  // 3. Animated Green Battery Charge Fluid & Level
  const innerPad = 3 * c.scale;
  const fillW = c.width - innerPad * 2;
  const maxFillH = c.height - innerPad * 2;
  const fillH = maxFillH * c.charge;
  const fillY = halfH - innerPad - fillH;

  ctx.save();
  // Clip to inner rounded rect
  ctx.beginPath();
  ctx.roundRect(-halfW + innerPad, -halfH + innerPad, fillW, maxFillH, radius - 2);
  ctx.clip();

  // Energy fill gradient with deep emerald base and bright glowing top
  const fluidGrad = ctx.createLinearGradient(0, halfH, 0, fillY);
  fluidGrad.addColorStop(0, 'rgba(5, 150, 105, 0.45)');
  fluidGrad.addColorStop(0.65, 'rgba(16, 185, 129, 0.6)');
  fluidGrad.addColorStop(1, 'rgba(52, 211, 153, 0.85)');

  // Dynamic oscillating liquid surface
  ctx.beginPath();
  ctx.moveTo(-halfW + innerPad, halfH);
  ctx.lineTo(-halfW + innerPad, fillY);

  const waveFreq = 0.2;
  const waveAmp = 2.2 * c.scale;
  for (let x = -halfW + innerPad; x <= halfW - innerPad; x += 3) {
    const waveY = fillY + Math.sin(x * waveFreq + time * 3 + c.phase) * waveAmp;
    ctx.lineTo(x, waveY);
  }
  ctx.lineTo(halfW - innerPad, halfH);
  ctx.closePath();
  ctx.fillStyle = fluidGrad;
  ctx.fill();

  // Internal Floating Charge Ion Bubbles
  for (const p of c.particles) {
    p.y -= p.vy;
    if (p.y < 0) p.y = fillH;
    if (p.y <= fillH) {
      ctx.beginPath();
      ctx.arc(p.x, halfH - innerPad - p.y, p.size * c.scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167, 243, 208, ${p.alpha})`;
      ctx.fill();
    }
  }

  // 4. Subtle Cathode Grid Rings & Micro-level notches
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1;
  const segmentCount = 4;
  for (let s = 1; s < segmentCount; s++) {
    const segY = halfH - innerPad - (maxFillH / segmentCount) * s;
    ctx.beginPath();
    ctx.moveTo(-halfW + innerPad + 3, segY);
    ctx.lineTo(halfW - innerPad - 3, segY);
    ctx.stroke();
  }

  ctx.restore();

  // 5. Technical Metadata Micro-Typography
  ctx.save();
  ctx.font = `600 ${Math.max(7, Math.round(8 * c.scale))}px -apple-system, BlinkMacSystemFont, "SF Mono", monospace`;
  ctx.fillStyle = 'rgba(6, 78, 59, 0.85)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Show Battery Charge Percentage
  const pct = Math.round(c.charge * 100);
  ctx.fillText(`${pct}%`, 0, -halfH * 0.2);

  // Micro voltage badge
  ctx.font = `500 ${Math.max(6, Math.round(6.5 * c.scale))}px monospace`;
  ctx.fillStyle = 'rgba(5, 150, 105, 0.7)';
  ctx.fillText(c.voltage, 0, halfH * 0.45);
  ctx.restore();

  // Small '+' badge at top
  ctx.save();
  ctx.font = `bold ${Math.round(8 * c.scale)}px sans-serif`;
  ctx.fillStyle = 'rgba(5, 150, 105, 0.9)';
  ctx.textAlign = 'center';
  ctx.fillText('+', 0, -halfH + 9 * c.scale);
  ctx.restore();
}

/**
 * Industrial Prismatic Battery Module with Dual Posts & Segmented Meters
 */
function drawPrismaticModule(ctx: CanvasRenderingContext2D, c: BatteryCell, time: number) {
  const halfW = c.width / 2;
  const halfH = c.height / 2;
  const radius = 6 * c.scale;
  const terminalDist = halfW * 0.55;

  // 1. Dual Terminals (+ Anode in Green, - Cathode in Slate)
  // Positive (+)
  ctx.beginPath();
  ctx.arc(-terminalDist, -halfH - 3 * c.scale, 3.5 * c.scale, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(5, 150, 105, 0.9)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Negative (-)
  ctx.beginPath();
  ctx.arc(terminalDist, -halfH - 3 * c.scale, 3.5 * c.scale, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(100, 116, 139, 0.7)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.8)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 2. Prismatic Casing
  ctx.beginPath();
  ctx.roundRect(-halfW, -halfH, c.width, c.height, radius);
  const bodyGrad = ctx.createLinearGradient(-halfW, -halfH, halfW, halfH);
  bodyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  bodyGrad.addColorStop(0.5, 'rgba(240, 253, 244, 0.75)');
  bodyGrad.addColorStop(1, 'rgba(220, 252, 231, 0.85)');
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.lineWidth = 1.3;
  ctx.stroke();

  // 3. Segmented Energy Meter Bars
  const bars = 4;
  const barMargin = 3 * c.scale;
  const totalBarWidth = c.width - 16 * c.scale;
  const singleBarW = (totalBarWidth - barMargin * (bars - 1)) / bars;
  const barH = 14 * c.scale;
  const barY = -4 * c.scale;

  const activeBars = Math.floor(c.charge * bars);

  for (let b = 0; b < bars; b++) {
    const barX = -totalBarWidth / 2 + b * (singleBarW + barMargin);
    ctx.beginPath();
    ctx.roundRect(barX, barY, singleBarW, barH, 2);

    if (b < activeBars) {
      // Lit green bar
      const barGrad = ctx.createLinearGradient(barX, barY, barX, barY + barH);
      barGrad.addColorStop(0, 'rgba(52, 211, 153, 0.9)');
      barGrad.addColorStop(1, 'rgba(5, 150, 105, 0.8)');
      ctx.fillStyle = barGrad;
      ctx.fill();
    } else if (b === activeBars) {
      // Partially lit / pulsing bar
      const partialAlpha = (c.charge * bars - activeBars) * 0.75;
      ctx.fillStyle = `rgba(16, 185, 129, ${partialAlpha})`;
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
      ctx.stroke();
    } else {
      // Inactive bar
      ctx.fillStyle = 'rgba(229, 231, 235, 0.4)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(209, 213, 219, 0.3)';
      ctx.stroke();
    }
  }

  // 4. State of Health (SoH) and Label
  ctx.save();
  ctx.font = `600 ${Math.max(6.5, Math.round(7.5 * c.scale))}px monospace`;
  ctx.fillStyle = 'rgba(6, 78, 59, 0.8)';
  ctx.textAlign = 'center';
  ctx.fillText(c.label, 0, -halfH + 11 * c.scale);

  ctx.font = `500 ${Math.max(6, Math.round(6.5 * c.scale))}px monospace`;
  ctx.fillStyle = 'rgba(5, 150, 105, 0.75)';
  ctx.fillText(c.soh, 0, halfH - 7 * c.scale);
  ctx.restore();
}

/**
 * Multi-Cell Energy Pack with Glass Matrix
 */
function drawBatteryPack(ctx: CanvasRenderingContext2D, c: BatteryCell, time: number) {
  const halfW = c.width / 2;
  const halfH = c.height / 2;
  const radius = 8 * c.scale;

  // Outer Enclosure
  ctx.beginPath();
  ctx.roundRect(-halfW, -halfH, c.width, c.height, radius);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Internal 3-cell cluster
  const subCellCount = 3;
  const subW = (c.width - 16 * c.scale) / subCellCount;
  const subH = c.height - 18 * c.scale;

  for (let s = 0; s < subCellCount; s++) {
    const subX = -halfW + 8 * c.scale + s * subW;
    const subY = -subH / 2;

    ctx.beginPath();
    ctx.roundRect(subX + 2, subY, subW - 4, subH, 3);
    ctx.fillStyle = 'rgba(240, 253, 244, 0.7)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Internal fill based on charge and subcell offset
    const cellCharge = Math.min(1, Math.max(0, c.charge * 1.2 - s * 0.1));
    const subFillH = (subH - 4) * cellCharge;

    ctx.beginPath();
    ctx.roundRect(subX + 3, subY + subH - 2 - subFillH, subW - 6, subFillH, 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.65)';
    ctx.fill();
  }

  // Energy flow badge on pack
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, halfH - 6 * c.scale, 2.5 * c.scale, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
  ctx.fill();
  ctx.restore();
}

/**
 * Minimalist Tech Capsule / Nano Cell with Lightning Icon
 */
function drawMinimalistCell(ctx: CanvasRenderingContext2D, c: BatteryCell, time: number) {
  const halfW = c.width / 2;
  const halfH = c.height / 2;
  const radius = halfW;

  // Capsule outline
  ctx.beginPath();
  ctx.roundRect(-halfW, -halfH, c.width, c.height, radius);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Pulse ring inside
  const pulseScale = 0.5 + Math.sin(time * 2 + c.phase) * 0.15;
  ctx.beginPath();
  ctx.arc(0, 0, halfW * pulseScale, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(52, 211, 153, 0.25)';
  ctx.fill();

  // Subtle clean lightning bolt
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(1, -7 * c.scale);
  ctx.lineTo(-4 * c.scale, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(-1, 7 * c.scale);
  ctx.lineTo(4 * c.scale, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fillStyle = 'rgba(5, 150, 105, 0.8)';
  ctx.fill();
  ctx.restore();
}
