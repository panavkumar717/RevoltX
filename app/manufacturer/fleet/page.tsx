'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowUpDown, Truck, ArrowRight, ExternalLink, QrCode } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';

export default function ManufacturerFleetPage() {
  const { batteries } = useReVoltX();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'soh' | 'rul' | 'score'>('soh');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = batteries
    .filter(b => {
      const q = search.toLowerCase();
      return (
        b.revoltXId.toLowerCase().includes(q) ||
        (b.vehicleModel && b.vehicleModel.toLowerCase().includes(q)) ||
        (b.fleetName && b.fleetName.toLowerCase().includes(q)) ||
        (b.ownerName && b.ownerName.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      let valA = sortKey === 'soh' ? a.currentSOH : sortKey === 'rul' ? a.rul : a.rxScore;
      let valB = sortKey === 'soh' ? b.currentSOH : sortKey === 'rul' ? b.rul : b.rxScore;
      return sortAsc ? valA - valB : valB - valA;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Telematics & Fleet Logistics
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Active Fleet Vehicle View
          </h1>
          <p className="text-xs text-[#62756E]">
            Tracking battery health inside delivery vans, electric trucks, and stationary assets.
          </p>
        </div>

        <div className="text-xs font-mono font-semibold text-[#10201B] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7E2]">
          {filtered.length} Fleet Assets Synced
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-[#DDE7E2] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#62756E]" />
          <input
            type="text"
            placeholder="Search vehicle model, courier fleet, or battery ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#62756E]">Sort By:</span>
          <button
            type="button"
            onClick={() => {
              if (sortKey === 'soh') setSortAsc(!sortAsc);
              else { setSortKey('soh'); setSortAsc(false); }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-colors ${
              sortKey === 'soh' ? 'bg-[#DDF5EA] text-[#137A58] border-[#BBEAD7]' : 'bg-[#F7FAF8] text-[#10201B] border-[#DDE7E2]'
            }`}
          >
            <span>SOH</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (sortKey === 'score') setSortAsc(!sortAsc);
              else { setSortKey('score'); setSortAsc(false); }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-colors ${
              sortKey === 'score' ? 'bg-[#DDF5EA] text-[#137A58] border-[#BBEAD7]' : 'bg-[#F7FAF8] text-[#10201B] border-[#DDE7E2]'
            }`}
          >
            <span>RX Score</span>
            <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Vehicle / Asset Model</th>
                <th className="pb-3 font-semibold">Battery ID</th>
                <th className="pb-3 font-semibold">SOH</th>
                <th className="pb-3 font-semibold">RUL Remaining</th>
                <th className="pb-3 font-semibold">RX Score</th>
                <th className="pb-3 font-semibold">Risk Rating</th>
                <th className="pb-3 font-semibold">Last Telemetry</th>
                <th className="pb-3 font-semibold">Lifecycle Stage</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-[#F7FAF8] transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#F0F5F2] text-[#137A58]">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-[#10201B] block">
                          {b.vehicleModel || 'Stationary Storage Array'}
                        </span>
                        <span className="text-[10px] text-[#62756E]">
                          {b.fleetName || b.ownerName || 'Unassigned Fleet Asset'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">
                    <Link href={`/manufacturer/batteries/${b.revoltXId}`} className="hover:text-[#137A58]">
                      {b.revoltXId}
                    </Link>
                  </td>
                  <td className="py-3.5">
                    <span className={`font-mono font-bold ${b.currentSOH >= 80 ? 'text-[#137A58]' : b.currentSOH >= 65 ? 'text-[#D89A24]' : 'text-[#D94B4B]'}`}>
                      {b.currentSOH}%
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-[#10201B]">{b.rul} cyc</td>
                  <td className="py-3.5 font-mono font-bold text-[#137A58]">{b.rxScore}/100</td>
                  <td className="py-3.5">
                    <BatteryStatusBadge risk={b.risk} size="sm" />
                  </td>
                  <td className="py-3.5 font-mono text-[#62756E] text-[11px]">
                    {new Date(b.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="py-3.5">
                    <BatteryStatusBadge stage={b.lifecycleStage} size="sm" />
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href={`/manufacturer/batteries/${b.revoltXId}`}
                      className="px-2.5 py-1 rounded-lg bg-[#137A58] text-white font-semibold text-[11px] hover:bg-[#0E5B42] transition-colors"
                    >
                      Detail
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
