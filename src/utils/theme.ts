/**
 * Tokens for styled-components. Colors point at CSS variables defined in
 * `app/globals.css`, so switching the theme never re-renders React.
 */
export const theme = {
  colors: {
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    surfaceMuted: 'var(--color-surface-muted)',
    border: 'var(--color-border)',
    text: 'var(--color-text)',
    textMuted: 'var(--color-text-muted)',
    accent: 'var(--color-accent)',
    accentStrong: 'var(--color-accent-strong)',
    accentStrongHover: 'var(--color-accent-strong-hover)',
    accentSoft: 'var(--color-accent-soft)',
    onAccent: 'var(--color-on-accent)',
    danger: 'var(--color-danger)',
    dangerSoft: 'var(--color-danger-soft)',
    success: 'var(--color-success)',
    star: 'var(--color-star)',
    imageBackground: 'var(--color-image-background)',
    footer: 'var(--color-footer)',
    footerText: 'var(--color-footer-text)',
    footerHeading: 'var(--color-footer-heading)',
    overlay: 'var(--color-overlay)',
  },
  radii: { sm: '8px', md: '12px', lg: '18px', pill: '999px' },
  shadows: { card: 'var(--shadow-card)', overlay: 'var(--shadow-overlay)' },
  layout: { maxWidth: '1200px', headerHeight: '68px' },
  /** Mobile-first breakpoints. */
  media: {
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1024px)',
  },
} as const;

export type AppTheme = typeof theme;
