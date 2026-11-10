'use client';

import { Minus, Plus } from 'lucide-react';
import { useLocale } from 'next-intl';
import styled from 'styled-components';

import { MIN_QUANTITY } from '@/utils/cart';
import { formatNumber } from '@/utils/formatters';

type QuantityStepperProps = {
  quantity: number;
  /** Accessible names of the two buttons, e.g. "Increase quantity of …". */
  increaseLabel: string;
  decreaseLabel: string;
  onIncrease: () => void;
  onDecrease: () => void;
};

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const StepButton = styled.button`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Value = styled.output`
  min-inline-size: 32px;
  font-weight: 700;
  text-align: center;
`;

/** Plus/minus control for a cart row. The minus button stops at the minimum quantity. */
export function QuantityStepper({
  quantity,
  increaseLabel,
  decreaseLabel,
  onIncrease,
  onDecrease,
}: QuantityStepperProps) {
  const locale = useLocale();

  return (
    <Wrapper>
      <StepButton
        type="button"
        aria-label={decreaseLabel}
        disabled={quantity <= MIN_QUANTITY}
        onClick={onDecrease}
      >
        <Minus size={16} aria-hidden="true" />
      </StepButton>
      <Value aria-live="polite">{formatNumber(quantity, locale)}</Value>
      <StepButton type="button" aria-label={increaseLabel} onClick={onIncrease}>
        <Plus size={16} aria-hidden="true" />
      </StepButton>
    </Wrapper>
  );
}
