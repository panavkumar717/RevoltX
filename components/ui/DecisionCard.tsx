import React, { useState } from 'react';
import { 
  ArrowRight, 
  Recycle, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Zap,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';
import { AIPredictionResult } from '../../lib/ai/rxEngine';

interface DecisionCardProps {
  decision: 'CONTINUE_USE' | 'SECOND_LIFE' | 'RECYCLE';
  recommendation: string;
  application?: string;
  soh: number;
  rul: number;
  rxScore: number;
  anomaly?: string;
  batteryId: string;
  predictionData?: AIPredictionResult | null;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
  decision,
  recommendation,
  application = 'Solar Energy Storage',
  soh,
  rul,
  rxScore,
  anomaly,
  batteryId,
  predictionData
}) => {
  const [showDetailedReasoning, setShowDetailedReasoning] = useState(false);

  const configs = {
    CONTINUE_USE: {
      title: 'Pathway: Continue First-Life Operation',
      badge: 'CONTINUE USE',
      bg: 'bg-[#DDF5EA]',
      border: 'border-[#BBEAD7]',
      textColor: 'text-[#137A58]',
      icon: CheckCircle2,
      description: 'Capacity retention and cell impedance satisfy high-stress mobility criteria. Continue regular duty with standard thermal monitoring.'
    },
    SECOND_LIFE: {
      title: 'Pathway: Secondary Life Assessment Candidate',
      badge: 'SECOND LIFE',
      bg: 'bg-[#F3F8E5]',
      border: 'border-[#DAECAE]',
      textColor: 'text-[#5D7C13]',
      icon: RefreshCw,
      description: `Potentially suitable for secondary-life assessment. Recommended target application: ${application}.`
    },
    RECYCLE: {
      title: 'Pathway: Closed-Loop Hydrometallurgical Recycling',
      badge: 'RECYCLE',
      bg: 'bg-[#FDF0EE]',
      border: 'border-[#F8C8C4]',
      textColor: 'text-[#D94B4B]',
      icon: Recycle,
      description: 'Structural degradation or internal resistance exceeds reuse safety envelope. Dispatch to certified recycler for critical mineral recovery (Lithium, Nickel, Cobalt).'
    }
  }[decision];

  const Icon = configs.icon;

  return (
    <div className={`rounded-3xl p-6 border ${configs.bg} ${configs.border} shadow-xs space-y-4`}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl bg-white shadow-xs ${configs.textColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#62756E]">
                ReVoltX AI Decision Engine
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-[#137A58] border border-black/10">
                <Sparkles className="w-3 h-3 text-[#137A58]" />
                {predictionData?.modelSignature || 'Gemini 2.5 Flash + Physics v4'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#10201B] mt-0.5">{configs.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {predictionData && (
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white shadow-2xs text-[#10201B]">
              {predictionData.confidence}% Confidence
            </span>
          )}
          <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-white shadow-xs border ${configs.textColor}`}>
            {configs.badge}
          </span>
        </div>
      </div>

      {/* Main recommendation text */}
      <div>
        <p className="text-sm font-medium text-[#10201B] leading-relaxed">
          {recommendation || configs.description}
        </p>

        {anomaly && (
          <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-white/80 border border-black/5 text-xs text-[#62756E]">
            <AlertCircle className="w-4 h-4 text-[#D89A24] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#10201B]">Diagnostic Note: </span>
              {anomaly}
            </div>
          </div>
        )}
      </div>

      {/* Probability Distribution Bar (if prediction data present) */}
      {predictionData && (
        <div className="p-3.5 rounded-2xl bg-white/90 border border-black/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#10201B] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#137A58]" />
              Classification Probabilities
            </span>
            <span className="text-[11px] font-mono text-[#62756E]">UL 1974 Thresholds</span>
          </div>

          <div className="h-3 w-full rounded-full bg-black/10 overflow-hidden flex">
            <div 
              style={{ width: `${predictionData.probabilities.continueUse}%` }} 
              className="bg-[#137A58] h-full" 
              title={`First Life: ${predictionData.probabilities.continueUse}%`}
            />
            <div 
              style={{ width: `${predictionData.probabilities.secondLife}%` }} 
              className="bg-[#5D7C13] h-full" 
              title={`Second Life: ${predictionData.probabilities.secondLife}%`}
            />
            <div 
              style={{ width: `${predictionData.probabilities.recycle}%` }} 
              className="bg-[#D94B4B] h-full" 
              title={`Recycle: ${predictionData.probabilities.recycle}%`}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1 font-mono">
            <span className="text-[#137A58] font-bold">1st Life: {predictionData.probabilities.continueUse}%</span>
            <span className="text-[#5D7C13] font-bold">2nd Life: {predictionData.probabilities.secondLife}%</span>
            <span className="text-[#D94B4B] font-bold">Recycle: {predictionData.probabilities.recycle}%</span>
          </div>
        </div>
      )}

      {/* Decision metrics summary */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-white/90 rounded-2xl border border-black/5 text-center">
        <div>
          <span className="text-[10px] text-[#62756E] uppercase font-semibold">Current SOH</span>
          <p className="text-base font-bold font-mono text-[#10201B]">{soh}%</p>
        </div>
        <div>
          <span className="text-[10px] text-[#62756E] uppercase font-semibold">Remaining Cycles</span>
          <p className="text-base font-bold font-mono text-[#10201B]">{rul}</p>
        </div>
        <div>
          <span className="text-[10px] text-[#62756E] uppercase font-semibold">RX Score</span>
          <p className="text-base font-bold font-mono text-[#137A58]">{rxScore}/100</p>
        </div>
      </div>

      {/* Expandable Gemini Reasoning */}
      {predictionData?.electrochemicalDiagnosis && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowDetailedReasoning(!showDetailedReasoning)}
            className="flex items-center justify-between w-full p-2.5 rounded-xl bg-white/60 hover:bg-white text-xs font-semibold text-[#10201B] transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#137A58]" />
              <span>Gemini Electrochemical Reasoning & Failure Mechanisms</span>
            </span>
            {showDetailedReasoning ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showDetailedReasoning && (
            <div className="mt-2 p-3.5 rounded-xl bg-white border border-black/5 space-y-2 text-xs animate-in fade-in duration-150">
              <p className="text-[#10201B] leading-relaxed">
                {predictionData.electrochemicalDiagnosis}
              </p>
              
              {predictionData.degradationMechanisms && predictionData.degradationMechanisms.length > 0 && (
                <div className="pt-2 border-t border-black/5">
                  <span className="text-[11px] font-bold text-[#62756E] block mb-1">
                    Identified Degradation Mechanisms:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {predictionData.degradationMechanisms.map((mech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#F0F5F2] text-[#10201B] text-[10px] font-medium border border-[#DDE7E2]">
                        {mech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Standards & Compliance Disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-[#62756E]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#137A58] shrink-0 mt-0.5" />
        <p>
          <strong>Regulatory Notice:</strong> AI predictions evaluate candidate suitability. Final physical repurposing requires compliant testing under UL 1974 and EU Battery Regulation (EU 2023/1542).
        </p>
      </div>

      {/* Direct Links based on decision */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/10">
        {decision === 'SECOND_LIFE' && (
          <Link
            href="/circularity/opportunities"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-semibold hover:bg-[#0E5B42] transition-colors"
          >
            View in Circularity Marketplace <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
        {decision === 'RECYCLE' && (
          <Link
            href="/circularity/recycling"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D94B4B] text-white text-xs font-semibold hover:bg-[#B93838] transition-colors"
          >
            Review Material Recovery Plan <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
        <Link
          href={`/battery/${batteryId}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#10201B] text-xs font-semibold hover:bg-[#F0F5F2] border border-[#DDE7E2] transition-colors"
        >
          Inspect Digital Passport <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
