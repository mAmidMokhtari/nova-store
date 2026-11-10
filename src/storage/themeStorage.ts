import { StorageKey, ThemeMode } from '@/types/enums';

import { safeLocalStorage } from './safeLocalStorage';

/** Tells whether a stored or DOM value is a supported theme. */
export function isThemeMode(value: unknown): value is ThemeMode {
  return value === ThemeMode.Light || value === ThemeMode.Dark;
}

/** Theme to start with: the stored choice, otherwise the system preference. */
export function readPreferredTheme(): ThemeMode {
  const stored = safeLocalStorage.getItem(StorageKey.Theme);
  if (isThemeMode(stored)) return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeMode.Dark
    : ThemeMode.Light;
}

/** Remembers the theme the visitor picked. */
export function writeStoredTheme(mode: ThemeMode): void {
  void safeLocalStorage.setItem(StorageKey.Theme, mode);
}

/**
 * Inline script that applies the stored (or system) theme before first paint,
 * so a statically rendered page does not flash the wrong colors.
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;try{var s=localStorage.getItem('${StorageKey.Theme}');d.dataset.theme=s==='${ThemeMode.Dark}'||s==='${ThemeMode.Light}'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'${ThemeMode.Dark}':'${ThemeMode.Light}')}catch(e){d.dataset.theme='${ThemeMode.Light}'}})()`;
