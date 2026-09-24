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

export default function LandingPage() {
  const [activeBranch, setActiveBranch] = useState<'continue' | 'secondLife' | 'recycle'>('secondLife');

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col selection:bg-[#DDF5EA] selection:text-[#137A58]">
      <PublicNavbar />

      {/* ========================================================
          HERO SECTION with Interactive Lifecycle Flow
      ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-[#DDE7E2]">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#DDE7E2_1px,transparent_1px),linear-gradient(to_bottom,#DDE7E2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge & Pill */}
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDF5EA] border border-[#BBEAD7] text-xs font-semibold text-[#137A58] mb-6 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#21A879]" />
              <span>EU Battery Passport Ready • UL 1974 Circular Protocol</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#137A58]" />
              <span className="text-[#62756E] font-normal">v2.6 OS</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#10201B] max-w-4xl"
            >
              Every Battery Has a{' '}
              <span className="relative text-[#137A58] inline-block">
                Second Life.
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#C9EF72]/40 -z-10 rounded-sm -rotate-1" />
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-[#62756E] max-w-2xl leading-relaxed"
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#137A58] text-white font-semibold text-sm hover:bg-[#0E5B42] shadow-sm hover:shadow-md transition-all group"
              >
                <PlayCircle className="w-4 h-4 text-[#C9EF72] group-hover:scale-110 transition-transform" />
                <span>Launch Interactive Demo (90s)</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#10201B] font-semibold text-sm hover:bg-[#F0F5F2] border border-[#DDE7E2] shadow-2xs transition-colors"
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
            className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DDE7E2] gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
                  Continuous Lifecycle Telemetry & AI Decision Engine
                </span>
                <h3 className="text-xl font-bold text-[#10201B] mt-0.5">
                  Live Dynamic Asset: Battery RX-2026-892738 (LFP 60Ah)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7]">
                  <span className="h-2 w-2 rounded-full bg-[#137A58] animate-pulse" />
                  Real-time Data Active
                </span>
                <Link
                  href="/battery/RX-2026-892738"
                  className="text-xs font-semibold text-[#10201B] hover:text-[#137A58] flex items-center gap-1 underline underline-offset-2"
                >
                  Open Passport <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Visualizer Pipeline */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: 6 Physical Telemetry Signals */}
              <div className="lg:col-span-4 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] block mb-2">
                  1. IoT & Smart Dock Telemetry
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                    <div className="flex items-center justify-between text-[#62756E] text-xs">
                      <span>Voltage</span>
                      <Gauge className="w-3.5 h-3.5 text-[#137A58]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] mt-1">51.2 V</p>
                    <span className="text-[10px] text-[#137A58] font-medium">16S Nominal</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                    <div className="flex items-center justify-between text-[#62756E] text-xs">
                      <span>Current</span>
                      <Zap className="w-3.5 h-3.5 text-[#21A879]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] mt-1">18.2 A</p>
                    <span className="text-[10px] text-[#62756E] font-medium">0.3C Load</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                    <div className="flex items-center justify-between text-[#62756E] text-xs">
                      <span>Temperature</span>
                      <Thermometer className="w-3.5 h-3.5 text-[#D89A24]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#D89A24] mt-1">38.4 °C</p>
                    <span className="text-[10px] text-[#D89A24] font-medium">Thermal Alert</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                    <div className="flex items-center justify-between text-[#62756E] text-xs">
                      <span>State of Charge</span>
                      <Activity className="w-3.5 h-3.5 text-[#4386C5]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] mt-1">84 %</p>
                    <span className="text-[10px] text-[#62756E] font-medium">3.07 kWh</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                    <div className="flex items-center justify-between text-[#62756E] text-xs">
                      <span>State of Health</span>
                      <TrendingUp className="w-3.5 h-3.5 text-[#137A58]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] mt-1">72 %</p>
                    <span className="text-[10px] text-[#D89A24] font-medium">Below EV 80%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                    <div className="flex items-center justify-between text-[#62756E] text-xs">
                      <span>RUL Remaining</span>
                      <RefreshCw className="w-3.5 h-3.5 text-[#137A58]" />
                    </div>
                    <p className="text-base font-bold font-mono text-[#10201B] mt-1">384 cyc</p>
                    <span className="text-[10px] text-[#62756E] font-medium">~3.5 Yrs 2nd Life</span>
                  </div>
                </div>
              </div>

              {/* Center: ReVoltX AI Intelligence Core */}
              <div className="lg:col-span-4 flex flex-col items-center text-center p-5 rounded-2xl bg-[#F0F5F2] border border-[#DDE7E2] relative">
                <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] mb-3 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#137A58]" />
                  2. ReVoltX Intelligence Core
                </span>

                <RXScoreGauge score={78} size="md" showDetails={false} />

                <div className="mt-4 p-3 rounded-xl bg-white border border-[#DDE7E2] text-xs text-left w-full space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#10201B]">
                    <span>Anomaly Detected</span>
                    <span className="text-[#D89A24] text-[10px] font-mono">CODE: THM-42</span>
                  </div>
                  <p className="text-[#62756E] text-[11px] leading-tight">
                    Accelerated thermal degradation during fast charging. Retains 72% capacity.
                  </p>
                </div>

                <div className="mt-2 text-[10px] text-[#62756E] font-mono">
                  Electrochemical Model: LFP-EIS-v4 • Confidence: 96.2%
                </div>
              </div>

              {/* Right Column: 3 Decision Engine Pathways */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] block mb-2">
                  3. Decision Engine Pathways
                </span>

                {/* Branch 1: Continue Use */}
                <button
                  type="button"
                  onClick={() => setActiveBranch('continue')}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    activeBranch === 'continue'
                      ? 'bg-[#DDF5EA] border-[#137A58] shadow-xs ring-2 ring-[#BBEAD7]'
                      : 'bg-white border-[#DDE7E2] hover:bg-[#F7FAF8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10201B] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#137A58]" />
                      CONTINUE USE
                    </span>
                    <span className="text-[10px] font-mono text-[#62756E]">SOH &gt; 80%</span>
                  </div>
                  <p className="text-[11px] text-[#62756E] mt-1">
                    Retain in primary high-draw EV mobility service.
                  </p>
                </button>

                {/* Branch 2: Second Life (Selected by default) */}
                <button
                  type="button"
                  onClick={() => setActiveBranch('secondLife')}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    activeBranch === 'secondLife'
                      ? 'bg-[#F3F8E5] border-[#5D7C13] shadow-xs ring-2 ring-[#DAECAE]'
                      : 'bg-white border-[#DDE7E2] hover:bg-[#F7FAF8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10201B] flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-[#5D7C13]" />
                      SECOND LIFE (RECOMMENDED)
                    </span>
                    <span className="text-[10px] font-bold text-[#5D7C13] bg-[#E2ECC8] px-2 py-0.5 rounded">
                      Optimal Fit
                    </span>
                  </div>
                  <p className="text-[11px] text-[#10201B] font-medium mt-1">
                    Candidate for stationary solar energy storage or telecom buffer.
                  </p>
                  <div className="mt-2 text-[10px] text-[#5D7C13] font-semibold">
                    Target: Solar Energy Storage • +3.5 Yrs Extension
                  </div>
                </button>

                {/* Branch 3: Recycle */}
                <button
                  type="button"
                  onClick={() => setActiveBranch('recycle')}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    activeBranch === 'recycle'
                      ? 'bg-[#FDF0EE] border-[#D94B4B] shadow-xs ring-2 ring-[#F8C8C4]'
                      : 'bg-white border-[#DDE7E2] hover:bg-[#F7FAF8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10201B] flex items-center gap-2">
                      <Recycle className="w-4 h-4 text-[#D94B4B]" />
                      RECYCLE
                    </span>
                    <span className="text-[10px] font-mono text-[#62756E]">SOH &lt; 50%</span>
                  </div>
                  <p className="text-[11px] text-[#62756E] mt-1">
                    Hydrometallurgical extraction of Li, Ni, Co precursors.
                  </p>
                </button>
              </div>
            </div>

            {/* Bottom CTA to View Single Source of Truth */}
            <div className="mt-6 pt-6 border-t border-[#DDE7E2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#62756E] gap-3">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#137A58]" />
                <span>Single Source of Truth: This battery data synchronizes across all 3 portals instantly.</span>
              </span>
              <Link
                href="/demo"
                className="font-bold text-[#137A58] hover:underline flex items-center gap-1"
              >
                Watch the complete 12-stage interactive walkthrough →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          THE PROBLEM SECTION
      ======================================================== */}
      <section id="problem" className="py-20 bg-white border-b border-[#DDE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] mt-2 tracking-tight">
              The 15-Million Ton Battery Cliff & Fragmented Lifecycle Data
            </h2>
            <p className="text-[#62756E] text-base mt-4 leading-relaxed">
              When electric vehicle batteries degrade below 80% State of Health, automakers routinely replace the entire pack. Without reliable diagnostic provenance, millions of structurally sound batteries are prematurely shredded or landfilled.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <div className="text-3xl font-bold font-mono text-[#D94B4B]">70%+</div>
              <h3 className="text-base font-bold text-[#10201B] mt-2">Premature Disposal</h3>
              <p className="text-xs text-[#62756E] mt-2 leading-relaxed">
                Batteries retired from mobility retain 70-80% of original capacity — perfect for stationary renewable storage, but discarded due to lack of trusted health history.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <div className="text-3xl font-bold font-mono text-[#D89A24]">$120B</div>
              <h3 className="text-base font-bold text-[#10201B] mt-2">Trapped Economic Value</h3>
              <p className="text-xs text-[#62756E] mt-2 leading-relaxed">
                Second-life repurposing can cut solar storage costs by 45%, but circularity partners lack verified health metrics and standardized pack specifications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <div className="text-3xl font-bold font-mono text-[#137A58]">0 Data Continuity</div>
              <h3 className="text-base font-bold text-[#10201B] mt-2">Disconnected Silos</h3>
              <p className="text-xs text-[#62756E] mt-2 leading-relaxed">
                Manufacturers, fleet operators, consumers, and recyclers use disconnected tools. ReVoltX unifies them around a single digital battery passport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          HOW REVOLTX WORKS (7 Continuous Lifecycle Steps)
      ======================================================== */}
      <section id="how-it-works" className="py-20 bg-[#F7FAF8] border-b border-[#DDE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
              Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] mt-2 tracking-tight">
              From Raw Cells to Closed Loop
            </h2>
            <p className="text-[#62756E] text-sm mt-3">
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
                <div 
                  key={item.step}
                  className="p-5 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs hover:border-[#137A58] transition-colors group"
                >
                  <div className="flex items-center justify-between text-[#62756E] mb-3">
                    <span className="font-mono text-xs font-bold text-[#137A58]">{item.step}</span>
                    <div className="p-2 rounded-lg bg-[#F0F5F2] group-hover:bg-[#DDF5EA] group-hover:text-[#137A58] transition-colors">
                      <StepIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#10201B]">{item.title}</h3>
                  <p className="text-xs text-[#62756E] mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SMART BATTERY DOCK HARDWARE SECTION
      ======================================================== */}
      <section id="hardware" className="py-20 bg-white border-b border-[#DDE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
              Hardware Innovation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] mt-2 tracking-tight">
              The Smart Battery Dock
            </h2>
            <p className="text-[#62756E] text-base mt-3 leading-relaxed">
              Bridging the physical battery and cloud intelligence. The Smart Battery Dock performs precision electrochemical impedance and high-speed telemetry capture for field technicians.
            </p>
          </div>

          <SmartDockVisualizer batteryId="RX-2026-892738" />

          <div className="mt-8 flex justify-center">
            <Link
              href="/internal/testing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-semibold hover:bg-[#0E5B42] shadow-xs transition-colors"
            >
              <span>Launch Live Smart Battery Dock Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          THREE PORTALS SHOWCASE (Requirement 33)
      ======================================================== */}
      <section id="portals" className="py-20 bg-[#F7FAF8] border-b border-[#DDE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
              Unified Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] mt-2 tracking-tight">
              One Battery. One Lifecycle. Three Connected Experiences.
            </h2>
            <p className="text-[#62756E] text-sm mt-3">
              Each stakeholder accesses specialized insights tailored to their business needs, all reading and writing to the identical battery database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Portal 1: Manufacturer & Fleet */}
            <div className="p-7 rounded-3xl bg-white border border-[#DDE7E2] shadow-sm flex flex-col justify-between hover:border-[#137A58] transition-all">
              <div>
                <div className="p-3 rounded-2xl bg-[#DDF5EA] text-[#137A58] w-fit mb-5">
                  <Factory className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58] bg-[#DDF5EA] px-2.5 py-1 rounded-full">
                  Portal 1
                </span>
                <h3 className="text-xl font-bold text-[#10201B] mt-3">
                  Manufacturer & Fleet
                </h3>
                <p className="text-xs text-[#62756E] mt-2 leading-relaxed">
                  "Register, monitor and manage every battery."
                </p>

                <ul className="mt-5 space-y-2 text-xs text-[#62756E]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#137A58]" />
                    <span>6-Step Battery & Passport Registration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#137A58]" />
                    <span>Fleet SOH Degradation Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#137A58]" />
                    <span>Automated Health Assessment Requests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#137A58]" />
                    <span>Warranty & Anomaly Tracking</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDE7E2]">
                <Link
                  href="/login/manufacturer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
                >
                  <span>Manufacturer Login →</span>
                </Link>
                <Link
                  href="/manufacturer"
                  className="block text-center text-[11px] text-[#62756E] hover:text-[#10201B] mt-2"
                >
                  Direct Dashboard Preview →
                </Link>
              </div>
            </div>

            {/* Portal 2: Customer / Owner */}
            <div className="p-7 rounded-3xl bg-white border border-[#DDE7E2] shadow-sm flex flex-col justify-between hover:border-[#21A879] transition-all">
              <div>
                <div className="p-3 rounded-2xl bg-[#EBF7F3] text-[#21A879] w-fit mb-5">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#21A879] bg-[#EBF7F3] px-2.5 py-1 rounded-full">
                  Portal 2
                </span>
                <h3 className="text-xl font-bold text-[#10201B] mt-3">
                  Customer / Owner
                </h3>
                <p className="text-xs text-[#62756E] mt-2 leading-relaxed">
                  "Buy, monitor and understand your battery."
                </p>

                <ul className="mt-5 space-y-2 text-xs text-[#62756E]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21A879]" />
                    <span>Clean "My Battery" Hero Experience</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21A879]" />
                    <span>Certified Pre-Owned Battery Marketplace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21A879]" />
                    <span>Plain-Language Health Diagnostics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#21A879]" />
                    <span>1-Click Health Check Booking</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDE7E2]">
                <Link
                  href="/login/owner"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#21A879] text-white text-xs font-bold hover:bg-[#1A8D65] shadow-xs transition-colors"
                >
                  <span>Customer Login →</span>
                </Link>
                <Link
                  href="/owner"
                  className="block text-center text-[11px] text-[#62756E] hover:text-[#10201B] mt-2"
                >
                  Direct Dashboard Preview →
                </Link>
              </div>
            </div>

            {/* Portal 3: Circularity Partner */}
            <div className="p-7 rounded-3xl bg-white border border-[#DDE7E2] shadow-sm flex flex-col justify-between hover:border-[#5D7C13] transition-all">
              <div>
                <div className="p-3 rounded-2xl bg-[#F3F8E5] text-[#5D7C13] w-fit mb-5">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D7C13] bg-[#F3F8E5] px-2.5 py-1 rounded-full">
                  Portal 3
                </span>
                <h3 className="text-xl font-bold text-[#10201B] mt-3">
                  Circularity Partner
                </h3>
                <p className="text-xs text-[#62756E] mt-2 leading-relaxed">
                  "Find the next purpose for every battery."
                </p>

                <ul className="mt-5 space-y-2 text-xs text-[#62756E]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7C13]" />
                    <span>Second-Life Solar & Microgrid Sourcing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7C13]" />
                    <span>Dedicated Recycler Mineral Recovery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7C13]" />
                    <span>Li, Ni, Co Yield Estimation Calculators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7C13]" />
                    <span>Chain of Custody & Circular Impact KPIs</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDE7E2]">
                <Link
                  href="/login/circularity"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#5D7C13] text-white text-xs font-bold hover:bg-[#4E680F] shadow-xs transition-colors"
                >
                  <span>Partner Login →</span>
                </Link>
                <Link
                  href="/circularity"
                  className="block text-center text-[11px] text-[#62756E] hover:text-[#10201B] mt-2"
                >
                  Direct Dashboard Preview →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CIRCULAR IMPACT & ENVIRONMENTAL METRICS
      ======================================================== */}
      <section id="circularity" className="py-20 bg-white border-b border-[#DDE7E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
              Circular Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10201B] mt-2 tracking-tight">
              Measurable Climate & Mineral Preservation
            </h2>
            <p className="text-[#62756E] text-sm mt-3">
              Prototype calculations based on transparent LCA assumptions: 72kg CO₂ avoided per kWh repurposed, 96.4% hydrometallurgical recovery rate.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-center">
              <span className="text-3xl font-bold font-mono text-[#137A58]">14.2 MWh</span>
              <p className="text-xs font-bold text-[#10201B] mt-1">Second-Life Capacity</p>
              <p className="text-[11px] text-[#62756E] mt-1">Active in stationary solar storage</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-center">
              <span className="text-3xl font-bold font-mono text-[#21A879]">1,022 Tons</span>
              <p className="text-xs font-bold text-[#10201B] mt-1">CO₂e Avoided</p>
              <p className="text-[11px] text-[#62756E] mt-1">By extending cell useful life</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-center">
              <span className="text-3xl font-bold font-mono text-[#D89A24]">96.4%</span>
              <p className="text-xs font-bold text-[#10201B] mt-1">Mineral Yield</p>
              <p className="text-[11px] text-[#62756E] mt-1">Li, Ni, Co reclaimed in recycling loop</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-center">
              <span className="text-3xl font-bold font-mono text-[#10201B]">100%</span>
              <p className="text-xs font-bold text-[#10201B] mt-1">Digital Traceability</p>
              <p className="text-[11px] text-[#62756E] mt-1">EU Battery Passport 2026 ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA SECTION
      ======================================================== */}
      <section className="py-20 bg-[#F0F5F2] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-white shadow-xs text-[#137A58] mb-6">
            <Zap className="w-8 h-8 fill-current text-[#C9EF72]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#10201B] tracking-tight">
            Ready to Experience the Complete Battery Lifecycle?
          </h2>
          <p className="mt-4 text-base text-[#62756E] max-w-xl mx-auto">
            Take the 90-second interactive judge tour or explore any of the three live business portals right now.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#137A58] text-white font-bold text-sm hover:bg-[#0E5B42] shadow-sm hover:shadow-md transition-all"
            >
              <PlayCircle className="w-5 h-5 text-[#C9EF72]" />
              <span>Launch Live Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/battery/RX-2026-892738"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-[#10201B] font-semibold text-sm hover:bg-[#F7FAF8] border border-[#DDE7E2] shadow-2xs transition-colors"
            >
              <QrCode className="w-4 h-4 text-[#137A58]" />
              <span>Scan Star Battery Passport</span>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
