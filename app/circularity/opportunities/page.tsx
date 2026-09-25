'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  Info,
  QrCode
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';

export default function CircularityOpportunitiesPage() {
  const { opportunities, batteries } = useReVoltX();
  const [appFilter, setAppFilter] = useState('ALL');

  const filteredOpps = opportunities.filter(o => {
    return appFilter === 'ALL' || o.targetApplication === appFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5D7C13] bg-[#F3F8E5] px-2.5 py-0.5 rounded-full border border-[#DAECAE]">
            Second-Life Sourcing
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Second-Life Assessment Opportunities
          </h1>
          <p className="text-xs text-[#62756E]">
            Packs potentially suitable for secondary-life stationary energy storage, solar microgrids, and telecom backup.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-[#10201B] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7E2]">
          {filteredOpps.length} Available Modules
        </div>
      </div>

      {/* Standards & Qualification Disclosure Banner (Requirement 18) */}
      <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8E0B0] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#D89A24] shrink-0 mt-0.5" />
        <div className="text-xs text-[#62756E] leading-relaxed">
          <strong className="text-[#10201B]">Regulatory Qualification Standard:</strong> Batteries listed below have been algorithmically evaluated as <strong className="text-[#10201B]">potentially suitable for secondary-life assessment</strong>. Actual safety certification and commercial reuse eligibility require qualified physical testing under UL 1974 / IEC 62933 standards prior to operational commissioning.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs font-semibold">
        {[
          { key: 'ALL', label: 'All Applications' },
          { key: 'Solar Energy Storage', label: 'Solar Energy Storage' },
          { key: 'Telecom Backup', label: 'Telecom Backup' },
          { key: 'Microgrid', label: 'Microgrid Buffer' }
        ].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setAppFilter(tab.key)}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              appFilter === tab.key
                ? 'bg-[#137A58] text-white shadow-xs'
                : 'bg-white text-[#62756E] hover:text-[#10201B] border border-[#DDE7E2]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map(opp => {
          const matchingBat = batteries.find(b => b.revoltXId === opp.batteryId);

          return (
            <div
              key={opp.id}
              className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col justify-between hover:border-[#137A58] transition-all group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono font-bold text-base text-[#10201B] group-hover:text-[#137A58]">
                      {opp.batteryId}
                    </span>
                    <p className="text-[11px] text-[#62756E] font-medium">
                      {matchingBat?.manufacturerName || 'XYZ Battery Corp.'} • {matchingBat?.chemistry || 'LFP'}
                    </p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    opp.status === 'Available'
                      ? 'bg-[#DDF5EA] text-[#137A58] border-[#BBEAD7]'
                      : 'bg-[#F0F5F2] text-[#62756E] border-[#DDE7E2]'
                  }`}>
                    {opp.status}
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] uppercase font-bold text-[#5D7C13] bg-[#F3F8E5] px-2 py-0.5 rounded">
                    Target Application
                  </span>
                  <h4 className="text-sm font-bold text-[#10201B] mt-1">{opp.targetApplication}</h4>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-center">
                  <div>
                    <span className="text-[10px] text-[#62756E] uppercase font-bold">Capacity</span>
                    <p className="text-xs font-bold font-mono text-[#10201B] mt-0.5">{opp.capacityKWh} kWh</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#62756E] uppercase font-bold">SOH</span>
                    <p className="text-xs font-bold font-mono text-[#D89A24] mt-0.5">{opp.soh}%</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#62756E] uppercase font-bold">RX Score</span>
                    <p className="text-xs font-bold font-mono text-[#137A58] mt-0.5">{opp.rxScore}/100</p>
                  </div>
                </div>

                <p className="text-xs text-[#62756E] mt-3">
                  Estimated extension: <strong className="text-[#10201B]">+{opp.estimatedUsefulYears} years</strong> of stationary diurnal duty.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DDE7E2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#62756E] block font-medium">Estimated Value</span>
                  <span className="font-mono text-base font-bold text-[#10201B]">
                    ${opp.economicValueUsd}
                  </span>
                </div>

                <Link
                  href={`/circularity/opportunities/${opp.batteryId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
                >
                  <span>Request Allocation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
