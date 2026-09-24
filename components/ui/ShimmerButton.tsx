'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * React Bits inspired ShimmerButton component.
 * Renders a high-tech button with dynamic perimeter light flow and tactile press animation.
 */
export function ShimmerButton({
  shimmerColor = '#0070F3',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '16px',
  background = 'rgba(19, 122, 88, 1)',
  className = '',
  children,
  onClick,
  ...props
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative isolate flex items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md cursor-pointer ${className}`}
      style={{
        borderRadius,
        backgroundColor: background,
      }}
      onClick={onClick}
      {...(props as any)}
    >
      {/* Spark / Shimmer light beam */}
      <div
        className="pointer-events-none absolute -inset-[100%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${shimmerColor} 360deg)`,
        }}
      />

      {/* Backdrop overlay preserving border thickness */}
      <div
        className="absolute inset-[1.5px] rounded-[inherit] transition-colors"
        style={{
          backgroundColor: background,
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
