'use client';

import React from 'react';
import Link from 'next/link';
import { Recycle, Scale, Droplet, ArrowRight } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';

export default function InternalRecyclingPage() {
  const { recyclingRecords } = useReVoltX();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#DDE7E2]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D94B4B]">
          Critical Raw Materials
        </span>
        <h1 className="text-2xl font-bold text-[#10201B] mt-1">
          Hydrometallurgical Recycling Queue & Audits
        </h1>
        <p className="text-xs text-[#62756E]">
          Tracking end-of-life battery deconstruction and certified mineral reclamation.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Batch ID</th>
                <th className="pb-3 font-semibold">Battery ID</th>
                <th className="pb-3 font-semibold">Certified Recycler</th>
                <th className="pb-3 font-semibold">Received Date</th>
                <th className="pb-3 font-semibold">Reclaimed Yield</th>
                <th className="pb-3 font-semibold">Recovery Efficiency</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {recyclingRecords.map(rec => (
                <tr key={rec.id} className="hover:bg-[#F7FAF8]">
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">#{rec.id}</td>
                  <td className="py-3.5 font-mono text-[#0070F3] font-bold">{rec.batteryId}</td>
                  <td className="py-3.5 font-semibold text-[#10201B]">{rec.recyclerName}</td>
                  <td className="py-3.5 font-mono text-[#62756E]">{rec.receivedDate}</td>
                  <td className="py-3.5 font-mono text-[#10201B]">
                    {rec.lithiumRecoveryKg}kg Li • {rec.nickelRecoveryKg}kg Ni • {rec.cobaltRecoveryKg}kg Co
                  </td>
                  <td className="py-3.5 font-mono font-bold text-[#0070F3]">{rec.recoveryEfficiencyPct}%</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#0070F3]">
                      {rec.status}
                    </span>
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
