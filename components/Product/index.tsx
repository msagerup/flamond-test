"use client"


import StripeProduct from '@/components/StripeProduct';
import { getProductByID } from '@/lib/actions/user.actions';
import { ProductData } from '@/lib/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import StripeLoader from '../StripeLoader';

const Product = () => {
  const [product, setProduct] = useState<ProductData | null>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  // Fetch single product from Stripe.
  useEffect(() => {
    async function getData() {
      try {
        const result = await getProductByID(id);
        if (result.id) {
          setProduct(result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product?.id) {
    return (
      <div>
        <h3 className='text-2xl'>Sorry, No products found for: {id}.</h3>
        <Link href='/products'>
          <h5 className='text-lg underline underline-offset-2 hover:text-blue-500 transition-colors duration-300'>Have a look at our products page</h5>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <StripeProduct product={product} isButtonDisabled={true} />
      <StripeLoader product={product} />
    </div>
  );
};

export default Product;