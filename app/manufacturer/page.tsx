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
    { label: 'TOTAL BATTERIES', value: '10,000', change: '+240 this month', color: 'text-[#10201B]', bg: 'bg-white' },
    { label: 'HEALTHY', value: '8,420', sub: '84.2% Fleet Nominal', color: 'text-[#137A58]', bg: 'bg-[#DDF5EA]/50' },
    { label: 'ATTENTION REQUIRED', value: '1,240', sub: 'SOH 70-80% / Minor Drift', color: 'text-[#D89A24]', bg: 'bg-[#FEF6E7]/50' },
    { label: 'HIGH RISK', value: '340', sub: 'Urgent Service Advised', color: 'text-[#D94B4B]', bg: 'bg-[#FDF0EE]/50' },
    { label: 'SECOND-LIFE CANDIDATES', value: '174', sub: 'Ready for Stationary Duty', color: 'text-[#5D7C13]', bg: 'bg-[#F3F8E5]/50' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Org Context & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] bg-[#DDF5EA] px-2.5 py-0.5 rounded-full border border-[#BBEAD7]">
              XYZ Battery Corp. Global Fleet Command
            </span>
            <span className="text-[11px] font-mono text-[#62756E] bg-white px-2 py-0.5 rounded border border-[#DDE7E2]">
              Simulated Fleet Scale (10k Assets)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1.5">
            Manufacturer & Fleet Intelligence
          </h1>
          <p className="text-xs text-[#62756E]">
            Production registration, warranty monitoring, and automated lifecycle dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/manufacturer/batteries/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register New Battery</span>
          </Link>
          <Link
            href="/manufacturer/fleet"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#10201B] text-xs font-semibold hover:bg-[#F0F5F2] border border-[#DDE7E2] transition-colors"
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
            className={`p-4 rounded-2xl border border-[#DDE7E2] shadow-2xs ${stat.bg}`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#62756E] block">
              {stat.label}
            </span>
            <p className={`text-2xl sm:text-3xl font-bold font-mono mt-1 ${stat.color}`}>
              {stat.value}
            </p>
            <span className="text-[10px] text-[#62756E] mt-1 block">
              {stat.sub || stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Action Required Banner: Batteries Needing ReVoltX Inspection */}
      <div className="p-5 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FEF6E7] text-[#D89A24]">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#10201B]">
                Fleet Health Alerts: Immediate Assessment Recommended
              </h3>
              <p className="text-xs text-[#62756E]">
                Batteries crossing health thresholds in active service routes.
              </p>
            </div>
          </div>
          <Link
            href="/manufacturer/service-requests"
            className="text-xs font-semibold text-[#137A58] hover:underline"
          >
            Manage All Service Requests →
          </Link>
        </div>

        {/* Highlight star battery RX-2026-892738 */}
        <div className="p-4 rounded-2xl bg-[#FEF6E7]/30 border border-[#F8E0B0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#10201B]">RX-2026-892738</span>
              <BatteryStatusBadge stage="HEALTH_MONITORING" size="sm" />
              <BatteryStatusBadge risk="Moderate" size="sm" />
            </div>
            <p className="text-xs text-[#10201B] font-medium mt-1">
              Vehicle: EcoRider V3 Commercial Courier (Sarah Jenkins)
            </p>
            <p className="text-[11px] text-[#D89A24] mt-0.5">
              Warning: SOH at 72% • Accelerated thermal degradation during fast charge • RUL ~384 cycles
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/manufacturer/batteries/RX-2026-892738"
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F0F5F2] text-xs font-semibold text-[#10201B] border border-[#DDE7E2] transition-colors"
            >
              Examine Telemetry
            </Link>
            <Link
              href="/manufacturer/service-requests"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Request ReVoltX Health Assessment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Registered Battery Catalog Preview */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#10201B]">
              Registered Battery Asset Registry
            </h3>
            <p className="text-xs text-[#62756E]">
              Connected to ReVoltX universal database.
            </p>
          </div>

          <Link
            href="/manufacturer/batteries"
            className="text-xs font-semibold text-[#137A58] hover:underline flex items-center gap-1"
          >
            <span>View All Assets ({batteries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
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
            <tbody className="divide-y divide-[#DDE7E2]">
              {batteries.map((b) => (
                <tr key={b.id} className="hover:bg-[#F7FAF8] transition-colors">
                  <td className="py-3 font-mono font-bold text-[#10201B]">
                    <Link href={`/manufacturer/batteries/${b.revoltXId}`} className="hover:text-[#137A58]">
                      {b.revoltXId}
                    </Link>
                    <span className="block text-[10px] text-[#62756E] font-normal">{b.serialNumber}</span>
                  </td>
                  <td className="py-3 font-medium text-[#10201B]">{b.chemistry} ({b.capacity} Ah)</td>
                  <td className="py-3">
                    <span className={`font-mono font-bold ${b.currentSOH >= 80 ? 'text-[#137A58]' : b.currentSOH >= 65 ? 'text-[#D89A24]' : 'text-[#D94B4B]'}`}>
                      {b.currentSOH}%
                    </span>
                  </td>
                  <td className="py-3 font-mono text-[#10201B]">{b.rul} cyc</td>
                  <td className="py-3 font-mono font-bold text-[#137A58]">{b.rxScore}/100</td>
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
                        className="px-2.5 py-1 rounded-lg bg-[#F0F5F2] hover:bg-[#DDE7E2] text-[#10201B] font-semibold text-[11px]"
                      >
                        Inspect
                      </Link>
                      <Link
                        href={`/battery/${b.revoltXId}`}
                        className="text-[#62756E] hover:text-[#137A58]"
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
