import { marked } from "marked";

export type TocItem = {
	id: string;
	text: string;
	level: 2 | 3;
};

function slugify(value: string): string {
	return value
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

function stripTags(value: string): string {
	return value
		.replace(/<[^>]+>/g, "")
		.replace(/&amp;/g, "&")
		.trim();
}

export function renderMarkdown(source: string): {
	html: string;
	toc: TocItem[];
} {
	// Konten berasal dari repo, tetapi tetap tolak HTML berbahaya.
	if (/<script\b|<iframe\b|on\w+\s*=\s*["']?|javascript:/i.test(source)) {
		throw new Error("Markdown mengandung HTML/JS yang tidak diizinkan.");
	}

	const parsed = marked.parse(source, { gfm: true, async: false }) as string;
	const toc: TocItem[] = [];
	const used = new Map<string, number>();

	const withTables = parsed
		.replace(
			/<table>/g,
			'<div class="table-scroll" tabindex="0" role="region" aria-label="Tabel data"><table>',
		)
		.replace(/<\/table>/g, "</table></div>");

	const html = withTables.replace(
		/<h([23])>(.*?)<\/h\1>/g,
		(_match, level: string, inner: string) => {
			const text = stripTags(inner);
			const base = slugify(text) || "bagian";
			const count = (used.get(base) ?? 0) + 1;
			used.set(base, count);
			const id = count > 1 ? `${base}-${count}` : base;
			toc.push({ id, text, level: Number(level) as 2 | 3 });
			return `<h${level} id="${id}">${inner}</h${level}>`;
		},
	);

	return { html, toc };
}

export function splitCaseStudy(html: string): [string, string] {
	const marker = "<!--CASE_STUDY-->";
	const index = html.indexOf(marker);
	if (index === -1) return [html, ""];
	return [html.slice(0, index), html.slice(index + marker.length)];
}
