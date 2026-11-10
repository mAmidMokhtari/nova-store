import type { MetadataRoute } from 'next';

import { env } from '@/utils/env';
import { getLocalizedPath } from '@/utils/metadata';
import { ROUTES } from '@/utils/routes';
import { routing } from '@/utils/routing';

/** Crawlers may index the storefront; the cart is personal and excluded. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: routing.locales.map((locale) => getLocalizedPath(locale, ROUTES.cart)),
    },
    sitemap: `${env.siteUrl}/sitemap.xml`,
    host: env.siteUrl,
  };
}
