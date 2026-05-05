'use client';

import React, { useRef, useEffect, useState } from 'react';
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
 * - Dynamic scales based on content height
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
    const descRef = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [bottomPadding, setBottomPadding] = useState('pb-10');

    useEffect(() => {
        if (descRef.current && description) {
            const descHeight = descRef.current.offsetHeight;
            // If description wraps to multiple lines (height > 32px), add more padding
            if (descHeight > 32) {
                const extraLines = Math.ceil((descHeight - 32) / 28);
                // Add 8 units (32px) per extra line
                const paddingValue = 10 + extraLines * 8;
                setBottomPadding(`pb-[${paddingValue * 4}px]`);
            } else {
                setBottomPadding('pb-10');
            }
        }
    }, [description]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`relative ${className}`}
        >
            {/* Top Scales */}
            {title && (
                <div className="absolute left-0 right-0 top-0 h-8 lg:flex items-start justify-center group/scales-top z-0">
                    <div className="w-full h-full pointer-events-auto">
                        <Scales size={6} darkMode={darkMode} orientation="diagonal" />
                    </div>
                </div>
            )}
            
            {/* Content Container with padding to avoid scales */}
            <div ref={containerRef} className={`relative z-10 pt-10 ${bottomPadding}`}>
                {/* Section Number */}
                {number && (
                    <div className={`font-mono text-sm tracking-widest ${mutedColor} mb-4`}>
                        {number}
                    </div>
                )}

                {/* Title */}
                {title && (
                    <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight ${textColor} mb-4`}>
                        {title}
                    </h2>
                )}

                {/* Description */}
                {description && (
                    <p ref={descRef} className={`text-lg ${mutedColor} max-w-3xl`}>
                        {description}
                    </p>
                )}
            </div>

            {/* Bottom Scales */}
            <div className="absolute left-0 right-0 bottom-0 h-8 lg:flex items-start justify-center group/scales-bottom z-0">
                <div className="w-full h-full pointer-events-auto">
                    <Scales size={6} darkMode={darkMode} orientation="diagonal" />
                </div>
            </div>
        </motion.div>
    );
};

export default SectionHeader;
