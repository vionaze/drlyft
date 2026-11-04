import { Icon } from "@/components/Icon";
import { HeroInstrument } from "@/components/lift/HeroInstrument";
import { site } from "@/data/site";
import { waLink } from "@/lib/wa";

const intro =
	"Halo Dokter Lift, saya ingin minta survey lift barang. Saya bisa bantu infokan lokasi, ukuran void, dan kapasitasnya.";

const stats = [
	{ code: "01", value: site.capacity.range, label: "Kapasitas lift barang" },
	{ code: "02", value: "2 cabang", label: "Legok & Sunter" },
	{
		code: "03",
		value: "Nasional",
		label: "Seluruh Indonesia",
	},
	{ code: "04", value: site.experience.value, label: site.experience.label },
];

export function Hero() {
	return (
		<section id="top" className="bg-paper pt-[78px] pb-3 md:pt-[86px] md:pb-5">
			<div className="mx-auto max-w-[1440px] px-2.5 sm:px-4 md:px-6">
				<div className="hero-stage relative text-white">
					{/* Subtle CAD Blueprint Grid + Dot Matrix */}
					<div
						className="grid-bg pointer-events-none absolute inset-0 opacity-65"
						aria-hidden="true"
					/>
					<div
						className="dots-bg-dark pointer-events-none absolute inset-0 opacity-30"
						aria-hidden="true"
					/>

					{/* Giant Outlined Architectural Watermark */}
					<div
						className="hero-numeral-wrap pointer-events-none absolute right-[-2vw] bottom-[68px] select-none"
						aria-hidden="true"
					>
						<div className="hero-numeral">10 TON</div>
					</div>

					{/* Top HUD Telemetry Bar (Lightweight / Anime.js inspired) */}
					<div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 md:px-10">
						<div className="flex flex-wrap items-center gap-3">
							<span className="pill-tag pill-tag-dark">
								<span className="pill-dot" aria-hidden="true" />
								<span>LANTAI G</span>
								<span className="text-white/30">/</span>
								<span>LOBI</span>
							</span>
							<span className="mono-label hidden text-white/50 sm:inline">
								/ Diukur dulu, baru dibuat
							</span>
						</div>
						<div className="mono-label flex items-center gap-4 text-white/55">
							<span className="hidden md:inline">
								SYS. FREIGHT · DUMBWAITER
							</span>
							<span className="border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/75">
								500 KG — 10T
							</span>
						</div>
					</div>

					{/* Main Hero Stage Content */}
					<div className="relative px-5 pt-9 pb-10 sm:px-8 md:px-12 md:pt-14 md:pb-14 lg:px-16">
						<div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-12">
							<div>
								<h1 className="display display-hero text-white">
									<span className="block">Lift barang</span>
									<span className="block">
										yang <span className="text-red">bekerja.</span>
									</span>
								</h1>

								<p className="display display-3 outline-text mt-3 text-white/85">
									Bukan yang berhenti.
								</p>

								<p className="lede lede-light mt-7 max-w-[52ch]">
									<span className="text-white/90 font-medium">
										{site.experience.sentence}.
									</span>{" "}
									Kami merancang, memasang, dan merawat lift barang serta lift
									makanan untuk gudang, pabrik, ritel, dan F&amp;B. Ukuran
									diambil dari survey — bukan dari katalog.
								</p>

								<div className="mt-8 flex flex-wrap items-center gap-3.5">
									<a
										href={waLink(site.whatsappDefault, intro)}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-red"
									>
										Minta Survey
										<span className="btn-icon">
											<Icon name="arrow-up-right" />
										</span>
									</a>
									<a href="#layanan" className="btn btn-light">
										Lihat Layanan
										<span className="btn-icon">
											<Icon name="arrow-right" />
										</span>
									</a>
								</div>

								<div className="mt-6 flex items-center gap-2.5 md:mt-7">
									<span
										className="bg-red inline-block h-1.5 w-1.5 rounded-full"
										aria-hidden="true"
									/>
									<p className="mono-label text-white/60">
										Harga disusun setelah survey &amp; pengukuran void
									</p>
								</div>
							</div>

							{/* Right Instrument Viewport — 3D / CAD fallback */}
							<HeroInstrument />
						</div>
					</div>

					{/* Bottom Telemetry Spec Bar */}
					<dl className="relative grid gap-px border-t border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="bg-ink/90 hover:bg-graphite/95 flex flex-col justify-between px-6 py-5 transition-colors duration-300 md:px-8 md:py-6"
							>
								<dt className="mono-label flex items-center justify-between gap-2 text-white/60">
									<span>{stat.label}</span>
									<span className="mono text-[10px] tracking-[0.18em] text-white/55">
										{stat.code}
									</span>
								</dt>
								<dd className="stat-value mt-3 text-white">{stat.value}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
}
