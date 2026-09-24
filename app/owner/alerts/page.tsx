'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, AlertTriangle, ShieldCheck, Wrench, ShoppingBag, ArrowRight } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';

export default function OwnerAlertsPage() {
  const { getBattery } = useReVoltX();
  const battery = getBattery('RX-2026-892738')!;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#DDE7E2]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3]">
          Notifications
        </span>
        <h1 className="text-2xl font-bold text-[#10201B] mt-1">
          Battery Alerts & Care Recommendations
        </h1>
        <p className="text-xs text-[#62756E]">
          Actionable updates regarding your battery health, thermal margins, and lifecycle milestones.
        </p>
      </div>

      <div className="space-y-4">
        {/* Urgent Alert */}
        <div className="p-6 rounded-3xl bg-[#FEF6E7] border border-[#F8E0B0] shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white text-[#D89A24]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D89A24]">
                  Action Recommended
                </span>
                <h3 className="text-sm font-bold text-[#10201B]">
                  Accelerated Thermal Degradation Warning (38.4°C Peak)
                </h3>
              </div>
            </div>
            <span className="text-[10px] text-[#62756E] font-mono">Yesterday at 16:30</span>
          </div>

          <p className="text-xs text-[#62756E] leading-relaxed">
            Your battery has logged 1,420 cycles and crossed the 72% SOH mark. ReVoltX recommends booking an on-site Smart Battery Dock health assessment to evaluate module cell balance and determine replacement trade-in timing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/owner/service"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book Battery Health Check</span>
            </Link>
            <Link
              href="/owner/marketplace"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#10201B] text-xs font-semibold hover:bg-[#F0F5F2] border border-[#DDE7E2]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#0070F3]" />
              <span>Explore Replacement Batteries</span>
            </Link>
          </div>
        </div>

        {/* Informational Alert */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#EFF6FF] text-[#0070F3]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#0070F3]">
                  Second-Life Qualification
                </span>
                <h3 className="text-sm font-bold text-[#10201B]">
                  Battery RX-2026-892738 Pre-Approved for Solar Storage Trade-In
                </h3>
              </div>
            </div>
            <span className="text-[10px] text-[#62756E] font-mono">3 days ago</span>
          </div>

          <p className="text-xs text-[#62756E] leading-relaxed">
            Good news! When you decide to upgrade, this pack qualifies for $1,450 trade-in credit into the ReVoltX Circularity marketplace for stationary solar energy storage.
          </p>
        </div>
      </div>
    </div>
  );
}
