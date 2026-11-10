'use client';

import { PackageOpen, RotateCw, SearchX, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Button } from '@/shared/Button';
import { Container } from '@/shared/Container';
import { Pagination } from '@/shared/Pagination';
import { LoadingState, StateView } from '@/shared/StateView';
import type { Catalog } from '@/types';
import { PRODUCTS_SECTION_ID } from '@/utils/routes';

import { CatalogToolbar } from './CatalogToolbar';
import { CategoryChips } from './CategoryChips';
import { Hero } from './Hero';
import { useHomePage } from './index.hook';
import { Newsletter } from './Newsletter';
import { ProductGrid } from './ProductGrid';

type HomeViewProps = {
  /** Catalog fetched on the server, or `null` when that request failed. */
  initialCatalog: Catalog | null;
};

const Page = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-block: 20px 40px;

  ${({ theme }) => theme.media.tablet} {
    gap: 36px;
    padding-block: 28px 56px;
  }
`;

/* Keeps the sticky header from covering the section when it is a scroll target. */
const ProductsSection = styled.section`
  scroll-margin-block-start: 140px;

  ${({ theme }) => theme.media.desktop} {
    scroll-margin-block-start: 92px;
  }
`;

/** Landing page: hero, categories, product list with sort and paging, newsletter. */
export function HomeView({ initialCatalog }: HomeViewProps) {
  const t = useTranslations('catalog');
  const tCommon = useTranslations('common');
  const page = useHomePage(initialCatalog);

  const renderProducts = () => {
    if (page.isLoading) return <LoadingState label={tCommon('loading')} />;

    if (page.errorMessage) {
      return (
        <StateView
          tone="danger"
          icon={<TriangleAlert size={30} aria-hidden="true" />}
          title={t('errorTitle')}
          description={page.errorMessage}
          action={
            <Button
              variant="secondary"
              icon={<RotateCw size={16} aria-hidden="true" />}
              onClick={page.handleRetry}
            >
              {tCommon('retry')}
            </Button>
          }
        />
      );
    }

    if (page.isEmpty) {
      return (
        <StateView
          icon={<PackageOpen size={30} aria-hidden="true" />}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      );
    }

    if (page.currentPage.totalItems === 0) {
      return (
        <StateView
          icon={<SearchX size={30} aria-hidden="true" />}
          title={t('noResultsTitle')}
          description={t('noResultsDescription')}
          action={
            <Button variant="secondary" onClick={page.handleResetFilters}>
              {t('resetFilters')}
            </Button>
          }
        />
      );
    }

    return (
      <>
        <ProductGrid products={page.currentPage.items} onAddToCart={page.addToCart} />
        <Pagination
          page={page.currentPage.page}
          totalPages={page.currentPage.totalPages}
          onChange={page.handlePageChange}
        />
      </>
    );
  };

  return (
    <Page>
      <Hero />

      {page.categories.length > 0 && (
        <CategoryChips
          categories={page.categories}
          selected={page.selectedCategory}
          onSelect={page.setCategory}
        />
      )}

      <ProductsSection id={PRODUCTS_SECTION_ID}>
        <CatalogToolbar
          resultCount={page.resultCount}
          sort={page.sort}
          onSortChange={page.setSort}
        />
        {renderProducts()}
      </ProductsSection>

      <Newsletter />
    </Page>
  );
}
