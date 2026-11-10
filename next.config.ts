import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_API_BASE_URL. Copy .env.example to .env.local.');
}

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    // Product images are served by the API host.
    remotePatterns: [new URL('/img/**', apiBaseUrl)],
  },
};

export default withNextIntl(nextConfig);
