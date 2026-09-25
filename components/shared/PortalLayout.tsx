'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap, 
  Factory, 
  User, 
  RefreshCw, 
  ShieldAlert, 
  ChevronDown, 
  RotateCcw, 
  ExternalLink,
  QrCode,
  Menu,
  X,
  LogOut,
  Bell,
  Check
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { ThemeToggle } from '../ui/ThemeToggle';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

interface PortalLayoutProps {
  portalType: 'manufacturer' | 'owner' | 'circularity' | 'internal';
  title: string;
  navItems: NavItem[];
  children: React.ReactNode;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  portalType,
  title,
  navItems,
  children
}) => {
  const pathname = usePathname();
  const { currentUser, resetToDemoData } = useReVoltX();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [resetToast, setResetToast] = useState(false);

  const portalConfig = {
    manufacturer: {
      name: 'Manufacturer & Fleet Portal',
      badge: 'Partner Tier',
      badgeColor: 'bg-blue-500/10 text-[#0070F3] border-blue-500/20',
      icon: Factory,
      defaultOrg: 'XYZ Battery Corp.',
      homeHref: '/manufacturer'
    },
    owner: {
      name: 'Customer / Owner Portal',
      badge: 'Consumer Tier',
      badgeColor: 'bg-indigo-500/10 text-[#6366F1] border-indigo-500/20',
      icon: User,
      defaultOrg: 'Sarah Jenkins (EV Asset #892738)',
      homeHref: '/owner'
    },
    circularity: {
      name: 'Circularity Partner Portal',
      badge: 'Circularity Tier',
      badgeColor: 'bg-sky-500/10 text-[#0284C7] border-sky-500/20',
      icon: RefreshCw,
      defaultOrg: 'EcoVolt Solutions & GreenLithium AG',
      homeHref: '/circularity'
    },
    internal: {
      name: 'ReVoltX Operations Console',
      badge: 'ROS System Admin',
      badgeColor: 'bg-[#FEF6E7] text-[#D89A24] border-[#F8E0B0]',
      icon: ShieldAlert,
      defaultOrg: 'ReVoltX Global Operations',
      homeHref: '/internal'
    }
  }[portalType];

  const Icon = portalConfig.icon;

  const handleReset = () => {
    resetToDemoData();
    setResetToast(true);
    setTimeout(() => setResetToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col">
      {/* Top Universal Operating Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#DDE7E2] shadow-2xs">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Left: Brand + Portal Switcher */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-[#0070F3] flex items-center justify-center text-white shadow-2xs">
                <Zap className="h-4 w-4 fill-current text-white" />
              </div>
              <span className="font-bold text-lg text-[#10201B] hidden sm:inline">
                REVolt<span className="text-[#0070F3]">X</span>
              </span>
            </Link>

            <div className="h-5 w-px bg-[#DDE7E2] hidden sm:block" />

            {/* Portal Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                onBlur={() => setTimeout(() => setPortalDropdownOpen(false), 200)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F0F5F2] hover:bg-[#E2EBE6] text-xs font-semibold text-[#10201B] border border-[#DDE7E2] transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-[#0070F3]" />
                <span>{portalConfig.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#62756E]" />
              </button>

              {portalDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white p-2 shadow-xl border border-[#DDE7E2] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#62756E] border-b border-[#DDE7E2]">
                    Switch Portal View
                  </div>
                  <Link
                    href="/manufacturer"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      portalType === 'manufacturer' ? 'bg-[#EFF6FF] text-[#0070F3] font-semibold' : 'text-[#10201B] hover:bg-[#F0F5F2]'
                    }`}
                  >
                    <Factory className="w-4 h-4" />
                    <span>Manufacturer & Fleet Portal</span>
                  </Link>
                  <Link
                    href="/owner"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      portalType === 'owner' ? 'bg-[#EFF6FF] text-[#0070F3] font-semibold' : 'text-[#10201B] hover:bg-[#F0F5F2]'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Customer / Owner Portal</span>
                  </Link>
                  <Link
                    href="/circularity"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      portalType === 'circularity' ? 'bg-[#EFF6FF] text-[#0070F3] font-semibold' : 'text-[#10201B] hover:bg-[#F0F5F2]'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Circularity Partner Portal</span>
                  </Link>
                  <div className="my-1 border-t border-[#DDE7E2]" />
                  <Link
                    href="/internal"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      portalType === 'internal' ? 'bg-[#FEF6E7] text-[#D89A24] font-semibold' : 'text-[#10201B] hover:bg-[#F0F5F2]'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>ReVoltX Operations Console</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick Tools & Session */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#62756E] hover:text-[#10201B] hover:bg-[#F0F5F2] border border-transparent hover:border-[#DDE7E2] transition-colors"
              title="Reset shared battery database to default demo state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>

            {/* Passport Quick View */}
            <Link
              href="/battery/RX-2026-892738"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F0F5F2] hover:bg-[#DDE7E2] text-[#10201B] transition-colors"
              title="View Public Passport for star battery RX-2026-892738"
            >
              <QrCode className="w-3.5 h-3.5 text-[#0070F3]" />
              <span className="hidden md:inline">Passport</span>
            </Link>

            {/* Dark Mode Theme Toggle */}
            <ThemeToggle />

            {/* Live Synchronized Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-[#0070F3] border border-blue-500/20 text-[11px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0070F3] animate-pulse" />
              <span>Database Sync Active</span>
            </div>

            {/* Current Session Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#DDE7E2]">
              <div className="h-8 w-8 rounded-full bg-[#0070F3] text-white flex items-center justify-center font-bold text-xs">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-[#10201B] leading-none">
                  {currentUser?.name || 'Authorized User'}
                </span>
                <span className="text-[10px] text-[#62756E] mt-0.5">
                  {currentUser?.orgName || portalConfig.defaultOrg}
                </span>
              </div>
            </div>

            {/* Mobile Nav Toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 rounded-lg text-[#10201B] hover:bg-[#F0F5F2] md:hidden"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Reset confirmation toast */}
      {resetToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10201B] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#0070F3]" />
          <span>Battery database successfully reset to pristine demo values.</span>
        </div>
      )}

      {/* Main layout with sidebar + content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 space-y-6">
          {/* Portal Profile Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#DDE7E2] shadow-2xs">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${portalConfig.badgeColor}`}>
              {portalConfig.badge}
            </span>
            <h3 className="font-bold text-sm text-[#10201B] mt-2">
              {portalConfig.name}
            </h3>
            <p className="text-[11px] text-[#62756E] mt-1">
              {currentUser?.orgName || portalConfig.defaultOrg}
            </p>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const NavIcon = item.icon;
              const isActive = pathname === item.href || (item.href !== portalConfig.homeHref && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0070F3] text-white shadow-xs'
                      : 'text-[#62756E] hover:text-[#10201B] hover:bg-white border border-transparent hover:border-[#DDE7E2]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <NavIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#62756E]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F0F5F2] text-[#10201B]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Help & Direct Passport Link */}
          <div className="mt-auto pt-6 border-t border-[#DDE7E2] space-y-2">
            <Link
              href="/demo"
              className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-[#0070F3] hover:bg-blue-500/20 transition-colors"
            >
              <span>Judge Interactive Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={`/login/${portalType}`}
              className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-[#62756E] hover:text-[#10201B] hover:bg-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Switch Account / Sign Out</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 bg-black/30 md:hidden backdrop-blur-xs flex flex-col justify-end">
            <div className="bg-white rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#DDE7E2]">
                <h3 className="font-bold text-sm text-[#10201B]">{portalConfig.name}</h3>
                <button 
                  type="button" 
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 text-[#62756E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const NavIcon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-[#0070F3] text-white' : 'text-[#10201B] hover:bg-[#F0F5F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <NavIcon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#DDE7E2] space-y-2">
                <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-[#F0F5F2]">
                  <span className="text-xs font-medium text-[#62756E]">Theme Appearance</span>
                  <ThemeToggle />
                </div>
                <button
                  type="button"
                  onClick={() => { handleReset(); setMobileNavOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F0F5F2] text-xs font-semibold text-[#10201B]"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Demo State
                </button>
                <Link
                  href="/"
                  className="block text-center text-xs text-[#62756E] py-2"
                >
                  Return to Public Landing Page
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Portal Content View */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};
