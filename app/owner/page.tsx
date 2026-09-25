'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Wrench, 
  ArrowRight, 
  QrCode, 
  AlertTriangle, 
  ShoppingBag, 
  Sparkles,
  Info,
  Calendar,
  CheckCircle2,
  Radio
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { RXScoreGauge } from '../../components/ui/RXScoreGauge';
import { HealthGauge } from '../../components/ui/HealthGauge';
import { BatteryStatusBadge } from '../../components/ui/BatteryStatusBadge';
import { LifecycleTimeline } from '../../components/ui/LifecycleTimeline';
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

export default function OwnerDashboardPage() {
  const { getBattery, batteries } = useReVoltX();
  const battery = getBattery('RX-2026-892738') || batteries[0];

  const nominalKWh = battery.capacity && battery.nominalVoltage
    ? ((battery.capacity * battery.nominalVoltage) / 1000).toFixed(1)
    : '88.0';

  const usableKWh = (parseFloat(nominalKWh) * (battery.currentSOH / 100)).toFixed(1);

  const ownerBentoCards: MagicBentoCardItem[] = [
    {
      label: 'REVOLTX SCORE',
      title: 'Health & Balance Rating',
      value: (
        <span>
          <AnimatedCounter value={battery.rxScore} duration={1.2} /> / 100
        </span>
      ),
      sub: battery.rxScore >= 80 ? 'Grade A (Prime Mobile)' : battery.rxScore >= 60 ? 'Grade B+ (Stationary Ready)' : 'Grade C (Recycle Candidate)',
      description: 'Based on multi-cycle impedance tests, voltage consistency, and thermal stability.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">Grade B+</span>
    },
    {
      label: 'STATE OF HEALTH',
      title: 'Remaining Capacity',
      value: <AnimatedCounter value={battery.currentSOH} suffix="%" decimals={battery.currentSOH % 1 !== 0 ? 1 : 0} duration={1.3} />,
      sub: battery.currentSOH < 75 ? 'Second-Life Recommended' : 'Optimal Operating Range',
      description: `Nominal baseline ${nominalKWh} kWh. Current usable retention is ${usableKWh} kWh (${battery.currentCapacityAh ?? battery.capacity} Ah).`,
      badge: (
        <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
          battery.currentSOH < 75 
            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
            : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
        }`}>
          {battery.currentSOH < 75 && <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>}
          {battery.currentSOH < 75 ? 'Transition Due' : 'Healthy'}
        </span>
      )
    },
    {
      label: 'REMAINING LIFE',
      title: 'Expected Useful Life',
      value: <AnimatedCounter value={battery.rul} suffix=" cycles" duration={1.4} />,
      sub: `~${(battery.rul / 365).toFixed(1)} yrs courier service`,
      description: 'Calculated using AI cycle extrapolation under current daily driving & charge patterns.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">Active</span>
    },
    {
      label: 'RESIDUAL VALUE',
      title: 'Estimated Trade-In Credit',
      value: <AnimatedCounter value={battery.marketPrice || 1850} prefix="$" duration={1.5} />,
      sub: 'Guaranteed Buyback Floor',
      description: 'Certified second-life stationary buyers will bid directly for your pack upon vehicle retirement.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">Secured</span>
    },
    {
      label: 'CIRCULAR IMPACT',
      title: 'Carbon Offset Yield',
      value: <AnimatedCounter value={4.8} suffix=" tCO2e" decimals={1} duration={1.6} />,
      sub: 'Lifecycle Footprint Prevented',
      description: 'Repurposing this battery for solar buffer duty offsets mining 180kg of virgin raw minerals.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">Eco Score 94</span>
    },
    {
      label: 'DIAGNOSTICS & ACTIONS',
      title: 'Smart Health Check',
      value: 'Certified',
      sub: 'Next Inspection in 30 Days',
      description: 'Schedule a certified ReVoltX technician dock assessment or explore replacement packs.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#137A58] dark:text-[#34D399] border border-emerald-500/20 font-bold">Available</span>
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6 relative"
    >
      {/* Ambient background glow orbs */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />

      {/* Customer Hero: My Battery */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-zinc-900/80 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group"
      >
        <BorderBeam size={180} duration={7} colorFrom="#0070F3" colorMid="#38BDF8" colorTo="#10B981" hoverOnly={true} />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#137A58] dark:text-[#34D399] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              Connected Vehicle Battery
            </span>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
              My Battery: <span className="font-mono">{battery.revoltXId}</span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
              Installed in {battery.vehicleModel} • Registered to Sarah Jenkins
            </p>
          </div>

          <div className="flex items-center gap-2">
            <BatteryStatusBadge risk={battery.risk} size="md" />
            <Link
              href={`/battery/${battery.revoltXId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 transition-colors"
            >
              <QrCode className="w-4 h-4 text-[#137A58] dark:text-[#34D399]" />
              <span>Digital Passport</span>
            </Link>
          </div>
        </div>

        {/* Magic Bento Core Battery Telemetry */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 relative z-10">
          <MagicBento 
            cards={ownerBentoCards}
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="19, 122, 88"
          />
        </div>
      </motion.div>

      {/* Human-Friendly ReVoltX Health Recommendation Banner */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-xs space-y-4"
      >
        <BorderBeam size={160} duration={8} colorFrom="#F59E0B" colorMid="#D97706" colorTo="#FBBF24" hoverOnly={true} />

        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-white dark:bg-zinc-800 text-amber-500 shadow-xs ring-4 ring-amber-500/10">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                ReVoltX Intelligence Notice
              </span>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {battery.humanAnomalyExplanation || 'Your battery has been running warmer than expected during rapid charging.'}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                While your battery is still operating safely, its capacity has dipped to {battery.currentSOH}%. We recommend scheduling a certified ReVoltX technician health assessment.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/owner/service"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Book Battery Health Check</span>
          </Link>

          <Link
            href="/owner/marketplace"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#137A58] dark:text-[#34D399]" />
            <span>Explore Replacement Batteries</span>
          </Link>
        </div>
      </motion.div>

      {/* Health & Intelligence Visualizer */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
          <HealthGauge
            soh={battery.currentSOH}
            soc={battery.soc}
            rul={battery.rul}
            temperature={battery.temperature}
            initialSOH={battery.initialSOH}
          />
        </motion.div>

        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-zinc-900/80 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Battery Intelligence Rating
            </span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
              RX Score (Cell Balance & Safety)
            </h3>
          </div>

          <div className="my-3 flex justify-center">
            <RXScoreGauge score={battery.rxScore} size="md" showDetails={true} />
          </div>

          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            When you eventually upgrade, this battery will qualify for <strong className="text-zinc-900 dark:text-zinc-100">Second-Life Solar Energy Storage</strong> instead of landfill waste.
          </p>
        </motion.div>
      </motion.div>

      {/* Battery Lifecycle Roadmap */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-zinc-900/80 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Lifecycle Pathway
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Where Your Battery Sits in the Circular Loop
            </h3>
          </div>
          <Link href="/owner/lifecycle" className="text-xs font-semibold text-[#137A58] dark:text-[#34D399] hover:underline">
            View Roadmap →
          </Link>
        </div>

        <LifecycleTimeline
          currentStage={battery.lifecycleStage}
          events={battery.lifecycleEvents}
          orientation="horizontal"
          showDetails={false}
        />
      </motion.div>
    </motion.div>
  );
}

