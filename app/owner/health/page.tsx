'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
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
  CheckCircle2,
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { RXScoreGauge } from '../../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../../components/ui/HealthGauge';
import { TelemetryChart } from '../../../components/ui/TelemetryChart';
import MagicBento, { MagicBentoCardItem } from '../../../components/ui/MagicBento';

export default function OwnerHealthPage() {
  const { getBattery, createServiceRequest } = useReVoltX();
  const battery = getBattery('RX-2026-892738')!;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [phone, setPhone] = useState('+1 (555) 392-8819');
  const [address, setAddress] = useState('742 Evergreen Terrace, Sector 4, Silicon District');
  const [preferredDate, setPreferredDate] = useState('2026-09-26');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('Routine on-site Smart Dock validation for NASA ARC B0005 cell matrix (71.4% SOH).');
  const [bookedRequest, setBookedRequest] = useState<any>(null);

  const handleBookCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const req = createServiceRequest({
      batteryId: battery.revoltXId,
      customerName,
      phone,
      address,
      issue: `Owner Health Check Diagnostics: ${notes} (Preferred: ${preferredDate} at ${preferredTime})`
    });

    setBookedRequest(req);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

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

        <button
          type="button"
          onClick={() => {
            setBookedRequest(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Book Health Check</span>
        </button>
      </div>

      {/* Interactive Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#DDE7E2] shadow-2xl relative space-y-5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#62756E] hover:text-[#10201B] hover:bg-[#F0F5F2]"
            >
              <X className="w-5 h-5" />
            </button>

            {bookedRequest ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#DDF5EA] text-[#137A58] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#10201B]">
                  Health Check Confirmed!
                </h3>
                <p className="text-xs text-[#62756E] max-w-sm mx-auto">
                  Request <strong className="font-mono text-[#137A58]">{bookedRequest.id}</strong> for <strong className="text-[#10201B]">{customerName}</strong> (Battery <strong className="font-mono">{battery.revoltXId}</strong>) has been logged directly into ReVoltX Operations dispatch.
                </p>

                <div className="p-3 bg-[#F7FAF8] rounded-xl border border-[#DDE7E2] text-xs text-left space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Customer Name:</span>
                    <span className="font-bold text-[#10201B]">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Battery Target:</span>
                    <span className="font-mono font-bold text-[#137A58]">{battery.revoltXId} (NASA B0005)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Scheduled Time:</span>
                    <span className="font-semibold text-[#10201B]">{preferredDate} • {preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62756E]">Assigned Van:</span>
                    <span className="font-semibold text-[#10201B]">Mobile Smart Dock #02 (Marco Vance)</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <Link
                    href="/internal/service-requests"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] transition-colors"
                  >
                    View in Operations Service Queue →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#DDE7E2] text-xs font-semibold text-[#10201B] hover:bg-[#F0F5F2]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookCheck} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
                    Certified Field Diagnostics
                  </span>
                  <h3 className="text-xl font-bold text-[#10201B] mt-0.5">
                    Schedule On-Site Smart Dock Inspection
                  </h3>
                  <p className="text-xs text-[#62756E]">
                    A technician will test your pack with portable electrochemical impedance spectroscopy.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#DDF5EA] border border-[#BBEAD7] text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#137A58] font-bold uppercase">Connected Battery</span>
                    <p className="font-mono font-bold text-[#10201B]">{battery.revoltXId} (NASA ARC B0005)</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#137A58] font-bold uppercase">Current SOH</span>
                    <p className="font-mono font-bold text-[#137A58]">{battery.currentSOH}% (RX {battery.rxScore}/100)</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#10201B] mb-1">Customer / Vehicle Owner Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#62756E] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#10201B] mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#62756E] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#10201B] mb-1">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#62756E] absolute left-3 top-2.5" />
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={e => setPreferredDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#10201B] mb-1">Service Location / Address</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#62756E] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#62756E] hover:text-[#10201B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs cursor-pointer"
                  >
                    Confirm & Dispatch Health Check
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
