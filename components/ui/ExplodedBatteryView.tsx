'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Layers, 
  ExternalLink, 
  Play, 
  Pause, 
  RotateCcw, 
  Cpu, 
  Zap, 
  Thermometer, 
  ShieldCheck, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { BorderBeam } from './BorderBeam';

const TOTAL_FRAMES = 151;

interface ComponentStage {
  name: string;
  stageNum: number;
  range: [number, number];
  description: string;
  specs: { label: string; value: string }[];
}

const STAGES: ComponentStage[] = [
  {
    name: 'Reinforced IP68 Enclosure & Sealed Housing',
    stageNum: 1,
    range: [1, 38],
    description: 'Aircraft-grade 6061-T6 aluminum extrusion with IP68 hermetic seal to prevent moisture ingress and mechanical damage.',
    specs: [
      { label: 'Structural Material', value: '6061-T6 Aluminum' },
      { label: 'Ingress Rating', value: 'IP68 Hermetic' },
      { label: 'Module Mass', value: '28.4 kg' },
    ],
  },
  {
    name: 'Thermal Aerogel Barrier & Top Cover',
    stageNum: 2,
    range: [39, 82],
    description: 'Pyrogel aerogel insulation lid preventing cell-to-cell thermal propagation during high-current DC fast charging.',
    specs: [
      { label: 'Thermal Conductivity', value: '0.018 W/m·K' },
      { label: 'Propagation Limit', value: 'UL 9540A Verified' },
      { label: 'Operating Temp', value: '-20°C to 55°C' },
    ],
  },
  {
    name: 'Dual High-Current Copper Busbar Array',
    stageNum: 3,
    range: [83, 122],
    description: 'Solid C11000 electrolytic copper busbars engineered for ultra-low ESR and sustained 400A discharge rates.',
    specs: [
      { label: 'Conductor Material', value: 'C11000 Pure Cu' },
      { label: 'Contact Resistance', value: '< 0.11 mΩ' },
      { label: 'Max Surge Current', value: '420 A (10s)' },
    ],
  },
  {
    name: 'LFP Prismatic Core Cell Matrix (16S)',
    stageNum: 4,
    range: [123, 151],
    description: '16S modular Lithium Iron Phosphate (LiFePO4) prismatic cells providing 51.2V nominal output with 4,000+ cycle life.',
    specs: [
      { label: 'Cell Chemistry', value: 'LFP (LiFePO4)' },
      { label: 'Configuration', value: '16S1P Nominal 51.2V' },
      { label: 'Energy Capacity', value: '3.07 kWh (60 Ah)' },
    ],
  },
];

export function ExplodedBatteryView() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded images cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format frame filename: ezgif-frame-001.jpg
  const getFramePath = (frameIndex: number) => {
    const padded = String(frameIndex).padStart(3, '0');
    return `/ezgif-66a02f001aac742e-jpg/ezgif-frame-${padded}.jpg`;
  };

  // Preload all frames on mount
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setImagesLoadedCount(loaded);
        // Draw first frame as soon as it's ready
        if (i === 1 && currentFrame === 1) {
          renderToCanvas(1);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Draw a specific frame to the high-DPI canvas
  const renderToCanvas = (frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameNum - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Resize canvas internal buffer to match displayed pixel size & devicePixelRatio
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Deep black canvas background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Contain aspect ratio
    const hRatio = rect.width / img.naturalWidth;
    const vRatio = rect.height / img.naturalHeight;
    const ratio = Math.min(hRatio, vRatio);

    const drawW = img.naturalWidth * ratio;
    const drawH = img.naturalHeight * ratio;
    const drawX = (rect.width - drawW) / 2;
    const drawY = (rect.height - drawH) / 2;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, drawY, drawW, drawH);
    ctx.restore();
  };

  // Redraw when currentFrame changes or window resizes
  useEffect(() => {
    renderToCanvas(currentFrame);
  }, [currentFrame]);

  useEffect(() => {
    const handleResize = () => {
      renderToCanvas(currentFrame);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame]);

  // SCROLL-DRIVEN PINNING:
  // When track enters the pinned zone, normal scrolling progresses through frames 1 to 151.
  // The rest of the page does NOT scroll down until all 151 frames have been displayed.
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (isPlaying) {
            ticking = false;
            return;
          }

          if (!trackRef.current || !stickyRef.current) {
            ticking = false;
            return;
          }

          const trackRect = trackRef.current.getBoundingClientRect();
          const stickyRect = stickyRef.current.getBoundingClientRect();

          // Sticky target top offset from viewport top (80px matches sticky top-20)
          const stickyTop = 80;
          const scrolledInside = stickyTop - trackRect.top;
          const totalScrollable = trackRect.height - stickyRect.height;

          if (totalScrollable > 0) {
            let progress = scrolledInside / totalScrollable;
            progress = Math.max(0, Math.min(1, progress));

            const targetFrame = Math.min(
              TOTAL_FRAMES,
              Math.max(1, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1)
            );

            setCurrentFrame(targetFrame);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial evaluation
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [isPlaying]);

  // Auto-play animation feature
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= TOTAL_FRAMES) {
            setIsPlaying(false);
            return TOTAL_FRAMES;
          }
          return prev + 1;
        });
      }, 45);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  // Current stage info
  const currentStage = STAGES.find(
    (s) => currentFrame >= s.range[0] && currentFrame <= s.range[1]
  ) || STAGES[0];

  const progressPercent = Math.round(((currentFrame - 1) / (TOTAL_FRAMES - 1)) * 100);

  // Manual scrubber jump
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrame = parseInt(e.target.value, 10);
    setCurrentFrame(newFrame);

    // Synchronize page scroll position if inside track
    if (trackRef.current && stickyRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const stickyRect = stickyRef.current.getBoundingClientRect();
      const totalScrollable = trackRect.height - stickyRect.height;
      const progress = (newFrame - 1) / (TOTAL_FRAMES - 1);
      const targetScrollTop = window.scrollY + trackRect.top - 80 + progress * totalScrollable;
      window.scrollTo({ top: targetScrollTop, behavior: 'instant' });
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full h-[320vh] mt-12 mb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Sticky Card Viewport Container: Stays pinned as the user scrolls */}
      <div
        ref={stickyRef}
        className="sticky top-20 z-20 w-full flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="group/card relative w-full rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Ambient Border Glow */}
          <BorderBeam
            hoverOnly={false}
            borderRadius={24}
            duration={8}
            colorFrom="#0070F3"
            colorMid="#6366F1"
            colorTo="#38BDF8"
          />

          {/* Top HUD Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30 backdrop-blur-md gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#38BDF8] shadow-inner">
                <Layers className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#38BDF8] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0070F3] animate-ping" />
                    3D Exploded Hardware View
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#9BB3A8] border border-white/10">
                    Asset RX-2026-892738 (LFP 60Ah)
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#EDEDED] mt-0.5 flex items-center gap-2">
                  <span>{currentStage.name}</span>
                </h3>
              </div>
            </div>

            {/* Top Right Badges & Passport Link */}
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-[10px] font-mono font-semibold text-[#9BB3A8]">
                  FRAME {String(currentFrame).padStart(3, '0')} / {TOTAL_FRAMES}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#38BDF8]">
                  <span>{progressPercent}% Exploded</span>
                </div>
              </div>

              <Link
                href="/battery/RX-2026-892738"
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 transition-all shadow-xs"
              >
                <span>Passport</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive Exploded View Canvas Stage */}
          <div className="relative w-full h-[52vh] sm:h-[58vh] max-h-[580px] min-h-[380px] bg-black flex items-center justify-center overflow-hidden select-none">
            {/* High DPI HTML5 Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full block object-contain cursor-grab active:cursor-grabbing"
            />

            {/* Fallback frame 1 while images are caching */}
            {imagesLoadedCount === 0 && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/ezgif-66a02f001aac742e-jpg/ezgif-frame-001.jpg"
                alt="Battery RX-2026-892738 Exploded View"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            )}

            {/* Stage Badge Floating HUD (Top Left) */}
            <div className="absolute top-4 left-4 z-10 max-w-xs sm:max-w-sm pointer-events-none">
              <div className="p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-left shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#38BDF8] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#0070F3]" />
                    Stage {currentStage.stageNum} of 4
                  </span>
                  <span className="text-[10px] font-mono text-[#9BB3A8]">
                    Frames {currentStage.range[0]}-{currentStage.range[1]}
                  </span>
                </div>
                <p className="text-xs text-[#F8FAFC] font-medium leading-tight mb-2">
                  {currentStage.description}
                </p>
                <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-white/10 text-[10px]">
                  {currentStage.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[#62756E] dark:text-[#9BB3A8] text-[9px] truncate">{spec.label}</span>
                      <span className="font-mono font-bold text-[#F8FAFC] truncate">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Live Telemetry Metrics HUD (Top Right) */}
            <div className="hidden md:flex flex-col gap-2 absolute top-4 right-4 z-10 pointer-events-none">
              <div className="px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-2.5 shadow-lg">
                <Zap className="w-3.5 h-3.5 text-[#0070F3]" />
                <div className="text-left">
                  <div className="text-[9px] text-[#9BB3A8] uppercase tracking-wider">Busbar Voltage</div>
                  <div className="text-xs font-mono font-bold text-[#F8FAFC]">51.2 V Nominal</div>
                </div>
              </div>

              <div className="px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-2.5 shadow-lg">
                <Thermometer className="w-3.5 h-3.5 text-[#F59E0B]" />
                <div className="text-left">
                  <div className="text-[9px] text-[#9BB3A8] uppercase tracking-wider">Module Core Temp</div>
                  <div className="text-xs font-mono font-bold text-[#F8FAFC]">38.4 °C (Normal)</div>
                </div>
              </div>

              <div className="px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-2.5 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                <div className="text-left">
                  <div className="text-[9px] text-[#9BB3A8] uppercase tracking-wider">Core Health</div>
                  <div className="text-xs font-mono font-bold text-[#38BDF8]">72% SOH (Second Life)</div>
                </div>
              </div>
            </div>

            {/* Subtle Scroll Down Prompt (fades out as user scrolls) */}
            {currentFrame <= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs font-medium text-[#38BDF8] backdrop-blur-md shadow-md animate-bounce"
              >
                <span>Scroll down to explode battery view</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            )}
          </div>

          {/* Bottom Interactive Scrubber & Controls Bar */}
          <div className="px-6 py-3.5 bg-black/30 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            {/* Scrubber Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0070F3] hover:bg-[#0058C6] text-white text-xs font-semibold shadow-xs transition-colors"
                title={isPlaying ? 'Pause Auto-Explode' : 'Auto-Explode Battery'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentFrame(1);
                  if (trackRef.current) {
                    const trackRect = trackRef.current.getBoundingClientRect();
                    window.scrollTo({ top: window.scrollY + trackRect.top - 80, behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs transition-colors"
                title="Reset to Assembled View"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              {/* Stage Jump Buttons */}
              <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-white/10">
                {STAGES.map((stage) => {
                  const isActive = currentStage.stageNum === stage.stageNum;
                  return (
                    <button
                      key={stage.stageNum}
                      type="button"
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentFrame(stage.range[0]);
                        if (trackRef.current && stickyRef.current) {
                          const trackRect = trackRef.current.getBoundingClientRect();
                          const stickyRect = stickyRef.current.getBoundingClientRect();
                          const totalScrollable = trackRect.height - stickyRect.height;
                          const progress = (stage.range[0] - 1) / (TOTAL_FRAMES - 1);
                          window.scrollTo({
                            top: window.scrollY + trackRect.top - 80 + progress * totalScrollable,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                        isActive
                          ? 'bg-blue-500/20 text-[#38BDF8] border border-blue-500/30 font-bold'
                          : 'text-[#9BB3A8] hover:text-white'
                      }`}
                    >
                      Stage {stage.stageNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider Scrubber */}
            <div className="flex items-center gap-3 w-full sm:flex-1 sm:max-w-md">
              <span className="text-[10px] font-mono text-[#9BB3A8] whitespace-nowrap">
                001
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min={1}
                  max={TOTAL_FRAMES}
                  value={currentFrame}
                  onChange={handleScrubberChange}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0070F3]"
                  aria-label="Exploded View Frame Scrubber"
                />
              </div>
              <span className="text-[10px] font-mono text-[#38BDF8] font-bold whitespace-nowrap">
                151
              </span>
            </div>

            {/* Single Source of Truth link */}
            <div className="hidden md:flex items-center gap-2 text-xs text-[#9BB3A8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0070F3] animate-pulse" />
              <span>Scroll to scrub • Pinned until fully exploded</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
