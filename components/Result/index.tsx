'use client';
import { getStripeStatus } from '@/lib/actions/user.actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Result = () => {
  const params = useSearchParams();
  const payment_intent = params.get('payment_intent');
  const redirect_status = params.get('redirect_status');
  const [intent, setIntent] = useState<{ status: string; invoice: string }>();

  //   Gets status details on intent
  useEffect(() => {
    if (payment_intent && redirect_status) {
      const getData = async () => {
        try {
          const result = await getStripeStatus(payment_intent);
          if (result) {
            setIntent(result);
          }
        } catch (error) {}
      };
      getData();
    }
  }, [payment_intent, redirect_status]);

  if (!intent?.status && !payment_intent && !redirect_status)
    return (
      <div>
        <p>You.. lost? :)</p>
        <p>Nothing here... </p>
      </div>
    );

  return (
    <div>
      {intent?.status === 'succeeded' ? (
        <div>
          <h3
            className='text-4xl mb-5 underline
             underline-offset-2'
          >
            Thank you!
          </h3>
          <p className='mb-2'>
            {' '}
            Thank you for choosing Flamond for your jewelry purchase. We are
            honored to have been part of this special selection and sincerely
            appreciate your patronage. We hope your new piece brings you much
            joy and look forward to serving you again soon.
          </p>
          <Link href={intent.invoice}>
            <p className='text-md underline underline-offset-2 hover:text-blue-500 transition-colors duration-300'>
              Here is your invoice
            </p>
          </Link>
        </div>
      ) : (
        <div>
          <h3
            className='text-4xl mb-5 underline
             underline-offset-2'
          >
            Sorry :(
          </h3>
          <p className='mb-2'>{intent?.status}</p>
        </div>
      )}
    </div>
  );
};

export default Result;
