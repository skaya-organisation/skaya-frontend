import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TerminalIcon from '@mui/icons-material/Terminal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = true }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

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

  const commands = [
    { label: 'Install', cmd: 'npm install -g skaya' },
    { label: 'Init', cmd: 'skaya init' },
    { label: 'Create', cmd: 'skaya create' },
    { label: 'Update', cmd: 'skaya update' },
  ];

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <footer className={`relative ${darkMode ? 'border-white/10 ' : 'border-slate-200 '} border-t overflow-hidden`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-b from-transparent via-blue-900/5 to-transparent' : 'bg-gradient-to-b from-transparent via-blue-50 to-transparent'}`} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-6 py-16 sm:py-20 relative z-10"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-2xl font-bold ${darkMode ? 'bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent' : 'bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent'} mb-3`}>
              Skaya
            </h3>

            <p className={`${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm leading-relaxed`}>
              Web development. Cybersecurity. AI SDK.
              Everything you need to build fast, secure, and scalable frontend systems — in one platform.
            </p>

            <p className={`${darkMode ? 'text-white/40' : 'text-slate-500'} text-xs mt-3`}>
              Engineered for performance. Designed for scale.
            </p>
          </motion.div>

          {/* Guide */}
          <motion.div variants={itemVariants}>
            <h4 className={`${darkMode ? 'text-white' : 'text-slate-900'} font-semibold mb-4`}>Guide</h4>
            <ul className={`space-y-2 ${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm`}>
              <li><a href="/guide/getting-started" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>Getting Started</a></li>
              <li><a href="/guide/examples" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>UI Examples</a></li>
              <li><a href="/guide/React-sdk/Introduction" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>React SDK</a></li>
              <li><a href="/guide/Cli-sdk/Introduction" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>CLI SDK</a></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className={`${darkMode ? 'text-white' : 'text-slate-900'} font-semibold mb-4`}>Resources</h4>
            <ul className={`space-y-2 ${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm`}>
              <li><a href="/about" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>Team</a></li>
              <li><a href="/support" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>Support</a></li>
              <li><a href="/faq" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>FAQ</a></li>
              <li><a href="/blogs/index" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>Blogs</a></li>
            </ul>
          </motion.div>

          {/* Connect & Social */}
          <motion.div variants={itemVariants}>
            <h4 className={`${darkMode ? 'text-white' : 'text-slate-900'} font-semibold mb-4`}>Our Apps</h4>
            <ul className={`space-y-2 ${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm mb-6`}>
              <li><a href="https://blockchain.skaya.org/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>WEB3</a></li>
              <li><a href="https://www.npmjs.com/package/skaya/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}>AI</a></li>
            </ul>
            <h4 className={`${darkMode ? 'text-white' : 'text-slate-900'} font-semibold mb-4`}>Connect</h4>
            <div className="space-y-3">
              <p className={`${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm`}>
                <span className="block font-semibold mb-1">Email</span>
                team@skaya.org
              </p>
              <p className={`${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm`}>
                <span className="block font-semibold mb-1">Phone</span>
                +91 7310747066
              </p>
              <div className="flex gap-3 pt-2">
                <motion.a
                  href="https://twitter.com/skaya_org"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-white/10 hover:bg-blue-600/30 text-white/60 hover:text-blue-400' : 'bg-slate-200 hover:bg-blue-200 text-slate-600 hover:text-blue-600'} flex items-center justify-center transition-all`}
                >
                  <TwitterIcon className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/company/skaya-org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-white/10 hover:bg-blue-600/30 text-white/60 hover:text-blue-400' : 'bg-slate-200 hover:bg-blue-200 text-slate-600 hover:text-blue-600'} flex items-center justify-center transition-all`}
                >
                  <LinkedInIcon className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://github.com/skaya-org"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-white/10 hover:bg-blue-600/30 text-white/60 hover:text-blue-400' : 'bg-slate-200 hover:bg-blue-200 text-slate-600 hover:text-blue-600'} flex items-center justify-center transition-all`}
                >
                  <GitHubIcon className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/skaya_org_"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-white/10 hover:bg-blue-600/30 text-white/60 hover:text-blue-400' : 'bg-slate-200 hover:bg-blue-200 text-slate-600 hover:text-blue-600'} flex items-center justify-center transition-all`}
                >
                  <InstagramIcon className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>


      </motion.div>
    </footer>
  );
}
