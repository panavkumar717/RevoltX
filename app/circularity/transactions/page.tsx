'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftRight, CheckCircle2, QrCode, FileText } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';

export default function CircularityTransactionsPage() {
  const { opportunities, batteries } = useReVoltX();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#DDE7E2]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3]">
          Chain of Custody
        </span>
        <h1 className="text-2xl font-bold text-[#10201B] mt-1">
          Second-Life Allocations & Custody Transfers
        </h1>
        <p className="text-xs text-[#62756E]">
          Legal transfer-of-custody logs transferring battery assets from mobility fleets into stationary storage.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Transaction ID</th>
                <th className="pb-3 font-semibold">Battery ID</th>
                <th className="pb-3 font-semibold">Previous Life</th>
                <th className="pb-3 font-semibold">Allocated Partner</th>
                <th className="pb-3 font-semibold">Second-Life Duty</th>
                <th className="pb-3 font-semibold">Asset Value</th>
                <th className="pb-3 font-semibold">Transfer Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {opportunities.map(opp => (
                <tr key={opp.id} className="hover:bg-[#F7FAF8] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">TXN-{opp.id.toUpperCase()}</td>
                  <td className="py-3.5 font-mono text-[#0070F3] font-bold">
                    <Link href={`/battery/${opp.batteryId}`} className="hover:underline">
                      {opp.batteryId}
                    </Link>
                  </td>
                  <td className="py-3.5 text-[#62756E]">Urban Fleet EV</td>
                  <td className="py-3.5 font-semibold text-[#10201B]">
                    {opp.allocatedPartner || 'EcoVolt Solutions GmbH'}
                  </td>
                  <td className="py-3.5">{opp.targetApplication}</td>
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">${opp.economicValueUsd}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0070F3] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
                      <CheckCircle2 className="w-3 h-3" /> Transferred
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
