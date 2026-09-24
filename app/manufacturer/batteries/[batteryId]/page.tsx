'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Activity, 
  Cpu, 
  Zap, 
  Thermometer, 
  ShieldAlert, 
  Wrench, 
  FileText, 
  QrCode, 
  Clock, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useReVoltX } from '../../../../lib/store/batteryStore';
import { RXScoreGauge } from '../../../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../../../components/ui/HealthGauge';
import { BatteryStatusBadge } from '../../../../components/ui/BatteryStatusBadge';
import { LifecycleTimeline } from '../../../../components/ui/LifecycleTimeline';
import { TelemetryChart } from '../../../../components/ui/TelemetryChart';
import { QRCodeWidget } from '../../../../components/ui/QRCodeWidget';

export default function ManufacturerBatteryDetailPage({
  params
}: {
  params: Promise<{ batteryId: string }>;
}) {
  const resolvedParams = use(params);
  const { getBattery } = useReVoltX();
  const battery = getBattery(resolvedParams.batteryId) || getBattery('RX-2026-892738');

  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'telemetry' | 'lifecycle' | 'passport' | 'service'>('overview');

  if (!battery) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-[#DDE7E2]">
        <h2 className="text-base font-bold text-[#10201B]">Battery Record Not Found</h2>
        <Link href="/manufacturer/batteries" className="text-xs text-[#0070F3] underline mt-2 inline-block">
          Return to Battery Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div className="space-y-1">
          <Link
            href="/manufacturer/batteries"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#62756E] hover:text-[#10201B]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Fleet Assets
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <h1 className="text-2xl font-bold font-mono text-[#10201B]">
              {battery.revoltXId}
            </h1>
            <BatteryStatusBadge stage={battery.lifecycleStage} size="sm" />
            <BatteryStatusBadge risk={battery.risk} size="sm" />
          </div>
          <p className="text-xs text-[#62756E]">
            {battery.manufacturerName} • Serial: {battery.serialNumber} • Chemistry: {battery.chemistry}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/manufacturer/service-requests"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs transition-colors"
          >
            <Wrench className="w-4 h-4" />
            <span>Request ReVoltX Health Assessment</span>
          </Link>

          <Link
            href={`/battery/${battery.revoltXId}`}
            className="p-2 rounded-xl border border-[#DDE7E2] hover:bg-white text-[#10201B] transition-colors"
            title="Public Passport"
          >
            <QrCode className="w-4 h-4 text-[#0070F3]" />
          </Link>
        </div>
      </div>

      {/* Tabs navigation bar */}
      <div className="flex items-center gap-1 bg-[#F0F5F2] p-1.5 rounded-2xl border border-[#DDE7E2] overflow-x-auto text-xs font-semibold">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'health', label: 'Health Degradation' },
          { key: 'telemetry', label: 'IoT Telemetry' },
          { key: 'lifecycle', label: 'Lifecycle Timeline' },
          { key: 'passport', label: 'Digital Passport' },
          { key: 'service', label: 'Service Records' }
        ].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-white text-[#10201B] shadow-xs border border-[#DDE7E2]'
                : 'text-[#62756E] hover:text-[#10201B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key telemetry pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">State of Health</span>
              <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">{battery.currentSOH}%</p>
              <span className="text-[10px] text-[#62756E]">from {battery.initialSOH}% base</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Remaining Cycles</span>
              <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">{battery.rul}</p>
              <span className="text-[10px] text-[#62756E]">in current service</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Pack Voltage</span>
              <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">{battery.voltage} V</p>
              <span className="text-[10px] text-[#0070F3]">16S Nominal</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Pack Current</span>
              <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">{battery.current} A</p>
              <span className="text-[10px] text-[#62756E]">0.3C Load draw</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Core Temperature</span>
              <p className="text-xl font-bold font-mono text-[#D89A24] mt-0.5">{battery.temperature} °C</p>
              <span className="text-[10px] text-[#D89A24]">Elevated warm</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Total Cycles Logged</span>
              <p className="text-xl font-bold font-mono text-[#10201B] mt-0.5">{battery.cycleCount}</p>
              <span className="text-[10px] text-[#62756E]">Full equivalents</span>
            </div>
          </div>

          {/* Anomaly / Alert Banner if present */}
          {battery.anomaly && (
            <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8E0B0] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#D89A24] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#10201B]">
                  AI Diagnostic Anomaly Detected
                </h4>
                <p className="text-xs text-[#62756E] mt-0.5">
                  {battery.anomaly}
                </p>
                <p className="text-[11px] text-[#10201B] font-medium mt-1">
                  <strong>Recommendation: </strong> {battery.recommendation}
                </p>
              </div>
            </div>
          )}

          {/* Grid: Health Gauge + RX Score */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthGauge
              soh={battery.currentSOH}
              soc={battery.soc}
              rul={battery.rul}
              temperature={battery.temperature}
              initialSOH={battery.initialSOH}
            />

            <div className="bg-white rounded-2xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
                  AI Health Intelligence
                </span>
                <h3 className="text-base font-bold text-[#10201B] mt-0.5">
                  ReVoltX Intelligence Score (RX Score)
                </h3>
              </div>

              <div className="my-4">
                <RXScoreGauge score={battery.rxScore} size="md" showDetails={true} />
              </div>

              <div className="text-xs text-[#62756E] pt-3 border-t border-[#DDE7E2]">
                Evaluation based on electrochemical impedance spectroscopy (EIS), cycle wear curvature, and thermal margins.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HEALTH */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#10201B]">
              State of Health (SOH) Degradation Curve & RUL Projection
            </h3>
            <p className="text-xs text-[#62756E]">
              Comparing active electrochemical measurements against nominal LFP baseline degradation curve.
            </p>

            <TelemetryChart 
              data={battery.recentTelemetry} 
              title="Electrochemical Telemetry Waveform" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-xs text-[#62756E] block font-semibold">Initial Factory Baseline</span>
              <p className="text-xl font-bold font-mono text-[#10201B] mt-1">{battery.initialSOH}% SOH</p>
              <span className="text-[11px] text-[#62756E]">Measured {battery.manufactureDate}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-xs text-[#62756E] block font-semibold">Current Retention</span>
              <p className="text-xl font-bold font-mono text-[#D89A24] mt-1">{battery.currentSOH}% SOH</p>
              <span className="text-[11px] text-[#D89A24]">Below EV threshold (80%)</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2]">
              <span className="text-xs text-[#62756E] block font-semibold">Second-Life Remaining Cycles</span>
              <p className="text-xl font-bold font-mono text-[#0070F3] mt-1">{battery.rul} cycles</p>
              <span className="text-[11px] text-[#0070F3]">Safe for stationary cycling</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TELEMETRY */}
      {activeTab === 'telemetry' && (
        <div className="space-y-6">
          <TelemetryChart data={battery.recentTelemetry} />
        </div>
      )}

      {/* TAB 4: LIFECYCLE */}
      {activeTab === 'lifecycle' && (
        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-6">
          <h3 className="text-base font-bold text-[#10201B]">
            Continuous Lifecycle Timeline & Provenance
          </h3>
          <LifecycleTimeline
            currentStage={battery.lifecycleStage}
            events={battery.lifecycleEvents}
            orientation="vertical"
            showDetails={true}
          />
        </div>
      )}

      {/* TAB 5: PASSPORT */}
      {activeTab === 'passport' && (
        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs max-w-md mx-auto">
          <QRCodeWidget 
            batteryId={battery.id} 
            revoltXId={battery.revoltXId} 
            size={180} 
          />
        </div>
      )}

      {/* TAB 6: SERVICE */}
      {activeTab === 'service' && (
        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#10201B]">
              Field Service & Diagnostic Log
            </h3>
            <Link
              href="/manufacturer/service-requests"
              className="text-xs font-semibold text-[#0070F3] hover:underline"
            >
              + File New Inspection Request
            </Link>
          </div>

          {battery.serviceHistory.length === 0 ? (
            <p className="text-xs text-[#62756E] py-4">No past service records logged for this pack.</p>
          ) : (
            <div className="space-y-3">
              {battery.serviceHistory.map(srv => (
                <div key={srv.id} className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#10201B]">
                    <span>{srv.type}</span>
                    <span className="font-mono font-normal text-[#62756E]">{srv.date}</span>
                  </div>
                  <p className="text-[#62756E]"><strong>Findings:</strong> {srv.findings}</p>
                  <p className="text-[#62756E]"><strong>Action:</strong> {srv.actionTaken}</p>
                  <p className="text-[10px] text-[#0070F3] font-mono">Technician: {srv.technician}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
