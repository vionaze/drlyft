import { SectionHead } from "@/components/SectionHead";
import { problems } from "@/data/content";

export function Problems() {
	return (
		<section id="masalah" className="section">
			<div className="wrap">
				<SectionHead
					index="02"
					label="Kenyataan di lapangan"
					title={
						<>
							Masalahnya jarang
							<br />
							di mesin.
						</>
					}
					lede="Lift yang berhenti biasanya berawal dari keputusan sebelum lift itu dibuat: ukuran yang tidak dihitung, beban yang tidak diprediksi, dan tidak ada tim yang bisa dihubungi setelah serah terima."
				/>

				<div className="grid gap-5 md:grid-cols-3">
					{problems.map((problem) => (
						<article
							key={problem.index}
							className="card-tech ticks group bg-paper relative flex flex-col justify-between p-7 hover:bg-white md:p-9"
							data-reveal
						>
							<div>
								<div className="border-line/70 flex items-center justify-between border-b pb-4">
									<span className="mono text-gray text-[11px] tracking-[0.18em]">
										KASUS · {problem.index}
									</span>
									<span
										className="bg-line group-hover:bg-red h-2 w-2 rounded-full transition-colors duration-500"
										aria-hidden="true"
									/>
								</div>
								<h3 className="mt-8 text-xl leading-tight font-semibold tracking-tight md:text-[22px]">
									{problem.title}
								</h3>
								<p className="text-gray mt-4 text-sm leading-relaxed">
									{problem.body}
								</p>
							</div>

							<div className="mt-8 flex items-center justify-between border-t border-dashed border-black/10 pt-4">
								<span className="mono-label text-gray text-[10px]">
									Risiko operasional
								</span>
								<span className="mono text-red text-[10px] tracking-[0.16em]">
									DICEGAH SAAT SURVEY
								</span>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
