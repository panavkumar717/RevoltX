'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Recycle, RefreshCw, Zap, Scale, Info, CheckCircle2 } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';

export default function CircularityImpactPage() {
  const { batteries, recyclingRecords } = useReVoltX();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#DDE7E2]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
          Environmental Accounting & LCA
        </span>
        <h1 className="text-2xl font-bold text-[#10201B] mt-1">
          Circular Impact & Resource Preservation
        </h1>
        <p className="text-xs text-[#62756E]">
          Quantifying avoided greenhouse gases, raw mineral conservation, and landfill diversion.
        </p>
      </div>

      {/* Assumptions Disclosure (Requirement 49) */}
      <div className="p-4 rounded-2xl bg-[#F0F5F2] border border-[#DDE7E2] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#137A58] shrink-0 mt-0.5" />
        <div className="text-xs text-[#62756E] leading-relaxed">
          <strong className="text-[#10201B]">Transparent LCA Model Assumptions:</strong> CO₂e avoidance is computed using Argonne GREET model assumptions (72 kg CO₂e avoided per kWh of second-life stationary capacity deployed vs. manufacturing new NMC cells). Mineral recovery calculations assume 96.4% hydrometallurgical closed-loop efficiency.
        </div>
      </div>

      {/* 5 Big Impact KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-5 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            BATTERY LIFE EXTENDED
          </span>
          <p className="text-2xl font-bold font-mono text-[#137A58] mt-1">+3.8 Years</p>
          <span className="text-[10px] text-[#62756E] mt-0.5 block">Average across repurposed fleet</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            SOLID WASTE DIVERTED
          </span>
          <p className="text-2xl font-bold font-mono text-[#10201B] mt-1">182 Tons</p>
          <span className="text-[10px] text-[#62756E] mt-0.5 block">Pack hardware kept from shredders</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            MINERALS RECOVERED
          </span>
          <p className="text-2xl font-bold font-mono text-[#21A879] mt-1">26.8 Tons</p>
          <span className="text-[10px] text-[#62756E] mt-0.5 block">Lithium, Nickel, Cobalt, Copper</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            2ND-LIFE DEPLOYMENTS
          </span>
          <p className="text-2xl font-bold font-mono text-[#5D7C13] mt-1">174 Units</p>
          <span className="text-[10px] text-[#62756E] mt-0.5 block">Solar, telecom & microgrids</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            CIRCULAR LOOPS CLOSED
          </span>
          <p className="text-2xl font-bold font-mono text-[#4386C5] mt-1">100%</p>
          <span className="text-[10px] text-[#62756E] mt-0.5 block">EU Passport traceable</span>
        </div>
      </div>

      {/* Avoided Emissions Detailed Comparison */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#10201B]">
          Comparative Life Cycle Emissions Profile
        </h3>

        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#10201B]">Conventional Linear Model (Manufacture → EV Duty → Shred / Landfill)</span>
              <span className="font-mono font-bold text-[#D94B4B]">148 kg CO₂e / kWh</span>
            </div>
            <div className="w-full bg-[#F0F5F2] h-3 rounded-full overflow-hidden">
              <div className="bg-[#D94B4B] h-full w-[85%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#10201B]">ReVoltX Circular Model (Manufacture → First Life → Second Life → Hydromet Loop)</span>
              <span className="font-mono font-bold text-[#137A58]">58 kg CO₂e / kWh</span>
            </div>
            <div className="w-full bg-[#F0F5F2] h-3 rounded-full overflow-hidden">
              <div className="bg-[#137A58] h-full w-[33%]" />
            </div>
          </div>
        </div>

        <p className="text-xs text-[#62756E] pt-2">
          Result: ReVoltX delivers a <strong className="text-[#137A58]">60.8% reduction in lifecycle greenhouse gas emissions</strong> compared to linear cell disposal.
        </p>
      </div>
    </div>
  );
}
