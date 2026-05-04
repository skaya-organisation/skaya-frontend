import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState } from 'react';

interface MockCLIProps {
  darkMode?: boolean;
}

export default function MockCLI({ darkMode = true }: MockCLIProps) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'user@skaya:~/project$ Type "help" for available commands',
  ]);

  const commands = [
    { label: 'install', cmd: 'npm install -g skaya' },
    { label: 'skaya init', cmd: 'skaya init my-project' },
    { label: 'skaya generate', cmd: 'skaya generate component Button' },
    { label: 'skaya update', cmd: 'skaya update page Dashboard' },
    { label: 'skaya deploy', cmd: 'skaya deploy --production' },
    { label: 'clear', cmd: 'clear' },
  ];

  const commandOutputs: { [key: string]: string[] } = {
    'npm install -g skaya': [
      'npm install -g skaya',
      '⠙ Installing packages...',
      '✅ Successfully installed skaya CLI v2.1.0',
      '📚 Run "skaya --help" to get started',
    ],
    'skaya init my-project': [
      'skaya init my-project',
      '🚀 Initializing new project...',
      '✔ Project name: my-project',
      '✔ Framework: React + TypeScript',
      '✔ Template: Modern SPA',
      '✔ Installing dependencies...',
      '📦 npm install completed',
      '✅ Project ready at ./my-project',
      '💡 Next: cd my-project && skaya start',
    ],
    'skaya generate component Button': [
      'skaya generate component Button',
      '🎨 Generating component...',
      '✔ Component name: Button',
      '✔ Location: src/components/Button',
      '✔ With tests: Yes',
      '✔ With stories: Yes',
      '📝 Created files:',
      '  - Button.tsx',
      '  - Button.module.css',
      '  - Button.test.tsx',
      '  - Button.stories.tsx',
      '✅ Component generated successfully',
    ],
    'skaya update page Dashboard': [
      'skaya update page Dashboard',
      '🔄 Updating page...',
      '✔ Page name: Dashboard',
      '✔ Location: src/pages/Dashboard',
      '✔ Adding features: Analytics, Charts',
      '📝 Updated files:',
      '  - Dashboard.tsx',
      '  - Dashboard.module.css',
      '  - Dashboard.test.tsx',
      '✅ Page updated successfully',
    ],
    'skaya deploy --production': [
      'skaya deploy --production',
      '🔐 Authenticating...',
      '📦 Building project...',
      '✔ Build completed (2.3MB)',
      '🚀 Deploying to production...',
      '✔ Uploading files...',
      '✔ Configuring CDN...',
      '✔ Setting up SSL...',
      '✅ Deployment successful!',
      '🌐 Live at: https://my-project.skaya.app',
    ],
    'clear': [],
  };

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleCommandClick = (cmd: string) => {
    if (cmd === 'clear') {
      setTerminalOutput(['user@skaya:~/project$ Type "help" for available commands']);
    } else {
      const outputs = commandOutputs[cmd] || [];
      setTerminalOutput((prev) => [
        ...prev,
        `user@skaya:~/project$ ${cmd}`,
        ...outputs,
        'user@skaya:~/project$ ',
      ]);
    }
    copyToClipboard(cmd);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-white'} flex items-center justify-center p-4 py-20`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 text-center"
        >
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Powerful CLI & SDK
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Build, generate, and deploy with simple commands. Experience the future of web development.
          </p>
        </motion.div>

        {/* CLI Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl overflow-hidden shadow-2xl border ${
            darkMode ? 'border-white/10 bg-slate-900' : 'border-slate-200 bg-white'
          }`}
        >
          {/* Window Header */}
          <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? 'border-white/10 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
            <div className="flex items-center gap-3">
              {/* Traffic Lights */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              {/* Title */}
              <div className="flex items-center gap-2 ml-4">
                <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  SKAYA CLI
                </span>
              </div>
            </div>
            {/* NPM Logo with External Link */}
            <a
              href="https://www.npmjs.com/package/skaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              title="View on NPM"
            >
              <img src="/logo/npm-logo-red.png" alt="NPM" className="w-5 h-5" />
              <OpenInNewIcon className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-slate-600'}`} />
            </a>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-96">
            {/* Left - Terminal */}
            <div className={`lg:col-span-2 p-6 border-r ${darkMode ? 'border-white/10 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
              <div className="font-mono text-sm space-y-2 max-h-96 overflow-y-auto">
                {terminalOutput.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}
                  >
                    {line}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}
                >
                  ▌
                </motion.div>
              </div>

              {/* Terminal Footer */}
              <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-white/10' : 'border-slate-200'} flex gap-2 text-xs`}>
                <span className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-white/60' : 'bg-slate-200 text-slate-600'}`}>
                  ESC
                </span>
                <span className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-white/60' : 'bg-slate-200 text-slate-600'}`}>
                  TAB
                </span>
                <span className={`px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-white/60' : 'bg-slate-200 text-slate-600'}`}>
                  ⌘
                </span>
              </div>
            </div>

            {/* Right - Quick Commands */}
            <div className={`p-6 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Quick Commands
                </h3>
                <a
                  href="https://www.npmjs.com/package/skaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                >
                  <img src="/logo/npm-logo-red.png" alt="NPM" className="w-5 h-5" />
                </a>
              </div>
              <div className="space-y-3">
                {commands.map((item) => (
                  <motion.button
                    key={item.cmd}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCommandClick(item.cmd)}
                    className={`w-full p-3 rounded-lg border transition-all text-left group ${
                      darkMode
                        ? 'bg-slate-800/50 border-white/10 hover:border-blue-500/50 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 hover:border-blue-400 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          $ {item.label}
                        </p>
                        <code className={`text-xs font-mono ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
                          {item.cmd}
                        </code>
                      </div>
                      <ContentCopyIcon className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'text-white/40' : 'text-slate-400'}`} />
                    </div>
                    {copiedCommand === item.cmd && (
                      <p className={`text-xs mt-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ✓ Copied!
                      </p>
                    )}
                  </motion.button>
                ))}

                {/* skaya start button */}
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCommandClick('skaya start')}
                  className={`w-full p-3 rounded-lg border transition-all text-left group mt-4 ${
                    darkMode
                      ? 'bg-gradient-to-r from-red-600/20 to-red-600/10 border-red-500/50 hover:border-red-400'
                      : 'bg-gradient-to-r from-red-50 to-red-50 border-red-300 hover:border-red-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                        $ skaya start
                      </p>
                      <code className={`text-xs font-mono ${darkMode ? 'text-red-200/60' : 'text-red-600'}`}>
                        Start your project
                      </code>
                    </div>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <OpenInNewIcon className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.button>
              </div>

              {/* Help Text */}
              <p className={`text-xs mt-6 pt-4 border-t ${darkMode ? 'border-white/10 text-white/40' : 'border-slate-200 text-slate-500'}`}>
                Type "help" to see all available commands
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
