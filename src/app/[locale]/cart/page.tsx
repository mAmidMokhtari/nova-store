import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CartView } from '@/components/cart';
import { buildAlternates } from '@/utils/metadata';
import { ROUTES } from '@/utils/routes';
import { routing } from '@/utils/routing';

type CartPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('cartTitle'),
    description: t('cartDescription'),
    alternates: buildAlternates(locale, ROUTES.cart),
    // The cart is personal and lives in the browser; there is nothing to index.
    robots: { index: false, follow: true },
  };
}

/** Shopping cart. Its content comes from the browser, so the view is a client component. */
export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) setRequestLocale(locale);

  return <CartView />;
}
