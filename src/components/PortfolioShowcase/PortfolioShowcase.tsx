import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EyeIcon from '@mui/icons-material/Visibility';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Scales } from '../ui/Scales';
import { SectionHeader } from '../SaaS/shared/SectionHeader';

interface Portfolio {
  id: string;
  title: string;
  category: string;
  url: string;
  image: string;
  description: string;
}

interface PortfolioShowcaseProps {
  darkMode?: boolean;
}

const portfolios: Portfolio[] = [
  {
    id: 'jeweller1',
    title: 'Kundan Jewellers',
    category: 'Jewellery',
    url: 'https://d25vtgdar9v5ol.cloudfront.net/',
    image: 'https://d25vtgdar9v5ol.cloudfront.net/images/home.png',
    description: 'Exquisite jewellery collection online',
  },
  {
    id: 'daandikaanthi',
    title: 'Daandi Kaanthi',
    category: 'Travel',
    url: 'https://www.daandikaanthi.com',
    image: 'https://cdn.daandikaanthi.com/public/user_38q6g6G0Xi4wBo0eY4PiFtzSMW4/thumbnails/05c22b50-0138-4062-a788-3292b0d2d1fb.jpg',
    description: 'Premium travel experiences and adventure packages',
  },
  {
    id: 'jeweller3',
    title: 'Doon Ornaments',
    category: 'Jewellery',
    url: 'https://duwidqbkkuumf.cloudfront.net/',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=300&fit=crop',
    description: 'Handcrafted jewellery masterpieces',
  },
  {
    id: 'ngo',
    title: 'Bright Future Society',
    category: 'NGO',
    url: 'https://www.brightfuturesociety.in/',
    image: 'https://www.brightfuturesociety.in/logo.png',
    description: 'Making a difference in communities',
  },
];

// ─── Scales Band ───────────────────────────────────────────────────────────────
/**
 * A horizontal Scales strip — spans full width of the section.
 * Global page already has left + right vertical Scales, so we only
 * need top and bottom horizontal bands around the grid.
 */
const ScalesBand = ({ darkMode }: { darkMode: boolean }) => (
  <div className="w-full h-6 group/scales-band">
    <div className="h-full w-full pointer-events-auto">
      <Scales size={6} darkMode={darkMode} orientation="diagonal" />
    </div>
  </div>
);

// ─── Inner cell border classes (5 items, 3-col lg / 2-col md / 1-col sm) ──────
// No outer border on the grid — Scales bands + global page borders frame it.
const itemBordersDark = [
  'border-b border-slate-800  md:border-r md:border-b md:border-slate-800  lg:border-r lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r-0 md:border-b md:border-slate-800  lg:border-r lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r md:border-b md:border-slate-800  lg:border-r-0 lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r-0 md:border-b md:border-slate-800  lg:border-r lg:border-b-0',
  'border-b-0  md:border-r md:border-b-0  lg:border-r lg:border-b-0',
];

const itemBordersLight = [
  'border-b border-slate-200  md:border-r md:border-b md:border-slate-200  lg:border-r lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r-0 md:border-b md:border-slate-200  lg:border-r lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r md:border-b md:border-slate-200  lg:border-r-0 lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r-0 md:border-b md:border-slate-200  lg:border-r lg:border-b-0',
  'border-b-0  md:border-r md:border-b-0  lg:border-r lg:border-b-0',
];

// ─── Portfolio Card ────────────────────────────────────────────────────────────
const PortfolioCard = ({
  portfolio,
  idx,
  darkMode,
  borderClass,
  onPreview,
}: {
  portfolio: Portfolio;
  idx: number;
  darkMode: boolean;
  borderClass: string;
  onPreview: (p: Portfolio) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: idx * 0.07 }}
    className={`group relative overflow-hidden border-solid cursor-default
      ${darkMode ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50/80'}
      transition-colors duration-300
      ${borderClass}
    `}
  >
    {/* Image */}
    <div className="relative overflow-hidden aspect-[10/9] sm:aspect-[10/9]">
      <img
        src={portfolio.image}
        alt={portfolio.title}
        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      {/* Dark gradient overlay on hover */}
      <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
        darkMode
          ? 'bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent'
          : 'bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent'
      }`} />

      {/* Action buttons — slide up from bottom on hover */}
      <div className="absolute inset-x-0 bottom-0 flex gap-2 p-2 sm:p-4 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <button
          onClick={() => onPreview(portfolio)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-white rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        >
          <EyeIcon style={{ fontSize: 14 }} />
          <span className="hidden sm:inline">Preview</span>
        </button>
        <a
          href={portfolio.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-white rounded-lg backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        >
          <ArrowOutwardIcon style={{ fontSize: 14 }} />
          <span className="hidden sm:inline">Live</span>
        </a>
      </div>
    </div>

    {/* Content */}
    <div className="p-3 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className={`text-[10px] font-mono tracking-widest uppercase mb-1 ${
            darkMode ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {portfolio.category}
          </p>
          <h3 className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {portfolio.title}
          </h3>
        </div>
        <ArrowOutwardIcon
          className={`flex-shrink-0 mt-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
          style={{ fontSize: 16 }}
        />
      </div>

      <p className={`text-[10px] sm:text-xs leading-relaxed ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
        {portfolio.description}
      </p>

      {/* Accent sweep line on hover */}
      <div className="relative h-px mt-3 sm:mt-4 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
        <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" />
      </div>
    </div>
  </motion.div>
);

// ─── Preview Modal ─────────────────────────────────────────────────────────────
const PreviewModal = ({
  portfolio,
  darkMode,
  onClose,
}: {
  portfolio: Portfolio;
  darkMode: boolean;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
  >
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.stopPropagation()}
      className={`relative w-full h-[88vh] max-w-6xl flex flex-col rounded-xl overflow-hidden border ${
        darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b flex-shrink-0 ${
        darkMode ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <p className={`text-[10px] font-mono tracking-widest uppercase mb-0.5 ${
            darkMode ? 'text-slate-500' : 'text-slate-400'
          }`}>
            {portfolio.category}
          </p>
          <h3 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {portfolio.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              darkMode
                ? 'border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            <ArrowOutwardIcon style={{ fontSize: 13 }} />
            Open live
          </a>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              darkMode
                ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
            }`}
          >
            <CloseIcon style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {/* iframe */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={portfolio.url}
          title={portfolio.title}
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between px-5 py-3 border-t flex-shrink-0 ${
        darkMode ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <p className={`text-xs ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
          Preview may have limited functionality
        </p>
        <a
          href={portfolio.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
        >
          <LaunchIcon style={{ fontSize: 13 }} />
          Open Fullscreen
        </a>
      </div>
    </motion.div>
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const PortfolioShowcase = memo(function PortfolioShowcase({ darkMode = true }: PortfolioShowcaseProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const itemBorders = darkMode ? itemBordersDark : itemBordersLight;
  const borderColor = darkMode ? '#1e293b' : '#e2e8f0';

  useEffect(() => {
    document.body.style.overflow = selectedPortfolio ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPortfolio]);

  useEffect(() => {
    portfolios.forEach(({ url }) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'document';
      document.head.appendChild(link);
    });
  }, []);

  const handleWhatsApp = useCallback(() => {
    const msg = 'Hi! I am interested in building a website with SKAYA.';
    window.open(`https://wa.me/917310747066?text=${encodeURIComponent(msg)}`, '_blank');
  }, []);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 px-6 sm:px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <SectionHeader
          number="04"
          title={
            <>
              Crafted with{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899)' }}
              >
                SKAYA
              </span>
            </>
          }
          description="Exceptional websites built on our platform -"
          darkMode={darkMode}
        />

        {/*
          ── Grid with Scales bands ──
          The global HomePage already places a full-height Scales strip on the
          left and right edges of the entire page.
          Here we add a TOP and BOTTOM Scales band to "bracket" the grid
          horizontally — making the grid feel framed without double-framing sides.
          The grid itself has a plain outer border that connects flush to the bands.
        */}
        <div>

          {/* Grid with outer border — flush against the bands above/below */}
          <div
            className="py-24 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 border-l border-r border-solid"
            style={{ borderColor }}
          >
            {portfolios.map((portfolio, idx) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                idx={idx}
                darkMode={darkMode}
                borderClass={itemBorders[idx]}
                onPreview={setSelectedPortfolio}
              />
            ))}
          </div>

          {/* BOTTOM band */}
          <ScalesBand darkMode={darkMode} />
        </div>

      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedPortfolio && (
          <PreviewModal
            portfolio={selectedPortfolio}
            darkMode={darkMode}
            onClose={() => setSelectedPortfolio(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
});

export { PortfolioShowcase };
export default PortfolioShowcase;