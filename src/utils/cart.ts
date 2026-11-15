import type { CartItem } from '@/types';

/** Lowest quantity a cart row can have; removing a row is a separate action. */
export const MIN_QUANTITY = 1;

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;

  const item = value as Record<string, unknown>;

  return (
    Number.isInteger(item.id) &&
    typeof item.title === 'string' &&
    typeof item.price === 'number' &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    typeof item.image === 'string' &&
    typeof item.category === 'string' &&
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity >= MIN_QUANTITY
  );
}

/**
 * Reads the cart rows out of persisted state. Storage can be edited by hand or
 * written by an older version, so anything that is not a valid row is dropped.
 * @param persisted whatever the persist middleware read from storage
 */
export function restoreCartItems(persisted: unknown): CartItem[] {
  if (typeof persisted !== 'object' || persisted === null || !('items' in persisted)) return [];

  return Array.isArray(persisted.items) ? persisted.items.filter(isCartItem) : [];
}

/** Works in cents to avoid floating point drift when summing prices. */
function toCents(price: number): number {
  return Math.round(price * 100);
}

/** Price of one row: unit price times quantity. */
export function getLineTotal(item: Pick<CartItem, 'price' | 'quantity'>): number {
  return (toCents(item.price) * item.quantity) / 100;
}

/** Sum of every row. */
export function getCartTotal(items: readonly CartItem[]): number {
  return items.reduce((sum, item) => sum + toCents(item.price) * item.quantity, 0) / 100;
}

/** Number of units in the cart, shown on the header badge. */
export function getCartCount(items: readonly CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
