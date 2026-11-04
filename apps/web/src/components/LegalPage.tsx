import type { ReactNode } from "react";

type LegalPageProps = {
	eyebrow: string;
	title: string;
	updated: string;
	children: ReactNode;
};

export function LegalPage({
	eyebrow,
	title,
	updated,
	children,
}: LegalPageProps) {
	return (
		<div className="wrap pt-[112px] pb-20 md:pt-[136px] md:pb-28">
			<div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
				<div className="lg:sticky lg:top-28 lg:self-start">
					<div className="mono-label text-gray flex items-center gap-3">
						<span
							className="bg-red inline-block h-[7px] w-[7px]"
							aria-hidden="true"
						/>
						<span>{eyebrow}</span>
					</div>
					<h1 className="display display-2 text-ink mt-5">{title}</h1>
					<p className="mono-label text-gray mt-6">
						Terakhir diperbarui: {updated}
					</p>
					<a href="/" className="arrow-link text-ink mt-8 inline-flex">
						Kembali ke beranda
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
					</a>
				</div>

				<div className="max-w-[70ch]">{children}</div>
			</div>
		</div>
	);
}
