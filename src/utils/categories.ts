import { ProductCategory } from '@/types/enums';

/** Dictionary keys under `categories` for the slugs the store knows how to translate. */
const CATEGORY_KEYS = {
  [ProductCategory.Electronics]: 'electronics',
  [ProductCategory.Jewelery]: 'jewelery',
  [ProductCategory.MensClothing]: 'mensClothing',
  [ProductCategory.WomensClothing]: 'womensClothing',
} as const satisfies Record<ProductCategory, string>;

export type CategoryKey = (typeof CATEGORY_KEYS)[ProductCategory];

function isKnownCategory(slug: string): slug is ProductCategory {
  return slug in CATEGORY_KEYS;
}

/** Returns the dictionary key of a category, or `null` when the API sends an unknown one. */
export function getCategoryKey(slug: string): CategoryKey | null {
  return isKnownCategory(slug) ? CATEGORY_KEYS[slug] : null;
}
