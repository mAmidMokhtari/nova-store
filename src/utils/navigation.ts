import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/** Locale-aware replacements for `next/link` and the `next/navigation` hooks. */
export const { Link, usePathname, useRouter, getPathname } = createNavigation(routing);
