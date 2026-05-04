'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScalesProps {
  size?: number;
  className?: string;
  darkMode?: boolean;
  orientation?: 'horizontal' | 'vertical' | 'diagonal';
  animateOnHover?: boolean;
  scaleAmount?: number;
}

/**
 * Scales Component
 * 
 * Decorative diagonal striped border pattern with optional hover animation.
 * Creates elegant 45-degree lines for framing elements.
 * Features:
 * - Smooth scale animation on parent hover
 * - Customizable scale amount
 * - Multiple orientation options
 * - Dark/light mode support
 */
export const Scales: React.FC<ScalesProps> = ({
  size = 10,
  className = '',
  darkMode = true,
  orientation = 'diagonal',
  animateOnHover = true,
  scaleAmount = 1.15,
}) => {
  const getGradientAngle = () => {
    switch (orientation) {
      case 'horizontal':
        return '0deg';
      case 'vertical':
        return '90deg';
      case 'diagonal':
      default:
        return '45deg';
    }
  };

  // White/light for dark mode visibility, grey for light mode
  const lineColor = darkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(100, 116, 139, 0.5)';
  const hoverLineColor = darkMode ? 'rgba(34, 211, 238, 0.5)' : 'rgba(59, 130, 246, 0.6)';

  return (
    <motion.div
      className={`h-full w-full group/scales ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(
          ${getGradientAngle()},
          ${lineColor} 0px,
          ${lineColor} 1px,
          transparent 1px,
          transparent ${size}px
        )`,
        backgroundSize: `${size}px ${size}px`,
        transformOrigin: 'center',
      }}
      whileHover={animateOnHover ? { scale: scaleAmount } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  );
};

export default Scales;
