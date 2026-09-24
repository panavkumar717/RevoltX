'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Thermometer, Gauge, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SmartDockVisualizerProps {
  batteryId?: string;
  isTesting?: boolean;
  voltageConnected?: boolean;
  currentConnected?: boolean;
  tempConnected?: boolean;
  esp32Connected?: boolean;
}

export const SmartDockVisualizer: React.FC<SmartDockVisualizerProps> = ({
  batteryId = 'RX-2026-892738',
  isTesting = false,
  voltageConnected = true,
  currentConnected = true,
  tempConnected = true,
  esp32Connected = true
}) => {
  return (
    <div className="bg-white dark:bg-[#111E18] rounded-2xl p-6 border border-[#DDE7E2] dark:border-[#1E382D] shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-[#DDE7E2] dark:border-[#1E382D] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#137A58] dark:bg-[#34D399] animate-pulse" />
            <h3 className="text-base font-bold text-[#10201B] dark:text-[#ECFDF5]">ReVoltX Smart Battery Dock (Hardware Diagnostic Interface)</h3>
          </div>
          <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] mt-0.5">
            Physical test dock for non-destructive electrochemical telemetry & health assessment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-[#F0F5F2] dark:bg-[#162720] px-2.5 py-1 rounded-md text-[#10201B] dark:text-[#ECFDF5] border border-[#DDE7E2] dark:border-[#1E382D]">
            Target: {batteryId}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isTesting ? 'bg-[#FEF6E7] dark:bg-[#2A2010] text-[#D89A24] dark:text-[#FBBF24] border border-[#F8E0B0] dark:border-[#4E3917]' : 'bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] border border-[#BBEAD7] dark:border-[#1D4A37]'}`}>
            {isTesting ? 'Diagnostic Stream Active' : 'Dock Ready'}
          </span>
        </div>
      </div>

      {/* Hardware Node Flow Diagram */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Node 1: Physical Battery */}
        <div className="p-4 rounded-xl bg-[#F7FAF8] dark:bg-[#162720] border border-[#DDE7E2] dark:border-[#1E382D] flex flex-col items-center text-center relative">
          <div className="p-3 rounded-full bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] mb-2">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5]">Physical Battery</span>
          <span className="text-[11px] font-mono text-[#62756E] dark:text-[#9BB3A8] mt-0.5">{batteryId}</span>
          <span className="mt-2 text-[10px] text-[#137A58] dark:text-[#34D399] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Docked & Locked
          </span>
        </div>

        {/* Node 2: Sensor Array & ESP32 */}
        <div className="p-4 rounded-xl bg-[#F0F5F2] dark:bg-[#162720] border border-[#DDE7E2] dark:border-[#1E382D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#137A58] dark:text-[#34D399]" /> Sensor Matrix
              </span>
              <span className="text-[10px] font-mono text-[#62756E] dark:text-[#9BB3A8]">ESP32 SoC</span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] bg-white dark:bg-[#111E18] p-1.5 rounded border border-[#DDE7E2] dark:border-[#1E382D]">
                <span className="flex items-center gap-1 text-[#62756E] dark:text-[#9BB3A8]">
                  <Gauge className="w-3 h-3 text-[#137A58] dark:text-[#34D399]" /> Voltage Sensor
                </span>
                <span className="font-semibold text-[#137A58] dark:text-[#34D399] flex items-center gap-1">
                  ● Connected
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] bg-white dark:bg-[#111E18] p-1.5 rounded border border-[#DDE7E2] dark:border-[#1E382D]">
                <span className="flex items-center gap-1 text-[#62756E] dark:text-[#9BB3A8]">
                  <Zap className="w-3 h-3 text-[#21A879] dark:text-[#34D399]" /> Current Sensor
                </span>
                <span className="font-semibold text-[#137A58] dark:text-[#34D399] flex items-center gap-1">
                  ● Connected
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] bg-white dark:bg-[#111E18] p-1.5 rounded border border-[#DDE7E2] dark:border-[#1E382D]">
                <span className="flex items-center gap-1 text-[#62756E] dark:text-[#9BB3A8]">
                  <Thermometer className="w-3 h-3 text-[#D89A24] dark:text-[#FBBF24]" /> Temp Probe
                </span>
                <span className="font-semibold text-[#137A58] dark:text-[#34D399] flex items-center gap-1">
                  ● Connected
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] bg-white dark:bg-[#111E18] p-1.5 rounded border border-[#DDE7E2] dark:border-[#1E382D]">
                <span className="flex items-center gap-1 text-[#62756E] dark:text-[#9BB3A8]">
                  <Cpu className="w-3 h-3 text-[#4386C5] dark:text-[#60A5FA]" /> ESP32 Gateway
                </span>
                <span className="font-semibold text-[#137A58] dark:text-[#34D399] flex items-center gap-1">
                  ● Connected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Node 3: Protocol / Cloud Bridge */}
        <div className="p-4 rounded-xl bg-[#F7FAF8] dark:bg-[#162720] border border-[#DDE7E2] dark:border-[#1E382D] flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] block mb-2">Bridge & Telemetry</span>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D]">
                <span className="text-[10px] text-[#62756E] dark:text-[#9BB3A8] block">Protocol</span>
                <span className="font-mono font-semibold text-[#10201B] dark:text-[#ECFDF5]">MQTT / TLS 1.3 / REST</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E382D]">
                <span className="text-[10px] text-[#62756E] dark:text-[#9BB3A8] block">Cloud Broker</span>
                <span className="font-mono font-semibold text-[#137A58] dark:text-[#34D399]">telemetry.revoltx.cloud</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-[#62756E] dark:text-[#9BB3A8] flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#137A58] dark:bg-[#34D399]" /> 250ms Sample Rate
          </div>
        </div>

        {/* Node 4: AI Intelligence & Decision Engine */}
        <div className="p-4 rounded-xl bg-[#DDF5EA] dark:bg-[#133325] border border-[#BBEAD7] dark:border-[#1D4A37] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-[#137A58] dark:text-[#34D399]">
              <span className="h-2 w-2 rounded-full bg-[#137A58] dark:bg-[#34D399] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Decision Engine</span>
            </div>
            <p className="text-[11px] text-[#10201B] dark:text-[#ECFDF5] mt-1 leading-snug">
              Synthesizes electrochemical curves, computes RX Score, and executes multi-path routing.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1 text-center font-bold text-[10px]">
            <div className="p-1 rounded bg-white/80 dark:bg-[#111E18]/80 text-[#137A58] dark:text-[#34D399] border border-[#BBEAD7] dark:border-[#1D4A37]">
              USE
            </div>
            <div className="p-1 rounded bg-white/80 dark:bg-[#111E18]/80 text-[#5D7C13] dark:text-[#A3E635] border border-[#DAECAE] dark:border-[#2D4512]">
              2ND LIFE
            </div>
            <div className="p-1 rounded bg-white/80 dark:bg-[#111E18]/80 text-[#D94B4B] dark:text-[#F87171] border border-[#F8C8C4] dark:border-[#521C1C]">
              RECYCLE
            </div>
          </div>
        </div>
      </div>

      {/* Realistic Engineering Safe Demonstrator Notice */}
      <div className="p-3 rounded-xl bg-[#FEF6E7] dark:bg-[#251E10] border border-[#F8E0B0] dark:border-[#4B391A] flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#D89A24] dark:text-[#FBBF24] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#62756E] dark:text-[#D1C7B2] leading-relaxed">
          <strong className="text-[#10201B] dark:text-[#FEF08A]">Hardware Safety Specification:</strong> The prototype Smart Battery Dock demonstrated operates with safe low-voltage and low-stress diagnostics. Full high-voltage EV pack qualification connects to industrial isolated CAN/BMS interfaces and automated cycle load banks in accordance with ISO 12405 / UL 1974.
        </p>
      </div>
    </div>
  );
};
