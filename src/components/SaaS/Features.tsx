import { memo } from 'react';
import { motion } from 'framer-motion';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import BlockIcon from '@mui/icons-material/Block';
import PaletteIcon from '@mui/icons-material/Palette';
import SpeedIcon from '@mui/icons-material/Speed';
import { SectionHeader } from './shared/SectionHeader';
import Scales from '../ui/Scales';

interface FeaturesProps {
  darkMode?: boolean;
}

const features = [
  {
    icon: SmartToyIcon,
    title: 'AI Development',
    description: 'Custom AI tools and GPT integrations',
    tag: 'AI / ML',
  },
  {
    icon: CloudIcon,
    title: 'SaaS Platforms',
    description: 'Multi-tenant scalable architectures',
    tag: 'CLOUD',
  },
  {
    icon: CodeIcon,
    title: 'Web Development',
    description: 'Next.js, Node.js, cloud-native solutions',
    tag: 'FULL-STACK',
  },
  {
    icon: BlockIcon,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security standards',
    tag: 'SECURITY',
  },
  {
    icon: PaletteIcon,
    title: 'UI/UX Design',
    description: 'Premium design systems and interfaces',
    tag: 'DESIGN',
  },
  {
    icon: SpeedIcon,
    title: '24/7 Support',
    description: 'Round-the-clock monitoring and support',
    tag: 'SUPPORT',
  },
];

const Features = memo(function Features({ darkMode = true }: FeaturesProps) {
  const borderColor = darkMode ? 'border-slate-800' : 'border-slate-200';
  const hoverBgColor = darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-100';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <SectionHeader
          number="01"
          title="Comprehensive solutions for every need"
          description="From web solutions to blockchain and enterprise infrastructure"
          darkMode={darkMode}
        />

        {/* Features Grid */}
        <div className={`py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            // Determine right border visibility per breakpoint:
            // lg (3-col): border-r on positions 0,1 — NOT 2
            // md (2-col): border-r on position 0   — NOT 1
            // sm (1-col): never
            const colInLg = idx % 3; // 0,1,2
            const colInMd = idx % 2; // 0,1

            const showBorderLg = colInLg < 2;  // true for 0,1
            const showBorderMd = colInMd < 1;  // true for 0 only

            // Row borders (bottom) — show for all except last row
            const totalRows3 = Math.ceil(features.length / 3);
            const totalRows2 = Math.ceil(features.length / 2);
            const rowInLg = Math.floor(idx / 3);
            const rowInMd = Math.floor(idx / 2);
            const isLastRowLg = rowInLg === totalRows3 - 1;
            const isLastRowMd = rowInMd === totalRows2 - 1;
            const isLastItemSm = idx === features.length - 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true, amount: 0.3 }}
                className={[
                  'p-6 transition-all duration-300',
                  // Base border (all sides via outline approach — use explicit borders)
                  `border-l-0 border-t-0`,
                  // Right border logic
                  // sm: never show right border
                  'border-r-0',
                  // md: show right border only for col 0
                  showBorderMd
                    ? `md:border-r md:${borderColor.replace('border-', 'border-r-')}`
                    : 'md:border-r-0',
                  // lg: show right border only for col 0 and col 1
                  showBorderLg
                    ? `lg:border-r lg:${borderColor.replace('border-', 'border-r-')}`
                    : 'lg:border-r-0',
                  // Bottom border logic
                  // sm: all except last item
                  !isLastItemSm
                    ? `border-b ${borderColor.replace('border-', 'border-b-')}`
                    : 'border-b-0',
                  // md: override — all except last row
                  !isLastRowMd
                    ? `md:border-b md:${borderColor.replace('border-', 'border-b-')}`
                    : 'md:border-b-0',
                  // lg: override — all except last row
                  !isLastRowLg
                    ? `lg:border-b lg:${borderColor.replace('border-', 'border-b-')}`
                    : 'lg:border-b-0',
                  // Hover
                  hoverBgColor,
                ].join(' ')}
              >
                {/* Icon */}
                <Icon className={`w-6 h-6 mb-4 ${mutedColor}`} />

                {/* Title */}
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-4 ${mutedColor}`}>
                  {feature.description}
                </p>

                {/* Tag */}
                <div className={`text-xs font-mono tracking-widest ${mutedColor}`}>
                  {feature.tag}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
      <div className="w-full bottom-0 left-0 right-0 h-6 z-10 group/scales-bottom">
        <div className="h-full w-full pointer-events-auto">
          <Scales size={6} darkMode={darkMode} orientation="diagonal" />
        </div>
      </div>
    </section>
  );
});

export default Features;