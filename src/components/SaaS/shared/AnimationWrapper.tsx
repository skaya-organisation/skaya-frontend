'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimationWrapperProps } from '../types';

/**
 * AnimationWrapper Component
 * 
 * Reusable wrapper component for applying consistent animations to content.
 * Features:
 * - Multiple animation types (fade, slide, scale)
 * - Customizable delay
 * - Smooth transitions
 * - Viewport-based triggering
 */
export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  delay = 0,
  type = 'fade',
}) => {
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      variants={variants[type]}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
