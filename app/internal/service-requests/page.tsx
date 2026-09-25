'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  UserCheck, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Sparkles, 
  MapPin, 
  Phone, 
  User, 
  ShieldAlert,
  BatteryMedium,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { ServiceStatus } from '../../../lib/types';

export default function InternalServiceRequestsPage() {
  const { serviceRequests, updateServiceRequestStatus, technicians } = useReVoltX();
  const [filter, setFilter] = useState<string>('ALL');

  // Most recent request is the latest incoming customer notification
  const latestRequest = serviceRequests[0];
  const pendingCount = serviceRequests.filter(r => r.status === 'Requested' || r.status === 'Technician Assigned').length;

  const filtered = serviceRequests.filter(r => filter === 'ALL' || r.status === filter);

  return (
    <div className="space-y-6">
      {/* Page Title & Top Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D89A24] bg-[#FEF6E6] px-2.5 py-0.5 rounded-full border border-[#FCDFA6]">
              Field Logistics & Diagnostics Dispatch
            </span>
            {pendingCount > 0 && (
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {pendingCount} Action Required
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#10201B] mt-1">
            Service Requests & Technician Assignments
          </h1>
          <p className="text-xs text-[#62756E]">
            Real-time incoming customer health check bookings, delivery dispatches, and Smart Dock testing orders.
          </p>
        </div>

        <Link
          href="/internal/testing"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
        >
          <Wrench className="w-4 h-4" />
          <span>Launch Smart Dock Bench</span>
        </Link>
      </div>

      {/* REAL-TIME INCOMING NOTIFICATION BANNER */}
      {latestRequest && (
        <div className="bg-gradient-to-r from-[#DDF5EA] via-[#EDF9F4] to-white rounded-3xl p-5 border-2 border-[#137A58]/30 shadow-md relative overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#137A58] text-white flex items-center justify-center shrink-0 shadow-xs relative">
                <Bell className="w-5 h-5 animate-bounce" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-[#137A58] uppercase tracking-wider bg-[#BBEAD7] px-2 py-0.5 rounded-md">
                    Live Incoming Notification
                  </span>
                  <span className="text-xs text-[#62756E] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#137A58]" /> Just Received
                  </span>
                  <span className="font-mono text-xs font-bold text-[#10201B] bg-white px-2 py-0.5 rounded-md border border-[#DDE7E2]">
                    {latestRequest.id}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-sm font-bold text-[#10201B]">
                  <span>Customer: <strong className="text-[#137A58]">{latestRequest.customerName}</strong></span>
                  <span>•</span>
                  <span>Battery ID: <Link href={`/battery/${latestRequest.batteryId}`} className="font-mono text-[#0070F3] hover:underline">{latestRequest.batteryId}</Link></span>
                </div>

                <p className="text-xs text-[#62756E] max-w-2xl font-medium">
                  {latestRequest.issue}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-[#62756E] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#137A58]" /> {latestRequest.address}
                  </span>
                  {latestRequest.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#137A58]" /> {latestRequest.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions for Dispatcher */}
            <div className="flex items-center gap-2 md:border-l md:border-[#BBEAD7] md:pl-5 shrink-0">
              <Link
                href={`/internal/testing?batteryId=${latestRequest.batteryId}`}
                className="px-4 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Test in Smart Dock</span>
              </Link>

              <Link
                href={`/internal/service-requests/${latestRequest.id}`}
                className="px-3.5 py-2.5 rounded-xl bg-white border border-[#DDE7E2] text-xs font-semibold text-[#10201B] hover:bg-[#F7FAF8]"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs font-semibold">
        {[
          'ALL',
          'Requested',
          'Scheduled',
          'Technician Assigned',
          'Assessment Complete',
          'Completed'
        ].map(status => {
          const count = status === 'ALL' 
            ? serviceRequests.length 
            : serviceRequests.filter(r => r.status === status).length;

          return (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filter === status
                  ? 'bg-[#10201B] text-white shadow-xs'
                  : 'bg-white text-[#62756E] hover:text-[#10201B] border border-[#DDE7E2]'
              }`}
            >
              <span>{status}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filter === status ? 'bg-white/20 text-white' : 'bg-[#F0F5F2] text-[#62756E]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Request ID</th>
                <th className="pb-3 font-semibold">Battery ID</th>
                <th className="pb-3 font-semibold">Customer Name & Contact</th>
                <th className="pb-3 font-semibold">Service Issue / Notes</th>
                <th className="pb-3 font-semibold">Assigned Technician</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {filtered.map(req => {
                const isNew = req.id === latestRequest?.id;

                return (
                  <tr 
                    key={req.id} 
                    className={`transition-colors ${isNew ? 'bg-[#DDF5EA]/20 hover:bg-[#DDF5EA]/30' : 'hover:bg-[#F7FAF8]'}`}
                  >
                    <td className="py-4 font-mono font-bold text-[#10201B]">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/internal/service-requests/${req.id}`} className="hover:underline">
                          {req.id}
                        </Link>
                        {isNew && (
                          <span className="text-[9px] font-bold uppercase text-[#137A58] bg-[#DDF5EA] px-1.5 py-0.5 rounded-full border border-[#BBEAD7]">
                            NEW
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 font-mono font-bold text-[#137A58]">
                      <Link 
                        href={`/battery/${req.batteryId}`} 
                        className="hover:underline flex items-center gap-1"
                        title="View Digital Battery Passport"
                      >
                        <BatteryMedium className="w-3.5 h-3.5 text-[#137A58]" />
                        <span>{req.batteryId}</span>
                      </Link>
                    </td>

                    <td className="py-4">
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#DDF5EA] text-[#137A58] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {req.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#10201B] text-xs">{req.customerName}</p>
                          <p className="text-[11px] text-[#62756E]">{req.phone || 'No phone'}</p>
                          <p className="text-[10px] text-[#62756E] max-w-xs truncate">{req.address}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-[#62756E] max-w-xs">
                      <p className="line-clamp-2 text-xs text-[#10201B] font-medium">{req.issue}</p>
                      <span className="text-[10px] text-[#62756E] block mt-0.5">
                        Requested: {new Date(req.requestedDate).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-4">
                      {req.technicianName ? (
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#137A58]" />
                          <span className="font-semibold text-[#137A58]">{req.technicianName}</span>
                        </div>
                      ) : (
                        <select
                          onChange={e => updateServiceRequestStatus(req.id, 'Technician Assigned', e.target.value)}
                          className="px-2 py-1 rounded-lg border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium text-[#10201B] focus:bg-white"
                          defaultValue=""
                        >
                          <option value="" disabled>Assign Tech...</option>
                          {technicians.map(t => (
                            <option key={t.id} value={t.id}>{t.name} ({t.status})</option>
                          ))}
                        </select>
                      )}
                    </td>

                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        req.status === 'Requested'
                          ? 'bg-[#FEF6E6] text-[#D89A24] border-[#FCDFA6]'
                          : req.status === 'Assessment Complete' || req.status === 'Completed'
                          ? 'bg-[#DDF5EA] text-[#137A58] border-[#BBEAD7]'
                          : 'bg-[#EBF4FF] text-[#0070F3] border-[#CCE3FD]'
                      }`}>
                        {req.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/internal/testing?batteryId=${req.batteryId}`}
                          className="px-2.5 py-1 rounded-lg bg-[#137A58] text-white hover:bg-[#0E5B42] font-semibold text-[11px] flex items-center gap-1 transition-colors"
                          title="Run Smart Dock Diagnostic"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>Dock</span>
                        </Link>

                        <Link
                          href={`/internal/service-requests/${req.id}`}
                          className="px-2.5 py-1 rounded-lg bg-[#F0F5F2] hover:bg-[#DDE7E2] font-semibold text-[11px] text-[#10201B]"
                        >
                          Inspect
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
