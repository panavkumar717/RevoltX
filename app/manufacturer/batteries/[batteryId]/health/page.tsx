'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Thermometer, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useReVoltX } from '@/lib/store/batteryStore';
import { RXScoreGauge } from '@/components/ui/RXScoreGauge';
import { HealthGauge } from '@/components/ui/HealthGauge';
import { TelemetryChart } from '@/components/ui/TelemetryChart';

export default function ManufacturerBatteryHealthPage({
  params
}: {
  params: Promise<{ batteryId: string }>;
}) {
  const resolvedParams = use(params);
  const { getBattery } = useReVoltX();
  const battery = getBattery(resolvedParams.batteryId) || getBattery('RX-2026-892738');

  if (!battery) {
    return <div className="p-8 text-center">Battery Not Found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#DDE7E2]">
        <div>
          <Link
            href={`/manufacturer/batteries/${battery.revoltXId}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#62756E] hover:text-[#10201B] mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Battery {battery.revoltXId}
          </Link>
          <h1 className="text-2xl font-bold text-[#10201B]">
            Deep Health Degradation & RUL Prediction
          </h1>
          <p className="text-xs text-[#62756E]">
            Asset: {battery.revoltXId} • Chemistry: {battery.chemistry} • Pack: {battery.packConfiguration}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TelemetryChart data={battery.recentTelemetry} title="Degradation & Telemetry Waveform" />

          <HealthGauge
            soh={battery.currentSOH}
            soc={battery.soc}
            rul={battery.rul}
            temperature={battery.temperature}
            initialSOH={battery.initialSOH}
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col items-center text-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#62756E] mb-2">
              Computed RX Intelligence Score
            </h3>
            <RXScoreGauge score={battery.rxScore} size="lg" showDetails={true} />
          </div>

          {battery.anomaly && (
            <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8E0B0] text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#10201B]">
                <AlertTriangle className="w-4 h-4 text-[#D89A24]" />
                <span>Detected Anomaly</span>
              </div>
              <p className="text-[#62756E]">{battery.anomaly}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
