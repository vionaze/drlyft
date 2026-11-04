import { Icon } from "@/components/Icon";
import { SurveyForm } from "@/components/SurveyForm";
import { branches, site } from "@/data/site";

export function Survey() {
	return (
		<section
			id="survey"
			className="section section-dark relative overflow-hidden"
		>
			<div
				className="grid-bg pointer-events-none absolute inset-0 opacity-40"
				aria-hidden="true"
			/>
			<div className="wrap relative">
				<div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
					<div>
						<div className="flex items-center gap-3">
							<span className="pill-tag pill-tag-dark">
								<span className="pill-dot" aria-hidden="true" />
								<span className="text-white/60">06</span>
								<span className="text-white/30">/</span>
								<span>Minta survey</span>
							</span>
						</div>

						<h2 className="display display-2 mt-5 text-white">
							Ceritakan gedungnya.
							<br />
							Kami hitung lift-nya.
						</h2>

						<p className="lede lede-light mt-5">
							Isi data singkat di samping. Tim cabang akan menghubungi Anda
							untuk mengatur survey dan menanyakan detail teknis yang belum
							tercantum.
						</p>

						<ol className="border-line-dark mt-9 grid gap-5 border-t pt-7">
							{[
								"Pesan masuk ke WhatsApp cabang yang Anda pilih.",
								"Tim menanyakan ukuran, akses, dan beban kerja.",
								"Jadwal survey dan penawaran disusun setelah data lengkap.",
							].map((step, index) => (
								<li key={step} className="grid grid-cols-[auto_1fr] gap-4">
									<span className="mono text-red text-[11px] tracking-[0.16em]">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span className="text-sm leading-relaxed text-white/65">
										{step}
									</span>
								</li>
							))}
						</ol>

						<div className="border-line-dark mt-9 grid gap-3 border-t pt-7">
							{branches.map((branch) => (
								<a
									key={branch.id}
									href={`tel:${branch.phoneE164}`}
									className="flex items-center justify-between gap-4 text-sm text-white/70 transition-colors hover:text-white"
								>
									<span className="flex items-center gap-3">
										<Icon name="phone" className="text-red h-4 w-4" />
										{branch.label}
									</span>
									<span className="mono text-xs">{branch.phoneDisplay}</span>
								</a>
							))}
							<p className="mono-label mt-2 text-white/55">
								Area layanan {site.serviceArea}
							</p>
						</div>
					</div>

					<div className="border-line-dark bg-graphite border p-6 md:p-9">
						<div className="border-line-dark mb-8 flex items-center justify-between border-b pb-5">
							<p className="mono-label text-white/60">Form survey</p>
							<p className="mono-label text-white/60">F-01</p>
						</div>
						<SurveyForm />
					</div>
				</div>
			</div>
		</section>
	);
}
