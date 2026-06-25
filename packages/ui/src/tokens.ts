export const colors = {
  canvas: '#010102',
  'surface-1': '#0e0f11',
  'surface-2': '#17181c',
  'surface-3': '#1e2025',
  'surface-4': '#272a2f',
  primary: '#5e6ad2',
  'primary-hover': '#828fff',
  'primary-focus': '#5e69d1',
  'brand-secure': '#7a7fad',
  hairline: '#23252a',
  'hairline-strong': '#2e3035',
  'hairline-tertiary': '#3a3d43',
  ink: '#f7f8f8',
  'ink-muted': '#d0d6e0',
  'ink-subtle': '#8a8f98',
  'ink-tertiary': '#62666d',
  'inverse-canvas': '#ffffff',
  'inverse-surface-1': '#f5f5f5',
  'inverse-surface-2': '#e8e8e8',
  'inverse-ink': '#010102',
  'semantic-success': '#27a644',
  'semantic-error': '#e5484d',
  'semantic-warning': '#f5a623',
  'semantic-overlay': '#000000',
} as const;

export const typography = {
  'display-xl': { size: '80px', weight: 600, lineHeight: 1.05, letterSpacing: '-3.0px' },
  'display-lg': { size: '56px', weight: 600, lineHeight: 1.1, letterSpacing: '-1.8px' },
  'display-md': { size: '40px', weight: 600, lineHeight: 1.15, letterSpacing: '-1.0px' },
  headline: { size: '28px', weight: 600, lineHeight: 1.2, letterSpacing: '-0.6px' },
  'card-title': { size: '22px', weight: 500, lineHeight: 1.25, letterSpacing: '-0.4px' },
  subhead: { size: '20px', weight: 400, lineHeight: 1.4, letterSpacing: '-0.2px' },
  'body-lg': { size: '18px', weight: 400, lineHeight: 1.5, letterSpacing: '-0.1px' },
  body: { size: '16px', weight: 400, lineHeight: 1.5, letterSpacing: '-0.05px' },
  'body-sm': { size: '14px', weight: 400, lineHeight: 1.5, letterSpacing: '0' },
  caption: { size: '12px', weight: 400, lineHeight: 1.4, letterSpacing: '0' },
  button: { size: '14px', weight: 500, lineHeight: 1.2, letterSpacing: '0' },
  eyebrow: { size: '13px', weight: 500, lineHeight: 1.3, letterSpacing: '0.4px' },
  mono: { size: '13px', weight: 400, lineHeight: 1.5, letterSpacing: '0' },
} as const;

export const spacing = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  section: '96px',
} as const;

export const borderRadius = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  pill: '9999px',
  full: '9999px',
} as const;

export const breakpoints = {
  mobile: '480px',
  'mobile-lg': '768px',
  tablet: '1024px',
  desktop: '1280px',
  'desktop-xl': '1440px',
} as const;

export const fontFamilies = {
  display: "'Inter', 'SF Pro Display', -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif",
  text: "'Inter', 'SF Pro Display', -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', ui-monospace, Menlo, monospace",
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof borderRadius;
export type TypographyToken = keyof typeof typography;
export type BreakpointToken = keyof typeof breakpoints;

export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  breakpoints,
  fontFamilies,
} as const;
