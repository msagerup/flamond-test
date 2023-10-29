'use client';
import StripeProduct from '@/components/StripeProduct';
import { getProducts } from '@/lib/actions/user.actions';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';

const Products = () => {
  const [products, setProducts] = useState<Stripe.Product[]>([]);

  
  // Fetch all products from Stripe.
  useEffect(() => {
    async function getData() {
      try {
        const result = await getProducts();
        if (result) {
          setProducts(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className='flex flex-wrap gap-3 justify-start '>
      {products.map((product) => (
        <div key={product.id}>
          <StripeProduct product={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
