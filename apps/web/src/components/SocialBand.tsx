import { Icon } from "@/components/Icon";
import { site } from "@/data/site";

const channels = [
	{
		name: "Instagram",
		handle: "@dokterliftindonesiaofficial",
		note: "Dokumentasi unit, proses workshop, dan potongan pengerjaan.",
		href: site.socials.instagram,
		icon: "instagram" as const,
	},
	{
		name: "TikTok",
		handle: "@dokter.lift",
		note: "Cuplikan proses dan catatan teknis singkat dari lapangan.",
		href: site.socials.tiktok,
		icon: "tiktok" as const,
	},
];

export function SocialBand() {
	return (
		<section className="border-line bg-paper border-t py-14 md:py-20">
			<div className="wrap">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<h2 className="display display-3 text-ink">Lihat prosesnya.</h2>
					<p className="mono-label text-gray">
						Testimoni ditampilkan setelah izin klien
					</p>
				</div>

				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{channels.map((channel) => (
						<a
							key={channel.name}
							href={channel.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group border-line hover:border-ink flex min-w-0 items-start justify-between gap-4 border bg-white p-5 transition-colors duration-500 md:gap-6 md:p-6"
						>
							<div className="flex min-w-0 flex-1 gap-4">
								<span className="border-line text-ink group-hover:border-red group-hover:bg-red grid h-10 w-10 shrink-0 place-items-center border transition-colors duration-500 group-hover:text-white">
									<Icon name={channel.icon} className="h-4 w-4" />
								</span>
								<div className="min-w-0">
									<p className="mono-label text-gray">{channel.name}</p>
									<p className="text-ink mt-2 font-mono text-sm break-all">
										{channel.handle}
									</p>
									<p className="text-gray mt-2 max-w-[38ch] text-sm leading-relaxed">
										{channel.note}
									</p>
								</div>
							</div>
							<Icon
								name="arrow-up-right"
								className="text-line group-hover:text-red mt-1 h-5 w-5 shrink-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
							/>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
