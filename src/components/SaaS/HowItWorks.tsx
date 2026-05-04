import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, useEffect, useRef } from 'react';
import SectionHeader from './shared/SectionHeader';
import Scales from '../ui/Scales';

interface HowItWorksProps {
  darkMode?: boolean;
}

const steps = [
  {
    icon: SearchIcon,
    title: 'Discover & Plan',
    description: 'We understand your vision, goals, and technical requirements through in-depth discovery sessions. Our team conducts thorough research to ensure we build exactly what you need.',
    details: [
      'Requirements gathering',
      'Market analysis',
      'Technical architecture planning',
      'Timeline & budget estimation',
    ],
  },
  {
    icon: DesignServicesIcon,
    title: 'Design & Develop',
    description: 'Our team designs beautiful interfaces and builds scalable, robust solutions using cutting-edge technology. We follow best practices and maintain code quality throughout.',
    details: [
      'UI/UX design',
      'Frontend development',
      'Backend architecture',
      'Quality assurance',
    ],
  },
  {
    icon: RocketLaunchIcon,
    title: 'Launch & Scale',
    description: 'We deploy your product, optimize performance, and support you as you scale to millions of users. Continuous monitoring and improvements ensure success.',
    details: [
      'Production deployment',
      'Performance optimization',
      'Monitoring & analytics',
      'Ongoing support',
    ],
  },
];

export default function HowItWorks({ darkMode = true }: HowItWorksProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (inView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [inView]);

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    // Reset auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
    // Reset auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 sm:py-32 px-6 sm:px-6 lg:px-6 `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          number="03"
          title="How we work"
          description="Our proven streamlined approach that delivers exceptional results"
          darkMode={darkMode}
        />

        {/* Carousel Container */}
        <div className="py-24 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left - Step Cards */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;

              return (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentStep(index);
                    // Reset auto-play timer
                    if (autoPlayRef.current) {
                      clearInterval(autoPlayRef.current);
                    }
                    autoPlayRef.current = setInterval(() => {
                      setCurrentStep((prev) => (prev + 1) % steps.length);
                    }, 3000);
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-6 rounded-lg border transition-all duration-300 cursor-pointer ${isActive
                    ? darkMode
                      ? 'bg-slate-900/50 border-slate-700'
                      : 'bg-slate-50 border-slate-300'
                    : darkMode
                      ? 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg flex-shrink-0 transition-all ${isActive
                        ? darkMode
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                          : 'bg-gradient-to-br from-blue-500 to-purple-500'
                        : darkMode
                          ? 'bg-slate-800'
                          : 'bg-slate-200'
                        }`}
                    >
                      <StepIcon
                        className={`w-6 h-6 ${isActive
                          ? 'text-white'
                          : darkMode
                            ? 'text-slate-500'
                            : 'text-slate-600'
                          }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold mb-1 ${isActive
                          ? darkMode
                            ? 'text-white'
                            : 'text-slate-900'
                          : darkMode
                            ? 'text-white/70'
                            : 'text-slate-700'
                          }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs ${isActive
                          ? darkMode
                            ? 'text-slate-400'
                            : 'text-slate-600'
                          : darkMode
                            ? 'text-slate-500'
                            : 'text-slate-500'
                          }`}
                      >
                        Step {index + 1}
                      </p>
                    </div>
                  </div>

                </motion.button>
              );
            })}
          </div>

          {/* Right - Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className={`p-8 rounded-lg border ${darkMode
                  ? 'bg-slate-900/30 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
                  }`}
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className={`mb-6 inline-block p-4 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white`}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'
                    }`}
                >
                  {currentStepData.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className={`text-base mb-6 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}
                >
                  {currentStepData.description}
                </motion.p>

                {/* Details List */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  {currentStepData.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + idx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'
                          }`}
                      />
                      <span
                        className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'
                          }`}
                      >
                        {detail}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3 mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevStep}
                    className={`p-2 rounded-lg transition-all ${darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-600'
                      }`}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </motion.button>

                  {/* Step indicators */}
                  <div className="flex gap-2 items-center flex-1">
                    {steps.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setCurrentStep(idx)}
                        className={`h-2 rounded-full transition-all ${idx === currentStep
                          ? darkMode
                            ? 'bg-blue-600 w-6'
                            : 'bg-blue-500 w-6'
                          : darkMode
                            ? 'bg-slate-700 w-2 hover:bg-slate-600'
                            : 'bg-slate-300 w-2 hover:bg-slate-400'
                          }`}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    className={`p-2 rounded-lg transition-all ${darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-600'
                      }`}
                  >
                    <ChevronLeftIcon className="w-5 h-5 rotate-180" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="w-[100vw]] bottom-0 left-0 right-0 h-6 z-10 group/scales-bottom">
        <div className="h-full w-full pointer-events-auto">
          <Scales size={6} darkMode={darkMode} orientation="diagonal" />
        </div>
      </div>
    </section>
  );
}
