'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  Recycle, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Flame, 
  Droplet, 
  QrCode, 
  Info,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../../components/ui/BatteryStatusBadge';

export default function CircularityRecyclingPage() {
  const { recyclingRecords, recordRecyclingMaterial, batteries } = useReVoltX();

  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedBatteryId, setSelectedBatteryId] = useState('RX-2023-119283');
  const [recyclerName, setRecyclerName] = useState('GreenLithium Closed-Loop Materials AG');
  const [lithiumKg, setLithiumKg] = useState(1.85);
  const [nickelKg, setNickelKg] = useState(8.60);
  const [cobaltKg, setCobaltKg] = useState(2.10);
  const [copperKg, setCopperKg] = useState(5.40);
  const [efficiency, setEfficiency] = useState(96.4);
  const [notes, setNotes] = useState('Low-acid hydrometallurgical loop extraction complete. 96.4% critical mineral recovery certified.');

  // Find batteries in RECYCLING or end-of-life stage
  const recyclingCandidates = batteries.filter(b => 
    b.lifecycleStage === 'RECYCLING' || 
    b.lifecycleStage === 'LIFECYCLE_CLOSED' ||
    b.currentSOH < 50
  );

  const handleRecordRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    recordRecyclingMaterial({
      batteryId: selectedBatteryId,
      recyclerName,
      status: 'Materials Recovered',
      lithiumRecoveryKg: Number(lithiumKg),
      nickelRecoveryKg: Number(nickelKg),
      cobaltRecoveryKg: Number(cobaltKg),
      copperRecoveryKg: Number(copperKg),
      aluminumRecoveryKg: 9.1,
      recoveryEfficiencyPct: Number(efficiency),
      notes
    });

    setShowLogModal(false);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D94B4B] bg-[#FDF0EE] px-2.5 py-0.5 rounded-full border border-[#F8C8C4]">
            Recycler Hub & Closed-Loop Metallurgy
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1.5">
            End-of-Life Battery Mineral Recovery
          </h1>
          <p className="text-xs text-[#62756E]">
            Hydrometallurgical extraction tracking for Lithium, Nickel, Cobalt, and Copper returning to cell manufacturing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowLogModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record Material Recovery</span>
        </button>
      </div>

      {/* Assumptions & Methodology Disclosure (Requirement 21) */}
      <div className="p-4 rounded-2xl bg-[#F0F5F2] border border-[#DDE7E2] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#137A58] shrink-0 mt-0.5" />
        <div className="text-xs text-[#62756E] leading-relaxed">
          <strong className="text-[#10201B]">Prototype Calculation Assumptions:</strong> Material yield estimates are calculated assuming standard NMC/LFP cathode bill-of-materials and 96.4% hydrometallurgical closed-loop recovery efficiency pursuant to EU Battery Regulation 2023/1542 Annex XII targets.
        </div>
      </div>

      {/* Recycling Candidates Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#10201B]">
          Recycling Candidates & Batch Queue
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Battery ID</th>
                <th className="pb-3 font-semibold">Chemistry</th>
                <th className="pb-3 font-semibold">Capacity</th>
                <th className="pb-3 font-semibold">SOH</th>
                <th className="pb-3 font-semibold">Recoverable Materials</th>
                <th className="pb-3 font-semibold">Lifecycle Stage</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {recyclingCandidates.map(b => (
                <tr key={b.id} className="hover:bg-[#F7FAF8] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">
                    <Link href={`/battery/${b.revoltXId}`} className="hover:text-[#137A58]">
                      {b.revoltXId}
                    </Link>
                  </td>
                  <td className="py-3.5 font-semibold text-[#10201B]">{b.chemistry}</td>
                  <td className="py-3.5 font-mono text-[#10201B]">{b.capacity} Ah</td>
                  <td className="py-3.5 font-mono font-bold text-[#D94B4B]">{b.currentSOH}%</td>
                  <td className="py-3.5">
                    <span className="text-[11px] text-[#10201B] font-medium">
                      ~1.8kg Li • ~8.6kg Ni • ~2.1kg Co
                    </span>
                  </td>
                  <td className="py-3.5">
                    <BatteryStatusBadge stage={b.lifecycleStage} size="sm" />
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBatteryId(b.revoltXId);
                        setShowLogModal(true);
                      }}
                      className="px-3 py-1 rounded-xl bg-[#F0F5F2] hover:bg-[#DDE7E2] text-[#10201B] font-semibold text-xs transition-colors"
                    >
                      Process Yield
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Critical Mineral Recovery Records */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#10201B]">
              Verified Closed-Loop Material Recovery Logs
            </h3>
            <p className="text-xs text-[#62756E]">
              Immutable chain-of-custody closing the circular battery loop.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#137A58] bg-[#DDF5EA] px-2.5 py-1 rounded-full">
            {recyclingRecords.length} Completed Batches
          </span>
        </div>

        <div className="space-y-4">
          {recyclingRecords.map(rec => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#10201B]">
                    Batch #{rec.id} • Target Battery: {rec.batteryId}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF5EA] text-[#137A58]">
                    {rec.status}
                  </span>
                </div>
                <span className="text-xs text-[#62756E] font-mono">
                  Processed: {rec.processedDate || rec.receivedDate}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE7E2]">
                  <span className="text-[10px] font-bold text-[#62756E] uppercase">Lithium (Li)</span>
                  <p className="font-mono font-bold text-sm text-[#10201B] mt-0.5">{rec.lithiumRecoveryKg} kg</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE7E2]">
                  <span className="text-[10px] font-bold text-[#62756E] uppercase">Nickel (Ni)</span>
                  <p className="font-mono font-bold text-sm text-[#10201B] mt-0.5">{rec.nickelRecoveryKg} kg</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE7E2]">
                  <span className="text-[10px] font-bold text-[#62756E] uppercase">Cobalt (Co)</span>
                  <p className="font-mono font-bold text-sm text-[#10201B] mt-0.5">{rec.cobaltRecoveryKg} kg</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE7E2]">
                  <span className="text-[10px] font-bold text-[#62756E] uppercase">Copper (Cu)</span>
                  <p className="font-mono font-bold text-sm text-[#10201B] mt-0.5">{rec.copperRecoveryKg} kg</p>
                </div>
              </div>

              <p className="text-xs text-[#62756E]">
                <strong className="text-[#10201B]">Process Notes: </strong> {rec.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Recording Material Recovery */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#DDE7E2] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE7E2]">
              <h3 className="font-bold text-base text-[#10201B]">
                Record Hydrometallurgical Extraction Yield
              </h3>
              <button 
                type="button" 
                onClick={() => setShowLogModal(false)}
                className="text-xs text-[#62756E]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleRecordRecovery} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#10201B] mb-1">Target Battery ID</label>
                <input
                  type="text"
                  value={selectedBatteryId}
                  onChange={e => setSelectedBatteryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] font-mono text-[#10201B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#10201B] mb-1">Lithium Yield (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={lithiumKg}
                    onChange={e => setLithiumKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#10201B] mb-1">Nickel Yield (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={nickelKg}
                    onChange={e => setNickelKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#10201B] mb-1">Cobalt Yield (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={cobaltKg}
                    onChange={e => setCobaltKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#10201B] mb-1">Copper Yield (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={copperKg}
                    onChange={e => setCopperKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#10201B] mb-1">Technical Notes & Purity Certification</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#DDE7E2] text-[#62756E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#137A58] text-white font-bold hover:bg-[#0E5B42]"
                >
                  Confirm & Close Circular Loop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
