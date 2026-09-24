'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerWidth?: number;
}

/**
 * React Bits inspired ShinyText component.
 * Produces an elegant, continuous sweeping light gleam across text.
 */
export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  shimmerWidth = 100,
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block font-bold text-transparent bg-clip-text transition-all ${
        disabled ? '' : 'animate-shimmer-sweep'
      } ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, currentColor 0%, currentColor 35%, #38BDF8 50%, #0070F3 65%, currentColor 80%, currentColor 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}
