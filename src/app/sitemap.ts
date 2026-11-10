import type { MetadataRoute } from 'next';

import { env } from '@/utils/env';
import { getLocalizedPath } from '@/utils/metadata';
import { ROUTES } from '@/utils/routes';
import { routing } from '@/utils/routing';

/** Public, indexable paths (locale-less). The cart is intentionally left out. */
const INDEXABLE_PATHS = [ROUTES.home] as const;

/** One entry per indexable page and locale, each listing its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${env.siteUrl}${getLocalizedPath(locale, path)}`]),
    );

    return routing.locales.map((locale) => ({
      url: `${env.siteUrl}${getLocalizedPath(locale, path)}`,
      changeFrequency: 'daily' as const,
      priority: 1,
      alternates: { languages },
    }));
  });
}
