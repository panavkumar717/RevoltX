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

export default function InternalDashboardPage() {
  const { batteries, serviceRequests, opportunities, recyclingRecords } = useReVoltX();

  const pendingRequests = serviceRequests.filter(r => r.status !== 'Completed');
  const criticalBatteries = batteries.filter(b => b.risk === 'High' || b.risk === 'Critical');

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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
          >
            <Cpu className="w-4 h-4 text-[#C9EF72]" />
            <span>+ Start Battery Assessment</span>
          </Link>
        </div>
      </div>

      {/* 8 Core Metrics specified in Section 7 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[9px] uppercase font-bold text-[#62756E] block">Ecosystem Packs</span>
          <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">{batteries.length + 10000}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[9px] uppercase font-bold text-[#62756E] block">Manufacturers</span>
          <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">14 Active</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[9px] uppercase font-bold text-[#62756E] block">Fleet Operators</span>
          <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">38 Fleets</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
          <span className="text-[9px] uppercase font-bold text-[#62756E] block">Active Owners</span>
          <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">1,280 Users</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FEF6E7] border border-[#F8E0B0] shadow-2xs">
          <span className="text-[9px] uppercase font-bold text-[#D89A24] block">Pending Tests</span>
          <p className="text-xl font-bold font-mono text-[#D89A24] mt-0.5">{pendingRequests.length} Queue</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F3F8E5] border border-[#DAECAE] shadow-2xs">
          <span className="text-[9px] uppercase font-bold text-[#5D7C13] block">2nd Life Opps</span>
          <p className="text-xl font-bold font-mono text-[#5D7C13] mt-0.5">{opportunities.length} Listed</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FDF0EE] border border-[#F8C8C4] shadow-2xs">
          <span className="text-[9px] uppercase font-bold text-[#D94B4B] block">Recycling Batches</span>
          <p className="text-xl font-bold font-mono text-[#D94B4B] mt-0.5">{recyclingRecords.length} Active</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7] shadow-2xs">
          <span className="text-[9px] uppercase font-bold text-[#137A58] block">Technicians</span>
          <p className="text-xl font-bold font-mono text-[#137A58] mt-0.5">3 On Duty</p>
        </div>
      </div>

      {/* Primary Section 1: Assessment Queue & Active Smart Dock Simulator */}
      <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#DDF5EA] text-[#137A58]">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] transition-colors"
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
                className="px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
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
            className="text-xs font-semibold text-[#137A58] hover:underline"
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
                  <td className="py-3 font-mono font-bold text-[#137A58]">{b.rxScore}/100</td>
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
