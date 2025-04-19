/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable proper caching
  experimental: {
    // Ensure stable caching
    typedRoutes: true,
    serverActions: true
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;