import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export default function ContactFormDialog({ isOpen, onClose, darkMode = true }: ContactFormDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (!formData.name.trim() || !formData.email.trim()) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 3000);
        return;
      }

      const whatsappMessage = `
*New Project Inquiry*

*Name:* ${formData.name}
*Email:* ${formData.email}
${formData.message ? `*Message:* ${formData.message}` : ''}

---
Sent from Skaya
      `.trim();

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/917310747066?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus('idle');
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Dialog Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
              className={`w-full max-w-md rounded-2xl shadow-2xl ${
                darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
              }`}
            >
            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Header with Close Button */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 flex items-start justify-between"
              >
                <div>
                  <h2 className={`text-2xl font-bold mb-1 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Start Your Project
                  </h2>
                  <p className={`text-sm ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    We'll get back to you within 24 hours
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                    darkMode
                      ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all ${
                      darkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none'
                    }`}
                    required
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all ${
                      darkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none'
                    }`}
                    required
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={3}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all resize-none ${
                      darkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none'
                    }`}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-600/30'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-green-600/20 border border-green-500/50 text-green-400 text-xs text-center"
                  >
                    ✓ Opening WhatsApp...
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-600/20 border border-red-500/50 text-red-400 text-xs text-center"
                  >
                    ✗ Please fill in all required fields
                  </motion.div>
                )}
              </form>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}
              >
                <p className={`text-xs font-semibold mb-3 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Or reach us directly
                </p>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/917310747066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      darkMode
                        ? 'text-slate-400 hover:text-green-400'
                        : 'text-slate-600 hover:text-green-600'
                    }`}
                  >
                    <span>💬</span> +91 7310747066
                  </a>
                  <a
                    href="mailto:team@skaya.org"
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      darkMode
                        ? 'text-slate-400 hover:text-blue-400'
                        : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <span>✉️</span> team@skaya.org
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
