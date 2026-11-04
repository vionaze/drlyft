import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type FaqItem = { q: string; a: string };

export type CaseStudy = {
	title: string;
	location: string;
	building: string;
	capacity: string;
	challenge: string;
	solution: string;
	result: string;
	illustrative?: boolean;
};

export type PostMeta = {
	slug: string;
	title: string;
	description: string;
	publishedAt: string;
	updatedAt: string;
	author: string;
	reviewer?: string;
	category: string;
	tags: string[];
	keywords: string[];
	location?: string;
	branchId?: string;
	cover?: string;
	coverAlt?: string;
	featured?: boolean;
	readingMinutes: number;
	draft: boolean;
	noindex: boolean;
	caseStudy?: CaseStudy;
	faq: FaqItem[];
	sources: { label: string; url: string }[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPosts(): PostMeta[] {
	if (!fs.existsSync(BLOG_DIR)) return [];

	return fs
		.readdirSync(BLOG_DIR)
		.filter((file) => file.endsWith(".md"))
		.map((file) => {
			const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
			const { data, content } = matter(raw);
			const slug = String(data.slug ?? file.replace(/\.md$/, ""));

			return {
				slug,
				title: String(data.title ?? ""),
				description: String(data.description ?? ""),
				publishedAt: String(data.publishedAt ?? ""),
				updatedAt: String(data.updatedAt ?? data.publishedAt ?? ""),
				author: String(data.author ?? "Tim Dokter Lift"),
				reviewer: data.reviewer ? String(data.reviewer) : undefined,
				category: String(data.category ?? "Panduan"),
				tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
				keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
				location: data.location ? String(data.location) : undefined,
				branchId: data.branchId ? String(data.branchId) : undefined,
				cover: data.cover ? String(data.cover) : undefined,
				coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
				featured: Boolean(data.featured),
				readingMinutes: Math.max(
					1,
					Math.round(content.split(/\s+/).length / 200),
				),
				draft: Boolean(data.draft),
				noindex: Boolean(data.noindex),
				caseStudy: data.caseStudy as CaseStudy | undefined,
				faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : [],
				sources: Array.isArray(data.sources)
					? (data.sources as { label: string; url: string }[])
					: [],
			};
		})
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		);
}

let postsCache: PostMeta[] | null = null;

export function getAllPosts(includeDrafts = false): PostMeta[] {
	if (!postsCache) postsCache = readPosts();
	return includeDrafts
		? postsCache
		: postsCache.filter((post) => !post.draft && !post.noindex);
}

export function getPost(slug: string): PostMeta | undefined {
	return getAllPosts(true).find((post) => post.slug === slug);
}

export function getPostContent(slug: string): string | undefined {
	if (!fs.existsSync(BLOG_DIR)) return undefined;
	const file = fs
		.readdirSync(BLOG_DIR)
		.find((candidate) => candidate.endsWith(".md") && candidate.includes(slug));
	if (!file) return undefined;
	return matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8")).content;
}

export function getRelatedPosts(post: PostMeta, limit = 1): PostMeta[] {
	return getAllPosts()
		.filter((candidate) => candidate.slug !== post.slug)
		.sort((a, b) => {
			const aScore = a.category === post.category ? 1 : 0;
			const bScore = b.category === post.category ? 1 : 0;
			return bScore - aScore;
		})
		.slice(0, limit);
}

export function getCategories(): { name: string; count: number }[] {
	const counts = new Map<string, number>();
	for (const post of getAllPosts()) {
		counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
	}
	return [...counts.entries()]
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);
}

export function formatDate(value: string): string {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "Asia/Jakarta",
	}).format(date);
}

export function readingTime(markdown: string): number {
	const words = markdown
		.replace(/<!--.*?-->/g, " ")
		.replace(/<[^>]+>/g, " ")
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}
