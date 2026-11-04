import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
	title: "Disclaimer",
	description:
		"Catatan penggunaan informasi di situs Dokter Lift: spesifikasi lift, kapasitas, dan lingkup pekerjaan mengikuti hasil survey dan penawaran tertulis.",
	alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
	return (
		<LegalPage eyebrow="Legal" title="Disclaimer" updated="Oktober 2026">
			<div className="legal">
				<h2>Informasi umum, bukan penawaran final</h2>
				<p>
					Situs ini memuat informasi umum tentang layanan {site.name}. Rentang
					kapasitas <strong>{site.capacity.range}</strong> adalah rentang produk
					yang kami kerjakan, bukan jaminan bahwa setiap konfigurasi tersedia
					untuk semua gedung. Kapasitas, dimensi, dan sistem penggerak final
					ditentukan setelah survey dan dituangkan dalam penawaran tertulis.
				</p>

				<h2>Tidak ada jaminan hasil</h2>
				<p>
					Ilustrasi, gambar teknis, dan contoh pada situs ini bersifat skematis.
					Kami tidak menjanjikan hasil tertentu tanpa data lapangan. Setiap
					proyek memiliki kondisi ruang, akses, dan beban kerja yang berbeda.
				</p>

				<h2>Uji riksa dan perizinan</h2>
				<p>
					Lift termasuk pesawat angkat yang memiliki kewajiban pemeriksaan
					berkala. Kewajiban tersebut melekat pada pemilik atau pengelola
					gedung. Kami membantu menyiapkan data teknis dan dokumentasi unit,
					tetapi tidak menggantikan kewajiban hukum pemilik.
				</p>

				<h2>Merek dan konten</h2>
				<p>
					Logo, nama, dan materi visual {site.name} digunakan untuk keperluan
					identitas usaha. Tautan ke Instagram, TikTok, dan Google Maps
					diarahkan ke layanan pihak ketiga yang memiliki kebijakan privasi
					masing-masing.
				</p>

				<h2>Kontak</h2>
				<p>
					Pertanyaan tentang isi situs dapat disampaikan melalui WhatsApp cabang
					atau email <strong>{site.email}</strong>. Untuk urusan teknis,
					sebutkan lokasi, jenis lift, dan kapasitas yang dibutuhkan agar tim
					dapat merespons dengan tepat.
				</p>
			</div>
		</LegalPage>
	);
}
