'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useRef } from 'react';

import { THEME_INIT_SCRIPT } from '@/storage/themeStorage';

/**
 * Writes the theme bootstrap script into the server HTML, where it runs before
 * first paint. It is never rendered by React in the browser, where an inline
 * script would not execute anyway.
 */
export function ThemeScript() {
  const isInserted = useRef(false);

  useServerInsertedHTML(() => {
    // The callback runs once per flushed chunk; the script is needed only once.
    if (isInserted.current) return null;
    isInserted.current = true;

    return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
  });

  return null;
}
