'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { getCartCount, getCartTotal } from '@/utils/cart';
import { formatNumber, formatPrice } from '@/utils/formatters';
import { useCartStore } from '@/zustand/cart.store';
import { useCartHydrated } from '@/zustand/useCartHydrated';

/** State and handlers of the cart page. */
export function useCartPage() {
  /* ---- State ---- */
  const t = useTranslations('cart');
  const locale = useLocale();
  const isHydrated = useCartHydrated();

  const items = useCartStore((state) => state.items);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  /* ---- Handlers ---- */
  const handleConfirmClear = (): void => {
    clear();
    setIsClearConfirmOpen(false);
  };

  /* ---- Return ---- */
  return {
    items,
    // Until the persisted cart is read, "empty" is not known yet.
    isLoading: !isHydrated,
    isEmpty: items.length === 0,
    itemCount: t('itemCount', { count: formatNumber(getCartCount(items), locale) }),
    total: formatPrice(getCartTotal(items), locale),
    increase,
    decrease,
    removeItem,
    isClearConfirmOpen,
    openClearConfirm: () => setIsClearConfirmOpen(true),
    closeClearConfirm: () => setIsClearConfirmOpen(false),
    handleConfirmClear,
  };
}
