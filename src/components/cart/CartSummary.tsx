'use client';

import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import styled from 'styled-components';

import { Button } from '@/shared/Button';

type CartSummaryProps = {
  /** Already formatted values. */
  itemCount: string;
  total: string;
  onClear: () => void;
};

/* Sticks beside the list on desktop; on small screens it follows the rows. */
const Card = styled.aside`
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};

  ${({ theme }) => theme.media.desktop} {
    position: sticky;
    inset-block-start: calc(${({ theme }) => theme.layout.headerHeight} + 20px);
  }
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 800;
`;

const Lines = styled.dl`
  display: grid;
  gap: 10px;
  margin: 0;
`;

const Line = styled.div<{ $strong?: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-block-start: ${({ $strong }) => ($strong ? '12px' : '0')};
  border-block-start: ${({ theme, $strong }) =>
    $strong ? `1px solid ${theme.colors.border}` : '0'};
  font-size: ${({ $strong }) => ($strong ? '18px' : '15px')};
  font-weight: ${({ $strong }) => ($strong ? 800 : 400)};

  dt {
    color: ${({ theme, $strong }) => ($strong ? theme.colors.text : theme.colors.textMuted)};
  }

  dd {
    margin: 0;
    font-weight: ${({ $strong }) => ($strong ? 800 : 600)};
  }
`;

const Note = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  text-align: center;
`;

/** Order summary with the total and the empty-cart action. */
export function CartSummary({ itemCount, total, onClear }: CartSummaryProps) {
  const t = useTranslations('cart');
  const titleId = useId();
  const noteId = useId();

  return (
    <Card aria-labelledby={titleId}>
      <Title id={titleId}>{t('summaryTitle')}</Title>

      <Lines>
        <Line>
          <dt>{t('subtotal')}</dt>
          <dd>{itemCount}</dd>
        </Line>
        <Line $strong>
          <dt>{t('total')}</dt>
          <dd aria-live="polite">{total}</dd>
        </Line>
      </Lines>

      {/* Payment is out of scope, so the button is present but disabled, with the reason. */}
      <Button fullWidth disabled aria-describedby={noteId}>
        {t('checkout')}
      </Button>
      <Note id={noteId}>{t('checkoutNote')}</Note>

      <Button
        variant="danger"
        fullWidth
        icon={<Trash2 size={16} aria-hidden="true" />}
        onClick={onClear}
      >
        {t('clear')}
      </Button>
    </Card>
  );
}
