'use client';

import styled from 'styled-components';

import { ProductCard } from '@/shared/ProductCard';
import type { Product } from '@/types';

type ProductGridProps = {
  products: readonly Product[];
  onAddToCart: (product: Product) => void;
};

/* One column on narrow phones, two from 480px, three on desktop. */
const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
`;

const Cell = styled.li`
  display: grid;
`;

/** Responsive grid of equally sized product cards. */
export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <Grid>
      {products.map((product) => (
        <Cell key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Cell>
      ))}
    </Grid>
  );
}
