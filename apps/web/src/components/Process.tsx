import { SectionHead } from "@/components/SectionHead";
import { costFactors, processSteps } from "@/data/content";

export function Process() {
	return (
		<section id="proses" className="section relative overflow-hidden">
			<div
				className="dots-bg pointer-events-none absolute inset-0 opacity-35"
				aria-hidden="true"
			/>
			<div className="wrap relative">
				<SectionHead
					index="03"
					label="Proses"
					title={
						<>
							Enam langkah,
							<br />
							tanpa tebak-tebakan.
						</>
					}
					lede="Setiap tahap punya keluaran yang jelas: hasil ukur, gambar kerja, unit terpasang, dan berita acara. Anda tahu sedang di tahap mana."
				/>

				<ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{processSteps.map((step) => (
						<li
							key={step.no}
							className="card-tech ticks group bg-paper/90 relative flex flex-col justify-between p-6 backdrop-blur-xs hover:bg-white md:p-8"
							data-reveal
						>
							<div>
								<div className="border-line/80 flex items-center justify-between border-b pb-4">
									<span className="display text-ink group-hover:text-red text-[40px] leading-none transition-colors duration-500">
										{step.no}
									</span>
									<span className="border-line text-gray group-hover:border-red/40 group-hover:text-red rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors">
										Tahap {step.no}
									</span>
								</div>
								<h3 className="mt-6 text-lg font-semibold tracking-tight">
									{step.title}
								</h3>
								<p className="text-gray mt-2.5 text-sm leading-relaxed">
									{step.body}
								</p>
							</div>

							<div className="mt-6 flex items-center gap-2 pt-2">
								<span
									className="bg-red/70 h-1.5 w-1.5 rounded-full"
									aria-hidden="true"
								/>
								<span className="border-red/35 flex-1 border-t border-dashed" />
								<span className="mono text-gray text-[9.5px] tracking-[0.16em] uppercase">
									Terukur
								</span>
							</div>
						</li>
					))}
				</ol>

				<div className="border-line bg-line mt-14 grid gap-px overflow-hidden rounded-[var(--radius-tech)] border lg:grid-cols-[0.92fr_1.08fr]">
					<div className="bg-ink relative flex flex-col justify-between p-7 text-white md:p-10">
						<div
							className="grid-bg pointer-events-none absolute inset-0 opacity-45"
							aria-hidden="true"
						/>
						<div className="relative">
							<span className="pill-tag pill-tag-dark">
								<span className="pill-dot" aria-hidden="true" />
								<span>Biaya &amp; Penawaran</span>
							</span>
							<h3 className="display display-3 mt-5 text-white">
								Harga disusun setelah survey.
							</h3>
							<p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-white/72">
								Tidak ada harga yang bisa disebut sebelum void diukur dan
								spesifikasi dipilih. Setelah data terkumpul, kami buatkan
								proposal tertulis berisi lingkup pekerjaan dan rincian biaya —
								bukan perkiraan kasar.
							</p>
						</div>
						<a
							href="#faq"
							className="arrow-link text-red relative mt-8 inline-flex"
						>
							Baca detail di FAQ
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							>
								<path d="M4 12h15" />
								<path d="m13 6 6 6-6 6" />
							</svg>
						</a>
					</div>
					<ul className="bg-line grid gap-px sm:grid-cols-2">
						{costFactors.map((factor, index) => (
							<li
								key={factor.title}
								className="bg-paper p-6 transition-colors hover:bg-white md:p-8"
							>
								<div className="flex items-center justify-between">
									<p className="mono text-red-deep text-[10.5px] tracking-[0.18em]">
										FAKTOR 0{index + 1}
									</p>
									<span
										className="bg-line h-1.5 w-1.5 rounded-full"
										aria-hidden="true"
									/>
								</div>
								<h4 className="mt-3 text-base font-semibold tracking-tight">
									{factor.title}
								</h4>
								<p className="text-gray mt-2 text-sm leading-relaxed">
									{factor.body}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
