'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Zap, 
  ShoppingBag, 
  Calendar,
  Truck,
  Heart
} from 'lucide-react';
import { useReVoltX } from '../../../../lib/store/batteryStore';
import { RXScoreGauge } from '../../../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../../../components/ui/HealthGauge';
import { BatteryStatusBadge } from '../../../../components/ui/BatteryStatusBadge';

export default function OwnerMarketplaceDetailPage({
  params
}: {
  params: Promise<{ batteryId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { getBattery, updateBattery, currentUser } = useReVoltX();
  const battery = getBattery(resolvedParams.batteryId) || getBattery('RX-2026-892738');

  const [purchased, setPurchased] = useState(false);

  if (!battery) {
    return <div className="p-8 text-center">Battery Not Found</div>;
  }

  const handleBuy = () => {
    // Update battery owner to Sarah Jenkins in shared database
    updateBattery(
      battery.id,
      {
        ownerId: 'usr-sarah',
        ownerName: currentUser?.name || 'Sarah Jenkins',
        status: 'Active',
        lifecycleStage: 'FIRST_LIFE'
      },
      'Purchased via ReVoltX Marketplace',
      `Ownership transferred to ${currentUser?.name || 'Sarah Jenkins'}. Passport updated.`
    );

    setPurchased(true);

    try {
      confetti({
        particleCount: 100,
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
        href="/owner/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#62756E] hover:text-[#10201B]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Certified Marketplace
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#10201B] text-white">
                CERTIFIED PACK
              </span>
              <BatteryStatusBadge stage={battery.lifecycleStage} size="sm" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#10201B]">
              {battery.revoltXId}
            </h1>
            <p className="text-xs text-[#62756E] mt-1 font-medium">
              Manufactured by {battery.manufacturerName} • Chemistry: {battery.chemistry} • Configuration: {battery.packConfiguration}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#62756E] block font-medium">Certified Price</span>
            <span className="text-3xl font-bold font-mono text-[#10201B]">
              ${battery.marketPrice?.toLocaleString() || '1,800'}
            </span>
          </div>
        </div>

        {/* Health, RX Score & Specs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#DDE7E2]">
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
                ReVoltX Intelligence Assessment
              </span>
              <h3 className="text-sm font-bold text-[#10201B] mt-0.5">
                RX Score: {battery.rxScore}/100
              </h3>
            </div>

            <div className="my-2">
              <RXScoreGauge score={battery.rxScore} size="md" showDetails={false} />
            </div>

            <div className="text-xs text-[#62756E] space-y-1 pt-2 border-t border-[#DDE7E2]">
              <div className="flex justify-between">
                <span>Warranty:</span>
                <span className="font-semibold text-[#10201B]">{battery.warrantyPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span>Nominal Capacity:</span>
                <span className="font-semibold text-[#10201B]">{battery.capacity} Ah ({((battery.capacity * battery.nominalVoltage) / 1000).toFixed(1)} kWh)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Action or Success Confirmation */}
        <div className="mt-8 pt-6 border-t border-[#DDE7E2]">
          {purchased ? (
            <div className="p-6 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7] text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#137A58] mx-auto" />
              <h3 className="text-lg font-bold text-[#10201B]">
                Battery Successfully Associated with Your Account!
              </h3>
              <p className="text-xs text-[#62756E] max-w-md mx-auto">
                Asset <strong className="text-[#10201B] font-mono">{battery.revoltXId}</strong> has been transferred to your ownership profile. You can now monitor its live health from your Customer Dashboard.
              </p>
              <div className="pt-3 flex justify-center gap-3">
                <Link
                  href="/owner"
                  className="px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
                >
                  Go to My Battery Dashboard
                </Link>
                <Link
                  href={`/battery/${battery.revoltXId}`}
                  className="px-5 py-2.5 rounded-xl bg-white border border-[#DDE7E2] text-xs font-semibold text-[#10201B]"
                >
                  View Digital Passport
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#62756E]">
                <Truck className="w-4 h-4 text-[#137A58]" />
                <span>Includes certified freight delivery & installation by ReVoltX technician</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/battery/${battery.revoltXId}`}
                  className="px-4 py-3 rounded-xl border border-[#DDE7E2] text-xs font-semibold hover:bg-[#F0F5F2] text-[#10201B]"
                >
                  Inspect Passport
                </Link>
                <button
                  type="button"
                  onClick={handleBuy}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy / Request Battery (${battery.marketPrice?.toLocaleString() || '1,800'})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
