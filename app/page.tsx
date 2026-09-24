'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  PlayCircle, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Thermometer, 
  Gauge, 
  RefreshCw, 
  Recycle, 
  Factory, 
  User, 
  CheckCircle2, 
  QrCode, 
  TrendingUp, 
  Leaf, 
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { PublicNavbar } from '../components/shared/PublicNavbar';
import { PublicFooter } from '../components/shared/PublicFooter';
import { RXScoreGauge } from '../components/ui/RXScoreGauge';
import { SmartDockVisualizer } from '../components/ui/SmartDockVisualizer';
import { QRCodeWidget } from '../components/ui/QRCodeWidget';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { BorderBeam } from '../components/ui/BorderBeam';
import { BlurText } from '../components/ui/BlurText';
import { ShinyText } from '../components/ui/ShinyText';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { HeroBackground } from '../components/ui/HeroBackground';

export default function LandingPage() {
  const [activeBranch, setActiveBranch] = useState<'continue' | 'secondLife' | 'recycle'>('secondLife');

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-[#0B1310] flex flex-col selection:bg-[#DDF5EA] dark:selection:bg-[#133325] selection:text-[#137A58] dark:selection:text-[#34D399] transition-colors">
      <PublicNavbar />

      {/* ========================================================
          HERO SECTION with Interactive Lifecycle Flow
      ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-[#DDE7E2] dark:border-[#1E352B]">
        {/* React Bits Interactive Particle Background */}
        <HeroBackground particleCount={32} />

        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#DDE7E2_1px,transparent_1px),linear-gradient(to_bottom,#DDE7E2_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1E352B_1px,transparent_1px),linear-gradient(to_bottom,#1E352B_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 dark:opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge & Pill */}
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DDF5EA]/90 dark:bg-[#133325]/90 backdrop-blur-xs border border-[#BBEAD7] dark:border-[#1E4D38] text-xs font-semibold text-[#137A58] dark:text-[#34D399] mb-6 shadow-2xs hover:border-[#137A58] dark:hover:border-[#34D399] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#21A879] dark:text-[#34D399] animate-spin-slow" />
              <ShinyText text="EU Battery Passport Ready • UL 1974 Circular Protocol" speed={3.5} className="text-xs" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#137A58] dark:bg-[#34D399] animate-ping" />
              <span className="text-[#62756E] dark:text-[#9BB3A8] font-normal">v2.6 OS</span>
            </motion.div>

            {/* Headline with React Bits BlurText */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#10201B] dark:text-[#ECFDF5] max-w-4xl"
            >
              <BlurText text="Every Battery Has a" delay={60} className="inline-flex justify-center" />
              {' '}
              <span className="relative text-[#137A58] dark:text-[#21A879] inline-block font-extrabold ml-1">
                Second Life.
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#C9EF72]/45 dark:bg-[#C9EF72]/20 -z-10 rounded-sm -rotate-1" />
              </span>
            </motion.div>

            {/* Subhead */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-[#62756E] dark:text-[#9BB3A8] max-w-2xl leading-relaxed"
            >
              ReVoltX creates a continuous intelligence layer for batteries — from manufacture to first life, deep health diagnostics, second life and closed-loop recycling.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
            >
              <Link
                href="/demo"
                className="relative group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#137A58] dark:bg-[#21A879] text-white font-semibold text-sm hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shadow-sm hover:shadow-lg hover:shadow-[#137A58]/20 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <PlayCircle className="w-4 h-4 text-[#C9EF72] group-hover:scale-110 transition-transform" />
                <span>Launch Interactive Demo (90s)</span>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-[#111E18] text-[#10201B] dark:text-[#ECFDF5] font-semibold text-sm hover:bg-[#F0F5F2] dark:hover:bg-[#162720] hover:border-[#137A58] dark:hover:border-[#34D399] border border-[#DDE7E2] dark:border-[#1E352B] shadow-2xs transition-all hover:scale-[1.02]"
              >
                <span>Explore Platform Architecture</span>
              </Link>
            </motion.div>
          </div>

          {/* ========================================================
              Interactive Battery Lifecycle Hero Diagram (Requirement 31)
          ======================================================== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group/hero mt-14 bg-white dark:bg-[#111E18] rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] dark:border-[#1E352B] shadow-sm relative overflow-hidden"
          >
            {/* Ambient Border Beam on Hero Diagram */}
            <BorderBeam
              hoverOnly={true}
              borderRadius={24}
              duration={7}
              colorFrom="#137A58"
              colorMid="#21A879"
              colorTo="#C9EF72"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DDE7E2] dark:border-[#1E352B] gap-3 relative z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] dark:text-[#9BB3A8]">
                  Continuous Lifecycle Telemetry & AI Decision Engine
                </span>
                <h3 className="text-xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-0.5">
                  Live Dynamic Asset: Battery RX-2026-892738 (LFP 60Ah)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] border border-[#BBEAD7] dark:border-[#1E4D38] shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-[#137A58] dark:bg-[#34D399] animate-ping" />
                  Real-time Data Active
                </span>
                <Link
                  href="/battery/RX-2026-892738"
                  className="text-xs font-semibold text-[#10201B] dark:text-[#ECFDF5] hover:text-[#137A58] dark:hover:text-[#34D399] flex items-center gap-1 underline underline-offset-2 transition-colors"
                >
                  Open Passport <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Visualizer Pipeline */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Column: 6 Physical Telemetry Signals */}
              <div className="lg:col-span-4 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] block mb-2">
                  1. IoT & Smart Dock Telemetry
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <SpotlightCard
                    borderRadius={12}
                    beamDuration={4}
                    className="p-3 rounded-xl bg-[#F7FAF8] dark:bg-[#15241E] border border-[#DDE7E2] dark:border-[#1E382D] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#62756E] dark:text-[#9BB3A8] text-xs">
                      <span>Voltage</span>
                      <Gauge className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] dark:text-[#ECFDF5] mt-1">
                      <AnimatedCounter value={51.2} decimals={1} suffix=" V" />
                    </p>
                    <span className="text-[10px] text-[#137A58] dark:text-[#34D399] font-medium">16S Nominal</span>
                  </SpotlightCard>

                  <SpotlightCard
                    borderRadius={12}
                    beamDuration={4}
                    className="p-3 rounded-xl bg-[#F7FAF8] dark:bg-[#15241E] border border-[#DDE7E2] dark:border-[#1E382D] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#62756E] dark:text-[#9BB3A8] text-xs">
                      <span>Current</span>
                      <Zap className="w-3.5 h-3.5 text-[#21A879] dark:text-[#34D399]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] dark:text-[#ECFDF5] mt-1">
                      <AnimatedCounter value={18.2} decimals={1} suffix=" A" />
                    </p>
                    <span className="text-[10px] text-[#62756E] dark:text-[#9BB3A8] font-medium">0.3C Load</span>
                  </SpotlightCard>

                  <SpotlightCard
                    borderRadius={12}
                    beamDuration={4}
                    beamColorFrom="#D89A24"
                    beamColorMid="#F59E0B"
                    beamColorTo="#FEF08A"
                    spotlightColor="rgba(216, 154, 36, 0.15)"
                    className="p-3 rounded-xl bg-[#F7FAF8] dark:bg-[#15241E] border border-[#DDE7E2] dark:border-[#1E382D] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#62756E] dark:text-[#9BB3A8] text-xs">
                      <span>Temperature</span>
                      <Thermometer className="w-3.5 h-3.5 text-[#D89A24] dark:text-[#FBBF24]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#D89A24] dark:text-[#FBBF24] mt-1">
                      <AnimatedCounter value={38.4} decimals={1} suffix=" °C" />
                    </p>
                    <span className="text-[10px] text-[#D89A24] dark:text-[#FBBF24] font-medium">Thermal Alert</span>
                  </SpotlightCard>

                  <SpotlightCard
                    borderRadius={12}
                    beamDuration={4}
                    beamColorFrom="#4386C5"
                    beamColorMid="#38BDF8"
                    beamColorTo="#BAE6FD"
                    spotlightColor="rgba(67, 134, 197, 0.15)"
                    className="p-3 rounded-xl bg-[#F7FAF8] dark:bg-[#15241E] border border-[#DDE7E2] dark:border-[#1E382D] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#62756E] dark:text-[#9BB3A8] text-xs">
                      <span>State of Charge</span>
                      <Activity className="w-3.5 h-3.5 text-[#4386C5] dark:text-[#60A5FA]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] dark:text-[#ECFDF5] mt-1">
                      <AnimatedCounter value={84} decimals={0} suffix=" %" />
                    </p>
                    <span className="text-[10px] text-[#62756E] dark:text-[#9BB3A8] font-medium">3.07 kWh</span>
                  </SpotlightCard>

                  <SpotlightCard
                    borderRadius={12}
                    beamDuration={4}
                    className="p-3 rounded-xl bg-[#F7FAF8] dark:bg-[#15241E] border border-[#DDE7E2] dark:border-[#1E382D] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#62756E] dark:text-[#9BB3A8] text-xs">
                      <span>State of Health</span>
                      <TrendingUp className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] dark:text-[#ECFDF5] mt-1">
                      <AnimatedCounter value={72} decimals={0} suffix=" %" />
                    </p>
                    <span className="text-[10px] text-[#D89A24] dark:text-[#FBBF24] font-medium">Below EV 80%</span>
                  </SpotlightCard>

                  <SpotlightCard
                    borderRadius={12}
                    beamDuration={4}
                    className="p-3 rounded-xl bg-[#F7FAF8] dark:bg-[#15241E] border border-[#DDE7E2] dark:border-[#1E382D] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[#62756E] dark:text-[#9BB3A8] text-xs">
                      <span>RUL Remaining</span>
                      <RefreshCw className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] dark:text-[#ECFDF5] mt-1">
                      <AnimatedCounter value={384} decimals={0} suffix=" cyc" />
                    </p>
                    <span className="text-[10px] text-[#62756E] dark:text-[#9BB3A8] font-medium">~3.5 Yrs 2nd Life</span>
                  </SpotlightCard>
                </div>
              </div>

              {/* Center: ReVoltX AI Intelligence Core */}
              <div className="lg:col-span-4 flex flex-col items-center text-center p-5 rounded-2xl bg-[#F0F5F2] dark:bg-[#14231C] border border-[#DDE7E2] dark:border-[#1E382D] relative overflow-hidden group">
                <BorderBeam
                  hoverOnly={true}
                  borderRadius={16}
                  duration={5}
                  colorFrom="#137A58"
                  colorMid="#21A879"
                  colorTo="#C9EF72"
                />

                <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399] mb-3 flex items-center gap-1.5 relative z-10">
                  <Cpu className="w-4 h-4 text-[#137A58] dark:text-[#34D399] animate-pulse" />
                  2. ReVoltX Intelligence Core
                </span>

                <div className="relative z-10">
                  <RXScoreGauge score={78} size="md" showDetails={false} />
                </div>

                <div className="mt-4 p-3 rounded-xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] text-xs text-left w-full space-y-1 relative z-10 shadow-2xs">
                  <div className="flex items-center justify-between font-semibold text-[#10201B] dark:text-[#ECFDF5]">
                    <span>Anomaly Detected</span>
                    <span className="text-[#D89A24] dark:text-[#FBBF24] text-[10px] font-mono">CODE: THM-42</span>
                  </div>
                  <p className="text-[#62756E] dark:text-[#9BB3A8] text-[11px] leading-tight">
                    Accelerated thermal degradation during fast charging. Retains 72% capacity.
                  </p>
                </div>

                <div className="mt-2 text-[10px] text-[#62756E] dark:text-[#9BB3A8] font-mono relative z-10">
                  Electrochemical Model: LFP-EIS-v4 • Confidence: 96.2%
                </div>
              </div>

              {/* Right Column: 3 Decision Engine Pathways */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] dark:text-[#9BB3A8] block mb-2">
                  3. Decision Engine Pathways
                </span>

                {/* Branch 1: Continue Use */}
                <SpotlightCard
                  borderRadius={12}
                  beamDuration={4}
                  beamColorFrom="#137A58"
                  beamColorMid="#21A879"
                  beamColorTo="#A7F3D0"
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    activeBranch === 'continue'
                      ? 'bg-[#DDF5EA] dark:bg-[#133325] border-[#137A58] dark:border-[#34D399] shadow-xs ring-2 ring-[#BBEAD7] dark:ring-[#1E4D38]'
                      : 'bg-white dark:bg-[#111E18] border-[#DDE7E2] dark:border-[#1E382D] hover:bg-[#F7FAF8] dark:hover:bg-[#162720]'
                  }`}
                  onClick={() => setActiveBranch('continue')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#137A58] dark:text-[#34D399]" />
                      CONTINUE USE
                    </span>
                    <span className="text-[10px] font-mono text-[#62756E] dark:text-[#9BB3A8]">SOH &gt; 80%</span>
                  </div>
                  <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8] mt-1">
                    Retain in primary high-draw EV mobility service.
                  </p>
                </SpotlightCard>

                {/* Branch 2: Second Life (Selected by default) */}
                <SpotlightCard
                  borderRadius={12}
                  beamDuration={4}
                  beamColorFrom="#5D7C13"
                  beamColorMid="#84CC16"
                  beamColorTo="#ECFCCB"
                  spotlightColor="rgba(93, 124, 19, 0.15)"
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    activeBranch === 'secondLife'
                      ? 'bg-[#F3F8E5] dark:bg-[#202E10] border-[#5D7C13] dark:border-[#84CC16] shadow-xs ring-2 ring-[#DAECAE] dark:ring-[#365314]'
                      : 'bg-white dark:bg-[#111E18] border-[#DDE7E2] dark:border-[#1E382D] hover:bg-[#F7FAF8] dark:hover:bg-[#162720]'
                  }`}
                  onClick={() => setActiveBranch('secondLife')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-[#5D7C13] dark:text-[#A3E635]" />
                      SECOND LIFE (RECOMMENDED)
                    </span>
                    <span className="text-[10px] font-bold text-[#5D7C13] dark:text-[#BEF264] bg-[#E2ECC8] dark:bg-[#2A3C13] px-2 py-0.5 rounded">
                      Optimal Fit
                    </span>
                  </div>
                  <p className="text-[11px] text-[#10201B] dark:text-[#ECFDF5] font-medium mt-1">
                    Candidate for stationary solar energy storage or telecom buffer.
                  </p>
                  <div className="mt-2 text-[10px] text-[#5D7C13] dark:text-[#A3E635] font-semibold">
                    Target: Solar Energy Storage • +3.5 Yrs Extension
                  </div>
                </SpotlightCard>

                {/* Branch 3: Recycle */}
                <SpotlightCard
                  borderRadius={12}
                  beamDuration={4}
                  beamColorFrom="#D94B4B"
                  beamColorMid="#F87171"
                  beamColorTo="#FECACA"
                  spotlightColor="rgba(217, 75, 75, 0.15)"
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    activeBranch === 'recycle'
                      ? 'bg-[#FDF0EE] dark:bg-[#331414] border-[#D94B4B] dark:border-[#F87171] shadow-xs ring-2 ring-[#F8C8C4] dark:ring-[#5C1D1D]'
                      : 'bg-white dark:bg-[#111E18] border-[#DDE7E2] dark:border-[#1E382D] hover:bg-[#F7FAF8] dark:hover:bg-[#162720]'
                  }`}
                  onClick={() => setActiveBranch('recycle')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] flex items-center gap-2">
                      <Recycle className="w-4 h-4 text-[#D94B4B] dark:text-[#F87171]" />
                      RECYCLE
                    </span>
                    <span className="text-[10px] font-mono text-[#62756E] dark:text-[#9BB3A8]">SOH &lt; 50%</span>
                  </div>
                  <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8] mt-1">
                    Hydrometallurgical extraction of Li, Ni, Co precursors.
                  </p>
                </SpotlightCard>
              </div>
            </div>

            {/* Bottom CTA to View Single Source of Truth */}
            <div className="mt-6 pt-6 border-t border-[#DDE7E2] dark:border-[#1E382D] flex flex-col sm:flex-row items-center justify-between text-xs text-[#62756E] dark:text-[#9BB3A8] gap-3 relative z-10">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#137A58] dark:bg-[#34D399] animate-pulse" />
                <span>Single Source of Truth: This battery data synchronizes across all 3 portals instantly.</span>
              </span>
              <Link
                href="/demo"
                className="font-bold text-[#137A58] dark:text-[#34D399] hover:underline flex items-center gap-1 group"
              >
                <span>Watch the complete 12-stage interactive walkthrough</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          THE PROBLEM SECTION
      ======================================================== */}
      <section id="problem" className="py-20 bg-white dark:bg-[#0E1713] border-b border-[#DDE7E2] dark:border-[#1E382D] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-2 tracking-tight">
              <BlurText text="The 15-Million-Ton Battery Cliff & Fragmented Lifecycle Data" delay={30} />
            </h2>
            <p className="text-[#62756E] dark:text-[#9BB3A8] text-base mt-4 leading-relaxed">
              By 2030, global end-of-life lithium-ion battery volumes could reach <strong className="text-[#10201B] dark:text-[#ECFDF5]">~15 million tonnes</strong>, creating a massive challenge for reuse, recycling, and responsible material recovery. At the same time, many EV batteries reaching the end of their automotive life still retain substantial usable capacity — creating an opportunity to extend their life before recycling.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard
              className="p-6 rounded-2xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              beamColorFrom="#137A58"
              beamColorMid="#21A879"
              beamColorTo="#C9EF72"
              borderRadius={16}
            >
              <div>
                <div className="text-3xl font-bold font-mono text-[#137A58] dark:text-[#34D399]">70–80%</div>
                <h3 className="text-base font-bold text-[#10201B] dark:text-[#ECFDF5] mt-2">Residual Battery Capacity</h3>
                <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] mt-3 leading-relaxed">
                  EV batteries are commonly considered to reach the end of their first automotive life around <strong className="text-[#10201B] dark:text-[#ECFDF5]">70–80% State of Health (SoH)</strong>. However, this does <strong className="text-[#10201B] dark:text-[#ECFDF5]">not</strong> mean the battery is useless. Research shows that batteries at this level can still be suitable for less demanding applications such as stationary energy storage, depending on their chemistry, safety condition, and remaining performance.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard
              className="p-6 rounded-2xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              beamColorFrom="#D89A24"
              beamColorMid="#F59E0B"
              beamColorTo="#FEF08A"
              spotlightColor="rgba(216, 154, 36, 0.18)"
              borderRadius={16}
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#D89A24] dark:text-[#FBBF24]">Billions in Potential Value</div>
                <h3 className="text-base font-bold text-[#10201B] dark:text-[#ECFDF5] mt-2">Trapped Economic Value</h3>
                <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] mt-3 leading-relaxed">
                  Retired EV batteries can potentially be repurposed for stationary storage before final recycling, reducing the need for newly manufactured storage batteries and extending the useful life of materials already extracted. The economics vary significantly by battery chemistry, health, application, testing, and repurposing costs — making reliable battery diagnostics and provenance critical to unlocking this value.
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard
              className="p-6 rounded-2xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              beamColorFrom="#4386C5"
              beamColorMid="#38BDF8"
              beamColorTo="#BAE6FD"
              spotlightColor="rgba(67, 134, 197, 0.18)"
              borderRadius={16}
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#4386C5] dark:text-[#60A5FA]">Fragmented Data</div>
                <h3 className="text-base font-bold text-[#10201B] dark:text-[#ECFDF5] mt-2">The Lifecycle Data Gap</h3>
                <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] mt-3 leading-relaxed">
                  Battery manufacturers, vehicle owners, fleet operators, service providers, second-life integrators, and recyclers often operate across different systems and data formats. Critical information such as <strong className="text-[#10201B] dark:text-[#ECFDF5]">State of Health, degradation history, usage conditions, chemistry, service records, and remaining useful life</strong> can therefore become difficult to verify when a battery changes hands.
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* ReVoltX Solution Callout */}
          <SpotlightCard
            className="mt-8 p-6 rounded-2xl bg-[#DDF5EA]/70 dark:bg-[#133325]/70 border border-[#BBEAD7] dark:border-[#1E4D38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            beamColorFrom="#137A58"
            beamColorMid="#21A879"
            beamColorTo="#C9EF72"
            borderRadius={16}
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#111E18] text-[#137A58] dark:text-[#34D399] shadow-2xs shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm text-[#10201B] dark:text-[#ECFDF5] leading-relaxed">
                <strong className="text-[#137A58] dark:text-[#34D399]">ReVoltX</strong> addresses this gap by creating a <strong className="text-[#10201B] dark:text-[#ECFDF5]">Digital Battery Passport</strong> that follows the battery across its lifecycle — from manufacturing and vehicle use to diagnostics, second-life repurposing, and final recycling.
              </p>
            </div>
            <Link
              href="/battery/RX-2026-892738"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] dark:bg-[#21A879] text-white text-xs font-semibold hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shrink-0 transition-colors shadow-2xs group"
            >
              <QrCode className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>Explore Passport</span>
            </Link>
          </SpotlightCard>
        </div>
      </section>

      {/* ========================================================
          HOW REVOLTX WORKS (7 Continuous Lifecycle Steps)
      ======================================================== */}
      <section id="how-it-works" className="py-20 bg-[#F7FAF8] dark:bg-[#0B1310] border-b border-[#DDE7E2] dark:border-[#1E382D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
              Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-2 tracking-tight">
              <BlurText text="From Raw Cells to Closed Loop" delay={30} />
            </h2>
            <p className="text-[#62756E] dark:text-[#9BB3A8] text-sm mt-3">
              ReVoltX powers every milestone of the battery journey through a single immutable data record.
            </p>
          </div>

          {/* Stepper Diagram */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Manufacture & Identity',
                desc: 'Manufacturer registers chemistry, serials, and initial SOH. ReVoltX mints a Digital Battery Passport and physical QR code.',
                icon: Factory
              },
              {
                step: '02',
                title: 'First-Life Telemetry',
                desc: 'Active monitoring during vehicle or energy service. Live IoT tracking of voltage, current, temperature, and cycle wear.',
                icon: Activity
              },
              {
                step: '03',
                title: 'Smart Dock Diagnostics',
                desc: 'When degradation occurs, ReVoltX field technicians connect the hardware Smart Dock for non-destructive electrochemical analysis.',
                icon: Cpu
              },
              {
                step: '04',
                title: 'AI Intelligence & RX Score',
                desc: 'Machine learning algorithms calculate real SOH, RUL, thermal risk, and generate an RX Score (0-100).',
                icon: ShieldCheck
              },
              {
                step: '05',
                title: 'Decision Engine',
                desc: 'Automated pathway routing: Continue First-Life, Qualify for Second-Life stationary storage, or Closed-Loop Recycling.',
                icon: Zap
              },
              {
                step: '06',
                title: 'Second-Life Allocation',
                desc: 'Circularity partners discover qualified batteries for solar energy storage, backup microgrids, or telecom towers.',
                icon: RefreshCw
              },
              {
                step: '07',
                title: 'Critical Mineral Recovery',
                desc: 'End-of-life batteries route to certified hydrometallurgical recyclers. Lithium, Nickel, and Cobalt are returned to cell production.',
                icon: Recycle
              },
              {
                step: '08',
                title: 'Continuous Provenance',
                desc: 'The Digital Battery Passport never resets. The complete custody chain and environmental impact remain permanently verified.',
                icon: QrCode
              }
            ].map((item, idx) => {
              const StepIcon = item.icon;
              return (
                <SpotlightCard 
                  key={item.step}
                  borderRadius={16}
                  beamDuration={5}
                  className="p-5 rounded-2xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[#62756E] dark:text-[#9BB3A8] mb-3">
                    <span className="font-mono text-xs font-bold text-[#137A58] dark:text-[#34D399]">{item.step}</span>
                    <div className="p-2 rounded-lg bg-[#F0F5F2] dark:bg-[#162720] group-hover:bg-[#DDF5EA] dark:group-hover:bg-[#133325] group-hover:text-[#137A58] dark:group-hover:text-[#34D399] transition-colors">
                      <StepIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#10201B] dark:text-[#ECFDF5]">{item.title}</h3>
                  <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] mt-1.5 leading-relaxed">{item.desc}</p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SMART BATTERY DOCK HARDWARE SECTION
      ======================================================== */}
      <section id="hardware" className="py-20 bg-white dark:bg-[#0E1713] border-b border-[#DDE7E2] dark:border-[#1E382D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
              Hardware Innovation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-2 tracking-tight">
              <BlurText text="The Smart Battery Dock" delay={30} />
            </h2>
            <p className="text-[#62756E] dark:text-[#9BB3A8] text-base mt-3 leading-relaxed">
              Bridging the physical battery and cloud intelligence. The Smart Battery Dock performs precision electrochemical impedance and high-speed telemetry capture for field technicians.
            </p>
          </div>

          <SpotlightCard
            borderRadius={24}
            beamDuration={6}
            className="bg-white dark:bg-[#111E18] rounded-3xl p-2 sm:p-4 border border-[#DDE7E2] dark:border-[#1E382D] shadow-xs"
          >
            <SmartDockVisualizer batteryId="RX-2026-892738" />
          </SpotlightCard>

          <div className="mt-8 flex justify-center">
            <Link
              href="/internal/testing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#137A58] dark:bg-[#21A879] text-white text-xs font-semibold hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shadow-xs transition-colors group"
            >
              <span>Launch Live Smart Battery Dock Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          THREE PORTALS SHOWCASE (Requirement 33)
      ======================================================== */}
      <section id="portals" className="py-20 bg-[#F7FAF8] dark:bg-[#0B1310] border-b border-[#DDE7E2] dark:border-[#1E382D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
              Unified Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-2 tracking-tight">
              <BlurText text="One Battery. One Lifecycle. Three Connected Experiences." delay={25} />
            </h2>
            <p className="text-[#62756E] dark:text-[#9BB3A8] text-sm mt-3">
              Each stakeholder accesses specialized insights tailored to their business needs, all reading and writing to the identical battery database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Portal 1: Manufacturer & Fleet */}
            <SpotlightCard
              borderRadius={24}
              beamDuration={5}
              beamColorFrom="#137A58"
              beamColorMid="#21A879"
              beamColorTo="#C9EF72"
              className="p-7 rounded-3xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] shadow-sm flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
            >
              <div>
                <div className="p-3 rounded-2xl bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] w-fit mb-5 shadow-2xs">
                  <Factory className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399] bg-[#DDF5EA] dark:bg-[#133325] px-2.5 py-1 rounded-full">
                  Portal 1
                </span>
                <h3 className="text-xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-3">
                  Manufacturer & Fleet
                </h3>
                <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] mt-2 leading-relaxed">
                  "Register, monitor and manage every battery."
                </p>

                <ul className="mt-5 space-y-2 text-xs text-[#62756E] dark:text-[#9BB3A8]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
                    <span>6-Step Battery & Passport Registration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
                    <span>Fleet SOH Degradation Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
                    <span>Automated Health Assessment Requests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
                    <span>Warranty & Anomaly Tracking</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDE7E2] dark:border-[#1E382D]">
                <Link
                  href="/login/manufacturer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#137A58] dark:bg-[#21A879] text-white text-xs font-bold hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shadow-xs hover:shadow-sm transition-all group"
                >
                  <span>Manufacturer Login</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/manufacturer"
                  className="block text-center text-[11px] text-[#62756E] dark:text-[#9BB3A8] hover:text-[#10201B] dark:hover:text-[#ECFDF5] mt-2 transition-colors"
                >
                  Direct Dashboard Preview →
                </Link>
              </div>
            </SpotlightCard>

            {/* Portal 2: Customer / Owner */}
            <SpotlightCard
              borderRadius={24}
              beamDuration={5}
              beamColorFrom="#21A879"
              beamColorMid="#34D399"
              beamColorTo="#A7F3D0"
              spotlightColor="rgba(33, 168, 121, 0.18)"
              className="p-7 rounded-3xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] shadow-sm flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
            >
              <div>
                <div className="p-3 rounded-2xl bg-[#EBF7F3] dark:bg-[#162720] text-[#21A879] dark:text-[#34D399] w-fit mb-5 shadow-2xs">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#21A879] dark:text-[#34D399] bg-[#EBF7F3] dark:bg-[#162720] px-2.5 py-1 rounded-full">
                  Portal 2
                </span>
                <h3 className="text-xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-3">
                  Customer / Owner
                </h3>
                <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] mt-2 leading-relaxed">
                  "Buy, monitor and understand your battery."
                </p>

                <ul className="mt-5 space-y-2 text-xs text-[#62756E] dark:text-[#9BB3A8]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21A879] dark:text-[#34D399]" />
                    <span>Clean "My Battery" Hero Experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21A879] dark:text-[#34D399]" />
                    <span>Certified Pre-Owned Battery Marketplace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21A879] dark:text-[#34D399]" />
                    <span>Plain-Language Health Diagnostics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21A879] dark:text-[#34D399]" />
                    <span>1-Click Health Check Booking</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDE7E2] dark:border-[#1E382D]">
                <Link
                  href="/login/owner"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#21A879] dark:bg-[#34D399] text-white dark:text-[#0B1310] text-xs font-bold hover:bg-[#1A8D65] dark:hover:bg-[#21A879] shadow-xs hover:shadow-sm transition-all group"
                >
                  <span>Customer Login</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/owner"
                  className="block text-center text-[11px] text-[#62756E] dark:text-[#9BB3A8] hover:text-[#10201B] dark:hover:text-[#ECFDF5] mt-2 transition-colors"
                >
                  Direct Dashboard Preview →
                </Link>
              </div>
            </SpotlightCard>

            {/* Portal 3: Circularity Partner */}
            <SpotlightCard
              borderRadius={24}
              beamDuration={5}
              beamColorFrom="#5D7C13"
              beamColorMid="#84CC16"
              beamColorTo="#ECFCCB"
              spotlightColor="rgba(93, 124, 19, 0.18)"
              className="p-7 rounded-3xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] shadow-sm flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
            >
              <div>
                <div className="p-3 rounded-2xl bg-[#F3F8E5] dark:bg-[#232F12] text-[#5D7C13] dark:text-[#A3E635] w-fit mb-5 shadow-2xs">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D7C13] dark:text-[#A3E635] bg-[#F3F8E5] dark:bg-[#232F12] px-2.5 py-1 rounded-full">
                  Portal 3
                </span>
                <h3 className="text-xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-3">
                  Circularity Partner
                </h3>
                <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] mt-2 leading-relaxed">
                  "Find the next purpose for every battery."
                </p>

                <ul className="mt-5 space-y-2 text-xs text-[#62756E] dark:text-[#9BB3A8]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7C13] dark:text-[#A3E635]" />
                    <span>Second-Life Solar & Microgrid Sourcing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7C13] dark:text-[#A3E635]" />
                    <span>Dedicated Recycler Mineral Recovery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7C13] dark:text-[#A3E635]" />
                    <span>Li, Ni, Co Yield Estimation Calculators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7C13] dark:text-[#A3E635]" />
                    <span>Chain of Custody & Circular Impact KPIs</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDE7E2] dark:border-[#1E382D]">
                <Link
                  href="/login/circularity"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#5D7C13] dark:bg-[#65A30D] text-white text-xs font-bold hover:bg-[#4E680F] dark:hover:bg-[#4D7C0F] shadow-xs hover:shadow-sm transition-all group"
                >
                  <span>Partner Login</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/circularity"
                  className="block text-center text-[11px] text-[#62756E] dark:text-[#9BB3A8] hover:text-[#10201B] dark:hover:text-[#ECFDF5] mt-2 transition-colors"
                >
                  Direct Dashboard Preview →
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ========================================================
          CIRCULAR IMPACT & ENVIRONMENTAL METRICS
      ======================================================== */}
      <section id="circularity" className="py-20 bg-white dark:bg-[#0E1713] border-b border-[#DDE7E2] dark:border-[#1E382D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
              Circular Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] dark:text-[#ECFDF5] mt-2 tracking-tight">
              <BlurText text="Measurable Climate & Mineral Preservation" delay={30} />
            </h2>
            <p className="text-[#62756E] dark:text-[#9BB3A8] text-sm mt-3">
              Prototype calculations based on transparent LCA assumptions: 72kg CO₂ avoided per kWh repurposed, 96.4% hydrometallurgical recovery rate.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SpotlightCard
              borderRadius={16}
              beamDuration={4.5}
              className="p-6 rounded-2xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-3xl font-bold font-mono text-[#137A58] dark:text-[#34D399]">
                <AnimatedCounter value={14.2} decimals={1} suffix=" MWh" />
              </span>
              <p className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] mt-1">Second-Life Capacity</p>
              <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8] mt-1">Active in stationary solar storage</p>
            </SpotlightCard>

            <SpotlightCard
              borderRadius={16}
              beamDuration={4.5}
              beamColorFrom="#21A879"
              beamColorMid="#34D399"
              beamColorTo="#A7F3D0"
              spotlightColor="rgba(33, 168, 121, 0.15)"
              className="p-6 rounded-2xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-3xl font-bold font-mono text-[#21A879] dark:text-[#34D399]">
                <AnimatedCounter value={1022} decimals={0} suffix=" Tons" />
              </span>
              <p className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] mt-1">CO₂e Avoided</p>
              <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8] mt-1">By extending cell useful life</p>
            </SpotlightCard>

            <SpotlightCard
              borderRadius={16}
              beamDuration={4.5}
              beamColorFrom="#D89A24"
              beamColorMid="#F59E0B"
              beamColorTo="#FEF08A"
              spotlightColor="rgba(216, 154, 36, 0.15)"
              className="p-6 rounded-2xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-3xl font-bold font-mono text-[#D89A24] dark:text-[#FBBF24]">
                <AnimatedCounter value={96.4} decimals={1} suffix="%" />
              </span>
              <p className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] mt-1">Mineral Yield</p>
              <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8] mt-1">Li, Ni, Co reclaimed in recycling loop</p>
            </SpotlightCard>

            <SpotlightCard
              borderRadius={16}
              beamDuration={4.5}
              beamColorFrom="#10201B"
              beamColorMid="#137A58"
              beamColorTo="#21A879"
              className="p-6 rounded-2xl bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D] text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-3xl font-bold font-mono text-[#10201B] dark:text-[#34D399]">
                <AnimatedCounter value={100} decimals={0} suffix="%" />
              </span>
              <p className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] mt-1">Digital Traceability</p>
              <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8] mt-1">EU Battery Passport 2026 ready</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA SECTION
      ======================================================== */}
      <section className="py-20 bg-[#F0F5F2] dark:bg-[#0B1310] relative overflow-hidden border-t border-[#DDE7E2] dark:border-[#1E382D]">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#DDE7E2_1px,transparent_1px),linear-gradient(to_bottom,#DDE7E2_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1E382D_1px,transparent_1px),linear-gradient(to_bottom,#1E382D_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 dark:opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex p-3 rounded-2xl bg-white dark:bg-[#111E18] shadow-xs text-[#137A58] dark:text-[#34D399] border border-transparent dark:border-[#1E382D] mb-6">
            <Zap className="w-8 h-8 fill-current text-[#C9EF72] animate-bounce" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#10201B] dark:text-[#ECFDF5] tracking-tight">
            <BlurText text="Ready to Experience the Complete Battery Lifecycle?" delay={25} />
          </h2>
          <p className="mt-4 text-base text-[#62756E] dark:text-[#9BB3A8] max-w-xl mx-auto">
            Take the 90-second interactive judge tour or explore any of the three live business portals right now.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="relative group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#137A58] dark:bg-[#21A879] text-white font-bold text-sm hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shadow-sm hover:shadow-lg hover:shadow-[#137A58]/20 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <PlayCircle className="w-5 h-5 text-[#C9EF72] group-hover:scale-110 transition-transform" />
              <span>Launch Live Interactive Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/battery/RX-2026-892738"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white dark:bg-[#111E18] text-[#10201B] dark:text-[#ECFDF5] font-semibold text-sm hover:bg-[#F7FAF8] dark:hover:bg-[#162720] hover:border-[#137A58] border border-[#DDE7E2] dark:border-[#1E382D] shadow-2xs transition-all hover:scale-[1.02]"
            >
              <QrCode className="w-4 h-4 text-[#137A58] dark:text-[#34D399]" />
              <span>Scan Star Battery Passport</span>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
