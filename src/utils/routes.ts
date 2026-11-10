/** Locale-less paths of the store; the locale prefix is added by the navigation helpers. */
export const ROUTES = {
  home: '/',
  cart: '/cart',
} as const;

/** Id of the product list section, used as a scroll target. */
export const PRODUCTS_SECTION_ID = 'products';

/** Home path that scrolls to the product list. */
export const PRODUCTS_ANCHOR = `${ROUTES.home}#${PRODUCTS_SECTION_ID}`;
