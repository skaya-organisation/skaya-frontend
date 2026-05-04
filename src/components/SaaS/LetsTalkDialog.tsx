import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';

interface LetsTalkDialogProps {
  darkMode?: boolean;
  autoOpen?: boolean;
}

export default function LetsTalkDialog({ darkMode = true, autoOpen = true }: LetsTalkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.reason.trim()) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 3000);
        return;
      }

      const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Reason:* ${formData.reason}
${formData.message ? `*Message:* ${formData.message}` : ''}

---
Sent from Skaya Contact Form
      `.trim();

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/917310747066?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      setFormData({
        name: '',
        email: '',
        reason: '',
        message: '',
      });

      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus('idle');
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }

    setIsSubmitting(false);
  };

  const reasons = [
    'Project Inquiry',
    'Technical Support',
    'Partnership',
    'Feedback',
    'Other',
  ];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <motion.div
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border ${
              darkMode
                ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-white/10'
                : 'bg-gradient-to-br from-white via-slate-50 to-white border-slate-200'
            }`}
          >
            {/* Header */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`relative px-6 py-8 border-b ${darkMode ? 'border-white/10 bg-slate-800/50' : 'border-slate-200 bg-slate-50/50'}`}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-white/10' : 'hover:bg-slate-200'
                }`}
              >
                <CloseIcon className={`w-5 h-5 ${darkMode ? 'text-white/60' : 'text-slate-600'}`} />
              </motion.button>

              {/* Title */}
              <motion.div variants={itemVariants}>
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Let's Talk
                </h2>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className={`text-sm leading-relaxed ${darkMode ? 'text-white/60' : 'text-slate-600'}`}
              >
                We'd love to hear about your vision. Share your ideas, and let's explore how we can bring them to life together. Our team is ready to turn your dreams into reality.
              </motion.p>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >
              {/* Name */}
              <motion.div variants={itemVariants}>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                  className={`w-full px-4 py-3 rounded-lg border transition-all text-sm ${
                    darkMode
                      ? 'bg-slate-800/50 border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20'
                  }`}
                  required
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Where can we reach you?"
                  className={`w-full px-4 py-3 rounded-lg border transition-all text-sm ${
                    darkMode
                      ? 'bg-slate-800/50 border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20'
                  }`}
                  required
                />
              </motion.div>

              {/* Reason */}
              <motion.div variants={itemVariants}>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  What's on your mind?
                </label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all text-sm ${
                    darkMode
                      ? 'bg-slate-800/50 border-white/10 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20'
                  }`}
                  required
                >
                  <option value="">Choose a topic...</option>
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Message */}
              <motion.div variants={itemVariants}>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Tell us more <span className={`${darkMode ? 'text-white/40' : 'text-slate-500'}`}>(optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your thoughts, ideas, or requirements..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border transition-all text-sm resize-none ${
                    darkMode
                      ? 'bg-slate-800/50 border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20'
                  }`}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 mt-6 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-600/50 hover:shadow-blue-600/70'
                }`}
              >
                <SendIcon className="w-4 h-4" />
                {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-green-600/20 border border-green-500/50 text-green-400 text-sm text-center"
                  >
                    ✓ Perfect! Opening WhatsApp...
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-red-600/20 border border-red-500/50 text-red-400 text-sm text-center"
                  >
                    ✗ Please fill in all required fields
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer Text */}
              <motion.p
                variants={itemVariants}
                className={`text-xs text-center ${darkMode ? 'text-white/40' : 'text-slate-500'}`}
              >
                We'll respond within 24 hours. Your message goes straight to our WhatsApp.
              </motion.p>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
