export const problems = [
	{
		index: "01",
		title: "Lift berhenti saat operasional",
		body: "Barang menumpuk, pengiriman tertunda, dan tim harus mengangkat manual. Downtime lift langsung terasa ke biaya.",
	},
	{
		index: "02",
		title: "Ukuran tidak pernah dihitung",
		body: "Lift dibeli dari katalog, lalu tidak muat pallet, tidak pas dengan pintu, atau kapasitasnya kurang untuk beban harian.",
	},
	{
		index: "03",
		title: "Tidak ada yang bisa dihubungi",
		body: "Setelah pemasangan selesai, sulit cari teknisi yang paham unitnya, apalagi spare part yang cocok.",
	},
] as const;

export const processSteps = [
	{
		no: "01",
		title: "Survey & ukur",
		body: "Ukur void (panjang × lebar × tinggi), cek akses, struktur, dan daya listrik yang tersedia.",
	},
	{
		no: "02",
		title: "Spesifikasi & penawaran",
		body: "Kapasitas, bahan, pintu, dan penggerak diajukan tertulis beserta rincian biaya.",
	},
	{
		no: "03",
		title: "Fabrikasi",
		body: "Rangka, kabin, dan komponen dibuat di workshop sesuai gambar kerja.",
	},
	{
		no: "04",
		title: "Instalasi",
		body: "Pemasangan di lokasi dengan koordinasi jam kerja agar operasional tetap jalan.",
	},
	{
		no: "05",
		title: "Uji beban & serah terima",
		body: "Pengujian fungsi dan beban, lalu berita acara dan panduan operasi.",
	},
	{
		no: "06",
		title: "Perawatan",
		body: "Servis berkala dan penanganan jika unit bermasalah setelah serah terima.",
	},
] as const;

export const costFactors = [
	{
		title: "Ukuran void",
		body: "Panjang, lebar, dan tinggi void menentukan dimensi kabin dan konstruksi yang muat.",
	},
	{
		title: "Bahan & spesifikasi",
		body: "Pilihan material kabin, pintu, rangka, dan komponen memengaruhi biaya.",
	},
	{
		title: "Kapasitas beban",
		body: "Semakin besar beban, semakin besar struktur, penggerak, dan daya yang dibutuhkan.",
	},
	{
		title: "Kategori produk",
		body: "Lift barang dan lift makanan (dumbwaiter) punya konstruksi dan rentang biaya berbeda.",
	},
] as const;

export const sectors = [
	{ name: "Gudang & logistik", note: "Pallet, roll cage, bongkar-muat" },
	{
		name: "Pabrik & produksi",
		note: "Material, komponen, perpindahan antar-lantai",
	},
	{ name: "Ritel & minimarket", note: "Stok, display, akses gudang belakang" },
	{ name: "F&B & hotel", note: "Lift makanan, suplai dapur, peralatan" },
	{ name: "Rumah & apartemen", note: "Home lift, akses privat" },
	{ name: "Bangunan bertingkat", note: "Akses barang rutin antar-lantai" },
] as const;

export const standards = [
	{
		title: "Diukur dulu, baru dibuat",
		body: "Kami datang mengukur ruang tempat lift (void), lebar pintu, dan daya listrik. Tidak ada ukuran yang dikira-kira dari foto.",
	},
	{
		title: "Semua tertulis dan jelas",
		body: "Anda menerima gambar kerja, rincian bahan, dan catatan serah terima. Jadi tidak ada perubahan mendadak setelah harga disepakati.",
	},
	{
		title: "Bicara langsung dengan tim",
		body: "Nomor cabang tersambung ke orang yang mengerjakan lift Anda — bukan call center yang berpindah-pindah.",
	},
	{
		title: "Suku cadang tidak menebak",
		body: "Setiap bagian yang dipasang kami catat. Saat perlu ganti, kami tahu suku cadang yang cocok — tanpa menebak.",
	},
] as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
	{
		q: "Harga lift barang berapa?",
		a: "Harga belum bisa disebut sebelum survey. Biaya disusun dari empat hal: (1) ukuran void — panjang, lebar, tinggi; (2) pilihan bahan dan spesifikasi; (3) kapasitas beban; (4) kategori produk. Lift barang dan lift makanan (dumbwaiter) punya konstruksi dan rentang biaya yang berbeda. Semua informasi dikumpulkan dulu, lalu kami buatkan proposal tertulis berisi lingkup pekerjaan dan rincian biaya — jadi angka yang Anda terima bukan perkiraan kasar.",
	},
	{
		q: "Saya sudah punya void. Bagaimana selanjutnya?",
		a: "Kirim ukuran void (panjang × lebar × tinggi) dan foto kondisi lokasi. Dari situ kami hitung dimensi kabin, ruang mesin, dan pintu yang muat. Kalau ukuran void belum ideal, kami beri opsi penyesuaian sebelum masuk produksi, sehingga tidak ada unit yang dipaksakan.",
	},
	{
		q: "Bagaimana cara mengukur struktur tinggi void?",
		a: "Tinggi void diukur dari dasar, yaitu permukaan lantai, sampai ke atap void — bukan tinggi antar-lantai. Sertakan juga posisi balok dan ketebalan plat atap, karena keduanya memengaruhi ruang mesin dan tinggi angkat efektif.",
	},
	{
		q: "Listriknya berapa phase?",
		a: "Tersedia dua pilihan: 1 phase (220 V) atau 3 phase (380 V), tergantung kapasitas dan unit yang dipilih. Daya yang tersedia di lokasi kami cek saat survey agar tidak kurang saat operasional.",
	},
	{
		q: "Apakah Dokter Lift melayani seluruh Indonesia?",
		a: "Bisa, kami melayani seluruh Indonesia. Proyek yang sudah kami tangani tersebar di Jawa, Bali, Sumatera, Kalimantan, dan NTT. Untuk lokasi jauh, jadwal, pengiriman, dan kebutuhan tim di lapangan diatur per proyek.",
	},
	{
		q: "Survey di luar Jabodetabek bagaimana?",
		a: "Bisa online atau lewat video. Anda mengirim ukuran void, foto, dan video lokasi; tim menghitung kebutuhan dari data tersebut. Jika diperlukan kunjungan langsung, jadwal dan biayanya dikonfirmasi lebih dulu.",
	},
	{
		q: "Kapasitas lift yang bisa dibuat?",
		a: "Lift barang: 500 kg sampai 10 ton. Lift makanan (dumbwaiter) kapasitasnya lebih kecil dan disesuaikan dengan kebutuhan dapur. Lift rumahan menyesuaikan ruang dan kebutuhan penghuni. Kapasitas final ditentukan dari beban per sekali angkut dan ukuran ruang.",
	},
	{
		q: "Berapa lama waktu pengerjaan?",
		a: "Durasi tergantung kapasitas, tingkat kesulitan instalasi, dan antrean produksi. Estimasi waktu dicantumkan di proposal setelah survey, bukan sebelum.",
	},
	{
		q: "Apakah termasuk uji beban?",
		a: "Proses kami mencakup uji fungsi dan uji beban sesuai kapasitas yang disepakati, lalu serah terima dengan berita acara. Untuk kewajiban uji riksa dan perizinan, kami bantu menyiapkan data teknis unit.",
	},
	{
		q: "Bagaimana dengan izin dan uji riksa?",
		a: "Lift termasuk pesawat angkat yang memiliki kewajiban pemeriksaan berkala. Kewajiban ini melekat pada pemilik/pengelola gedung; kami membantu menyediakan spesifikasi dan dokumentasi teknis yang dibutuhkan.",
	},
	{
		q: "Apakah ada garansi?",
		a: "Garansi dan lingkup tanggung jawab tercantum di penawaran, menyesuaikan komponen dan jenis pekerjaan. Kami tidak memakai angka garansi yang sama untuk semua unit.",
	},
	{
		q: "Lift lama bisa diperbaiki atau dimodernisasi?",
		a: "Bisa dinilai lebih dulu. Kami cek kondisi rel, kabin, pintu, dan sistem penggerak, lalu memberi opsi: perbaikan, penggantian komponen, atau modernisasi bagian tertentu.",
	},
	{
		q: "Spare part tersedia untuk semua unit?",
		a: "Tidak selalu. Komponen dicocokkan dengan unit yang terpasang; sebagian parts perlu dipesan khusus. Kami konfirmasi ketersediaan sebelum penggantian.",
	},
	{
		q: "Di mana saja cabangnya?",
		a: "Saat ini ada dua cabang: Legok (Kabupaten Tangerang) dan Sunter (Jakarta Utara). Keduanya melayani Jabodetabek, dan proyek di luar area tetap bisa ditangani dengan koordinasi survey online.",
	},
];

export type Project = {
	title: string;
	type: string;
	capacity: string;
	location: string;
	image?: string;
};

// Diisi setelah foto & data proyek tersedia. Section otomatis disembunyikan saat kosong.
export const projects: Project[] = [];
