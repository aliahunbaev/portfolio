import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The archive lives at /index in the browser, but a route folder literally
  // named "index" collides with the framework's output naming on Vercel, so
  // the real route is /archive with a rewrite keeping the public URL.
  async rewrites() {
    return [{ source: "/index", destination: "/archive" }];
  },
};

export default nextConfig;
