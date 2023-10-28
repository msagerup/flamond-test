import StripeForm from '@/components/forms/Stripe';
import { ProductData, createSubscription } from '@/lib/actions/user.actions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeLoaderProps {
  product: ProductData;
}

const StripeLoader = ({ product }: StripeLoaderProps) => {
  const [intent, setIntent] = useState<{
    subscriptionId: string;
    clientSecret: string;
  } | null>(null);

  console.log();

  useEffect(() => {
    let isMounted = true; // mounted ref

    async function fetchSecret() {
      const customerId = 'cus_IyTbLniTHWS3GW';
      const priceId = product?.default_price || null;

      if (priceId) {
        try {
          const result = await createSubscription(priceId, customerId);
          if (isMounted && result?.clientSecret) {
            setIntent(result);
          }
        } catch (error) {
          console.error('Error creating subscription:', error);
        }
      }
    }

    if (product.default_price) {
      fetchSecret();
    }

    return () => {
      isMounted = false; // clean up mounted ref on unmount
    };
  }, [product.default_price]);

  if (intent?.clientSecret === undefined)
    return <div className='mt-10'>Loading...</div>;

  return (
    <div className='mt-10'>
      <Elements
        stripe={stripePromise}
        key={intent.clientSecret}
        options={{
          clientSecret: intent.clientSecret,
          appearance: { theme: 'stripe' },
        }}
      >
        <StripeForm />
      </Elements>
    </div>
  );
};

export default StripeLoader;
