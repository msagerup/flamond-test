'use server';

import Stripe from 'stripe';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET);

export async function createSubscription(
  priceId: string | Stripe.Price | null | undefined,
  customerId: string
) {
  try {
    const subscription: Stripe.Subscription = await stripe.subscriptions.create(
      {
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      }
    );

    return {
      subscriptionId: subscription.id,
      // @ts-ignore
      clientSecret: subscription?.latest_invoice?.payment_intent?.client_secret,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error('Could not create subscription', error);
  }
}

export async function getProducts() {
  try {
    const products: Stripe.ApiList<Stripe.Product> = await stripe.products.list(
      {
        limit: 3,
      }
    );

    return products.data;
  } catch (error) {
    throw new Error('Could not get products');
  }
}

export interface ProductData {
  id: string;
  name: string;
  images: string[];
  metadata: Stripe.Metadata;
  description: string;
  default_price: Stripe.Price;
}

export async function getProductByID(id: string) {
  try {
    const product: Stripe.Product = await stripe.products.retrieve(id);
    const result = {
      id: product.id,
      name: product.name,
      images: product.images,
      metadata: product.metadata,
      description: product.description,
      default_price: product.default_price,
    };

    return result as ProductData;
  } catch (error) {
    console.error(error);
    return {} as ProductData;
  }
}
