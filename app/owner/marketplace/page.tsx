'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowRight, 
  BatteryMedium, 
  CheckCircle2, 
  Sparkles,
  QrCode
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';

export default function OwnerMarketplacePage() {
  const { batteries } = useReVoltX();
  const [search, setSearch] = useState('');
  const [chemistryFilter, setChemistryFilter] = useState('ALL');

  // Filter available marketplace batteries (e.g. SOH >= 80% or new certified packs)
  const listings = batteries.filter(b => {
    const query = search.toLowerCase();
    const matchesSearch = 
      b.revoltXId.toLowerCase().includes(query) ||
      b.manufacturerName.toLowerCase().includes(query) ||
      b.chemistry.toLowerCase().includes(query) ||
      (b.nasaDatasetId && b.nasaDatasetId.toLowerCase().includes(query)) ||
      b.serialNumber.toLowerCase().includes(query) ||
      (b.vehicleModel && b.vehicleModel.toLowerCase().includes(query));

    const matchesChem = chemistryFilter === 'ALL' || b.chemistry === chemistryFilter;

    return matchesSearch && matchesChem;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Marketplace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
              ReVoltX Certified Marketplace
            </span>
            <span className="text-[11px] text-[#62756E] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0070F3]" /> 100% Laboratory Tested
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#10201B] mt-1">
            Certified Batteries for EV & Energy Storage
          </h1>
          <p className="text-xs text-[#62756E]">
            Direct from certified manufacturers and factory-refurbished cohorts with verified Digital Battery Passports.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-[#0070F3] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7E2]">
          {listings.length} Certified Listings
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#DDE7E2] shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#62756E]" />
          <input
            type="text"
            placeholder="Search by battery ID, manufacturer, or chemistry..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0070F3]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#62756E]" />
          <select
            value={chemistryFilter}
            onChange={e => setChemistryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium text-[#10201B] focus:bg-white focus:outline-none"
          >
            <option value="ALL">All Chemistries</option>
            <option value="LFP">LFP (Lithium Iron Phosphate)</option>
            <option value="NMC">NMC (Nickel Manganese)</option>
          </select>
        </div>
      </div>

      {/* Certified Battery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col justify-between hover:border-[#0070F3] transition-all group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-base text-[#10201B] group-hover:text-[#0070F3]">
                      {item.revoltXId}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0070F3] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Certified
                    </span>
                  </div>
                  <p className="text-xs text-[#62756E] mt-0.5 font-medium">
                    {item.manufacturerName} • {item.packConfiguration}
                  </p>
                </div>

                <span className="font-mono text-lg font-bold text-[#10201B]">
                  ${item.marketPrice?.toLocaleString() || '1,800'}
                </span>
              </div>

              {/* Specs & Health Meter */}
              <div className="mt-5 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#62756E]">Chemistry</span>
                  <p className="text-xs font-bold text-[#10201B] mt-0.5">{item.chemistry}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#62756E]">Capacity</span>
                  <p className="text-xs font-bold font-mono text-[#10201B] mt-0.5">{item.capacity} Ah</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#62756E]">RX Score</span>
                  <p className="text-xs font-bold font-mono text-[#0070F3] mt-0.5">{item.rxScore}/100</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[#62756E]">Verified State of Health:</span>
                <span className="font-bold font-mono text-[#0070F3]">{item.currentSOH}%</span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-[#62756E]">Warranty:</span>
                <span className="font-medium text-[#10201B]">{item.warrantyPeriod}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-[#DDE7E2] flex items-center gap-2">
              <Link
                href={`/owner/marketplace/${item.revoltXId}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#0070F3] text-white text-xs font-bold text-center hover:bg-[#0058C6] shadow-xs transition-colors"
              >
                Buy Battery (${item.marketPrice?.toLocaleString() || '1,800'})
              </Link>

              <Link
                href={`/battery/${item.revoltXId}`}
                className="p-2.5 rounded-xl border border-[#DDE7E2] text-[#62756E] hover:text-[#10201B] hover:bg-[#F0F5F2] transition-colors"
                title="Inspect Digital Battery Passport"
              >
                <QrCode className="w-4 h-4 text-[#0070F3]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
