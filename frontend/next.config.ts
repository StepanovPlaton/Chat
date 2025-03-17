const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          `${process.env.BACKEND_API_PROTOCOL}://` +
          `${process.env.BACKEND_API_DOMAIN}:${process.env.BACKEND_API_PORT}/:path*`,
      },
    ];
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: process.env.NEXT_PUBLIC_BASE_PROTOCOL,
  //       hostname: process.env.NEXT_PUBLIC_BASE_DOMAIN,
  //       port: process.env.NEXT_PUBLIC_BASE_PORT,
  //     },
  //   ],
  // },
  devIndicators: false,
  output: "standalone",
};

export default nextConfig;
