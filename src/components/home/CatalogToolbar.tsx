'use client';

import { useTranslations } from 'next-intl';
import { useId } from 'react';
import styled from 'styled-components';

import { SortOption } from '@/types/enums';

type CatalogToolbarProps = {
  /** Already formatted, e.g. "12 products". */
  resultCount: string;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

const SORT_OPTIONS = Object.values(SortOption);

function isSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.includes(value as SortOption);
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-block-end: 20px;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.h2`
  position: relative;
  padding-block-end: 8px;
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 800;

  &::after {
    content: '';
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 0;
    inline-size: 56px;
    block-size: 3px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Count = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

const SortField = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const SortLabel = styled.label`
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

const Select = styled.select`
  min-block-size: 44px;
  padding-inline: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 600;
  cursor: pointer;
`;

/** Section heading of the product list with the result count and the sort control. */
export function CatalogToolbar({ resultCount, sort, onSortChange }: CatalogToolbarProps) {
  const t = useTranslations('catalog');
  const selectId = useId();

  return (
    <Wrapper>
      <Heading>
        <Title>{t('title')}</Title>
        <Count aria-live="polite">{resultCount}</Count>
      </Heading>

      <SortField>
        <SortLabel htmlFor={selectId}>{t('sortLabel')}</SortLabel>
        <Select
          id={selectId}
          value={sort}
          onChange={(event) => {
            if (isSortOption(event.target.value)) onSortChange(event.target.value);
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {t(`sort.${option}`)}
            </option>
          ))}
        </Select>
      </SortField>
    </Wrapper>
  );
}
