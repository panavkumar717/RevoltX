'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Zap, 
  Truck, 
  QrCode, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  X, 
  ShoppingBag, 
  RefreshCw, 
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
  MapPin,
  Phone,
  User,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { PublicNavbar } from '../../components/shared/PublicNavbar';
import { BatteryStatusBadge } from '../../components/ui/BatteryStatusBadge';

export default function PublicMarketplacePage() {
  const { batteries, updateBattery, createServiceRequest } = useReVoltX();

  const [search, setSearch] = useState('');
  const [chemistryFilter, setChemistryFilter] = useState('ALL');
  const [sohFilter, setSohFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'soh-desc' | 'rx-desc'>('soh-desc');

  // Order / Checkout Modal State
  const [selectedBattery, setSelectedBattery] = useState<any | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow (10:00 AM - 1:00 PM)');
  const [includeTradeIn, setIncludeTradeIn] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<any | null>(null);
  const [formError, setFormError] = useState('');

  const tradeInEstimate = 1850;

  // Filter listings
  const filteredListings = batteries
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
      
      let matchesSOH = true;
      if (sohFilter === 'PRIME') matchesSOH = b.currentSOH >= 85;
      else if (sohFilter === 'SECOND_LIFE') matchesSOH = b.currentSOH >= 65 && b.currentSOH < 85;
      else if (sohFilter === 'STORAGE') matchesSOH = b.currentSOH < 65;

      return matchesSearch && matchesChem && matchesSOH;
    })
    .sort((a, b) => {
      const priceA = a.marketPrice || 1800;
      const priceB = b.marketPrice || 1800;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'soh-desc') return b.currentSOH - a.currentSOH;
      if (sortBy === 'rx-desc') return b.rxScore - a.rxScore;
      return 0;
    });

  const handleOpenBuyModal = (item: any) => {
    setSelectedBattery(item);
    setPurchaseSuccess(null);
    setFormError('');
  };

  const handleConfirmPurchase = () => {
    if (!selectedBattery) return;

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
    const tradeInDiscount = includeTradeIn ? tradeInEstimate : 0;
    const finalPrice = Math.max(0, (selectedBattery.marketPrice || 1800) - tradeInDiscount);

    // 1. Update battery ownership in unified store
    updateBattery(
      selectedBattery.id,
      {
        ownerName: customerDisplay,
        status: 'Active',
        lifecycleStage: 'FIRST_LIFE'
      },
      'Purchased via ReVoltX Public Marketplace',
      `Ownership registered to ${customerDisplay}. Delivery scheduled to ${deliveryAddress}.`
    );

    // 2. Dispatch a service request to Operations Fleet Dispatch
    const trackingCode = `REV-DLV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq = createServiceRequest({
      batteryId: selectedBattery.revoltXId,
      customerName: customerDisplay,
      phone: buyerPhone || '+1 (555) 019-2834',
      address: deliveryAddress,
      issue: `Public Marketplace Order: Pack ${selectedBattery.revoltXId} (${selectedBattery.chemistry}, ${selectedBattery.currentSOH}% SOH). Delivery to ${customerDisplay}. Window: ${deliveryDate}. Trade-in: ${includeTradeIn ? 'Yes ($-1,850 applied)' : 'No'}. Tracking: ${trackingCode}.`
    });

    setPurchaseSuccess({
      trackingCode,
      serviceRequestId: newReq.id,
      battery: selectedBattery,
      customerName: customerDisplay,
      deliveryDate,
      deliveryAddress,
      tradeInDiscount,
      netPrice: finalPrice
    });

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
      {/* Universal Public Top Navigation */}
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] border border-[#BBEAD7] dark:border-[#1E4A35] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Public Certified Marketplace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#137A58] dark:bg-[#34D399]" />
            <span>Open Access (No Login Required)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#10201B] dark:text-white">
            Certified Batteries for EV & Energy Storage
          </h1>
          
          <p className="text-sm sm:text-base text-[#62756E] dark:text-zinc-400">
            Source factory-refurbished cohorts and verified secondary battery packs with transparent health diagnostics, real NASA ARC degradation curves, and EU Digital Battery Passports.
          </p>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-zinc-900 border border-[#DDE7E2] dark:border-zinc-800 text-xs font-medium text-[#10201B] dark:text-zinc-300 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
              100% NASA ARC Verified
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-zinc-900 border border-[#DDE7E2] dark:border-zinc-800 text-xs font-medium text-[#10201B] dark:text-zinc-300 shadow-2xs">
              <QrCode className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
              EU Passport Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-zinc-900 border border-[#DDE7E2] dark:border-zinc-800 text-xs font-medium text-[#10201B] dark:text-zinc-300 shadow-2xs">
              <Truck className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
              Doorstep Mobile Installation
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-zinc-900 border border-[#DDE7E2] dark:border-zinc-800 text-xs font-medium text-[#137A58] dark:text-[#34D399] shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5" />
              Old Pack Trade-In Available
            </span>
          </div>
        </div>

        {/* Circular Exchange Banner */}
        <div className="bg-gradient-to-r from-[#DDF5EA] via-[#EDF9F4] to-white dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-900/50 rounded-3xl p-5 sm:p-6 border border-[#BBEAD7] dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#137A58] text-white flex items-center justify-center shrink-0 shadow-xs">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
                  Circular Battery Exchange Program
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#137A58]/10 text-[#137A58] dark:text-[#34D399]">
                  Instant Credit
                </span>
              </div>
              <h3 className="text-base font-bold text-[#10201B] dark:text-white mt-0.5">
                Have a degraded or retired battery pack?
              </h3>
              <p className="text-xs text-[#62756E] dark:text-zinc-400 mt-0.5 max-w-xl">
                Trade in any EV or stationary storage battery to receive up to <strong>$1,850 instant credit</strong> applied directly to any certified pack in this marketplace. ReVoltX technicians handle removal and recycling.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end md:border-l md:border-[#BBEAD7] dark:md:border-zinc-800 md:pl-6 shrink-0 gap-4">
            <div>
              <span className="text-[11px] text-[#62756E] dark:text-zinc-400 block font-medium">Potential Credit Value</span>
              <span className="text-2xl font-bold font-mono text-[#137A58] dark:text-[#34D399]">
                Up to $1,850
              </span>
            </div>
            <Link
              href="/circularity/recycling"
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-[#DDE7E2] dark:border-zinc-700 text-[#10201B] dark:text-zinc-200 hover:bg-[#F0F5F2] dark:hover:bg-zinc-700 transition-colors inline-flex items-center gap-1"
            >
              <span>Recycle Specs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-[#DDE7E2] dark:border-zinc-800 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#62756E] dark:text-zinc-400" />
              <input
                type="text"
                placeholder="Search by battery ID (e.g. RX-2025-449182), chemistry, NASA dataset..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-[#F7FAF8] dark:bg-zinc-800/60 text-xs sm:text-sm text-[#10201B] dark:text-zinc-100 placeholder-[#62756E] dark:placeholder-zinc-500 focus:bg-white dark:focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
              />
            </div>

            {/* Chemistry Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={chemistryFilter}
                onChange={e => setChemistryFilter(e.target.value)}
                className="w-full md:w-auto px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-[#F7FAF8] dark:bg-zinc-800 text-xs sm:text-sm font-medium text-[#10201B] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
              >
                <option value="ALL">All Chemistries</option>
                <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                <option value="NMC">NMC (Nickel Manganese Cobalt)</option>
              </select>

              {/* SOH Health Filter */}
              <select
                value={sohFilter}
                onChange={e => setSohFilter(e.target.value)}
                className="w-full md:w-auto px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-[#F7FAF8] dark:bg-zinc-800 text-xs sm:text-sm font-medium text-[#10201B] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
              >
                <option value="ALL">All Health Tiers</option>
                <option value="PRIME">Prime Mobile (SOH &ge; 85%)</option>
                <option value="SECOND_LIFE">Second-Life Ready (65-84%)</option>
                <option value="STORAGE">Energy Storage Tier (&lt; 65%)</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full md:w-auto px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-[#F7FAF8] dark:bg-zinc-800 text-xs sm:text-sm font-medium text-[#10201B] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
              >
                <option value="soh-desc">Health: High to Low</option>
                <option value="rx-desc">RX Score: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#62756E] dark:text-zinc-400 pt-1 border-t border-[#DDE7E2]/60 dark:border-zinc-800">
            <span>Showing <strong>{filteredListings.length}</strong> certified battery packs</span>
            <span>Real-time availability synced with verified inventory</span>
          </div>
        </div>

        {/* Battery Cards Grid */}
        {filteredListings.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-[#DDE7E2] dark:border-zinc-800">
            <ShoppingBag className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
            <h3 className="font-bold text-base text-[#10201B] dark:text-white">No batteries match your criteria</h3>
            <p className="text-xs text-[#62756E] dark:text-zinc-400 mt-1">Try resetting your filters or search keywords.</p>
            <button
              onClick={() => { setSearch(''); setChemistryFilter('ALL'); setSohFilter('ALL'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map(item => {
              const listPrice = item.marketPrice || 1800;
              const priceWithTradeIn = Math.max(0, listPrice - tradeInEstimate);

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-[#DDE7E2] dark:border-zinc-800 hover:border-[#137A58]/50 dark:hover:border-[#34D399]/50 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-mono text-sm sm:text-base font-bold text-[#10201B] dark:text-white">
                            {item.revoltXId}
                          </span>
                          {item.nasaDatasetId && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#EBF4FF] dark:bg-blue-950/60 text-[#0070F3] dark:text-blue-400 border border-[#CCE3FD] dark:border-blue-900">
                              NASA ARC {item.nasaDatasetId}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] border border-[#BBEAD7] dark:border-[#1E4A35]">
                            Certified
                          </span>
                        </div>

                        <p className="text-xs text-[#62756E] dark:text-zinc-400">
                          {item.manufacturerName} • {item.packConfiguration}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold text-[#62756E] dark:text-zinc-500 block">List Price</span>
                        <span className="text-2xl font-bold font-mono text-[#10201B] dark:text-white">
                          ${listPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="mt-5 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F7FAF8] dark:bg-zinc-800/50 border border-[#DDE7E2] dark:border-zinc-800 text-center">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#62756E] dark:text-zinc-400">Chemistry</span>
                        <p className="text-xs font-bold text-[#10201B] dark:text-white mt-0.5">{item.chemistry}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#62756E] dark:text-zinc-400">Capacity</span>
                        <p className="text-xs font-bold font-mono text-[#10201B] dark:text-white mt-0.5">
                          {item.capacity} Ah ({((item.capacity * (item.nominalVoltage || 48)) / 1000).toFixed(1)} kWh)
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#62756E] dark:text-zinc-400">RX Score</span>
                        <p className="text-xs font-bold font-mono text-[#137A58] dark:text-[#34D399] mt-0.5">
                          {item.rxScore}/100
                        </p>
                      </div>
                    </div>

                    {/* Verified Metrics */}
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#62756E] dark:text-zinc-400">Verified State of Health:</span>
                        <span className="font-bold font-mono text-[#137A58] dark:text-[#34D399]">
                          {item.currentSOH}% SOH
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#62756E] dark:text-zinc-400">Warranty Coverage:</span>
                        <span className="font-medium text-[#10201B] dark:text-zinc-200">{item.warrantyPeriod}</span>
                      </div>

                      {/* Trade-In Exchange Highlight */}
                      <div className="p-2.5 rounded-xl bg-[#DDF5EA]/60 dark:bg-[#133325]/40 border border-[#BBEAD7] dark:border-[#1E4A35] flex items-center justify-between text-xs">
                        <span className="text-[#137A58] dark:text-[#34D399] font-medium flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          <span>With Pack Trade-In:</span>
                        </span>
                        <span className="font-mono font-bold text-[#10201B] dark:text-white">
                          {priceWithTradeIn === 0 ? (
                            <span className="text-[#137A58] dark:text-[#34D399]">$0 (Fully Covered)</span>
                          ) : (
                            <span>${priceWithTradeIn.toLocaleString()} Net</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-[#DDE7E2] dark:border-zinc-800 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenBuyModal(item)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#137A58] dark:bg-[#21A879] text-white text-xs font-bold text-center hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Buy & Schedule Delivery</span>
                    </button>

                    <Link
                      href={`/marketplace/${item.revoltXId}`}
                      className="py-2.5 px-3 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 text-xs font-semibold text-[#10201B] dark:text-zinc-200 hover:bg-[#F0F5F2] dark:hover:bg-zinc-800 transition-colors"
                    >
                      Specs
                    </Link>

                    <Link
                      href={`/battery/${item.revoltXId}`}
                      className="p-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 text-[#62756E] dark:text-zinc-400 hover:text-[#10201B] dark:hover:text-white hover:bg-[#F0F5F2] dark:hover:bg-zinc-800 transition-colors"
                      title="Inspect Digital Battery Passport"
                    >
                      <QrCode className="w-4 h-4 text-[#137A58] dark:text-[#34D399]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Public Checkout & Delivery Scheduling Modal */}
      {selectedBattery && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#DDE7E2] dark:border-zinc-800 shadow-2xl relative my-8">
            <button
              onClick={() => { setSelectedBattery(null); setPurchaseSuccess(null); }}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#62756E] dark:text-zinc-400 hover:bg-[#F0F5F2] dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {purchaseSuccess ? (
              /* Success / Dispatched Confirmation Screen */
              <div className="space-y-5 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
                    Order Confirmed & Delivery Scheduled
                  </span>
                  <h3 className="text-2xl font-bold text-[#10201B] dark:text-white mt-1">
                    You will receive your battery tomorrow!
                  </h3>
                  <p className="text-xs text-[#62756E] dark:text-zinc-400 mt-1">
                    Pack <strong className="font-mono text-[#10201B] dark:text-white">{purchaseSuccess.battery.revoltXId}</strong> is allocated to <strong>{purchaseSuccess.customerName}</strong>. Mobile Logistics Van #02 is dispatched.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-zinc-800/60 border border-[#DDE7E2] dark:border-zinc-700 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Recipient Name:</span>
                    <span className="font-bold text-[#10201B] dark:text-white">{purchaseSuccess.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Tracking Code:</span>
                    <span className="font-mono font-bold text-[#0070F3]">{purchaseSuccess.trackingCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Scheduled Window:</span>
                    <span className="font-medium text-[#10201B] dark:text-white">{purchaseSuccess.deliveryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Delivery Address:</span>
                    <span className="font-medium text-[#10201B] dark:text-white text-right max-w-xs">{purchaseSuccess.deliveryAddress}</span>
                  </div>
                  <div className="pt-2 border-t border-[#DDE7E2] dark:border-zinc-700 flex justify-between font-bold">
                    <span className="text-[#10201B] dark:text-white">Amount Paid:</span>
                    <span className="font-mono text-[#137A58] dark:text-[#34D399]">${purchaseSuccess.netPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Live Delivery Status Tracker */}
                <div className="p-4 rounded-2xl bg-[#F0F5F2] dark:bg-zinc-800/40 border border-[#DDE7E2] dark:border-zinc-700 text-left space-y-2 text-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#62756E] dark:text-zinc-400 block">
                    Live Dispatch Timeline
                  </span>
                  <div className="flex items-center gap-2 text-[#137A58] dark:text-[#34D399]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>1. Order Placed & Asset Reserved</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#137A58] dark:text-[#34D399]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>2. Digital Battery Passport Minted to Buyer</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0070F3] font-bold">
                    <Truck className="w-4 h-4 shrink-0 animate-bounce" />
                    <span>3. Calibrated & Dispatched on Logistics Van #02</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#62756E] dark:text-zinc-500">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>4. Doorstep Installation & Old Pack Recovery</span>
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
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 text-xs font-semibold hover:bg-[#F7FAF8] dark:hover:bg-zinc-800 text-[#10201B] dark:text-white text-center"
                  >
                    Inspect Passport
                  </Link>
                </div>
              </div>
            ) : (
              /* Public Order Form */
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399]">
                    Instant Order & Scheduled Delivery
                  </span>
                  <h3 className="text-xl font-bold text-[#10201B] dark:text-white mt-0.5">
                    Order Pack {selectedBattery.revoltXId}
                  </h3>
                  <p className="text-xs text-[#62756E] dark:text-zinc-400">
                    Chemistry: {selectedBattery.chemistry} • SOH: {selectedBattery.currentSOH}% • {selectedBattery.packConfiguration}
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-[#F7FAF8] dark:bg-zinc-800/50 border border-[#DDE7E2] dark:border-zinc-700 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#62756E] dark:text-zinc-400">Pack List Price:</span>
                    <span className="font-mono font-bold text-[#10201B] dark:text-white">
                      ${(selectedBattery.marketPrice || 1800).toLocaleString()}
                    </span>
                  </div>

                  {includeTradeIn && (
                    <div className="flex justify-between text-[#137A58] dark:text-[#34D399]">
                      <span>Battery Trade-in Credit Applied:</span>
                      <span className="font-mono font-bold">-${tradeInEstimate.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#62756E] dark:text-zinc-400">
                    <span>Doorstep Freight & Technician Installation:</span>
                    <span className="font-semibold text-[#137A58] dark:text-[#34D399]">Free (Included)</span>
                  </div>

                  <div className="pt-2 border-t border-[#DDE7E2] dark:border-zinc-700 flex justify-between font-bold text-sm">
                    <span className="text-[#10201B] dark:text-white">Estimated Total:</span>
                    <span className="font-mono text-[#137A58] dark:text-[#34D399]">
                      ${Math.max(0, (selectedBattery.marketPrice || 1800) - (includeTradeIn ? tradeInEstimate : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Trade In Toggle */}
                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 hover:bg-[#F7FAF8] dark:hover:bg-zinc-800/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTradeIn}
                    onChange={e => setIncludeTradeIn(e.target.checked)}
                    className="w-4 h-4 text-[#137A58] rounded border-zinc-300 focus:ring-[#137A58]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#10201B] dark:text-white block">
                      Trade in an existing EV / Storage Battery (Save $1,850)
                    </span>
                    <span className="text-[#62756E] dark:text-zinc-400">
                      Our technician will decouple and safely haul away your old battery upon delivery.
                    </span>
                  </div>
                </label>

                {/* Error message */}
                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                {/* Guest Buyer Input Fields */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#10201B] dark:text-zinc-200 mb-1">
                      Full Name / Company Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan / Apex Logistics"
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-[#10201B] dark:text-zinc-100 placeholder-[#62756E] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#10201B] dark:text-zinc-200 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. alex@example.com"
                        value={buyerEmail}
                        onChange={e => setBuyerEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-[#10201B] dark:text-zinc-100 placeholder-[#62756E] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#10201B] dark:text-zinc-200 mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 (555) 234-8890"
                        value={buyerPhone}
                        onChange={e => setBuyerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-[#10201B] dark:text-zinc-100 placeholder-[#62756E] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10201B] dark:text-zinc-200 mb-1">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 520 Innovation Blvd, Bay 4, Austin, TX"
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-[#10201B] dark:text-zinc-100 placeholder-[#62756E] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10201B] dark:text-zinc-200 mb-1">
                      Preferred Delivery Window
                    </label>
                    <select
                      value={deliveryDate}
                      onChange={e => setDeliveryDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-[#10201B] dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                    >
                      <option value="Tomorrow (10:00 AM - 1:00 PM)">Tomorrow (10:00 AM - 1:00 PM)</option>
                      <option value="Tomorrow (2:00 PM - 5:00 PM)">Tomorrow (2:00 PM - 5:00 PM)</option>
                      <option value="In 2 Days (Morning Slot)">In 2 Days (Morning Slot)</option>
                      <option value="Custom Enterprise Schedule">Custom Enterprise Schedule</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedBattery(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#DDE7E2] dark:border-zinc-700 text-xs font-semibold text-[#62756E] dark:text-zinc-300 hover:bg-[#F0F5F2] dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmPurchase}
                    className="px-6 py-2.5 rounded-xl bg-[#137A58] dark:bg-[#21A879] text-white text-xs font-bold hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shadow-xs cursor-pointer"
                  >
                    Confirm Order & Dispatch
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
