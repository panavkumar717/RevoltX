'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building, Factory, Truck, User, RefreshCw, ShieldCheck } from 'lucide-react';

export default function InternalPartnersPage() {
  const [partnerTab, setPartnerTab] = useState<'all' | 'manufacturers' | 'fleets' | 'circularity'>('all');

  const partners = [
    {
      id: 'mfg-01',
      type: 'Manufacturer',
      name: 'XYZ Battery Corp.',
      location: 'Berlin, Germany',
      activeAssets: '10,000 Packs',
      chemistry: 'LFP & NMC',
      status: 'Strategic Partner'
    },
    {
      id: 'mfg-02',
      type: 'Manufacturer',
      name: 'VoltMax Systems',
      location: 'Stockholm, Sweden',
      activeAssets: '3,400 Packs',
      chemistry: 'LFP Micro-mobility',
      status: 'Active'
    },
    {
      id: 'flt-01',
      type: 'Fleet Operator',
      name: 'EcoTransit Metro Delivery',
      location: 'Munich & Silicon District',
      activeAssets: '240 Vehicles',
      chemistry: 'LFP Commercial',
      status: 'Active Fleet'
    },
    {
      id: 'flt-02',
      type: 'Fleet Operator',
      name: 'Apex Long-Haul Logistics',
      location: 'Chicago, IL',
      activeAssets: '120 Heavy eTrucks',
      chemistry: 'NMC High Density',
      status: 'Active Fleet'
    },
    {
      id: 'cir-01',
      type: 'Circularity Partner',
      name: 'EcoVolt Second-Life Solutions',
      location: 'Hamburg, Germany',
      activeAssets: '48 MWh Commissioned',
      chemistry: 'Solar Microgrids',
      status: 'Certified Repurposer'
    },
    {
      id: 'cir-02',
      type: 'Circularity Partner',
      name: 'GreenLithium Closed-Loop AG',
      location: 'Zurich, Switzerland',
      activeAssets: '14 Hydromet Batches',
      chemistry: 'Hydrometallurgy',
      status: 'Certified Recycler'
    }
  ];

  const filtered = partners.filter(p => {
    if (partnerTab === 'manufacturers') return p.type === 'Manufacturer';
    if (partnerTab === 'fleets') return p.type === 'Fleet Operator';
    if (partnerTab === 'circularity') return p.type === 'Circularity Partner';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#DDE7E2]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D89A24]">
          Ecosystem Directory
        </span>
        <h1 className="text-2xl font-bold text-[#10201B] mt-1">
          Ecosystem Partners & Organizations
        </h1>
        <p className="text-xs text-[#62756E]">
          Connected battery manufacturers, fleet operators, customer organizations, and circularity repurposers.
        </p>
      </div>

      <div className="flex items-center gap-1 bg-[#F0F5F2] p-1.5 rounded-2xl border border-[#DDE7E2] overflow-x-auto text-xs font-semibold">
        {[
          { key: 'all', label: 'All Organizations' },
          { key: 'manufacturers', label: 'Battery Manufacturers' },
          { key: 'fleets', label: 'Fleet Operators' },
          { key: 'circularity', label: 'Circularity & Recyclers' }
        ].map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setPartnerTab(t.key as any)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              partnerTab === t.key
                ? 'bg-white text-[#10201B] shadow-xs border border-[#DDE7E2]'
                : 'text-[#62756E] hover:text-[#10201B]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div
            key={p.id}
            className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#137A58] bg-[#DDF5EA] px-2.5 py-0.5 rounded-full">
                  {p.type}
                </span>
                <span className="text-[11px] font-mono text-[#62756E]">{p.id}</span>
              </div>

              <h3 className="text-base font-bold text-[#10201B] mt-3">{p.name}</h3>
              <p className="text-xs text-[#62756E] mt-0.5">{p.location}</p>

              <div className="mt-4 p-3 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#62756E]">Connected Assets:</span>
                  <span className="font-bold text-[#10201B]">{p.activeAssets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#62756E]">Specialization:</span>
                  <span className="font-medium text-[#10201B]">{p.chemistry}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-[#137A58]">
                <ShieldCheck className="w-3.5 h-3.5" /> {p.status}
              </span>
              <span className="text-[#62756E]">Verified Partner</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
