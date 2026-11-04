import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../index.css";

import { DevRibbon } from "@/components/DevRibbon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LiftProvider } from "@/components/lift/LiftProvider";
import { Motion } from "@/components/Motion";
import { site } from "@/data/site";
import { organizationSchema, SITE_URL, websiteSchema } from "@/lib/seo";

const archivo = localFont({
	src: "../fonts/archivo.woff2",
	weight: "100 900",
	style: "normal",
	variable: "--font-archivo",
	display: "swap",
	declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const plexMono = localFont({
	src: [
		{ path: "../fonts/plex-mono-400.woff2", weight: "400", style: "normal" },
		{ path: "../fonts/plex-mono-500.woff2", weight: "500", style: "normal" },
	],
	variable: "--font-plex-mono",
	display: "swap",
});

const title = "Lift Barang Custom 500 kg–10 Ton — Dokter Lift Indonesia";
const description =
	"Jasa rancang-bangun, instalasi, servis, dan spare part lift barang, lift makanan, dan lift rumahan. Kapasitas 500 kg–10 ton, diukur dari survey. 2 cabang.";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: title,
		template: "%s — Dokter Lift",
	},
	description,
	applicationName: site.name,
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		locale: "id_ID",
		url: "/",
		siteName: site.name,
		title,
		description,
		images: [
			{
				url: "/og.jpg",
				width: 1200,
				height: 630,
				alt: "Dokter Lift — lift barang 500 kg sampai 10 ton",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		images: ["/og.jpg"],
	},
	robots: { index: true, follow: true },
	category: "business",
};

export const viewport: Viewport = {
	themeColor: "#0a0b0a",
	colorScheme: "light",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="id"
			className={`${archivo.variable} ${plexMono.variable}`}
			suppressHydrationWarning
		>
			<head>
				<script
					// Menandai bahwa JS aktif; tanpa ini semua konten tetap tampil.
					dangerouslySetInnerHTML={{
						__html:
							"document.documentElement.classList.add('js');if(location.pathname==='/'||location.pathname==='/index.html'){document.documentElement.classList.add('lift-home')}",
					}}
				/>
			</head>
			<body>
				<a
					href="#main"
					className="focus:bg-ink sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:tracking-[0.14em] focus:text-white focus:uppercase"
				>
					Lewati ke konten
				</a>

				<noscript>
					<style>
						{
							"@media (min-width:1280px){body{padding-left:28px;padding-right:88px}.site-header{left:28px;right:88px}}@media (max-width:1279.98px){body{padding-bottom:104px}}.lift-doors{display:none!important}"
						}
					</style>
				</noscript>
				<LiftProvider>
					<Header />
					<noscript>
						<nav
							aria-label="Navigasi tanpa JavaScript"
							className="border-line bg-paper-2 fixed inset-x-0 top-[72px] z-40 flex flex-wrap gap-x-5 gap-y-2 border-b px-5 py-3"
						>
							<a className="mono-label text-ink" href="/#layanan">
								Layanan
							</a>
							<a className="mono-label text-ink" href="/#tipe">
								Tipe
							</a>
							<a className="mono-label text-ink" href="/#proses">
								Proses
							</a>
							<a className="mono-label text-ink" href="/#cabang">
								Cabang
							</a>
							<a className="mono-label text-ink" href="/#faq">
								FAQ
							</a>
							<a className="mono-label text-red" href="/#survey">
								Minta survey
							</a>
						</nav>
					</noscript>
					<main id="main">{children}</main>
					<Footer />
				</LiftProvider>
				<Motion />
				<DevRibbon />
				<div className="grain" aria-hidden="true" />
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@graph": [organizationSchema(), websiteSchema()],
					}}
				/>
			</body>
		</html>
	);
}
