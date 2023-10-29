import Stripe from 'stripe';

export type ProductData = {
  id: string;
  name: string;
  images: string[];
  metadata: Stripe.Metadata;
  description: string;
  default_price: Stripe.Price;
};

export type CreateSubscriptionResult = {
  subscriptionId: string | undefined;
  clientSecret: string | undefined;
};
