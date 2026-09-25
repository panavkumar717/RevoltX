'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Copy,
  Check,
  Eye,
  QrCode,
  Zap,
  X,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { useReVoltX } from '../../lib/store/batteryStore';
import { Battery, LifecycleStage, RiskLevel } from '../../lib/types';
import { BatteryStatusBadge } from '../../components/ui/BatteryStatusBadge';
import MagicBento, { MagicBentoCardItem } from '../../components/ui/MagicBento';

type FilterTab = 'ALL' | 'HEALTHY' | 'MODERATE' | 'CRITICAL' | 'SECOND_LIFE';
type SortField = 'soh' | 'score' | 'rul' | 'id';

const getCompactStage = (stage?: LifecycleStage) => {
  switch (stage) {
    case 'FIRST_LIFE': return { label: 'First Life', color: 'bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8] border-blue-500/20' };
    case 'HEALTH_MONITORING': return { label: 'Monitoring', color: 'bg-sky-500/10 text-[#0284C7] dark:text-sky-400 border-sky-500/20' };
    case 'ASSESSMENT': return { label: 'Smart Dock', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' };
    case 'SECOND_LIFE': return { label: '2nd Life', color: 'bg-indigo-500/10 text-[#6366F1] dark:text-indigo-400 border-indigo-500/20' };
    case 'LIFECYCLE_CLOSED': return { label: 'Recycled', color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20' };
    case 'RECYCLING': return { label: 'Recycling', color: 'bg-red-500/10 text-red-600 border-red-500/20' };
    case 'REGISTERED': return { label: 'Registered', color: 'bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8] border-blue-500/20' };
    case 'CONTINUE_USE': return { label: 'Approved', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' };
    default: return { label: 'Active', color: 'bg-zinc-500/10 text-zinc-600 border-zinc-500/20' };
  }
};

const getCompactRisk = (risk?: RiskLevel) => {
  switch (risk) {
    case 'Low': return { label: 'Low', color: 'bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8] border-blue-500/20', dot: 'bg-[#0070F3]' };
    case 'Moderate': return { label: 'Moderate', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', dot: 'bg-amber-500' };
    case 'High': return { label: 'High', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20', dot: 'bg-red-500' };
    case 'Critical': return { label: 'Critical', color: 'bg-red-600 text-white border-transparent', dot: 'bg-white' };
    default: return { label: risk || 'Normal', color: 'bg-zinc-500/10 text-zinc-600 border-zinc-500/20', dot: 'bg-zinc-400' };
  }
};

export default function ManufacturerDashboardPage() {
  const { batteries } = useReVoltX();

  // Component State for Battery Asset Registry
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const [chemistryFilter, setChemistryFilter] = useState<'ALL' | 'LFP' | 'NMC'>('ALL');
  const [sortField, setSortField] = useState<SortField>('soh');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [inspectBattery, setInspectBattery] = useState<Battery | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    showToast(`Copied ${id} to clipboard`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Metrics summary
  const metrics = useMemo(() => {
    const total = batteries.length;
    const healthy = batteries.filter(b => b.currentSOH >= 80).length;
    const moderate = batteries.filter(b => b.currentSOH >= 65 && b.currentSOH < 80).length;
    const critical = batteries.filter(b => b.currentSOH < 65 || b.risk === 'Critical' || b.risk === 'High').length;
    const secondLife = batteries.filter(b => b.lifecycleStage === 'SECOND_LIFE' || (b.currentSOH >= 65 && b.currentSOH < 80)).length;
    const avgSoh = total > 0 ? (batteries.reduce((acc, b) => acc + b.currentSOH, 0) / total).toFixed(1) : '0';
    return { total, healthy, moderate, critical, secondLife, avgSoh };
  }, [batteries]);

  // Filtered & sorted batteries
  const filteredBatteries = useMemo(() => {
    return batteries
      .filter(b => {
        // Tab filter
        if (activeTab === 'HEALTHY' && b.currentSOH < 80) return false;
        if (activeTab === 'MODERATE' && (b.currentSOH < 65 || b.currentSOH >= 80)) return false;
        if (activeTab === 'CRITICAL' && b.currentSOH >= 65 && b.risk !== 'Critical' && b.risk !== 'High') return false;
        if (activeTab === 'SECOND_LIFE' && b.lifecycleStage !== 'SECOND_LIFE' && !(b.currentSOH >= 65 && b.currentSOH < 80)) return false;

        // Chemistry filter
        if (chemistryFilter !== 'ALL' && b.chemistry !== chemistryFilter) return false;

        // Search filter
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchId = b.revoltXId.toLowerCase().includes(q);
          const matchSerial = b.serialNumber.toLowerCase().includes(q);
          const matchNasa = b.nasaDatasetId && b.nasaDatasetId.toLowerCase().includes(q);
          const matchModel = b.vehicleModel && b.vehicleModel.toLowerCase().includes(q);
          const matchOwner = b.ownerName && b.ownerName.toLowerCase().includes(q);
          const matchChem = b.chemistry.toLowerCase().includes(q);
          if (!matchId && !matchSerial && !matchNasa && !matchModel && !matchOwner && !matchChem) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortField === 'soh') diff = a.currentSOH - b.currentSOH;
        else if (sortField === 'score') diff = a.rxScore - b.rxScore;
        else if (sortField === 'rul') diff = a.rul - b.rul;
        else if (sortField === 'id') diff = a.revoltXId.localeCompare(b.revoltXId);
        return sortOrder === 'asc' ? diff : -diff;
      });
  }, [batteries, activeTab, chemistryFilter, search, sortField, sortOrder]);

  const handleExportCsv = () => {
    const headers = ['Battery ID', 'Serial Number', 'Chemistry', 'Capacity (Ah)', 'SOH (%)', 'RUL (Cycles)', 'RX Score', 'Risk', 'Lifecycle Stage', 'Vehicle'];
    const rows = filteredBatteries.map(b => [
      b.revoltXId,
      b.serialNumber,
      b.chemistry,
      b.capacity,
      b.currentSOH,
      b.rul,
      b.rxScore,
      b.risk,
      b.lifecycleStage,
      `"${b.vehicleModel || 'N/A'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `revoltx_fleet_batteries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredBatteries.length} battery records as CSV`);
  };

  const bentoStats: MagicBentoCardItem[] = [
    {
      label: 'GLOBAL FLEET',
      title: 'Total Active Batteries',
      value: '10,000',
      sub: '+240 this month',
      description: 'High-density commercial pack telemetry synchronized across 14 operational regions.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8] border border-blue-500/20 font-bold">+2.4% MoM</span>
    },
    {
      label: 'NOMINAL FLEET',
      title: 'Healthy & Nominal',
      value: '8,420',
      sub: '84.2% Fleet Nominal',
      description: 'Impedance and thermal metrics well within factory tolerances without micro-shorts.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8] border border-blue-500/20 font-bold">Grade A</span>
    },
    {
      label: 'ADVISORY QUEUE',
      title: 'Attention Required',
      value: '1,240',
      sub: 'SOH 70-80% / Minor Drift',
      description: 'Early capacity drift flagged by AI diagnostics. Pre-emptive balancing scheduled.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">Watch</span>
    },
    {
      label: 'CRITICAL PRIORITY',
      title: 'High Risk Alert',
      value: '340',
      sub: 'Urgent Service Advised',
      description: 'Rapid internal resistance rise detected. Automated service dispatch triggered.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold">Critical</span>
    },
    {
      label: 'CIRCULARITY POOL',
      title: 'Second-Life Candidates',
      value: '174',
      sub: 'Ready for Stationary Duty',
      description: 'Packs retired from mobility duty certified for BESS and microgrid energy storage.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">2nd Life</span>
    },
    {
      label: 'WARRANTY AI',
      title: 'Warranty Risk Saved',
      value: '$1.42M',
      sub: 'Predicted Failure Prevention',
      description: 'Predictive module-level repairs avoiding complete pack swaps and OEM recall exposure.',
      badge: <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8] border border-blue-500/20 font-bold">ROI 4.8x</span>
    }
  ];

  return (
    <div className="space-y-6 text-zinc-900 dark:text-zinc-100 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200 border border-zinc-700 dark:border-zinc-200">
          <Check className="w-4 h-4 text-[#0070F3] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner with Org Context & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3] dark:text-[#38BDF8] bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              XYZ Battery Corp. Global Fleet Command
            </span>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
              Simulated Fleet Scale (10k Assets)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1.5 tracking-tight">
            Manufacturer & Fleet Intelligence
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Production registration, telemetry monitoring, AI degradation diagnostics, and automated lifecycle dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/manufacturer/batteries/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] shadow-xs hover:shadow-md transition-all"
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
      </div>

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
        glowColor="0, 112, 243"
      />

      {/* Action Required Banner: Batteries Needing ReVoltX Inspection */}
      <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Fleet Health Alerts: Immediate Assessment Recommended
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Batteries crossing degradation thresholds in active service routes.
              </p>
            </div>
          </div>
          <Link
            href="/manufacturer/service-requests"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0070F3] dark:text-[#38BDF8] hover:underline"
          >
            <span>Manage All Service Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Highlight star battery RX-2026-892738 */}
        <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100">RX-2026-892738</span>
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

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => {
                const target = batteries.find(b => b.revoltXId === 'RX-2026-892738');
                if (target) setInspectBattery(target);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-[#0070F3] dark:text-[#38BDF8]" />
              <span>Inspect Telemetry</span>
            </button>
            <Link
              href="/manufacturer/service-requests"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0070F3] text-white text-xs font-bold hover:bg-[#0058C6] transition-colors shadow-xs"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Request ReVoltX Health Assessment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* REGISTERED BATTERY ASSET REGISTRY - COMPACT FULL-WIDTH TABLE     */}
      {/* ================================================================ */}
      <div className="bg-white dark:bg-zinc-900/90 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        {/* Component Header & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8]">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Registered Battery Asset Registry
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8] border border-blue-500/20 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0070F3] animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Connected to ReVoltX universal database • Real-time telemetry, SOH degradation, EIS scoring & digital passport routing.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-2xs cursor-pointer"
              title="Export visible assets to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <Link
              href="/manufacturer/batteries/register"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0070F3] hover:bg-[#0058C6] text-white text-xs font-bold transition-all shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Register Battery</span>
            </Link>

            <Link
              href="/manufacturer/batteries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0070F3] dark:text-[#38BDF8] hover:underline px-2 py-1.5"
            >
              <span>View All ({batteries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Fleet Metrics Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <div className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Monitored</span>
            <span className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{metrics.total} Assets</span>
            <span className="text-[10px] text-zinc-400">Universal Registry</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0070F3] dark:text-[#38BDF8]">Fleet Avg SOH</span>
            <span className="text-lg font-mono font-bold text-[#0070F3] dark:text-[#38BDF8] mt-0.5">{metrics.avgSoh}%</span>
            <span className="text-[10px] text-zinc-500">Nominal Mean Retention</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Healthy (≥80%)</span>
            <span className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{metrics.healthy} Packs</span>
            <span className="text-[10px] text-zinc-500">Optimal Operation</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Advisory Queue</span>
            <span className="text-lg font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5">{metrics.moderate} Packs</span>
            <span className="text-[10px] text-zinc-500">SOH 65-79%</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 flex flex-col col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Critical / Alert</span>
            <span className="text-lg font-mono font-bold text-red-600 dark:text-red-400 mt-0.5">{metrics.critical} Packs</span>
            <span className="text-[10px] text-zinc-500">Immediate Service</span>
          </div>
        </div>

        {/* Filter Tabs & Search Controls */}
        <div className="space-y-2.5">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-zinc-100 dark:border-zinc-800">
            {[
              { id: 'ALL', label: 'All Assets', count: metrics.total },
              { id: 'HEALTHY', label: 'Healthy (≥80%)', count: metrics.healthy },
              { id: 'MODERATE', label: 'Needs Attention', count: metrics.moderate },
              { id: 'CRITICAL', label: 'Critical Alerts', count: metrics.critical },
              { id: 'SECOND_LIFE', label: '2nd-Life Candidates', count: metrics.secondLife },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as FilterTab)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0070F3] text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Select Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-0.5">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search battery ID (e.g. RX-2026), serial, vehicle, or chemistry..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8.5 pr-8 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#0070F3] transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 flex-wrap">
              {/* Chemistry Filter */}
              <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <Filter className="w-3.5 h-3.5 text-zinc-400" />
                <select
                  value={chemistryFilter}
                  onChange={e => setChemistryFilter(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="dark:bg-zinc-900">All Chemistries</option>
                  <option value="LFP" className="dark:bg-zinc-900">LFP (Iron Phosphate)</option>
                  <option value="NMC" className="dark:bg-zinc-900">NMC (Nickel Manganese)</option>
                </select>
              </div>

              {/* Sort Order */}
              <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                <select
                  value={`${sortField}-${sortOrder}`}
                  onChange={e => {
                    const [f, o] = e.target.value.split('-') as [SortField, 'asc' | 'desc'];
                    setSortField(f);
                    setSortOrder(o);
                  }}
                  className="bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value="soh-asc" className="dark:bg-zinc-900">Sort: Lowest SOH (Alerts)</option>
                  <option value="soh-desc" className="dark:bg-zinc-900">Sort: Highest SOH</option>
                  <option value="score-desc" className="dark:bg-zinc-900">Sort: RX Score</option>
                  <option value="rul-desc" className="dark:bg-zinc-900">Sort: Remaining Cycles</option>
                  <option value="id-asc" className="dark:bg-zinc-900">Sort: Battery ID (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Full-Width Table (Zero Side Scrolling) */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
          <table className="w-full text-left text-xs table-auto">
            <thead>
              <tr className="bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-wider">
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap">Battery ID / Serial</th>
                <th className="py-2.5 px-2.5 font-semibold whitespace-nowrap">Asset & Chem</th>
                <th className="py-2.5 px-2.5 font-semibold whitespace-nowrap">Health (SOH)</th>
                <th className="py-2.5 px-2 font-semibold whitespace-nowrap">RUL</th>
                <th className="py-2.5 px-2 font-semibold whitespace-nowrap">Score</th>
                <th className="py-2.5 px-2 font-semibold whitespace-nowrap">Risk</th>
                <th className="py-2.5 px-2.5 font-semibold whitespace-nowrap">Stage</th>
                <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {filteredBatteries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                    <div className="max-w-xs mx-auto space-y-2">
                      <div className="h-10 w-10 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <Search className="w-5 h-5" />
                      </div>
                      <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">No matching battery assets</p>
                      <p className="text-xs text-zinc-400">Try adjusting your search query, chemistry filter, or status tab.</p>
                      <button
                        type="button"
                        onClick={() => { setSearch(''); setActiveTab('ALL'); setChemistryFilter('ALL'); }}
                        className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-[#0070F3] dark:text-[#38BDF8] font-semibold text-xs hover:bg-blue-500/20 transition-colors cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBatteries.map((b) => {
                  const isHealthy = b.currentSOH >= 80;
                  const isModerate = b.currentSOH >= 65 && b.currentSOH < 80;

                  const sohColor = isHealthy ? 'text-[#0070F3] dark:text-[#38BDF8]' : isModerate ? 'text-amber-500' : 'text-red-500';
                  const sohBarGradient = isHealthy 
                    ? 'bg-gradient-to-r from-blue-500 to-[#38BDF8]' 
                    : isModerate 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                    : 'bg-gradient-to-r from-red-600 to-rose-400';

                  const stageConfig = getCompactStage(b.lifecycleStage);
                  const riskConfig = getCompactRisk(b.risk);

                  return (
                    <tr 
                      key={b.id} 
                      className="hover:bg-blue-50/30 dark:hover:bg-zinc-800/60 transition-colors group"
                    >
                      {/* Battery ID & Serial */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setInspectBattery(b)}
                            className="font-mono font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#0070F3] dark:group-hover:text-[#38BDF8] text-xs text-left cursor-pointer transition-colors whitespace-nowrap"
                            title="Click to inspect this battery"
                          >
                            {b.revoltXId}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleCopyId(e, b.revoltXId)}
                            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                            title="Copy Battery ID"
                          >
                            {copiedId === b.revoltXId ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 whitespace-nowrap">
                          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">{b.serialNumber}</span>
                          {b.nasaDatasetId && (
                            <span className="text-[9px] font-mono px-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                              {b.nasaDatasetId}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Asset & Chemistry */}
                      <td className="py-2.5 px-2.5">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold font-mono border ${
                            b.chemistry === 'LFP' 
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                              : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
                          }`}>
                            {b.chemistry}
                          </span>
                          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                            {b.capacity}Ah
                          </span>
                        </div>
                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate max-w-[110px]" title={b.vehicleModel}>
                          {b.vehicleModel || 'Storage'}
                        </span>
                      </td>

                      {/* State of Health (SOH) */}
                      <td className="py-2.5 px-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono font-bold text-xs ${sohColor}`}>
                            {b.currentSOH}%
                          </span>
                          <div className="w-10 bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden shrink-0">
                            <div 
                              className={`h-full rounded-full ${sohBarGradient}`}
                              style={{ width: `${Math.min(100, Math.max(0, b.currentSOH))}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* RUL Cycles */}
                      <td className="py-2.5 px-2 whitespace-nowrap font-mono text-xs text-zinc-900 dark:text-zinc-100 font-semibold">
                        {b.rul.toLocaleString()} <span className="text-[10px] text-zinc-400 font-normal">cyc</span>
                      </td>

                      {/* RX Score */}
                      <td className="py-2.5 px-2 whitespace-nowrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md font-mono font-bold text-xs bg-blue-500/10 dark:bg-blue-950/30 text-[#0070F3] dark:text-[#38BDF8] border border-blue-500/20">
                          {b.rxScore}
                        </span>
                      </td>

                      {/* Risk */}
                      <td className="py-2.5 px-2 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${riskConfig.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${riskConfig.dot}`} />
                          {riskConfig.label}
                        </span>
                      </td>

                      {/* Lifecycle Stage */}
                      <td className="py-2.5 px-2.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${stageConfig.color}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          {stageConfig.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 justify-end">
                          <button
                            type="button"
                            onClick={() => setInspectBattery(b)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0070F3] hover:bg-[#0058C6] text-white font-semibold text-[11px] transition-all shadow-2xs cursor-pointer active:scale-95"
                            title="Quick inspect telemetry"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </button>

                          <Link
                            href={`/battery/${b.revoltXId}`}
                            className="p-1 rounded-lg text-zinc-400 hover:text-[#0070F3] dark:hover:text-[#38BDF8] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Open Digital Battery Passport"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Showing {filteredBatteries.length} of {batteries.length} batteries across universal fleet registry</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/manufacturer/batteries" className="text-[#0070F3] dark:text-[#38BDF8] hover:underline font-semibold">
              Manage In Inventory View →
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* INTERACTIVE QUICK INSPECT MODAL / SLIDE-OVER DRAWER              */}
      {/* ================================================================ */}
      {inspectBattery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop Click Dismiss */}
          <div className="absolute inset-0" onClick={() => setInspectBattery(null)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-6 max-h-[90vh] overflow-y-auto z-10 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0070F3] dark:text-[#38BDF8] bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                    Quick Telemetry Inspector
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    Serial: {inspectBattery.serialNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                    {inspectBattery.revoltXId}
                  </h3>
                  <BatteryStatusBadge stage={inspectBattery.lifecycleStage} size="sm" />
                  <BatteryStatusBadge risk={inspectBattery.risk} size="sm" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {inspectBattery.vehicleModel || 'Standard Fleet Asset'} • {inspectBattery.chemistry} ({inspectBattery.capacity} Ah) • Pack: {inspectBattery.packConfiguration}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInspectBattery(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Close Inspector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Health & Score Highlight Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Current SOH</span>
                <p className={`text-2xl font-mono font-bold mt-0.5 ${
                  inspectBattery.currentSOH >= 80 ? 'text-[#0070F3] dark:text-[#38BDF8]' : inspectBattery.currentSOH >= 65 ? 'text-amber-500' : 'text-red-500'
                }`}>
                  {inspectBattery.currentSOH}%
                </p>
                <span className="text-[10px] text-zinc-400">Factory Base: {inspectBattery.initialSOH}%</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">RX Score</span>
                <p className="text-2xl font-mono font-bold text-[#0070F3] dark:text-[#38BDF8] mt-0.5">
                  {inspectBattery.rxScore}<span className="text-xs text-zinc-400 font-normal">/100</span>
                </p>
                <span className="text-[10px] text-zinc-400">EIS Impedance</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">RUL Cycles</span>
                <p className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {inspectBattery.rul.toLocaleString()}
                </p>
                <span className="text-[10px] text-zinc-400">Est. Life Remaining</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Pack Temp</span>
                <p className={`text-2xl font-mono font-bold mt-0.5 ${
                  inspectBattery.temperature > 30 ? 'text-amber-500' : 'text-zinc-900 dark:text-zinc-100'
                }`}>
                  {inspectBattery.temperature}°C
                </p>
                <span className="text-[10px] text-zinc-400">Voltage: {inspectBattery.voltage}V</span>
              </div>
            </div>

            {/* AI Diagnostics & Anomaly Status */}
            {inspectBattery.anomaly ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>AI Diagnostics Anomaly Detected</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {inspectBattery.anomaly}
                </p>
                {inspectBattery.recommendation && (
                  <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                    <strong>Recommendation: </strong> {inspectBattery.recommendation}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400">Pack Operating Within Nominal Tolerances</h4>
                  <p className="text-zinc-600 dark:text-zinc-300 text-[11px] mt-0.5">
                    No cell imbalance or thermal runaway risk flagged. Electrochemical impedance is nominal.
                  </p>
                </div>
              </div>
            )}

            {/* Operational Specs Grid */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 text-xs grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Pack Configuration</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{inspectBattery.packConfiguration}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Nominal Voltage</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{inspectBattery.nominalVoltage} V</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Cycles Completed</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{inspectBattery.cycleCount} Full Cycles</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Manufacture Date</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{inspectBattery.manufactureDate}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Fleet Operator</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{inspectBattery.ownerName || 'XYZ Internal Fleet'}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Warranty Period</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{inspectBattery.warrantyPeriod || '5 Years / 2,000 Cyc'}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/manufacturer/batteries/${inspectBattery.revoltXId}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070F3] hover:bg-[#0058C6] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Full Telemetry & Degradation Curve</span>
                </Link>

                <Link
                  href={`/battery/${inspectBattery.revoltXId}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#0070F3] dark:text-[#38BDF8]" />
                  <span>Public Passport</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Link
                  href="/manufacturer/service-requests"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold transition-colors"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Request Assessment</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setInspectBattery(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
