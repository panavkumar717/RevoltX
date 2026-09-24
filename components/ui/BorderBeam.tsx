'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BorderBeamProps {
  /** Size of the beam in pixels */
  size?: number;
  /** Duration of one full loop in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Border radius of the parent in pixels */
  borderRadius?: number;
  /** Primary gradient color */
  colorFrom?: string;
  /** Secondary gradient color */
  colorTo?: string;
  /** Accent highlight color */
  colorMid?: string;
  /** Whether the beam is only visible when parent is hovered */
  hoverOnly?: boolean;
  className?: string;
}

/**
 * React Bits / Magic UI inspired BorderBeam component.
 * Renders an animated luminous light beam that traces the exact boundary of any rounded card.
 */
export function BorderBeam({
  size = 140,
  duration = 6,
  delay = 0,
  borderRadius = 16,
  colorFrom = '#137A58',
  colorMid = '#21A879',
  colorTo = '#C9EF72',
  hoverOnly = false,
  className = '',
}: BorderBeamProps) {
  const gradientId = React.useId();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] transition-opacity duration-300 ${
        hoverOnly ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
      } ${className}`}
      style={{ zIndex: 1 }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
            <stop offset="50%" stopColor={colorMid} stopOpacity="1" />
            <stop offset="80%" stopColor={colorTo} stopOpacity="1" />
            <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
          </linearGradient>
          <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The Animated Border Path */}
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeDasharray={`${size} 800`}
          strokeLinecap="round"
          filter={`url(#glow-${gradientId})`}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -1200 }}
          transition={{
            repeat: Infinity,
            duration,
            ease: 'linear',
            delay,
          }}
        />
      </svg>
    </div>
  );
}
