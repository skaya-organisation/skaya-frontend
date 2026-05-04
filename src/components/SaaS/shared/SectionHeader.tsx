'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeaderProps } from '../types';
import Scales from '../../ui/Scales';

/**
 * SectionHeader Component
 * 
 * Reusable header component for all sections with consistent numbering and typography.
 * Features:
 * - Monospace section number with consistent formatting
 * - Consistent heading sizes (h2: 4xl-5xl)
 * - Optional description text
 * - Fade-in animation on mount
 * - Dark/light mode support
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
    number,
    title,
    description,
    darkMode = true,
    className = '',
}) => {
    const textColor = darkMode ? 'text-white' : 'text-slate-900';
    const mutedColor = darkMode ? 'text-slate-400' : 'text-slate-600';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`${className}`}
        >
            {title && <div className="absolute left-0 right-0  h-8 lg:flex items-start justify-center group/scales-top">
                <div className="w-full h-full pointer-events-auto">
                    <Scales size={6} darkMode={darkMode} orientation="diagonal" />
                </div>
            </div>
            }
            {/* Section Number */}
            <div className={`font-mono text-sm tracking-widest ${mutedColor} mb-4`}>
                {number}
            </div>

            {/* Title */}
            <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight ${textColor} mb-4`}>
                {title}
            </h2>
            <div className="absolute left-0 right-0  h-8 lg:flex items-start justify-center group/scales-bottom">
                <div className="w-full h-full pointer-events-auto">
                    <Scales size={6} darkMode={darkMode} orientation="diagonal" />
                </div>
            </div>
            {/* Description */}
            {description && (
                <p className={`text-lg ${mutedColor}`}>
                    {description}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeader;
