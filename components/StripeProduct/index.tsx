
import { ProductData } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Stripe from 'stripe';

interface StripeProductProps {
  product: ProductData | Stripe.Product;
  isButtonDisabled?: boolean;
}

const StripeProduct = ({ product, isButtonDisabled }: StripeProductProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/products/${product.id}`);
  };

  if (!product.id) return null;

  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex justify-center py-2'>
        <Image
          src={product.images[0]}
          alt={product.name}
          height={100}
          width={100}
          priority
        ></Image>
      </div>

      <div className='p-5'>
        <h6 className='mb-2 text-lg font-bold tracking-tight text-gray-600 dark:text-white'>
          {product.name}
        </h6>

        <div>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {product.metadata.price}
          </p>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {product.description}
          </p>
        </div>

        <div className='flex justify-center'>
          {!isButtonDisabled && (
            <button
              onClick={handleOnClick}
              className='bg-blue-400 hover:bg-blue-600 font-bold py-2 px-4 rounded'
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StripeProduct;
