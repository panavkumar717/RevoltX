import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Heart } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-black/5 dark:border-white/10 text-xs text-[#62756E] dark:text-[#9BB3A8] pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-black/5 dark:border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#0070F3] flex items-center justify-center text-white">
                <Zap className="h-4 w-4 fill-current text-white" />
              </div>
              <span className="font-bold text-lg text-[#10201B] dark:text-[#EDEDED]">
                REVolt<span className="text-[#0070F3] dark:text-[#38BDF8]">X</span>
              </span>
            </Link>
            <p className="text-xs text-[#62756E] dark:text-[#9BB3A8] max-w-sm leading-relaxed">
              "Every Battery Has a Second Life." ReVoltX is the battery lifecycle intelligence platform creating a continuous digital passport from manufacture through first life, health monitoring, AI hardware diagnostics, second life, and closed-loop recycling.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#0070F3] dark:text-[#38BDF8] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>EU Battery Regulation (EU 2023/1542) Compliant Architecture</span>
            </div>
          </div>

          {/* Dedicated Portals */}
          <div>
            <h4 className="font-bold text-[#10201B] dark:text-[#EDEDED] uppercase tracking-wider text-[11px] mb-3">
              Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/login/manufacturer" className="hover:text-[#0070F3] dark:hover:text-[#38BDF8] transition-colors">
                  Manufacturer & Fleet
                </Link>
              </li>
              <li>
                <Link href="/login/owner" className="hover:text-[#6366F1] dark:hover:text-[#818CF8] transition-colors">
                  Customer / Owner
                </Link>
              </li>
              <li>
                <Link href="/login/circularity" className="hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors">
                  Circularity Partner
                </Link>
              </li>
              <li>
                <Link href="/circularity/recycling" className="hover:text-[#0070F3] dark:hover:text-[#38BDF8] transition-colors">
                  Recycler Hub
                </Link>
              </li>
              <li>
                <Link href="/login/internal" className="hover:text-[#F59E0B] dark:hover:text-[#FBBF24] transition-colors font-medium">
                  Internal Ops Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Workflows */}
          <div>
            <h4 className="font-bold text-[#10201B] dark:text-[#EDEDED] uppercase tracking-wider text-[11px] mb-3">
              Workflows
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/manufacturer/batteries/register" className="hover:text-[#0070F3] dark:hover:text-[#38BDF8] transition-colors">
                  Battery Registration
                </Link>
              </li>
              <li>
                <Link href="/internal/testing" className="hover:text-[#0070F3] dark:hover:text-[#38BDF8] transition-colors">
                  Smart Dock Diagnostic
                </Link>
              </li>
              <li>
                <Link href="/circularity/opportunities" className="hover:text-[#0070F3] dark:hover:text-[#38BDF8] transition-colors">
                  Second-Life Marketplace
                </Link>
              </li>
              <li>
                <Link href="/battery/RX-2026-892738" className="hover:text-[#0070F3] dark:hover:text-[#38BDF8] transition-colors">
                  Digital Battery Passport
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-[#0070F3] dark:text-[#38BDF8] font-bold hover:underline">
                  Interactive Live Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div>
            <h4 className="font-bold text-[#10201B] dark:text-[#EDEDED] uppercase tracking-wider text-[11px] mb-3">
              Standards & Data
            </h4>
            <ul className="space-y-2">
              <li className="text-[11px]">ISO 12405 Pack Safety</li>
              <li className="text-[11px]">UL 1974 2nd-Life Reuse</li>
              <li className="text-[11px]">Deterministic Demo Model</li>
              <li className="text-[11px]">FastAPI & MQTT Ready</li>
              <li className="text-[11px]">Real Single Source of Truth</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#62756E] dark:text-[#9BB3A8] gap-3">
          <p>© {new Date().getFullYear()} ReVoltX Inc. All rights reserved. Designed for sustainable electrification.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-[#0070F3] dark:text-[#38BDF8] fill-current" /> for climate-tech
            </span>
            <span className="inline-block h-2 w-2 rounded-full bg-[#0070F3] dark:bg-[#38BDF8]" />
            <span className="font-mono text-[#10201B] dark:text-[#EDEDED]">v2.6-Production-Clean</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
