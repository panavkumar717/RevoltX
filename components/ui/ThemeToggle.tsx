'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

/**
 * React Bits inspired ThemeToggle component.
 * Features:
 * - Smooth spring rotation & scale icon transition
 * - LocalStorage persistence
 * - Zero-flash theme syncing with document.documentElement
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('revoltx-theme');
    const isDark =
      storedTheme === 'dark' ||
      (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('revoltx-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('revoltx-theme', 'light');
    }
  };

  // Avoid layout shift before mount
  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-xl border border-[#DDE7E2] dark:border-[#1E352B] bg-white dark:bg-[#111E18] ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative h-9 w-9 rounded-xl border border-[#DDE7E2] dark:border-[#1E352B] bg-white dark:bg-[#111E18] text-[#10201B] dark:text-[#F8FAFC] hover:bg-[#F0F5F2] dark:hover:bg-[#162720] shadow-2xs hover:shadow-xs flex items-center justify-center transition-colors cursor-pointer overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="flex items-center justify-center text-[#0070F3]"
          >
            <Moon className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="flex items-center justify-center text-[#D89A24]"
          >
            <Sun className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
