/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  typescript: {
    // Ignore TypeScript errors during builds
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
