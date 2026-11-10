import { Direction, Locale } from '@/types/enums';

const INTL_LOCALES: Record<Locale, string> = {
  [Locale.Fa]: 'fa-IR',
  [Locale.En]: 'en-US',
};

/** FakeStoreAPI prices are plain numbers in US dollars. */
const API_CURRENCY = 'USD';

/** Formats an API price with the digits and separators of the locale. */
export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALES[locale], {
    style: 'currency',
    currency: API_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Formats a number with the digits of the locale. */
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(INTL_LOCALES[locale], options).format(value);
}

/** Text direction of a locale. */
export function getDirection(locale: Locale): Direction {
  return locale === Locale.Fa ? Direction.Rtl : Direction.Ltr;
}
