'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';

export default function ManufacturerReportsPage() {
  const { batteries } = useReVoltX();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3]">
            Compliance & Analytics
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Fleet Health Reports & ESG Compliance
          </h1>
          <p className="text-xs text-[#62756E]">
            Automated degradation models, warranty exposure, and EU Battery Directive documentation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Exporting Fleet ESG & Degradation Report PDF')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export ESG Fleet PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#62756E]">Fleet SOH Average</span>
          <p className="text-3xl font-bold font-mono text-[#0070F3]">87.4%</p>
          <p className="text-xs text-[#62756E]">+2.1% higher retention than industry NMC curve</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#62756E]">Warranty Claim Rate</span>
          <p className="text-3xl font-bold font-mono text-[#10201B]">0.42%</p>
          <p className="text-xs text-[#62756E]">Down from 1.8% prior to ReVoltX Smart Dock monitoring</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#DDE7E2] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#62756E]">Second-Life Conversion</span>
          <p className="text-3xl font-bold font-mono text-[#0284C7]">94.2%</p>
          <p className="text-xs text-[#62756E]">Retired mobility packs repurposed into stationary storage</p>
        </div>
      </div>

      {/* Report summaries */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#10201B]">
          Generated Compliance Dossiers
        </h3>

        <div className="space-y-3">
          {[
            {
              title: 'EU Battery Directive (EU 2023/1542) Annual Declaration',
              period: 'Calendar Year 2026',
              status: 'Certified Compliant',
              size: '3.4 MB'
            },
            {
              title: 'LFP vs. NMC Electrochemical Wear Comparative Analysis',
              period: 'Q3 2026 Fleet Cohort',
              status: 'Benchmarked',
              size: '5.1 MB'
            },
            {
              title: 'Scope 3 Avoided Emissions via Second-Life Battery Repurposing',
              period: 'Trailing 12 Months',
              status: 'Audited by TÜV',
              size: '2.8 MB'
            }
          ].map(r => (
            <div key={r.title} className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#DDE7E2] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE7E2] text-[#0070F3]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#10201B]">{r.title}</h4>
                  <p className="text-[#62756E] text-[11px]">{r.period} • {r.status}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Downloading ${r.title}`)}
                className="inline-flex items-center gap-1 font-semibold text-[#0070F3] hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ({r.size})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
