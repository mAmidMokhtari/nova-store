'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { toApiErrorCode } from '@/api/ApiError';
import { getCatalog } from '@/requests/products.requests';
import type { Catalog } from '@/types';
import { ApiErrorCode, RequestStatus } from '@/types/enums';
import { filterProducts, paginate, sortProducts } from '@/utils/catalog';
import { formatNumber } from '@/utils/formatters';
import { PRODUCTS_SECTION_ID } from '@/utils/routes';
import { useCartStore } from '@/zustand/cart.store';
import { useCatalogStore } from '@/zustand/catalog.store';

type CatalogRequest = {
  catalog: Catalog | null;
  status: RequestStatus;
  errorCode: ApiErrorCode | null;
};

/** Client-side fallback request; resolves to a state object and never rejects. */
async function requestCatalog(): Promise<CatalogRequest> {
  try {
    const catalog = await getCatalog();
    return { catalog, status: RequestStatus.Succeeded, errorCode: null };
  } catch (error) {
    return { catalog: null, status: RequestStatus.Failed, errorCode: toApiErrorCode(error) };
  }
}

/**
 * State and handlers of the landing page.
 * @param initialCatalog data fetched on the server, or `null` when that request failed
 */
export function useHomePage(initialCatalog: Catalog | null) {
  /* ---- State ---- */
  const t = useTranslations('catalog');
  const tErrors = useTranslations('errors');
  const locale = useLocale();

  const query = useCatalogStore((state) => state.query);
  const category = useCatalogStore((state) => state.category);
  const sort = useCatalogStore((state) => state.sort);
  const page = useCatalogStore((state) => state.page);
  const setQuery = useCatalogStore((state) => state.setQuery);
  const setCategory = useCatalogStore((state) => state.setCategory);
  const setSort = useCatalogStore((state) => state.setSort);
  const setPage = useCatalogStore((state) => state.setPage);
  const addToCart = useCartStore((state) => state.addItem);

  const [request, setRequest] = useState<CatalogRequest>({
    catalog: initialCatalog,
    status: initialCatalog ? RequestStatus.Succeeded : RequestStatus.Loading,
    errorCode: null,
  });

  const products = request.catalog?.products;

  const currentPage = useMemo(() => {
    const filtered = filterProducts(products ?? [], { query, category });
    return paginate(sortProducts(filtered, sort), page);
  }, [products, query, category, sort, page]);

  /* ---- Handlers ---- */
  const handleRetry = (): void => {
    setRequest({ catalog: null, status: RequestStatus.Loading, errorCode: null });
    void requestCatalog().then(setRequest);
  };

  const handleResetFilters = (): void => {
    setQuery('');
    setCategory(null);
  };

  const handlePageChange = (nextPage: number): void => {
    setPage(nextPage);
    document.getElementById(PRODUCTS_SECTION_ID)?.scrollIntoView({ block: 'start' });
  };

  /* ---- LifeCycles ---- */
  // Used only when the server could not reach the API while rendering the page.
  useEffect(() => {
    if (initialCatalog !== null) return;

    let isActive = true;
    void requestCatalog().then((result) => {
      if (isActive) setRequest(result);
    });

    return () => {
      isActive = false;
    };
  }, [initialCatalog]);

  /* ---- Return ---- */
  return {
    categories: request.catalog?.categories ?? [],
    selectedCategory: category,
    sort,
    currentPage,
    resultCount: t('resultCount', { count: formatNumber(currentPage.totalItems, locale) }),
    isLoading: request.status === RequestStatus.Loading,
    errorMessage: request.errorCode ? tErrors(request.errorCode) : null,
    isEmpty: products !== undefined && products.length === 0,
    setCategory,
    setSort,
    addToCart,
    handleRetry,
    handleResetFilters,
    handlePageChange,
  };
}
