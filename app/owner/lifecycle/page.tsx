'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  GitCommit, 
  ArrowRight, 
  ShoppingBag, 
  RefreshCw, 
  Recycle, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  Wrench,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { LifecycleTimeline } from '../../../components/ui/LifecycleTimeline';

export default function OwnerLifecyclePage() {
  const { getBattery, createServiceRequest, updateBattery } = useReVoltX();
  const battery = getBattery('RX-2026-892738')!;

  // Check if customer has requested diagnosis
  const [hasDiagnosisRequested, setHasDiagnosisRequested] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('revoltx_sarah_diagnosis_requested');
      if (stored === 'true') {
        setHasDiagnosisRequested(true);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const handleRequestDiagnosis = () => {
    setIsRequesting(true);

    // 1. Dispatch a service request to Operations Fleet Dispatch
    createServiceRequest({
      batteryId: battery.revoltXId,
      customerName: 'Sarah Jenkins',
      phone: '+1 (555) 392-8819',
      address: '742 Evergreen Terrace, Sector 4, Silicon District',
      issue: 'Customer requested on-site Smart Battery Dock electrochemical impedance diagnostic (NASA ARC B0005, 71.4% SOH).'
    });

    // 2. Update battery lifecycle stage to ASSESSMENT and append lifecycle event
    updateBattery(
      battery.id,
      { lifecycleStage: 'ASSESSMENT' },
      'Hardware Smart Dock Diagnostic Requested',
      'Customer Sarah Jenkins initiated Smart Battery Dock assessment. Mobile van assigned for impedance test.'
    );

    // 3. Persist state and update timeline
    try {
      localStorage.setItem('revoltx_sarah_diagnosis_requested', 'true');
    } catch {
      // Storage fallback
    }

    setHasDiagnosisRequested(true);
    setIsRequesting(false);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleResetToFirstLife = () => {
    try {
      localStorage.removeItem('revoltx_sarah_diagnosis_requested');
    } catch {
      // Storage fallback
    }

    updateBattery(
      battery.id,
      { lifecycleStage: 'FIRST_LIFE' },
      'Reset to First Life Stage',
      'Timeline reset to First Life phase.'
    );

    setHasDiagnosisRequested(false);
  };

  // When diagnosis has NOT been requested, filter events to only show up to First Life
  const visibleEvents = hasDiagnosisRequested 
    ? [
        ...battery.lifecycleEvents,
        // Ensure an assessment event is present for the diagnostic milestone
        ...(!battery.lifecycleEvents.some(e => e.stage === 'ASSESSMENT') ? [{
          id: 'evt-diag-active',
          stage: 'ASSESSMENT' as const,
          title: 'Smart Battery Dock Deep Hardware Diagnostic Scheduled',
          description: 'On-site diagnostic requested by customer Sarah Jenkins. Mobile van dispatched for impedance spectroscopy.',
          timestamp: new Date().toISOString(),
          actor: 'Sarah Jenkins (Customer Request)',
          location: '742 Evergreen Terrace, Silicon District'
        }] : [])
      ]
    : battery.lifecycleEvents.filter(e => 
        e.stage === 'MANUFACTURED' || 
        e.stage === 'REGISTERED' || 
        e.stage === 'FIRST_LIFE'
      );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Circular Economy Transparency
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Your Battery&apos;s Next Journey
          </h1>
          <p className="text-xs text-[#62756E]">
            At ReVoltX, your battery never gets thrown away. Its digital identity and materials are preserved forever.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasDiagnosisRequested && (
            <button
              type="button"
              onClick={handleResetToFirstLife}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#DDE7E2] bg-white text-xs font-semibold text-[#62756E] hover:text-[#10201B] hover:bg-[#F0F5F2] transition-colors cursor-pointer"
              title="Reset timeline back to First Life only"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to First Life</span>
            </button>
          )}

          <Link
            href="/owner/marketplace"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Explore Replacements</span>
          </Link>
        </div>
      </div>

      {/* Replacement Notice Card */}
      <div className="p-6 rounded-3xl bg-[#FEF6E7] border border-[#F8E0B0] shadow-xs space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D89A24]">
            Approaching Mobility Threshold
          </span>
          <h3 className="text-lg font-bold text-[#10201B] mt-1">
            &quot;Your battery may require replacement in approximately 12 months.&quot;
          </h3>
          <p className="text-xs text-[#62756E] mt-1 leading-relaxed">
            With SOH at {battery.currentSOH}% and {battery.rul} cycles remaining in high-demand vehicle service, you will receive full trade-in value toward a certified replacement pack.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#F8E0B0] text-xs space-y-2">
          <h4 className="font-bold text-[#10201B]">What Happens When Your Old Battery is Removed?</h4>
          <p className="text-[#62756E] leading-relaxed">
            Your old battery continues to exist in the ReVoltX global database. It does <strong className="text-[#10201B]">NOT</strong> disappear. Its lifecycle record updates to <strong className="text-[#137A58]">Second Life (Solar Energy Storage)</strong>, delivering another 3 to 5 years of clean renewable power to solar microgrids.
          </p>
        </div>
      </div>

      {/* Lifecycle Flow Diagram Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE7E2] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DDE7E2]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#10201B]">
                Continuous Lifecycle Timeline for {battery.revoltXId}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                hasDiagnosisRequested
                  ? 'bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7]'
                  : 'bg-[#F0F5F2] text-[#62756E] border border-[#DDE7E2]'
              }`}>
                {hasDiagnosisRequested ? 'Hardware Diagnosis Active' : 'First Life Active'}
              </span>
            </div>
            <p className="text-xs text-[#62756E] mt-0.5">
              {hasDiagnosisRequested 
                ? 'Timeline updated with active Smart Battery Dock diagnostic evaluation and technician assignment.' 
                : 'Current timeline displays active First Life deployment. Request diagnosis below to unlock next stage.'}
            </p>
          </div>

          <div className="font-mono text-xs font-bold text-[#137A58] bg-[#F7FAF8] px-3 py-1.5 rounded-xl border border-[#DDE7E2]">
            {hasDiagnosisRequested ? 'Stage: Assessment' : 'Stage: First Life'}
          </div>
        </div>

        {/* The Lifecycle Timeline: only rendered until First Life unless diagnosis requested */}
        <LifecycleTimeline
          currentStage={hasDiagnosisRequested ? 'ASSESSMENT' : 'FIRST_LIFE'}
          events={visibleEvents}
          orientation="vertical"
          showDetails={true}
          maxStage={hasDiagnosisRequested ? 'ASSESSMENT' : 'FIRST_LIFE'}
        />

        {/* Dynamic Action Banner: Request Diagnosis OR Diagnosis Active Summary */}
        {!hasDiagnosisRequested ? (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#DDF5EA]/60 to-[#F0F5F2] border-2 border-[#137A58]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#137A58] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
                    Next Lifecycle Milestone
                  </span>
                  <span className="text-[10px] font-bold text-[#10201B] bg-white px-2 py-0.5 rounded border border-[#DDE7E2]">
                    Requires Customer Request
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#10201B] mt-0.5">
                  Request Smart Battery Dock Hardware Diagnosis
                </h4>
                <p className="text-xs text-[#62756E] mt-0.5 max-w-lg leading-relaxed">
                  Your pack has logged 616 cycles at {battery.currentSOH}% SOH. Request a certified on-site Smart Dock diagnostic test to update your lifecycle timeline and evaluate secondary life qualification.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRequestDiagnosis}
              disabled={isRequesting}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs shrink-0 transition-colors cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Wrench className="w-4 h-4" />
              <span>Request Battery Diagnosis</span>
            </button>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-[#DDF5EA] border-2 border-[#BBEAD7] space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#137A58] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#137A58] block">
                    Diagnostic Request Active
                  </span>
                  <h4 className="text-sm font-bold text-[#10201B]">
                    Timeline Updated to Smart Dock Assessment Phase
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/internal/service-requests"
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View in Operations Dispatch</span>
                </Link>

                <button
                  type="button"
                  onClick={handleResetToFirstLife}
                  className="px-3 py-2 rounded-xl border border-[#BBEAD7] bg-white text-xs font-semibold text-[#10201B] hover:bg-[#F0F5F2]"
                >
                  Reset
                </button>
              </div>
            </div>

            <p className="text-xs text-[#62756E] leading-relaxed">
              Customer Sarah Jenkins requested on-site Smart Battery Dock diagnostics. Mobile Service Van #02 is dispatched for impedance spectroscopy testing at 742 Evergreen Terrace.
            </p>
          </div>
        )}
      </div>

      {/* Environmental Contribution Card */}
      <div className="p-6 rounded-3xl bg-[#DDF5EA] border border-[#BBEAD7] flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Your Circular Impact
          </span>
          <h4 className="text-base font-bold text-[#10201B] mt-0.5">
            +3.5 Years of Clean Energy Buffer
          </h4>
          <p className="text-xs text-[#62756E] mt-1">
            By keeping this battery in the ReVoltX loop, you prevent 221 kg of raw mineral CO₂ emissions.
          </p>
        </div>

        <span className="text-3xl font-bold font-mono text-[#137A58] hidden sm:block">
          96.4% Recyclable
        </span>
      </div>
    </div>
  );
}
