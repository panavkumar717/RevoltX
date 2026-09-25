'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Wrench, 
  UserCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { useReVoltX } from '../../../../lib/store/batteryStore';

export default function InternalServiceRequestDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { serviceRequests, getBattery, updateServiceRequestStatus, technicians } = useReVoltX();

  const request = serviceRequests.find(r => r.id === resolvedParams.id) || serviceRequests[0];
  const battery = request ? getBattery(request.batteryId) : null;

  if (!request) {
    return <div className="p-8 text-center">Service Request Not Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/internal/service-requests"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#62756E] hover:text-[#10201B]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Service Queue
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#10201B] text-white">
                {request.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7]">
                {request.status}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[#10201B]">
              Field Service Request: {request.customerName}
            </h1>
            <p className="text-xs text-[#62756E] mt-0.5">
              Target Asset: <strong className="font-mono text-[#10201B]">{request.batteryId}</strong>
            </p>
          </div>

          <Link
            href="/internal/testing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
          >
            <Cpu className="w-4 h-4 text-[#C9EF72]" />
            <span>Connect Smart Battery Dock</span>
          </Link>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-2">
            <h3 className="font-bold text-xs text-[#10201B] uppercase tracking-wider">
              Customer & Deployment Location
            </h3>
            <div className="flex justify-between py-1 border-b border-[#DDE7E2]">
              <span className="text-[#62756E]">Customer Name:</span>
              <span className="font-semibold text-[#10201B]">{request.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#DDE7E2]">
              <span className="text-[#62756E]">Phone:</span>
              <span className="font-mono font-semibold text-[#10201B]">{request.phone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#62756E]">Service Address:</span>
              <span className="text-[#10201B] text-right max-w-xs">{request.address}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-2">
            <h3 className="font-bold text-xs text-[#10201B] uppercase tracking-wider">
              Technician & Schedule
            </h3>
            <div className="flex justify-between py-1 border-b border-[#DDE7E2]">
              <span className="text-[#62756E]">Assigned Technician:</span>
              <span className="font-semibold text-[#137A58]">
                {request.technicianName || 'Alex Rivera (Staff Ops)'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#DDE7E2]">
              <span className="text-[#62756E]">Requested Date:</span>
              <span className="font-mono text-[#10201B]">
                {new Date(request.requestedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#62756E]">Appointment Window:</span>
              <span className="font-semibold text-[#10201B]">10:00 AM - 12:00 PM</span>
            </div>
          </div>
        </div>

        {/* Reported Issue */}
        <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8E0B0] text-xs space-y-1">
          <h4 className="font-bold text-[#10201B]">Reported Symptoms & Notes:</h4>
          <p className="text-[#62756E] leading-relaxed">{request.issue}</p>
        </div>

        {/* Battery Health Baseline snapshot */}
        {battery && (
          <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2] space-y-2 text-xs">
            <h4 className="font-bold text-[#10201B]">Battery Baseline Snapshot:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2">
              <div className="p-2 rounded-xl bg-[#F0F5F2]">
                <span className="text-[10px] text-[#62756E]">Current SOH</span>
                <p className="font-mono font-bold text-sm text-[#D89A24]">{battery.currentSOH}%</p>
              </div>
              <div className="p-2 rounded-xl bg-[#F0F5F2]">
                <span className="text-[10px] text-[#62756E]">Remaining Cycles</span>
                <p className="font-mono font-bold text-sm text-[#10201B]">{battery.rul} cyc</p>
              </div>
              <div className="p-2 rounded-xl bg-[#F0F5F2]">
                <span className="text-[10px] text-[#62756E]">RX Score</span>
                <p className="font-mono font-bold text-sm text-[#137A58]">{battery.rxScore}/100</p>
              </div>
              <div className="p-2 rounded-xl bg-[#F0F5F2]">
                <span className="text-[10px] text-[#62756E]">Chemistry</span>
                <p className="font-bold text-sm text-[#10201B]">{battery.chemistry}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick action buttons */}
        <div className="pt-4 border-t border-[#DDE7E2] flex items-center justify-between">
          <Link
            href={`/battery/${request.batteryId}`}
            className="text-xs font-semibold text-[#137A58] hover:underline"
          >
            Inspect Digital Battery Passport →
          </Link>

          <Link
            href="/internal/testing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
          >
            <span>Start Test with Smart Battery Dock</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
