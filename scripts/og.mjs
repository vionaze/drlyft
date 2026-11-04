import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3001";
const out = process.argv[3] ?? "apps/web/public/og.jpg";

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1,
});

await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);

await page.evaluate(() => {
	document.body.innerHTML = `
    <div style="position:fixed;inset:0;background:#0a0b0a;color:#fbfaf7;padding:56px 64px;display:flex;flex-direction:column;justify-content:space-between;font-family:var(--font-archivo),sans-serif;overflow:hidden">
      <div style="position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);background-size:64px 64px"></div>
      <div style="position:absolute;right:-120px;top:-160px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,#e10600 0%,transparent 65%);opacity:.25"></div>
      <div style="position:relative;display:flex;justify-content:space-between;align-items:flex-start">
        <img src="/brand/logo-dark.png" alt="" style="height:58px;width:auto" />
        <div style="font-family:var(--font-plex-mono),monospace;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.6);text-align:right">Lift barang<br/>Indonesia</div>
      </div>
      <div style="position:relative">
        <div style="font-size:92px;line-height:.88;font-weight:700;letter-spacing:-.035em;text-transform:uppercase;font-stretch:114%">Lift barang<br/><span style="color:#e10600">yang bekerja.</span></div>
        <div style="margin-top:26px;display:flex;gap:18px;align-items:center;font-family:var(--font-plex-mono),monospace;font-size:18px;letter-spacing:.08em">
          <span style="background:#e10600;color:#fff;padding:10px 16px;font-weight:500">500 KG — 10 TON</span>
          <span style="color:rgba(255,255,255,.75)">Rancang-bangun · Instalasi · Servis</span>
        </div>
      </div>
      <div style="position:relative;display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.18);padding-top:18px;font-family:var(--font-plex-mono),monospace;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6)">
        <span>Dokter Lift · 2 cabang · 20+ tahun</span><span>Diukur dulu, baru dibuat</span>
      </div>
    </div>`;
	document.body.style.margin = "0";
});

await page.waitForTimeout(400);
await page.screenshot({ path: out, type: "jpeg", quality: 92 });
await browser.close();
console.log(`OG image: ${out}`);
