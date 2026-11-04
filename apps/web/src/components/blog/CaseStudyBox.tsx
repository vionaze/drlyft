import { Icon } from "@/components/Icon";
import type { CaseStudy } from "@/lib/blog";

export function CaseStudyBox({ study }: { study: CaseStudy }) {
	return (
		<section
			id="studi-kasus"
			className="case-study border-line-dark bg-ink my-10 overflow-hidden border text-white"
			aria-labelledby="case-study-title"
		>
			<div className="border-line-dark flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4 md:px-8">
				<p className="mono-label text-[#ff6b5e]">
					Studi kasus {study.illustrative ? "· ilustrasi pola proyek" : ""}
				</p>
				<span className="mono text-[10px] tracking-[0.16em] text-white/60 uppercase">
					{study.location}
				</span>
			</div>

			<div className="p-6 md:p-8">
				<h2
					id="case-study-title"
					className="display display-3 max-w-[24ch] text-white"
				>
					{study.title}
				</h2>

				<dl className="border-line-dark mt-6 grid gap-px border-y sm:grid-cols-3">
					<div className="py-4 sm:pr-4">
						<dt className="mono-label text-white/60">Bangunan</dt>
						<dd className="mt-2 text-sm text-white/80">{study.building}</dd>
					</div>
					<div className="border-line-dark py-4 sm:border-l sm:px-4">
						<dt className="mono-label text-white/60">Kapasitas</dt>
						<dd className="mt-2 text-sm text-white/80">{study.capacity}</dd>
					</div>
					<div className="border-line-dark py-4 sm:border-l sm:pl-4">
						<dt className="mono-label text-white/60">Lokasi</dt>
						<dd className="mt-2 text-sm text-white/80">{study.location}</dd>
					</div>
				</dl>

				<div className="mt-6 grid gap-5 md:grid-cols-3">
					<div>
						<p className="mono-label text-[#ff6b5e]">Masalah</p>
						<p className="mt-2 text-sm leading-relaxed text-white/70">
							{study.challenge}
						</p>
					</div>
					<div>
						<p className="mono-label text-[#ff6b5e]">Solusi</p>
						<p className="mt-2 text-sm leading-relaxed text-white/70">
							{study.solution}
						</p>
					</div>
					<div>
						<p className="mono-label text-[#ff6b5e]">Hasil</p>
						<p className="mt-2 text-sm leading-relaxed text-white/70">
							{study.result}
						</p>
					</div>
				</div>

				{study.illustrative ? (
					<p className="mono mt-6 flex items-start gap-2 text-[10.5px] leading-relaxed text-white/60">
						<Icon name="check" className="text-red mt-0.5 h-3 w-3 shrink-0" />
						Ilustrasi pola proyek, bukan dokumentasi proyek tertentu. Detail
						proyek asli dapat berbeda.
					</p>
				) : null}
			</div>
		</section>
	);
}
