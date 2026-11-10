import { create } from 'zustand';

import type { CatalogFilters } from '@/types';
import { SortOption } from '@/types/enums';

type CatalogState = CatalogFilters & {
  setQuery: (query: string) => void;
  setCategory: (category: string | null) => void;
  setSort: (sort: SortOption) => void;
  setPage: (page: number) => void;
};

const FIRST_PAGE = 1;

/**
 * Search, category, sort and page of the product list. It is global because the
 * header (search box, category menu) and the landing page both drive it.
 * Changing a filter returns to the first page.
 */
export const useCatalogStore = create<CatalogState>()((set) => ({
  query: '',
  category: null,
  sort: SortOption.Featured,
  page: FIRST_PAGE,
  setQuery: (query) => set({ query, page: FIRST_PAGE }),
  setCategory: (category) => set({ category, page: FIRST_PAGE }),
  setSort: (sort) => set({ sort, page: FIRST_PAGE }),
  setPage: (page) => set({ page }),
}));
