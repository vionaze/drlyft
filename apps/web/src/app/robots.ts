import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	const isLocal = !process.env.NEXT_PUBLIC_SITE_URL;

	if (isLocal) {
		return {
			rules: [{ userAgent: "*", disallow: "/" }],
		};
	}

	return {
		rules: [{ userAgent: "*", allow: "/" }],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL,
	};
}
