/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  output: 'export',
  trailingSlash: true,
  basePath: '/dataodssey',
  assetPrefix: '/dataodssey/',
};
module.exports = nextConfig;
