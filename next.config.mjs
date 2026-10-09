/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // 2026-10-09: one image, no optimizer needed. Avoids transformation billing.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
