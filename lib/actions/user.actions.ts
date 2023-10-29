'use server';
import Stripe from 'stripe';
import { CreateSubscriptionResult, ProductData } from '../types';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET);

/**
 * Generates Stripe client & subscription secret keys from Stripe user id and product price id params.
 *
 * @param {string | Stripe.Price | null | undefined} priceId -  Id from Stripe product. This
 *   value is used to generate a Stripe subscription to the item.
 *
 * @param {string} customerId  - Id from Stripe customer. This value is used to link the customer to
 *    product and subscription.
 *
 * @returns {Promise<CreateSubscriptionResult>} - The result of the subscription creation, containing the subscription ID
 *    and the client secret.
 *
 */
export async function createSubscription(
  priceId: string | Stripe.Price | null | undefined,
  customerId: string
): Promise<CreateSubscriptionResult> {
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
      subscriptionId: subscription?.id,
      // @ts-ignore
      clientSecret: subscription?.latest_invoice?.payment_intent?.client_secret,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error('Could not create subscription');
  }
}

/**
 * Collects Stripe product details from Stripe product id.
 *
 * @returns {Promise<Stripe.Product[]>} - Array of Stripe products.
 *
 */
export async function getProducts(): Promise<Stripe.Product[]> {
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

/**
 * Collects Stripe product details from Stripe product id.
 *
 * @param {string} id - Stripe product price ID.
 * @returns {ProductData} - Stripe product details.
 *
 */
export async function getProductByID(id: string): Promise<ProductData> {
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

// Getting the data here, is a bit silly. But we are doing this  becuase we have no DB connected.
// This is  actually the  2 time we get this data. The first time was in the webhooks. (See comment in webhook)

/**
 * Get status on order from Stripe.
 *
 * @param {string} intent - Intent id from Stripe.

 * @returns {Object} - Returns invoice if successful, else returns error message
 *
 */
export const getStripeStatus = async (intent: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(intent);

    if (paymentIntent.last_payment_error) {
    }
    // Transaction did not go through
    if (paymentIntent.last_payment_error) {
      return {
        invoice: paymentIntent.hosted_invoice_url,
        status: paymentIntent.last_payment_error.message,
      };
    }

    // All good
    if (paymentIntent.invoice) {
      const invoiceResult = await stripe.invoices.retrieve(
        paymentIntent.invoice
      );
      return {
        invoice: invoiceResult.hosted_invoice_url,
        status: paymentIntent.status,
      };
    }

    return paymentIntent;
  } catch (error) {
    throw new Error('Could not get info');
  }
};
