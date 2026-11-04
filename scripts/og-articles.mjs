import fs from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const outDir = "apps/web/public/og";

const items = [
	{
		slug: "lift-barang-jakarta-jabodetabek",
		kicker: "Jakarta · Jabodetabek",
		title: "Lift barang<br/>Jakarta.",
		sub: "Panduan proyek, kapasitas & survey",
	},
	{
		slug: "lift-barang-tangerang-jabodetabek",
		kicker: "Tangerang · Jabodetabek",
		title: "Lift barang<br/>Tangerang.",
		sub: "Gudang, pabrik & bongkar-muat",
	},
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1,
});

await page.goto(`${base}/blog`, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);

for (const item of items) {
	await page.evaluate((data) => {
		document.body.innerHTML = `
      <div style="position:fixed;inset:0;background:#0a0b0a;color:#fbfaf7;padding:54px 64px;display:flex;flex-direction:column;justify-content:space-between;font-family:var(--font-archivo),sans-serif;overflow:hidden">
        <div style="position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);background-size:64px 64px"></div>
        <div style="position:absolute;right:-120px;top:-160px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,#e10600 0%,transparent 65%);opacity:.28"></div>
        <div style="position:relative;display:flex;justify-content:space-between;align-items:flex-start">
          <img src="/brand/logo-dark.png" alt="" style="height:58px;width:auto" />
          <div style="font-family:var(--font-plex-mono),monospace;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.65);text-align:right">${data.kicker}</div>
        </div>
        <div style="position:relative">
          <div style="font-family:var(--font-plex-mono),monospace;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#e10600;margin-bottom:18px">Jurnal Dokter Lift</div>
          <div style="font-size:88px;line-height:.9;font-weight:700;letter-spacing:-.035em;text-transform:uppercase;font-stretch:114%">${data.title}</div>
          <div style="margin-top:24px;font-family:var(--font-plex-mono),monospace;font-size:18px;letter-spacing:.04em;color:rgba(255,255,255,.8)">${data.sub}</div>
        </div>
        <div style="position:relative;display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.18);padding-top:18px;font-family:var(--font-plex-mono),monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6)">
          <span>Dokter Lift · 2 cabang · 20+ tahun</span><span>Diukur dulu, baru dibuat</span>
        </div>
      </div>`;
		document.body.style.margin = "0";
	}, item);

	await page.waitForTimeout(350);
	await page.screenshot({
		path: `${outDir}/${item.slug}.jpg`,
		type: "jpeg",
		quality: 92,
	});
	console.log(`OG: ${outDir}/${item.slug}.jpg`);
}

await browser.close();
