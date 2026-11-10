'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Direction } from '@/types/enums';
import { formatNumber, getDirection } from '@/utils/formatters';

type PaginationProps = {
  /** 1-based current page. */
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-block-start: 28px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  display: grid;
  place-items: center;
  min-inline-size: 44px;
  block-size: 44px;
  padding-inline: 8px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.background : theme.colors.text)};
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

/** Numbered page controls. Renders nothing when there is a single page. */
export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const t = useTranslations('catalog.pagination');
  const locale = useLocale();

  if (totalPages <= 1) return null;

  // Chevrons point with the reading direction: "previous" faces the start edge.
  const isRtl = getDirection(locale) === Direction.Rtl;
  const PreviousIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Nav aria-label={t('label')}>
      <List>
        <li>
          <PageButton
            type="button"
            aria-label={t('previous')}
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
          >
            <PreviousIcon size={18} aria-hidden="true" />
          </PageButton>
        </li>
        {pages.map((number) => (
          <li key={number}>
            <PageButton
              type="button"
              $active={number === page}
              aria-label={t('page', { page: formatNumber(number, locale) })}
              aria-current={number === page ? 'page' : undefined}
              onClick={() => onChange(number)}
            >
              {formatNumber(number, locale)}
            </PageButton>
          </li>
        ))}
        <li>
          <PageButton
            type="button"
            aria-label={t('next')}
            disabled={page === totalPages}
            onClick={() => onChange(page + 1)}
          >
            <NextIcon size={18} aria-hidden="true" />
          </PageButton>
        </li>
      </List>
    </Nav>
  );
}
