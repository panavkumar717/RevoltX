'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Zap, 
  ArrowLeft, 
  QrCode, 
  CheckCircle2, 
  Calendar, 
  Cpu, 
  Activity, 
  Download, 
  Share2, 
  ExternalLink,
  Lock,
  Building,
  AlertCircle
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { RXScoreGauge } from '../../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../../components/ui/HealthGauge';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';
import { LifecycleTimeline } from '../../../components/ui/LifecycleTimeline';
import { QRCodeWidget } from '../../../components/ui/QRCodeWidget';
import { PublicFooter } from '@/components/shared/PublicFooter';

export default function BatteryPassportPage({
  params
}: {
  params: Promise<{ batteryId: string }>;
}) {
  const resolvedParams = use(params);
  const { getBattery } = useReVoltX();
  const battery = getBattery(resolvedParams.batteryId) || getBattery('RX-2026-892738');

  if (!battery) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] flex flex-col items-center justify-center p-4">
        <div className="p-6 bg-white rounded-2xl border border-[#DDE7E2] text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-[#D89A24] mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#10201B]">Battery Passport Not Found</h2>
          <p className="text-xs text-[#62756E] mt-1">
            No digital passport registered for identifier: {resolvedParams.batteryId}.
          </p>
          <Link
            href="/battery/RX-2026-892738"
            className="mt-4 inline-block px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-semibold"
          >
            View Star Battery RX-2026-892738
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col selection:bg-[#DDF5EA] selection:text-[#137A58]">
      {/* Top Mobile-First App Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE7E2] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#62756E] hover:text-[#10201B]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-md bg-[#137A58] flex items-center justify-center text-white">
              <Zap className="h-3.5 w-3.5 fill-current text-[#C9EF72]" />
            </div>
            <span className="font-bold text-sm text-[#10201B]">
              REVolt<span className="text-[#137A58]">X</span>
            </span>
            <span className="text-[10px] text-[#62756E] font-medium hidden sm:inline">Passport</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7]">
              <ShieldCheck className="w-3 h-3" /> Verified
            </span>
          </div>
        </div>
      </header>

      {/* Main Passport Content (Mobile-Optimized) */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Passport Identity Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm relative overflow-hidden">
          {/* Subtle watermark background */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Zap className="w-48 h-48 text-[#137A58]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#10201B] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                  Digital Battery Passport
                </span>
                <BatteryStatusBadge stage={battery.lifecycleStage} size="sm" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#10201B] tracking-tight">
                {battery.revoltXId}
              </h1>

              <p className="text-xs text-[#62756E] mt-1 font-mono">
                Serial: {battery.serialNumber} • Chemistry: {battery.chemistry} • Pack: {battery.packConfiguration}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="inline-block p-2 rounded-xl bg-[#F0F5F2] border border-[#DDE7E2]">
                <QrCode className="w-8 h-8 text-[#137A58]" />
              </span>
            </div>
          </div>

          {/* Quick specs grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-[#DDE7E2]">
            <div className="p-2.5 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Manufacturer</span>
              <p className="text-xs font-bold text-[#10201B] mt-0.5 truncate">{battery.manufacturerName}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Nominal Capacity</span>
              <p className="text-xs font-bold font-mono text-[#10201B] mt-0.5">{battery.capacity} Ah ({((battery.capacity * battery.nominalVoltage) / 1000).toFixed(1)} kWh)</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Manufacture Date</span>
              <p className="text-xs font-bold font-mono text-[#10201B] mt-0.5">{battery.manufactureDate}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Voltage Standard</span>
              <p className="text-xs font-bold font-mono text-[#10201B] mt-0.5">{battery.nominalVoltage} V Nominal</p>
            </div>
          </div>
        </div>

        {/* Health & RX Intelligence Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#DDE7E2] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
                ReVoltX Battery Intelligence Score
              </span>
              <h3 className="text-sm font-bold text-[#10201B] mt-0.5">
                AI Condition & Safety Evaluation
              </h3>
            </div>

            <div className="my-3">
              <RXScoreGauge score={battery.rxScore} size="md" showDetails={true} />
            </div>

            <div className="p-2.5 rounded-xl bg-[#F0F5F2] border border-[#DDE7E2] text-xs text-[#62756E]">
              <strong className="text-[#10201B]">Recommendation: </strong>
              {battery.recommendation || 'Standard operational parameters maintained.'}
            </div>
          </div>

          <div className="space-y-4">
            <HealthGauge
              soh={battery.currentSOH}
              soc={battery.soc}
              rul={battery.rul}
              temperature={battery.temperature}
              initialSOH={battery.initialSOH}
            />

            <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2] shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
                Operational Provenance
              </span>
              <div className="flex justify-between text-xs py-1 border-b border-[#DDE7E2]">
                <span className="text-[#62756E]">Total Duty Cycles</span>
                <span className="font-mono font-bold text-[#10201B]">{battery.cycleCount} cycles</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-[#DDE7E2]">
                <span className="text-[#62756E]">First-Life Duty</span>
                <span className="font-semibold text-[#10201B]">{battery.vehicleModel || 'Electric Mobility'}</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-[#62756E]">EU Passport Hash</span>
                <span className="font-mono text-[11px] text-[#137A58]">0x8f4d...391e (Verified)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Lifecycle Timeline */}
        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
                Persistent Lifecycle History
              </span>
              <h3 className="text-base font-bold text-[#10201B]">
                Continuous Chain of Custody
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#137A58] bg-[#DDF5EA] px-2.5 py-1 rounded-full border border-[#BBEAD7]">
              {battery.lifecycleEvents.length} Events Logged
            </span>
          </div>

          <LifecycleTimeline
            currentStage={battery.lifecycleStage}
            events={battery.lifecycleEvents}
            orientation="vertical"
            showDetails={true}
          />
        </div>

        {/* Service & Diagnostic History where permitted */}
        {battery.serviceHistory.length > 0 && (
          <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] block">
              Certified Service & Inspection History
            </span>

            <div className="space-y-3">
              {battery.serviceHistory.map(record => (
                <div key={record.id} className="p-4 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2] text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[#10201B]">
                    <span>{record.type}</span>
                    <span className="font-mono text-[#62756E] font-normal">{record.date}</span>
                  </div>
                  <p className="text-[#62756E]"><strong className="text-[#10201B]">Findings:</strong> {record.findings}</p>
                  <p className="text-[#62756E]"><strong className="text-[#10201B]">Action:</strong> {record.actionTaken}</p>
                  <p className="text-[10px] text-[#137A58] font-mono">Inspector: {record.technician} • ReVoltX Certified</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical & Environmental Specifications */}
        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] block">
            Regulatory & Environmental Declarations (EU 2023/1542)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[#62756E] block text-[10px] uppercase font-semibold">Carbon Footprint (LCA)</span>
              <span className="text-sm font-bold font-mono text-[#10201B]">64.2 kg CO₂e / kWh</span>
              <span className="text-[10px] text-[#137A58] block mt-0.5">Top 15% Industry Benchmark</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[#62756E] block text-[10px] uppercase font-semibold">Critical Minerals Recyclability</span>
              <span className="text-sm font-bold font-mono text-[#10201B]">96.4% Efficiency</span>
              <span className="text-[10px] text-[#62756E] block mt-0.5">Lithium, Nickel, Cobalt, Copper</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[#62756E] block text-[10px] uppercase font-semibold">Warranty Coverage</span>
              <span className="text-sm font-bold text-[#10201B]">{battery.warrantyPeriod}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[#62756E] block text-[10px] uppercase font-semibold">Safety Standards</span>
              <span className="text-sm font-bold text-[#10201B]">UN 38.3 • IEC 62619 • UL 1974</span>
            </div>
          </div>
        </div>

        {/* QR Sharing & Export */}
        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#10201B]">Physical QR Identity Tag</h4>
            <p className="text-xs text-[#62756E] mt-0.5">
              Laser-etched onto pack casing for instant scan during inspection and recycling.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Official Battery Passport Certificate exported for ${battery.revoltXId}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-semibold hover:bg-[#0E5B42] transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
            <Link
              href={`/owner`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F0F5F2] hover:bg-[#DDE7E2] text-xs font-semibold text-[#10201B] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" /> Owner Login
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
