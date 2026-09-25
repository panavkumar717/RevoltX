'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Factory, 
  ShieldAlert, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Wrench, 
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Radio
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { BatteryStatusBadge } from '../../components/ui/BatteryStatusBadge';
import MagicBento, { MagicBentoCardItem } from '../../components/ui/MagicBento';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { BorderBeam } from '../../components/ui/BorderBeam';
import { ShinyText } from '../../components/ui/ShinyText';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' as const } 
  }
};

export default function ManufacturerDashboardPage() {
  const { batteries } = useReVoltX();

  const bentoStats: MagicBentoCardItem[] = [
    {
      label: 'GLOBAL FLEET',
      title: 'Total Active Batteries',
      value: <AnimatedCounter value={10000} duration={1.2} />,
      sub: '+240 this month',
      description: 'High-density commercial pack telemetry synchronized across 14 operational regions.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">+2.4% MoM</span>
    },
    {
      label: 'NOMINAL FLEET',
      title: 'Healthy & Nominal',
      value: <AnimatedCounter value={8420} duration={1.4} />,
      sub: '84.2% Fleet Nominal',
      description: 'Impedance and thermal metrics well within factory tolerances without micro-shorts.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">Grade A</span>
    },
    {
      label: 'ADVISORY QUEUE',
      title: 'Attention Required',
      value: <AnimatedCounter value={1240} duration={1.5} />,
      sub: 'SOH 70-80% / Minor Drift',
      description: 'Early capacity drift flagged by AI diagnostics. Pre-emptive balancing scheduled.',
      badge: (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          Watch
        </span>
      )
    },
    {
      label: 'CRITICAL PRIORITY',
      title: 'High Risk Alert',
      value: <AnimatedCounter value={340} duration={1.6} />,
      sub: 'Urgent Service Advised',
      description: 'Rapid internal resistance rise detected. Automated service dispatch triggered.',
      badge: (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
          Critical
        </span>
      )
    },
    {
      label: 'CIRCULARITY POOL',
      title: 'Second-Life Candidates',
      value: <AnimatedCounter value={174} duration={1.7} />,
      sub: 'Ready for Stationary Duty',
      description: 'Packs retired from mobility duty certified for BESS and microgrid energy storage.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">2nd Life</span>
    },
    {
      label: 'WARRANTY AI',
      title: 'Warranty Risk Saved',
      value: <AnimatedCounter value={1.42} prefix="$" suffix="M" decimals={2} duration={1.8} />,
      sub: 'Predicted Failure Prevention',
      description: 'Predictive module-level repairs avoiding complete pack swaps and OEM recall exposure.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">ROI 4.8x</span>
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 text-zinc-900 dark:text-zinc-100 relative"
    >
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-20 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl" />

      {/* Top Banner with Org Context & Actions */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800 relative z-10"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              XYZ Battery Corp. Global Fleet Command
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
              Simulated Fleet Scale (10k Assets)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1.5 flex items-center gap-2">
            <span>Manufacturer & Fleet Intelligence</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Production registration, warranty monitoring, and automated lifecycle dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/manufacturer/batteries/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register New Battery</span>
          </Link>
          <Link
            href="/manufacturer/fleet"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <span>Fleet View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Interactive Fleet Intelligence Magic Bento */}
      <MagicBento 
        cards={bentoStats}
        textAutoHide={false}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={320}
        particleCount={14}
        glowColor="19, 122, 88"
      />

      {/* Action Required Banner: Batteries Needing ReVoltX Inspection */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
      >
        <BorderBeam size={160} duration={8} colorFrom="#F59E0B" colorMid="#0070F3" colorTo="#38BDF8" hoverOnly={true} />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 ring-4 ring-amber-500/5">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>Fleet Health Alerts: Immediate Assessment Recommended</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/20">
                  Priority Action
                </span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Batteries crossing health thresholds in active service routes.
              </p>
            </div>
          </div>
          <Link
            href="/manufacturer/service-requests"
            className="text-xs font-semibold text-[#137A58] dark:text-[#34D399] hover:underline"
          >
            <span>Manage All Service Requests</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Highlight star battery RX-2026-892738 */}
        <motion.div 
          whileHover={{ scale: 1.005 }}
          className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors hover:border-amber-500/40"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100">RX-2026-892738</span>
              <span className="text-[10px] font-mono font-bold bg-[#EFF6FF] dark:bg-blue-950/50 text-[#0070F3] dark:text-[#38BDF8] px-1.5 py-0.5 rounded border border-blue-500/20">
                NASA B0005
              </span>
              <BatteryStatusBadge stage="HEALTH_MONITORING" size="sm" />
              <BatteryStatusBadge risk="Moderate" size="sm" />
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1">
              Vehicle: EcoRider V3 Commercial Courier (Sarah Jenkins)
            </p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">
              Warning: SOH at 71.4% • Accelerated thermal degradation during fast charge • RUL ~384 cycles
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/manufacturer/batteries/RX-2026-892738"
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 transition-colors"
            >
              Examine Telemetry
            </Link>
            <Link
              href="/manufacturer/service-requests"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Request ReVoltX Health Assessment</span>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Registered Battery Catalog Preview */}
      <motion.div 
        id="registry"
        variants={itemVariants}
        className="bg-white dark:bg-zinc-900/80 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 relative overflow-hidden scroll-mt-20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>Registered Battery Asset Registry</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {batteries.length} Verified Assets
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Connected to ReVoltX universal database with live synchronized telemetry.
            </p>
          </div>

          <Link
            href="/manufacturer/batteries"
            className="text-xs font-semibold text-[#137A58] dark:text-[#34D399] hover:underline flex items-center gap-1"
          >
            <span>View All Assets ({batteries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase font-bold text-zinc-500 dark:text-zinc-400">
                <th className="pb-3 font-semibold">Battery ID / NASA Ref</th>
                <th className="pb-3 font-semibold">Chemistry</th>
                <th className="pb-3 font-semibold">Current SOH</th>
                <th className="pb-3 font-semibold">RUL Cycles</th>
                <th className="pb-3 font-semibold">RX Score</th>
                <th className="pb-3 font-semibold">Risk</th>
                <th className="pb-3 font-semibold">Lifecycle Stage</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {batteries.map((b, idx) => (
                <motion.tr 
                  key={b.id} 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(0, 112, 243, 0.03)', x: 2 }}
                  className={`transition-colors group ${b.lifecycleStage === 'REGISTERED' ? 'bg-emerald-500/[0.04] dark:bg-emerald-950/20' : ''}`}
                >
                  <td className="py-3 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Link href={`/manufacturer/batteries/${b.revoltXId}`} className="hover:text-[#137A58] dark:hover:text-[#34D399]">
                        {b.revoltXId}
                      </Link>
                      {b.nasaDatasetId && (
                        <span className="text-[10px] font-sans font-semibold text-[#137A58] dark:text-[#34D399] bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                          {b.nasaDatasetId}
                        </span>
                      )}
                      {b.lifecycleStage === 'REGISTERED' && (
                        <span className="text-[10px] font-sans font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-1.5 py-0.2 rounded-full border border-emerald-500/30 animate-pulse">
                          Newly Registered
                        </span>
                      )}
                    </div>
                    <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">{b.serialNumber}</span>
                  </td>
                  <td className="py-3 font-medium text-zinc-800 dark:text-zinc-200">{b.chemistry} ({b.capacity} Ah)</td>
                  <td className="py-3">
                    <span className={`font-mono font-bold ${b.currentSOH >= 80 ? 'text-[#137A58] dark:text-[#34D399]' : b.currentSOH >= 65 ? 'text-amber-500' : 'text-red-500'}`}>
                      {b.currentSOH}%
                    </span>
                  </td>
                  <td className="py-3 font-mono text-zinc-800 dark:text-zinc-200">{b.rul} cyc</td>
                  <td className="py-3 font-mono font-bold text-[#137A58] dark:text-[#34D399]">{b.rxScore}/100</td>
                  <td className="py-3">
                    <BatteryStatusBadge risk={b.risk} size="sm" />
                  </td>
                  <td className="py-3">
                    <BatteryStatusBadge stage={b.lifecycleStage} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/manufacturer/batteries/${b.revoltXId}`}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-[11px] transition-colors"
                      >
                        Inspect
                      </Link>
                      <Link
                        href={`/battery/${b.revoltXId}`}
                        className="text-zinc-400 hover:text-[#137A58] dark:hover:text-[#34D399]"
                        title="Open Digital Battery Passport"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

