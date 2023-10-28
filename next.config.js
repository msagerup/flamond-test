/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
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
