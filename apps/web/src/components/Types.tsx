import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/SectionHead";
import { sectors } from "@/data/content";
import { site } from "@/data/site";
import { liftTypes } from "@/data/types";

export function Types() {
	return (
		<section
			id="tipe"
			className="section section-dark relative overflow-hidden"
		>
			<div
				className="grid-bg pointer-events-none absolute inset-0 opacity-50"
				aria-hidden="true"
			/>
			<div className="wrap relative">
				<SectionHead
					dark
					index="02"
					label="Tipe & kapasitas"
					title={
						<>
							Kebutuhannya
							<br />
							menentukan ukurannya.
						</>
					}
					lede="Lift barang kami berada di rentang 500 kg sampai 10 ton. Lift makanan (dumbwaiter) punya kapasitas lebih kecil, dan lift rumahan menyesuaikan ruang privat. Bentuk kabin, pintu, dan penggeraknya mengikuti kebutuhan."
				/>

				<div className="border-line-dark flex flex-wrap items-end justify-between gap-6 border-y py-8">
					<div>
						<p className="mono-label text-white/55">Rentang lift barang</p>
						<p className="stat-value mt-2 !text-[clamp(34px,5.2vw,68px)] text-white">
							500 kg <span className="text-red">—</span> 10 ton
						</p>
					</div>
					<p className="mono-label max-w-[30ch] text-white/60">
						Kapasitas final setelah survey beban, void &amp; daya listrik
					</p>
				</div>

				<div className="bg-line-dark mt-10 grid gap-px md:grid-cols-2">
					{liftTypes.map((type) => (
						<article
							key={type.id}
							className="group bg-ink hover:bg-graphite relative p-7 transition-colors duration-500 md:p-9"
							data-reveal
						>
							<div className="flex items-center justify-between">
								<span className="mono text-[10.5px] tracking-[0.18em] text-white/55">
									{type.code}
								</span>
								<Icon
									name="arrow-up-right"
									className="group-hover:text-red h-4 w-4 text-white/45 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
								/>
							</div>

							<h3 className="display display-3 mt-8 text-white">{type.name}</h3>
							<p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-white/68">
								{type.use}
							</p>

							<dl className="border-line-dark mt-7 border-t">
								{type.params.map((param) => (
									<div
										key={param.label}
										className="border-line-dark flex items-baseline justify-between gap-6 border-b py-2.5"
									>
										<dt className="mono-label text-white/55">{param.label}</dt>
										<dd className="text-right font-mono text-[11.5px] text-white/80">
											{param.value}
										</dd>
									</div>
								))}
							</dl>

							{type.note ? (
								<p className="mt-4 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-white/55">
									{type.note}
								</p>
							) : null}
						</article>
					))}
				</div>

				{/* Compact Sector Pills (merged from Sectors) */}
				<div className="border-line-dark mt-10 border-t pt-8">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<p className="mono-label text-white/60">Sektor yang kami tangani</p>
						<p className="mono-label text-white/50">
							Area layanan {site.serviceArea}
						</p>
					</div>
					<div className="mt-4 flex flex-wrap gap-2.5">
						{sectors.map((sector) => (
							<div
								key={sector.name}
								className="border-line-dark bg-graphite/70 flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs"
							>
								<span
									className="bg-red h-1.5 w-1.5 rounded-full"
									aria-hidden="true"
								/>
								<span className="font-medium text-white">{sector.name}</span>
								<span className="text-white/45">·</span>
								<span className="mono text-[10.5px] text-white/60">
									{sector.note}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
