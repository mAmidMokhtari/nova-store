import type messages from '@/dictionary/fa.json';
import type { routing } from '@/utils/routing';

declare module 'next-intl' {
  // Declaration merging requires an interface here.
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
