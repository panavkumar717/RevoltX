import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Heart } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-black/10 dark:border-white/10 text-xs text-black dark:text-[#9BB3A8] pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-black/10 dark:border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-[#21A879] flex items-center justify-center text-white">
                <Zap className="h-4 w-4 fill-current text-[#C9EF72] dark:text-[#0B1310]" />
              </div>
              <span className="font-bold text-lg text-black dark:text-[#ECFDF5]">
                REVolt<span className="text-black dark:text-[#21A879]">X</span>
              </span>
            </Link>
            <p className="text-xs text-black dark:text-[#9BB3A8] max-w-sm leading-relaxed font-medium">
              &quot;Every Battery Has a Second Life.&quot; ReVoltX is the battery lifecycle intelligence platform creating a continuous digital passport from manufacture through first life, health monitoring, AI hardware diagnostics, second life, and closed-loop recycling.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-black dark:text-[#34D399] font-bold">
              <ShieldCheck className="w-4 h-4 text-black dark:text-[#34D399]" />
              <span>EU Battery Regulation (EU 2023/1542) Compliant Architecture</span>
            </div>
          </div>

          {/* Dedicated Portals */}
          <div>
            <h4 className="font-extrabold text-black dark:text-[#ECFDF5] uppercase tracking-wider text-[11px] mb-3">
              Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/login/manufacturer" className="text-black dark:text-[#9BB3A8] font-semibold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline transition-colors">
                  Manufacturer &amp; Fleet
                </Link>
              </li>
              <li>
                <Link href="/login/owner" className="text-black dark:text-[#9BB3A8] font-semibold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline transition-colors">
                  Customer / Owner
                </Link>
              </li>
              <li>
                <Link href="/login/circularity" className="text-black dark:text-[#9BB3A8] font-semibold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline transition-colors">
                  Circularity Partner
                </Link>
              </li>
              <li>
                <Link href="/circularity/recycling" className="text-black dark:text-[#9BB3A8] font-semibold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline transition-colors">
                  Recycler Hub
                </Link>
              </li>
              <li>
                <Link href="/login/internal" className="text-black dark:text-[#FBBF24] font-bold hover:text-[#D89A24] dark:hover:text-[#FBBF24] hover:underline transition-colors">
                  Internal Ops Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Workflows */}
          <div>
            <h4 className="font-extrabold text-black dark:text-[#ECFDF5] uppercase tracking-wider text-[11px] mb-3">
              Workflows
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/manufacturer/batteries/register" className="text-black dark:text-[#9BB3A8] font-semibold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline transition-colors">
                  Battery Registration
                </Link>
              </li>
              <li>
                <Link href="/internal/testing" className="text-black dark:text-[#9BB3A8] font-semibold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline transition-colors">
                  Smart Dock Diagnostic
                </Link>
              </li>
              <li>
                <Link href="/circularity/opportunities" className="text-black dark:text-[#9BB3A8] font-semibold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline transition-colors">
                  Second-Life Marketplace
                </Link>
              </li>
              <li>
                <Link href="/battery/RX-2026-892738" className="text-black dark:text-[#9BB3A8] font-semibold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline transition-colors">
                  Digital Battery Passport
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-black dark:text-[#34D399] font-bold hover:text-[#137A58] dark:hover:text-[#34D399] hover:underline">
                  Interactive Live Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div>
            <h4 className="font-extrabold text-black dark:text-[#ECFDF5] uppercase tracking-wider text-[11px] mb-3">
              Standards &amp; Data
            </h4>
            <ul className="space-y-2">
              <li className="text-[11px] text-black dark:text-[#9BB3A8] font-semibold">ISO 12405 Pack Safety</li>
              <li className="text-[11px] text-black dark:text-[#9BB3A8] font-semibold">UL 1974 2nd-Life Reuse</li>
              <li className="text-[11px] text-black dark:text-[#9BB3A8] font-semibold">Deterministic Demo Model</li>
              <li className="text-[11px] text-black dark:text-[#9BB3A8] font-semibold">FastAPI &amp; MQTT Ready</li>
              <li className="text-[11px] text-black dark:text-[#9BB3A8] font-semibold">Real Single Source of Truth</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-black dark:text-[#9BB3A8] gap-3 font-semibold">
          <p className="text-black dark:text-[#9BB3A8]">© {new Date().getFullYear()} ReVoltX Inc. All rights reserved. Designed for sustainable electrification.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-black dark:text-zinc-300">
              Engineered with <Heart className="w-3 h-3 text-red-500 fill-current" /> for climate-tech
            </span>
            <span className="inline-block h-2 w-2 rounded-full bg-black dark:bg-[#34D399]" />
            <span className="font-mono text-black dark:text-[#ECFDF5] font-bold">v2.6-Production-Clean</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
