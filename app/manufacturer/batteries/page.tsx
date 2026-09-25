'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, PlusCircle, ArrowRight, QrCode, Filter, ExternalLink } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';

export default function ManufacturerBatteriesPage() {
  const { batteries } = useReVoltX();
  const [search, setSearch] = useState('');
  const [filterChemistry, setFilterChemistry] = useState<string>('ALL');

  const filtered = batteries.filter(b => {
    const matchesSearch = 
      b.revoltXId.toLowerCase().includes(search.toLowerCase()) ||
      b.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
      (b.nasaDatasetId && b.nasaDatasetId.toLowerCase().includes(search.toLowerCase())) ||
      (b.vehicleModel && b.vehicleModel.toLowerCase().includes(search.toLowerCase())) ||
      (b.ownerName && b.ownerName.toLowerCase().includes(search.toLowerCase()));

    const matchesChem = filterChemistry === 'ALL' || b.chemistry === filterChemistry;

    return matchesSearch && matchesChem;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Fleet Inventory
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Registered Battery Assets
          </h1>
          <p className="text-xs text-[#62756E]">
            All packs manufactured or under fleet service contract.
          </p>
        </div>

        <Link
          href="/manufacturer/batteries/register"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register New Battery</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#DDE7E2] shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#62756E]" />
          <input
            type="text"
            placeholder="Search by Battery ID (e.g. RX-2026-892738), serial number, vehicle..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#62756E]" />
          <select
            value={filterChemistry}
            onChange={e => setFilterChemistry(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium text-[#10201B] focus:bg-white focus:outline-none"
          >
            <option value="ALL">All Chemistries</option>
            <option value="LFP">LFP (Lithium Iron Phosphate)</option>
            <option value="NMC">NMC (Nickel Manganese)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Battery ID / Serial</th>
                <th className="pb-3 font-semibold">Chemistry & Pack</th>
                <th className="pb-3 font-semibold">Current SOH</th>
                <th className="pb-3 font-semibold">Remaining Life</th>
                <th className="pb-3 font-semibold">RX Score</th>
                <th className="pb-3 font-semibold">Risk Level</th>
                <th className="pb-3 font-semibold">Lifecycle Stage</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-[#F7FAF8] transition-colors">
                  <td className="py-3 font-mono font-bold text-[#10201B]">
                    <Link href={`/manufacturer/batteries/${b.revoltXId}`} className="hover:text-[#137A58]">
                      {b.revoltXId}
                    </Link>
                    <span className="block text-[10px] text-[#62756E] font-normal">{b.serialNumber}</span>
                  </td>
                  <td className="py-3">
                    <span className="font-semibold text-[#10201B]">{b.chemistry}</span>
                    <span className="block text-[10px] text-[#62756E]">{b.capacity} Ah • {b.packConfiguration}</span>
                  </td>
                  <td className="py-3">
                    <span className={`font-mono font-bold ${b.currentSOH >= 80 ? 'text-[#137A58]' : b.currentSOH >= 65 ? 'text-[#D89A24]' : 'text-[#D94B4B]'}`}>
                      {b.currentSOH}%
                    </span>
                    <span className="block text-[10px] text-[#62756E]">from {b.initialSOH}%</span>
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
                        className="p-1 rounded-md text-[#62756E] hover:text-[#137A58]"
                        title="Open Public Passport"
                      >
                        <QrCode className="w-4 h-4" />
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
