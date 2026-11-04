export type Service = {
	id: string;
	index: string;
	title: string;
	summary: string;
	scope: string[];
	note?: string;
	cta: string;
	icon: "build" | "install" | "service" | "parts";
};

export const services: Service[] = [
	{
		id: "rancang-bangun",
		index: "01",
		title: "Rancang-bangun custom",
		summary:
			"Ukuran lift ditentukan dari kondisi gedung, bukan dari katalog. Kami ukur, desain, lalu fabrikasi.",
		scope: [
			"Survey lokasi, pengukuran shaft, dan cek struktur",
			"Desain kabin, pintu, dan sistem penggerak sesuai beban kerja",
			"Fabrikasi rangka, kabin, dan komponen di workshop",
			"Gambar kerja dan spesifikasi teknis sebelum produksi",
		],
		cta: "Minta survey rancang-bangun",
		icon: "build",
	},
	{
		id: "instalasi",
		index: "02",
		title: "Instalasi & commissioning",
		summary:
			"Pemasangan di lokasi oleh tim teknis, dilanjutkan uji beban dan serah terima yang terdokumentasi.",
		scope: [
			"Pemasangan rel, kabin, pintu, dan panel kontrol",
			"Wiring, setting limit, dan pengujian fungsi",
			"Uji beban sesuai kapasitas yang disepakati",
			"Berita acara serah terima dan panduan operasi",
		],
		cta: "Tanya jadwal instalasi",
		icon: "install",
	},
	{
		id: "servis",
		index: "03",
		title: "Servis & maintenance",
		summary:
			"Perawatan berkala untuk menjaga lift tetap bekerja, plus penanganan saat unit berhenti.",
		scope: [
			"Servis preventif: pelumasan, pengecekan rel, pintu, dan sistem gantung",
			"Pengecekan panel, kontaktor, dan pengaman",
			"Perbaikan korektif untuk unit yang berhenti",
			"Laporan kondisi setelah setiap kunjungan",
		],
		cta: "Jadwalkan servis",
		icon: "service",
	},
	{
		id: "sparepart",
		index: "04",
		title: "Spare part",
		summary:
			"Komponen pengganti untuk perawatan dan perbaikan. Ketersediaan mengikuti jenis unit.",
		scope: [
			"Pencocokan komponen dengan unit yang terpasang",
			"Penggantian parts aus: kabel, roller, kontaktor, dan lainnya",
			"Pemesanan komponen khusus sesuai spesifikasi unit",
		],
		note: "Stok tidak selalu tersedia untuk semua unit — konfirmasi saat survey.",
		cta: "Tanya ketersediaan parts",
		icon: "parts",
	},
];
