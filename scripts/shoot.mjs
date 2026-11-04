import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:3001";
const outDir = process.argv[3] ?? ".qa/screens";
fs.mkdirSync(outDir, { recursive: true });

const routes = [
	{ name: "home", path: "/" },
	{ name: "disclaimer", path: "/disclaimer" },
	{ name: "privasi", path: "/kebijakan-privasi" },
];

const sections = [
	"masalah",
	"layanan",
	"tipe",
	"proses",
	"sektor",
	"standar",
	"cabang",
	"faq",
	"survey",
];

const viewports = [
	{ tag: "desktop", width: 1440, height: 960 },
	{ tag: "laptop", width: 1280, height: 900 },
	{ tag: "tablet", width: 768, height: 1024 },
	{ tag: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
const errors = [];

for (const viewport of viewports) {
	const context = await browser.newContext({
		viewport: { width: viewport.width, height: viewport.height },
		locale: "id-ID",
		deviceScaleFactor: 1,
	});
	const page = await context.newPage();

	page.on("console", (message) => {
		if (message.type() === "error") errors.push(`[console] ${message.text()}`);
	});
	page.on("pageerror", (error) => errors.push(`[pageerror] ${error.message}`));

	for (const route of routes) {
		await page.goto(`${base}${route.path}`, {
			waitUntil: "networkidle",
			timeout: 60000,
		});
		await page.evaluate(async () => {
			const step = window.innerHeight * 0.75;
			for (let y = 0; y < document.body.scrollHeight; y += step) {
				window.scrollTo(0, y);
				await new Promise((resolve) => setTimeout(resolve, 60));
			}
			window.scrollTo(0, 0);
		});
		await page.evaluate(() => document.documentElement.classList.remove("js"));
		await page.waitForTimeout(900);
		await page.screenshot({
			path: path.join(outDir, `${route.name}-${viewport.tag}.png`),
			fullPage: route.name !== "home" || viewport.tag === "mobile",
		});
	}

	if (viewport.tag === "desktop" || viewport.tag === "mobile") {
		await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
		for (const id of sections) {
			const section = page.locator(`#${id}`);
			if ((await section.count()) === 0) continue;
			await section.scrollIntoViewIfNeeded();
			await page.waitForTimeout(700);
			await section.screenshot({
				path: path.join(outDir, `section-${id}-${viewport.tag}.png`),
			});
		}
	}

	const overflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	if (overflow > 1) errors.push(`[overflow] ${viewport.tag}: ${overflow}px`);

	await context.close();
}

await browser.close();

if (errors.length) {
	console.log("MASALAH:");
	for (const error of errors) console.log("-", error);
	process.exitCode = 1;
} else {
	console.log(`OK — screenshot tersimpan di ${outDir}`);
}
