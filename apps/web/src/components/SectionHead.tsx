import type { ReactNode } from "react";

type SectionHeadProps = {
	index: string;
	label: string;
	title: ReactNode;
	lede?: ReactNode;
	dark?: boolean;
	id?: string;
};

export function SectionHead({
	index,
	label,
	title,
	lede,
	dark = false,
	id,
}: SectionHeadProps) {
	return (
		<div className="section-head" data-floor={index}>
			<div>
				<div className="flex items-center gap-3">
					<span className={`pill-tag ${dark ? "pill-tag-dark" : "text-ink"}`}>
						<span className="pill-dot" aria-hidden="true" />
						<span className={dark ? "text-white/60" : "text-gray"}>
							LANTAI {index}
						</span>
						<span className={dark ? "text-white/30" : "text-line"}>/</span>
						<span>{label}</span>
					</span>
				</div>
				<h2
					id={id}
					className={`display display-2 mt-5 ${dark ? "text-white" : "text-ink"}`}
				>
					{title}
				</h2>
			</div>
			{lede ? (
				<p className={`lede ${dark ? "lede-light" : ""}`}>{lede}</p>
			) : null}
		</div>
	);
}
