import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	const posts = getAllPosts();

	return [
		{
			url: `${SITE_URL}/`,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		...posts.map((post) => ({
			url: `${SITE_URL}/blog/${post.slug}`,
			lastModified: new Date(post.updatedAt || post.publishedAt),
			changeFrequency: "monthly" as const,
			priority: post.featured ? 0.7 : 0.6,
		})),
		{
			url: `${SITE_URL}/disclaimer`,
			lastModified,
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${SITE_URL}/kebijakan-privasi`,
			lastModified,
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];
}
