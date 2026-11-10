import { axiosInstance } from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { Catalog, Product } from '@/types';

/** Fetches the full product list; the API has no server-side paging. */
export async function getProducts(): Promise<Product[]> {
  const { data } = await axiosInstance.get<Product[]>(ENDPOINTS.products);
  return data;
}

/** Fetches the category slugs. */
export async function getProductCategories(): Promise<string[]> {
  const { data } = await axiosInstance.get<string[]>(ENDPOINTS.productCategories);
  return data;
}

/** Fetches products and categories together for the landing page. */
export async function getCatalog(): Promise<Catalog> {
  const [products, categories] = await Promise.all([getProducts(), getProductCategories()]);
  return { products, categories };
}
