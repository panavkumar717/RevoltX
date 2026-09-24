'use client';

import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { TelemetryPoint } from '../../lib/types';
import { Activity, Thermometer, Zap, Gauge } from 'lucide-react';

interface TelemetryChartProps {
  data?: TelemetryPoint[];
  title?: string;
}

const DEFAULT_POINTS: TelemetryPoint[] = [
  { timestamp: '14:00', voltage: 52.8, current: 12.1, temperature: 34.2, soc: 89, power: 638.8 },
  { timestamp: '14:10', voltage: 52.5, current: 14.0, temperature: 35.0, soc: 88, power: 735.0 },
  { timestamp: '14:20', voltage: 52.1, current: 17.5, temperature: 36.2, soc: 86, power: 911.7 },
  { timestamp: '14:30', voltage: 51.9, current: 19.8, temperature: 37.1, soc: 85, power: 1027.6 },
  { timestamp: '14:40', voltage: 51.6, current: 21.2, temperature: 38.0, soc: 84, power: 1093.9 },
  { timestamp: '14:50', voltage: 51.4, current: 22.4, temperature: 38.8, soc: 83, power: 1151.3 },
  { timestamp: '15:00', voltage: 51.2, current: 18.2, temperature: 38.4, soc: 84, power: 931.8 }
];

export const TelemetryChart: React.FC<TelemetryChartProps> = ({
  data = DEFAULT_POINTS,
  title = 'Live Telemetry Waveform'
}) => {
  const [metric, setMetric] = useState<'voltage' | 'current' | 'temperature' | 'power'>('voltage');

  const configs = {
    voltage: {
      label: 'Voltage',
      unit: 'V',
      color: '#0070F3',
      fill: 'rgba(0, 112, 243, 0.15)',
      icon: Gauge,
      domain: ['dataMin - 1', 'dataMax + 1'] as [string, string]
    },
    current: {
      label: 'Current',
      unit: 'A',
      color: '#6366F1',
      fill: 'rgba(99, 102, 241, 0.15)',
      icon: Zap,
      domain: [0, 'dataMax + 5'] as [number, string]
    },
    temperature: {
      label: 'Temperature',
      unit: '°C',
      color: '#D89A24',
      fill: '#FEF6E7',
      icon: Thermometer,
      domain: ['dataMin - 2', 'dataMax + 2'] as [string, string]
    },
    power: {
      label: 'Power',
      unit: 'W',
      color: '#4386C5',
      fill: '#EBF3FB',
      icon: Activity,
      domain: [0, 'dataMax + 100'] as [number, string]
    }
  };

  const activeConfig = configs[metric];
  const Icon = activeConfig.icon;

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#DDE7E2] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DDE7E2] gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#62756E]">
            Electrochemical Diagnostic Stream
          </span>
          <h3 className="text-base font-bold text-[#10201B] flex items-center gap-2 mt-0.5">
            <Icon className="w-4 h-4" style={{ color: activeConfig.color }} />
            {title} ({activeConfig.label})
          </h3>
        </div>

        {/* Metric Selector Pills */}
        <div className="flex items-center gap-1 bg-[#F0F5F2] p-1 rounded-xl border border-[#DDE7E2]">
          {(['voltage', 'current', 'temperature', 'power'] as const).map(key => {
            const isSelected = metric === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMetric(key)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  isSelected 
                    ? 'bg-white text-[#10201B] shadow-xs border border-[#DDE7E2]' 
                    : 'text-[#62756E] hover:text-[#10201B]'
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeConfig.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={activeConfig.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAEFEF" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fontSize: 11, fill: '#62756E' }} 
              axisLine={{ stroke: '#DDE7E2' }}
              tickLine={false}
            />
            <YAxis 
              domain={activeConfig.domain}
              tick={{ fontSize: 11, fill: '#62756E', fontFamily: 'monospace' }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2.5 rounded-xl shadow-md border border-[#DDE7E2] text-xs">
                      <p className="text-[#62756E] font-mono text-[10px] mb-1">{label}</p>
                      <p className="font-bold font-mono text-sm" style={{ color: activeConfig.color }}>
                        {payload[0].value} {activeConfig.unit}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={activeConfig.color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#grad-${metric})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#62756E] pt-3 border-t border-[#DDE7E2]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: activeConfig.color }} />
          <span>Real-time Dock Telemetry buffer</span>
        </div>
        <span className="font-mono text-[11px]">Sampling: 250ms • Synchronized to ReVoltX Cloud</span>
      </div>
    </div>
  );
};
