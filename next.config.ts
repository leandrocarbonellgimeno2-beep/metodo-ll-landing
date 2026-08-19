import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "metodo-ll-landing.vercel.app",
          },
        ],
        destination: "https://lucas-metodoll-by-solutech.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
