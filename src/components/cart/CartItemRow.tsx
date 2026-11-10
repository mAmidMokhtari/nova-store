'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';

import { IconButton } from '@/shared/IconButton';
import { QuantityStepper } from '@/shared/QuantityStepper';
import { useCategoryLabel } from '@/shared/useCategoryLabel';
import type { CartItem } from '@/types';
import { getLineTotal } from '@/utils/cart';
import { formatPrice } from '@/utils/formatters';

type CartItemRowProps = {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
};

/* Mobile: image beside the details, controls on a second line. Tablet and up: one line. */
const Row = styled.li`
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr) auto;
  grid-template-areas:
    'image info remove'
    'controls controls total';
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 88px minmax(0, 1fr) auto 120px auto;
    grid-template-areas: 'image info controls total remove';
    gap: 16px;
    padding: 16px;
  }
`;

const Thumbnail = styled.div`
  grid-area: image;
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.imageBackground};
`;

const ItemImage = styled(Image)`
  padding: 8px;
  object-fit: contain;
`;

const Info = styled.div`
  grid-area: info;
  display: grid;
  gap: 2px;
  min-inline-size: 0;
`;

const Title = styled.h2`
  display: -webkit-box;
  overflow: hidden;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

const Controls = styled.div`
  grid-area: controls;
`;

const Total = styled.div`
  grid-area: total;
  display: grid;
  justify-items: end;
  text-align: end;
`;

const TotalLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
`;

const TotalValue = styled.span`
  font-size: 16px;
  font-weight: 800;
`;

const RemoveSlot = styled.div`
  grid-area: remove;
  color: ${({ theme }) => theme.colors.danger};

  button {
    color: inherit;
  }
`;

/** One cart line: image, details, quantity stepper, line total and remove. */
export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  const t = useTranslations('cart');
  const locale = useLocale();
  const getCategoryLabel = useCategoryLabel();

  return (
    <Row>
      <Thumbnail>
        {/* The title is next to it, so the image is decorative. */}
        <ItemImage src={item.image} alt="" fill sizes="88px" />
      </Thumbnail>

      <Info>
        <Title dir="auto">{item.title}</Title>
        <Meta>{getCategoryLabel(item.category)}</Meta>
        <Meta>
          {t('unitPrice')}: {formatPrice(item.price, locale)}
        </Meta>
      </Info>

      <Controls>
        <QuantityStepper
          quantity={item.quantity}
          increaseLabel={t('increase', { title: item.title })}
          decreaseLabel={t('decrease', { title: item.title })}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
        />
      </Controls>

      <Total>
        <TotalLabel>{t('lineTotal')}</TotalLabel>
        <TotalValue>{formatPrice(getLineTotal(item), locale)}</TotalValue>
      </Total>

      <RemoveSlot>
        <IconButton label={t('remove', { title: item.title })} onClick={() => onRemove(item.id)}>
          <Trash2 size={18} aria-hidden="true" />
        </IconButton>
      </RemoveSlot>
    </Row>
  );
}
