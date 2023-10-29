import Products from '@/components/Products';
import { Suspense } from 'react';

const ProductsPage = async () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Products />
    </Suspense>
  );
};

export default ProductsPage;
