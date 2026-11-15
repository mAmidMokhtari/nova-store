import type { MetadataRoute } from 'next';

import { env } from '@/utils/env';

/**
 * Crawlers may fetch every page. The cart is kept out of search results by the
 * `noindex` robots meta tag of its page; a `Disallow` rule here would stop
 * crawlers from fetching the page and therefore from ever seeing that tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${env.siteUrl}/sitemap.xml`,
    host: env.siteUrl,
  };
}
