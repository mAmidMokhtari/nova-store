import type { Metadata } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { toApiErrorCode } from '@/api/ApiError';
import { HomeView } from '@/components/home';
import { getCatalog } from '@/requests/products.requests';
import type { Catalog } from '@/types';
import { createLogger } from '@/utils/logger';
import { buildAlternates, getLocalizedPath } from '@/utils/metadata';
import { ROUTES } from '@/utils/routes';
import { routing } from '@/utils/routing';

const log = createLogger('home-page');

/**
 * Whether an earlier, successful render of this page may exist. That is the case
 * on a running production server; it is not during `next build` or in development.
 */
const canKeepPreviousPage =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD;

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  return {
    alternates: buildAlternates(locale, ROUTES.home),
    openGraph: { url: getLocalizedPath(locale, ROUTES.home) },
  };
}

/**
 * Fetches the catalog and decides what a failure means:
 * - while regenerating on a running server, the error is rethrown, so Next.js keeps
 *   serving the last page that was generated successfully instead of an empty one;
 * - during the build and in development there is no earlier page, so the page
 *   renders without data and the client retries with its own loading and error states.
 */
async function loadCatalog(): Promise<Catalog | null> {
  try {
    return await getCatalog();
  } catch (error) {
    log.error('catalog request failed', { code: toApiErrorCode(error) });
    if (canKeepPreviousPage) throw error;

    return null;
  }
}

/** Landing page. Products are fetched on the server so they are in the HTML. */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) setRequestLocale(locale);

  const catalog = await loadCatalog();

  return <HomeView initialCatalog={catalog} />;
}
