'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Thermometer, 
  Gauge, 
  QrCode, 
  Factory, 
  User, 
  RefreshCw, 
  Recycle, 
  Activity, 
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { PublicNavbar } from '../../components/shared/PublicNavbar';
import { PublicFooter } from '../../components/shared/PublicFooter';
import { RXScoreGauge } from '../../components/ui/RXScoreGauge';
import { SmartDockVisualizer } from '../../components/ui/SmartDockVisualizer';
import { TelemetryChart } from '../../components/ui/TelemetryChart';
import { DecisionCard } from '../../components/ui/DecisionCard';
import { QRCodeWidget } from '../../components/ui/QRCodeWidget';

const DEMO_STAGES = [
  {
    step: 1,
    title: '1. Battery Manufactured at Gigafactory',
    phase: 'MANUFACTURE',
    actor: 'XYZ Battery Corp. (Berlin)',
    description: 'A 60 Ah Lithium Iron Phosphate (LFP) 16S2P prismatic pack is fabricated and quality-certified.',
    data: {
      serialNumber: 'BAT-892738',
      initialSOH: '100%',
      nominalVoltage: '51.2 V',
      capacity: '60 Ah',
      chemistry: 'LFP'
    }
  },
  {
    step: 2,
    title: '2. ReVoltX Minting Digital Battery Passport',
    phase: 'DIGITAL IDENTITY',
    actor: 'ReVoltX Registry Engine',
    description: 'Cryptographic digital twin is created. Unique universal identifier RX-2026-892738 is assigned.',
    data: {
      revoltXId: 'RX-2026-892738',
      euDirective: 'EU 2023/1542 Certified',
      carbonFootprint: '64 kg CO2e/kWh',
      qrAttached: 'Laser-Etched QR Code Generated'
    }
  },
  {
    step: 3,
    title: '3. Battery Registered in Manufacturer Fleet',
    phase: 'REGISTERED',
    actor: 'Manufacturer & Fleet Portal',
    description: 'Battery enters the universal database. Visible in Manufacturer & Fleet Portal alongside 10,000 active assets.',
    data: {
      organization: 'XYZ Battery Corp.',
      portalSync: 'Live in /manufacturer/fleet',
      warranty: '5 Years / 2,000 Cycles'
    }
  },
  {
    step: 4,
    title: '4. First-Life Deployment to Customer',
    phase: 'FIRST_LIFE',
    actor: 'Owner: Sarah Jenkins',
    description: 'Battery installed in EcoRider V3 commercial delivery vehicle serving urban courier routes.',
    data: {
      vehicle: 'EcoRider V3 Courier',
      owner: 'Sarah Jenkins',
      initialCycles: '0 cycles',
      soh: '100%'
    }
  },
  {
    step: 5,
    title: '5. IoT Health Monitoring During First Life',
    phase: 'HEALTH_MONITORING',
    actor: 'ReVoltX Telemetry Core',
    description: 'Continuous telematics log 1,420 duty cycles over 3 years of daily courier service.',
    data: {
      operatingHours: '14,200 hrs',
      cycles: '1,420 cycles',
      distanceTraveled: '84,500 km',
      soh: '82%'
    }
  },
  {
    step: 6,
    title: '6. Battery Health Drops & Anomaly Detected',
    phase: 'HEALTH_MONITORING',
    actor: 'ReVoltX Edge AI',
    description: 'SOH decreases to 72%. Anomaly: Accelerated thermal rise during fast charging detected.',
    data: {
      currentSOH: '72% (Threshold < 80% crossed)',
      rul: '384 cycles remaining in mobility',
      anomaly: 'Accelerated thermal degradation (38.4°C peak)',
      risk: 'Moderate'
    }
  },
  {
    step: 7,
    title: '7. Customer Requests Health Assessment',
    phase: 'SERVICE_REQUEST',
    actor: 'Owner Portal (/owner/service)',
    description: 'Sarah Jenkins receives an alert and books a 1-click ReVoltX mobile diagnostic visit.',
    data: {
      requestId: 'SR-89201',
      serviceType: 'On-Site Smart Dock Health Check',
      address: '742 Evergreen Terrace, Sector 4',
      status: 'Technician Dispatched'
    }
  },
  {
    step: 8,
    title: '8. ReVoltX Field Technician Dispatched',
    phase: 'INTERNAL_OPERATIONS',
    actor: 'Alex Rivera (ReVoltX Technician)',
    description: 'Technician arrives on-site equipped with the portable ReVoltX Smart Battery Dock diagnostic kit.',
    data: {
      technician: 'Alex Rivera',
      specialty: 'EV Pack Diagnostics',
      tooling: 'Smart Battery Dock v2 (Low-Voltage Safe demonstrator)',
      status: 'Dock Connected to Pack'
    }
  },
  {
    step: 9,
    title: '9. Smart Battery Dock Connects & Verifies Sensors',
    phase: 'SMART_DOCK',
    actor: 'Smart Battery Dock Hardware',
    description: 'Four sensor channels verify contact impedance: Voltage Sensor, Current Sensor, Temperature Probe, ESP32 Gateway.',
    data: {
      voltageSensor: '● Connected (51.2V)',
      currentSensor: '● Connected (18.2A load)',
      tempProbe: '● Connected (38.4°C)',
      esp32Gateway: '● Connected (MQTT Stream)'
    }
  },
  {
    step: 10,
    title: '10. Live Telemetry Streamed to Cloud',
    phase: 'TELEMETRY_STREAM',
    actor: 'ReVoltX Cloud Broker',
    description: 'High-speed electrochemical waveforms stream directly to ReVoltX Cloud at 250ms sampling rate.',
    data: {
      voltageWaveform: '51.2 V steady',
      internalResistance: '14.2 mΩ (nominal for LFP)',
      cellBalanceDelta: '12 mV (tight balance)'
    }
  },
  {
    step: 11,
    title: '11. ReVoltX AI Intelligence Analyzes Pack',
    phase: 'AI_INTELLIGENCE',
    actor: 'ReVoltX Decision Engine',
    description: 'Deep neural model runs 7 diagnostic stages: degradation slope, thermal dissipation, SOH, RUL, and second-life margin.',
    data: {
      model: 'LFP-EIS-Hybrid-v4',
      calculatedSOH: '72%',
      remainingUsefulLife: '384 cycles',
      rxScore: '78 / 100'
    }
  },
  {
    step: 12,
    title: '12. RX Score Generated: 78 / 100',
    phase: 'RX_SCORE',
    actor: 'ReVoltX Intelligence',
    description: 'Pack is scored at 78/100 ("Solid Second-Life Grade"). While retired from high-stress mobility, cells have outstanding stationary longevity.',
    data: {
      rxScore: '78 / 100',
      safetyRating: 'Safe for Stationary Cycling',
      secondLifeEligibility: 'Candidate Qualified'
    }
  },
  {
    step: 13,
    title: '13. Decision Engine Evaluates Pathways',
    phase: 'DECISION_ENGINE',
    actor: 'Multi-Path Routing Engine',
    description: 'System evaluates Continue Use vs. Second Life vs. Recycle. Result: SECOND LIFE (Solar Energy Storage).',
    data: {
      outcome: 'SECOND_LIFE',
      recommendedApplication: 'Stationary Solar Energy Storage',
      decommissionFromEV: 'Approved'
    }
  },
  {
    step: 14,
    title: '14. Second-Life Opportunity Detected',
    phase: 'CIRCULAR_OPPORTUNITY',
    actor: 'Circularity Marketplace',
    description: 'Battery automatically lists on Circularity Partner Portal as a prime energy storage module.',
    data: {
      usableCapacity: '3.07 kWh',
      economicValue: '$1,450',
      targetDuty: 'Daily Diurnal Solar Buffering'
    }
  },
  {
    step: 15,
    title: '15. Circular Impact Measured & Recorded',
    phase: 'CIRCULAR_IMPACT',
    actor: 'ReVoltX Impact Engine',
    description: 'Repurposing this single 60Ah pack extends asset life by 3.5 years and prevents 221 kg of virgin CO2 emissions.',
    data: {
      lifeExtended: '+3.5 Years',
      co2Avoided: '221 kg CO2e',
      landfillDiverted: '28 kg raw pack mass'
    }
  },
  {
    step: 16,
    title: '16. Complete Data Consistency Across All Portals',
    phase: 'LIFECYCLE_CLOSED',
    actor: 'One Source of Truth',
    description: 'The same battery RX-2026-892738 is now updated simultaneously in Manufacturer, Owner, Circularity, and Public Passport.',
    data: {
      manufacturerPortal: 'Updated: Decommissioned to 2nd Life',
      ownerPortal: 'Updated: Health check report filed',
      circularityPortal: 'Updated: Listed in Opportunities',
      publicPassport: 'Updated: Stage changed to SECOND_LIFE'
    }
  }
];

export default function DemoPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = DEMO_STAGES[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev >= DEMO_STAGES.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col selection:bg-[#DDF5EA] selection:text-[#137A58]">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-32 md:pt-36 md:pb-16">
        {/* Demo Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#DDE7E2] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#21A879]" />
                Interactive Judge Walkthrough (60–90 Seconds)
              </span>
              <span className="text-xs font-mono font-bold text-[#62756E]">
                Step {current.step} of {DEMO_STAGES.length}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#10201B] mt-2">
              The Complete ReVoltX Battery Lifecycle
            </h1>
            <p className="text-xs sm:text-sm text-[#62756E] mt-1 max-w-2xl">
              Follow battery <strong className="text-[#10201B]">RX-2026-892738</strong> from gigafactory fabrication to first-life telemetry, Smart Dock diagnostics, AI decision engine, and second-life solar storage.
            </p>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-[#DDE7E2] shadow-xs">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-xl border border-[#DDE7E2] text-[#10201B] hover:bg-[#F0F5F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous Step"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(prev => Math.min(DEMO_STAGES.length - 1, prev + 1));
              }}
              disabled={currentStepIndex === DEMO_STAGES.length - 1}
              className="p-2 rounded-xl border border-[#DDE7E2] text-[#10201B] hover:bg-[#F0F5F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next Step"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              className="p-2 rounded-xl border border-[#DDE7E2] text-[#62756E] hover:bg-[#F0F5F2] hover:text-[#10201B] transition-colors"
              title="Restart Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Scrubber */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2">
          {DEMO_STAGES.map((s, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={s.step}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`h-2.5 flex-1 min-w-[28px] rounded-full transition-all ${
                  isCurrent 
                    ? 'bg-[#137A58] ring-2 ring-[#BBEAD7]' 
                    : isCompleted 
                    ? 'bg-[#21A879]' 
                    : 'bg-[#DDE7E2] hover:bg-[#C4D6CD]'
                }`}
                title={`Step ${s.step}: ${s.title}`}
              />
            );
          })}
        </div>

        {/* Main Stage Presentation Card */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Interactive Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.step}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm space-y-5"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58] bg-[#DDF5EA] px-2.5 py-1 rounded-full">
                    {current.phase}
                  </span>
                  <h2 className="text-2xl font-bold text-[#10201B] mt-3">
                    {current.title}
                  </h2>
                  <p className="text-xs text-[#62756E] mt-1 font-mono">
                    Actor: {current.actor}
                  </p>
                </div>

                <p className="text-sm text-[#10201B] leading-relaxed">
                  {current.description}
                </p>

                {/* Structured Step Data Cards */}
                <div className="space-y-2 pt-2 border-t border-[#DDE7E2]">
                  {Object.entries(current.data).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                      <span className="text-[#62756E] font-medium capitalize">
                        {k.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-mono font-bold text-[#10201B]">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Navigation CTA within card */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentStepIndex === 0}
                    className="text-xs font-semibold text-[#62756E] hover:text-[#10201B] disabled:opacity-30"
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStepIndex(prev => Math.min(DEMO_STAGES.length - 1, prev + 1))}
                    disabled={currentStepIndex === DEMO_STAGES.length - 1}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-[#137A58] text-white hover:bg-[#0E5B42] transition-colors"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Links to Live Portals at This Stage */}
            <div className="p-5 rounded-2xl bg-[#F0F5F2] border border-[#DDE7E2] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] block">
                Examine in Live Portals
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <Link
                  href="/manufacturer/batteries/RX-2026-892738"
                  className="p-2.5 rounded-xl bg-white hover:bg-[#DDF5EA] hover:text-[#137A58] border border-[#DDE7E2] flex items-center gap-1.5 transition-colors"
                >
                  <Factory className="w-3.5 h-3.5" /> Manufacturer
                </Link>
                <Link
                  href="/owner"
                  className="p-2.5 rounded-xl bg-white hover:bg-[#DDF5EA] hover:text-[#137A58] border border-[#DDE7E2] flex items-center gap-1.5 transition-colors"
                >
                  <User className="w-3.5 h-3.5" /> Owner Portal
                </Link>
                <Link
                  href="/internal/testing"
                  className="p-2.5 rounded-xl bg-white hover:bg-[#FEF6E7] hover:text-[#D89A24] border border-[#DDE7E2] flex items-center gap-1.5 transition-colors"
                >
                  <Cpu className="w-3.5 h-3.5" /> Smart Dock Sim
                </Link>
                <Link
                  href="/circularity/opportunities"
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3F8E5] hover:text-[#5D7C13] border border-[#DDE7E2] flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Circularity
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Visual Context */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contextual Visualizer dynamically based on current step */}
            {currentStepIndex <= 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-sm">
                  <h3 className="text-sm font-bold text-[#10201B] mb-4">
                    Digital Battery Passport & Physical QR Code Created
                  </h3>
                  <QRCodeWidget batteryId="RX-2026-892738" revoltXId="RX-2026-892738" size={160} />
                </div>
              </div>
            )}

            {currentStepIndex >= 4 && currentStepIndex <= 8 && (
              <div className="space-y-6">
                <TelemetryChart 
                  title="First-Life Telemetry & Degradation Trend"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2]">
                    <span className="text-xs text-[#62756E] font-medium">State of Health (SOH)</span>
                    <p className="text-2xl font-bold font-mono text-[#D89A24] mt-1">72%</p>
                    <p className="text-[11px] text-[#62756E] mt-1">Threshold: Retired from primary EV duty</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2]">
                    <span className="text-xs text-[#62756E] font-medium">Service Ticket</span>
                    <p className="text-lg font-bold font-mono text-[#10201B] mt-1">SR-89201</p>
                    <p className="text-[11px] text-[#137A58] font-semibold mt-1">● Technician Alex Rivera Assigned</p>
                  </div>
                </div>
              </div>
            )}

            {currentStepIndex >= 9 && currentStepIndex <= 11 && (
              <div className="space-y-6">
                <SmartDockVisualizer batteryId="RX-2026-892738" isTesting={true} />
                <TelemetryChart title="Real-Time Smart Dock Sensor Waveform" />
              </div>
            )}

            {currentStepIndex >= 12 && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
                      Assessment Complete
                    </span>
                    <h3 className="text-xl font-bold text-[#10201B] mt-1">
                      Computed RX Intelligence Score
                    </h3>
                    <p className="text-xs text-[#62756E] mt-1 max-w-sm">
                      Thermally de-rated for high-amperage vehicle launch, but structurally pristine for daily solar energy storage.
                    </p>
                  </div>
                  <RXScoreGauge score={78} size="md" showDetails={false} />
                </div>

                <DecisionCard
                  decision="SECOND_LIFE"
                  recommendation="Potentially suitable for secondary-life assessment. Recommended target application: Solar Energy Storage."
                  application="Solar Energy Storage"
                  soh={72}
                  rul={384}
                  rxScore={78}
                  anomaly="Accelerated thermal degradation detected under rapid fast charge"
                  batteryId="RX-2026-892738"
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
