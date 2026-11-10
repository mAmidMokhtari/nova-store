import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { HomeView } from '@/components/home';
import { getCatalog } from '@/requests/products.requests';
import type { Catalog } from '@/types';
import { buildAlternates, getLocalizedPath } from '@/utils/metadata';
import { ROUTES } from '@/utils/routes';
import { routing } from '@/utils/routing';

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
 * The page still renders when the API is down: the client then retries and
 * shows its own loading and error states.
 */
async function loadCatalog(): Promise<Catalog | null> {
  try {
    return await getCatalog();
  } catch {
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
