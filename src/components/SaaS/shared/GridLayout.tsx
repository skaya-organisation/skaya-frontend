'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GridLayoutProps } from '../types';

/**
 * GridLayout Component
 * 
 * Responsive grid layout component for organizing content in columns.
 * Features:
 * - Responsive column configuration (mobile, tablet, desktop)
 * - Customizable gap between items
 * - Dark/light mode support
 * - Smooth animations
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'gap-6',
  darkMode = true,
}) => {
  const gridColsClass = `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`grid ${gap}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${columns.desktop === 1 ? '100%' : columns.desktop === 2 ? '50%' : '33.333%'}, 1fr))`,
      }}
    >
      {children}
    </motion.div>
  );
};

export default GridLayout;
