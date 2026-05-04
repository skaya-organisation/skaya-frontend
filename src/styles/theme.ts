// Global theme configuration for consistent styling across all components
export const theme = {
  // Typography
  typography: {
    heading: {
      h1: 'text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight',
      h2: 'text-4xl sm:text-5xl font-bold tracking-tight',
      h3: 'text-2xl sm:text-3xl font-bold',
      h4: 'text-xl sm:text-2xl font-semibold',
    },
    body: {
      lg: 'text-lg leading-relaxed',
      base: 'text-base leading-relaxed',
      sm: 'text-sm leading-relaxed',
    },
    monospace: 'font-mono tracking-widest',
  },

  // Spacing
  spacing: {
    section: 'py-24 sm:py-32 lg:py-40',
    sectionCompact: 'py-16 sm:py-24',
    container: 'max-w-7xl mx-auto',
    padding: 'px-4 sm:px-6 lg:px-8',
    gap: {
      mobile: 'gap-6',
      desktop: 'lg:gap-8',
    },
    cardPadding: 'p-6',
  },

  // Grid
  grid: {
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-1 md:grid-cols-2',
    cols3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    gap: 'gap-6 lg:gap-8',
  },

  // Colors - Dark Mode
  colors: {
    dark: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900/50',
      cardHover: 'hover:bg-slate-800/50',
      border: 'border-slate-800',
      borderHover: 'hover:border-slate-700',
      text: 'text-white',
      textMuted: 'text-slate-400',
      accent: 'text-blue-600',
    },
    light: {
      bg: 'bg-white',
      card: 'bg-slate-50',
      cardHover: 'hover:bg-slate-100',
      border: 'border-slate-200',
      borderHover: 'hover:border-slate-300',
      text: 'text-slate-900',
      textMuted: 'text-slate-600',
      accent: 'text-blue-600',
    },
  },

  // Borders
  borders: {
    width: '1px',
    style: 'solid',
    radius: 'rounded-lg',
  },

  // Animations
  animations: {
    stagger: 'staggerChildren: 0.08, delayChildren: 0.1',
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.5,
      entrance: 0.6,
    },
    staggerDelay: 0.08,
    scale: {
      hover: 1.05,
      initial: 0.95,
    },
    slideDistance: 20,
  },

  // Transitions
  transitions: {
    default: 'transition-all duration-300',
    slow: 'transition-all duration-500',
  },
};

// Design System Constants
export const designSystem = {
  // Color Palette
  palette: {
    dark: {
      background: 'slate-950',
      card: 'slate-900',
      border: 'slate-800',
      borderHover: 'slate-700',
      text: 'white',
      textMuted: 'slate-400',
    },
    light: {
      background: 'white',
      card: 'slate-50',
      border: 'slate-200',
      borderHover: 'slate-300',
      text: 'slate-900',
      textMuted: 'slate-600',
    },
    accent: {
      primary: 'blue-600',
      secondary: 'blue-500',
      tertiary: 'purple-400',
    },
  },

  // Typography Scale
  typographyScale: {
    h1: 'text-5xl sm:text-6xl lg:text-7xl',
    h2: 'text-4xl sm:text-5xl',
    h3: 'text-2xl sm:text-3xl',
    h4: 'text-xl sm:text-2xl',
    lg: 'text-lg',
    base: 'text-base',
    sm: 'text-sm',
    xs: 'text-xs',
  },

  // Spacing Scale
  spacingScale: {
    section: 'py-24 sm:py-32 lg:py-40',
    padding: 'px-4 sm:px-6 lg:px-8',
    gap: 'gap-6 lg:gap-8',
    cardPadding: 'p-6',
  },

  // Animation Timing
  animationTiming: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    entrance: 0.6,
    stagger: 0.08,
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

