"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { branches, site } from "@/data/site";
import { waLink } from "@/lib/wa";

const intro =
	"Halo Dokter Lift, saya ingin konsultasi soal lift barang. Bisa dibantu?";

export function StickyCta() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => setVisible(window.scrollY > 560));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div
			className={`border-line bg-paper fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t p-3 pb-[calc(12px+env(safe-area-inset-bottom))] transition-transform duration-500 md:hidden ${
				visible ? "translate-y-0" : "translate-y-full"
			}`}
		>
			<a
				href={waLink(site.whatsappDefault, intro)}
				target="_blank"
				rel="noopener noreferrer"
				className="btn btn-red !min-h-[46px] !px-3 text-[10px]"
			>
				WhatsApp
				<span className="btn-icon !h-6 !w-6">
					<Icon name="whatsapp" className="!h-3 !w-3" />
				</span>
			</a>
			<a
				href={`tel:${branches[0]?.phoneE164 ?? "+6281234567890"}`}
				className="btn btn-ghost !min-h-[46px] !px-3 text-[10px]"
			>
				Telepon
				<span className="btn-icon !h-6 !w-6">
					<Icon name="phone" className="!h-3 !w-3" />
				</span>
			</a>
		</div>
	);
}
