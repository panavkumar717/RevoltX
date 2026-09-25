'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Activity, 
  FileCheck 
} from 'lucide-react';
import { useReVoltX } from '../../../../lib/store/batteryStore';
import { QRCodeWidget } from '../../../../components/ui/QRCodeWidget';

export default function RegisterBatteryPage() {
  const router = useRouter();
  const { registerBattery } = useReVoltX();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    manufacturerName: 'XYZ Battery Corp.',
    serialNumber: `BAT-${Math.floor(100000 + Math.random() * 900000)}`,
    batteryType: 'Prismatic Traction Pack',
    chemistry: 'LFP' as 'LFP' | 'NMC' | 'NCA' | 'Sodium-Ion',
    capacity: 60,
    manufactureDate: new Date().toISOString().split('T')[0],
    packConfiguration: '16S2P Prismatic Module',
    initialSOH: 100,
    initialSOC: 95,
    initialVoltage: 51.8,
    initialTemp: 24.2,
    initialCycles: 0,
    nominalVoltage: 51.2
  });

  const [registeredBattery, setRegisteredBattery] = useState<any>(null);

  const handleNext = () => {
    if (step < 5) {
      setStep(prev => prev + 1);
    } else if (step === 5) {
      // Complete Registration
      const newBat = registerBattery({
        manufacturerName: formData.manufacturerName,
        serialNumber: formData.serialNumber,
        chemistry: formData.chemistry,
        capacity: Number(formData.capacity),
        packConfiguration: formData.packConfiguration,
        manufactureDate: formData.manufactureDate,
        initialSOH: Number(formData.initialSOH),
        currentSOH: Number(formData.initialSOH),
        soc: Number(formData.initialSOC),
        voltage: Number(formData.initialVoltage),
        temperature: Number(formData.initialTemp),
        cycleCount: Number(formData.initialCycles),
        nominalVoltage: Number(formData.nominalVoltage),
        rxScore: 98,
        risk: 'Low',
        lifecycleStage: 'REGISTERED',
        status: 'Active'
      });

      setRegisteredBattery(newBat);
      setStep(6);

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe confetti fallback
      }
    }
  };

  const generatedId = registeredBattery?.revoltXId || `RX-2026-${formData.serialNumber.replace('BAT-', '') || '892738'}`;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Wizard Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Battery Registration Engine
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Register New Battery & Mint Passport
          </h1>
          <p className="text-xs text-[#62756E]">
            Step {step} of 6 • EU Battery Directive 2023/1542 Compliance
          </p>
        </div>

        <Link
          href="/manufacturer/batteries"
          className="text-xs font-semibold text-[#62756E] hover:text-[#10201B]"
        >
          Cancel
        </Link>
      </div>

      {/* Stepper Indicator */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 text-xs font-medium">
        {[
          '1. Information',
          '2. Health Check',
          '3. Assign ID',
          '4. Mint Passport',
          '5. Generate QR',
          '6. Complete'
        ].map((lbl, idx) => {
          const sNum = idx + 1;
          const isPassed = sNum < step;
          const isCurrent = sNum === step;

          return (
            <div 
              key={lbl}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                isCurrent 
                  ? 'bg-[#137A58] text-white font-bold' 
                  : isPassed 
                  ? 'bg-[#DDF5EA] text-[#137A58]' 
                  : 'bg-[#F0F5F2] text-[#62756E]'
              }`}
            >
              <span className="font-mono">{sNum}.</span>
              <span>{lbl.split('. ')[1]}</span>
            </div>
          );
        })}
      </div>

      {/* Step Contents */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm">
        {/* STEP 1: Battery Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#10201B]">
              Step 1: Production & Chemical Identity
            </h2>
            <p className="text-xs text-[#62756E]">
              Provide manufacturing specifications and chemistry classification.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Manufacturer Organization
                </label>
                <input
                  type="text"
                  value={formData.manufacturerName}
                  onChange={e => setFormData({ ...formData, manufacturerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Production Serial Number
                </label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={e => setFormData({ ...formData, serialNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-mono font-medium text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Battery Chemistry
                </label>
                <select
                  value={formData.chemistry}
                  onChange={e => setFormData({ ...formData, chemistry: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                >
                  <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                  <option value="NMC">NMC (Nickel Manganese Cobalt)</option>
                  <option value="NCA">NCA (Nickel Cobalt Aluminum)</option>
                  <option value="Sodium-Ion">Sodium-Ion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Nominal Capacity (Ah)
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={e => setFormData({ ...formData, capacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-mono font-medium text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Manufacture Date
                </label>
                <input
                  type="date"
                  value={formData.manufactureDate}
                  onChange={e => setFormData({ ...formData, manufactureDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-mono font-medium text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Pack Configuration
                </label>
                <input
                  type="text"
                  value={formData.packConfiguration}
                  onChange={e => setFormData({ ...formData, packConfiguration: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Initial Battery Health */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#10201B]">
              Step 2: Initial Factory Calibration & Baseline Health
            </h2>
            <p className="text-xs text-[#62756E]">
              Recorded during factory end-of-line (EOL) test bench commissioning.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                <label className="block text-[11px] font-semibold text-[#62756E] mb-1">
                  Initial State of Health (SOH)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.initialSOH}
                    onChange={e => setFormData({ ...formData, initialSOH: Number(e.target.value) })}
                    className="w-24 px-3 py-1.5 rounded-lg border border-[#DDE7E2] bg-white font-mono font-bold text-sm"
                  />
                  <span className="text-xs font-bold text-[#137A58]">% (Nominal 100%)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                <label className="block text-[11px] font-semibold text-[#62756E] mb-1">
                  Factory State of Charge (SOC)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={formData.initialSOC}
                    onChange={e => setFormData({ ...formData, initialSOC: Number(e.target.value) })}
                    className="w-24 px-3 py-1.5 rounded-lg border border-[#DDE7E2] bg-white font-mono font-bold text-sm"
                  />
                  <span className="text-xs text-[#62756E]">% Storage Charge</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                <label className="block text-[11px] font-semibold text-[#62756E] mb-1">
                  Calibrated OCV Voltage
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.initialVoltage}
                    onChange={e => setFormData({ ...formData, initialVoltage: Number(e.target.value) })}
                    className="w-24 px-3 py-1.5 rounded-lg border border-[#DDE7E2] bg-white font-mono font-bold text-sm"
                  />
                  <span className="text-xs text-[#62756E]">Volts (51.2V Nominal)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2]">
                <label className="block text-[11px] font-semibold text-[#62756E] mb-1">
                  Ambient Test Temperature
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.initialTemp}
                    onChange={e => setFormData({ ...formData, initialTemp: Number(e.target.value) })}
                    className="w-24 px-3 py-1.5 rounded-lg border border-[#DDE7E2] bg-white font-mono font-bold text-sm"
                  />
                  <span className="text-xs text-[#62756E]">°C Ambient</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Create ReVoltX ID */}
        {step === 3 && (
          <div className="space-y-4 text-center py-4">
            <div className="p-3 rounded-2xl bg-[#DDF5EA] text-[#137A58] w-fit mx-auto">
              <Cpu className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-[#10201B]">
              Step 3: Generating Universal ReVoltX ID
            </h2>
            <p className="text-xs text-[#62756E] max-w-md mx-auto">
              ReVoltX assigns an immutable global identifier linking this physical asset to our continuous intelligence graph.
            </p>

            <div className="p-5 rounded-2xl bg-[#F0F5F2] border border-[#DDE7E2] max-w-sm mx-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#62756E] block">
                Assigned Universal Identifier
              </span>
              <p className="text-2xl font-bold font-mono text-[#137A58] mt-1">
                {generatedId}
              </p>
              <span className="text-[11px] text-[#62756E] mt-1 block">
                Manufacturer: {formData.manufacturerName}
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: Create Digital Battery Passport */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#137A58]" />
              <h2 className="text-base font-bold text-[#10201B]">
                Step 4: Minting Digital Battery Passport
              </h2>
            </div>
            <p className="text-xs text-[#62756E]">
              Creating EU Battery Regulation (EU 2023/1542) compliant data structures.
            </p>

            <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#DDE7E2]">
                <span className="text-[#62756E]">Passport Authority</span>
                <span className="font-semibold text-[#10201B]">ReVoltX Universal Registry</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DDE7E2]">
                <span className="text-[#62756E]">Carbon Footprint Benchmark</span>
                <span className="font-mono text-[#10201B]">62.4 kg CO₂e / kWh</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DDE7E2]">
                <span className="text-[#62756E]">Recyclability Target</span>
                <span className="font-mono text-[#137A58] font-bold">96.4% Critical Minerals</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#62756E]">Cryptographic Seal</span>
                <span className="font-mono text-[11px] text-[#137A58]">SHA-256 Validated</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Generate QR Code */}
        {step === 5 && (
          <div className="space-y-4 text-center py-2">
            <h2 className="text-base font-bold text-[#10201B]">
              Step 5: Generating Persistent Physical QR Code
            </h2>
            <p className="text-xs text-[#62756E] max-w-sm mx-auto">
              Laser-etched onto pack housing. Any smartphone, technician or recycler can scan to inspect permitted passport data.
            </p>

            <div className="max-w-xs mx-auto">
              <QRCodeWidget 
                batteryId={generatedId} 
                revoltXId={generatedId} 
                size={160} 
                showScanAction={false} 
              />
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation Celebration */}
        {step === 6 && (
          <div className="space-y-5 text-center py-4">
            <div className="p-3 rounded-full bg-[#DDF5EA] text-[#137A58] w-fit mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
                Success
              </span>
              <h2 className="text-2xl font-bold text-[#10201B]">
                Battery successfully registered with ReVoltX.
              </h2>
              <p className="text-xs text-[#62756E] max-w-md mx-auto">
                Asset <strong className="text-[#10201B] font-mono">{generatedId}</strong> is now live in the unified ReVoltX database and accessible across all portals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F0F5F2] border border-[#DDE7E2] max-w-md mx-auto text-xs space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-[#62756E]">Battery ID:</span>
                <span className="font-mono font-bold text-[#10201B]">{generatedId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#62756E]">Serial:</span>
                <span className="font-mono text-[#10201B]">{formData.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#62756E]">Initial Health:</span>
                <span className="font-mono text-[#137A58] font-bold">100% SOH (RX Score 98)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#62756E]">Passport URL:</span>
                <span className="font-mono text-[#137A58]">/battery/{generatedId}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/battery/${generatedId}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>Open Digital Battery Passport</span>
              </Link>
              <Link
                href="/manufacturer/batteries"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-[#10201B] text-xs font-semibold hover:bg-[#F0F5F2] border border-[#DDE7E2] transition-colors"
              >
                <span>Return to Fleet Catalog</span>
              </Link>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation (Steps 1 to 5) */}
        {step < 6 && (
          <div className="pt-6 mt-6 border-t border-[#DDE7E2] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#62756E] hover:text-[#10201B] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
            >
              <span>{step === 5 ? 'Confirm & Register Battery' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
