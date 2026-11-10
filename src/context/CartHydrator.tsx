'use client';

import { useEffect } from 'react';

import { useCartStore } from '@/zustand/cart.store';

/** Loads the persisted cart after hydration; renders nothing. Mount it once in the layout. */
export function CartHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return null;
}
