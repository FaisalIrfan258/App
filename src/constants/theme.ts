/**
 * Theme System for Today: Panic Attack Relief
 * Dark theme with calming purple accents
 */

// Font family configuration - Spotify Mix
export const fonts = {
  light: 'SpotifyMix-Light',
  regular: 'SpotifyMix-Regular',
  medium: 'SpotifyMix-Medium',
  semiBold: 'SpotifyMix-Medium', // Using Medium as semiBold equivalent
  bold: 'SpotifyMix-Bold',
} as const;

export const colors = {
  // Backgrounds
  background: {
    primary: '#0D0D0F',
    secondary: '#1A1A1D',
    gradient: {
      start: '#0D0D0F',
      end: '#151518',
    },
    dark: '#0D0D0F',
  },

  // Card/Glassmorphism
  card: {
    background: 'rgba(45, 45, 50, 0.6)',
    border: 'rgba(255, 255, 255, 0.1)',
  },

  // Primary Actions (Purple)
  primary: {
    default: '#8B7FD4',
    pressed: '#7A6FC3',
    disabled: '#5A5280',
  },

  // Panic/Urgent Actions (Purple variant)
  urgent: {
    default: '#8B7FD4',
    pressed: '#7A6FC3',
    glow: 'rgba(139, 127, 212, 0.3)',
  },

  // Breathing Circle
  breathing: {
    inhale: '#7EC8E3',
    hold: '#A78BDD',
    exhale: '#98D8C8',
  },

  // Text (for dark theme)
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    inverse: '#0D0D0F',
    muted: 'rgba(255, 255, 255, 0.4)',
  },

  // Accents
  accent: {
    success: '#7FD4A8',
    warning: '#F5B97F',
    calm: '#C8A2D9',
    purple: '#8B7FD4',
  },

  // Overlays
  overlay: {
    light: 'rgba(0, 0, 0, 0.2)',
    medium: 'rgba(0, 0, 0, 0.4)',
    heavy: 'rgba(0, 0, 0, 0.7)',
  },

  // Tab Bar
  tabBar: {
    background: 'transparent',
    active: '#8B7FD4',
    inactive: 'rgba(255, 255, 255, 0.5)',
  },
};

export const typography = {
  // Headings
  h1: {
    fontSize: 34,
    fontWeight: '300' as const,
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  h2: {
    fontSize: 28,
    fontWeight: '300' as const,
    lineHeight: 34,
    letterSpacing: 0.36,
  },
  h3: {
    fontSize: 22,
    fontWeight: '400' as const,
    lineHeight: 28,
    letterSpacing: 0.35,
  },

  // Body Text
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  bodyLarge: {
    fontSize: 20,
    fontWeight: '400' as const,
    lineHeight: 28,
    letterSpacing: -0.45,
  },

  // Buttons
  button: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  buttonLarge: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 25,
    letterSpacing: -0.45,
  },

  // Instructions/Captions
  caption: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  instruction: {
    fontSize: 24,
    fontWeight: '300' as const,
    lineHeight: 32,
    letterSpacing: 0.36,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 50,
  full: 9999,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Minimum tap target size (Apple HIG)
export const MIN_TAP_TARGET = 44;
export const RECOMMENDED_TAP_TARGET = 60;
