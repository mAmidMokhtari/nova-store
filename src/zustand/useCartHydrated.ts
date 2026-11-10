import { useSyncExternalStore } from 'react';

import { useCartStore } from './cart.store';

const getSnapshot = (): boolean => useCartStore.persist.hasHydrated();
const getServerSnapshot = (): boolean => false;

/**
 * Tells whether the persisted cart has been read from storage. It is `false` on the
 * server and during hydration, so cart-dependent UI can render a stable placeholder.
 */
export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    useCartStore.persist.onFinishHydration,
    getSnapshot,
    getServerSnapshot,
  );
}
