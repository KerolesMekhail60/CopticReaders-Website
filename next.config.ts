import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, 
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kerolesmas-001-site1.qtempurl.com',
        pathname: '/Uploads/**',
      },
    ],
  },

  // Webpack configuration (used for production builds)
  // Note: Turbopack is used in dev mode (--turbopack flag), so this config applies to production builds
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }

    return config;
  },
};

export default withNextIntl(nextConfig);
