'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Cpu, 
  Zap, 
  Thermometer, 
  Gauge, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  RefreshCw, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { SmartDockVisualizer } from '../../../components/ui/SmartDockVisualizer';
import { TelemetryChart } from '../../../components/ui/TelemetryChart';
import { RXScoreGauge } from '../../../components/ui/RXScoreGauge';
import { DecisionCard } from '../../../components/ui/DecisionCard';

export default function SmartDockTestingPage() {
  const { batteries, updateBattery, updateServiceRequestStatus, addSecondLifeOpportunity, recordRecyclingMaterial } = useReVoltX();

  const [step, setStep] = useState(1);
  const [selectedBatteryId, setSelectedBatteryId] = useState('RX-2026-892738');
  const [aiStage, setAiStage] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [decisionOutcome, setDecisionOutcome] = useState<'CONTINUE_USE' | 'SECOND_LIFE' | 'RECYCLE'>('SECOND_LIFE');
  const [syncedToCloud, setSyncedToCloud] = useState(false);

  const AI_STAGES = [
    'Collecting Smart Dock telemetry & EIS spectra...',
    'Analyzing electrochemical degradation slopes...',
    'Evaluating thermal behavior & hotspot delta...',
    'Estimating true State of Health (SOH: 72%)...',
    'Estimating Remaining Useful Life (RUL: 384 cycles)...',
    'Detecting anomalies (Accelerated thermal rise)...',
    'Evaluating second-life stationary potential...',
    'Generating optimal lifecycle routing recommendation...'
  ];

  // Stage 5: Run AI Intelligence progression
  useEffect(() => {
    if (step === 5 && isAnalyzing) {
      if (aiStage < AI_STAGES.length - 1) {
        const timer = setTimeout(() => {
          setAiStage(prev => prev + 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsAnalyzing(false);
          setStep(6);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [step, isAnalyzing, aiStage]);

  const handleStartIntelligence = () => {
    setAiStage(0);
    setIsAnalyzing(true);
    setStep(5);
  };

  const handleApplyDecision = (pathway: 'CONTINUE_USE' | 'SECOND_LIFE' | 'RECYCLE') => {
    setDecisionOutcome(pathway);

    const batteryObj = batteries.find(b => b.revoltXId === selectedBatteryId || b.id === selectedBatteryId);

    // Update central database single source of truth!
    updateBattery(
      selectedBatteryId,
      {
        currentSOH: 71.4,
        rul: 384,
        rxScore: 78,
        risk: 'Moderate',
        anomaly: 'Electrochemical impedance growth detected (Re: 0.050Ω, Rct: 0.075Ω)',
        recommendation: pathway === 'SECOND_LIFE' 
          ? 'Potentially suitable for stationary solar storage assessment.'
          : pathway === 'CONTINUE_USE'
          ? 'Cleared for ongoing regular fleet operation.'
          : 'End of life. Certified hydrometallurgical recycling initiated.',
        decisionPathway: pathway,
        lifecycleStage: pathway === 'SECOND_LIFE' ? 'ASSESSMENT' : pathway === 'RECYCLE' ? 'RECYCLING' : 'FIRST_LIFE',
        status: pathway === 'RECYCLE' ? 'Decommissioned' : 'Active'
      },
      'Smart Battery Dock Deep Health Assessment Complete',
      `Assessment complete by Technician Alex Rivera. NASA ARC B0005: SOH 71.4%, RUL 384 cycles, RX Score 78. AI Decision Pathway: ${pathway}.`
    );

    // If second life, automatically create a verified marketplace opportunity for Circularity Partners
    if (pathway === 'SECOND_LIFE') {
      addSecondLifeOpportunity({
        batteryId: selectedBatteryId,
        title: `Commercial Solar Microgrid Storage Module (${batteryObj?.vehicleModel || 'NASA ARC Cell'})`,
        targetApplication: 'Solar Energy Storage',
        capacityKWh: 3.07,
        soh: 71.4,
        rulCycles: 384,
        rxScore: 78,
        compatibilityRating: 95,
        status: 'Available',
        estimatedUsefulYears: 3.8,
        economicValueUsd: 1450
      });
    } else if (pathway === 'RECYCLE') {
      recordRecyclingMaterial({
        batteryId: selectedBatteryId,
        recyclerName: 'GreenLithium Closed-Loop Materials AG',
        status: 'Disassembly',
        lithiumRecoveryKg: 1.84,
        nickelRecoveryKg: 8.62,
        cobaltRecoveryKg: 2.15,
        copperRecoveryKg: 5.40,
        aluminumRecoveryKg: 9.10,
        recoveryEfficiencyPct: 96.4,
        notes: `Automated Smart Dock dispatch. End of functional life verified.`
      });
    }

    // Update service request SR-89201 to Assessment Complete
    updateServiceRequestStatus('SR-89201', 'Assessment Complete', 'tech-01', 'Smart dock test complete. NASA ARC B0005 SOH 71.4%.');

    setSyncedToCloud(true);
    setStep(7);

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] bg-[#DDF5EA] px-2.5 py-0.5 rounded-full border border-[#BBEAD7]">
            Hardware Test Bench Interface
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Smart Battery Dock Assessment Simulator
          </h1>
          <p className="text-xs text-[#62756E]">
            Non-destructive electrochemical telemetry, sensor verification, AI neural scoring, and lifecycle routing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setStep(1);
            setAiStage(0);
            setIsAnalyzing(false);
            setSyncedToCloud(false);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDE7E2] hover:bg-white text-xs font-semibold text-[#10201B] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Test Simulator</span>
        </button>
      </div>

      {/* Stepper progress */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 text-xs font-medium">
        {[
          '1. Identify Battery',
          '2. Connect Dock',
          '3. Verify Sensors',
          '4. Live Telemetry',
          '5. AI Intelligence',
          '6. Health Results',
          '7. Decision Engine'
        ].map((lbl, idx) => {
          const sNum = idx + 1;
          const isPassed = sNum < step;
          const isCurrent = sNum === step;

          return (
            <div
              key={lbl}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                isCurrent
                  ? 'bg-[#137A58] text-white font-bold'
                  : isPassed
                  ? 'bg-[#DDF5EA] text-[#137A58]'
                  : 'bg-[#F0F5F2] text-[#62756E]'
              }`}
            >
              <span>{lbl}</span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Identify Battery */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm space-y-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58]">
              Step 1 of 7
            </span>
            <h2 className="text-xl font-bold text-[#10201B] mt-1">
              Select Battery Asset for Assessment
            </h2>
            <p className="text-xs text-[#62756E]">
              Scan QR code on physical battery casing or select from active service queue.
            </p>
          </div>

          <div className="space-y-3">
            {batteries.slice(0, 3).map(b => (
              <div
                key={b.id}
                onClick={() => setSelectedBatteryId(b.revoltXId)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedBatteryId === b.revoltXId
                    ? 'bg-[#DDF5EA] border-[#137A58] ring-2 ring-[#BBEAD7]'
                    : 'bg-[#F7FAF8] border-[#DDE7E2] hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#10201B]">{b.revoltXId}</span>
                    <span className="text-xs text-[#62756E]">{b.chemistry} ({b.capacity} Ah)</span>
                  </div>
                  <p className="text-xs text-[#62756E] mt-0.5">
                    Owner: {b.ownerName || b.fleetName} • Current Status: SOH {b.currentSOH}%
                  </p>
                </div>

                <span className={`text-xs font-bold px-3 py-1 rounded-xl ${
                  selectedBatteryId === b.revoltXId ? 'bg-[#137A58] text-white' : 'bg-white border border-[#DDE7E2]'
                }`}>
                  {selectedBatteryId === b.revoltXId ? 'Selected for Test' : 'Select'}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
            >
              <span>Proceed to Dock Connection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Connect Smart Battery Dock */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58]">
              Step 2 of 7
            </span>
            <h2 className="text-xl font-bold text-[#10201B] mt-1">
              Connect Hardware Smart Battery Dock
            </h2>
            <p className="text-xs text-[#62756E]">
              Attach the low-voltage demonstrator diagnostic harness to the pack terminal interface.
            </p>
          </div>

          <SmartDockVisualizer batteryId={selectedBatteryId} isTesting={false} />

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-[#62756E]"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
            >
              <span>Harness Attached • Verify Sensors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Verify Sensors */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58]">
              Step 3 of 7 (Sensor Verification)
            </span>
            <h2 className="text-xl font-bold text-[#10201B] mt-1">
              Sensor Matrix Online & Calibration Check
            </h2>
            <p className="text-xs text-[#62756E]">
              Confirming all 4 physical hardware sensor channels are communicating via ESP32.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Gauge className="w-5 h-5 text-[#137A58]" />
                <div>
                  <h4 className="text-xs font-bold text-[#10201B]">Voltage Sensor</h4>
                  <span className="text-[11px] text-[#137A58] font-mono">51.2V Calibrated</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#137A58]">● Connected</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-[#137A58]" />
                <div>
                  <h4 className="text-xs font-bold text-[#10201B]">Current Sensor</h4>
                  <span className="text-[11px] text-[#137A58] font-mono">0.0A Zero Offset</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#137A58]">● Connected</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Thermometer className="w-5 h-5 text-[#137A58]" />
                <div>
                  <h4 className="text-xs font-bold text-[#10201B]">Temperature Sensor</h4>
                  <span className="text-[11px] text-[#137A58] font-mono">38.4°C Probe 1</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#137A58]">● Connected</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-5 h-5 text-[#137A58]" />
                <div>
                  <h4 className="text-xs font-bold text-[#10201B]">ESP32 Gateway</h4>
                  <span className="text-[11px] text-[#137A58] font-mono">WiFi / MQTT 250ms</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#137A58]">● Connected</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-[#62756E]"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
            >
              <span>Sensors Verified • Start Test Waveform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Live Telemetry Stream */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58]">
                Step 4 of 7 (Live Diagnostic Stream)
              </span>
              <h2 className="text-xl font-bold text-[#10201B] mt-1">
                Collecting Dynamic Waveform Data
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#137A58] animate-ping" />
              Live 250ms Buffer
            </span>
          </div>

          <TelemetryChart title="Real-Time Smart Battery Dock Telemetry" />

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-xs font-semibold text-[#62756E]"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleStartIntelligence}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-sm"
            >
              <Cpu className="w-4 h-4 text-[#C9EF72]" />
              <span>Run ReVoltX AI Intelligence</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Running ReVoltX AI Intelligence */}
      {step === 5 && (
        <div className="bg-white rounded-3xl p-8 border border-[#DDE7E2] shadow-sm text-center space-y-6 py-12">
          <div className="p-4 rounded-3xl bg-[#DDF5EA] text-[#137A58] w-fit mx-auto animate-pulse">
            <Cpu className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
              Step 5 of 7
            </span>
            <h2 className="text-2xl font-bold text-[#10201B] mt-1">
              ReVoltX AI Intelligence Engine Processing
            </h2>
            <p className="text-xs text-[#62756E] max-w-md mx-auto mt-1">
              Evaluating electrochemical impedance, thermal dissipation coefficients, and remaining cycle margins.
            </p>
          </div>

          {/* Neural Stage Pipeline Progress */}
          <div className="max-w-md mx-auto bg-[#F7FAF8] p-5 rounded-2xl border border-[#DDE7E2] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#10201B]">
              <span>Analysis Stage {aiStage + 1} of {AI_STAGES.length}</span>
              <span className="font-mono text-[#137A58]">{Math.round(((aiStage + 1) / AI_STAGES.length) * 100)}%</span>
            </div>

            <div className="w-full bg-[#EAEAEA] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#137A58] h-full transition-all duration-300"
                style={{ width: `${((aiStage + 1) / AI_STAGES.length) * 100}%` }}
              />
            </div>

            <p className="text-xs font-mono font-medium text-[#137A58] text-left pt-1">
              ● {AI_STAGES[aiStage]}
            </p>
          </div>
        </div>
      )}

      {/* STEP 6: Show Diagnostic Results */}
      {step === 6 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58]">
                Step 6 of 7 (Assessment Results)
              </span>
              <h2 className="text-xl font-bold text-[#10201B] mt-1">
                Diagnostic Analysis Complete
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DDF5EA] text-[#137A58]">
              Evaluation Complete
            </span>
          </div>

          {/* Results Summary Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">State of Health</span>
              <p className="text-3xl font-bold font-mono text-[#D89A24] mt-1">72%</p>
              <span className="text-[10px] text-[#D89A24]">Below EV 80% mark</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Remaining Cycles</span>
              <p className="text-3xl font-bold font-mono text-[#10201B] mt-1">384 cyc</p>
              <span className="text-[10px] text-[#62756E]">~3.5 Yrs Stationary</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2]">
              <span className="text-[10px] uppercase font-bold text-[#62756E]">Risk Level</span>
              <p className="text-xl font-bold text-[#D89A24] mt-2">Moderate</p>
              <span className="text-[10px] text-[#62756E]">Thermal drift</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7]">
              <span className="text-[10px] uppercase font-bold text-[#137A58]">RX SCORE</span>
              <p className="text-3xl font-bold font-mono text-[#137A58] mt-1">78 / 100</p>
              <span className="text-[10px] text-[#137A58] font-bold">2nd-Life Grade A-</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8E0B0] text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#10201B]">
              <AlertTriangle className="w-4 h-4 text-[#D89A24]" />
              <span>Detected Anomaly: Accelerated Thermal Degradation</span>
            </div>
            <p className="text-[#62756E]">
              Core temperature elevated to 38.4°C during fast charge. Internal resistance has risen from 11.2 mΩ to 14.8 mΩ. Structurally sound for low-stress solar cycling.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="text-xs font-semibold text-[#62756E]"
            >
              ← Back to Waveforms
            </button>
            <button
              type="button"
              onClick={() => setStep(7)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
            >
              <span>Proceed to Decision Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Decision Engine & Database Update */}
      {step === 7 && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#137A58]">
                Step 7 of 7 (Decision Engine)
              </span>
              <h2 className="text-xl font-bold text-[#10201B] mt-1">
                Select Lifecycle Routing Pathway
              </h2>
              <p className="text-xs text-[#62756E]">
                Selecting a pathway writes to the single source of truth across all 3 portals and the public Digital Battery Passport.
              </p>
            </div>

            {/* 3 Decision Pathway Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: Continue Use */}
              <div
                onClick={() => handleApplyDecision('CONTINUE_USE')}
                className="p-5 rounded-2xl border cursor-pointer hover:border-[#137A58] transition-all bg-[#F7FAF8] hover:bg-white text-left space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#10201B]">CONTINUE USE</span>
                  <span className="text-[10px] font-mono text-[#62756E]">SOH &gt; 80%</span>
                </div>
                <p className="text-xs text-[#62756E]">
                  Clear battery to continue regular EV service with routine thermal throttling.
                </p>
                <button
                  type="button"
                  className="w-full py-2 rounded-xl border border-[#DDE7E2] text-xs font-semibold hover:bg-[#DDF5EA] hover:text-[#137A58]"
                >
                  Select Continue Use
                </button>
              </div>

              {/* Option 2: Second Life (Recommended) */}
              <div
                onClick={() => handleApplyDecision('SECOND_LIFE')}
                className="p-5 rounded-2xl border-2 border-[#137A58] bg-[#F3F8E5] cursor-pointer shadow-xs text-left space-y-2 relative"
              >
                <span className="absolute -top-2.5 right-4 bg-[#137A58] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  AI Recommended
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#10201B]">SECOND LIFE</span>
                  <span className="text-[10px] font-bold text-[#5D7C13]">Optimal</span>
                </div>
                <p className="text-xs text-[#10201B] font-medium">
                  Qualify pack for stationary solar energy storage. Dispatches to Circularity Portal.
                </p>
                <button
                  type="button"
                  className="w-full py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
                >
                  Approve Second Life (Solar)
                </button>
              </div>

              {/* Option 3: Recycle */}
              <div
                onClick={() => handleApplyDecision('RECYCLE')}
                className="p-5 rounded-2xl border cursor-pointer hover:border-[#D94B4B] transition-all bg-[#F7FAF8] hover:bg-white text-left space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#10201B]">RECYCLE</span>
                  <span className="text-[10px] font-mono text-[#62756E]">SOH &lt; 50%</span>
                </div>
                <p className="text-xs text-[#62756E]">
                  Decommission pack and route to hydrometallurgical recycling facility for mineral recovery.
                </p>
                <button
                  type="button"
                  className="w-full py-2 rounded-xl border border-[#DDE7E2] text-xs font-semibold hover:bg-[#FDF0EE] hover:text-[#D94B4B]"
                >
                  Route to Recycler
                </button>
              </div>
            </div>

            {/* Sync Confirmation Banner */}
            {syncedToCloud && (
              <div className="p-5 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7] space-y-2">
                <div className="flex items-center gap-2 text-[#137A58] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Decision Applied • ReVoltX Database Synchronized!</span>
                </div>
                <p className="text-xs text-[#62756E] leading-relaxed">
                  Asset <strong className="text-[#10201B] font-mono">{selectedBatteryId}</strong> has been updated in the cloud. The change is now immediately visible in:
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
                  <Link
                    href={`/manufacturer/batteries/${selectedBatteryId}`}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#DDE7E2] hover:bg-[#F0F5F2] text-[#10201B]"
                  >
                    Manufacturer Portal →
                  </Link>
                  <Link
                    href="/owner"
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#DDE7E2] hover:bg-[#F0F5F2] text-[#10201B]"
                  >
                    Owner Portal →
                  </Link>
                  <Link
                    href="/circularity/opportunities"
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#DDE7E2] hover:bg-[#F0F5F2] text-[#10201B]"
                  >
                    Circularity Portal →
                  </Link>
                  <Link
                    href={`/battery/${selectedBatteryId}`}
                    className="px-3 py-1.5 rounded-xl bg-[#137A58] text-white hover:bg-[#0E5B42]"
                  >
                    Digital Battery Passport →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
