import type { CatalogFilters, Page, Product } from '@/types';
import { SortOption } from '@/types/enums';

/** Suggested by the challenge. */
export const PAGE_SIZE = 6;

/** Lowercases and unifies Arabic/Persian letter variants so typed queries match stored text. */
function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک');
}

/** Keeps the products that match the search text and the selected category. */
export function filterProducts(
  products: readonly Product[],
  { query, category }: Pick<CatalogFilters, 'query' | 'category'>,
): Product[] {
  const needle = normalize(query);

  return products.filter((product) => {
    const inCategory = category === null || product.category === category;
    const matchesQuery =
      needle === '' ||
      normalize(product.title).includes(needle) ||
      normalize(product.category).includes(needle);

    return inCategory && matchesQuery;
  });
}

const comparators: Record<SortOption, ((a: Product, b: Product) => number) | null> = {
  [SortOption.Featured]: null,
  [SortOption.PriceAsc]: (a, b) => a.price - b.price,
  [SortOption.PriceDesc]: (a, b) => b.price - a.price,
  [SortOption.TitleAsc]: (a, b) => a.title.localeCompare(b.title),
  [SortOption.TitleDesc]: (a, b) => b.title.localeCompare(a.title),
};

/** Returns a sorted copy; the input is never mutated. */
export function sortProducts(products: readonly Product[], sort: SortOption): Product[] {
  const compare = comparators[sort];
  return compare ? [...products].sort(compare) : [...products];
}

/**
 * Slices one page out of a list. FakeStoreAPI has no paging, so it happens here.
 * @param page 1-based; clamped to the valid range
 */
export function paginate<Item>(
  items: readonly Item[],
  page: number,
  pageSize = PAGE_SIZE,
): Page<Item> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    totalItems: items.length,
  };
}
