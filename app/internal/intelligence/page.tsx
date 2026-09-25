'use client';

import React from 'react';
import { Activity, Cpu, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { TelemetryChart } from '../../../components/ui/TelemetryChart';

export default function InternalIntelligencePage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#DDE7E2]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D89A24]">
          Machine Learning Models & Analytics
        </span>
        <h1 className="text-2xl font-bold text-[#10201B] mt-1">
          ReVoltX AI Intelligence Architecture
        </h1>
        <p className="text-xs text-[#62756E]">
          Neural degradation prediction, Electrochemical Impedance Spectroscopy (EIS) synthesis, and RX Score calibrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#62756E]">Active Model Core</span>
          <h3 className="text-lg font-bold text-[#10201B]">LFP-EIS-Hybrid-v4</h3>
          <p className="text-xs text-[#62756E]">Physics-informed neural network combining Arrhenius degradation with equivalent circuit impedance modeling.</p>
          <span className="text-xs font-mono text-[#137A58] block pt-2">99.1% Test Accuracy</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#62756E]">NMC High-Density Core</span>
          <h3 className="text-lg font-bold text-[#10201B]">NMC-Pouch-EIS-v3</h3>
          <p className="text-xs text-[#62756E]">Trained on 4.2 million kilometers of heavy truck and transit duty telemetry. Real-time dendrite early warning.</p>
          <span className="text-xs font-mono text-[#137A58] block pt-2">98.4% Accuracy</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#62756E]">RX Score Calibration</span>
          <h3 className="text-lg font-bold text-[#10201B]">Deterministic Matrix v2.6</h3>
          <p className="text-xs text-[#62756E]">Integrates capacity retention, thermal dissipation margin, cycle count velocity, and secondary reuse viability.</p>
          <span className="text-xs font-mono text-[#5D7C13] block pt-2">UL 1974 Aligned</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#10201B]">
          Fleet-Wide Electrochemical Telemetry Baseline
        </h3>
        <TelemetryChart title="Global Training Waveform Synthesis" />
      </div>
    </div>
  );
}
