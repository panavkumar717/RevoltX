'use client';

import React from 'react';
import Link from 'next/link';
import { Users, UserCheck, Wrench, ArrowRight, CheckCircle2, MapPin, Phone } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';

export default function InternalTechniciansPage() {
  const { technicians, serviceRequests } = useReVoltX();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D89A24]">
            Field Engineering Personnel
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Certified Technician Roster & Dispatch
          </h1>
          <p className="text-xs text-[#62756E]">
            Field engineers equipped with portable Smart Battery Dock hardware testing kits.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-[#0070F3] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7E2]">
          3 Certified Engineers Active
        </div>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {technicians.map(t => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#0070F3] text-white flex items-center justify-center font-bold text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#10201B]">{t.name}</h3>
                    <span className="text-[11px] text-[#62756E]">{t.specialty}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  t.status === 'On Field'
                    ? 'bg-[#EFF6FF] text-[#0070F3] border border-[#BFDBFE]'
                    : 'bg-[#FEF6E7] text-[#D89A24] border border-[#F8E0B0]'
                }`}>
                  {t.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-[#62756E]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0070F3]" />
                  <span>{t.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0070F3]" />
                  <span className="font-mono">{t.phone}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs p-3 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
                <div>
                  <span className="text-[10px] text-[#62756E] uppercase font-bold">Active Jobs</span>
                  <p className="font-mono font-bold text-sm text-[#10201B]">{t.activeTasks}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#62756E] uppercase font-bold">Completed</span>
                  <p className="font-mono font-bold text-sm text-[#0070F3]">{t.completedAssessments}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DDE7E2]">
              <Link
                href="/internal/testing"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] transition-colors"
              >
                <span>Launch Smart Dock Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
