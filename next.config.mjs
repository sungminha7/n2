/** @type {import('next').NextConfig */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "40mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/product",
        destination: "/product/catalog/1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
