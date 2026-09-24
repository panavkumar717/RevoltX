'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Zap, ArrowRight, Sparkles, KeyRound } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';

export default function InternalLoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useReVoltX();
  const [staffEmail, setStaffEmail] = useState('ops.command@revoltx.internal');
  const [securityKey, setSecurityKey] = useState('RX-SYS-9941');

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentUser({
      name: 'Alex Rivera (Staff Ops)',
      email: staffEmail || 'ops.command@revoltx.internal',
      role: 'revoltX_admin',
      orgName: 'ReVoltX Global Operations & Diagnostics',
      portalAccess: 'internal'
    });
    router.push('/internal');
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <ThemeToggle />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="h-10 w-10 rounded-xl bg-[#10201B] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-current text-[#C9EF72]" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#10201B]">
            REVolt<span className="text-[#137A58]">X</span>
          </span>
        </Link>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FEF6E7] text-[#D89A24] border border-[#F8E0B0] mb-3">
          Restricted Internal ReVoltX Access
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[#10201B]">
          ReVoltX Operations
        </h2>
        <p className="mt-1 text-sm text-[#62756E] max-w-sm mx-auto">
          Internal platform control center. Hardware Smart Dock management, technician dispatch and AI intelligence.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#DDE7E2] rounded-3xl sm:px-10">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#10201B] uppercase tracking-wider mb-1">
                ReVoltX Staff Identity
              </label>
              <input
                type="email"
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-sm text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                placeholder="staff@revoltx.internal"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#10201B] uppercase tracking-wider mb-1">
                Hardware / ROS Authentication Token
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-sm text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                />
                <KeyRound className="absolute right-3 top-3 w-4 h-4 text-[#62756E]" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#10201B] text-white text-sm font-semibold hover:bg-[#1C332B] shadow-xs transition-colors"
            >
              <span>Sign in to ReVoltX Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Instant Demo Login for Judges */}
          <div className="mt-6 pt-6 border-t border-[#DDE7E2]">
            <div className="flex items-center gap-2 text-xs text-[#62756E] mb-3 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#D89A24]" />
              <span>Judge / Evaluation Access</span>
            </div>
            <button
              type="button"
              onClick={() => handleSignIn()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FEF6E7] text-[#D89A24] text-xs font-bold border border-[#F8E0B0] hover:bg-[#faeed6] transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Instant Demo Login as ReVoltX Operations Lead</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-[#62756E]">
            <Link href="/" className="hover:text-[#10201B] underline">
              ← Return to ReVoltX Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
