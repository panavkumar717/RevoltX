'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity, Cpu } from 'lucide-react';

interface RXScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const RXScoreGauge: React.FC<RXScoreGaugeProps> = ({
  score,
  size = 'md',
  showDetails = true
}) => {
  // Radius and dimensions
  const dimensions = {
    sm: { size: 100, strokeWidth: 8, fontSize: 'text-2xl', labelSize: 'text-[10px]' },
    md: { size: 140, strokeWidth: 10, fontSize: 'text-4xl', labelSize: 'text-xs' },
    lg: { size: 180, strokeWidth: 12, fontSize: 'text-5xl', labelSize: 'text-sm' }
  }[size];

  const radius = (dimensions.size - dimensions.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 85) return '#137A58'; // Primary Brand Green
    if (val >= 70) return '#21A879'; // Secondary Green
    if (val >= 50) return '#D89A24'; // Warning
    return '#D94B4B';               // Critical
  };

  const getRatingLabel = (val: number) => {
    if (val >= 90) return 'Optimal Health';
    if (val >= 75) return 'Solid Fleet Grade';
    if (val >= 60) return 'Second-Life Qualified';
    if (val >= 45) return 'Attention Required';
    return 'End of Life / Recycling';
  };

  const currentColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ width: dimensions.size, height: dimensions.size }}>
        <svg className="transform -rotate-90" width={dimensions.size} height={dimensions.size}>
          {/* Background track */}
          <circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            className="stroke-[#DDE7E2] dark:stroke-[#1E382D]"
            strokeWidth={dimensions.strokeWidth}
            fill="none"
          />
          {/* Animated active progress */}
          <motion.circle
            cx={dimensions.size / 2}
            cy={dimensions.size / 2}
            r={radius}
            stroke={currentColor}
            strokeWidth={dimensions.strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            className={`font-mono font-bold tracking-tight text-[#10201B] ${dimensions.fontSize}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {score}
          </motion.span>
          <span className={`font-semibold uppercase tracking-wider text-[#62756E] ${dimensions.labelSize}`}>
            RX SCORE
          </span>
        </div>
      </div>

      <div className="mt-2 text-center">
        <span 
          className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold"
          style={{ backgroundColor: `${currentColor}15`, color: currentColor }}
        >
          {getRatingLabel(score)}
        </span>
      </div>

      {showDetails && size !== 'sm' && (
        <div className="mt-4 w-full grid grid-cols-2 gap-2 text-left">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F0F5F2] border border-[#DDE7E2]">
            <Activity className="w-3.5 h-3.5 text-[#137A58]" />
            <div>
              <p className="text-[10px] text-[#62756E]">Cell Balance</p>
              <p className="text-xs font-semibold text-[#10201B] font-mono">98.4%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F0F5F2] border border-[#DDE7E2]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#21A879]" />
            <div>
              <p className="text-[10px] text-[#62756E]">Thermal Margin</p>
              <p className="text-xs font-semibold text-[#10201B] font-mono">38.4°C Safe</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F0F5F2] border border-[#DDE7E2]">
            <Zap className="w-3.5 h-3.5 text-[#D89A24]" />
            <div>
              <p className="text-[10px] text-[#62756E]">Degradation Slope</p>
              <p className="text-xs font-semibold text-[#10201B] font-mono">-0.018%/cyc</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F0F5F2] border border-[#DDE7E2]">
            <Cpu className="w-3.5 h-3.5 text-[#137A58]" />
            <div>
              <p className="text-[10px] text-[#62756E]">2nd Life Index</p>
              <p className="text-xs font-semibold text-[#10201B] font-mono">A- Grade</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
