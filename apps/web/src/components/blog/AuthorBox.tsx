import { Icon } from "@/components/Icon";
import { site } from "@/data/site";

export function AuthorBox() {
	return (
		<section className="border-line mt-10 border-t pt-6">
			<div className="flex flex-wrap items-start gap-4">
				<div className="bg-ink grid h-12 w-12 shrink-0 place-items-center text-white">
					<span className="display text-lg">DL</span>
				</div>
				<div className="min-w-0 flex-1">
					<p className="text-sm font-semibold">Tim Teknis {site.name}</p>
					<p className="text-gray mt-1.5 max-w-[60ch] text-sm leading-relaxed">
						Ditulis dari pengalaman menangani lift barang, lift makanan, dan
						lift rumahan — termasuk survey, instalasi, dan servis di
						Jabodetabek. Kami menulis apa yang bisa dipertanggungjawabkan, bukan
						janji tanpa pengukuran.
					</p>
					<a
						href="/#cabang"
						className="mono-label text-red-deep mt-3 inline-flex items-center gap-2"
					>
						Lihat cabang & kontak
						<Icon name="arrow-up-right" className="h-3 w-3" />
					</a>
				</div>
			</div>
		</section>
	);
}
