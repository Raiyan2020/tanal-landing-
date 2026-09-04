import type { NextConfig } from 'next';

import {
  API_BASE_URL,
  API_HOSTNAME,
  API_ORIGIN,
  API_PROTOCOL,
  BROWSER_API_BASE_PATH,
} from './lib/api-config';

/*
 * Everything below derives the backend host from NEXT_PUBLIC_API_BASE_URL rather
 * than repeating it, so repointing the site at another backend updates the proxy
 * destination, the CSP and the allowed image hosts together. A CSP that lags the
 * base URL is invisible at runtime — the browser just blocks the request.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // Browser calls hit this path and are proxied, keeping them same-origin.
        source: `${BROWSER_API_BASE_PATH}/:path*`,
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'raiyansoft.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: API_PROTOCOL,
        hostname: API_HOSTNAME,
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          // Scripts: self + Next.js inline scripts
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          // Styles: self + inline (Tailwind) + Google Fonts
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          // Fonts: Google Fonts
          "font-src 'self' https://fonts.gstatic.com",
          // Images: self + optimized images + remote CDNs used
          `img-src 'self' data: blob: https://raiyansoft.com ${API_ORIGIN} https://picsum.photos https://maps.googleapis.com https://maps.gstatic.com`,
          // Frames: Google Maps embed only
          "frame-src https://maps.google.com https://www.google.com",
          // Connections: 'self' covers the proxied /api/v1 calls; the API origin
          // is listed for anything that ever calls it directly.
          `connect-src 'self' ${API_ORIGIN}`,
        ].join('; '),
      },
    ];

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Long-lived cache for Next.js immutable static assets.
        //
        // Only safe in production, where chunk filenames are content-hashed.
        // `next dev` serves stable, unhashed names (…/chunks/app/layout.js), so
        // an immutable year-long entry pins a stale bundle in the browser across
        // server restarts — which surfaces as chunks that no longer match the
        // server ("Cannot read properties of undefined (reading 'call')").
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: isProd
              ? 'public, max-age=31536000, immutable'
              : 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      {
        // Cache optimized images for 1 day
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  transpilePackages: ['motion'],
  webpack: (config, { dev }) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
