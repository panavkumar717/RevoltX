'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, Zap, Activity } from 'lucide-react';

interface LoginHeroArtworkProps {
  portalTitle?: string;
  quote?: string;
  subquote?: string;
  accentColor?: string;
}

export function LoginHeroArtwork({
  portalTitle = "ReVoltX Passport OS",
  quote = "Finally, all your battery intelligence in one place.",
  subquote = "Real-time telemetry, automated health assessment, and closed-loop circularity.",
  accentColor = "#137A58"
}: LoginHeroArtworkProps) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      badge: "EU Battery Passport 2026",
      quote: quote,
      subquote: subquote
    },
    {
      badge: "UL 1974 Circular Protocol",
      quote: "Every battery retired from mobility deserves a second life.",
      subquote: "Empowering clean stationary energy storage across global microgrids."
    },
    {
      badge: "Smart Hardware Diagnostics",
      quote: "Electrochemical impedance verified down to the cell level.",
      subquote: "Field telemetry and non-destructive testing at 100k+ asset scale."
    }
  ];

  const current = slides[slide];

  return (
    <div className="relative h-full w-full min-h-[460px] lg:min-h-[580px] rounded-[28px] overflow-hidden flex flex-col justify-between p-8 sm:p-10 select-none shadow-2xl">
      {/* Background Dusk / Sunset Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B4B] via-[#311042] to-[#0A0A14] z-0" />

      {/* Glowing Energy Sun / Orb */}
      <div className="absolute top-12 left-10 w-44 h-44 rounded-full bg-gradient-to-tr from-[#FDE047] via-[#F97316] to-[#EC4899] opacity-90 blur-xl pointer-events-none" />
      <div className="absolute top-16 left-14 w-32 h-32 rounded-full bg-[#FEF08A] opacity-95 pointer-events-none shadow-[0_0_80px_rgba(251,191,36,0.8)]" />

      {/* Warm Sky Ray Bleed */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br from-[#FB923C]/30 via-[#C084FC]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Layered Illustrated Landscape (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        viewBox="0 0 500 600"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Distant Mountains */}
        <path
          d="M-50 420 L80 320 L190 390 L310 290 L440 370 L550 280 L550 600 L-50 600 Z"
          fill="#3B1C54"
          opacity="0.85"
        />
        <path
          d="M-30 460 L120 380 L240 430 L380 350 L530 440 L530 600 L-30 600 Z"
          fill="#25123D"
        />

        {/* Foreground Stylized Horizon & Snow/Cliff Ledge */}
        <path
          d="M-20 480 Q140 420 320 450 T520 420 L520 600 L-20 600 Z"
          fill="#1C1838"
        />
        <path
          d="M80 430 C180 380 340 400 480 360 C530 350 550 360 550 440 C460 480 300 500 120 480 Z"
          fill="#21A879"
          fillOpacity="0.45"
        />
        <path
          d="M160 420 C250 370 380 390 490 350 C460 430 340 460 180 450 Z"
          fill="#A7F3D0"
          fillOpacity="0.75"
        />

        {/* Foreground Plateau */}
        <path
          d="M-10 520 C90 490 260 520 420 490 L520 540 L520 600 L-10 600 Z"
          fill="#0F0D20"
        />

        {/* Tree Silhouettes */}
        <g stroke="#0A0817" strokeWidth="2.5" strokeLinecap="round">
          {/* Tree 1 */}
          <line x1="280" y1="520" x2="280" y2="440" />
          <line x1="280" y1="480" x2="265" y2="465" />
          <line x1="280" y1="465" x2="295" y2="450" />
          <line x1="280" y1="450" x2="270" y2="435" />
          <line x1="280" y1="445" x2="288" y2="430" />

          {/* Tree 2 */}
          <line x1="330" y1="540" x2="330" y2="430" strokeWidth="3" />
          <line x1="330" y1="490" x2="310" y2="470" />
          <line x1="330" y1="475" x2="350" y2="455" />
          <line x1="330" y1="455" x2="318" y2="440" />
          <line x1="330" y1="440" x2="342" y2="425" />
          <line x1="330" y1="430" x2="330" y2="415" />

          {/* Tree 3 */}
          <line x1="375" y1="535" x2="375" y2="460" strokeWidth="2.2" />
          <line x1="375" y1="500" x2="360" y2="485" />
          <line x1="375" y1="485" x2="390" y2="470" />
          <line x1="375" y1="470" x2="365" y2="455" />

          {/* Tree 4 */}
          <line x1="230" y1="540" x2="230" y2="475" strokeWidth="2" />
          <line x1="230" y1="510" x2="218" y2="495" />
          <line x1="230" y1="495" x2="242" y2="480" />
        </g>
      </svg>

      {/* Top Branding Pill */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
          <span>{current.badge}</span>
        </div>
        <div className="text-white/60 text-xs font-mono font-medium">
          {portalTitle}
        </div>
      </div>

      {/* Bottom Quote & Carousel Controls */}
      <div className="relative z-20 space-y-5 pt-8">
        <div className="max-w-md">
          <p className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
            "{current.quote}"
          </p>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed drop-shadow">
            {current.subquote}
          </p>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="w-10 h-10 rounded-full border border-white/30 bg-black/20 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="w-10 h-10 rounded-full border border-white/30 bg-black/20 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Next Slide"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 ml-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === slide ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
