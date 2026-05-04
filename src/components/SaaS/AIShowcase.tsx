import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BoltIcon from '@mui/icons-material/Bolt';
import TerminalIcon from '@mui/icons-material/Terminal';
import ApiIcon from '@mui/icons-material/Api';
import LayersIcon from '@mui/icons-material/Layers';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import { Scales } from '../ui/Scales';

interface AIShowcaseProps {
  darkMode?: boolean;
}

// ─── Canvas Particle Field (per-card) ────────────────────────────────────────
const ParticleCanvas = ({
  color = '#3b82f6',
  count = 18,
  speed = 0.4,
}: {
  color?: string;
  count?: number;
  speed?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; alpha: number; pulse: number }[]
  >([]);
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

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const lineAlpha = (1 - dist / 60) * 0.15;
            ctx.strokeStyle = color + Math.round(lineAlpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
    };
  }, [color, count, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
};

// ─── Animated Terminal ────────────────────────────────────────────────────────
const terminalLines = [
  { text: '$ skaya init --template ai-saas', type: 'cmd' },
  { text: '✓ Scaffolding project structure...', type: 'success' },
  { text: '✓ Installing AI dependencies...', type: 'success' },
  { text: '✓ Configuring cloud endpoints...', type: 'success' },
  { text: '→ Deploying to edge network...', type: 'info' },
  { text: '⚡ Live at https://yourapp.skaya.org', type: 'highlight' },
];

const Terminal = ({ darkMode }: { darkMode: boolean }) => {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= terminalLines.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 600 + visible * 80);
    return () => clearTimeout(t);
  }, [visible]);

  const typeColor = (type: string) => {
    if (type === 'cmd') return darkMode ? '#94a3b8' : '#475569';
    if (type === 'success') return '#22c55e';
    if (type === 'info') return '#60a5fa';
    if (type === 'highlight') return '#f59e0b';
    return darkMode ? '#e2e8f0' : '#1e293b';
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden border font-mono text-xs leading-relaxed ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-700'
        }`}
      style={{ minHeight: 220 }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-slate-500 text-[10px] tracking-widest">TERMINAL</span>
      </div>
      <div className="p-4 space-y-1">
        {terminalLines.slice(0, visible).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: typeColor(line.type) }}
          >
            {line.text}
          </motion.div>
        ))}
        {visible < terminalLines.length && (
          <motion.span
            className="inline-block w-2 h-4 bg-blue-400"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
      <ParticleCanvas color="#3b82f6" count={14} speed={0.3} />
    </div>
  );
};

// ─── Count-up stat ────────────────────────────────────────────────────────────
const useCountUp = (target: number, duration = 1800) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { val, ref };
};

const StatCard = ({
  value, suffix, label, darkMode, color, particleColor,
}: {
  value: number; suffix: string; label: string;
  darkMode: boolean; color: string; particleColor: string;
}) => {
  const { val, ref } = useCountUp(value);
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden p-6 ${darkMode ? 'bg-slate-900/60' : 'bg-white'
        }`}
    >
      <ParticleCanvas color={particleColor} count={12} speed={0.25} />
      <div className="relative z-10">
        <div className="text-3xl font-bold tracking-tight mb-1" style={{ color }}>
          {val}{suffix}
        </div>
        <div className={`text-xs font-mono tracking-widest uppercase ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          {label}
        </div>
      </div>
    </div>
  );
};

// ─── Feature Pill Card ────────────────────────────────────────────────────────
interface PillCardProps {
  icon: any;
  title: string;
  description: string;
  darkMode: boolean;
  delay: number;
  accentColor: string;
  particleColor: string;
}

const PillCard = ({ icon: Icon, title, description, darkMode, delay, accentColor, particleColor }: PillCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay }}
    whileHover={{ y: -4, scale: 1.02 }}
    className={`group relative overflow-hidden p-5 transition-all duration-300 cursor-default ${darkMode ? 'bg-slate-900/70 hover:bg-slate-800/80' : 'bg-white hover:bg-slate-50'
      }`}
  >
    <ParticleCanvas color={particleColor} count={10} speed={0.2} />
    <div className="relative z-10">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
        style={{ background: accentColor + '22' }}
      >
        <Icon style={{ color: accentColor, fontSize: 18 }} />
      </div>
      <h4 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h4>
      <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
        {description}
      </p>
    </div>
    {/* accent bottom line on hover */}
    <div
      className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
      style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
    />
  </motion.div>
);

// ─── Orbit Diagram ────────────────────────────────────────────────────────────
const OrbitDiagram = ({ darkMode }: { darkMode: boolean }) => {
  const orbitItems = [
    { label: 'AI', angle: 0, color: '#3b82f6' },
    { label: 'API', angle: 60, color: '#8b5cf6' },
    { label: 'CI/CD', angle: 120, color: '#06b6d4' },
    { label: 'Cloud', angle: 180, color: '#10b981' },
    { label: 'Web3', angle: 240, color: '#f59e0b' },
    { label: 'UI/UX', angle: 300, color: '#ec4899' },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[220px] mx-auto">
      <div className={`absolute inset-0 rounded-full border ${darkMode ? 'border-slate-800' : 'border-slate-200'}`} />
      <div className={`absolute inset-[20%] rounded-full border ${darkMode ? 'border-slate-700' : 'border-slate-300'}`} />
      <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
        <LayersIcon style={{ color: 'white', fontSize: 18 }} />
      </div>
      {orbitItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 14 + i * 2, repeat: Infinity, ease: 'linear', delay: i * -2 }}
        >
          <div
            className="absolute w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border"
            style={{
              top: `calc(50% - 16px + ${Math.sin((item.angle * Math.PI) / 180) * 42}%)`,
              left: `calc(50% - 16px + ${Math.cos((item.angle * Math.PI) / 180) * 42}%)`,
              background: item.color + '22',
              borderColor: item.color + '66',
              color: item.color,
            }}
          >
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function AIShowcase({ darkMode = true }: AIShowcaseProps) {
  const cards = [
    {
      icon: BoltIcon,
      title: 'Instant Deploy',
      description: 'Push to git, live in seconds. Edge CDN included.',
      accentColor: '#f59e0b',
      particleColor: '#f59e0b',
    },
    {
      icon: ApiIcon,
      title: 'API-First Architecture',
      description: 'RESTful & GraphQL endpoints auto-generated from your schema.',
      accentColor: '#8b5cf6',
      particleColor: '#8b5cf6',
    },
    {
      icon: SecurityIcon,
      title: 'Enterprise Security',
      description: 'SOC2-ready. Zero-trust auth, secrets manager built-in.',
      accentColor: '#10b981',
      particleColor: '#10b981',
    },
    {
      icon: LightbulbIcon,
      title: 'AI Code Review',
      description: 'Real-time suggestions, bug detection, refactor hints.',
      accentColor: '#3b82f6',
      particleColor: '#3b82f6',
    },
    {
      icon: TerminalIcon,
      title: 'CLI Tooling',
      description: 'Scaffold, test, migrate, monitor — all from terminal.',
      accentColor: '#06b6d4',
      particleColor: '#06b6d4',
    },
    {
      icon: TrendingUpIcon,
      title: 'Observability',
      description: 'Logs, traces, metrics. OpenTelemetry native.',
      accentColor: '#ec4899',
      particleColor: '#ec4899',
    },
  ];

  const borderColor = darkMode ? 'border-slate-800' : 'border-slate-200';

  return (
    <section
      className={`relative pt-24 sm:pt-32 px-6 sm:px-6 lg:px-6 overflow-hidden `}
    >

      <div className="relative z-10 mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <div
            className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border text-xs font-mono tracking-widest"
            style={{
              background: darkMode ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)',
              borderColor: darkMode ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.25)',
              color: darkMode ? '#60a5fa' : '#2563eb',
            }}
          >
            <AutoAwesomeIcon style={{ fontSize: 12 }} />
            02 — COMPLETE DEVELOPMENT PLATFORM
          </div>

          <h2
            className={`text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4 ${darkMode ? 'text-white' : 'text-slate-900'
              }`}
          >
            Ship faster.<br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: darkMode
                  ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)'
                  : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #0891b2 100%)',
              }}
            >
              Scale fearlessly.
            </span>
          </h2>
          <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            A full-stack platform built for engineering teams that can't afford to slow down.
            From scaffolding to production observability — everything in one place.
          </p>

          {/* NPM Link */}
          <motion.a
            href="https://www.npmjs.com/package/skaya"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
              darkMode
                ? 'bg-slate-900/50 border-slate-700 hover:border-slate-600 hover:bg-slate-900/70'
                : 'bg-slate-100 border-slate-300 hover:border-slate-400 hover:bg-slate-200'
            }`}
          >
            <img
              src="/logo/npm-logo-red.png"
              alt="npm logo"
              className="h-5 w-auto"
            />
            <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Skaya v1.0.0
            </span>
          </motion.a>
        </motion.div>

        {/* ── TOP GRID: Terminal + Orbit — wrapped in ScalesFrame ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5  gap-4 lg:mb-0 mb-6"
          style={{ borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}
        >
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className={`lg:col-span-3 ${borderColor} `}
          >
            <Terminal darkMode={darkMode} />
          </motion.div>

          {/* Orbit diagram */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className={`lg:col-span-2 relative overflow-hidden flex flex-col items-center justify-center p-8 ${darkMode ? 'bg-slate-900/40' : 'bg-slate-100/60'
              }`}
          >
            <ParticleCanvas color="#8b5cf6" count={16} speed={0.2} />
            <div className="relative z-10 w-full">
              <div className={`text-xs font-mono tracking-widest mb-6 text-center ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                TECH ECOSYSTEM
              </div>
              <OrbitDiagram darkMode={darkMode} />
            </div>
          </motion.div>
        </div>

        {/* ── FEATURE CARDS GRID — borderless cells, Scales holds the frame ── */}
        {/*
            6 cards in 3-col grid.
            Internal divider borders: border-r on col 0,1 | border-b on row 0
            No outer border — ScalesFrame provides the visual containment.
          */}
        <div className="w-full top-0 left-0 right-0 h-6 z-10 group/scales-top">
          <div className="h-full w-full pointer-events-auto">
            <Scales size={6} darkMode={darkMode} orientation="diagonal" />
          </div>
        </div>
       
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-r border-b border-solid"
          style={{ borderColor: darkMode ? '#1e293b' : '#e2e8f0' }}
        >
          {cards.map((card, i) => {
            const col3 = i % 3;
            const col2 = i % 2;
            const isLastRowLg = i >= 3;
            const isLastRowMd = i >= 4;
            const isLastSm = i === cards.length - 1;

            return (
              <PillCard
                key={i}
                {...card}
                darkMode={darkMode}
                delay={i * 0.07}
              />
            );
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex sm:flex-row items-start sm:items-center gap-4 mt-10"
        >
          <motion.a
            href="http://localhost:3000/guide/Cli-sdk/Introduction.html"
            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(59,130,246,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              boxShadow: '0 4px 24px rgba(59,130,246,0.3)',
            }}
          >
            Start Building →
          </motion.a>
          <motion.a
            href="http://localhost:3000/guide/getting-started.html"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-7 py-3.5 rounded-xl text-sm font-semibold border transition-colors ${darkMode
              ? 'border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
              : 'border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
          >
            View Documentation
          </motion.a>
        </motion.div>

      </div>
       <div className="w-full bottom-0 left-0 right-0 h-6 z-10 group/scales-bottom">
          <div className="h-full w-full pointer-events-auto">
            <Scales size={6} darkMode={darkMode} orientation="diagonal" />
          </div>
        </div>
    </section>
  );
}