import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/SectionHead";
import { standards } from "@/data/content";
import { site } from "@/data/site";
import { waLink } from "@/lib/wa";

export function Standards() {
	return (
		<section
			id="standar"
			className="section section-dark relative overflow-hidden"
		>
			<div
				className="grid-bg pointer-events-none absolute inset-0 opacity-40"
				aria-hidden="true"
			/>
			<div className="wrap relative">
				<SectionHead
					dark
					index="07"
					label="Standar kerja"
					title={
						<>
							Kami tidak menjual
							<br />
							lift dari katalog.
						</>
					}
					lede="Karena setiap gedung berbeda, cara kerja kami juga harus bisa dipertanggungjawabkan per proyek — bukan sekadar kirim unit lalu selesai."
				/>

				<div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
					<ul className="border-line-dark border-t">
						{standards.map((item, index) => (
							<li
								key={item.title}
								className="border-line-dark grid grid-cols-[auto_1fr] gap-5 border-b py-6"
								data-reveal
							>
								<span
									className="text-red mt-0.5 grid h-8 w-8 place-items-center border border-white/20"
									aria-hidden="true"
								>
									<Icon name="check" className="h-3.5 w-3.5" />
								</span>
								<div>
									<div className="flex items-baseline justify-between gap-4">
										<h3 className="text-base font-semibold text-white">
											{item.title}
										</h3>
										<span className="mono text-[10px] tracking-[0.18em] text-white/60">
											0{index + 1}
										</span>
									</div>
									<p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-white/68">
										{item.body}
									</p>
								</div>
							</li>
						))}
					</ul>

					<aside className="border-line-dark bg-graphite relative flex flex-col justify-between border p-7 md:p-9">
						<div>
							<p className="mono-label text-white/55">Catatan teknis</p>
							<p className="mt-5 text-lg leading-relaxed text-white/85">
								“Kapasitas yang benar bukan yang paling besar, tapi yang cocok
								dengan beban harian dan ruang yang ada.”
							</p>
							<p className="mono-label mt-5 text-white/55">
								Tim teknis {site.name}
							</p>
						</div>

						<div className="border-line-dark mt-10 border-t pt-6">
							<p className="mono-label text-white/55">
								Area layanan {site.serviceArea}
							</p>
							<a
								href={waLink(
									site.whatsappDefault,
									"Halo Dokter Lift, saya ingin diskusi teknis soal lift barang di gedung saya.",
								)}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-light mt-5"
							>
								Diskusi teknis
								<span className="btn-icon">
									<Icon name="arrow-up-right" />
								</span>
							</a>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
