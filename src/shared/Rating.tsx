'use client';

import { Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';

import type { ProductRating } from '@/types';
import { formatNumber } from '@/utils/formatters';

type RatingProps = {
  rating: ProductRating;
};

const MAX_RATING = 5;

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
`;

const StarIcon = styled(Star)`
  color: ${({ theme }) => theme.colors.star};
  fill: currentColor;
`;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 400;
`;

/** Star, average rating and number of reviews, with a full sentence for screen readers. */
export function Rating({ rating }: RatingProps) {
  const t = useTranslations('product');
  const locale = useLocale();

  const rate = formatNumber(rating.rate, locale, { minimumFractionDigits: 1 });
  const count = formatNumber(rating.count, locale);
  const label = t('rating', { rate, count, max: formatNumber(MAX_RATING, locale) });

  return (
    <Wrapper role="img" aria-label={label}>
      <StarIcon size={15} aria-hidden="true" />
      <span aria-hidden="true">{rate}</span>
      <Count aria-hidden="true">({count})</Count>
    </Wrapper>
  );
}
