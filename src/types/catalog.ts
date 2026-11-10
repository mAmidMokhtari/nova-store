import type { SortOption } from './enums';

/** User-controlled view of the product list. */
export type CatalogFilters = {
  query: string;
  /** `null` means every category. */
  category: string | null;
  sort: SortOption;
  page: number;
};

export type Page<Item> = {
  items: Item[];
  page: number;
  totalPages: number;
  totalItems: number;
};
