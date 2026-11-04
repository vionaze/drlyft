import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCta } from "@/components/blog/ArticleCta";
import { ArticleFaq } from "@/components/blog/ArticleFaq";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { BlogCard } from "@/components/blog/BlogCard";
import { CaseStudyBox } from "@/components/blog/CaseStudyBox";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { branches, site } from "@/data/site";
import {
	formatDate,
	getAllPosts,
	getPost,
	getPostContent,
	getRelatedPosts,
} from "@/lib/blog";
import { renderMarkdown, splitCaseStudy } from "@/lib/markdown";
import { absolute } from "@/lib/seo";
import { waLink } from "@/lib/wa";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = getPost(slug);

	if (!post || post.draft || post.noindex) {
		return { title: "Artikel tidak ditemukan" };
	}

	const image = post.cover ?? "/og.jpg";
	const description = post.description;

	return {
		title: post.title,
		description,
		keywords: post.keywords,
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: {
			type: "article",
			title: post.title,
			description,
			url: `/blog/${post.slug}`,
			publishedTime: post.publishedAt,
			modifiedTime: post.updatedAt,
			authors: [post.author],
			tags: post.tags,
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					alt: post.coverAlt ?? post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description,
			images: [image],
		},
		robots: post.noindex ? { index: false, follow: true } : undefined,
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;
	const post = getPost(slug);
	const content = getPostContent(slug);

	if (!post || !content || post.draft || post.noindex) notFound();

	const { html, toc } = renderMarkdown(content);
	const [beforeCase, afterCase] = splitCaseStudy(html);
	const branch =
		branches.find((item) => item.id === post.branchId) ?? branches[0];
	const related = getRelatedPosts(post, 1)[0];
	const image = absolute(post.cover ?? "/og.jpg");

	const articleSchema = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${absolute(`/blog/${post.slug}`)}#article`,
		headline: post.title,
		description: post.description,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		mainEntityOfPage: absolute(`/blog/${post.slug}`),
		image,
		articleSection: post.category,
		keywords: post.keywords.join(", "),
		author: { "@type": "Organization", name: post.author, url: absolute("/") },
		publisher: { "@id": `${absolute("/")}#organization` },
		contentLocation: post.location
			? { "@type": "Place", name: post.location }
			: undefined,
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Beranda",
				item: absolute("/"),
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Blog",
				item: absolute("/blog"),
			},
			{
				"@type": "ListItem",
				position: 3,
				name: post.title,
				item: absolute(`/blog/${post.slug}`),
			},
		],
	};

	const faqSchema = post.faq.length
		? {
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: post.faq.map((item) => ({
					"@type": "Question",
					name: item.q,
					acceptedAnswer: { "@type": "Answer", text: item.a },
				})),
			}
		: null;

	return (
		<>
			<JsonLd data={articleSchema} />
			<JsonLd data={breadcrumbSchema} />
			{faqSchema ? <JsonLd data={faqSchema} /> : null}

			<article>
				<header className="border-line bg-paper border-b pt-[112px] pb-10 md:pt-[150px] md:pb-14">
					<div className="wrap">
						<nav aria-label="Breadcrumb" className="mono-label text-gray">
							<ol className="flex flex-wrap items-center gap-2">
								<li>
									<a href="/" className="hover:text-ink">
										Beranda
									</a>
								</li>
								<li aria-hidden="true">/</li>
								<li>
									<a href="/blog" className="hover:text-ink">
										Blog
									</a>
								</li>
								<li aria-hidden="true">/</li>
								<li className="text-ink" aria-current="page">
									{post.location ?? post.category}
								</li>
							</ol>
						</nav>

						<div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
							<div>
								<div className="flex flex-wrap items-center gap-3">
									<span className="pill-tag text-ink">
										<span className="pill-dot" />
										{post.category}
									</span>
									{post.location ? (
										<span className="mono text-gray text-[10px] tracking-[0.16em] uppercase">
											{post.location} · Jabodetabek
										</span>
									) : null}
								</div>
								<h1 className="display display-2 text-ink mt-5 max-w-[26ch]">
									{post.title}
								</h1>
								<p className="lede mt-5 max-w-[58ch]">{post.description}</p>
								<div className="mono text-gray mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10.5px] tracking-[0.08em] uppercase">
									<span>{post.author}</span>
									<span aria-hidden="true">·</span>
									<span>{formatDate(post.publishedAt)}</span>
									<span aria-hidden="true">·</span>
									<span>{post.readingMinutes} menit baca</span>
									{post.updatedAt !== post.publishedAt ? (
										<>
											<span aria-hidden="true">·</span>
											<span>Diperbarui {formatDate(post.updatedAt)}</span>
										</>
									) : null}
								</div>
							</div>

							<aside className="border-line bg-paper-2/70 border p-5">
								<p className="mono-label text-gray">Butuh angka?</p>
								<p className="mt-3 text-sm leading-relaxed">
									Harga lift barang baru bisa disusun setelah ukuran void,
									kapasitas, dan akses dicek.
								</p>
								<a
									href={waLink(
										site.whatsappDefault,
										`Halo Dokter Lift, saya baca artikel ${post.location ?? "lift barang"} dan ingin konsultasi survey.`,
									)}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-red mt-5 w-full"
								>
									Konsultasi
									<span className="btn-icon">
										<Icon name="arrow-up-right" />
									</span>
								</a>
							</aside>
						</div>
					</div>
				</header>

				<div className="wrap py-10 md:py-14">
					<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
						<div className="min-w-0">
							<div
								className="article-prose"
								dangerouslySetInnerHTML={{ __html: beforeCase }}
							/>

							{post.caseStudy ? <CaseStudyBox study={post.caseStudy} /> : null}

							{afterCase ? (
								<div
									className="article-prose"
									dangerouslySetInnerHTML={{ __html: afterCase }}
								/>
							) : null}

							<ArticleFaq items={post.faq} />

							<ArticleCta
								location={post.location ?? "Jabodetabek"}
								slug={post.slug}
							/>

							{post.sources.length ? (
								<section className="border-line mt-8 border-t pt-5">
									<p className="mono-label text-gray">Sumber & referensi</p>
									<ul className="mt-3 grid gap-2">
										{post.sources.map((source) => (
											<li key={source.url}>
												<a
													href={source.url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray hover:text-red decoration-line text-sm underline underline-offset-4 transition-colors"
												>
													{source.label}
												</a>
											</li>
										))}
									</ul>
								</section>
							) : null}

							<AuthorBox />

							{related ? (
								<section className="border-line mt-10 border-t pt-6">
									<p className="mono-label text-gray">Baca juga</p>
									<div className="mt-4">
										<BlogCard post={related} />
									</div>
								</section>
							) : null}
						</div>

						<aside className="lg:sticky lg:top-[96px] lg:self-start">
							<div className="bg-ink p-5 text-white">
								<ArticleToc toc={toc} />
							</div>

							<div className="border-line mt-3 border p-5">
								<p className="mono-label text-gray">Cabang terdekat</p>
								<p className="mt-2 text-sm font-semibold">{branch.label}</p>
								<p className="text-gray mt-2 text-sm leading-relaxed">
									{branch.addressLine}
									<br />
									{branch.city} {branch.postalCode}
								</p>
								<a
									href={`tel:${branch.phoneE164}`}
									className="mono text-ink mt-3 flex items-center gap-2 text-xs"
								>
									<Icon name="phone" className="h-3.5 w-3.5" />
									{branch.phoneDisplay}
								</a>
								<a
									href={branch.googleProfileUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="mono-label text-red-deep mt-4 inline-flex items-center gap-2"
								>
									Lihat Maps
									<Icon name="arrow-up-right" className="h-3 w-3" />
								</a>
							</div>

							<p className="mono text-gray mt-4 text-[10px] leading-relaxed">
								*Harga dan ketersediaan mengikuti hasil survey serta penawaran
								tertulis.
							</p>
						</aside>
					</div>
				</div>
			</article>
		</>
	);
}
