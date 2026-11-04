import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { branches, nav, site } from "@/data/site";
import { waLink } from "@/lib/wa";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-line-dark bg-ink border-t text-white">
			<div className="wrap py-14 md:py-20">
				<div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
					<div>
						<Logo variant="dark" className="h-9 w-auto" />
						<p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-white/68">
							<span className="text-white/90 font-medium">
								{site.experience.sentence}.
							</span>{" "}
							Rancang-bangun, instalasi, dan perawatan lift barang, lift
							makanan, dan lift rumahan. Kapasitas {site.capacity.range},
							disesuaikan dengan gedung dan cara kerja Anda.
						</p>
						<p className="mono-label mt-6 text-white/55">
							Melayani {site.serviceArea}*
						</p>
						<p className="mt-2 text-[12px] italic leading-relaxed text-white/75">
							*Syarat dan ketentuan berlaku.
						</p>
						<div className="mt-5 flex gap-3">
							<a
								href={site.socials.instagram}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram Dokter Lift"
								className="grid h-10 w-10 place-items-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
							>
								<Icon name="instagram" className="h-4 w-4" />
							</a>
							<a
								href={site.socials.tiktok}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="TikTok Dokter Lift"
								className="grid h-10 w-10 place-items-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
							>
								<Icon name="tiktok" className="h-4 w-4" />
							</a>
						</div>
					</div>

					<div>
						<p className="mono-label text-white/55">Navigasi</p>
						<ul className="mt-5 grid gap-3">
							{nav.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										className="text-sm text-white/70 transition-colors hover:text-white"
									>
										{item.label}
									</a>
								</li>
							))}
							<li>
								<a
									href="/#survey"
									className="text-sm text-white/70 transition-colors hover:text-white"
								>
									Minta Survey
								</a>
							</li>
						</ul>
					</div>

					<div>
						<p className="mono-label text-white/55">Cabang</p>
						<ul className="mt-5 grid gap-6">
							{branches.map((branch) => (
								<li key={branch.id}>
									<p className="mono-label text-white">{branch.label}</p>
									<p className="mt-2 text-sm leading-relaxed text-white/68">
										{branch.addressLine}
										<br />
										{branch.district}, {branch.city}
									</p>
									<div className="mt-3 flex flex-col gap-1.5">
										<a
											href={`tel:${branch.phoneE164}`}
											className="mono flex items-center gap-2 text-xs text-white/70 hover:text-white"
										>
											<Icon name="phone" className="h-3.5 w-3.5" />{" "}
											{branch.phoneDisplay}
										</a>
										<a
											href={waLink(
												branch.whatsappE164,
												`Halo ${site.name} ${branch.label}, saya ingin konsultasi lift barang.`,
											)}
											target="_blank"
											rel="noopener noreferrer"
											className="mono flex items-center gap-2 text-xs text-white/70 hover:text-white"
										>
											<Icon name="whatsapp" className="h-3.5 w-3.5" /> WhatsApp
										</a>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="border-line-dark mt-14 flex flex-col gap-5 border-t pt-6 md:flex-row md:items-center md:justify-between">
					<p className="mono-label text-white/55">
						© {year} {site.name} · {site.tagline}
					</p>
					<div className="flex flex-wrap gap-5">
						<a
							href="/disclaimer"
							className="mono-label text-white/60 hover:text-white"
						>
							Disclaimer
						</a>
						<a
							href="/kebijakan-privasi"
							className="mono-label text-white/60 hover:text-white"
						>
							Kebijakan Privasi
						</a>
						<a
							href="/#top"
							className="mono-label text-white/60 hover:text-white"
						>
							Kembali ke atas
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
