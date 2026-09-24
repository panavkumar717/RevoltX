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
      <div className="bg-white dark:bg-zinc-900/80 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3] dark:text-[#38BDF8] bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
              Connected Vehicle Battery
            </span>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
              My Battery: <span className="font-mono">{battery.revoltXId}</span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
              Installed in {battery.vehicleModel} • Registered to Sarah Jenkins
            </p>
          </div>

          <div className="flex items-center gap-2">
            <BatteryStatusBadge risk={battery.risk} size="md" />
            <Link
              href={`/battery/${battery.revoltXId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 transition-colors"
            >
              <QrCode className="w-4 h-4 text-[#0070F3] dark:text-[#38BDF8]" />
              <span>Digital Passport</span>
            </Link>
          </div>
        </div>

        {/* 3 Core Big Metrics */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">
              REVOLTX SCORE
            </span>
            <p className="text-3xl font-bold font-mono text-[#0070F3] dark:text-[#38BDF8] mt-1">
              {battery.rxScore} <span className="text-sm font-normal text-zinc-500">/ 100</span>
            </p>
            <span className="text-xs text-[#0070F3] dark:text-[#38BDF8] font-semibold mt-0.5 block">
              Solid Second-Life Grade
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">
              STATE OF HEALTH
            </span>
            <p className="text-3xl font-bold font-mono text-amber-500 mt-1">
              {battery.currentSOH}%
            </p>
            <span className="text-xs text-amber-500 font-semibold mt-0.5 block">
              Attention Recommended
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">
              REMAINING LIFE
            </span>
            <p className="text-3xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-1">
              {battery.rul} <span className="text-sm font-normal text-zinc-500">cycles</span>
            </p>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 block">
              ~1.2 yrs courier service
            </span>
          </div>
        </div>
      </div>

      {/* Human-Friendly ReVoltX Health Recommendation Banner */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-white dark:bg-zinc-800 text-amber-500 shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                ReVoltX Intelligence Notice
              </span>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {battery.humanAnomalyExplanation || 'Your battery has been running warmer than expected during rapid charging.'}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                While your battery is still operating safely, its capacity has dipped to 72%. We recommend scheduling a certified ReVoltX technician health assessment.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/owner/service"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Book Battery Health Check</span>
          </Link>

          <Link
            href="/owner/marketplace"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#0070F3] dark:text-[#38BDF8]" />
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

        <div className="bg-white dark:bg-zinc-900/80 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Battery Intelligence Rating
            </span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
              RX Score (Cell Balance & Safety)
            </h3>
          </div>

          <div className="my-3">
            <RXScoreGauge score={battery.rxScore} size="md" showDetails={true} />
          </div>

          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            When you eventually upgrade, this battery will qualify for <strong className="text-zinc-900 dark:text-zinc-100">Second-Life Solar Energy Storage</strong> instead of landfill waste.
          </p>
        </div>
      </div>

      {/* Battery Lifecycle Roadmap */}
      <div className="bg-white dark:bg-zinc-900/80 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Lifecycle Pathway
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Where Your Battery Sits in the Circular Loop
            </h3>
          </div>
          <Link href="/owner/lifecycle" className="text-xs font-semibold text-[#0070F3] dark:text-[#38BDF8] hover:underline">
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
