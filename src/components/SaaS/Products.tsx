import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './shared/SectionHeader';
import { Scales } from '../ui/Scales';

interface Product {
  icon: string;
  title: string;
  description: string;
  waveColor: string;
}

interface ProductsProps {
  darkMode?: boolean;
  className?: string;
}

const products: Product[] = [
  {
    icon: '⚡',
    title: 'Instant Summaries',
    description: 'Get AI-powered summaries instantly',
    waveColor: '#f59e0b',
  },
  {
    icon: '✓',
    title: 'Auto Action Items',
    description: 'Automatically generate action items',
    waveColor: '#3b82f6',
  },
  {
    icon: '�',
    title: 'Daandi Kaanthi',
    description: 'Experience vibrant cultural celebrations',
    waveColor: '#f97316',
  },
  {
    icon: '🌐',
    title: 'Works Everywhere',
    description: 'Seamless integration across platforms',
    waveColor: '#06b6d4',
  },
  {
    icon: '👥',
    title: 'Boost Team',
    description: 'Enhance team collaboration and productivity',
    waveColor: '#10b981',
  },
  {
    icon: '💻',
    title: 'Built for Desktop',
    description: 'Optimized desktop application experience',
    waveColor: '#8b5cf6',
  },
  {
    icon: '🔒',
    title: 'Privacy Protected',
    description: 'Enterprise-grade security and privacy',
    waveColor: '#ec4899',
  },
  {
    icon: '🌟',
    title: 'Dream Day',
    description: 'Craft unforgettable moments with SKAYA',
    waveColor: '#a855f7',
  },
];

// ─── Ripple Canvas ─────────────────────────────────────────────────────────────
/**
 * A canvas that draws concentric ripple rings expanding from the icon position
 * (top-left area of the card). Distinct from the particle network in AIShowcase.
 */
const RippleCanvas = ({ color }: { color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Ripple origin — near top-left where the icon lives
    const ox = () => canvas.width * 0.18;
    const oy = () => canvas.height * 0.22;

    // Each ripple: radius grows from 0 → maxR, fading out
    type Ripple = { r: number; maxR: number; alpha: number; speed: number };
    const ripples: Ripple[] = [];
    let tick = 0;

    const spawnRipple = () => {
      ripples.push({
        r: 0,
        maxR: Math.max(canvas.width, canvas.height) * 0.85,
        alpha: 0.35,
        speed: 0.7 + Math.random() * 0.5,
      });
    };

    // Spawn staggered initial ripples
    spawnRipple();
    setTimeout(spawnRipple, 900);
    setTimeout(spawnRipple, 1800);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      // Spawn a new ripple every ~150 frames (~2.5s at 60fps)
      if (tick % 150 === 0) spawnRipple();

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += rp.speed;
        rp.alpha = 0.35 * (1 - rp.r / rp.maxR);

        if (rp.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ox(), oy(), rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = color + Math.round(rp.alpha * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// ─── Scales Frame ──────────────────────────────────────────────────────────────
/**
 * Same ScalesFrame as AIShowcase:
 * - TOP strip
 * - RIGHT strip (lg+ only — left is global page border)
 * - BOTTOM strip
 */
const ScalesFrame = ({
  children,
  darkMode,
  className = '',
  scalesSize = 6,
}: {
  children: React.ReactNode;
  darkMode: boolean;
  className?: string;
  scalesSize?: number;
}) => (
  <div className={`relative ${className}`}>

    {/* BOTTOM */}
    <div className="w-[100vw] absolute bottom-0 left-0 right-0 h-6 z-10 group/scales-bottom">
      <div className="h-full w-full pointer-events-auto">
        <Scales size={scalesSize} darkMode={darkMode} orientation="diagonal" />
      </div>
    </div>
    {/* Content offset so it clears the strips */}
    <div className="">
      {children}
    </div>
  </div>
);

// ─── Border classes (same logic as Features, static for Tailwind JIT) ──────────
// 8 items, 3-col lg / 2-col md / 1-col sm — inner dividers only, no outer border
// (outer border comes from the grid wrapper + ScalesFrame)
const itemBordersDark = [
  // Row 0
  'border-b border-slate-800  md:border-r md:border-b md:border-slate-800  lg:border-r lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r-0 md:border-b md:border-slate-800  lg:border-r lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r md:border-b md:border-slate-800  lg:border-r-0 lg:border-b lg:border-slate-800',
  // Row 1
  'border-b border-slate-800  md:border-r-0 md:border-b md:border-slate-800  lg:border-r lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r md:border-b-0  lg:border-r lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r-0 md:border-b-0  lg:border-r-0 lg:border-b lg:border-slate-800',
  // Row 2
  'border-b border-slate-800  md:border-r md:border-b md:border-slate-800  lg:border-r lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r-0 md:border-b md:border-slate-800  lg:border-r lg:border-b lg:border-slate-800',
  'border-b border-slate-800  md:border-r md:border-b md:border-slate-800  lg:border-r-0 lg:border-b lg:border-slate-800',
];

const itemBordersLight = [
  // Row 0
  'border-b border-slate-200  md:border-r md:border-b md:border-slate-200  lg:border-r lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r-0 md:border-b md:border-slate-200  lg:border-r lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r md:border-b md:border-slate-200  lg:border-r-0 lg:border-b lg:border-slate-200',
  // Row 1
  'border-b border-slate-200  md:border-r-0 md:border-b md:border-slate-200  lg:border-r lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r md:border-b-0  lg:border-r lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r-0 md:border-b-0  lg:border-r-0 lg:border-b lg:border-slate-200',
  // Row 2
  'border-b border-slate-200  md:border-r md:border-b md:border-slate-200  lg:border-r lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r-0 md:border-b md:border-slate-200  lg:border-r lg:border-b lg:border-slate-200',
  'border-b border-slate-200  md:border-r md:border-b md:border-slate-200  lg:border-r-0 lg:border-b lg:border-slate-200',
  // Row 1
];

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({
  product,
  idx,
  darkMode,
  borderClass,
}: {
  product: Product;
  idx: number;
  darkMode: boolean;
  borderClass: string;
}) => {
  const titleColor = darkMode ? 'text-white' : 'text-slate-900';
  const descriptionColor = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: idx * 0.08 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden border-solid transition-all duration-300 cursor-default
        ${darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}
        ${borderClass}
      `}
    >
      {/* Per-card ripple animation */}

      <div className="relative z-10 p-6">
        {/* Icon with pulse ring on hover */}
        <div className="relative inline-block mb-5">
          <motion.div
            className="text-4xl relative z-10"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {product.icon}
          </motion.div>
          {/* Static glow dot behind icon */}
          <div
            className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"
            style={{ background: product.waveColor }}
          />
        </div>

        {/* Title */}
        <h3 className={`text-base font-bold mb-2 ${titleColor}`}>
          {product.title}
        </h3>

        {/* Accent rule — expands on hover */}
        <div className="relative h-px mb-4 overflow-hidden">
          <div className={`absolute inset-0 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          <div
            className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500"
            style={{ background: product.waveColor }}
          />
        </div>

        {/* Description */}
        <p className={`text-sm ${descriptionColor}`}>
          {product.description}
        </p>

        {/* Corner accent tag */}
        <div
          className="absolute top-4 right-4 text-[10px] font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: product.waveColor }}
        >
          {String(idx + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Products = memo(function Products({ darkMode = true, className = '' }: ProductsProps) {
  const itemBorders = darkMode ? itemBordersDark : itemBordersLight;

  return (
    <section className={`relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <SectionHeader
          number="03"
          title="Products"
          darkMode={darkMode}
          className="mb-12"
        />

        {/* ScalesFrame wraps the entire grid */}
        <ScalesFrame darkMode={darkMode}>
          {/*
            Outer border on the grid container — ScalesFrame provides the
            decorative diagonal-stripe "frame" on top/right/bottom.
            Inner cell borders are handled per-item (static Tailwind classes).
          */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-solid py-6"
            style={{ borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}
          >
            {products.map((product, idx) => (
              <ProductCard
                key={idx}
                product={product}
                idx={idx}
                darkMode={darkMode}
                borderClass={itemBorders[idx]}
              />
            ))}
          </div>
        </ScalesFrame>

      </div>
    </section>
  );
});

export default Products;