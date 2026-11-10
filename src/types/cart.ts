import type { Product } from './product';

/** Snapshot of a product kept in the cart, plus how many of it. */
export type CartItem = Pick<Product, 'id' | 'title' | 'price' | 'image' | 'category'> & {
  quantity: number;
};
