import { Icon } from "@/components/Icon";
import type { TocItem } from "@/lib/markdown";

export function ArticleToc({ toc }: { toc: TocItem[] }) {
	const items = toc.filter((item) => item.level === 2);
	if (!items.length) return null;

	return (
		<nav aria-label="Daftar isi" className="article-toc">
			<p className="mono-label text-white/60">Di artikel ini</p>
			<ol className="mt-4 grid gap-2.5">
				{items.map((item, index) => (
					<li key={item.id} className="flex gap-3">
						<span className="mono text-[#ff6b5e] mt-0.5 text-[10px]">
							0{index + 1}
						</span>
						<a
							href={`#${item.id}`}
							className="text-sm leading-snug text-white/65 transition-colors hover:text-white"
						>
							{item.text}
						</a>
					</li>
				))}
			</ol>
			<a
				href="/#survey"
				className="mono-label text-[#ff6b5e] mt-6 inline-flex items-center gap-2"
			>
				Minta survey
				<Icon name="arrow-up-right" className="h-3 w-3" />
			</a>
		</nav>
	);
}
