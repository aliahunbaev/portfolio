import type { NextConfig } from "next";

// Note: the archive route is /archive (nav label "Index") because both a
// route folder named "index" and the public path /index fight the
// platform — Vercel normalizes /index to / before routing.
const nextConfig: NextConfig = {
  // The content loader reads markdown and image headers from public/ at
  // build time, which makes Vercel's file tracer bundle the whole media
  // library (~265MB) into every serverless function. Those files are
  // served statically; the functions never need them.
  outputFileTracingExcludes: {
    "/*": ["./public/**"],
  },
};

export default nextConfig;
