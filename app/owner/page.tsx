'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Wrench, 
  ArrowRight, 
  QrCode, 
  AlertTriangle, 
  ShoppingBag, 
  Sparkles,
  Info,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { RXScoreGauge } from '../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../components/ui/HealthGauge';
import { BatteryStatusBadge } from '../../components/ui/BatteryStatusBadge';
import { LifecycleTimeline } from '../../components/ui/LifecycleTimeline';

export default function OwnerDashboardPage() {
  const { getBattery } = useReVoltX();
  const battery = getBattery('RX-2026-892738')!;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Customer Hero: My Battery */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] bg-[#DDF5EA] px-2.5 py-1 rounded-full">
              Connected Vehicle Battery
            </span>
            <h1 className="text-3xl font-bold text-[#10201B] mt-2">
              My Battery: <span className="font-mono">{battery.revoltXId}</span>
            </h1>
            <p className="text-xs text-[#62756E] mt-1 font-medium">
              Installed in {battery.vehicleModel} • Registered to Sarah Jenkins
            </p>
          </div>

          <div className="flex items-center gap-2">
            <BatteryStatusBadge risk={battery.risk} size="md" />
            <Link
              href={`/battery/${battery.revoltXId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F0F5F2] hover:bg-[#DDE7E2] text-xs font-semibold text-[#10201B] transition-colors"
            >
              <QrCode className="w-4 h-4 text-[#137A58]" />
              <span>Digital Passport</span>
            </Link>
          </div>
        </div>

        {/* 3 Core Big Metrics */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#DDE7E2]">
          <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
            <span className="text-[10px] uppercase font-bold text-[#62756E] block">
              REVOLTX SCORE
            </span>
            <p className="text-3xl font-bold font-mono text-[#137A58] mt-1">
              {battery.rxScore} <span className="text-sm font-normal text-[#62756E]">/ 100</span>
            </p>
            <span className="text-xs text-[#137A58] font-semibold mt-0.5 block">
              Solid Second-Life Grade
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
            <span className="text-[10px] uppercase font-bold text-[#62756E] block">
              STATE OF HEALTH
            </span>
            <p className="text-3xl font-bold font-mono text-[#D89A24] mt-1">
              {battery.currentSOH}%
            </p>
            <span className="text-xs text-[#D89A24] font-semibold mt-0.5 block">
              Attention Recommended
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
            <span className="text-[10px] uppercase font-bold text-[#62756E] block">
              REMAINING LIFE
            </span>
            <p className="text-3xl font-bold font-mono text-[#10201B] mt-1">
              {battery.rul} <span className="text-sm font-normal text-[#62756E]">cycles</span>
            </p>
            <span className="text-xs text-[#62756E] font-medium mt-0.5 block">
              ~1.2 yrs courier service
            </span>
          </div>
        </div>
      </div>

      {/* Human-Friendly ReVoltX Health Recommendation Banner */}
      <div className="p-6 rounded-3xl bg-[#FEF6E7] border border-[#F8E0B0] shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-white text-[#D89A24] shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D89A24]">
                ReVoltX Intelligence Notice
              </span>
              <h3 className="text-base font-bold text-[#10201B] mt-0.5">
                {battery.humanAnomalyExplanation || 'Your battery has been running warmer than expected during rapid charging.'}
              </h3>
              <p className="text-xs text-[#62756E] mt-1">
                While your battery is still operating safely, its capacity has dipped to 72%. We recommend scheduling a certified ReVoltX technician health assessment.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/owner/service"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Book Battery Health Check</span>
          </Link>

          <Link
            href="/owner/marketplace"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#10201B] text-xs font-semibold hover:bg-[#F0F5F2] border border-[#DDE7E2] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#137A58]" />
            <span>Explore Replacement Batteries</span>
          </Link>
        </div>
      </div>

      {/* Health & Intelligence Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HealthGauge
          soh={battery.currentSOH}
          soc={battery.soc}
          rul={battery.rul}
          temperature={battery.temperature}
          initialSOH={battery.initialSOH}
        />

        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
              Battery Intelligence Rating
            </span>
            <h3 className="text-sm font-bold text-[#10201B] mt-0.5">
              RX Score (Cell Balance & Safety)
            </h3>
          </div>

          <div className="my-3">
            <RXScoreGauge score={battery.rxScore} size="md" showDetails={true} />
          </div>

          <p className="text-[11px] text-[#62756E]">
            When you eventually upgrade, this battery will qualify for <strong className="text-[#10201B]">Second-Life Solar Energy Storage</strong> instead of landfill waste.
          </p>
        </div>
      </div>

      {/* Battery Lifecycle Roadmap */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
              Lifecycle Pathway
            </span>
            <h3 className="text-base font-bold text-[#10201B]">
              Where Your Battery Sits in the Circular Loop
            </h3>
          </div>
          <Link href="/owner/lifecycle" className="text-xs font-semibold text-[#137A58] hover:underline">
            View Roadmap →
          </Link>
        </div>

        <LifecycleTimeline
          currentStage={battery.lifecycleStage}
          events={battery.lifecycleEvents}
          orientation="horizontal"
          showDetails={false}
        />
      </div>
    </div>
  );
}
