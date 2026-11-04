import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { getAllPosts, getCategories } from "@/lib/blog";
import { absolute } from "@/lib/seo";
import { waLink } from "@/lib/wa";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Blog & Panduan Lift Barang",
	description:
		"Panduan lift barang untuk proyek di Jakarta, Tangerang, dan Jabodetabek: kapasitas, ukuran void, proses survey, servis, dan hal yang perlu dicek sebelum membeli.",
	alternates: { canonical: "/blog" },
	openGraph: {
		type: "website",
		title: "Blog & Panduan Lift Barang — Dokter Lift",
		description:
			"Panduan teknis dan lokal seputar lift barang di Jakarta, Tangerang, dan Jabodetabek.",
		url: "/blog",
	},
};

export default function BlogIndexPage() {
	const posts = getAllPosts();
	const categories = getCategories();

	const schema = {
		"@context": "https://schema.org",
		"@type": "Blog",
		"@id": `${absolute("/blog")}#blog`,
		name: `Blog ${site.name}`,
		url: absolute("/blog"),
		description:
			"Panduan lift barang untuk proyek di Jakarta, Tangerang, dan Jabodetabek.",
		publisher: { "@id": `${absolute("/")}#organization` },
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.title,
			url: absolute(`/blog/${post.slug}`),
			datePublished: post.publishedAt,
			dateModified: post.updatedAt,
		})),
	};

	return (
		<>
			<JsonLd data={schema} />

			<header className="border-line bg-paper border-b pt-[112px] pb-12 md:pt-[150px] md:pb-16">
				<div className="wrap">
					<nav aria-label="Breadcrumb" className="mono-label text-gray">
						<ol className="flex items-center gap-2">
							<li>
								<a href="/" className="hover:text-ink">
									Beranda
								</a>
							</li>
							<li aria-hidden="true">/</li>
							<li className="text-ink" aria-current="page">
								Blog
							</li>
						</ol>
					</nav>

					<div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
						<div>
							<span className="pill-tag text-ink">
								<span className="pill-dot" />
								Jurnal & panduan
							</span>
							<h1 className="display display-2 text-ink mt-6 max-w-[15ch]">
								Lift barang,
								<br />
								tanpa menebak.
							</h1>
						</div>
						<div>
							<p className="lede max-w-[46ch]">
								Catatan teknis untuk pemilik gudang, pabrik, toko, dan gedung di
								Jakarta, Tangerang, serta Jabodetabek. Ditulis dari pertanyaan
								yang benar-benar muncul sebelum lift dipasang.
							</p>
							<a
								href={waLink(
									site.whatsappDefault,
									"Halo Dokter Lift, saya ingin tanya soal lift barang di Jabodetabek.",
								)}
								target="_blank"
								rel="noopener noreferrer"
								className="mono-label text-red-deep mt-5 inline-flex items-center gap-2"
							>
								Tanya tim
								<Icon name="arrow-up-right" className="h-3.5 w-3.5" />
							</a>
						</div>
					</div>
				</div>
			</header>

			<section className="section">
				<div className="wrap">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div>
							<p className="mono-label text-gray">Artikel</p>
							<h2 className="display display-3 text-ink mt-3">
								Mulai dari masalah Anda.
							</h2>
						</div>
						<p className="mono text-gray text-[10.5px] tracking-[0.12em] uppercase">
							{posts.length} panduan · {categories.length} kategori
						</p>
					</div>

					<div className="mt-8 grid gap-3 md:grid-cols-2">
						{posts.map((post, index) => (
							<BlogCard key={post.slug} post={post} index={index} />
						))}
					</div>

					<div className="border-line mt-10 border-t pt-6">
						<p className="mono-label text-gray">Kategori</p>
						<ul className="mt-3 flex flex-wrap gap-2">
							{categories.map((category) => (
								<li
									key={category.name}
									className="border-line text-gray rounded-full border px-3 py-1.5 text-xs"
								>
									{category.name}{" "}
									<span className="text-gray">({category.count})</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}
