import { SectionHead } from "@/components/SectionHead";
import { projects } from "@/data/content";

export function Projects() {
	if (projects.length === 0) return null;

	return (
		<section id="proyek" className="section bg-paper-2">
			<div className="wrap">
				<SectionHead
					index="09"
					label="Proyek"
					title={
						<>
							Sudah terpasang,
							<br />
							bukan cuma rencana.
						</>
					}
					lede="Dokumentasi unit yang sudah dikerjakan. Data kapasitas dan lokasi ditampilkan sesuai izin klien."
				/>

				<div className="grid gap-6 md:grid-cols-3">
					{projects.map((project) => (
						<article key={project.title} className="card-tech bg-paper">
							<div
								className="border-line bg-paper-3 aspect-[4/3] border-b"
								aria-hidden="true"
							/>
							<div className="p-5">
								<p className="mono-label text-gray">{project.type}</p>
								<h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
								<p className="mono text-gray mt-3 text-xs">
									{project.capacity} · {project.location}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
