import React from 'react';
import { ArrowRight, Recycle, RefreshCw, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface DecisionCardProps {
  decision: 'CONTINUE_USE' | 'SECOND_LIFE' | 'RECYCLE';
  recommendation: string;
  application?: string;
  soh: number;
  rul: number;
  rxScore: number;
  anomaly?: string;
  batteryId: string;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
  decision,
  recommendation,
  application = 'Solar Energy Storage',
  soh,
  rul,
  rxScore,
  anomaly,
  batteryId
}) => {
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
    <div className={`rounded-2xl p-6 border ${configs.bg} ${configs.border} shadow-xs`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-white shadow-xs ${configs.textColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#62756E]">
              ReVoltX AI Decision Engine
            </span>
            <h3 className="text-lg font-bold text-[#10201B]">{configs.title}</h3>
          </div>
        </div>

        <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-white shadow-xs border ${configs.textColor}`}>
          {configs.badge}
        </span>
      </div>

      <div className="mt-4">
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

      {/* Decision metrics summary */}
      <div className="mt-4 grid grid-cols-3 gap-2 p-3 bg-white/90 rounded-xl border border-black/5 text-center">
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

      {/* Standards & Compliance Disclaimer */}
      <div className="mt-4 flex items-start gap-2 text-[11px] text-[#62756E]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#137A58] shrink-0 mt-0.5" />
        <p>
          <strong>Qualification Notice:</strong> Algorithmic recommendations indicate candidate eligibility. Actual secondary deployment requires physical compliance testing under UL 1974 / IEC 62933 standards prior to operational deployment.
        </p>
      </div>

      {/* Direct Links based on decision */}
      <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-black/10">
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
