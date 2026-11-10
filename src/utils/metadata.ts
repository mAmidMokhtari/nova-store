import type { Metadata } from 'next';

import { Locale } from '@/types/enums';

import { routing } from './routing';

/** Open Graph locale codes. */
export const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  [Locale.Fa]: 'fa_IR',
  [Locale.En]: 'en_US',
};

/** Path of a page in a given locale, e.g. `/fa/cart`. `path` is locale-less. */
export function getLocalizedPath(locale: Locale, path: string): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Canonical URL and hreflang alternates of a page. Relative values are resolved
 * against `metadataBase` set in the root layout.
 */
export function buildAlternates(locale: Locale, path: string): Metadata['alternates'] {
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, getLocalizedPath(item, path)]),
  );

  return {
    canonical: getLocalizedPath(locale, path),
    languages: {
      ...languages,
      'x-default': getLocalizedPath(routing.defaultLocale, path),
    },
  };
}
