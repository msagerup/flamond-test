'use client';
import { getDomainUrl, isObjEmpty } from '@/lib/utils';
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';

// Redirect path after purchase.
const redirectUrl = getDomainUrl(true, 'pay_result');

const StripeForm = () => {
  const [message, setMessage] = useState<StripeError | {}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentElementRdy, setPaymentElementRdy] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  /**
   * Handles Stripe checkout flow.
   * Redirects user after successful purchase.
   *
   * @param {FormEvent<HTMLFormElement>} event - Form submit event.
   * @returns {null} - Redirects user to value of redirectUrl func.
   *
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: redirectUrl,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error);
    } else {
      setMessage('An unexpected error occurred.' as unknown as StripeError);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AddressElement
        options={{ mode: 'billing' }}
        onChange={() => setMessage({})}
      />
      <PaymentElement
        onChange={() => setMessage({})}
        onReady={() => setPaymentElementRdy(true)}
      />

      <div className='flex justify-center mt-4'>
        {isPaymentElementRdy && (
          <button
            onClick={() => {
              // If there's an error message, clear it.
              if (isObjEmpty(message)) {
                setMessage({} as StripeError);
              }
            }}
            disabled={isLoading}
            id='submit'
            className='bg-blue-400 hover:bg-blue-600 font-bold py-2 px-4 rounded'
          >
            Subscribe
          </button>
        )}
      </div>
      <div className='flex justify-center mt-4'>
        <p className='text-red-500'>
          {isObjEmpty(message) 
          && 'message' in message 
          && message.message
            ? message.message
            : ''}
        </p>
      </div>
    </form>
  );
};

export default StripeForm;
