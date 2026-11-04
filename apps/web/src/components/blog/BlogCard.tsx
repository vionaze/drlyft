import { Icon } from "@/components/Icon";
import { formatDate, type PostMeta } from "@/lib/blog";

export function BlogCard({
	post,
	index = 0,
}: {
	post: PostMeta;
	index?: number;
}) {
	return (
		<a
			href={`/blog/${post.slug}`}
			className="blog-card card-tech bg-paper/80 group flex flex-col justify-between p-6 md:p-7"
		>
			<div>
				<div className="flex items-center justify-between gap-4">
					<span className="mono text-red-deep text-[10px] tracking-[0.18em] uppercase">
						{post.category}
					</span>
					<span className="mono text-gray text-[10px] tracking-[0.18em]">
						0{index + 1}
					</span>
				</div>
				<h3 className="display display-3 text-ink mt-6">{post.title}</h3>
				<p className="text-gray mt-4 max-w-[42ch] text-sm leading-relaxed">
					{post.description}
				</p>
			</div>

			<div className="border-line mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
				<span className="mono text-gray text-[10.5px] tracking-[0.08em] uppercase">
					{post.location ? `${post.location} · ` : ""}
					{formatDate(post.publishedAt)} · {post.readingMinutes} menit
				</span>
				<span className="text-ink flex items-center gap-2 text-xs font-medium">
					Baca
					<span className="border-line group-hover:border-red group-hover:bg-red grid h-8 w-8 place-items-center border transition-colors group-hover:text-white">
						<Icon name="arrow-up-right" className="h-3.5 w-3.5" />
					</span>
				</span>
			</div>
		</a>
	);
}
