import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
	title: "Kebijakan Privasi",
	description:
		"Situs Dokter Lift tidak memasang cookie analitik. Data formulir hanya dipakai untuk menyusun pesan WhatsApp dan tidak disimpan di server situs.",
	alternates: { canonical: "/kebijakan-privasi" },
};

export default function PrivacyPage() {
	return (
		<LegalPage eyebrow="Legal" title="Kebijakan Privasi" updated="Oktober 2026">
			<div className="legal">
				<h2>Ringkasan</h2>
				<p>
					Situs ini tidak memasang cookie analitik, tidak memuat skrip iklan,
					dan tidak memiliki database pengunjung. Formulir survey bekerja di
					browser Anda: data diubah menjadi pesan WhatsApp, lalu Anda sendiri
					yang mengirimkannya.
				</p>

				<h2>Data yang Anda isi</h2>
				<ul>
					<li>Nama dan nama perusahaan (opsional).</li>
					<li>Nomor WhatsApp dan kota/lokasi proyek.</li>
					<li>
						Jenis lift, perkiraan kapasitas, jumlah lantai, dan catatan teknis.
					</li>
				</ul>
				<p>
					Data tersebut hanya dipakai untuk menindaklanjuti permintaan survey
					atau servis. Tidak ada data yang dikirim ke server {site.name} saat
					Anda mengisi formulir.
				</p>

				<h2>WhatsApp dan layanan pihak ketiga</h2>
				<p>
					Setelah tombol kirim ditekan, pesan dibuka di WhatsApp. Pemrosesan
					data di WhatsApp mengikuti kebijakan privasi Meta/WhatsApp, bukan
					kebijakan situs ini. Tautan Instagram, TikTok, dan Google Maps juga
					mengarah ke layanan pihak ketiga.
				</p>

				<h2>Tanpa cookie pelacakan</h2>
				<p>
					Situs tidak menggunakan Google Analytics, pixel iklan, atau alat
					pelacakan lain. Peta Google hanya dimuat jika alamat final sudah
					dipasang pada data cabang; selama belum, tidak ada iframe pihak ketiga
					yang dijalankan.
				</p>

				<h2>Penyimpanan dan permintaan Anda</h2>
				<p>
					Karena data tidak disimpan di server, permintaan koreksi atau
					penghapusan cukup dilakukan pada percakapan WhatsApp dengan tim kami.
					Untuk pertanyaan lain, hubungi <strong>{site.email}</strong>.
				</p>

				<h2>Perubahan kebijakan</h2>
				<p>
					Jika cara kerja situs berubah (misalnya penambahan formulir dengan
					penyimpanan data), halaman ini akan diperbarui dan tanggal revisi di
					atas ikut berubah.
				</p>
			</div>
		</LegalPage>
	);
}
