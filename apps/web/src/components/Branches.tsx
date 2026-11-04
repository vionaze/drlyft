import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/SectionHead";
import { branches, site } from "@/data/site";
import { branchMessage, waLink } from "@/lib/wa";

function mapsUrl(query: string) {
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function Branches() {
	return (
		<section id="cabang" className="section">
			<div className="wrap">
				<SectionHead
					index="04"
					label="Cabang"
					title={
						<>
							Dua titik,
							<br />
							satu cara kerja.
						</>
					}
					lede="Kantor dan tim di dua lokasi: Legok (Tangerang) dan Sunter (Jakarta Utara). Untuk lokasi di luar area, jadwal kunjungan dikonfirmasi saat penjadwalan."
				/>

				<div className="grid gap-6 lg:grid-cols-2">
					{branches.map((branch, index) => (
						<article
							key={branch.id}
							className={`card-tech flex flex-col ${index === 1 ? "lg:mt-14" : ""}`}
							data-reveal
						>
							<div className="border-line flex items-center justify-between border-b px-5 py-4">
								<div className="flex items-center gap-3">
									<span className="mono-label text-gray">0{index + 1}</span>
									<span className="mono-label text-ink">{branch.label}</span>
								</div>
								<span className="mono-label border-line text-gray border px-2 py-1 text-[9px]">
									{branch.kind === "workshop"
										? "Workshop"
										: branch.kind === "office"
											? "Kantor"
											: "Area layanan"}
								</span>
							</div>

							{branch.mapsEmbed ? (
								<iframe
									title={`Peta ${branch.label}`}
									src={branch.mapsEmbed}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="h-[230px] w-full border-0"
								/>
							) : (
								<div
									className="grid-bg-light border-line bg-paper-2 relative h-[230px] overflow-hidden border-b"
									aria-hidden="true"
								>
									<div className="absolute inset-0 opacity-60">
										<svg
											aria-hidden="true"
											viewBox="0 0 600 300"
											className="h-full w-full"
											fill="none"
										>
											<g stroke="currentColor" strokeWidth="1" opacity="0.35">
												<path d="M0 80h600M0 170h600M0 250h600M120 0v300M260 0v300M390 0v300M510 0v300" />
												<path d="M0 120 600 60M60 300 340 0" />
											</g>
											<g stroke="currentColor" strokeWidth="1" opacity="0.18">
												<path d="M0 40h600M0 215h600M60 0v300M200 0v300M330 0v300M460 0v300M560 0v300" />
											</g>
										</svg>
									</div>
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-center">
										<span className="bg-red mx-auto grid h-9 w-9 place-items-center text-white">
											<Icon name="pin" className="h-4 w-4" />
										</span>
										<span className="bg-paper text-ink mt-2 block px-2 py-1 font-mono text-[9px] tracking-[0.14em] whitespace-nowrap uppercase">
											{branch.district}
										</span>
									</div>
									<span className="text-gray absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.16em] uppercase">
										Peta skematis — bukan skala
									</span>
									<span className="text-gray absolute top-3 right-4 font-mono text-[9px] tracking-[0.16em] uppercase">
										{branch.city}
									</span>
								</div>
							)}

							<div className="flex flex-1 flex-col p-5 md:p-6">
								<p className="display display-3 text-ink">{branch.city}</p>

								<div className="text-ink/75 mt-5 grid gap-3 text-sm leading-relaxed">
									<p className="flex gap-3">
										<Icon
											name="pin"
											className="text-red mt-1 h-4 w-4 shrink-0"
										/>
										<span>
											{branch.addressLine}
											<br />
											{branch.district}, {branch.city} {branch.postalCode}
										</span>
									</p>
									<p className="flex gap-3">
										<Icon
											name="clock"
											className="text-red mt-1 h-4 w-4 shrink-0"
										/>
										<span className="mono text-xs leading-relaxed">
											{branch.hours.length > 0 ? (
												branch.hours.map((hour) => (
													<span key={hour.days} className="block">
														{hour.days}
														{hour.closed
															? ": tutup"
															: `: ${hour.open}–${hour.close}`}
													</span>
												))
											) : (
												<span className="text-ink/80 block">
													{branch.hoursNote ?? "Konfirmasi via WhatsApp"}
												</span>
											)}
										</span>
									</p>
									<p className="flex gap-3">
										<Icon
											name="phone"
											className="text-red mt-1 h-4 w-4 shrink-0"
										/>
										<a
											href={`tel:${branch.phoneE164}`}
											className="hover:text-red"
										>
											{branch.phoneDisplay}
										</a>
									</p>
								</div>

								<p className="mono-label border-line text-gray mt-5 border-t pt-4">
									Area layanan: {branch.coverage}
								</p>

								<div className="mt-auto flex flex-wrap gap-2 pt-6">
									<a
										href={waLink(
											branch.whatsappE164,
											branchMessage(branch.label),
										)}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-red !min-h-[44px] !px-4 text-[10px]"
									>
										WhatsApp cabang
										<span className="btn-icon !h-6 !w-6">
											<Icon name="whatsapp" className="!h-3 !w-3" />
										</span>
									</a>
									<a
										href={mapsUrl(branch.mapsQuery)}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-ghost !min-h-[44px] !px-4 text-[10px]"
									>
										Rute
										<span className="btn-icon !h-6 !w-6">
											<Icon name="arrow-up-right" className="!h-3 !w-3" />
										</span>
									</a>
									{branch.googleProfileUrl ? (
										<a
											href={branch.googleProfileUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="mono-label text-gray decoration-line hover:text-ink self-center px-2 underline underline-offset-4"
										>
											Profil Google
										</a>
									) : null}
								</div>
							</div>
						</article>
					))}
				</div>

				<p className="mono-label text-gray mt-10">
					{site.name} · {site.capacity.range} · {site.serviceArea}
				</p>
			</div>
		</section>
	);
}
