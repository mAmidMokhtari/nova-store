import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { safeLocalStorage } from '@/storage/safeLocalStorage';
import type { CartItem, Product } from '@/types';
import { StorageKey } from '@/types/enums';
import { MIN_QUANTITY } from '@/utils/cart';

type CartState = {
  items: CartItem[];
  /** Adds one unit of the product, creating the row when needed. */
  addItem: (product: Product) => void;
  increase: (id: number) => void;
  /** Never goes below `MIN_QUANTITY`; use `removeItem` to delete a row. */
  decrease: (id: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
};

function changeQuantity(items: CartItem[], id: number, delta: number): CartItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(MIN_QUANTITY, item.quantity + delta) } : item,
  );
}

/**
 * Shopping cart, persisted to localStorage. Hydration is manual (`skipHydration`)
 * so the server HTML and the first client render agree; see `CartHydrator`.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set(({ items }) => {
          const exists = items.some((item) => item.id === product.id);
          if (exists) return { items: changeQuantity(items, product.id, 1) };

          const { id, title, price, image, category } = product;
          return { items: [...items, { id, title, price, image, category, quantity: 1 }] };
        }),
      increase: (id) => set(({ items }) => ({ items: changeQuantity(items, id, 1) })),
      decrease: (id) => set(({ items }) => ({ items: changeQuantity(items, id, -1) })),
      removeItem: (id) => set(({ items }) => ({ items: items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: StorageKey.Cart,
      version: 1,
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: ({ items }) => ({ items }),
      skipHydration: true,
    },
  ),
);
