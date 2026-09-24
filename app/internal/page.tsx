'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Cpu, 
  Wrench, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Factory, 
  Truck, 
  User, 
  RefreshCw, 
  Recycle,
  Play
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../components/ui/BatteryStatusBadge';
import MagicBento, { MagicBentoCardItem } from '../../components/ui/MagicBento';

export default function InternalDashboardPage() {
  const { batteries, serviceRequests, opportunities, recyclingRecords } = useReVoltX();

  const pendingRequests = serviceRequests.filter(r => r.status !== 'Completed');
  const criticalBatteries = batteries.filter(b => b.risk === 'High' || b.risk === 'Critical');

  const internalBentoCards: MagicBentoCardItem[] = [
    {
      label: 'ECOSYSTEM SCALE',
      title: 'Monitored Packs & Fleets',
      value: `${(batteries.length + 10000).toLocaleString()}`,
      sub: 'Across 14 OEMs & 38 Commercial Fleets',
      description: 'Continuous CAN-bus and cloud IoT telemetry ingestion with sub-second anomaly screening.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0070F3] border border-blue-500/20 font-bold">Live Stream</span>
    },
    {
      label: 'HARDWARE DOCK QUEUE',
      title: 'Pending Lab Assessments',
      value: `${pendingRequests.length} In Queue`,
      sub: 'Automated 12-minute Smart Dock testing',
      description: 'EIS impedance spectroscopy, open-circuit voltage stability, and rapid thermal cycling tests.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">Active Tests</span>
    },
    {
      label: 'SAFETY MONITORING',
      title: 'Critical Risk Packs',
      value: `${criticalBatteries.length} High Risk`,
      sub: 'Automated Lockout Advised',
      description: 'Internal resistance spike or thermal gradient exceeding safe vehicle operating boundaries.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold">Urgent</span>
    },
    {
      label: 'CIRCULAR SOURCING',
      title: 'Second-Life Listings',
      value: `${opportunities.length} Qualified`,
      sub: 'ESS & Telecom Station Matches',
      description: 'Dynamic matchmaking algorithm routing 70-80% SOH packs to grid-tied buffer applications.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0070F3] border border-blue-500/20 font-bold">Marketplace</span>
    },
    {
      label: 'MINERAL HARVEST',
      title: 'Recycling Batches',
      value: `${recyclingRecords.length} Active Batches`,
      sub: '96.4% Recovery Yield',
      description: 'Direct hydrometallurgical processing extracting battery-grade lithium, nickel, and cobalt salts.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">Urban Mining</span>
    },
    {
      label: 'FIELD OPERATIONS',
      title: 'Technician Operations',
      value: '3 On Duty',
      sub: '1,280 Registered Vehicle Owners',
      description: 'Field diagnostic units equipped with automated high-voltage test harnesses and bypass balancers.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0070F3] border border-blue-500/20 font-bold">Staff Online</span>
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D89A24] bg-[#FEF6E7] px-2.5 py-0.5 rounded-full border border-[#F8E0B0]">
              ROS System v2.6 • ReVoltX Operations Command
            </span>
            <span className="text-[11px] text-[#62756E]">Staff Only Access</span>
          </div>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1.5">
            What Needs ReVoltX Attention?
          </h1>
          <p className="text-xs text-[#62756E]">
            Real-time assessment queue, technician dispatching, critical alerts, and lifecycle transitions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/internal/testing"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs transition-colors"
          >
            <Cpu className="w-4 h-4 text-[#0070F3]" />
            <span>+ Start Battery Assessment</span>
          </Link>
        </div>
      </div>

      {/* Interactive Operations Command Magic Bento */}
      <MagicBento 
        cards={internalBentoCards}
        textAutoHide={false}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={320}
        particleCount={14}
        glowColor="0, 112, 243"
      />

      {/* Primary Section 1: Assessment Queue & Active Smart Dock Simulator */}
      <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#EFF6FF] text-[#0070F3]">
              <Cpu className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#10201B]">
                Smart Battery Dock Assessment Queue
              </h3>
              <p className="text-xs text-[#62756E]">
                High-priority test appointments dispatched to field technicians.
              </p>
            </div>
          </div>

          <Link
            href="/internal/testing"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Launch Testing Simulator</span>
          </Link>
        </div>

        {/* Queue Items */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#10201B]">RX-2026-892738</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF6E7] text-[#D89A24]">
                  Technician Assigned (Alex Rivera)
                </span>
                <span className="text-xs text-[#62756E]">Sarah Jenkins • EcoRider V3</span>
              </div>
              <p className="text-xs text-[#62756E] mt-1">
                Thermal degradation warning. Smart Dock low-voltage diagnostic test ready to run.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/internal/testing"
                className="px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6]"
              >
                Run Assessment Now →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Batteries Requiring Decision */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#10201B]">
              Critical Batteries & Anomaly Watchlist
            </h3>
            <p className="text-xs text-[#62756E]">
              Packs with SOH below threshold or thermal drift.
            </p>
          </div>

          <Link
            href="/internal/batteries"
            className="text-xs font-semibold text-[#0070F3] hover:underline"
          >
            View All Global Batteries →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Battery ID</th>
                <th className="pb-3 font-semibold">Owner / Fleet</th>
                <th className="pb-3 font-semibold">SOH</th>
                <th className="pb-3 font-semibold">RX Score</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold">Detected Anomaly</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {criticalBatteries.map(b => (
                <tr key={b.id} className="hover:bg-[#F7FAF8]">
                  <td className="py-3 font-mono font-bold text-[#10201B]">{b.revoltXId}</td>
                  <td className="py-3">{b.fleetName || b.ownerName}</td>
                  <td className="py-3 font-mono font-bold text-[#D89A24]">{b.currentSOH}%</td>
                  <td className="py-3 font-mono font-bold text-[#0070F3]">{b.rxScore}/100</td>
                  <td className="py-3">
                    <BatteryStatusBadge risk={b.risk} size="sm" />
                  </td>
                  <td className="py-3 text-[#62756E] max-w-xs truncate">{b.anomaly || 'Threshold reached'}</td>
                  <td className="py-3 text-right">
                    <Link
                      href="/internal/testing"
                      className="px-2.5 py-1 rounded-lg bg-[#F0F5F2] hover:bg-[#DDE7E2] font-semibold text-[11px]"
                    >
                      Test Dock
                    </Link>
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
