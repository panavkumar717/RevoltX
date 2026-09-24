'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Zap, ArrowRight, Sparkles, Smartphone } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';

export default function OwnerLoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useReVoltX();
  const [identifier, setIdentifier] = useState('sarah.jenkins@ecotransit.io');
  const [password, setPassword] = useState('••••••••••••');

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentUser({
      name: 'Sarah Jenkins',
      email: identifier.includes('@') ? identifier : 'sarah.jenkins@ecotransit.io',
      role: 'owner',
      orgName: 'EcoTransit Metro Delivery',
      portalAccess: 'owner'
    });
    router.push('/owner');
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <ThemeToggle />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="h-10 w-10 rounded-xl bg-[#137A58] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-current text-[#C9EF72]" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#10201B]">
            REVolt<span className="text-[#137A58]">X</span>
          </span>
        </Link>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EBF7F3] text-[#21A879] border border-[#C5ECD9] mb-3">
          Customer / Owner Portal
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[#10201B]">
          Welcome back.
        </h2>
        <p className="mt-1 text-sm text-[#62756E] max-w-sm mx-auto">
          Understand your battery. Know what comes next.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#DDE7E2] rounded-3xl sm:px-10">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#10201B] uppercase tracking-wider mb-1">
                Email / Mobile Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-sm text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
                  placeholder="name@email.com or +1 555-0199"
                />
                <Smartphone className="absolute right-3 top-3 w-4 h-4 text-[#62756E]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#10201B] uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-sm text-[#10201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#137A58]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#137A58] text-white text-sm font-semibold hover:bg-[#0E5B42] shadow-xs transition-colors"
            >
              <span>Sign in to Owner Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login for Judges */}
          <div className="mt-6 pt-6 border-t border-[#DDE7E2]">
            <div className="flex items-center gap-2 text-xs text-[#62756E] mb-3 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#137A58]" />
              <span>Judge / Evaluation Access</span>
            </div>
            <button
              type="button"
              onClick={() => handleSignIn()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#EBF7F3] text-[#137A58] text-xs font-bold border border-[#C5ECD9] hover:bg-[#d6f2e8] transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Instant Demo Login as Sarah Jenkins (RX-2026-892738)</span>
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
