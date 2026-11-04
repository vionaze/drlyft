import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const routes = [
	"/",
	"/disclaimer",
	"/kebijakan-privasi",
	"/blog",
	"/blog/lift-barang-jakarta-jabodetabek",
	"/blog/lift-barang-tangerang-jabodetabek",
];

const browser = await chromium.launch();
let failures = 0;

for (const width of [1440, 390]) {
	const context = await browser.newContext({
		viewport: { width, height: 900 },
		locale: "id-ID",
	});
	const page = await context.newPage();

	for (const route of routes) {
		await page.goto(`${base}${route}`, {
			waitUntil: "networkidle",
			timeout: 60000,
		});
		await page.waitForTimeout(500);
		const results = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
			.analyze();

		const blocking = results.violations.filter(
			(violation) =>
				violation.impact === "critical" || violation.impact === "serious",
		);

		if (blocking.length) {
			failures += blocking.length;
			console.log(`\n${route} @${width}px — ${blocking.length} pelanggaran:`);
			for (const violation of blocking) {
				console.log(
					`- [${violation.impact}] ${violation.id}: ${violation.help}`,
				);
				for (const node of violation.nodes.slice(0, 4)) {
					console.log(`    ${node.target.join(" ")}`);
					if (node.failureSummary)
						console.log(`    ${node.failureSummary.split("\n")[1] ?? ""}`);
				}
			}
		} else {
			console.log(`${route} @${width}px: bersih`);
		}
	}

	await context.close();
}

await browser.close();
process.exitCode = failures ? 1 : 0;
