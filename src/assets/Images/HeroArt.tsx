import type { SVGProps } from 'react';

/**
 * Decorative hero illustration: shopping bags on a podium. Drawn in code so the
 * store ships no stock photography; colors follow the active theme.
 */
export function HeroArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 520 340" fill="none" aria-hidden="true" {...props}>
      <circle cx="270" cy="150" r="140" fill="var(--color-accent-soft)" />
      <circle cx="420" cy="70" r="26" fill="var(--color-accent)" opacity="0.25" />
      <circle cx="96" cy="230" r="14" fill="var(--color-accent)" opacity="0.4" />

      <ellipse cx="270" cy="292" rx="210" ry="26" fill="var(--color-surface-muted)" />
      <rect x="110" y="250" width="320" height="44" rx="22" fill="var(--color-surface)" />

      <g transform="translate(150 96)">
        <path
          d="M34 44V30a26 26 0 0 1 52 0v14"
          stroke="var(--color-text)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M8 44h104l10 104a14 14 0 0 1-14 16H12a14 14 0 0 1-14-16z"
          fill="var(--color-text)"
        />
        <path
          d="M42 84a18 18 0 0 0 36 0"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      <g transform="translate(262 58)">
        <path
          d="M40 52V36a32 32 0 0 1 64 0v16"
          stroke="var(--color-text)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M10 52h124l12 132a16 16 0 0 1-16 18H14a16 16 0 0 1-16-18z"
          fill="var(--color-accent)"
        />
        <path
          d="M50 98a22 22 0 0 0 44 0"
          stroke="var(--color-on-accent)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>

      <path d="m452 176 6 14 15 2-11 10 3 15-13-8-13 8 3-15-11-10 15-2z" fill="var(--color-star)" />
      <path
        d="m78 96 4 10 11 1-8 7 2 11-9-6-9 6 2-11-8-7 11-1z"
        fill="var(--color-star)"
        opacity="0.8"
      />
    </svg>
  );
}
