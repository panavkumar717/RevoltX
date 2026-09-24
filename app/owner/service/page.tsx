'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  Wrench, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';

export default function OwnerServiceBookingPage() {
  const router = useRouter();
  const { createServiceRequest, serviceRequests } = useReVoltX();

  const [step, setStep] = useState(1);
  const [selectedBattery, setSelectedBattery] = useState('RX-2026-892738');
  const [selectedService, setSelectedService] = useState('On-Site Smart Dock Hardware Diagnostics');
  const [preferredDate, setPreferredDate] = useState('2026-09-24');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [address, setAddress] = useState('742 Evergreen Terrace, Sector 4, Silicon District');
  const [phone, setPhone] = useState('+1 (555) 392-8819');
  const [notes, setNotes] = useState('Vehicle runs warm during fast charging. Request full electrochemical impedance test.');
  const [completedRequest, setCompletedRequest] = useState<any>(null);

  const handleSubmit = () => {
    const req = createServiceRequest({
      batteryId: selectedBattery,
      customerName: 'Sarah Jenkins',
      phone,
      address,
      issue: `${selectedService}: ${notes}`
    });

    setCompletedRequest(req);
    setStep(5);

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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Certified Field Service
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Book Battery Health Check
          </h1>
          <p className="text-xs text-[#62756E]">
            A certified ReVoltX technician will visit with the portable Smart Battery Dock.
          </p>
        </div>

        <Link
          href="/owner"
          className="text-xs font-semibold text-[#62756E] hover:text-[#10201B]"
        >
          Cancel
        </Link>
      </div>

      {/* Stepper bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 text-xs font-medium">
        {[
          '1. Battery',
          '2. Service Type',
          '3. Date & Time',
          '4. Confirm Address',
          '5. Confirmed'
        ].map((lbl, idx) => {
          const sNum = idx + 1;
          const isPassed = sNum < step;
          const isCurrent = sNum === step;

          return (
            <div
              key={lbl}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
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

      {/* Card Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-sm">
        {/* STEP 1: Select Battery */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#10201B]">
              Step 1: Select Battery for Inspection
            </h2>
            <div className="p-4 rounded-2xl bg-[#DDF5EA] border border-[#137A58] flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-sm text-[#10201B]">
                  RX-2026-892738 (LFP 60Ah)
                </span>
                <p className="text-xs text-[#137A58] mt-0.5">
                  EcoRider V3 Courier • Current SOH: 72% • RX Score: 78
                </p>
              </div>
              <span className="h-5 w-5 rounded-full bg-[#137A58] text-white flex items-center justify-center text-xs">
                ✓
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: Select Service */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#10201B]">
              Step 2: Select Diagnostic Service
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: 'On-Site Smart Dock Hardware Diagnostics',
                  title: 'On-Site Smart Dock Hardware Diagnostic (Recommended)',
                  desc: 'Technician connects Smart Battery Dock to test cell voltage balance, internal resistance, and thermal curves.',
                  price: 'Included under warranty'
                },
                {
                  id: 'Deep Electrochemical Impedance & Ultrasound Scan',
                  title: 'Deep Electrochemical Impedance & Ultrasound Scan',
                  desc: 'Comprehensive multi-frequency EIS analysis for second-life qualification and trade-in valuation.',
                  price: '$45 Co-Pay'
                },
                {
                  id: 'Pre-Trade-in Certification Inspection',
                  title: 'Pre-Trade-in Certification Inspection',
                  desc: 'Official certified report to transfer battery into the Circularity Second-Life marketplace.',
                  price: 'Free with Replacement'
                }
              ].map(s => (
                <div
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedService === s.id
                      ? 'bg-[#DDF5EA] border-[#137A58] ring-2 ring-[#BBEAD7]'
                      : 'bg-[#F7FAF8] border-[#DDE7E2] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#10201B]">{s.title}</h4>
                    <span className="text-[11px] font-bold text-[#137A58]">{s.price}</span>
                  </div>
                  <p className="text-xs text-[#62756E] mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Choose Date & Time */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#10201B]">
              Step 3: Select Preferred Date & Time Window
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Preferred Appointment Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Time Slot
                </label>
                <select
                  value={preferredTime}
                  onChange={e => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs font-medium"
                >
                  <option value="09:00 AM">09:00 AM - 11:00 AM (Morning)</option>
                  <option value="11:30 AM">11:30 AM - 01:30 PM (Midday)</option>
                  <option value="02:30 PM">02:30 PM - 04:30 PM (Afternoon)</option>
                  <option value="05:00 PM">05:00 PM - 07:00 PM (Evening)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Confirm Address & Notes */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#10201B]">
              Step 4: Location & Contact Details
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Vehicle / Battery Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Contact Mobile Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201B] mb-1">
                  Notes for ReVoltX Technician
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Confirmed */}
        {step === 5 && (
          <div className="text-center py-4 space-y-4">
            <div className="p-3 rounded-full bg-[#DDF5EA] text-[#137A58] w-fit mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-[#10201B]">
              Health Check Booked Successfully!
            </h2>
            <p className="text-xs text-[#62756E] max-w-sm mx-auto">
              Your request <strong className="text-[#10201B] font-mono">{completedRequest?.id || 'SR-89201'}</strong> has been registered in the ReVoltX Operations Console.
            </p>

            <div className="p-4 rounded-2xl bg-[#F0F5F2] border border-[#DDE7E2] max-w-sm mx-auto text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-[#62756E]">Status:</span>
                <span className="font-bold text-[#137A58]">Requested (Priority Dispatch)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#62756E]">Scheduled Date:</span>
                <span className="font-mono text-[#10201B]">{preferredDate} at {preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#62756E]">Battery:</span>
                <span className="font-mono text-[#10201B]">{selectedBattery}</span>
              </div>
            </div>

            <div className="pt-3 flex justify-center gap-3">
              <Link
                href="/owner"
                className="px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42]"
              >
                Return to My Battery Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* Stepper Navigation buttons */}
        {step < 5 && (
          <div className="pt-6 mt-6 border-t border-[#DDE7E2] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#62756E] disabled:opacity-30"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <button
              type="button"
              onClick={() => {
                if (step < 4) setStep(prev => prev + 1);
                else handleSubmit();
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] transition-colors"
            >
              <span>{step === 4 ? 'Confirm & Book Appointment' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Past & Active Service Requests Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#10201B]">
          Your Service History & Active Appointments
        </h3>

        <div className="space-y-3">
          {serviceRequests
            .filter(r => r.customerName.includes('Sarah'))
            .map(r => (
              <div key={r.id} className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#10201B]">{r.id}</span>
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7]">
                      {r.status}
                    </span>
                  </div>
                  <p className="text-[#62756E] mt-1">{r.issue}</p>
                  {r.technicianName && (
                    <p className="text-[#137A58] font-semibold text-[11px] mt-0.5">
                      Technician Assigned: {r.technicianName}
                    </p>
                  )}
                </div>

                <div className="text-right text-[11px] text-[#62756E]">
                  <span>Requested: {new Date(r.requestedDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
