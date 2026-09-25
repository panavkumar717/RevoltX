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
  MapPin,
  Clock,
  User,
  Phone,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { PublicNavbar } from '../../../components/shared/PublicNavbar';
import { RXScoreGauge } from '../../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../../components/ui/HealthGauge';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';

export default function PublicMarketplaceDetailPage({
  params
}: {
  params: Promise<{ batteryId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { getBattery, updateBattery, createServiceRequest } = useReVoltX();
  const battery = getBattery(resolvedParams.batteryId) || getBattery('RX-2025-449182') || getBattery('RX-2026-892738');

  const [purchased, setPurchased] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<any | null>(null);

  // Form states for guest checkout
  const [buyerName, setBuyerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [includeTradeIn, setIncludeTradeIn] = useState(false);
  const [formError, setFormError] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  if (!battery) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] dark:bg-zinc-950 flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-[#10201B] dark:text-white">Battery Pack Not Found</h2>
        <Link href="/marketplace" className="mt-4 text-xs font-semibold text-[#137A58] underline">
          Return to Certified Marketplace
        </Link>
      </div>
    );
  }

  const tradeInCredit = 1850;
  const listPrice = battery.marketPrice || 1800;
  const netPrice = Math.max(0, listPrice - (includeTradeIn ? tradeInCredit : 0));

  const handleConfirmOrder = () => {
    if (!buyerName.trim()) {
      setFormError('Please enter your full name or company name.');
      return;
    }
    if (!deliveryAddress.trim()) {
      setFormError('Please enter a delivery address.');
      return;
    }

    setFormError('');
    const customerDisplay = buyerName.trim();

    // 1. Update battery owner in unified database
    updateBattery(
      battery.id,
      {
        ownerName: customerDisplay,
        status: 'Active',
        lifecycleStage: 'FIRST_LIFE'
      },
      'Purchased via ReVoltX Public Marketplace',
      `Ownership transferred to ${customerDisplay}. Scheduled for mobile delivery and installation.`
    );

    // 2. Generate tracking and dispatch service request to operations
    const trackingCode = `REV-DLV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq = createServiceRequest({
      batteryId: battery.revoltXId,
      customerName: customerDisplay,
      phone: buyerPhone || '+1 (555) 392-8819',
      address: deliveryAddress,
      issue: `Public Marketplace Purchase: Pack ${battery.revoltXId} (${battery.chemistry}, ${battery.currentSOH}% SOH). Trade-in exchange: ${includeTradeIn ? 'Yes ($-1,850 credit applied)' : 'No'}. Delivery window tomorrow 10:00 AM. Tracking: ${trackingCode}`
    });

    setDeliveryInfo({
      trackingCode,
      serviceRequestId: newReq.id,
      customerName: customerDisplay,
      deliverySlot: 'Tomorrow between 10:00 AM - 1:00 PM',
      van: 'Mobile Fleet Service Van #02',
      technician: 'Marcus Vance (Certified Master Tech)',
      address: deliveryAddress
    });

    setPurchased(true);
    setShowCheckoutModal(false);

    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] dark:bg-zinc-950 text-[#10201B] dark:text-zinc-100 transition-colors">
      <PublicNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 space-y-6">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#62756E] dark:text-zinc-400 hover:text-[#10201B] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Public Marketplace
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] dark:border-zinc-800 shadow-sm">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#10201B] dark:bg-white text-white dark:text-zinc-900">
                  CERTIFIED ASSET
                </span>
                {battery.nasaDatasetId && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#EBF4FF] dark:bg-blue-950/60 text-[#0070F3] dark:text-blue-400 border border-[#CCE3FD] dark:border-blue-900">
                    NASA ARC {battery.nasaDatasetId}
                  </span>
                )}
                <BatteryStatusBadge stage={battery.lifecycleStage} size="sm" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#10201B] dark:text-white">
                {battery.revoltXId}
              </h1>
              <p className="text-xs text-[#62756E] dark:text-zinc-400 mt-1 font-medium">
                Manufactured by {battery.manufacturerName} • Chemistry: {battery.chemistry} • Configuration: {battery.packConfiguration}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#62756E] dark:text-zinc-400 block font-medium">Certified Market Price</span>
              <span className="text-3xl font-bold font-mono text-[#10201B] dark:text-white">
                ${listPrice.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#137A58] dark:text-[#34D399] font-bold block mt-0.5">
                Eligible for $1,850 Pack Trade-In Credit
              </span>
            </div>
          </div>

          {/* Health, RX Score & Specs */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#DDE7E2] dark:border-zinc-800">
            <HealthGauge
              soh={battery.currentSOH}
              soc={battery.soc}
              rul={battery.rul}
              temperature={battery.temperature}
              initialSOH={battery.initialSOH}
            />

            <div className="bg-[#F7FAF8] dark:bg-zinc-800/40 rounded-2xl p-6 border border-[#DDE7E2] dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] dark:text-zinc-400">
                  ReVoltX Intelligence Assessment
                </span>
                <h3 className="text-sm font-bold text-[#10201B] dark:text-white mt-0.5">
                  RX Score: {battery.rxScore}/100
                </h3>
              </div>

              <div className="my-2">
                <RXScoreGauge score={battery.rxScore} size="md" showDetails={false} />
              </div>

              <div className="text-xs text-[#62756E] dark:text-zinc-400 space-y-1.5 pt-2 border-t border-[#DDE7E2] dark:border-zinc-800">
                <div className="flex justify-between">
                  <span>Warranty Coverage:</span>
                  <span className="font-semibold text-[#10201B] dark:text-zinc-200">{battery.warrantyPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nominal Capacity:</span>
                  <span className="font-semibold text-[#10201B] dark:text-zinc-200">
                    {battery.capacity} Ah ({((battery.capacity * (battery.nominalVoltage || 48)) / 1000).toFixed(1)} kWh)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Internal Impedance:</span>
                  <span className="font-mono text-[#137A58] dark:text-[#34D399] font-semibold">
                    Re: {battery.internalResistanceRe || '0.052'}Ω • Rct: {battery.chargeTransferRct || '0.078'}Ω
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action section */}
          <div className="mt-8 pt-6 border-t border-[#DDE7E2] dark:border-zinc-800">
            {purchased && deliveryInfo ? (
              <div className="p-6 rounded-3xl bg-[#DDF5EA] dark:bg-[#133325]/60 border border-[#BBEAD7] dark:border-[#1E4A35] space-y-4">
                <div className="text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-[#137A58] dark:text-[#34D399] mx-auto" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
                    Order Confirmed & Logistics Dispatched
                  </span>
                  <h3 className="text-xl font-bold text-[#10201B] dark:text-white">
                    You will receive your battery tomorrow!
                  </h3>
                  <p className="text-xs text-[#62756E] dark:text-zinc-300 max-w-md mx-auto">
                    Asset <strong className="text-[#10201B] dark:text-white font-mono">{battery.revoltXId}</strong> has been allocated to <strong>{deliveryInfo.customerName}</strong>. ReVoltX Logistics Van #02 is scheduled for doorstep installation.
                  </p>
                </div>

                {/* Delivery Receipt Card */}
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-[#BBEAD7] dark:border-zinc-700 text-xs space-y-2 max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DDE7E2] dark:border-zinc-800">
                    <span className="font-bold text-[#10201B] dark:text-white flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#137A58] dark:text-[#34D399]" /> Estimated Delivery:
                    </span>
                    <span className="font-bold text-[#137A58] dark:text-[#34D399]">{deliveryInfo.deliverySlot}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Recipient Name:</span>
                    <span className="font-bold text-[#10201B] dark:text-white">{deliveryInfo.customerName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Delivery Address:</span>
                    <span className="font-medium text-[#10201B] dark:text-white text-right">{deliveryInfo.address}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Tracking Code:</span>
                    <span className="font-mono font-bold text-[#0070F3]">{deliveryInfo.trackingCode}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Operations Dispatch ID:</span>
                    <span className="font-mono font-bold text-[#137A58] dark:text-[#34D399]">{deliveryInfo.serviceRequestId}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/internal/service-requests"
                    className="px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View in Operations Dispatch</span>
                  </Link>

                  <Link
                    href={`/battery/${battery.revoltXId}`}
                    className="px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-[#BBEAD7] dark:border-zinc-700 text-xs font-semibold text-[#10201B] dark:text-white hover:bg-[#F0F5F2] dark:hover:bg-zinc-800"
                  >
                    Inspect Passport
                  </Link>

                  <Link
                    href="/marketplace"
                    className="px-5 py-2.5 rounded-xl bg-[#F0F5F2] dark:bg-zinc-800 text-xs font-semibold text-[#10201B] dark:text-white hover:bg-[#DDE7E2] dark:hover:bg-zinc-700"
                  >
                    Return to Marketplace
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#62756E] dark:text-zinc-400">
                  <Truck className="w-4 h-4 text-[#137A58] dark:text-[#34D399]" />
                  <span>
                    Includes nationwide freight delivery & on-site certified installation
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/battery/${battery.revoltXId}`}
                    className="px-4 py-3 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 text-xs font-semibold hover:bg-[#F0F5F2] dark:hover:bg-zinc-800 text-[#10201B] dark:text-white transition-colors"
                  >
                    Inspect Passport
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutModal(true)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#137A58] dark:bg-[#21A879] text-white text-xs font-bold hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shadow-xs transition-colors cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Buy Battery & Receive Tomorrow (${listPrice.toLocaleString()})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Guest Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DDE7E2] dark:border-zinc-800 shadow-2xl relative my-8">
            <h3 className="text-xl font-bold text-[#10201B] dark:text-white">
              Order {battery.revoltXId}
            </h3>
            <p className="text-xs text-[#62756E] dark:text-zinc-400 mt-0.5">
              Enter your delivery details to schedule instant mobile dispatch.
            </p>

            {formError && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 text-xs font-semibold">
                {formError}
              </div>
            )}

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#10201B] dark:text-zinc-200 mb-1">
                  Full Name / Company Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-[#10201B] dark:text-zinc-100 placeholder-[#62756E] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#10201B] dark:text-zinc-200 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +1 (555) 438-9921"
                  value={buyerPhone}
                  onChange={e => setBuyerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-[#10201B] dark:text-zinc-100 placeholder-[#62756E] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#10201B] dark:text-zinc-200 mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 742 Industrial Parkway, Building C"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-[#10201B] dark:text-zinc-100 placeholder-[#62756E] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
              </div>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 hover:bg-[#F7FAF8] dark:hover:bg-zinc-800/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTradeIn}
                  onChange={e => setIncludeTradeIn(e.target.checked)}
                  className="w-4 h-4 text-[#137A58] rounded"
                />
                <div>
                  <span className="font-bold text-[#10201B] dark:text-white block">Include Battery Trade-In (-$1,850)</span>
                  <span className="text-[#62756E] dark:text-zinc-400">Trade in your old pack for an instant credit discount.</span>
                </div>
              </label>

              <div className="p-3 rounded-xl bg-[#F0F5F2] dark:bg-zinc-800 text-xs flex justify-between font-bold">
                <span className="text-[#10201B] dark:text-white">Estimated Due:</span>
                <span className="font-mono text-[#137A58] dark:text-[#34D399]">
                  ${netPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="px-4 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 text-xs font-semibold text-[#62756E] dark:text-zinc-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="px-6 py-2.5 rounded-xl bg-[#137A58] dark:bg-[#21A879] text-white text-xs font-bold hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65]"
              >
                Confirm & Dispatch Delivery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
