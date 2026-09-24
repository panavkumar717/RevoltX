'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';

export default function InternalSecondLifePage() {
  const { opportunities, allocateSecondLifeOpportunity } = useReVoltX();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#DDE7E2]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
          Circular Operations
        </span>
        <h1 className="text-2xl font-bold text-[#10201B] mt-1">
          Second-Life Repurposing Queue
        </h1>
        <p className="text-xs text-[#62756E]">
          Managing candidate batteries transition from mobility to stationary solar storage and microgrids.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Opportunity ID</th>
                <th className="pb-3 font-semibold">Battery ID</th>
                <th className="pb-3 font-semibold">Target Application</th>
                <th className="pb-3 font-semibold">Capacity</th>
                <th className="pb-3 font-semibold">SOH</th>
                <th className="pb-3 font-semibold">RX Score</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {opportunities.map(opp => (
                <tr key={opp.id} className="hover:bg-[#F7FAF8]">
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">{opp.id}</td>
                  <td className="py-3.5 font-mono font-bold text-[#0070F3]">{opp.batteryId}</td>
                  <td className="py-3.5 font-semibold text-[#10201B]">{opp.targetApplication}</td>
                  <td className="py-3.5 font-mono">{opp.capacityKWh} kWh</td>
                  <td className="py-3.5 font-mono text-[#D89A24] font-bold">{opp.soh}%</td>
                  <td className="py-3.5 font-mono font-bold text-[#0070F3]">{opp.rxScore}/100</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#0070F3]">
                      {opp.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href={`/circularity/opportunities/${opp.batteryId}`}
                      className="px-2.5 py-1 rounded-lg bg-[#F0F5F2] hover:bg-[#DDE7E2] font-semibold text-[11px]"
                    >
                      Inspect
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
