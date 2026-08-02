import type { NextConfig } from "next";

// Note: the archive route is /archive (nav label "Index") because both a
// route folder named "index" and the public path /index fight the
// platform — Vercel normalizes /index to / before routing.
const nextConfig: NextConfig = {};

export default nextConfig;
