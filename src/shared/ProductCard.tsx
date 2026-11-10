'use client';

import { Check, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatters';

import { Button } from './Button';
import { Rating } from './Rating';
import { useCategoryLabel } from './useCategoryLabel';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ADDED_FEEDBACK_MS = 1600;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.imageBackground};
`;

const ProductImage = styled(Image)`
  padding: 20px;
  object-fit: contain;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;

const CategoryBadge = styled.span`
  align-self: flex-start;
  padding-block: 2px;
  padding-inline: 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.accentSoft};
  font-size: 12px;
  font-weight: 600;
`;

const Title = styled.h3`
  display: -webkit-box;
  min-block-size: 2.9em;
  overflow: hidden;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Price = styled.p`
  margin-block-start: auto;
  font-size: 17px;
  font-weight: 800;
`;

/** Product tile with image, category, title, rating, price and the add-to-cart button. */
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const t = useTranslations('product');
  const locale = useLocale();
  const getCategoryLabel = useCategoryLabel();
  const [justAdded, setJustAdded] = useState(false);
  const feedbackTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS);
  };

  return (
    <Card>
      <Media>
        {/* The title follows in the card body, so the image is decorative. */}
        <ProductImage
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 480px) 50vw, 100vw"
        />
      </Media>
      <Body>
        <CategoryBadge>{getCategoryLabel(product.category)}</CategoryBadge>
        <Title dir="auto" title={product.title}>
          {product.title}
        </Title>
        <Rating rating={product.rating} />
        <Price>{formatPrice(product.price, locale)}</Price>
        <Button
          fullWidth
          icon={
            justAdded ? (
              <Check size={18} aria-hidden="true" />
            ) : (
              <ShoppingCart size={18} aria-hidden="true" />
            )
          }
          onClick={handleAdd}
        >
          <span aria-live="polite">{justAdded ? t('added') : t('addToCart')}</span>
        </Button>
      </Body>
    </Card>
  );
}
