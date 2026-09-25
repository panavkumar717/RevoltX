'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  HelpCircle, 
  Thermometer, 
  Zap, 
  Activity, 
  AlertTriangle, 
  Wrench, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { RXScoreGauge } from '../../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../../components/ui/HealthGauge';
import { TelemetryChart } from '../../../components/ui/TelemetryChart';
import MagicBento, { MagicBentoCardItem } from '../../../components/ui/MagicBento';

export default function OwnerHealthPage() {
  const { getBattery } = useReVoltX();
  const battery = getBattery('RX-2026-892738')!;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Health Intelligence for Owners
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Understanding Your Battery Health
          </h1>
          <p className="text-xs text-[#62756E]">
            Plain-language diagnostics translated from complex electrochemical sensor telemetry.
          </p>
        </div>

        <Link
          href="/owner/service"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Book Health Check</span>
        </Link>
      </div>

      {/* Human Explanation Highlight Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-[#DDF5EA] text-[#137A58]">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
              Current Status Assessment
            </span>
            <h3 className="text-lg font-bold text-[#10201B] mt-0.5">
              "{battery.humanAnomalyExplanation || 'Your battery is operating within normal diagnostic parameters.'}"
            </h3>
            <p className="text-xs text-[#62756E] mt-2 leading-relaxed">
              During high-demand driving and charging sessions, the core battery temperature reached <strong className="text-[#10201B]">{battery.temperature}°C</strong>. Internal EIS impedance: Re={battery.internalResistanceRe || 0.050}Ω, Rct={battery.chargeTransferRct || 0.075}Ω. Your State of Health is currently <strong className="text-[#10201B]">{battery.currentSOH}%</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#DDE7E2]">
          <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
            <span className="text-[10px] uppercase font-bold text-[#62756E]">Technical Metric</span>
            <p className="text-xs font-bold text-[#10201B] mt-1">{battery.anomaly || 'Nominal Aging Curve'}</p>
            <span className="text-[10px] text-[#62756E]">NASA ARC {battery.nasaDatasetId || 'B0005'} Telemetry</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
            <span className="text-[10px] uppercase font-bold text-[#62756E]">Impact on Your EV</span>
            <p className="text-xs font-bold text-[#10201B] mt-1">Slight Range Reduction</p>
            <span className="text-[10px] text-[#62756E]">~{Math.round(100 - battery.currentSOH)}% capacity fade</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
            <span className="text-[10px] uppercase font-bold text-[#62756E]">Recommended Action</span>
            <p className="text-xs font-bold text-[#137A58] mt-1">On-Site Health Check</p>
            <span className="text-[10px] text-[#62756E]">ReVoltX technician visit</span>
          </div>
        </div>
      </div>

      {/* Health Metrics & Visual Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HealthGauge
          soh={battery.currentSOH}
          soc={battery.soc}
          rul={battery.rul}
          temperature={battery.temperature}
          initialSOH={battery.initialSOH}
        />

        <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#62756E]">
              Battery Intelligence Rating
            </span>
            <h3 className="text-sm font-bold text-[#10201B] mt-0.5">
              RX Score: {battery.rxScore} / 100
            </h3>
          </div>

          <div className="my-3">
            <RXScoreGauge score={battery.rxScore} size="md" showDetails={true} />
          </div>

          <p className="text-xs text-[#62756E] pt-2 border-t border-[#DDE7E2]">
            RX Score represents overall electrochemical stability, remaining cycle longevity, and second-life repurposing value.
          </p>
        </div>
      </div>

      {/* Helpful Care Tips for Battery Longevity Magic Bento */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#10201B] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#137A58]" />
            <span>Tailored Battery Care Tips for Sarah</span>
          </h3>
          <span className="text-[10px] font-mono font-bold text-[#137A58] bg-[#DDF5EA] px-2.5 py-0.5 rounded-full border border-[#BBEAD7]">
            AI Proactive Protection
          </span>
        </div>

        <MagicBento 
          cards={[
            {
              label: 'CHARGING PROFILE',
              title: 'Limit High-Power DC Fast Charging',
              value: '0.8C Max',
              sub: 'Thermal Relief Protocol',
              description: 'Charging at 0.5C to 0.8C on AC overnight reduces cell thermal stress by up to 40% and preserves anode SEI layer integrity.',
              badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7] font-bold">Recommended</span>
            },
            {
              label: 'STATE OF CHARGE',
              title: 'Avoid 100% Overnight Resting States',
              value: '50% - 80%',
              sub: 'Storage Equilibrium',
              description: 'If parking your vehicle for more than 48 hours, keeping state-of-charge between 50% and 80% prevents transition metal dissolution.',
              badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7] font-bold">Best Practice</span>
            },
            {
              label: 'CLIMATE SYSTEM',
              title: 'Precondition While Plugged In',
              value: 'Pre-Heat / Cool',
              sub: 'Grid-Assisted Tempering',
              description: 'Condition the battery pack to 22°C before driving using wallbox current rather than draining onboard electrochemical energy.',
              badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7] font-bold">+12% Range</span>
            },
            {
              label: 'RECUPERATION',
              title: 'Optimize Regenerative Deceleration',
              value: 'Adaptive Mode',
              sub: 'Kinetic Energy Reclaim',
              description: 'Smooth regenerative braking returns up to 28% of expended propulsion energy directly back into the pack without overheating cells.',
              badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7] font-bold">Efficiency</span>
            }
          ]}
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={280}
          particleCount={10}
          glowColor="19, 122, 88"
        />
      </div>
    </div>
  );
}
