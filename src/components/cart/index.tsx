'use client';

import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { ConfirmModal } from '@/modals/ConfirmModal';
import { buttonStyles, type ButtonVariant } from '@/shared/Button';
import { Container } from '@/shared/Container';
import { LoadingState, StateView } from '@/shared/StateView';
import { Link } from '@/utils/navigation';
import { PRODUCTS_ANCHOR } from '@/utils/routes';

import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';
import { useCartPage } from './index.hook';

const Page = styled(Container)`
  padding-block: 24px 48px;
`;

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-block-end: 20px;
`;

const Title = styled.h1`
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 800;
`;

const Count = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

const Layout = styled.div`
  display: grid;
  gap: 20px;
  align-items: start;

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 28px;
  }
`;

const Rows = styled.ul`
  display: grid;
  gap: 12px;
`;

const ShopLink = styled(Link)<{ $variant: ButtonVariant }>`
  ${buttonStyles}
`;

/** Cart page: rows with quantity controls, order summary, and the empty state. */
export function CartView() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const page = useCartPage();

  const renderContent = () => {
    if (page.isLoading) return <LoadingState label={tCommon('loading')} />;

    if (page.isEmpty) {
      return (
        <StateView
          icon={<ShoppingBag size={30} aria-hidden="true" />}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={
            <ShopLink href={PRODUCTS_ANCHOR} $variant="primary">
              {t('continueShopping')}
            </ShopLink>
          }
        />
      );
    }

    return (
      <Layout>
        <Rows>
          {page.items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrease={page.increase}
              onDecrease={page.decrease}
              onRemove={page.removeItem}
            />
          ))}
        </Rows>
        <CartSummary
          itemCount={page.itemCount}
          total={page.total}
          onClear={page.openClearConfirm}
        />
      </Layout>
    );
  };

  return (
    <Page>
      <Heading>
        <Title>{t('title')}</Title>
        {!page.isLoading && !page.isEmpty && <Count>{page.itemCount}</Count>}
      </Heading>

      {renderContent()}

      <ConfirmModal
        isOpen={page.isClearConfirmOpen}
        title={t('clearConfirmTitle')}
        description={t('clearConfirmDescription')}
        confirmLabel={t('clearConfirm')}
        cancelLabel={tCommon('cancel')}
        onConfirm={page.handleConfirmClear}
        onCancel={page.closeClearConfirm}
      />
    </Page>
  );
}
