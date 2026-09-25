'use client';

import React from 'react';
import { Check, Clock, Radio } from 'lucide-react';
import { LifecycleStage, LifecycleEvent } from '../../lib/types';

interface LifecycleTimelineProps {
  currentStage: LifecycleStage;
  events?: LifecycleEvent[];
  orientation?: 'horizontal' | 'vertical';
  showDetails?: boolean;
  maxStage?: LifecycleStage;
}

const STAGES: { key: LifecycleStage; label: string; short: string; description: string }[] = [
  { key: 'MANUFACTURED', label: 'Manufacture', short: 'MFG', description: 'Cell assembly & QA' },
  { key: 'REGISTERED', label: 'Digital Identity', short: 'REG', description: 'Passport created' },
  { key: 'FIRST_LIFE', label: 'First Life', short: 'FL', description: 'Vehicle/Asset deployment' },
  { key: 'HEALTH_MONITORING', label: 'Monitoring', short: 'MON', description: 'Continuous IoT telemetry' },
  { key: 'ASSESSMENT', label: 'Smart Dock Assessment', short: 'ASM', description: 'Deep hardware diagnostic' },
  { key: 'CONTINUE_USE', label: 'Continue / Decision', short: 'DEC', description: 'AI lifecycle routing' },
  { key: 'SECOND_LIFE', label: 'Second Life', short: '2L', description: 'Stationary energy storage' },
  { key: 'RECYCLING', label: 'Recycling', short: 'REC', description: 'Critical mineral recovery' },
  { key: 'LIFECYCLE_CLOSED', label: 'Circular Closed', short: 'CLS', description: 'Materials returned to loop' }
];

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({
  currentStage,
  events = [],
  orientation = 'horizontal',
  showDetails = true,
  maxStage
}) => {
  const maxIdx = maxStage ? STAGES.findIndex(s => s.key === maxStage) : STAGES.length - 1;
  const stagesToRender = maxIdx >= 0 ? STAGES.slice(0, maxIdx + 1) : STAGES;
  const currentIndex = stagesToRender.findIndex(s => s.key === currentStage);
  const effectiveCurrentIndex = currentIndex >= 0 ? currentIndex : stagesToRender.length - 1;

  if (orientation === 'vertical') {
    return (
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE7E2]">
        {stagesToRender.map((stage, idx) => {
          const isPassed = idx < effectiveCurrentIndex;
          const isCurrent = idx === effectiveCurrentIndex;
          const matchingEvent = events.find(e => e.stage === stage.key);

          return (
            <div key={stage.key} className="relative group">
              <div 
                className={`absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                  isCurrent 
                    ? 'border-[#137A58] bg-white ring-4 ring-[#DDF5EA]' 
                    : isPassed 
                    ? 'border-[#137A58] bg-[#137A58] text-white' 
                    : 'border-[#DDE7E2] bg-white text-[#A0AEC0]'
                }`}
              >
                {isPassed ? (
                  <Check className="h-3 w-3 stroke-[3]" />
                ) : isCurrent ? (
                  <span className="h-2 w-2 rounded-full bg-[#137A58] animate-pulse" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DDE7E2]" />
                )}
              </div>

              <div className="pt-0.5">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-semibold ${isCurrent ? 'text-[#137A58]' : isPassed ? 'text-[#10201B]' : 'text-[#62756E]'}`}>
                    {stage.label}
                  </h4>
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#DDF5EA] px-2 py-0.5 text-[10px] font-semibold text-[#137A58]">
                      <Radio className="w-2.5 h-2.5 animate-pulse" /> Active Stage
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#62756E] mt-0.5">{stage.description}</p>

                {matchingEvent && showDetails && (
                  <div className="mt-2 rounded-lg bg-[#F0F5F2] p-2.5 text-xs border border-[#DDE7E2]">
                    <div className="flex items-center justify-between text-[#10201B] font-medium">
                      <span>{matchingEvent.title}</span>
                      <span className="text-[10px] text-[#62756E] font-mono">
                        {new Date(matchingEvent.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#62756E] text-[11px] mt-1">{matchingEvent.description}</p>
                    {matchingEvent.actor && (
                      <p className="text-[10px] text-[#137A58] font-mono mt-1">Verified: {matchingEvent.actor}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal Stepper
  return (
    <div className="w-full">
      {/* Stepper bar */}
      <div className="overflow-x-auto pb-3">
        <div className="min-w-[760px] flex items-center justify-between relative px-2">
          {/* Connecting line */}
          <div className="absolute left-8 right-8 top-4 h-0.5 bg-[#DDE7E2] -z-0" />
          <div 
            className="absolute left-8 top-4 h-0.5 bg-[#137A58] transition-all duration-700 -z-0" 
            style={{ width: `${Math.max(0, (effectiveCurrentIndex / Math.max(1, stagesToRender.length - 1)) * 100)}%` }}
          />

          {stagesToRender.map((stage, idx) => {
            const isPassed = idx < effectiveCurrentIndex;
            const isCurrent = idx === effectiveCurrentIndex;
            const isUpcoming = idx > effectiveCurrentIndex;

            return (
              <div key={stage.key} className="relative z-10 flex flex-col items-center text-center group cursor-default">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                    isCurrent
                      ? 'border-[#137A58] bg-white text-[#137A58] ring-4 ring-[#DDF5EA] shadow-xs'
                      : isPassed
                      ? 'border-[#137A58] bg-[#137A58] text-white'
                      : 'border-[#DDE7E2] bg-white text-[#62756E]'
                  }`}
                >
                  {isPassed ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-[#137A58] animate-pulse" />
                  ) : (
                    <span className="text-[10px] font-mono font-medium">{idx + 1}</span>
                  )}
                </div>

                <div className="mt-2 flex flex-col items-center">
                  <span className={`text-[11px] font-semibold ${isCurrent ? 'text-[#137A58]' : isPassed ? 'text-[#10201B]' : 'text-[#62756E]'}`}>
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-[#62756E] max-w-[85px] leading-tight">
                    {stage.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detail Banner */}
      {showDetails && (
        <div className="mt-4 p-4 rounded-xl bg-[#F0F5F2] border border-[#DDE7E2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#DDF5EA] text-[#137A58]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#62756E]">Current Lifecycle Phase</span>
                <span className="text-xs font-bold text-[#137A58] bg-white px-2 py-0.5 rounded border border-[#DDE7E2]">
                  {stagesToRender[effectiveCurrentIndex]?.label || currentStage}
                </span>
              </div>
              <p className="text-sm font-medium text-[#10201B] mt-0.5">
                {stagesToRender[effectiveCurrentIndex]?.description || 'Continuous tracking active.'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#62756E] block">Lifecycle Progress</span>
            <span className="text-sm font-bold font-mono text-[#137A58]">
              {Math.round(((effectiveCurrentIndex + 1) / stagesToRender.length) * 100)}% Complete
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
