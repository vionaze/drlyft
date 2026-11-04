import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: process.env.NEXT_STATIC_EXPORT === "1" ? "export" : undefined,
	images: { unoptimized: true },
	allowedDevOrigins: ["127.0.0.1", "localhost"],
	typedRoutes: true,
	reactCompiler: process.env.NODE_ENV === "production",
};

export default nextConfig;
