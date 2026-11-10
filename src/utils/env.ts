function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}. Copy .env.example to .env.local.`);
  }

  return value.replace(/\/+$/, '');
}

/**
 * Single access point for environment configuration. Each variable is read with a
 * literal `process.env.NAME` so Next.js can inline the public ones into the client bundle.
 */
export const env = {
  apiBaseUrl: required(process.env.NEXT_PUBLIC_API_BASE_URL, 'NEXT_PUBLIC_API_BASE_URL'),
  siteUrl: required(process.env.NEXT_PUBLIC_SITE_URL, 'NEXT_PUBLIC_SITE_URL'),
} as const;
