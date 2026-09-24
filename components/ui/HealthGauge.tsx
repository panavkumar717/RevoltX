'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BatteryMedium, RefreshCw, Thermometer } from 'lucide-react';

interface HealthGaugeProps {
  soh: number;        // State of Health (0-100%)
  soc: number;        // State of Charge (0-100%)
  rul: number;        // Remaining Useful Life (cycles)
  temperature?: number;
  initialSOH?: number;
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({
  soh,
  soc,
  rul,
  temperature = 34.5,
  initialSOH = 100
}) => {
  const getSOHColor = (val: number) => {
    if (val >= 80) return '#0070F3';
    if (val >= 70) return '#38BDF8';
    if (val >= 55) return '#F59E0B';
    return '#EF4444';
  };

  const sohColor = getSOHColor(soh);

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#DDE7E2] shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#62756E]">
            Battery Health (SOH)
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-3xl font-bold font-mono text-[#10201B]">{soh}%</span>
            <span className="text-xs text-[#62756E]">from {initialSOH}% factory baseline</span>
          </div>
        </div>
        <div 
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: `${sohColor}15`, color: sohColor }}
        >
          {soh >= 80 ? 'Grade A (First-Life)' : soh >= 65 ? 'Grade B (Second-Life)' : 'Grade C (Recycle)'}
        </div>
      </div>

      {/* SOH Progress Bar */}
      <div className="w-full bg-[#F0F5F2] h-3 rounded-full overflow-hidden p-0.5 border border-[#DDE7E2]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: sohColor }}
          initial={{ width: 0 }}
          animate={{ width: `${soh}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>

      {/* Threshold markers */}
      <div className="flex justify-between text-[10px] text-[#62756E] mt-1.5 px-0.5 font-mono">
        <span>0%</span>
        <span className="text-[#EF4444]">40% Recycle</span>
        <span className="text-[#F59E0B]">70% 2nd Life</span>
        <span className="text-[#0070F3]">80% EV Gate</span>
        <span>100%</span>
      </div>

      {/* Sub metrics grid */}
      <div className="mt-5 grid grid-cols-3 gap-3 pt-4 border-t border-[#DDE7E2]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/10 text-[#0070F3]">
            <BatteryMedium className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-[#62756E]">Current SOC</p>
            <p className="text-sm font-bold font-mono text-[#10201B]">{soc}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#F0F5F2] text-[#0284C7]">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-[#62756E]">Remaining Life</p>
            <p className="text-sm font-bold font-mono text-[#10201B]">{rul} <span className="text-[10px] font-normal text-[#62756E]">cycles</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#FEF6E7] text-[#D89A24]">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-[#62756E]">Core Temp</p>
            <p className="text-sm font-bold font-mono text-[#10201B]">{temperature}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};
