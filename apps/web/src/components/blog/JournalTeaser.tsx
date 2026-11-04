import { BlogCard } from "@/components/blog/BlogCard";
import { Icon } from "@/components/Icon";
import type { PostMeta } from "@/lib/blog";

export function JournalTeaser({ posts }: { posts: PostMeta[] }) {
	if (!posts.length) return null;

	return (
		<section className="section">
			<div className="wrap">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<div>
						<p className="mono-label text-gray">Jurnal</p>
						<h2 className="display display-2 text-ink mt-4">
							Panduan untuk
							<br />
							proyek nyata.
						</h2>
					</div>
					<div className="max-w-[38ch]">
						<p className="text-gray text-sm leading-relaxed">
							Catatan teknis dan panduan lokal seputar lift barang di
							Jabodetabek — ditulis dari pertanyaan yang paling sering kami
							dengar di lapangan.
						</p>
						<a
							href="/blog"
							className="mono-label text-ink mt-4 inline-flex items-center gap-2"
						>
							Semua artikel
							<Icon name="arrow-right" className="h-3.5 w-3.5" />
						</a>
					</div>
				</div>

				<div className="mt-8 grid gap-3 md:grid-cols-2">
					{posts.slice(0, 2).map((post, index) => (
						<BlogCard key={post.slug} post={post} index={index} />
					))}
				</div>
			</div>
		</section>
	);
}
