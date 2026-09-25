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
  Heart,
  MapPin,
  Clock,
  User,
  Phone,
  RefreshCw,
  ExternalLink
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
  const { getBattery, updateBattery, createServiceRequest, currentUser } = useReVoltX();
  const battery = getBattery(resolvedParams.batteryId) || getBattery('RX-2025-449182') || getBattery('RX-2026-892738');

  const [purchased, setPurchased] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<any | null>(null);

  if (!battery) {
    return <div className="p-8 text-center text-sm font-semibold">Battery Not Found</div>;
  }

  const tradeInCredit = 1850;
  const listPrice = battery.marketPrice || 1800;
  const netPrice = Math.max(0, listPrice - tradeInCredit);

  const handleBuy = () => {
    // 1. Update battery owner to Sarah Jenkins in shared database
    updateBattery(
      battery.id,
      {
        ownerId: 'usr-sarah',
        ownerName: currentUser?.name || 'Sarah Jenkins',
        status: 'Active',
        lifecycleStage: 'FIRST_LIFE'
      },
      'Purchased via ReVoltX Marketplace',
      `Ownership transferred to ${currentUser?.name || 'Sarah Jenkins'}. Scheduled for mobile delivery and installation.`
    );

    // 2. Generate tracking and dispatch service request to internal operations
    const trackingCode = `REV-DLV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq = createServiceRequest({
      batteryId: battery.revoltXId,
      customerName: currentUser?.name || 'Sarah Jenkins',
      phone: '+1 (555) 392-8819',
      address: '742 Evergreen Terrace, Sector 4, Silicon District',
      issue: `New Battery Purchase & Delivery: Pack ${battery.revoltXId} (${battery.chemistry}, ${battery.currentSOH}% SOH). Swap with customer trade-in unit RX-2026-892738. Delivery tomorrow 10:00 AM. Tracking: ${trackingCode}`
    });

    setDeliveryInfo({
      trackingCode,
      serviceRequestId: newReq.id,
      deliverySlot: 'Tomorrow between 10:00 AM - 1:00 PM',
      van: 'Mobile Fleet Service Van #02',
      technician: 'Marcus Vance (Certified Master Tech)',
      address: '742 Evergreen Terrace, Sector 4, Silicon District'
    });

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
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#10201B] text-white">
                CERTIFIED PACK
              </span>
              {battery.nasaDatasetId && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#EBF4FF] text-[#0070F3] border border-[#CCE3FD]">
                  NASA ARC {battery.nasaDatasetId}
                </span>
              )}
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
            <span className="text-xs text-[#62756E] block font-medium">Certified Market Price</span>
            <span className="text-3xl font-bold font-mono text-[#10201B]">
              ${listPrice.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#137A58] font-bold block mt-0.5">
              Net with Sarah&apos;s Trade-in: ${netPrice.toLocaleString()}
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

            <div className="text-xs text-[#62756E] space-y-1.5 pt-2 border-t border-[#DDE7E2]">
              <div className="flex justify-between">
                <span>Warranty Coverage:</span>
                <span className="font-semibold text-[#10201B]">{battery.warrantyPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span>Nominal Capacity:</span>
                <span className="font-semibold text-[#10201B]">
                  {battery.capacity} Ah ({((battery.capacity * (battery.nominalVoltage || 48)) / 1000).toFixed(1)} kWh)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Internal Impedance:</span>
                <span className="font-mono text-[#137A58] font-semibold">
                  Re: {battery.internalResistanceRe || '0.052'}Ω • Rct: {battery.chargeTransferRct || '0.078'}Ω
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Action or Scheduled Delivery Experience */}
        <div className="mt-8 pt-6 border-t border-[#DDE7E2]">
          {purchased && deliveryInfo ? (
            <div className="p-6 rounded-3xl bg-[#DDF5EA] border border-[#BBEAD7] space-y-4">
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#137A58] mx-auto" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
                  Order Placed & Delivery Confirmed
                </span>
                <h3 className="text-xl font-bold text-[#10201B]">
                  You will receive your battery tomorrow!
                </h3>
                <p className="text-xs text-[#62756E] max-w-md mx-auto">
                  Asset <strong className="text-[#10201B] font-mono">{battery.revoltXId}</strong> has been transferred to your ownership profile. ReVoltX Logistics Van #02 is dispatched for doorstep installation and trade-in pick-up.
                </p>
              </div>

              {/* Delivery Receipt Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#BBEAD7] text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex items-center justify-between pb-2 border-b border-[#DDE7E2]">
                  <span className="font-bold text-[#10201B] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#137A58]" /> Estimated Delivery:
                  </span>
                  <span className="font-bold text-[#137A58]">{deliveryInfo.deliverySlot}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#62756E]">Assigned Vehicle:</span>
                  <span className="font-medium text-[#10201B]">{deliveryInfo.van}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#62756E]">Assigned Technician:</span>
                  <span className="font-medium text-[#10201B]">{deliveryInfo.technician}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#62756E]">Delivery Address:</span>
                  <span className="font-medium text-[#10201B] text-right">{deliveryInfo.address}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#62756E]">Tracking Code:</span>
                  <span className="font-mono font-bold text-[#0070F3]">{deliveryInfo.trackingCode}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#62756E]">Operations Dispatch ID:</span>
                  <span className="font-mono font-bold text-[#137A58]">{deliveryInfo.serviceRequestId}</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="p-4 rounded-2xl bg-white/70 border border-[#BBEAD7] max-w-lg mx-auto space-y-2 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#62756E] block">
                  Delivery Timeline
                </span>
                <div className="flex items-center gap-2 text-[#137A58]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Order Verified & Passport Transferred to Sarah Jenkins</span>
                </div>
                <div className="flex items-center gap-2 text-[#137A58]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Quality Inspected & Loaded onto Van #02</span>
                </div>
                <div className="flex items-center gap-2 text-[#0070F3] font-bold">
                  <Truck className="w-4 h-4 animate-bounce" />
                  <span>Dispatched: En Route for Scheduled Delivery Tomorrow</span>
                </div>
                <div className="flex items-center gap-2 text-[#62756E]">
                  <Clock className="w-4 h-4" />
                  <span>Doorstep Handover & Old Pack Decoupling</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/internal/service-requests"
                  className="px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Delivery in Operations Portal</span>
                </Link>

                <Link
                  href={`/battery/${battery.revoltXId}`}
                  className="px-5 py-2.5 rounded-xl bg-white border border-[#BBEAD7] text-xs font-semibold text-[#10201B] hover:bg-[#F0F5F2]"
                >
                  Inspect Passport
                </Link>

                <Link
                  href="/owner"
                  className="px-5 py-2.5 rounded-xl bg-[#F0F5F2] text-xs font-semibold text-[#10201B] hover:bg-[#DDE7E2]"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#62756E]">
                <Truck className="w-4 h-4 text-[#137A58]" />
                <span>
                  Includes freight delivery to Sarah Jenkins (742 Evergreen Ter) & on-site Smart Dock swap
                </span>
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
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Buy Battery & Receive Tomorrow (${listPrice.toLocaleString()})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
