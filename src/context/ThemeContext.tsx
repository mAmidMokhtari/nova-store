'use client';

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { ThemeProvider } from 'styled-components';

import { isThemeMode, readPreferredTheme, writeStoredTheme } from '@/storage/themeStorage';
import { ThemeMode } from '@/types/enums';
import { theme } from '@/utils/theme';

type ThemeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

type AppThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/*
 * The active mode lives on `<html data-theme>`: an inline script sets it before
 * first paint and CSS variables react to it. React only mirrors that attribute.
 */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function getSnapshot(): ThemeMode {
  const value = document.documentElement.dataset.theme;
  return isThemeMode(value) ? value : ThemeMode.Light;
}

function getServerSnapshot(): ThemeMode {
  return ThemeMode.Light;
}

/** Provides the styled-components tokens and the light/dark mode with its toggle. */
export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Switching the locale remounts the root layout and React resets <html> to the
  // attributes it knows about, so the theme attribute is restored before paint.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!isThemeMode(root.dataset.theme)) root.dataset.theme = readPreferredTheme();
  }, []);

  const toggleMode = useCallback(() => {
    const next = getSnapshot() === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    document.documentElement.dataset.theme = next;
    writeStoredTheme(next);
  }, []);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeContext value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext>
  );
}

/** Returns the active theme mode and a function that switches it. */
export function useThemeMode(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeMode must be used inside AppThemeProvider.');
  }

  return context;
}
