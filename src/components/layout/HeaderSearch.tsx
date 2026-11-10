'use client';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FormEvent } from 'react';
import styled from 'styled-components';

import { useRouter } from '@/utils/navigation';
import { PRODUCTS_ANCHOR } from '@/utils/routes';
import { useCatalogStore } from '@/zustand/catalog.store';

const Form = styled.form`
  position: relative;
  inline-size: 100%;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Icon = styled(Search)`
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 14px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = styled.input`
  inline-size: 100%;
  block-size: 44px;
  padding-inline: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: 6px;
  display: grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transform: translateY(-50%);
`;

/**
 * Product search. Typing filters the list live through the catalog store;
 * submitting jumps to the product list, also from other pages.
 */
export function HeaderSearch() {
  const t = useTranslations('header');
  const router = useRouter();
  const query = useCatalogStore((state) => state.query);
  const setQuery = useCatalogStore((state) => state.setQuery);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(PRODUCTS_ANCHOR);
  };

  return (
    <Form role="search" onSubmit={handleSubmit}>
      <Icon size={18} aria-hidden="true" />
      <Input
        type="search"
        value={query}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchLabel')}
        enterKeyHint="search"
        onChange={(event) => setQuery(event.target.value)}
      />
      {query !== '' && (
        <ClearButton type="button" aria-label={t('clearSearch')} onClick={() => setQuery('')}>
          <X size={16} aria-hidden="true" />
        </ClearButton>
      )}
    </Form>
  );
}
