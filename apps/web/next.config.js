/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'beginwrite-minio-1'],
  },
};

module.exports = nextConfig;
