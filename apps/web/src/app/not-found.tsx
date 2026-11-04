import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Halaman tidak ditemukan",
	alternates: { canonical: "/404" },
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<div className="wrap pt-[130px] pb-24 md:pt-[170px]">
			<div className="mono-label text-gray flex items-center gap-3">
				<span
					className="bg-red inline-block h-[7px] w-[7px]"
					aria-hidden="true"
				/>
				<span>Error 404</span>
			</div>
			<h1 className="display display-hero text-ink mt-6">
				Halaman
				<br />
				tidak ada.
			</h1>
			<p className="lede mt-6">
				Alamat yang Anda buka tidak tersedia. Kembali ke beranda, atau langsung
				minta survey lewat WhatsApp.
			</p>
			<div className="mt-8 flex flex-wrap gap-3">
				<a href="/" className="btn btn-red">
					Ke beranda
					<span className="btn-icon">
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
						>
							<path d="M4 12h15" />
							<path d="m13 6 6 6-6 6" />
						</svg>
					</span>
				</a>
				<a href="/#survey" className="btn btn-ghost">
					Minta survey
				</a>
			</div>
		</div>
	);
}
