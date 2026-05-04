import { motion, AnimatePresence } from 'framer-motion';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import ContactFormDialog from './ContactFormDialog';

interface CTAProps {
  darkMode?: boolean;
  onOpenDialog?: () => void;
}

// Lightweight Book a Call Dialog Component
const BookCallDialog = memo(({ 
  isOpen, 
  onClose, 
  darkMode = true 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  darkMode: boolean;
}) => {
  const phoneNumber = '7310747066';
  const whatsappUrl = `https://wa.me/917310747066`;
  const phoneUrl = `tel:+917310747066`;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className={`${
              darkMode
                ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-white/10'
                : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
            } border rounded-2xl p-6 max-w-sm w-full shadow-xl`}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'
              }`}
            >
              <CloseIcon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
            </motion.button>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.2 }}
            >
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Get in Touch
              </h3>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-slate-600'} mb-6`}>
                Choose your preferred way to connect
              </p>
            </motion.div>

            {/* Contact Options */}
            <div className="space-y-3">
              {/* Phone Call */}
              <motion.a
                href={phoneUrl}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  darkMode
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                    : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500">
                  <PhoneIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Call Us
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
                    +91 {phoneNumber}
                  </p>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  darkMode
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                    : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-600 to-green-500">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    WhatsApp
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
                    Message us
                  </p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

BookCallDialog.displayName = 'BookCallDialog';

export default function CTA({ darkMode = true }: CTAProps) {
  const [showBookCall, setShowBookCall] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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

  const handleOpenBookCall = useCallback(() => {
    setShowBookCall(true);
  }, []);

  const handleCloseBookCall = useCallback(() => {
    setShowBookCall(false);
  }, []);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    }),
    []
  );

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 sm:py-32 px-6 sm:px-6 lg:px-6 overflow-hidden`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/cloud.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/80' 
            : 'bg-gradient-to-b from-white/80 via-white/70 to-white/80'
        }`} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto text-center relative z-10"
      >

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className={`text-lg max-w-2xl mx-auto ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Let's discuss your project and explore how we can help you succeed
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            onClick={() => setShowContactForm(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/50"
          >
            Start Your Project
            <ArrowRightIcon className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={handleOpenBookCall}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 font-semibold rounded-lg border transition-all duration-300 flex items-center gap-2 ${
              darkMode
                ? 'bg-slate-900/30 hover:bg-slate-900/50 text-white border-slate-700 hover:border-slate-600'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300 hover:border-slate-400'
            }`}
          >
            <PhoneIcon className="w-5 h-5" />
            Book a Call
          </motion.button>
        </motion.div>

        {/* Trust message */}
        <motion.p
          variants={itemVariants}
          className={`${darkMode ? 'text-slate-500' : 'text-slate-600'} text-sm`}
        >
          We typically respond within 2 minutes
        </motion.p>
      </motion.div>

      {/* Book a Call Dialog */}
      <BookCallDialog 
        isOpen={showBookCall} 
        onClose={handleCloseBookCall} 
        darkMode={darkMode}
      />

      {/* Contact Form Dialog */}
      <ContactFormDialog 
        isOpen={showContactForm} 
        onClose={() => setShowContactForm(false)} 
        darkMode={darkMode}
      />
    </section>
  );
}
