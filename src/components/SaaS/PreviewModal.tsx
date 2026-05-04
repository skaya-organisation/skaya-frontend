import { memo, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  previewUrl?: string;
  children?: React.ReactNode;
  darkMode?: boolean;
}

const PreviewModal = memo(function PreviewModal({
  isOpen,
  onClose,
  title,
  description,
  previewUrl,
  children,
  darkMode = true,
}: PreviewModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const headerClasses = useMemo(
    () => ({
      container: `flex items-center justify-between p-4 sm:p-6 border-b ${
        darkMode ? 'border-white/10' : 'border-slate-200'
      }`,
      title: `text-xl sm:text-2xl font-bold mb-1 ${
        darkMode ? 'text-white' : 'text-slate-900'
      }`,
      description: `text-xs sm:text-sm ${
        darkMode ? 'text-slate-400' : 'text-slate-600'
      }`,
    }),
    [darkMode]
  );

  const footerClasses = useMemo(
    () => ({
      container: `flex items-center justify-between p-4 sm:p-6 border-t ${
        darkMode ? 'border-white/10' : 'border-slate-200'
      }`,
      text: `text-xs ${
        darkMode ? 'text-slate-500' : 'text-slate-600'
      }`,
      button: `px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
        darkMode
          ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
      }`,
    }),
    [darkMode]
  );

  const modalClasses = useMemo(
    () =>
      `${
        darkMode
          ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-white/10'
          : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
      } border rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col`,
    [darkMode]
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={modalClasses}
          >
            {/* Header */}
            <div className={headerClasses.container}>
              <div className="flex-1 min-w-0 pr-4">
                <h2 className={headerClasses.title}>{title}</h2>
                {description && <p className={headerClasses.description}>{description}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {previewUrl && (
                  <motion.a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                    }`}
                    title="Open in new tab"
                  >
                    <OpenInNewIcon
                      className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-slate-900'}`}
                    />
                  </motion.a>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                  }`}
                >
                  <CloseIcon
                    className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-slate-900'}`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Content - Full Height */}
            <div className="flex-1 overflow-hidden">
              {previewUrl ? (
                <div className="w-full h-full relative bg-white">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                    </div>
                  )}
                  <iframe
                    src={previewUrl}
                    title={title}
                    className="w-full h-full border-0"
                    onLoad={handleIframeLoad}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 sm:p-8 overflow-y-auto h-full"
                >
                  {children}
                </motion.div>
              )}
            </div>

            {/* Footer Actions */}
            <div className={footerClasses.container}>
              <p className={footerClasses.text}>
                {previewUrl ? 'Click the open icon to view in full screen' : 'Project details'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className={footerClasses.button}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default PreviewModal;
