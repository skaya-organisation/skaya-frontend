'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TwoColumnLayoutProps } from '../types';

/**
 * TwoColumnLayout Component
 * 
 * Responsive two-column layout component for organizing content side-by-side.
 * Features:
 * - Responsive grid (stacks on mobile, side-by-side on desktop)
 * - Customizable gap between columns
 * - Dark/light mode support
 * - Smooth animations
 */
export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  darkMode = true,
  gap = 'gap-8 lg:gap-12',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-1 lg:grid-cols-2 ${gap} items-start`}
    >
      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {leftColumn}
      </motion.div>

      {/* Right Column */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {rightColumn}
      </motion.div>
    </motion.div>
  );
};

export default TwoColumnLayout;
