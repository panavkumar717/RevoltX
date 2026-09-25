'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Recycle, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  Layers,
  ArrowRight,
  Database,
  Check
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { classifyBatteryDeterministic, AIPredictionResult, BatteryInputFeatures } from '../../../lib/ai/rxEngine';
import { DecisionCard } from '../../../components/ui/DecisionCard';
import { RXScoreGauge } from '../../../components/ui/RXScoreGauge';

export default function InternalIntelligencePage() {
  const { batteries, updateBattery } = useReVoltX();

  // Selected battery from store, default to famous degraded pack RX-2026-892738
  const [selectedBatteryId, setSelectedBatteryId] = useState('RX-2026-892738');
  const activeBattery = batteries.find(b => b.revoltXId === selectedBatteryId || b.id === selectedBatteryId) || batteries[0];

  // Interactive telemetry state
  const [chemistry, setChemistry] = useState<string>(activeBattery?.chemistry || 'LFP');
  const [soh, setSoh] = useState<number>(activeBattery?.currentSOH || 71.4);
  const [rul, setRul] = useState<number>(activeBattery?.rul || 384);
  const [re, setRe] = useState<number>(activeBattery?.internalResistanceRe || 0.052);
  const [rct, setRct] = useState<number>(activeBattery?.chargeTransferRct || 0.078);
  const [temp, setTemp] = useState<number>(activeBattery?.temperature || 26.5);

  // Prediction and engine run states
  const [isRunning, setIsRunning] = useState(false);
  const [prediction, setPrediction] = useState<AIPredictionResult | null>(() => {
    return classifyBatteryDeterministic({
      revoltXId: activeBattery?.revoltXId || 'RX-2026-892738',
      chemistry: activeBattery?.chemistry || 'LFP',
      currentSOH: activeBattery?.currentSOH || 71.4,
      rul: activeBattery?.rul || 384,
      internalResistanceRe: activeBattery?.internalResistanceRe || 0.052,
      chargeTransferRct: activeBattery?.chargeTransferRct || 0.078,
      temperature: activeBattery?.temperature || 26.5
    });
  });

  const [savedSuccessToast, setSavedSuccessToast] = useState(false);

  // Handle switching battery from fleet list
  const handleSelectBattery = (bId: string) => {
    setSelectedBatteryId(bId);
    const found = batteries.find(b => b.revoltXId === bId || b.id === bId);
    if (found) {
      setChemistry(found.chemistry);
      setSoh(found.currentSOH);
      setRul(found.rul);
      setRe(found.internalResistanceRe || 0.048);
      setRct(found.chargeTransferRct || 0.072);
      setTemp(found.temperature || 25);
    }
  };

  // Run AI prediction via API (calls Gemini & Physics Classifier)
  const handleRunPrediction = async () => {
    setIsRunning(true);
    setSavedSuccessToast(false);

    const inputData: BatteryInputFeatures = {
      revoltXId: activeBattery?.revoltXId || selectedBatteryId,
      chemistry,
      currentSOH: soh,
      rul,
      internalResistanceRe: re,
      chargeTransferRct: rct,
      temperature: temp,
      capacityAh: activeBattery?.capacity || 60,
      nominalVoltage: activeBattery?.nominalVoltage || 48
    };

    try {
      const res = await fetch('/api/ai/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
      });

      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setPrediction(result.data);
          setIsRunning(false);
          return;
        }
      }
    } catch {
      // Fallback to local classification
    }

    // Local deterministic fallback execution
    const fallback = classifyBatteryDeterministic(inputData);
    setPrediction(fallback);
    setIsRunning(false);
  };

  // Commit decision to live database
  const handleCommitToDatabase = () => {
    if (!prediction || !activeBattery) return;

    updateBattery(
      activeBattery.id,
      {
        currentSOH: soh,
        rul,
        rxScore: prediction.rxScore,
        decisionPathway: prediction.decision,
        recommendation: prediction.recommendedApplication,
        lifecycleStage: prediction.decision === 'CONTINUE_USE' ? 'FIRST_LIFE' : prediction.decision === 'SECOND_LIFE' ? 'ASSESSMENT' : 'RECYCLING',
        status: prediction.decision === 'RECYCLE' ? 'Decommissioned' : 'Active'
      },
      'AI Intelligence Lifecycle Pathway Commited',
      `ReVoltX AI Engine classified asset as ${prediction.decision} (${prediction.confidence}% confidence). Recommended target: ${prediction.recommendedApplication}.`
    );

    setSavedSuccessToast(true);
    setTimeout(() => setSavedSuccessToast(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D89A24] bg-[#FEF6E7] px-2.5 py-0.5 rounded-full border border-[#F8E0B0]">
              ROS Intelligence Lab
            </span>
            <span className="text-xs text-[#62756E] flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#137A58]" /> Gemini 3.8 + Electrochemical Physics
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            ReVoltX Predictive AI Lifecycle Engine
          </h1>
          <p className="text-xs text-[#62756E]">
            Automated primary use, second-life stationary qualification, and closed-loop recycling determination.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/internal/testing"
            className="px-3.5 py-2 rounded-xl border border-[#DDE7E2] bg-white text-xs font-semibold text-[#10201B] hover:bg-[#F0F5F2] transition-colors"
          >
            Hardware Smart Dock
          </Link>
          <Link
            href="/demo"
            className="px-3.5 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
          >
            End-to-End Demo
          </Link>
        </div>
      </div>

      {/* Main Grid: Controls + Interactive Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Telemetry Controls (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE7E2] shadow-xs space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#62756E] block mb-1">
              Asset Sourcing & Selection
            </span>
            <label className="block text-xs font-semibold text-[#10201B] mb-1">
              Select Fleet Battery
            </label>
            <select
              value={selectedBatteryId}
              onChange={e => handleSelectBattery(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] font-mono text-xs text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
            >
              {batteries.map(b => (
                <option key={b.id} value={b.revoltXId}>
                  {b.revoltXId} ({b.chemistry} • SOH {b.currentSOH}% • {b.nasaDatasetId ? `NASA ${b.nasaDatasetId}` : b.lifecycleStage})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-[#DDE7E2] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10201B] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#137A58]" />
              Electrochemical Parameters
            </span>

            {/* Chemistry selector */}
            <div>
              <label className="block text-xs font-semibold text-[#10201B] mb-1">
                Cell Chemistry
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setChemistry('LFP')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    chemistry === 'LFP' 
                      ? 'bg-[#137A58] text-white border-[#137A58]' 
                      : 'bg-[#F7FAF8] text-[#10201B] border-[#DDE7E2]'
                  }`}
                >
                  LFP (Prismatic)
                </button>
                <button
                  type="button"
                  onClick={() => setChemistry('NMC')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    chemistry === 'NMC' 
                      ? 'bg-[#137A58] text-white border-[#137A58]' 
                      : 'bg-[#F7FAF8] text-[#10201B] border-[#DDE7E2]'
                  }`}
                >
                  NMC (Pouch)
                </button>
              </div>
            </div>

            {/* SOH Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#10201B]">State of Health (SOH):</span>
                <span className="font-mono text-[#137A58] font-bold">{soh.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="0.5"
                value={soh}
                onChange={e => setSoh(parseFloat(e.target.value))}
                className="w-full accent-[#137A58] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#62756E] mt-0.5">
                <span>40% (Recycle)</span>
                <span>70% (2nd Life)</span>
                <span>100% (Prime)</span>
              </div>
            </div>

            {/* RUL Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#10201B]">Remaining Useful Life (RUL):</span>
                <span className="font-mono text-[#137A58] font-bold">{rul} cycles</span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="25"
                value={rul}
                onChange={e => setRul(parseInt(e.target.value))}
                className="w-full accent-[#137A58] cursor-pointer"
              />
            </div>

            {/* Ohmic Resistance Re */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#10201B]">Ohmic Resistance (Re):</span>
                <span className="font-mono text-[#10201B] font-bold">{re.toFixed(3)} Ω</span>
              </div>
              <input
                type="range"
                min="0.020"
                max="0.110"
                step="0.002"
                value={re}
                onChange={e => setRe(parseFloat(e.target.value))}
                className="w-full accent-[#137A58] cursor-pointer"
              />
            </div>

            {/* Charge Transfer Rct */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#10201B]">Charge Transfer (Rct):</span>
                <span className="font-mono text-[#10201B] font-bold">{rct.toFixed(3)} Ω</span>
              </div>
              <input
                type="range"
                min="0.030"
                max="0.140"
                step="0.002"
                value={rct}
                onChange={e => setRct(parseFloat(e.target.value))}
                className="w-full accent-[#137A58] cursor-pointer"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleRunPrediction}
            disabled={isRunning}
            className="w-full py-3 px-4 rounded-xl bg-[#137A58] hover:bg-[#0E5B42] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gemini Engine Computing...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run ReVoltX AI Prediction</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Model Results & Visual Decision (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {prediction && (
            <>
              {/* Primary Decision Card */}
              <DecisionCard
                decision={prediction.decision}
                recommendation={prediction.recommendedApplication}
                application={prediction.recommendedApplication}
                soh={soh}
                rul={rul}
                rxScore={prediction.rxScore}
                batteryId={activeBattery?.revoltXId || selectedBatteryId}
                predictionData={prediction}
              />

              {/* Secondary Life Suitability Matrix */}
              <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DDE7E2]">
                  <div>
                    <h3 className="text-sm font-bold text-[#10201B]">
                      Secondary Stationary Application Suitability Matrix
                    </h3>
                    <p className="text-xs text-[#62756E]">
                      Ranked by electrochemical impedance slope and thermal buffer tolerance under UL 1974.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#137A58]">
                    RX Score {prediction.rxScore}/100
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Solar BESS */}
                  <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#62756E] block">
                      Grid Peak Buffer
                    </span>
                    <h4 className="text-sm font-bold text-[#10201B]">Solar BESS</h4>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-mono text-[#137A58]">
                        {prediction.secondarySuitability.solarBESS}%
                      </span>
                      <span className="text-[11px] font-semibold text-[#62756E]">Compatibility</span>
                    </div>
                    <p className="text-[11px] text-[#62756E]">
                      Low C-rate 0.5C daily solar charge buffer with 10-year projected retention.
                    </p>
                  </div>

                  {/* Telecom UPS */}
                  <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#62756E] block">
                      Critical Standby
                    </span>
                    <h4 className="text-sm font-bold text-[#10201B]">Telecom UPS Backup</h4>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-mono text-[#0070F3]">
                        {prediction.secondarySuitability.telecomUPS}%
                      </span>
                      <span className="text-[11px] font-semibold text-[#62756E]">Compatibility</span>
                    </div>
                    <p className="text-[11px] text-[#62756E]">
                      Intermittent float duty in temperature-controlled cabinet infrastructure.
                    </p>
                  </div>

                  {/* Light Mobility / AGV */}
                  <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#62756E] block">
                      Low-Speed Duty
                    </span>
                    <h4 className="text-sm font-bold text-[#10201B]">Warehouse AGVs</h4>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-mono text-[#5D7C13]">
                        {prediction.secondarySuitability.lightMobility}%
                      </span>
                      <span className="text-[11px] font-semibold text-[#62756E]">Compatibility</span>
                    </div>
                    <p className="text-[11px] text-[#62756E]">
                      Repurposed for automated guided vehicles and municipal light utility carts.
                    </p>
                  </div>
                </div>

                {/* Circular Yield & Carbon Offset */}
                <div className="pt-3 border-t border-[#DDE7E2] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#DDF5EA]/50 border border-[#BBEAD7]">
                    <span className="text-[#62756E] block font-medium">Estimated Residual Value:</span>
                    <span className="text-lg font-bold font-mono text-[#137A58]">
                      ${prediction.estimatedMarketValue.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#DDF5EA]/50 border border-[#BBEAD7]">
                    <span className="text-[#62756E] block font-medium">Carbon Avoided (CO₂e):</span>
                    <span className="text-lg font-bold font-mono text-[#137A58]">
                      {prediction.co2AvoidedTons} Tons
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#DDF5EA]/50 border border-[#BBEAD7]">
                    <span className="text-[#62756E] block font-medium">Recoverable Lithium:</span>
                    <span className="text-lg font-bold font-mono text-[#137A58]">
                      {prediction.criticalMineralRecoveryKg.lithium} kg Li
                    </span>
                  </div>
                </div>

                {/* Commit Action */}
                <div className="pt-3 border-t border-[#DDE7E2] flex items-center justify-between">
                  <span className="text-xs text-[#62756E]">
                    Commit this AI classification to the permanent Digital Battery Passport registry.
                  </span>
                  <button
                    type="button"
                    onClick={handleCommitToDatabase}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#10201B] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Database className="w-4 h-4 text-[#C9EF72]" />
                    <span>Commit AI Decision to Passport</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Success Notification Toast */}
      {savedSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10201B] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Check className="w-5 h-5 text-[#C9EF72]" />
          <div>
            <span className="font-bold block">AI Decision Successfully Committed!</span>
            <span className="text-[#9BB3A8]">Asset {activeBattery?.revoltXId} passport updated with verified lifecycle pathway.</span>
          </div>
        </div>
      )}
    </div>
  );
}
