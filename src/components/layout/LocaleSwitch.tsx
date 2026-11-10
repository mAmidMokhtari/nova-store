'use client';

import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Locale } from '@/types/enums';
import { usePathname, useRouter } from '@/utils/navigation';
import { routing } from '@/utils/routing';

const Group = styled.div`
  display: inline-flex;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const Option = styled.button<{ $active: boolean }>`
  min-inline-size: 42px;
  block-size: 36px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $active }) => ($active ? theme.colors.accentSoft : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

/** Language codes are shown untranslated on purpose, so each is readable in any locale. */
const LOCALE_LABELS: Record<Locale, string> = {
  [Locale.Fa]: 'FA',
  [Locale.En]: 'EN',
};

/** Segmented control that reloads the current page in the other language. */
export function LocaleSwitch() {
  const t = useTranslations('header');
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Group role="group" aria-label={t('language')} dir="ltr">
      {routing.locales.map((locale) => (
        <Option
          key={locale}
          type="button"
          lang={locale}
          $active={locale === activeLocale}
          aria-pressed={locale === activeLocale}
          onClick={() => router.replace(pathname, { locale, scroll: false })}
        >
          {LOCALE_LABELS[locale]}
        </Option>
      ))}
    </Group>
  );
}
