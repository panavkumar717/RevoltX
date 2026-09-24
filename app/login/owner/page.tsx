'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Zap, ArrowRight, Sparkles, Smartphone, Eye, EyeOff } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';
import { LoginHeroArtwork } from '../../../components/ui/LoginHeroArtwork';

export default function OwnerLoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useReVoltX();
  const [identifier, setIdentifier] = useState('sarah.jenkins@ecotransit.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-zinc-100/80 dark:bg-black flex items-center justify-center p-4 sm:p-6 lg:p-10 relative text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-30">
        <ThemeToggle />
      </div>

      {/* Main Split-Card Container */}
      <div className="max-w-5xl w-full bg-white dark:bg-zinc-900 rounded-[36px] shadow-2xl border border-zinc-200/80 dark:border-zinc-800 p-4 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden">
        
        {/* Left Side: Login Form */}
        <div className="lg:col-span-6 flex flex-col justify-center px-2 sm:px-4">
          {/* Brand & Portal Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="h-10 w-10 rounded-2xl bg-[#6366F1] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Zap className="h-5 w-5 fill-current text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-zinc-100">
                REVolt<span className="text-[#6366F1] dark:text-[#818CF8]">X</span>
              </span>
            </Link>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Hello Again!
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back to your Customer & Battery Owner portal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-800/40 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#6366F1] shadow-2xs transition-all"
                placeholder="Email or Mobile Phone"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-800/40 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#6366F1] shadow-2xs transition-all"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSignIn()}
                className="text-xs font-medium text-zinc-400 hover:text-[#6366F1] dark:hover:text-[#818CF8] transition-colors"
              >
                Recovery Password
              </button>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Or Continue With Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">Or continue with</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Social / Quick Action Buttons matching reference image */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleSignIn()}
              className="h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-xs flex items-center justify-center transition-all hover:scale-105"
              title="Sign in with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleSignIn()}
              className="h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-xs flex items-center justify-center text-zinc-900 dark:text-zinc-100 transition-all hover:scale-105"
              title="Sign in with Apple"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12-14.44-6.3-9.68-11.22-20.76-14.75-33.24-3.53-12.48-5.3-24.36-5.3-35.65 0-14.15 3.49-26.06 10.47-35.73 6.98-9.67 15.82-14.62 26.52-14.86 4.35 0 9.29 1.13 14.83 3.39 5.54 2.26 9.4 3.45 11.59 3.56 1.74-.11 5.82-1.35 12.24-3.73 6.42-2.38 11.83-3.4 16.23-3.05 12.19.98 21.84 5.39 28.96 13.23-10.66 6.42-15.88 15.24-15.66 26.44.22 8.7 3.6 15.93 10.14 21.68 6.54 5.75 14.28 9.07 23.23 9.97-2.18 6.74-4.85 13.43-8.01 20.07zM119.22 31.84c0-7.72 2.76-14.97 8.28-21.75 5.53-6.77 12.43-10.45 20.71-11.03.11 1.09.16 2.07.16 2.94 0 7.61-2.94 14.97-8.83 22.09-5.88 7.12-13.01 10.97-21.38 11.55-.22-1.2-.33-2.4-.33-3.8z"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleSignIn()}
              className="h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-xs flex items-center justify-center text-[#1877F2] transition-all hover:scale-105"
              title="Sign in with Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>

          {/* Instant Demo Login Button for Judges (100% Functionality Preserved) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSignIn()}
              className="w-full py-3 px-4 rounded-2xl bg-indigo-500/10 dark:bg-indigo-950/40 text-[#6366F1] dark:text-[#818CF8] text-xs font-bold border border-indigo-500/20 hover:bg-indigo-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Instant Demo Login as Sarah Jenkins (RX-2026-892738)</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              ← Return to ReVoltX Homepage
            </Link>
          </div>
        </div>

        {/* Right Side: Visual Landscape Artwork */}
        <div className="lg:col-span-6 h-full flex items-center justify-center">
          <LoginHeroArtwork
            portalTitle="Customer / Owner Portal"
            quote="Finally, all your battery health data in one place."
            subquote="Track real degradation, calculate secondary life, and book certified mobile health checks."
            accentColor="#6366F1"
          />
        </div>

      </div>
    </div>
  );
}
