'use client';

import { ShoppingCart } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';

import { iconButtonStyles } from '@/shared/IconButton';
import { getCartCount } from '@/utils/cart';
import { formatNumber } from '@/utils/formatters';
import { Link } from '@/utils/navigation';
import { ROUTES } from '@/utils/routes';
import { useCartStore } from '@/zustand/cart.store';
import { useCartHydrated } from '@/zustand/useCartHydrated';

const StyledLink = styled(Link)`
  ${iconButtonStyles}
`;

const Badge = styled.span`
  position: absolute;
  inset-block-start: 2px;
  inset-inline-end: 0;
  display: grid;
  place-items: center;
  min-inline-size: 20px;
  block-size: 20px;
  padding-inline: 5px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.accentStrong};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
`;

/** Header link to the cart with the number of units in it. */
export function CartLink() {
  const t = useTranslations('header');
  const locale = useLocale();
  const isHydrated = useCartHydrated();
  const count = useCartStore((state) => getCartCount(state.items));

  // The persisted cart is unknown until hydration, so the badge waits for it.
  const visibleCount = isHydrated ? count : 0;
  const formattedCount = formatNumber(visibleCount, locale);

  return (
    <StyledLink
      href={ROUTES.cart}
      aria-label={visibleCount > 0 ? t('cartWithCount', { count: formattedCount }) : t('cart')}
    >
      <ShoppingCart size={22} aria-hidden="true" />
      {visibleCount > 0 && <Badge aria-hidden="true">{formattedCount}</Badge>}
    </StyledLink>
  );
}
