import { defineRouting } from 'next-intl/routing';

import { Locale } from '@/types/enums';

/** Locale routing shared by the proxy, the request config and navigation helpers. */
export const routing = defineRouting({
  locales: [Locale.Fa, Locale.En],
  defaultLocale: Locale.Fa,
  localePrefix: 'always',
});
