export type Floor = {
	id: string;
	num: string;
	label: string;
	short: string;
};

export const floors: Floor[] = [
	{ id: "top", num: "G", label: "Lobi / Beranda", short: "LOBI" },
	{ id: "layanan", num: "01", label: "Layanan", short: "LAYANAN" },
	{ id: "tipe", num: "02", label: "Tipe & Kapasitas", short: "TIPE" },
	{ id: "proses", num: "03", label: "Proses", short: "PROSES" },
	{ id: "cabang", num: "04", label: "Cabang", short: "CABANG" },
	{ id: "faq", num: "05", label: "FAQ", short: "FAQ" },
	{ id: "survey", num: "06", label: "Minta Survey", short: "SURVEY" },
];

export const floorIds = floors.map((floor) => floor.id);
