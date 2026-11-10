'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

type StyledRegistryProps = {
  children: ReactNode;
};

/**
 * Collects the styled-components rules produced during server rendering and
 * injects them into the HTML stream, so the first paint is already styled.
 */
export function StyledRegistry({ children }: StyledRegistryProps) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // In the browser styled-components manages its own style tag.
  if (typeof window !== 'undefined') return <>{children}</>;

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}
