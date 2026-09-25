'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BatteryMedium, Search, Filter, QrCode, ArrowRight, ShieldCheck } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';

export default function InternalBatteriesPage() {
  const { batteries } = useReVoltX();
  const [search, setSearch] = useState('');

  const filtered = batteries.filter(b => 
    b.revoltXId.toLowerCase().includes(search.toLowerCase()) ||
    (b.nasaDatasetId && b.nasaDatasetId.toLowerCase().includes(search.toLowerCase())) ||
    b.manufacturerName.toLowerCase().includes(search.toLowerCase()) ||
    (b.ownerName && b.ownerName.toLowerCase().includes(search.toLowerCase())) ||
    (b.fleetName && b.fleetName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D89A24]">
            Global Asset Registry
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            ReVoltX Master Battery Database
          </h1>
          <p className="text-xs text-[#62756E]">
            Complete record of every battery registered, monitored, repurposed, or recycled. Grounded in NASA ARC battery degradation telemetry.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-[#137A58] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7E2]">
          {batteries.length} Global Batteries Logged
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#DDE7E2] shadow-2xs flex items-center gap-3">
        <Search className="w-4 h-4 text-[#62756E]" />
        <input
          type="text"
          placeholder="Search global batteries by ID, NASA Cell (e.g. B0005), manufacturer, or owner..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs text-[#10201B] focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Battery ID / NASA Ref</th>
                <th className="pb-3 font-semibold">Manufacturer</th>
                <th className="pb-3 font-semibold">Current Custody</th>
                <th className="pb-3 font-semibold">Chemistry</th>
                <th className="pb-3 font-semibold">SOH</th>
                <th className="pb-3 font-semibold">RX Score</th>
                <th className="pb-3 font-semibold">Lifecycle Stage</th>
                <th className="pb-3 font-semibold text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-[#F7FAF8] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">
                    <Link href={`/battery/${b.revoltXId}`} className="hover:text-[#137A58]">
                      {b.revoltXId}
                    </Link>
                    {b.nasaDatasetId && (
                      <span className="inline-block mt-0.5 text-[10px] font-semibold text-[#0070F3] bg-[#EFF6FF] px-1.5 py-0.2 rounded border border-[#BFDBFE]">
                        NASA ARC {b.nasaDatasetId}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 font-medium text-[#10201B]">{b.manufacturerName}</td>
                  <td className="py-3.5 text-[#62756E]">{b.ownerName || b.fleetName || 'Unassigned'}</td>
                  <td className="py-3.5">{b.chemistry} ({b.capacity} Ah)</td>
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">{b.currentSOH}%</td>
                  <td className="py-3.5 font-mono font-bold text-[#137A58]">{b.rxScore}/100</td>
                  <td className="py-3.5">
                    <BatteryStatusBadge stage={b.lifecycleStage} size="sm" />
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/battery/${b.revoltXId}`}
                        className="px-2.5 py-1 rounded-lg bg-[#F0F5F2] hover:bg-[#DDE7E2] text-[#10201B] font-semibold text-[11px]"
                      >
                        Passport
                      </Link>
                      <Link
                        href="/internal/testing"
                        className="px-2.5 py-1 rounded-lg bg-[#137A58] text-white font-semibold text-[11px] hover:bg-[#0E5B42]"
                      >
                        Test
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
