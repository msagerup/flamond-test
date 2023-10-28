// import { productOrderFormData } from '@/lib/actions/form.actions';
"use client"

import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

const StripeForm = () => {
  const [message, setMessage] = useState<{error: string} | {}>();
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/thanks",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  if(message && 'error' in message) return <p>{message.error}</p>

  return (
    <form onSubmit={handleSubmit}>
      <AddressElement options={{ mode: 'billing' }}  />
      <PaymentElement />
     
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
    </form>
  );
};

export default StripeForm;
