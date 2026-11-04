import { Icon } from "@/components/Icon";
import type { FaqItem } from "@/lib/blog";

export function ArticleFaq({ items }: { items: FaqItem[] }) {
	if (!items.length) return null;

	return (
		<section
			className="border-line mt-12 border-t pt-8"
			aria-labelledby="faq-artikel"
		>
			<p className="mono-label text-gray">Pertanyaan umum</p>
			<h2 id="faq-artikel" className="display display-3 text-ink mt-3">
				Yang sering ditanyakan.
			</h2>
			<div className="mt-6 grid gap-2">
				{items.map((item) => (
					<details
						key={item.q}
						className="article-faq border-line bg-paper/60 border"
					>
						<summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-medium">
							{item.q}
							<span className="border-line grid h-7 w-7 shrink-0 place-items-center border">
								<Icon name="plus" className="h-3.5 w-3.5" />
							</span>
						</summary>
						<p className="text-gray border-line border-t px-4 py-4 text-sm leading-relaxed">
							{item.a}
						</p>
					</details>
				))}
			</div>
		</section>
	);
}
