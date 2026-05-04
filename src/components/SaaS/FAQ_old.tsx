import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './shared/SectionHeader';
import { FAQAccordion } from './shared/FAQAccordion';
import { TwoColumnLayout } from './shared/TwoColumnLayout';
import { Sparkles, Zap, Shield, Rocket, Clock, Headphones } from 'lucide-react';

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
  { name: 'AI & ML', icon: '🤖', count: 2, color: 'from-cyan-500/20 to-blue-500/20', borderColor: 'border-cyan-500/30' },
  { name: 'Development', icon: '💻', count: 2, color: 'from-purple-500/20 to-pink-500/20', borderColor: 'border-purple-500/30' },
  { name: 'Support', icon: '🛡️', count: 2, color: 'from-emerald-500/20 to-teal-500/20', borderColor: 'border-emerald-500/30' },
];

export default function FAQ({ darkMode = true }: FAQProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const borderColor = darkMode ? 'border-slate-700/40' : 'border-slate-200/60';
  const hoverBgColor = darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-100/40';
  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const mutedColor = darkMode ? 'text-slate-300' : 'text-slate-600';
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
    <section className={`relative py-24 sm:py-32 px-6 sm:px-6 lg:px-6 overflow-hidden`}>
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
            <div className="lg:space-y-3 lg:sticky lg:top-24">
              {/* 3-column grid on mobile, vertical stack on desktop */}
              <div className="grid grid-cols-3 lg:flex lg:flex-col gap-3">
                {categories.map((category, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  whileHover={{ x: 6 }}
                  className={`w-full p-3 lg:p-5 rounded-2xl border transition-all duration-300 text-left group relative overflow-hidden ${selectedCategory === category.name
                      ? `${category.borderColor} backdrop-blur-xl shadow-lg`
                      : `${borderColor} backdrop-blur-md ${hoverBgColor}`
                    }`}
                  style={{
                    background: selectedCategory === category.name
                      ? `linear-gradient(135deg, ${category.color.includes('cyan') ? 'rgba(6, 182, 212, 0.15)' : category.color.includes('purple') ? 'rgba(168, 85, 247, 0.15)' : 'rgba(16, 185, 129, 0.15)'}, ${category.color.includes('cyan') ? 'rgba(59, 130, 246, 0.15)' : category.color.includes('purple') ? 'rgba(236, 72, 153, 0.15)' : 'rgba(20, 184, 166, 0.15)'})`
                      : darkMode
                        ? 'rgba(15, 23, 42, 0.4)'
                        : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {/* Glass shine effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 ${selectedCategory === category.name ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-300`} />

                  <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 relative z-10">
                    <motion.span
                      className="text-2xl lg:text-3xl"
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      animate={selectedCategory === category.name ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.icon}
                    </motion.span>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className={`font-bold text-xs lg:text-base ${textColor} transition-all duration-300`}>{category.name}</h3>
                      <p className={`text-[9px] lg:text-xs ${mutedColor}`}>{category.count} questions</p>
                    </div>
                    <motion.div
                      animate={{
                        x: selectedCategory === category.name ? 6 : 0,
                        opacity: selectedCategory === category.name ? 1 : 0.5,
                        scale: selectedCategory === category.name ? 1.2 : 1
                      }}
                      className={`text-base lg:text-lg font-semibold transition-colors duration-300 ${selectedCategory === category.name ? accentColor : mutedColor} hidden lg:block`}
                    >
                      →
                    </motion.div>
                  </div>

                  {/* Active indicator line */}
                  {selectedCategory === category.name && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 lg:left-0 bottom-0 lg:bottom-auto lg:top-0 right-0 lg:right-auto h-1 lg:h-auto lg:w-1 w-full lg:w-1 rounded-t-full lg:rounded-r-full lg:rounded-t-none"
                      style={{
                        background: category.color.includes('cyan')
                          ? 'linear-gradient(to bottom, #06b6d4, #3b82f6)'
                          : category.color.includes('purple')
                            ? 'linear-gradient(to bottom, #a855f7, #ec4899)'
                            : 'linear-gradient(to bottom, #10b981, #14b8a6)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              </div>

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className={`mt-8 p-5 rounded-2xl border ${borderColor} ${darkMode ? 'bg-slate-900/20 backdrop-blur-md' : 'bg-white/30 backdrop-blur-md'}`}
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
