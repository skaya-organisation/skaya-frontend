import { motion } from 'framer-motion';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState } from 'react';
import ContactFormDialog from './ContactFormDialog';

interface HeroProps {
  darkMode?: boolean;
}

export default function Hero({ darkMode = true }: HeroProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">

      {/* Logo Background with Radiating Waves */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {/* Radiating wave circles from full width/height */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer radiating waves */}
          <motion.circle
            cx="600"
            cy="400"
            r="400"
            fill="none"
            stroke="rgba(59, 130, 246, 0.15)"
            strokeWidth="2"
            filter="url(#glow)"
            animate={{
              r: [400, 500, 400],
              opacity: [0.3, 0.05, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Mid radiating waves */}
          <motion.circle
            cx="600"
            cy="400"
            r="350"
            fill="none"
            stroke="rgba(168, 85, 247, 0.15)"
            strokeWidth="2"
            filter="url(#glow)"
            animate={{
              r: [350, 450, 350],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              delay: 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Inner radiating waves */}
          <motion.circle
            cx="600"
            cy="400"
            r="300"
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="2"
            filter="url(#glow)"
            animate={{
              r: [300, 400, 300],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 4,
              delay: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Close waves around logo */}
          <motion.circle
            cx="600"
            cy="400"
            r="200"
            fill="none"
            stroke="rgba(168, 85, 247, 0.25)"
            strokeWidth="2"
            filter="url(#glow)"
            animate={{
              r: [200, 250, 200],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>

        {/* Center Logo with Circle and Scales */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10 flex items-center justify-center"
        >
          {/* Outer glow circle */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15)',
                '0 0 80px rgba(59, 130, 246, 0.4), 0 0 120px rgba(59, 130, 246, 0.2)',
                '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-64 h-64 rounded-full border-2 border-blue-500/30 bg-gradient-to-br from-blue-600/5 to-purple-600/5"
          />

          {/* Logo Image */}
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))',
                'drop-shadow(0 0 40px rgba(59, 130, 246, 0.6))',
                'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-20 w-48 h-48"
          >
            <img
              src="/logo.png"
              alt="Skaya Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback: show text if logo doesn't load
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>

          {/* Inner circle around logo */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.15, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-56 h-56 rounded-full border border-purple-500/20"
          />
        </motion.div>
      </div>

      {/* Top Section - Badge, Headline, Subheadline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-24 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${darkMode ? 'bg-white/10 border-white/20' : 'bg-blue-100 border-blue-200'} border backdrop-blur-md`}>
            <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} animate-pulse`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>Full-Stack Development & Innovation Hub</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          <span className={`bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-white via-blue-200 to-white' : 'bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900'}`}>
            Build the Future
          </span>
          <br />
          <span className={`bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600'}`}>
            with SKAYA
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className={`text-base sm:text-lg ${darkMode ? 'text-white/70' : 'text-slate-600'} max-w-2xl mx-auto leading-relaxed`}
        >
          We design and develop scalable, intelligent digital products for startups and enterprises. From custom AI tools to enterprise SaaS platforms, we turn your vision into reality.
        </motion.p>
      </motion.div>

      {/* Bottom Section - CTA Buttons & Trust Badges */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-16 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <motion.button
            onClick={() => setIsDialogOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/50"
          >
            Start Your Project
            <ArrowRightIcon className="w-5 h-5" />
          </motion.button>
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 ${darkMode ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' : 'bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-300'} font-semibold rounded-lg border transition-all duration-300 backdrop-blur-md`}
          >
            View Our Work
          </motion.a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className={`pt-4 ${darkMode ? 'border-white/10' : 'border-slate-200'} border-t flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 ${darkMode ? 'text-white/60' : 'text-slate-600'} text-xs sm:text-sm`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">⚡</span>
            <span>50+ Projects Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🚀</span>
            <span>10+ Years Combined Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🎯</span>
            <span>100% Client Satisfaction</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Contact Form Dialog */}
      <ContactFormDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} darkMode={darkMode} />
    </section>
  );
}
