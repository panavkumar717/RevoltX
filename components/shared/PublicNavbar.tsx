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
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export const PublicNavbar: React.FC = () => {
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F7FAF8]/90 dark:bg-[#0B1310]/90 backdrop-blur-md border-b border-[#DDE7E2] dark:border-[#1E352B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-[#137A58] dark:bg-[#21A879] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 fill-current text-[#C9EF72] dark:text-[#0B1310]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#10201B] dark:text-[#ECFDF5]">
                REVolt<span className="text-[#137A58] dark:text-[#21A879]">X</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-[#62756E] dark:text-[#9BB3A8] -mt-1">
                Lifecycle Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#62756E] dark:text-[#9BB3A8]">
            <Link href="/#problem" className="hover:text-[#10201B] dark:hover:text-[#ECFDF5] transition-colors">
              The Problem
            </Link>
            <Link href="/#how-it-works" className="hover:text-[#10201B] dark:hover:text-[#ECFDF5] transition-colors">
              How It Works
            </Link>
            <Link href="/#hardware" className="hover:text-[#10201B] dark:hover:text-[#ECFDF5] transition-colors">
              Smart Dock
            </Link>
            <Link href="/#portals" className="hover:text-[#10201B] dark:hover:text-[#ECFDF5] transition-colors">
              Portals
            </Link>
            <Link href="/#circularity" className="hover:text-[#10201B] dark:hover:text-[#ECFDF5] transition-colors">
              Circularity
            </Link>
            <Link 
              href="/demo" 
              className="inline-flex items-center gap-1.5 text-[#137A58] dark:text-[#34D399] font-semibold hover:text-[#0E5B42] dark:hover:text-[#6EE7B7] transition-colors"
            >
              <PlayCircle className="w-4 h-4 text-[#21A879] dark:text-[#34D399]" />
              Live Demo
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Customer Login */}
            <Link
              href="/login/owner"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl text-[#10201B] dark:text-[#ECFDF5] bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E352B] hover:bg-[#F0F5F2] dark:hover:bg-[#162720] shadow-2xs transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#137A58] dark:text-[#21A879]" />
              Customer Login
            </Link>

            {/* Partner Login Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPartnerOpen(!partnerOpen)}
                onBlur={() => setTimeout(() => setPartnerOpen(false), 250)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl text-[#10201B] dark:text-[#ECFDF5] bg-white dark:bg-[#111E18] border border-[#DDE7E2] dark:border-[#1E352B] hover:bg-[#F0F5F2] dark:hover:bg-[#162720] shadow-2xs transition-colors cursor-pointer"
              >
                <span>Partner Portals</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#62756E] dark:text-[#9BB3A8]" />
              </button>

              {partnerOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-[#111E18] p-2 shadow-xl border border-[#DDE7E2] dark:border-[#1E352B] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-[#62756E] dark:text-[#9BB3A8] border-b border-[#DDE7E2] dark:border-[#1E352B]">
                    Dedicated Business Portals
                  </div>

                  <Link
                    href="/login/manufacturer"
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#F0F5F2] dark:hover:bg-[#162720] transition-colors mt-1 group"
                  >
                    <div className="p-2 rounded-lg bg-[#DDF5EA] dark:bg-[#133325] text-[#137A58] dark:text-[#34D399] mt-0.5">
                      <Factory className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] group-hover:text-[#137A58] dark:group-hover:text-[#34D399]">
                        Manufacturer & Fleet Portal
                      </p>
                      <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8]">
                        Register batteries, batch diagnostics & fleet telemetry
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/login/circularity"
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#F0F5F2] dark:hover:bg-[#162720] transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-[#F3F8E5] dark:bg-[#202E10] text-[#5D7C13] dark:text-[#A3E635] mt-0.5">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] group-hover:text-[#137A58] dark:group-hover:text-[#34D399]">
                        Circularity Partner Portal
                      </p>
                      <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8]">
                        Second-life opportunities & critical mineral recycling
                      </p>
                    </div>
                  </Link>

                  <div className="my-1 border-t border-[#DDE7E2] dark:border-[#1E352B]" />

                  <Link
                    href="/login/internal"
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#FEF6E7] dark:hover:bg-[#2A1D0B] transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-[#FEF6E7] dark:bg-[#33220E] text-[#D89A24] dark:text-[#FBBF24] mt-0.5">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#10201B] dark:text-[#ECFDF5] group-hover:text-[#D89A24] dark:group-hover:text-[#FBBF24]">
                        ReVoltX Operations Console
                      </p>
                      <p className="text-[11px] text-[#62756E] dark:text-[#9BB3A8]">
                        Private staff operating system & Smart Dock management
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Launch Live Demo CTA */}
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#137A58] dark:bg-[#21A879] text-white hover:bg-[#0E5B42] dark:hover:bg-[#1A8D65] shadow-xs transition-colors"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu bar with ThemeToggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Link
              href="/demo"
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#137A58] dark:bg-[#21A879] text-white"
            >
              Demo
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#10201B] dark:text-[#ECFDF5] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#DDE7E2] dark:border-[#1E352B] bg-white dark:bg-[#111E18] p-4 space-y-3">
          <div className="space-y-1">
            <Link 
              href="/#problem" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-[#10201B] dark:text-[#ECFDF5] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              The Problem
            </Link>
            <Link 
              href="/#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-[#10201B] dark:text-[#ECFDF5] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              How It Works
            </Link>
            <Link 
              href="/#hardware" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-[#10201B] dark:text-[#ECFDF5] hover:bg-[#F0F5F2] dark:hover:bg-[#162720]"
            >
              Smart Dock
            </Link>
            <Link 
              href="/demo" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#137A58] dark:text-[#34D399] bg-[#DDF5EA] dark:bg-[#133325]"
            >
              Interactive Judge Demo →
            </Link>
          </div>

          <div className="pt-3 border-t border-[#DDE7E2] dark:border-[#1E352B] space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#62756E] dark:text-[#9BB3A8] px-3">
              Access Portals
            </p>
            <Link 
              href="/login/manufacturer"
              className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#10201B] dark:text-[#ECFDF5] bg-[#F0F5F2] dark:bg-[#162720]"
            >
              Manufacturer & Fleet Portal →
            </Link>
            <Link 
              href="/login/owner"
              className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#10201B] dark:text-[#ECFDF5] bg-[#F0F5F2] dark:bg-[#162720]"
            >
              Customer / Owner Portal →
            </Link>
            <Link 
              href="/login/circularity"
              className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#10201B] dark:text-[#ECFDF5] bg-[#F0F5F2] dark:bg-[#162720]"
            >
              Circularity Partner Portal →
            </Link>
            <Link 
              href="/login/internal"
              className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#D89A24] dark:text-[#FBBF24] bg-[#FEF6E7] dark:bg-[#2A1D0B]"
            >
              ReVoltX Operations Console →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
