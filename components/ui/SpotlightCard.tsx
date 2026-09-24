'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BorderBeam } from './BorderBeam';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  enableTilt?: boolean;
  enableBeam?: boolean;
  beamDuration?: number;
  beamColorFrom?: string;
  beamColorMid?: string;
  beamColorTo?: string;
  borderRadius?: number;
  hoverScale?: number;
}

/**
 * React Bits inspired SpotlightCard component.
 * Features:
 * 1. Cursor-following boundary spotlight glow on hover
 * 2. Animated luminous perimeter border beam on hover
 * 3. Physics-based 3D perspective tilt
 * 4. Micro-elevation on hover
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 112, 243, 0.15)',
  spotlightSize = 350,
  enableTilt = true,
  enableBeam = true,
  beamDuration = 5,
  beamColorFrom = '#0070F3',
  beamColorMid = '#6366F1',
  beamColorTo = '#38BDF8',
  borderRadius = 16,
  hoverScale = 1.015,
  style,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Spring physics for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      setMousePos({ x: clientX, y: clientY });

      if (enableTilt) {
        const width = rect.width;
        const height = rect.height;
        const mouseX = (clientX - width / 2) / width;
        const mouseY = (clientY - height / 2) / height;
        x.set(mouseX);
        y.set(mouseY);
      }
    },
    [enableTilt, x, y]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      animate={{
        scale: isHovered ? hoverScale : 1,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 25 },
      }}
      className={`group relative overflow-hidden transition-shadow duration-300 ${className}`}
      {...(props as any)}
    >
      {/* Dynamic Boundary Spotlight (Border Highlight following cursor) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(33, 168, 121, 0.55), rgba(19, 122, 88, 0.15) 40%, transparent 80%)`,
          zIndex: 2,
        }}
      />

      {/* Internal Radial Glow following cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize * 1.2}px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`,
          zIndex: 1,
        }}
      />

      {/* Luminous Animated Border Beam on hover */}
      {enableBeam && (
        <BorderBeam
          hoverOnly={true}
          borderRadius={borderRadius}
          duration={beamDuration}
          colorFrom={beamColorFrom}
          colorMid={beamColorMid}
          colorTo={beamColorTo}
        />
      )}

      {/* Card Content with 3D Z-index lift */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}
