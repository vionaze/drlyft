export type Hours = {
	days: string;
	open: string;
	close: string;
	closed?: boolean;
};

export type Branch = {
	id: string;
	label: string;
	city: string;
	addressLine: string;
	district: string;
	postalCode: string;
	kind: "workshop" | "office" | "service-area";
	mapsQuery: string;
	mapsEmbed?: string;
	googleProfileUrl?: string;
	phoneDisplay: string;
	phoneE164: string;
	whatsappE164: string;
	hours: Hours[];
	hoursNote?: string;
	coverage: string;
	isPlaceholder: boolean;
};

const MAIN_WA = "6282295481900";

export const site = {
	name: "Dokter Lift",
	legalName: "",
	tagline: "The Art of the Lift",
	description:
		"Jasa rancang-bangun, instalasi, servis, dan spare part lift barang, lift makanan, dan lift rumahan. Kapasitas 500 kg–10 ton, diukur dari survey. 2 cabang.",
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dokterlift.com",
	email: "dokterlift9@gmail.com",
	capacity: {
		min: "500 kg",
		max: "10 ton",
		range: "500 kg – 10 ton",
	},
	experience: {
		value: "20+ tahun",
		label: "Melayani pelanggan",
		sentence: "Lebih dari 20 tahun melayani pelanggan",
	},
	serviceArea: "Seluruh Indonesia",
	coverage: ["Seluruh Indonesia"],
	socials: {
		instagram: "https://www.instagram.com/dokterliftindonesiaofficial/",
		tiktok: "https://www.tiktok.com/@dokter.lift",
	},
	whatsappDefault: MAIN_WA,
	isPreview: false,
} as const;

export const branches: Branch[] = [
	{
		id: "legok",
		label: "Cabang Utama — Legok",
		city: "Kabupaten Tangerang",
		addressLine: "Jl. Raya Rancaiyuh, Bojongkamal",
		district: "Legok",
		postalCode: "15820",
		kind: "office",
		mapsQuery:
			"Dokterlift indonesia official, Jl. Raya Rancaiyuh, Bojongkamal, Legok, Tangerang",
		googleProfileUrl: "https://maps.app.goo.gl/eaUSBR4tyeLu2iaU6",
		phoneDisplay: "+62 822-9548-1900",
		phoneE164: "+6282295481900",
		whatsappE164: MAIN_WA,
		hours: [],
		hoursNote: "Jam kunjungan dikonfirmasi via WhatsApp",
		coverage:
			"Tangerang, Jakarta & Jabodetabek · proyek luar kota via survey online",
		isPlaceholder: false,
	},
	{
		id: "sunter",
		label: "Cabang Sunter",
		city: "Jakarta Utara",
		addressLine: "Jl. Cempaka No. 10, RT.6/RW.3, Sunter Agung",
		district: "Sunter Agung",
		postalCode: "14350",
		kind: "office",
		mapsQuery:
			"Dokterlift indonesia office Sunter, Jl. Cempaka, Sunter Agung, Jakarta Utara",
		googleProfileUrl: "https://maps.app.goo.gl/Ptr9EiaRRezQB4yw5",
		phoneDisplay: "+62 822-9548-1900",
		phoneE164: "+6282295481900",
		whatsappE164: MAIN_WA,
		hours: [],
		hoursNote: "Jam kunjungan dikonfirmasi via WhatsApp",
		coverage: "Jakarta & Jabodetabek · proyek luar kota via survey online",
		isPlaceholder: false,
	},
];

export const nav = [
	{ href: "/#layanan", label: "Layanan" },
	{ href: "/#tipe", label: "Tipe & Kapasitas" },
	{ href: "/#proses", label: "Proses" },
	{ href: "/#cabang", label: "Cabang" },
	{ href: "/#faq", label: "FAQ" },
	{ href: "/blog", label: "Blog" },
] as const;
