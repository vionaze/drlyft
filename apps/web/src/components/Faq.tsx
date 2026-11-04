import { Icon } from "@/components/Icon";
import { faqs } from "@/data/content";
import { site } from "@/data/site";
import { waLink } from "@/lib/wa";

export function Faq() {
	return (
		<section id="faq" className="section">
			<div className="wrap">
				<div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
					<div className="lg:sticky lg:top-28 lg:self-start">
						<div className="flex items-center gap-3">
							<span className="pill-tag text-ink">
								<span className="pill-dot" aria-hidden="true" />
								<span className="text-gray">05</span>
								<span className="text-line">/</span>
								<span>FAQ</span>
							</span>
						</div>
						<h2 className="display display-2 text-ink mt-5">
							Yang sering
							<br />
							ditanyakan.
						</h2>
						<p className="lede mt-5">
							Pertanyaan teknis dan komersial yang paling sering masuk. Kalau
							belum terjawab, tanya langsung ke tim cabang.
						</p>
						<a
							href={waLink(
								site.whatsappDefault,
								"Halo Dokter Lift, saya punya pertanyaan teknis soal lift barang.",
							)}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-red mt-8"
						>
							Tanya tim
							<span className="btn-icon">
								<Icon name="whatsapp" />
							</span>
						</a>
					</div>

					<div className="border-line border-t">
						{faqs.map((faq, index) => (
							<details key={faq.q} className="group border-line border-b">
								<summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
									<span className="mono text-gray mt-1 w-6 shrink-0 text-[10px] tracking-[0.14em]">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span className="text-ink group-hover:text-red flex-1 text-[15px] leading-snug font-medium tracking-tight transition-colors md:text-base">
										{faq.q}
									</span>
									<span className="border-line mt-0.5 grid h-7 w-7 shrink-0 place-items-center border">
										<Icon
											name="plus"
											className="h-3.5 w-3.5 transition-transform duration-500 group-open:rotate-45"
										/>
									</span>
								</summary>
								<div className="pb-5 md:pl-10">
									<p className="text-gray max-w-[62ch] text-sm leading-relaxed">
										{faq.a}
									</p>
								</div>
							</details>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
