'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QrCode, ExternalLink, Copy, Check, ShieldCheck } from 'lucide-react';

interface QRCodeWidgetProps {
  batteryId: string;
  revoltXId: string;
  size?: number;
  showScanAction?: boolean;
}

export const QRCodeWidget: React.FC<QRCodeWidgetProps> = ({
  batteryId,
  revoltXId,
  size = 140,
  showScanAction = true
}) => {
  const [copied, setCopied] = useState(false);
  const passportPath = `/battery/${revoltXId || batteryId}`;

  const copyPassportLink = () => {
    if (typeof window !== 'undefined') {
      const fullUrl = `${window.location.origin}${passportPath}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#DDE7E2] shadow-xs flex flex-col items-center text-center">
      <div className="relative p-3 bg-[#F7FAF8] rounded-xl border border-[#DDE7E2] group overflow-hidden">
        {/* Animated Laser Scanning Beam */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#137A58] to-transparent animate-scan-beam pointer-events-none opacity-80" />

        {/* Crisp Stylized SVG QR Matrix */}
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          className="rounded-md"
        >
          {/* Background */}
          <rect width="100" height="100" fill="#FFFFFF" />

          {/* Corner finder patterns */}
          {/* Top Left */}
          <rect x="10" y="10" width="24" height="24" rx="3" fill="#137A58" />
          <rect x="14" y="14" width="16" height="16" rx="2" fill="#FFFFFF" />
          <rect x="18" y="18" width="8" height="8" rx="1" fill="#137A58" />

          {/* Top Right */}
          <rect x="66" y="10" width="24" height="24" rx="3" fill="#137A58" />
          <rect x="70" y="14" width="16" height="16" rx="2" fill="#FFFFFF" />
          <rect x="74" y="18" width="8" height="8" rx="1" fill="#137A58" />

          {/* Bottom Left */}
          <rect x="10" y="66" width="24" height="24" rx="3" fill="#137A58" />
          <rect x="14" y="70" width="16" height="16" rx="2" fill="#FFFFFF" />
          <rect x="18" y="74" width="8" height="8" rx="1" fill="#137A58" />

          {/* Data Modules (Deterministic Pattern) */}
          <rect x="38" y="10" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="48" y="10" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="56" y="10" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="38" y="20" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="48" y="26" width="6" height="6" fill="#10201B" rx="1" />

          <rect x="10" y="38" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="18" y="46" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="26" y="38" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="26" y="52" width="6" height="6" fill="#10201B" rx="1" />

          {/* Center Brand Monogram */}
          <rect x="40" y="40" width="20" height="20" rx="4" fill="#137A58" />
          <text 
            x="50" 
            y="54" 
            textAnchor="middle" 
            fill="#FFFFFF" 
            fontSize="10" 
            fontWeight="bold" 
            fontFamily="monospace"
          >
            RX
          </text>

          {/* Dynamic Data Blocks */}
          <rect x="66" y="38" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="76" y="46" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="84" y="38" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="76" y="54" width="6" height="6" fill="#10201B" rx="1" />

          <rect x="38" y="66" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="46" y="74" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="56" y="66" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="38" y="82" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="50" y="84" width="6" height="6" fill="#10201B" rx="1" />

          <rect x="66" y="66" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="76" y="74" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="84" y="82" width="6" height="6" fill="#10201B" rx="1" />
          <rect x="72" y="84" width="6" height="6" fill="#10201B" rx="1" />
        </svg>
      </div>

      <div className="mt-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#62756E] block">
          Digital Battery Passport
        </span>
        <span className="text-xs font-mono font-bold text-[#10201B] mt-0.5 block">
          {revoltXId || batteryId}
        </span>
      </div>

      <div className="mt-1 flex items-center gap-1 text-[11px] text-[#137A58] font-medium">
        <ShieldCheck className="w-3.5 h-3.5" /> ReVoltX Cryptographic Seal
      </div>

      {showScanAction && (
        <div className="mt-3 flex items-center gap-2 w-full">
          <Link
            href={passportPath}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#137A58] text-white text-xs font-semibold hover:bg-[#0E5B42] transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" /> Scan / Open
          </Link>
          <button
            type="button"
            onClick={copyPassportLink}
            className="p-1.5 rounded-xl border border-[#DDE7E2] hover:bg-[#F0F5F2] text-[#62756E] transition-colors"
            title="Copy Passport URL"
          >
            {copied ? <Check className="w-4 h-4 text-[#137A58]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};
