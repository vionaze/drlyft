import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "apps/web/out");
const port = Number(process.env.PORT ?? 4173);

const types = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".mjs": "text/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".svg": "image/svg+xml",
	".png": "image/png",
	".webp": "image/webp",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".ico": "image/x-icon",
	".woff2": "font/woff2",
	".txt": "text/plain; charset=utf-8",
	".xml": "application/xml; charset=utf-8",
};

export function createServer(directory = root) {
	return http.createServer((request, response) => {
		try {
			const url = new URL(request.url ?? "/", "http://localhost");
			let pathname = decodeURIComponent(url.pathname);
			if (pathname.endsWith("/")) pathname += "index.html";

			let file = path.join(directory, pathname);
			if (!file.startsWith(directory)) {
				response.writeHead(403).end("Forbidden");
				return;
			}

			if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
				const index = path.join(file, "index.html");
				if (fs.existsSync(index)) {
					file = index;
				} else if (fs.existsSync(`${file}.html`)) {
					file = `${file}.html`;
				} else {
					file = index;
				}
			}

			if (!fs.existsSync(file)) {
				const fallback = path.join(directory, "404.html");
				if (fs.existsSync(fallback)) {
					response.writeHead(404, { "content-type": types[".html"] });
					response.end(fs.readFileSync(fallback));
					return;
				}
				response.writeHead(404).end("Not found");
				return;
			}

			response.writeHead(200, {
				"content-type": types[path.extname(file)] ?? "application/octet-stream",
				"cache-control": "no-store",
			});
			response.end(fs.readFileSync(file));
		} catch (error) {
			response.writeHead(500).end(String(error));
		}
	});
}

if (import.meta.url === `file://${process.argv[1]}`) {
	if (!fs.existsSync(root)) {
		console.error(
			`Folder build tidak ditemukan: ${root}. Jalankan "pnpm build" dulu.`,
		);
		process.exit(1);
	}
	createServer().listen(port, "127.0.0.1", () => {
		console.log(`Preview: http://127.0.0.1:${port}`);
	});
}
