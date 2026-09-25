'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowRight, 
  BatteryMedium, 
  CheckCircle2, 
  Sparkles,
  QrCode,
  Truck,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  X,
  CreditCard,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';

export default function OwnerMarketplacePage() {
  const { batteries, getBattery, createServiceRequest, updateBattery, currentUser } = useReVoltX();
  const [search, setSearch] = useState('');
  const [chemistryFilter, setChemistryFilter] = useState('ALL');

  // Customer's current asset (Sarah Jenkins)
  const sarahBattery = getBattery('RX-2026-892738');
  const tradeInCredit = 1850;

  // Selected battery for checkout / delivery modal
  const [selectedBattery, setSelectedBattery] = useState<any | null>(null);
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Authorized Customer');
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow (10:00 AM - 1:00 PM)');
  const [deliveryAddress, setDeliveryAddress] = useState('742 Evergreen Terrace, Sector 4, Silicon District');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 392-8819');
  const [includeTradeIn, setIncludeTradeIn] = useState(true);
  const [purchaseSuccess, setPurchaseSuccess] = useState<any | null>(null);

  // Filter available replacement batteries (excluding Sarah's current battery so she doesn't re-buy her own degraded pack)
  const listings = batteries
    .filter(b => b.revoltXId !== 'RX-2026-892738')
    .filter(b => {
      const query = search.toLowerCase();
      const matchesSearch = 
        b.revoltXId.toLowerCase().includes(query) ||
        b.manufacturerName.toLowerCase().includes(query) ||
        b.chemistry.toLowerCase().includes(query) ||
        (b.nasaDatasetId && b.nasaDatasetId.toLowerCase().includes(query)) ||
        b.serialNumber.toLowerCase().includes(query) ||
        (b.vehicleModel && b.vehicleModel.toLowerCase().includes(query));

      const matchesChem = chemistryFilter === 'ALL' || b.chemistry === chemistryFilter;

      return matchesSearch && matchesChem;
    });

  const handleOpenBuyModal = (item: any) => {
    setSelectedBattery(item);
    setPurchaseSuccess(null);
  };

  const handleConfirmPurchase = () => {
    if (!selectedBattery) return;

    // 1. Update battery ownership in unified store
    updateBattery(
      selectedBattery.id,
      {
        ownerId: currentUser?.email || 'usr-cust',
        ownerName: customerName,
        status: 'Active',
        lifecycleStage: 'FIRST_LIFE'
      },
      'Purchased via ReVoltX Certified Marketplace',
      `Ownership transferred to ${customerName}. Delivery scheduled. Old battery trade-in initiated.`
    );

    // 2. Dispatch a service request to Operations Fleet Dispatch
    const trackingCode = `REV-DLV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq = createServiceRequest({
      batteryId: selectedBattery.revoltXId,
      customerName: customerName,
      phone: customerPhone,
      address: deliveryAddress,
      issue: `New Battery Purchase & Delivery: Pack ${selectedBattery.revoltXId} (${selectedBattery.chemistry}, ${selectedBattery.currentSOH}% SOH). Swap with trade-in asset RX-2026-892738. Delivery window: ${deliveryDate}. Tracking: ${trackingCode}.`
    });

    setPurchaseSuccess({
      trackingCode,
      serviceRequestId: newReq.id,
      battery: selectedBattery,
      deliveryDate,
      deliveryAddress,
      tradeInDiscount: includeTradeIn ? tradeInCredit : 0,
      netPrice: Math.max(0, (selectedBattery.marketPrice || 1800) - (includeTradeIn ? tradeInCredit : 0))
    });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Marketplace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] bg-[#DDF5EA] px-2.5 py-0.5 rounded-full border border-[#BBEAD7]">
              ReVoltX Certified Marketplace
            </span>
            <span className="text-[11px] text-[#62756E] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#137A58]" /> 100% NASA ARC Verified
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#10201B] mt-1">
            Certified Batteries for EV & Energy Storage
          </h1>
          <p className="text-xs text-[#62756E]">
            Direct from certified manufacturers and factory-refurbished cohorts with verified Digital Battery Passports.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-[#137A58] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7E2]">
          {listings.length} Certified Packs Available
        </div>
      </div>

      {/* Trade-In Assessment Card for Sarah Jenkins */}
      {sarahBattery && (
        <div className="bg-gradient-to-r from-[#DDF5EA] via-[#EDF9F4] to-white rounded-3xl p-5 border border-[#BBEAD7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#137A58] text-white flex items-center justify-center shrink-0 mt-0.5">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#137A58] uppercase tracking-wider">
                  Active Trade-In Valuation
                </span>
                <span className="font-mono text-xs font-bold text-[#10201B]">
                  {sarahBattery.revoltXId}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#10201B] mt-0.5">
                Your Current Pack Health: {sarahBattery.currentSOH}% SOH ({sarahBattery.chemistry})
              </h3>
              <p className="text-xs text-[#62756E] mt-0.5">
                Trade in your degraded pack for an instant <strong>${tradeInCredit.toLocaleString()} ReVoltX Credit</strong> applied at doorstep installation.
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-[#BBEAD7] sm:pl-6 shrink-0">
            <span className="text-[11px] text-[#62756E] block font-medium">Verified Trade-In Credit</span>
            <span className="text-2xl font-bold font-mono text-[#137A58]">
              -${tradeInCredit.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#DDE7E2] shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#62756E]" />
          <input
            type="text"
            placeholder="Search by battery ID (e.g. RX-2025-449182), NASA dataset, chemistry..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#62756E]" />
          <select
            value={chemistryFilter}
            onChange={e => setChemistryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium text-[#10201B] focus:bg-white focus:outline-none"
          >
            <option value="ALL">All Chemistries</option>
            <option value="LFP">LFP (Lithium Iron Phosphate)</option>
            <option value="NMC">NMC (Nickel Manganese)</option>
          </select>
        </div>
      </div>

      {/* Certified Battery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map(item => {
          const listPrice = item.marketPrice || 1800;
          const netWithTradeIn = Math.max(0, listPrice - tradeInCredit);
          const tradeInSurplus = tradeInCredit > listPrice ? tradeInCredit - listPrice : 0;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col justify-between hover:border-[#137A58] transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono font-bold text-base text-[#10201B] group-hover:text-[#137A58]">
                        {item.revoltXId}
                      </span>
                      {item.nasaDatasetId && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0070F3] bg-[#EBF4FF] px-2 py-0.5 rounded-full border border-[#CCE3FD]">
                          NASA ARC {item.nasaDatasetId}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#137A58] bg-[#DDF5EA] px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Certified
                      </span>
                    </div>
                    <p className="text-xs text-[#62756E] mt-1 font-medium">
                      {item.manufacturerName} • {item.packConfiguration}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#62756E] block font-medium">List Price</span>
                    <span className="font-mono text-lg font-bold text-[#10201B]">
                      ${listPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Specs & Health Meter */}
                <div className="mt-5 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#62756E]">Chemistry</span>
                    <p className="text-xs font-bold text-[#10201B] mt-0.5">{item.chemistry}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#62756E]">Capacity</span>
                    <p className="text-xs font-bold font-mono text-[#10201B] mt-0.5">
                      {item.capacity} Ah ({((item.capacity * (item.nominalVoltage || 48)) / 1000).toFixed(1)} kWh)
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#62756E]">RX Score</span>
                    <p className="text-xs font-bold font-mono text-[#137A58] mt-0.5">{item.rxScore}/100</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-[#62756E]">Verified State of Health:</span>
                  <span className="font-bold font-mono text-[#137A58]">{item.currentSOH}% SOH</span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-[#62756E]">Warranty Coverage:</span>
                  <span className="font-medium text-[#10201B]">{item.warrantyPeriod}</span>
                </div>

                {/* Trade-In Price Calculation */}
                <div className="mt-3 p-2.5 rounded-xl bg-[#DDF5EA]/50 border border-[#BBEAD7] flex items-center justify-between text-xs">
                  <span className="text-[#137A58] font-medium flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> With Pack Trade-In:
                  </span>
                  <span className="font-mono font-bold text-[#10201B]">
                    {tradeInSurplus > 0 ? (
                      <span className="text-[#137A58]">$0 (+${tradeInSurplus.toLocaleString()} Refund)</span>
                    ) : netWithTradeIn === 0 ? (
                      <span className="text-[#137A58]">$0 (100% Covered)</span>
                    ) : (
                      <span>${netWithTradeIn.toLocaleString()} Net</span>
                    )}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 pt-4 border-t border-[#DDE7E2] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenBuyModal(item)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#137A58] text-white text-xs font-bold text-center hover:bg-[#0E5B42] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Buy & Schedule Delivery</span>
                </button>

                <Link
                  href={`/owner/marketplace/${item.revoltXId}`}
                  className="py-2.5 px-3 rounded-xl border border-[#DDE7E2] text-xs font-semibold text-[#10201B] hover:bg-[#F0F5F2] transition-colors"
                >
                  Details
                </Link>

                <Link
                  href={`/battery/${item.revoltXId}`}
                  className="p-2.5 rounded-xl border border-[#DDE7E2] text-[#62756E] hover:text-[#10201B] hover:bg-[#F0F5F2] transition-colors"
                  title="Inspect Digital Battery Passport"
                >
                  <QrCode className="w-4 h-4 text-[#137A58]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Delivery & Purchase Modal */}
      {selectedBattery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#DDE7E2] shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedBattery(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#62756E] hover:text-[#10201B] hover:bg-[#F0F5F2]"
            >
              <X className="w-5 h-5" />
            </button>

            {purchaseSuccess ? (
              /* Success & Delivery Confirmation Screen */
              <div className="space-y-4 text-center py-2">
                <div className="w-12 h-12 rounded-full bg-[#DDF5EA] text-[#137A58] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
                    Order Confirmed & Delivery Scheduled
                  </span>
                  <h3 className="text-xl font-bold text-[#10201B]">
                    You will receive your battery tomorrow!
                  </h3>
                  <p className="text-xs text-[#62756E] max-w-sm mx-auto">
                    Asset <strong className="font-mono text-[#10201B]">{purchaseSuccess.battery.revoltXId}</strong> has been transferred to your ownership profile. ReVoltX Logistics Van #02 is scheduled for doorstep installation.
                  </p>
                </div>

                {/* Delivery Logistics Summary Card */}
                <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-xs text-left space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DDE7E2]">
                    <span className="font-semibold text-[#10201B] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#137A58]" /> Estimated Delivery:
                    </span>
                    <span className="font-bold text-[#137A58]">{purchaseSuccess.deliveryDate}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Assigned Mobile Van:</span>
                    <span className="font-medium text-[#10201B]">ReVoltX Van #02 (Tech: Marcus Vance)</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Delivery Address:</span>
                    <span className="font-medium text-[#10201B] text-right max-w-xs">{purchaseSuccess.deliveryAddress}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Tracking Code:</span>
                    <span className="font-mono font-bold text-[#0070F3]">{purchaseSuccess.trackingCode}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Service Dispatch ID:</span>
                    <span className="font-mono font-bold text-[#137A58]">{purchaseSuccess.serviceRequestId}</span>
                  </div>

                  <div className="pt-2 border-t border-[#DDE7E2] flex justify-between font-bold">
                    <span className="text-[#10201B]">Net Amount Paid:</span>
                    <span className="font-mono text-[#137A58]">${purchaseSuccess.netPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Multi-Stage Delivery Tracker */}
                <div className="p-4 rounded-2xl bg-[#F0F5F2] border border-[#DDE7E2] text-left space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#62756E] block">
                    Live Delivery Status
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-[#137A58]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="font-medium">1. Order Placed & Trade-in Credit Applied</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#137A58]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="font-medium">2. Digital Passport Transferred to Registered Owner</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#137A58]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="font-medium">3. Calibrated & Loaded onto Mobile Van #02</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0070F3] font-bold">
                      <Truck className="w-4 h-4 shrink-0 animate-bounce" />
                      <span>4. Dispatched: En Route for Scheduled Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#62756E]">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>5. Doorstep Handover & Old Pack Decoupling</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <Link
                    href="/internal/service-requests"
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] text-center"
                  >
                    View in Operations Dispatch
                  </Link>

                  <Link
                    href={`/battery/${purchaseSuccess.battery.revoltXId}`}
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-[#DDE7E2] text-xs font-semibold hover:bg-[#F7FAF8] text-[#10201B] text-center"
                  >
                    Inspect Passport
                  </Link>

                  <Link
                    href="/owner"
                    className="w-full sm:flex-initial py-2.5 px-4 rounded-xl bg-zinc-100 text-xs font-semibold text-zinc-800 text-center"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              /* Order Checkout Form */
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
                    Order Confirmation & Delivery
                  </span>
                  <h3 className="text-xl font-bold text-[#10201B] mt-0.5">
                    Buy {selectedBattery.revoltXId}
                  </h3>
                  <p className="text-xs text-[#62756E]">
                    Chemistry: {selectedBattery.chemistry} • SOH: {selectedBattery.currentSOH}% • {selectedBattery.packConfiguration}
                  </p>
                </div>

                {/* Pricing Breakdown */}
                <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Pack Price:</span>
                    <span className="font-mono font-bold text-[#10201B]">
                      ${(selectedBattery.marketPrice || 1800).toLocaleString()}
                    </span>
                  </div>

                  {includeTradeIn && (
                    <div className="flex justify-between text-[#137A58]">
                      <span>Old Battery Trade-In (RX-2026-892738):</span>
                      <span className="font-mono font-bold">-${tradeInCredit.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#62756E]">
                    <span>Freight Delivery & Mobile Van Installation:</span>
                    <span className="font-semibold text-[#137A58]">Free (Included)</span>
                  </div>

                  <div className="pt-2 border-t border-[#DDE7E2] flex justify-between font-bold text-sm">
                    <span className="text-[#10201B]">Estimated Total:</span>
                    <span className="font-mono text-[#137A58]">
                      ${Math.max(0, (selectedBattery.marketPrice || 1800) - (includeTradeIn ? tradeInCredit : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Delivery Information Fields */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#10201B] mb-1">
                      Recipient / Customer Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-white text-xs font-semibold text-[#10201B] focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10201B] mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-white text-xs text-[#10201B] focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#10201B] mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-white text-xs text-[#10201B] focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#10201B] mb-1">
                        Delivery Slot
                      </label>
                      <select
                        value={deliveryDate}
                        onChange={e => setDeliveryDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-white text-xs font-medium text-[#10201B] focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                      >
                        <option value="Tomorrow (10:00 AM - 1:00 PM)">Tomorrow (10:00 AM - 1:00 PM)</option>
                        <option value="Tomorrow (2:00 PM - 5:00 PM)">Tomorrow (2:00 PM - 5:00 PM)</option>
                        <option value="Day After Tomorrow (9:00 AM - 12:00 PM)">Day After Tomorrow (9:00 AM)</option>
                      </select>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#DDF5EA]/60 border border-[#BBEAD7] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTradeIn}
                      onChange={e => setIncludeTradeIn(e.target.checked)}
                      className="w-4 h-4 text-[#137A58] rounded-sm accent-[#137A58]"
                    />
                    <span className="text-xs text-[#10201B]">
                      Apply <strong>${tradeInCredit.toLocaleString()} trade-in credit</strong> and surrender degraded battery (RX-2026-892738) upon installation.
                    </span>
                  </label>
                </div>

                <div className="pt-3 border-t border-[#DDE7E2] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedBattery(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#DDE7E2] text-xs font-semibold text-[#62756E] hover:bg-[#F7FAF8]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmPurchase}
                    className="flex-1 py-2.5 px-6 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Confirm Order & Receive Tomorrow</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
