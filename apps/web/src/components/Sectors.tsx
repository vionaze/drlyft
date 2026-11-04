import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/SectionHead";
import { sectors } from "@/data/content";

export function Sectors() {
	return (
		<section id="sektor" className="section bg-paper-2">
			<div className="wrap">
				<SectionHead
					index="06"
					label="Sektor"
					title={
						<>
							Barangnya beda,
							<br />
							hitungannya beda.
						</>
					}
					lede="Pola bongkar-muat di gudang tidak sama dengan di dapur hotel atau rumah sakit. Karena itu kapasitas, ukuran kabin, dan pintu ditentukan per kasus."
				/>

				<div className="border-line bg-line grid gap-px border sm:grid-cols-2 lg:grid-cols-3">
					{sectors.map((sector) => (
						<div
							key={sector.name}
							className="group bg-paper flex min-h-[150px] flex-col justify-between p-6 transition-colors duration-500 hover:bg-white"
						>
							<div className="flex items-start justify-between gap-4">
								<h3 className="text-base leading-snug font-semibold tracking-tight">
									{sector.name}
								</h3>
								<Icon
									name="arrow-up-right"
									className="text-line group-hover:text-red mt-1 h-4 w-4 shrink-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
								/>
							</div>
							<p className="mono-label text-gray mt-8">{sector.note}</p>
						</div>
					))}
				</div>

				<p className="text-gray mt-8 text-sm">
					Sektor lain? Tulis kebutuhan Anda di{" "}
					<a href="#survey" className="link-underline text-ink font-medium">
						form survey
					</a>{" "}
					— kami cek kelayakannya dari ukuran dan beban.
				</p>
			</div>
		</section>
	);
}
