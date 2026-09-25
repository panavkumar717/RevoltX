'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, QrCode } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { QRCodeWidget } from '../../../components/ui/QRCodeWidget';
import { RXScoreGauge } from '../../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../../components/ui/HealthGauge';
import { LifecycleTimeline } from '../../../components/ui/LifecycleTimeline';

export default function OwnerPassportViewPage() {
  const { getBattery } = useReVoltX();
  const battery = getBattery('RX-2026-892738')!;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Digital Battery Passport
          </span>
          <h1 className="text-2xl font-bold font-mono text-[#10201B] mt-1">
            {battery.revoltXId}
          </h1>
          <p className="text-xs text-[#62756E]">
            Immutable Digital Twin • EU Battery Regulation 2023/1542 Compliant
          </p>
        </div>

        <Link
          href={`/battery/${battery.revoltXId}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Public Mobile View</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col items-center text-center">
          <QRCodeWidget batteryId={battery.id} revoltXId={battery.revoltXId} size={160} />
        </div>

        <div className="md:col-span-2 space-y-6">
          <HealthGauge
            soh={battery.currentSOH}
            soc={battery.soc}
            rul={battery.rul}
            temperature={battery.temperature}
            initialSOH={battery.initialSOH}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#10201B]">
          Continuous Lifecycle Timeline
        </h3>
        <LifecycleTimeline
          currentStage={battery.lifecycleStage}
          events={battery.lifecycleEvents}
          orientation="vertical"
          showDetails={true}
        />
      </div>
    </div>
  );
}
