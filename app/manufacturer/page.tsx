'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Factory, 
  ShieldAlert, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Wrench, 
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../components/ui/BatteryStatusBadge';

export default function ManufacturerDashboardPage() {
  const { batteries } = useReVoltX();

  // Metrics specified in prompt
  const stats = [
    { label: 'TOTAL BATTERIES', value: '10,000', change: '+240 this month', color: 'text-zinc-900 dark:text-zinc-100', border: 'border-zinc-200 dark:border-zinc-800' },
    { label: 'HEALTHY', value: '8,420', sub: '84.2% Fleet Nominal', color: 'text-[#0070F3] dark:text-[#38BDF8]', border: 'border-blue-500/20' },
    { label: 'ATTENTION REQUIRED', value: '1,240', sub: 'SOH 70-80% / Minor Drift', color: 'text-amber-500 dark:text-amber-400', border: 'border-amber-500/20' },
    { label: 'HIGH RISK', value: '340', sub: 'Urgent Service Advised', color: 'text-red-500 dark:text-red-400', border: 'border-red-500/20' },
    { label: 'SECOND-LIFE CANDIDATES', value: '174', sub: 'Ready for Stationary Duty', color: 'text-sky-500 dark:text-sky-400', border: 'border-sky-500/20' }
  ];

  return (
    <div className="space-y-6 text-zinc-900 dark:text-zinc-100">
      {/* Top Banner with Org Context & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3] dark:text-[#38BDF8] bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              XYZ Battery Corp. Global Fleet Command
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
              Simulated Fleet Scale (10k Assets)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1.5">
            Manufacturer & Fleet Intelligence
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Production registration, warranty monitoring, and automated lifecycle dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/manufacturer/batteries/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register New Battery</span>
          </Link>
          <Link
            href="/manufacturer/fleet"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <span>Fleet View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 5 Core Metrics specified by Prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border ${stat.border} shadow-2xs`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
              {stat.label}
            </span>
            <p className={`text-2xl sm:text-3xl font-bold font-mono mt-1 ${stat.color}`}>
              {stat.value}
            </p>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">
              {stat.sub || stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Action Required Banner: Batteries Needing ReVoltX Inspection */}
      <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Fleet Health Alerts: Immediate Assessment Recommended
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Batteries crossing health thresholds in active service routes.
              </p>
            </div>
          </div>
          <Link
            href="/manufacturer/service-requests"
            className="text-xs font-semibold text-[#0070F3] dark:text-[#38BDF8] hover:underline"
          >
            Manage All Service Requests →
          </Link>
        </div>

        {/* Highlight star battery RX-2026-892738 */}
        <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100">RX-2026-892738</span>
              <BatteryStatusBadge stage="HEALTH_MONITORING" size="sm" />
              <BatteryStatusBadge risk="Moderate" size="sm" />
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1">
              Vehicle: EcoRider V3 Commercial Courier (Sarah Jenkins)
            </p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">
              Warning: SOH at 72% • Accelerated thermal degradation during fast charge • RUL ~384 cycles
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/manufacturer/batteries/RX-2026-892738"
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 transition-colors"
            >
              Examine Telemetry
            </Link>
            <Link
              href="/manufacturer/service-requests"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Request ReVoltX Health Assessment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Registered Battery Catalog Preview */}
      <div className="bg-white dark:bg-zinc-900/80 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Registered Battery Asset Registry
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Connected to ReVoltX universal database.
            </p>
          </div>

          <Link
            href="/manufacturer/batteries"
            className="text-xs font-semibold text-[#0070F3] dark:text-[#38BDF8] hover:underline flex items-center gap-1"
          >
            <span>View All Assets ({batteries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase font-bold text-zinc-500 dark:text-zinc-400">
                <th className="pb-3 font-semibold">Battery ID / Serial</th>
                <th className="pb-3 font-semibold">Chemistry</th>
                <th className="pb-3 font-semibold">Current SOH</th>
                <th className="pb-3 font-semibold">RUL Cycles</th>
                <th className="pb-3 font-semibold">RX Score</th>
                <th className="pb-3 font-semibold">Risk</th>
                <th className="pb-3 font-semibold">Lifecycle Stage</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {batteries.map((b) => (
                <tr key={b.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="py-3 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    <Link href={`/manufacturer/batteries/${b.revoltXId}`} className="hover:text-[#0070F3] dark:hover:text-[#38BDF8]">
                      {b.revoltXId}
                    </Link>
                    <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">{b.serialNumber}</span>
                  </td>
                  <td className="py-3 font-medium text-zinc-800 dark:text-zinc-200">{b.chemistry} ({b.capacity} Ah)</td>
                  <td className="py-3">
                    <span className={`font-mono font-bold ${b.currentSOH >= 80 ? 'text-[#0070F3] dark:text-[#38BDF8]' : b.currentSOH >= 65 ? 'text-amber-500' : 'text-red-500'}`}>
                      {b.currentSOH}%
                    </span>
                  </td>
                  <td className="py-3 font-mono text-zinc-800 dark:text-zinc-200">{b.rul} cyc</td>
                  <td className="py-3 font-mono font-bold text-[#0070F3] dark:text-[#38BDF8]">{b.rxScore}/100</td>
                  <td className="py-3">
                    <BatteryStatusBadge risk={b.risk} size="sm" />
                  </td>
                  <td className="py-3">
                    <BatteryStatusBadge stage={b.lifecycleStage} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/manufacturer/batteries/${b.revoltXId}`}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-[11px]"
                      >
                        Inspect
                      </Link>
                      <Link
                        href={`/battery/${b.revoltXId}`}
                        className="text-zinc-400 hover:text-[#0070F3] dark:hover:text-[#38BDF8]"
                        title="Open Digital Battery Passport"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
