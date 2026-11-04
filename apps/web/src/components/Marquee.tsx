const items = [
	"Lift barang",
	"500 kg – 10 ton",
	"Rancang-bangun",
	"Instalasi",
	"Servis & maintenance",
	"Spare part",
];

function Row() {
	return (
		<div className="flex shrink-0 items-center">
			{items.map((item) => (
				<span key={item} className="flex items-center">
					<span className="mono-label px-6 whitespace-nowrap text-white">
						{item}
					</span>
					<span
						className="h-[5px] w-[5px] shrink-0 bg-white/70"
						aria-hidden="true"
					/>
				</span>
			))}
		</div>
	);
}

export function Marquee() {
	return (
		<div className="marquee border-ink/20 bg-red text-ink border-y py-3">
			<div className="marquee-track">
				<Row />
				<Row />
				<Row />
				<Row />
			</div>
		</div>
	);
}
