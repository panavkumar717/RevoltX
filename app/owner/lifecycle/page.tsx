'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GitCommit, 
  ArrowRight, 
  ShoppingBag, 
  RefreshCw, 
  Recycle, 
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { LifecycleTimeline } from '../../../components/ui/LifecycleTimeline';

export default function OwnerLifecyclePage() {
  const { getBattery } = useReVoltX();
  const battery = getBattery('RX-2026-892738')!;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3]">
            Circular Economy Transparency
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Your Battery's Next Journey
          </h1>
          <p className="text-xs text-[#62756E]">
            At ReVoltX, your battery never gets thrown away. Its digital identity and materials are preserved forever.
          </p>
        </div>

        <Link
          href="/owner/marketplace"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Explore Replacements</span>
        </Link>
      </div>

      {/* Replacement Notice Card */}
      <div className="p-6 rounded-3xl bg-[#FEF6E7] border border-[#F8E0B0] shadow-xs space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D89A24]">
            Approaching Mobility Threshold
          </span>
          <h3 className="text-lg font-bold text-[#10201B] mt-1">
            "Your battery may require replacement in approximately 12 months."
          </h3>
          <p className="text-xs text-[#62756E] mt-1 leading-relaxed">
            With SOH at 72% and 384 cycles remaining in high-demand vehicle service, you will receive full trade-in value toward a certified replacement pack.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#F8E0B0] text-xs space-y-2">
          <h4 className="font-bold text-[#10201B]">What Happens When Your Old Battery is Removed?</h4>
          <p className="text-[#62756E] leading-relaxed">
            Your old battery continues to exist in the ReVoltX global database. It does <strong className="text-[#10201B]">NOT</strong> disappear. Its lifecycle record updates to <strong className="text-[#0070F3]">Second Life (Solar Energy Storage)</strong>, delivering another 3 to 5 years of clean renewable power to solar microgrids.
          </p>
        </div>
      </div>

      {/* Lifecycle Flow Diagram */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-xs space-y-6">
        <h3 className="text-base font-bold text-[#10201B]">
          Continuous Lifecycle Timeline for {battery.revoltXId}
        </h3>

        <LifecycleTimeline
          currentStage={battery.lifecycleStage}
          events={battery.lifecycleEvents}
          orientation="vertical"
          showDetails={true}
        />
      </div>

      {/* Environmental Contribution Card */}
      <div className="p-6 rounded-3xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3]">
            Your Circular Impact
          </span>
          <h4 className="text-base font-bold text-[#10201B] mt-0.5">
            +3.5 Years of Clean Energy Buffer
          </h4>
          <p className="text-xs text-[#62756E] mt-1">
            By keeping this battery in the ReVoltX loop, you prevent 221 kg of raw mineral CO₂ emissions.
          </p>
        </div>

        <span className="text-3xl font-bold font-mono text-[#0070F3] hidden sm:block">
          96.4% Recyclable
        </span>
      </div>
    </div>
  );
}
