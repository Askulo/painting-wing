/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.bitsindri.ac.in'],
  },
  reactStrictMode: true,
  // This will help maintain audio context across route changes
  experimental: {
    scrollRestoration: true
  }
};

export default nextConfig;