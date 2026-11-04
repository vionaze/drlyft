export type LiftType = {
	id: string;
	code: string;
	name: string;
	use: string;
	params: { label: string; value: string }[];
	note?: string;
};

export const liftTypes: LiftType[] = [
	{
		id: "lift-barang",
		code: "T-01",
		name: "Lift barang",
		use: "Gudang, pabrik, toko, dan area penyimpanan dengan lalu-lalang barang harian.",
		params: [
			{ label: "Kapasitas", value: "500 kg – 10 ton" },
			{ label: "Tinggi angkat", value: "Dihitung dari dasar ke atap void" },
			{ label: "Void", value: "Ukur panjang × lebar × tinggi" },
			{ label: "Listrik", value: "1 phase 220 V / 3 phase 380 V" },
			{ label: "Pintu", value: "Rolling, swing, atau manual" },
		],
	},
	{
		id: "lift-makanan",
		code: "T-02",
		name: "Lift makanan (dumbwaiter)",
		use: "Restoran, hotel, katering, dan dapur yang memindahkan makanan atau peralatan antar-lantai.",
		params: [
			{
				label: "Kapasitas",
				value: "Disesuaikan, lebih kecil dari lift barang",
			},
			{ label: "Tinggi angkat", value: "Dihitung dari dasar ke atap void" },
			{ label: "Void", value: "Ukur panjang × lebar × tinggi" },
			{ label: "Listrik", value: "Umumnya 1 phase 220 V" },
			{ label: "Kabinet", value: "Stainless / sesuai kebutuhan" },
		],
		note: "Kategori produk berbeda dari lift barang — biaya juga berbeda.",
	},
	{
		id: "lift-custom",
		code: "T-03",
		name: "Lift barang custom",
		use: "Ruang terbatas, void non-standar, area outdoor, atau kebutuhan bongkar-muat khusus.",
		params: [
			{ label: "Kapasitas", value: "500 kg – 10 ton" },
			{ label: "Tinggi angkat", value: "Sesuai desain" },
			{ label: "Void", value: "Didesain per kasus" },
			{ label: "Listrik", value: "1 phase 220 V / 3 phase 380 V" },
			{ label: "Penggerak", value: "Hydraulic / traction" },
		],
		note: "Konfigurasi dan biaya ditentukan setelah survey dan pengukuran.",
	},
	{
		id: "lift-rumahan",
		code: "T-04",
		name: "Lift rumahan (home lift)",
		use: "Rumah tinggal, mezzanine, atau akses privat antar-lantai dengan ruang terbatas.",
		params: [
			{ label: "Kapasitas", value: "Sesuai kebutuhan" },
			{ label: "Tinggi angkat", value: "Sesuai rumah" },
			{ label: "Void", value: "Menyesuaikan struktur" },
			{ label: "Listrik", value: "Umumnya 1 phase 220 V" },
			{ label: "Penggerak", value: "Hydraulic / traction" },
		],
		note: "Ketersediaan dan dimensi dibahas saat survey.",
	},
];
