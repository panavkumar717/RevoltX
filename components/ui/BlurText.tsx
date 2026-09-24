'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface BlurTextProps extends HTMLMotionProps<'div'> {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * React Bits inspired BlurText component.
 * Blurs and staggers each word or letter smoothly into place when scrolled into view.
 */
export function BlurText({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  ...props
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      transform: direction === 'bottom' ? 'translate3d(0, 16px, 0)' : 'translate3d(0, -16px, 0)',
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: rootMargin }}
      variants={containerVariants}
      className={`inline-flex flex-wrap ${className}`}
      {...props}
    >
      {elements.map((el, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{ willChange: 'transform, filter, opacity' }}
        >
          {el}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  );
}
