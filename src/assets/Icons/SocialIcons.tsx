import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

/** Paper-plane mark. */
export function TelegramIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M21 4 3 11l5 2 2 6 3-4 5 4z" />
      <path d="m8 13 9-6-7 8" />
    </svg>
  );
}

/** Rounded camera mark. */
export function InstagramIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </svg>
  );
}

/** "in" mark. */
export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V17M8 7.2v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" />
    </svg>
  );
}

/** Crossed-strokes mark. */
export function XIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 4.5 19 19.5M19 4.5 5 19.5" />
    </svg>
  );
}
