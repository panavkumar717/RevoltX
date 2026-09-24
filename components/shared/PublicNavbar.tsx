'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  ChevronDown, 
  ArrowRight, 
  Factory, 
  RefreshCw, 
  ShieldAlert, 
  User, 
  PlayCircle,
  Menu as MenuIcon,
  X,
  Cpu,
  Activity,
  Recycle,
  QrCode,
  Sparkles
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { MenuItem, ProductItem, HoveredLink } from '../ui/navbar-menu';

export const PublicNavbar: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 mx-auto w-[94%] max-w-6xl transition-all duration-300">
      <nav
        onMouseLeave={() => setActive(null)}
        className="relative rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 transition-colors"
      >
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#0070F3] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-white" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-[#10201B] dark:text-[#EDEDED]">
            REVolt<span className="text-[#0070F3] dark:text-[#38BDF8]">X</span>
          </span>
        </Link>

        {/* Center: Aceternity Hover Menu Navigation */}
        <div className="hidden lg:flex items-center space-x-1 sm:space-x-2">
          <MenuItem setActive={setActive} active={active} item="The Problem">
            <div className="flex flex-col space-y-2 text-sm w-72">
              <HoveredLink href="/#problem" className="font-bold text-sm text-[#10201B] dark:text-[#EDEDED]">
                15M-Ton Battery Cliff
              </HoveredLink>
              <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8] leading-snug">
                Why 70%+ of EV batteries are prematurely shredded when they still retain 70-80% capacity.
              </p>
              <div className="pt-2 border-t border-[#DDE7E2] dark:border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-[#F0F5F2] dark:bg-white/5">
                  <span className="font-bold text-[#0070F3] dark:text-[#38BDF8] block font-mono">$120B</span>
                  <span className="text-[#62756E] dark:text-[#9BB3A8]">Trapped Value</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F0F5F2] dark:bg-white/5">
                  <span className="font-bold text-[#6366F1] dark:text-[#818CF8] block font-mono">0 Silos</span>
                  <span className="text-[#62756E] dark:text-[#9BB3A8]">Data Continuity</span>
                </div>
              </div>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Platform">
            <div className="text-sm grid grid-cols-2 gap-4 p-2 w-[34rem]">
              <ProductItem
                title="8-Step Continuous Lifecycle"
                href="/#how-it-works"
                icon={<Activity className="w-4 h-4" />}
                description="From raw cell fabrication to digital passport, first life, and second-life routing."
              />
              <ProductItem
                title="Smart Battery Dock"
                href="/#hardware"
                icon={<Cpu className="w-4 h-4" />}
                description="Hardware diagnostic test dock for electrochemical impedance & IoT telemetry."
              />
              <ProductItem
                title="AI Decision Engine"
                href="/internal/intelligence"
                icon={<Sparkles className="w-4 h-4" />}
                description="Predictive SOH, RUL wear slope and automated second-life qualification."
              />
              <ProductItem
                title="EU Digital Battery Passport"
                href="/battery/RX-2026-892738"
                icon={<QrCode className="w-4 h-4" />}
                description="Immutable digital twin verifying provenance, chemistry and carbon footprint."
              />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Portals">
            <div className="flex flex-col space-y-1.5 text-sm w-72">
              <HoveredLink href="/login/manufacturer" className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                <Factory className="w-3.5 h-3.5 text-[#0070F3] dark:text-[#38BDF8]" />
                <span>Manufacturer & Fleet Portal</span>
              </HoveredLink>
              <HoveredLink href="/login/owner" className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                <User className="w-3.5 h-3.5 text-[#6366F1] dark:text-[#818CF8]" />
                <span>Customer / Owner Portal</span>
              </HoveredLink>
              <HoveredLink href="/login/circularity" className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                <RefreshCw className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                <span>Circularity Partner Portal</span>
              </HoveredLink>
              <div className="my-1 border-t border-black/10 dark:border-white/10" />
              <HoveredLink href="/login/internal" className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                <ShieldAlert className="w-3.5 h-3.5 text-[#F59E0B] dark:text-[#FBBF24]" />
                <span>ReVoltX Ops Console</span>
              </HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Circularity">
            <div className="flex flex-col space-y-2 text-sm w-64">
              <HoveredLink href="/#circularity" className="font-bold text-sm text-[#10201B] dark:text-[#EDEDED]">
                Environmental Impact
              </HoveredLink>
              <HoveredLink href="/circularity/impact">
                CO₂e Avoidance Metrics (1,022 Tons)
              </HoveredLink>
              <HoveredLink href="/circularity/opportunities">
                Stationary Solar Sourcing (14.2 MWh)
              </HoveredLink>
              <HoveredLink href="/circularity/recycling">
                Critical Mineral Recovery (96.4% Li, Ni, Co)
              </HoveredLink>
            </div>
          </MenuItem>

          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0070F3] dark:text-[#38BDF8] hover:bg-blue-500/10 dark:hover:bg-blue-500/20 px-3.5 py-1.5 rounded-full transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </Link>
        </div>

        {/* Right: Actions & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-[#10201B] dark:text-[#F8FAFC] hover:bg-[#F0F5F2] dark:hover:bg-[#162720] lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Glassmorphism Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-3xl bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1 text-sm font-medium">
            <Link
              href="/#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#10201B] dark:text-[#F8FAFC] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              The Problem
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#10201B] dark:text-[#F8FAFC] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              Architecture & Lifecycle
            </Link>
            <Link
              href="/#hardware"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#10201B] dark:text-[#F8FAFC] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              Smart Battery Dock
            </Link>
            <Link
              href="/#portals"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#10201B] dark:text-[#F8FAFC] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              Three Business Portals
            </Link>
            <Link
              href="/#circularity"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-[#10201B] dark:text-[#F8FAFC] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              Circularity Impact
            </Link>
            <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#62756E] dark:text-[#9BB3A8] px-3">
                Portals Sign In
              </span>
              <Link
                href="/login/manufacturer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[#10201B] dark:text-[#F8FAFC] hover:bg-white/10 dark:hover:bg-white/5"
              >
                <Factory className="w-3.5 h-3.5 text-[#0070F3] dark:text-[#38BDF8]" />
                <span>Manufacturer & Fleet Sign In</span>
              </Link>
              <Link
                href="/login/owner"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[#10201B] dark:text-[#F8FAFC] hover:bg-white/10 dark:hover:bg-white/5"
              >
                <User className="w-3.5 h-3.5 text-[#38BDF8] dark:text-[#38BDF8]" />
                <span>Customer / Owner Sign In</span>
              </Link>
              <Link
                href="/login/circularity"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[#10201B] dark:text-[#F8FAFC] hover:bg-white/10 dark:hover:bg-white/5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                <span>Circularity Partner Sign In</span>
              </Link>
            </div>

            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#EFF6FF] dark:bg-[#133325] text-[#0070F3] dark:text-[#38BDF8] font-bold"
            >
              <span>Launch Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
