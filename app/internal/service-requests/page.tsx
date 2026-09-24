'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, UserCheck, Calendar, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { ServiceStatus } from '../../../lib/types';

export default function InternalServiceRequestsPage() {
  const { serviceRequests, updateServiceRequestStatus, technicians } = useReVoltX();
  const [filter, setFilter] = useState<string>('ALL');

  const filtered = serviceRequests.filter(r => filter === 'ALL' || r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D89A24]">
            Field Logistics Dispatch
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Service Requests & Technician Assignments
          </h1>
          <p className="text-xs text-[#62756E]">
            Incoming customer and fleet health check requests requiring Smart Dock assessment.
          </p>
        </div>

        <Link
          href="/internal/testing"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
        >
          <Wrench className="w-4 h-4" />
          <span>Launch Smart Dock Bench</span>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs font-semibold">
        {[
          'ALL',
          'Requested',
          'Scheduled',
          'Technician Assigned',
          'Assessment Complete',
          'Completed'
        ].map(status => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              filter === status
                ? 'bg-[#10201B] text-white shadow-xs'
                : 'bg-white text-[#62756E] hover:text-[#10201B] border border-[#DDE7E2]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Request ID</th>
                <th className="pb-3 font-semibold">Battery ID</th>
                <th className="pb-3 font-semibold">Customer / Contact</th>
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold">Assigned Technician</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {filtered.map(req => (
                <tr key={req.id} className="hover:bg-[#F7FAF8] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">
                    <Link href={`/internal/service-requests/${req.id}`} className="hover:underline">
                      {req.id}
                    </Link>
                  </td>
                  <td className="py-3.5 font-mono font-bold text-[#137A58]">
                    {req.batteryId}
                  </td>
                  <td className="py-3.5 font-semibold text-[#10201B]">{req.customerName}</td>
                  <td className="py-3.5 text-[#62756E] max-w-xs truncate">{req.address}</td>
                  <td className="py-3.5">
                    {req.technicianName ? (
                      <span className="font-semibold text-[#137A58]">{req.technicianName}</span>
                    ) : (
                      <select
                        onChange={e => updateServiceRequestStatus(req.id, 'Technician Assigned', e.target.value)}
                        className="px-2 py-1 rounded-lg border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium"
                        defaultValue=""
                      >
                        <option value="" disabled>Assign Tech...</option>
                        {technicians.map(t => (
                          <option key={t.id} value={t.id}>{t.name} ({t.status})</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7]">
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href={`/internal/service-requests/${req.id}`}
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
