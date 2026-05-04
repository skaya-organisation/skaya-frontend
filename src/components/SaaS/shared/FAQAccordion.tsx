'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { FAQAccordionProps, FAQItem } from '../types';

/**
 * FAQAccordion Component
 * 
 * Reusable accordion component for displaying FAQ items with smooth animations.
 * Features:
 * - Smooth expand/collapse animations
 * - Icon support for each item
 * - Dark/light mode support
 * - Customizable default open item
 */
export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  darkMode = true,
  defaultOpen = 0,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="space-y-4">
      {items.map((item: FAQItem, index: number) => {
        const isOpen = openIndex === index;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? darkMode
                  ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-2 border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300/50 shadow-lg'
                : darkMode
                ? 'bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-slate-700'
                : 'bg-white/60 backdrop-blur-md border border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Accordion Header */}
            <motion.button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full p-5 flex items-start gap-4 text-left transition-all duration-300 ${
                isOpen ? 'pb-4' : ''
              }`}
              whileHover={{ x: 4 }}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                isOpen
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 scale-110'
                  : darkMode
                  ? 'bg-slate-800'
                  : 'bg-slate-100'
              }`}>
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-base sm:text-lg mb-1 transition-colors duration-300 ${
                  isOpen
                    ? darkMode ? 'text-blue-400' : 'text-blue-600'
                    : textColor
                }`}>
                  {item.question}
                </h3>
                {!isOpen && (
                  <p className={`text-xs ${mutedColor} line-clamp-1`}>
                    Click to read answer
                  </p>
                )}
              </div>

              {/* Toggle Icon */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isOpen
                    ? 'bg-blue-500/20 text-blue-400'
                    : darkMode
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>

            {/* Accordion Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border-t ${darkMode ? 'border-slate-700/50' : 'border-slate-200'}`}
                >
                  <div className="p-5 pt-4">
                    <p className={`${mutedColor} text-sm sm:text-base leading-relaxed`}>
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
