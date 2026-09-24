'use client';

import React from 'react';
import Link from 'next/link';
import { 
  RefreshCw, 
  Recycle, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Layers,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../components/ui/BatteryStatusBadge';

export default function CircularityDashboardPage() {
  const { opportunities, recyclingRecords, batteries } = useReVoltX();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5D7C13] bg-[#F3F8E5] px-2.5 py-0.5 rounded-full border border-[#DAECAE]">
              Circularity Partner Network
            </span>
            <span className="text-[11px] text-[#62756E]">
              Stationary Storage • Telecom • Hydrometallurgical Recyclers
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1.5">
            Second-Life & Resource Recovery Intelligence
          </h1>
          <p className="text-xs text-[#62756E]">
            Discover qualified retired mobility batteries and allocate raw critical minerals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/circularity/opportunities"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Browse Opportunities</span>
          </Link>
          <Link
            href="/circularity/recycling"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#10201B] text-xs font-semibold hover:bg-[#F0F5F2] border border-[#DDE7E2] transition-colors"
          >
            <Recycle className="w-3.5 h-3.5 text-[#D94B4B]" />
            <span>Recycler Hub</span>
          </Link>
        </div>
      </div>

      {/* 5 Core Metrics specified in Section 17 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            AVAILABLE 2ND-LIFE BATTERIES
          </span>
          <p className="text-2xl font-bold font-mono text-[#10201B] mt-1">174 Packs</p>
          <span className="text-[10px] text-[#137A58] mt-1 block">Certified for repurposing</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            POTENTIAL ENERGY CAPACITY
          </span>
          <p className="text-2xl font-bold font-mono text-[#137A58] mt-1">14.2 MWh</p>
          <span className="text-[10px] text-[#62756E] mt-1 block">Stationary buffer pool</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            SECOND-LIFE CANDIDATES
          </span>
          <p className="text-2xl font-bold font-mono text-[#5D7C13] mt-1">48 Pending</p>
          <span className="text-[10px] text-[#62756E] mt-1 block">Completing Smart Dock tests</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            RECYCLING CANDIDATES
          </span>
          <p className="text-2xl font-bold font-mono text-[#D94B4B] mt-1">26 Packs</p>
          <span className="text-[10px] text-[#D94B4B] mt-1 block">SOH &lt; 50% End of Life</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-[#62756E] block">
            MATERIAL RECOVERY YIELD
          </span>
          <p className="text-2xl font-bold font-mono text-[#21A879] mt-1">96.4% Li/Ni</p>
          <span className="text-[10px] text-[#62756E] mt-1 block">Purified black mass</span>
        </div>
      </div>

      {/* Recommended Opportunities List */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#10201B]">
              Recommended Second-Life Opportunities
            </h3>
            <p className="text-xs text-[#62756E]">
              Ranked by electrochemical compatibility and target application suitability.
            </p>
          </div>

          <Link
            href="/circularity/opportunities"
            className="text-xs font-semibold text-[#137A58] hover:underline flex items-center gap-1"
          >
            <span>View All Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.map(opp => (
            <div
              key={opp.id}
              className="p-5 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] flex flex-col justify-between hover:border-[#137A58] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-[#10201B]">
                    {opp.batteryId}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    opp.status === 'Available' ? 'bg-[#DDF5EA] text-[#137A58]' : 'bg-[#F0F5F2] text-[#62756E]'
                  }`}>
                    {opp.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#10201B]">{opp.title}</h4>
                <p className="text-[11px] text-[#62756E] mt-1">
                  Target: <strong className="text-[#10201B]">{opp.targetApplication}</strong>
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] p-2 bg-white rounded-xl border border-[#DDE7E2]">
                  <div>
                    <span className="text-[#62756E] text-[10px]">Capacity:</span>
                    <p className="font-bold font-mono text-[#10201B]">{opp.capacityKWh} kWh</p>
                  </div>
                  <div>
                    <span className="text-[#62756E] text-[10px]">SOH:</span>
                    <p className="font-bold font-mono text-[#137A58]">{opp.soh}%</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DDE7E2] flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#10201B]">
                  ${opp.economicValueUsd}
                </span>

                <Link
                  href={`/circularity/opportunities/${opp.batteryId}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#137A58] hover:underline"
                >
                  <span>Inspect & Claim</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
