// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,

//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "https://notehub-api.goit.study/:path*",
//       },
//     ];
//   },

//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "ac.goit.global",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://notehub-api.goit.study/api/:path*", // ✅ проксі
      },
    ];
  },
};

export default nextConfig;
