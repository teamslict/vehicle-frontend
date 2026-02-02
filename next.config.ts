import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Robustness: Force direct browser downloading to bypass server blocks
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any HTTPS domain (for external/scraped images)
      },
      {
        protocol: 'http',
        hostname: 'localhost', // For local dev
      },
    ],
  },
};

export default withNextIntl(nextConfig);
