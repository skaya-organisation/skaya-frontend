'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GridCardProps } from '../types';

/**
 * GridCard Component
 * 
 * Reusable card component for grid layouts with consistent styling.
 * Features:
 * - Smooth hover animations
 * - Dark/light mode support
 * - Optional hover effects
 * - Flexible content support
 */
export const GridCard: React.FC<GridCardProps> = ({
  children,
  darkMode = true,
  hover = true,
  className = '',
}) => {
  const borderColor = darkMode ? 'border-slate-700/40' : 'border-slate-200/60';
  const bgColor = darkMode ? 'bg-slate-900/20 backdrop-blur-md' : 'bg-white/30 backdrop-blur-md';
  const hoverBgColor = darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-100/40';

  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      transition={{ duration: 0.3 }}
      className={`border rounded-xl p-6 transition-all duration-300 ${borderColor} ${bgColor} ${
        hover ? hoverBgColor : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GridCard;
