import type { CartItem } from '@/types';

/** Lowest quantity a cart row can have; removing a row is a separate action. */
export const MIN_QUANTITY = 1;

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
