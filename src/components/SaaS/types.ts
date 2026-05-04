/**
 * Shared TypeScript types for SaaS landing page components
 */

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
  icon: string; // Emoji
  category?: string;
}

export interface FAQCategory {
  name: string;
  icon: string;
  count: number;
}

// Feature Types
export interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tag: string;
}

export interface Feature2Item {
  icon: string; // Emoji
  text: string;
}

// Component Props Types
export interface SectionHeaderProps {
  number?: string;
  title?: string | React.ReactNode;
  description?: string;
  darkMode?: boolean;
  className?: string;
}

export interface GridCardProps {
  children: React.ReactNode;
  darkMode?: boolean;
  hover?: boolean;
  className?: string;
}

export interface GridLayoutProps {
  children: React.ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: string;
  darkMode?: boolean;
}

export interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  darkMode?: boolean;
  gap?: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  darkMode?: boolean;
  defaultOpen?: number;
}

export interface AnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  type?: 'fade' | 'slide' | 'scale';
}

// Design System Types
export interface ColorPalette {
  dark: {
    bg: string;
    card: string;
    border: string;
    hover: string;
    text: string;
    muted: string;
  };
  light: {
    bg: string;
    card: string;
    border: string;
    hover: string;
    text: string;
    muted: string;
  };
  accent: {
    primary: string;
    secondary: string;
  };
}

export interface TypographyScale {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  lg: string;
  base: string;
  sm: string;
}

export interface SpacingScale {
  section: string;
  padding: string;
  gap: string;
  cardPadding: string;
}

export interface AnimationTiming {
  fast: number;
  normal: number;
  slow: number;
  stagger: number;
}
