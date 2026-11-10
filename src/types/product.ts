export type ProductRating = {
  rate: number;
  count: number;
};

/** Product as returned by FakeStoreAPI. */
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
};

/** Everything the landing page needs from the API. */
export type Catalog = {
  products: Product[];
  categories: string[];
};
