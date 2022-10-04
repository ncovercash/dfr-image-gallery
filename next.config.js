/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/Gallery",
  images: { domains: ["placekitten.com"] },
};

module.exports = nextConfig;
