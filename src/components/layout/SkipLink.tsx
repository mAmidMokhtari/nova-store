'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

type SkipLinkProps = {
  /** Id of the main landmark to jump to. */
  targetId: string;
};

const StyledLink = styled.a`
  position: fixed;
  inset-block-start: 8px;
  inset-inline-start: 8px;
  z-index: 100;
  padding-block: 10px;
  padding-inline: 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  transform: translateY(-200%);

  &:focus-visible {
    transform: none;
  }
`;

/** First focusable element of the page; lets keyboard users skip the header. */
export function SkipLink({ targetId }: SkipLinkProps) {
  const t = useTranslations('common');

  return <StyledLink href={`#${targetId}`}>{t('skipToContent')}</StyledLink>;
}
