import '../globals.css';

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { CartHydrator } from '@/context/CartHydrator';
import { StyledRegistry } from '@/context/StyledRegistry';
import { AppThemeProvider } from '@/context/ThemeContext';
import { ThemeScript } from '@/context/ThemeScript';
import { getProductCategories } from '@/requests/products.requests';
import { env } from '@/utils/env';
import { getDirection } from '@/utils/formatters';
import { OPEN_GRAPH_LOCALES } from '@/utils/metadata';
import { routing } from '@/utils/routing';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const MAIN_ID = 'main-content';

const vazirmatn = localFont({
  src: '../../assets/Fonts/Vazirmatn-Variable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-vazirmatn',
});

/** Re-generate static pages at most once an hour, so API changes show up. */
export const revalidate = 3600;

/** Pre-renders every locale at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1424' },
  ],
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(env.siteUrl),
    title: { default: t('homeTitle'), template: `%s | ${t('siteName')}` },
    description: t('homeDescription'),
    applicationName: t('siteName'),
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      locale: OPEN_GRAPH_LOCALES[locale],
      title: t('homeTitle'),
      description: t('homeDescription'),
    },
    twitter: { card: 'summary' },
  };
}

/** Header categories are optional: without them the menus are simply hidden. */
async function loadCategories(): Promise<string[]> {
  try {
    return await getProductCategories();
  } catch {
    return [];
  }
}

/** Root layout of a locale: document shell, providers, header and footer. */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Lets next-intl render this subtree statically.
  setRequestLocale(locale);

  const categories = await loadCategories();

  return (
    // `data-theme` is set by ThemeScript before hydration, hence suppressHydrationWarning.
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={vazirmatn.variable}
      suppressHydrationWarning
    >
      <body>
        <ThemeScript />
        <NextIntlClientProvider>
          <StyledRegistry>
            <AppThemeProvider>
              <SkipLink targetId={MAIN_ID} />
              <Header categories={categories} />
              <main id={MAIN_ID}>{children}</main>
              <Footer year={new Date().getFullYear()} />
              <CartHydrator />
            </AppThemeProvider>
          </StyledRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
