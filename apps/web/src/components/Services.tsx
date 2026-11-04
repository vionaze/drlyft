import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/SectionHead";
import { standards } from "@/data/content";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { waLink } from "@/lib/wa";

const iconFor = {
	build: "build",
	install: "install",
	service: "service",
	parts: "parts",
} as const;

export function Services() {
	return (
		<section id="layanan" className="section bg-paper-2">
			<div className="wrap">
				<SectionHead
					index="01"
					label="Layanan"
					title={
						<>
							Dari gambar kerja
							<br />
							sampai servis.
						</>
					}
					lede="Empat lingkup kerja yang bisa diambil terpisah atau sebagai satu paket. Semuanya dimulai dari survey, karena ukuran lift tidak bisa ditebak dari foto."
				/>

				<div className="border-line border-t">
					{services.map((service) => (
						<details
							key={service.id}
							className="group border-line border-b"
							data-reveal
						>
							<summary className="hover:text-red flex cursor-pointer list-none items-start gap-5 py-7 transition-colors md:gap-10 md:py-9 [&::-webkit-details-marker]:hidden">
								<span className="mono text-gray mt-1 w-8 shrink-0 text-[11px] tracking-[0.16em]">
									{service.index}
								</span>
								<span className="min-w-0 flex-1">
									<span className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
										<span className="display display-3 text-ink group-hover:text-red transition-colors">
											{service.title}
										</span>
										<span className="text-gray hidden max-w-[46ch] text-sm leading-relaxed md:block">
											{service.summary}
										</span>
									</span>
									<span className="text-gray mt-3 block text-sm leading-relaxed md:hidden">
										{service.summary}
									</span>
								</span>
								<span className="mt-1 flex shrink-0 items-center gap-4">
									<Icon
										name={iconFor[service.icon]}
										className="text-ink/40 hidden h-6 w-6 md:block"
									/>
									<span className="border-line group-hover:border-red group-hover:bg-red grid h-9 w-9 place-items-center border transition-colors group-hover:text-white">
										<Icon
											name="plus"
											className="h-4 w-4 transition-transform duration-500 group-open:rotate-45"
										/>
									</span>
								</span>
							</summary>

							<div className="grid gap-8 pb-9 md:grid-cols-[0.9fr_1.1fr] md:pl-[72px]">
								<ul className="grid gap-3">
									{service.scope.map((item) => (
										<li
											key={item}
											className="text-ink/80 flex gap-3 text-sm leading-relaxed"
										>
											<span
												className="bg-red mt-[7px] h-[5px] w-[5px] shrink-0"
												aria-hidden="true"
											/>
											<span>{item}</span>
										</li>
									))}
								</ul>
								<div className="border-line flex flex-col items-start gap-4 border-l-0 md:border-l md:pl-8">
									{service.note ? (
										<p className="mono-label text-gray max-w-[38ch]">
											{service.note}
										</p>
									) : null}
									<a
										href={waLink(
											site.whatsappDefault,
											`${service.cta} lift barang.`,
										)}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-ghost !min-h-[46px]"
									>
										{service.cta}
										<span className="btn-icon">
											<Icon name="arrow-up-right" />
										</span>
									</a>
								</div>
							</div>
						</details>
					))}
				</div>

				{/* Compact Standards Strip (merged from Standards) */}
				<div className="border-line mt-14 border-t pt-8 md:pt-10">
					<div className="max-w-[72ch]">
						<p className="mono-label text-gray">Standar kerja</p>
						<h3 className="display display-3 text-ink mt-3">
							Empat hal yang kami pastikan.
						</h3>
						<p className="text-gray mt-3 text-sm leading-relaxed">
							Supaya Anda tidak perlu menebak apa yang terjadi sebelum dan
							sesudah lift dipasang.
						</p>
					</div>

					<div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{standards.map((item, index) => (
							<div
								key={item.title}
								className="card-tech bg-paper/80 flex flex-col justify-between p-5"
								data-reveal
							>
								<div className="flex items-center justify-between gap-2">
									<span className="mono text-red text-[10px] tracking-[0.18em]">
										0{index + 1}
									</span>
									<Icon name="check" className="text-red h-3.5 w-3.5" />
								</div>
								<div className="mt-4">
									<h3 className="text-sm font-semibold tracking-tight">
										{item.title}
									</h3>
									<p className="text-gray mt-1.5 text-xs leading-relaxed">
										{item.body}
									</p>
								</div>
							</div>
						))}
					</div>

					<p className="text-gray mt-5 text-sm">
						Masih bingung?{" "}
						<a
							href={waLink(
								site.whatsappDefault,
								"Halo Dokter Lift, saya ingin tanya soal cara kerja dan standar pemasangan lift.",
							)}
							target="_blank"
							rel="noopener noreferrer"
							className="link-underline text-ink"
						>
							Tanya langsung ke tim
						</a>
						.
					</p>
				</div>
			</div>
		</section>
	);
}
