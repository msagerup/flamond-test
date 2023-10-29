# Flamond - Stripe subscription test.

 Built with Next.js, allowing users to browse and purchase various subscription products. Stripe API is used for payment processing and subscription management.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.

## .env.local

1. NEXT_PUBLIC_STRIPE_CLIENT_SECRET=
2. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

[Get these values from your Stripe dashboard](https://dashboard.stripe.com/login)


## next.config.js or next.config.ts

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products/',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
    ],
  },
};

module.exports = nextConfig
```

## Usage
1. Create your subscription based products in the [Stripe dashboard - Products](https://dashboard.stripe.com/products).
2. For demonstration purposes, I've hardcoded the user id id.  This value is taken from [Stripe dashboard - Costumers](https://dashboard.stripe.com/customers). 
* The format of the id looks like this: `cus_Lti813D6fEdwRV`.
* Replace `customerId` variable in the [StripeLoader](./src/index.tsx#L10) component with your costumer id.
3. Start the development server using `npm run dev`.
4. Open the application in your browser at `http://localhost:3000`.






## License

This project is licensed under the MIT License.