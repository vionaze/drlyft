import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const dir = path.resolve(process.argv[2] ?? "apps/web/out");
const problems = [];
const placeholders = [];

if (!fs.existsSync(dir)) {
	console.error(`Build tidak ditemukan: ${dir}. Jalankan pnpm build.`);
	process.exit(1);
}

const files = [];
const walk = (current) => {
	for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
		const full = path.join(current, entry.name);
		if (entry.isDirectory()) walk(full);
		else files.push(full);
	}
};
walk(dir);

const htmlFiles = files.filter((file) => file.endsWith(".html"));
const exists = (target) => {
	const clean = target.split("#")[0].split("?")[0];
	if (!clean) return true;
	const rel = clean.replace(/^\//, "");
	const candidates = [
		path.join(dir, rel),
		path.join(dir, `${rel}.html`),
		path.join(dir, rel, "index.html"),
	];
	return candidates.some((candidate) => fs.existsSync(candidate));
};

for (const file of htmlFiles) {
	const html = fs.readFileSync(file, "utf8");
	const name = path.relative(dir, file);

	const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "";
	const description =
		html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
	const canonical =
		html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
	const ogImage =
		html.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? "";
	const h1s = (html.match(/<h1[\s>]/g) ?? []).length;

	if (!title) problems.push(`${name}: title kosong`);
	if (title.length > 65)
		problems.push(`${name}: title ${title.length} karakter`);
	if (!description) problems.push(`${name}: description kosong`);
	if (description.length > 165)
		problems.push(`${name}: description ${description.length} karakter`);
	if (!canonical) problems.push(`${name}: canonical kosong`);
	if (h1s !== 1) problems.push(`${name}: ${h1s} h1`);
	if (ogImage && !exists(ogImage.replace(/^https?:\/\/[^/]+/, ""))) {
		problems.push(`${name}: og:image tidak ada (${ogImage})`);
	}

	for (const match of html.matchAll(/href="([^"]+)"/g)) {
		const href = match[1];
		if (
			!href ||
			href.startsWith("http") ||
			href.startsWith("mailto:") ||
			href.startsWith("tel:")
		)
			continue;
		if (href.startsWith("#")) continue;
		if (!exists(href)) problems.push(`${name}: link rusak ${href}`);
	}

	for (const match of html.matchAll(
		/<script type="application\/ld\+json">(.*?)<\/script>/gs,
	)) {
		try {
			JSON.parse(match[1].replace(/\\u003c/g, "<"));
		} catch {
			problems.push(`${name}: JSON-LD tidak valid`);
		}
	}

	const text = html
		.replace(/<script[\s\S]*?<\/script>/g, " ")
		.replace(/<[^>]+>/g, " ");
	if (/\[ISI:/.test(text)) placeholders.push(`${name}: masih ada [ISI: ...]`);
	if (/klinik estetika|kosmetik|medical clinic/i.test(text)) {
		problems.push(`${name}: sisa konten industri lama`);
	}
	if (/1234567890/.test(text))
		placeholders.push(`${name}: nomor WhatsApp masih contoh`);
}

const sitemap = path.join(dir, "sitemap.xml");
if (fs.existsSync(sitemap)) {
	const xml = fs.readFileSync(sitemap, "utf8");
	for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
		const url = new URL(match[1]);
		if (!exists(url.pathname))
			problems.push(`sitemap: rute tidak ada ${url.pathname}`);
	}
} else {
	problems.push("sitemap.xml tidak ada");
}

const jsFiles = files.filter((file) => file.endsWith(".js"));
const jsGzip = jsFiles.reduce(
	(total, file) => total + zlib.gzipSync(fs.readFileSync(file)).length,
	0,
);

console.log(
	`HTML: ${htmlFiles.length} · file: ${files.length} · JS gzip: ${(jsGzip / 1024).toFixed(1)} KB`,
);

if (placeholders.length) {
	console.log(`\nPlaceholder (${placeholders.length}):`);
	for (const item of [...new Set(placeholders)]) console.log(`- ${item}`);
}

if (problems.length) {
	console.log(`\nMasalah (${problems.length}):`);
	for (const item of [...new Set(problems)]) console.log(`- ${item}`);
	process.exitCode = 1;
} else {
	console.log("\nOK — tidak ada masalah struktural.");
}
