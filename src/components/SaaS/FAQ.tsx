import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './shared/SectionHeader';
import { FAQAccordion } from './shared/FAQAccordion';
import { TwoColumnLayout } from './shared/TwoColumnLayout';
import { Sparkles } from 'lucide-react';

interface FAQProps {
  darkMode?: boolean;
}

const faqs = [
  {
    question: 'Do you offer custom AI solutions?',
    answer: 'Yes, we specialize in building custom AI tools tailored to your business needs. From machine learning models to GPT integrations, we can help you leverage AI to solve complex problems and drive innovation.',
    icon: '🤖',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We work with modern tech stacks including Next.js, Node.js, React, Python, TypeScript, PostgreSQL, MongoDB, AWS, and more. We choose the best tools for your specific project requirements to ensure optimal performance.',
    icon: '⚙️',
  },
  {
    question: 'Can you build scalable SaaS platforms?',
    answer: 'Absolutely. We have extensive experience building multi-tenant SaaS platforms that scale to millions of users. We focus on architecture, performance, and security from day one to ensure your platform grows with your business.',
    icon: '📈',
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing based on project scope, complexity, and timeline. We can work with fixed-price projects, time-and-materials, or retainer arrangements. Contact us for a custom quote tailored to your needs.',
    icon: '💰',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope. Simple web apps take 2-4 weeks, while complex SaaS platforms typically take 3-6 months. We provide detailed timelines during the discovery phase with clear milestones.',
    icon: '⏱️',
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes, we offer comprehensive post-launch support including bug fixes, feature updates, performance optimization, and 24/7 monitoring. We can discuss support packages during your consultation to match your needs.',
    icon: '🛡️',
  },
];

const categories = [
  { name: 'AI & ML', icon: '🤖', count: 2, gradient: 'from-cyan-500 to-blue-500' },
  { name: 'Development', icon: '💻', count: 2, gradient: 'from-purple-500 to-pink-500' },
  { name: 'Support', icon: '🛡️', count: 2, gradient: 'from-emerald-500 to-teal-500' },
];

export default function FAQ({ darkMode = true }: FAQProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-slate-600';
  const accentColor = darkMode ? 'text-cyan-400' : 'text-blue-600';

  // Filter FAQs by category if selected
  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) => {
        if (selectedCategory === 'AI & ML') return faq.icon === '🤖';
        if (selectedCategory === 'Development') return ['⚙️', '📈'].includes(faq.icon);
        if (selectedCategory === 'Support') return ['💰', '⏱️', '🛡️'].includes(faq.icon);
        return true;
      })
    : faqs;

  return (
    <section className={`relative py-24 sm:py-32 px-4 sm:px-6 lg:px-6 overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto relative z-10">
        {/* Header */}
        <SectionHeader
          number="05"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with us"
          darkMode={darkMode}
          className="mb-16"
        />

        {/* Two Column Layout */}
        <TwoColumnLayout
          darkMode={darkMode}
          leftColumn={
            <div className="lg:space-y-4 lg:sticky lg:top-24">
              {/* 3-column grid on mobile, vertical stack on desktop */}
              <div className="grid grid-cols-3 lg:flex lg:flex-col gap-3 mb-6 lg:mb-0">
                {categories.map((category, idx) => {
                  const isActive = selectedCategory === category.name;
                  
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      onClick={() => setSelectedCategory(isActive ? null : category.name)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative w-full p-4 lg:p-5 rounded-2xl border-2 transition-all duration-300 text-center lg:text-left group overflow-hidden ${
                        isActive
                          ? 'border-transparent shadow-2xl'
                          : darkMode
                          ? 'border-slate-700 hover:border-slate-600 bg-slate-900/40 backdrop-blur-md'
                          : 'border-slate-300 hover:border-slate-400 bg-white/60 backdrop-blur-md'
                      }`}
                    >
                      {/* Animated gradient background for active state */}
                      {isActive && (
                        <>
                          <motion.div
                            layoutId="activeBg"
                            className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20`}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${category.gradient}`}
                            style={{ padding: '2px', borderRadius: '1rem' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <div className={`w-full h-full rounded-2xl ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-xl`} />
                          </motion.div>
                        </>
                      )}

                      {/* Glass shine effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 ${isActive ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-300 rounded-2xl`} />

                      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
                        {/* Icon with gradient background when active */}
                        <motion.div
                          animate={{ 
                            scale: isActive ? 1.1 : 1,
                            rotate: isActive ? [0, -5, 5, 0] : 0
                          }}
                          transition={{ duration: 0.5 }}
                          className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center text-2xl lg:text-3xl transition-all duration-300 shadow-lg ${
                            isActive
                              ? `bg-gradient-to-br ${category.gradient}`
                              : darkMode
                              ? 'bg-slate-800'
                              : 'bg-slate-100'
                          }`}
                        >
                          {category.icon}
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className={`font-bold text-xs lg:text-base mb-0.5 transition-all duration-300 ${
                            isActive ? `bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent` : textColor
                          }`}>
                            {category.name}
                          </h3>
                          <p className={`text-[9px] lg:text-xs ${mutedColor}`}>
                            {category.count} questions
                          </p>
                        </div>
                        
                        {/* Checkmark for active state on desktop */}
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: isActive ? 1 : 0,
                            opacity: isActive ? 1 : 0
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className={`hidden lg:flex w-8 h-8 rounded-lg items-center justify-center bg-gradient-to-br ${category.gradient} text-white font-bold text-sm shadow-lg`}
                        >
                          ✓
                        </motion.div>
                      </div>

                      {/* Active indicator dot for mobile */}
                      {isActive && (
                        <motion.div
                          layoutId="activeDot"
                          className={`absolute top-2 right-2 lg:hidden w-2 h-2 rounded-full bg-gradient-to-br ${category.gradient} shadow-lg`}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className={`hidden lg:block p-5 rounded-2xl border ${darkMode ? 'border-slate-700 bg-slate-900/40' : 'border-slate-300 bg-white/60'} backdrop-blur-md`}
              >
                <div className="flex items-start gap-3">
                  <Sparkles className={`w-5 h-5 flex-shrink-0 mt-1 ${accentColor}`} />
                  <div>
                    <p className={`text-sm font-semibold ${textColor} mb-1`}>Didn't find your answer?</p>
                    <p className={`text-xs ${mutedColor}`}>Contact our support team for personalized assistance</p>
                  </div>
                </div>
              </motion.div>
            </div>
          }
          rightColumn={
            <FAQAccordion
              items={filteredFaqs}
              darkMode={darkMode}
              defaultOpen={0}
            />
          }
        />
      </div>
    </section>
  );
}
