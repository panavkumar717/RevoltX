'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  QrCode, 
  Sun, 
  Cpu, 
  Info 
} from 'lucide-react';
import { useReVoltX } from '../../../../lib/store/batteryStore';
import { RXScoreGauge } from '../../../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../../../components/ui/HealthGauge';
import { LifecycleTimeline } from '../../../../components/ui/LifecycleTimeline';

export default function CircularityOpportunityDetailPage({
  params
}: {
  params: Promise<{ batteryId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { getBattery, allocateSecondLifeOpportunity, opportunities } = useReVoltX();
  const battery = getBattery(resolvedParams.batteryId) || getBattery('RX-2026-892738');

  const [partnerName, setPartnerName] = useState('EcoVolt Second-Life Solutions GmbH');
  const [allocated, setAllocated] = useState(false);

  if (!battery) {
    return <div className="p-8 text-center">Battery Opportunity Not Found</div>;
  }

  const matchingOpp = opportunities.find(o => o.batteryId === battery.revoltXId) || opportunities[0];

  const handleRequestAllocation = () => {
    allocateSecondLifeOpportunity(matchingOpp.id, partnerName);
    setAllocated(true);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/circularity/opportunities"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#62756E] hover:text-[#10201B]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Second-Life Opportunities
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#0284C7] text-white">
                SECOND-LIFE ASSESSMENT CANDIDATE
              </span>
              <span className="text-xs font-bold text-[#0070F3] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full">
                UL 1974 Protocol
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#10201B]">
              {battery.revoltXId}
            </h1>
            <p className="text-xs text-[#62756E] mt-1">
              Target Application: <strong className="text-[#10201B]">Solar Energy Storage (Stationary Diurnal Buffer)</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#62756E] block font-medium">Allocation Value</span>
            <span className="text-3xl font-bold font-mono text-[#10201B]">
              ${matchingOpp?.economicValueUsd || 1450}
            </span>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8E0B0] text-xs text-[#62756E] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#D89A24] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#10201B]">Permitted Information Notice:</strong> This battery has been algorithmically qualified as potentially suitable for secondary-life assessment. Qualified testing and cell isolation will be confirmed prior to final commissioning.
          </p>
        </div>

        {/* Health & Suitability */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#DDE7E2]">
          <HealthGauge
            soh={battery.currentSOH}
            soc={battery.soc}
            rul={battery.rul}
            temperature={battery.temperature}
            initialSOH={battery.initialSOH}
          />

          <div className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#DDE7E2] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
                Stationary Compatibility Index
              </span>
              <h3 className="text-base font-bold text-[#10201B] mt-0.5">
                RX Score: {battery.rxScore}/100 • 94% Solar Match
              </h3>
            </div>

            <div className="my-2">
              <RXScoreGauge score={battery.rxScore} size="md" showDetails={false} />
            </div>

            <div className="text-xs text-[#62756E] space-y-1 pt-2 border-t border-[#DDE7E2]">
              <div className="flex justify-between">
                <span>Chemistry Stability:</span>
                <span className="font-semibold text-[#10201B]">{battery.chemistry} (High Thermal Margin)</span>
              </div>
              <div className="flex justify-between">
                <span>Usable Capacity:</span>
                <span className="font-semibold text-[#10201B]">3.07 kWh at 0.5C discharge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Allocation Action Flow */}
        <div className="mt-8 pt-6 border-t border-[#DDE7E2]">
          {allocated ? (
            <div className="p-6 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#0070F3] mx-auto" />
              <h3 className="text-lg font-bold text-[#10201B]">
                Battery Successfully Allocated to {partnerName}!
              </h3>
              <p className="text-xs text-[#62756E] max-w-md mx-auto">
                Asset <strong className="text-[#10201B] font-mono">{battery.revoltXId}</strong> lifecycle has transitioned to <strong className="text-[#0070F3]">SECOND_LIFE</strong> in the ReVoltX Universal Database. The continuous Digital Battery Passport remains uninterrupted.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/circularity/transactions"
                  className="px-5 py-2.5 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6]"
                >
                  View Custody Transaction
                </Link>
                <Link
                  href={`/battery/${battery.revoltXId}`}
                  className="px-5 py-2.5 rounded-xl bg-white border border-[#DDE7E2] text-xs font-semibold text-[#10201B]"
                >
                  Inspect Updated Passport
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#62756E]">
                <span>Allocating organization: </span>
                <strong className="text-[#10201B]">{partnerName}</strong>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/battery/${battery.revoltXId}`}
                  className="px-4 py-2.5 rounded-xl border border-[#DDE7E2] text-xs font-semibold hover:bg-[#F0F5F2]"
                >
                  Inspect Passport
                </Link>
                <button
                  type="button"
                  onClick={handleRequestAllocation}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs transition-colors"
                >
                  <Sun className="w-4 h-4 text-[#0070F3]" />
                  <span>Request & Allocate for Solar Duty</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
