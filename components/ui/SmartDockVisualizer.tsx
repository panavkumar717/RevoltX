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
    <div className="bg-white rounded-2xl p-6 border border-[#DDE7E2] shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-[#DDE7E2] gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#137A58] animate-pulse" />
            <h3 className="text-base font-bold text-[#10201B]">ReVoltX Smart Battery Dock (Hardware Diagnostic Interface)</h3>
          </div>
          <p className="text-xs text-[#62756E] mt-0.5">
            Physical test dock for non-destructive electrochemical telemetry & health assessment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-[#F0F5F2] px-2.5 py-1 rounded-md text-[#10201B] border border-[#DDE7E2]">
            Target: {batteryId}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isTesting ? 'bg-[#FEF6E7] text-[#D89A24] border border-[#F8E0B0]' : 'bg-[#DDF5EA] text-[#137A58] border border-[#BBEAD7]'}`}>
            {isTesting ? 'Diagnostic Stream Active' : 'Dock Ready'}
          </span>
        </div>
      </div>

      {/* Hardware Node Flow Diagram */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Node 1: Physical Battery */}
        <div className="p-4 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2] flex flex-col items-center text-center relative">
          <div className="p-3 rounded-full bg-[#DDF5EA] text-[#137A58] mb-2">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-[#10201B]">Physical Battery</span>
          <span className="text-[11px] font-mono text-[#62756E] mt-0.5">{batteryId}</span>
          <span className="mt-2 text-[10px] text-[#137A58] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Docked & Locked
          </span>
        </div>

        {/* Node 2: Sensor Array & ESP32 */}
        <div className="p-4 rounded-xl bg-[#F0F5F2] border border-[#DDE7E2] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#10201B] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#137A58]" /> Sensor Matrix
              </span>
              <span className="text-[10px] font-mono text-[#62756E]">ESP32 SoC</span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] bg-white p-1.5 rounded border border-[#DDE7E2]">
                <span className="flex items-center gap-1 text-[#62756E]">
                  <Gauge className="w-3 h-3 text-[#137A58]" /> Voltage Sensor
                </span>
                <span className="font-semibold text-[#137A58] flex items-center gap-1">
                  ● Connected
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] bg-white p-1.5 rounded border border-[#DDE7E2]">
                <span className="flex items-center gap-1 text-[#62756E]">
                  <Zap className="w-3 h-3 text-[#21A879]" /> Current Sensor
                </span>
                <span className="font-semibold text-[#137A58] flex items-center gap-1">
                  ● Connected
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] bg-white p-1.5 rounded border border-[#DDE7E2]">
                <span className="flex items-center gap-1 text-[#62756E]">
                  <Thermometer className="w-3 h-3 text-[#D89A24]" /> Temp Probe
                </span>
                <span className="font-semibold text-[#137A58] flex items-center gap-1">
                  ● Connected
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] bg-white p-1.5 rounded border border-[#DDE7E2]">
                <span className="flex items-center gap-1 text-[#62756E]">
                  <Cpu className="w-3 h-3 text-[#4386C5]" /> ESP32 Gateway
                </span>
                <span className="font-semibold text-[#137A58] flex items-center gap-1">
                  ● Connected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Node 3: Protocol / Cloud Bridge */}
        <div className="p-4 rounded-xl bg-[#F7FAF8] border border-[#DDE7E2] flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#10201B] block mb-2">Bridge & Telemetry</span>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-white border border-[#DDE7E2]">
                <span className="text-[10px] text-[#62756E] block">Protocol</span>
                <span className="font-mono font-semibold text-[#10201B]">MQTT / TLS 1.3 / REST</span>
              </div>
              <div className="p-2 rounded bg-white border border-[#DDE7E2]">
                <span className="text-[10px] text-[#62756E] block">Cloud Broker</span>
                <span className="font-mono font-semibold text-[#137A58]">telemetry.revoltx.cloud</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-[#62756E] flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#137A58]" /> 250ms Sample Rate
          </div>
        </div>

        {/* Node 4: AI Intelligence & Decision Engine */}
        <div className="p-4 rounded-xl bg-[#DDF5EA] border border-[#BBEAD7] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-[#137A58]">
              <span className="h-2 w-2 rounded-full bg-[#137A58] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Decision Engine</span>
            </div>
            <p className="text-[11px] text-[#10201B] mt-1 leading-snug">
              Synthesizes electrochemical curves, computes RX Score, and executes multi-path routing.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1 text-center font-bold text-[10px]">
            <div className="p-1 rounded bg-white/80 text-[#137A58] border border-[#BBEAD7]">
              USE
            </div>
            <div className="p-1 rounded bg-white/80 text-[#5D7C13] border border-[#DAECAE]">
              2ND LIFE
            </div>
            <div className="p-1 rounded bg-white/80 text-[#D94B4B] border border-[#F8C8C4]">
              RECYCLE
            </div>
          </div>
        </div>
      </div>

      {/* Realistic Engineering Safe Demonstrator Notice */}
      <div className="p-3 rounded-xl bg-[#FEF6E7] border border-[#F8E0B0] flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#D89A24] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#62756E] leading-relaxed">
          <strong className="text-[#10201B]">Hardware Safety Specification:</strong> The prototype Smart Battery Dock demonstrated operates with safe low-voltage and low-stress diagnostics. Full high-voltage EV pack qualification connects to industrial isolated CAN/BMS interfaces and automated cycle load banks in accordance with ISO 12405 / UL 1974.
        </p>
      </div>
    </div>
  );
};
