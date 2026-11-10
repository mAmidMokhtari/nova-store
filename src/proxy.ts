import createMiddleware from 'next-intl/middleware';

import { routing } from '@/utils/routing';

/** Negotiates the locale and redirects locale-less paths (`/` → `/fa`). */
export default createMiddleware(routing);

export const config = {
  // Everything except Next internals and files with an extension (robots.txt, sitemap.xml, assets).
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
