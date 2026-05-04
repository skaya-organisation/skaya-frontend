import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

interface ContactFormProps {
  darkMode?: boolean;
  onOpenDialog?: () => void;
}

export default function ContactForm({ darkMode = true, onOpenDialog }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.reason.trim()) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 3000);
        return;
      }

      // Create WhatsApp message
      const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Reason:* ${formData.reason}
${formData.message ? `*Message:* ${formData.message}` : ''}

---
Sent from Skaya Contact Form
      `.trim();

      // Encode message for WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/917310747066?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        reason: '',
        message: '',
      });

      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 3000);
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

  return (
    <section className={`relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <motion.div variants={itemVariants}>
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 leading-tight`}>
              <span className={`bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-white via-blue-200 to-white' : 'bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900'}`}>
                Let's talk!
              </span>
            </h2>
            <p className={`${darkMode ? 'text-white/70' : 'text-slate-600'} text-lg mb-8`}>
              Schedule a consultation with our experts and let's bring your vision to life
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
                  <span className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>📍</span>
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Office</p>
                  <p className={`${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm`}>
                    Hyderabad, Uttarakhand 248001, India
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-green-600/20' : 'bg-green-100'}`}>
                  <span className={`text-xl`}>💬</span>
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>WhatsApp</p>
                  <p className={`${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm`}>
                    +91 7310747066
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-purple-600/20' : 'bg-purple-100'}`}>
                  <span className={`text-xl`}>✉️</span>
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Email</p>
                  <p className={`${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm`}>
                    team@skaya.org
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>95%</p>
                <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-600'} mt-1`}>Client Satisfaction</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>24h</p>
                <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-600'} mt-1`}>Avg. Response Time</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>200+</p>
                <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-600'} mt-1`}>Projects Completed</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200'}`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <motion.div variants={itemVariants}>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 rounded-lg border transition-all ${
                    darkMode
                      ? 'bg-slate-800 border-white/10 text-white placeholder-white/40 focus:border-blue-500 focus:outline-none'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none'
                  }`}
                  required
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-lg border transition-all ${
                    darkMode
                      ? 'bg-slate-800 border-white/10 text-white placeholder-white/40 focus:border-blue-500 focus:outline-none'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none'
                  }`}
                  required
                />
              </motion.div>

              {/* Reason */}
              <motion.div variants={itemVariants}>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Reason *
                </label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-all ${
                    darkMode
                      ? 'bg-slate-800 border-white/10 text-white focus:border-blue-500 focus:outline-none'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:outline-none'
                  }`}
                  required
                >
                  <option value="">Select a reason</option>
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
                  Message <span className={`${darkMode ? 'text-white/50' : 'text-slate-500'}`}>(Optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project and specific requirements..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                    darkMode
                      ? 'bg-slate-800 border-white/10 text-white placeholder-white/40 focus:border-blue-500 focus:outline-none'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none'
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
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-600/50'
                }`}
              >
                <SendIcon className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-green-600/20 border border-green-500/50 text-green-400 text-sm"
                >
                  ✓ Opening WhatsApp with your message...
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-600/20 border border-red-500/50 text-red-400 text-sm"
                >
                  ✗ Please fill in all required fields (Name, Email, Reason)
                </motion.div>
              )}

              <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-slate-500'} text-center`}>
                Your message will be sent directly to our WhatsApp. We typically respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
