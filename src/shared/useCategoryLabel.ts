'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { getCategoryKey } from '@/utils/categories';

/**
 * Returns a function that translates an API category slug. Slugs the dictionary
 * does not know are shown as sent by the API.
 */
export function useCategoryLabel(): (slug: string) => string {
  const t = useTranslations('categories');

  return useCallback(
    (slug: string) => {
      const key = getCategoryKey(slug);
      return key ? t(key) : slug;
    },
    [t],
  );
}
