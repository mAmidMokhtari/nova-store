'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useThemeMode } from '@/context/ThemeContext';
import { IconButton } from '@/shared/IconButton';
import { ThemeMode } from '@/types/enums';

/** Switches between the light and dark theme. */
export function ThemeToggle() {
  const t = useTranslations('header');
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === ThemeMode.Dark;

  return (
    <IconButton label={isDark ? t('switchToLight') : t('switchToDark')} onClick={toggleMode}>
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </IconButton>
  );
}
