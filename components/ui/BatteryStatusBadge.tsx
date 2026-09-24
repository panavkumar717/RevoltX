import React from 'react';
import { LifecycleStage, RiskLevel } from '../../lib/types';

interface BatteryStatusBadgeProps {
  stage?: LifecycleStage;
  risk?: RiskLevel;
  status?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BatteryStatusBadge: React.FC<BatteryStatusBadgeProps> = ({
  stage,
  risk,
  status,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-medium'
  }[size];

  if (risk) {
    const riskStyles = {
      Low: 'bg-[#DDF5EA] text-[#137A58] border-[#BBEAD7]',
      Moderate: 'bg-[#FEF6E7] text-[#D89A24] border-[#F8E0B0]',
      High: 'bg-[#FDF0EE] text-[#D94B4B] border-[#F8C8C4]',
      Critical: 'bg-[#7F1D1D] text-white border-transparent'
    }[risk];

    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${riskStyles} ${sizeClasses}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${risk === 'Low' ? 'bg-[#137A58]' : risk === 'Moderate' ? 'bg-[#D89A24]' : 'bg-[#D94B4B]'}`} />
        {risk} Risk
      </span>
    );
  }

  if (stage) {
    const stageMap: Record<LifecycleStage, { label: string; bg: string; text: string; border: string }> = {
      MANUFACTURED: { label: 'Manufactured', bg: 'bg-[#F0F5F2]', text: '#62756E', border: 'border-[#DDE7E2]' },
      REGISTERED: { label: 'Passport Minted', bg: 'bg-[#EBF3FB]', text: '#4386C5', border: 'border-[#C8DFEF]' },
      FIRST_LIFE: { label: 'First Life (Active)', bg: 'bg-[#DDF5EA]', text: '#137A58', border: 'border-[#BBEAD7]' },
      HEALTH_MONITORING: { label: 'Health Monitoring', bg: 'bg-[#EBF7F3]', text: '#21A879', border: 'border-[#C5ECD9]' },
      ASSESSMENT: { label: 'Smart Dock Assessment', bg: 'bg-[#FEF6E7]', text: '#D89A24', border: 'border-[#F8E0B0]' },
      CONTINUE_USE: { label: 'Continue Use Approved', bg: 'bg-[#DDF5EA]', text: '#137A58', border: 'border-[#BBEAD7]' },
      SECOND_LIFE: { label: 'Second Life (Repurposed)', bg: 'bg-[#F3F8E5]', text: '#5D7C13', border: 'border-[#DAECAE]' },
      RECYCLING: { label: 'Recycling In Progress', bg: 'bg-[#FDF0EE]', text: '#D94B4B', border: 'border-[#F8C8C4]' },
      LIFECYCLE_CLOSED: { label: 'Closed Loop Recycled', bg: 'bg-[#EAEAEA]', text: '#4B5563', border: 'border-[#D1D5DB]' }
    };

    const config = stageMap[stage] || stageMap.FIRST_LIFE;

    return (
      <span 
        className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${config.bg} ${config.border} ${sizeClasses}`}
        style={{ color: config.text }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.text }} />
        {config.label}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-[#F0F5F2] text-[#10201B] border border-[#DDE7E2] ${sizeClasses}`}>
      {status || 'Active'}
    </span>
  );
};
