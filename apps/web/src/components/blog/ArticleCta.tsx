import { Icon } from "@/components/Icon";
import { site } from "@/data/site";
import { waLink } from "@/lib/wa";

export function ArticleCta({
	location,
	slug,
}: {
	location: string;
	slug: string;
}) {
	return (
		<section className="bg-ink mt-12 overflow-hidden p-6 text-white md:p-9">
			<p className="mono-label text-[#ff6b5e]">Langkah berikutnya</p>
			<h2 className="display display-3 mt-3 max-w-[20ch] text-white">
				Ukur dulu, baru bicara harga.
			</h2>
			<p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-white/65">
				Kirim lokasi, ukuran void kasar, dan kapasitas yang dibutuhkan. Tim akan
				membantu menentukan data apa yang perlu dilengkapi sebelum survey di{" "}
				{location}.
			</p>
			<div className="mt-6 flex flex-wrap gap-3">
				<a
					href={waLink(
						site.whatsappDefault,
						`Halo Dokter Lift, saya baca artikel ${location} (${slug}) dan ingin minta survey lift barang. Saya bisa bantu infokan lokasi, ukuran void, dan kapasitasnya.`,
					)}
					target="_blank"
					rel="noopener noreferrer"
					className="btn btn-red"
				>
					Minta survey via WhatsApp
					<span className="btn-icon">
						<Icon name="arrow-up-right" />
					</span>
				</a>
				<a
					href="/#survey"
					className="btn btn-ghost !border-white/25 !text-white"
				>
					Isi form survey
				</a>
			</div>
		</section>
	);
}
