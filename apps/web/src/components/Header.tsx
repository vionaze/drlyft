"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { branches, nav, site } from "@/data/site";
import { waLink } from "@/lib/wa";

const intro =
	"Halo Dokter Lift, saya ingin minta survey lift barang. Saya bisa bantu infokan lokasi, ukuran void, dan kapasitasnya.";

export function Header() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, []);

	useEffect(() => {
		if (!open) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const focusFirst = window.setTimeout(() => {
			panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
		}, 40);

		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
				triggerRef.current?.focus();
				return;
			}
			if (event.key !== "Tab" || !panelRef.current) return;
			const focusable = Array.from(
				panelRef.current.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
				),
			).filter((el) => el.offsetParent !== null);
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			} else if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.clearTimeout(focusFirst);
			window.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const close = () => setOpen(false);

	return (
		<>
			<header
				className={`site-header bg-paper/90 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[border-color,background-color] duration-500 ${
					scrolled ? "border-line" : "border-transparent"
				}`}
			>
				<div className="wrap flex h-[72px] items-center justify-between gap-6">
					<a
						href="/#top"
						aria-label="Dokter Lift — kembali ke atas"
						className="shrink-0"
					>
						<Logo
							className="h-[35px] w-auto md:h-[49px] lg:h-[59px]"
							priority
						/>
					</a>

					<nav
						aria-label="Navigasi utama"
						className="hidden items-center gap-7 lg:flex"
					>
						{nav.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="mono-label text-ink/70 hover:text-red transition-colors duration-300"
							>
								{item.label}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-3">
						<a
							href="/#survey"
							className="btn btn-red hidden !min-h-[44px] !px-4 !py-0 sm:inline-flex"
						>
							Minta Survey
							<span className="btn-icon">
								<Icon name="arrow-up-right" />
							</span>
						</a>
						<button
							ref={triggerRef}
							type="button"
							onClick={() => setOpen((value) => !value)}
							aria-expanded={open}
							aria-controls="mobile-menu"
							aria-label={open ? "Tutup menu" : "Buka menu"}
							className="border-line text-ink hover:border-ink grid h-11 w-11 place-items-center border transition-colors lg:hidden"
						>
							<Icon name={open ? "close" : "menu"} className="h-5 w-5" />
						</button>
					</div>
				</div>
			</header>

			<div
				id="mobile-menu"
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label="Menu"
				inert={!open}
				className={`bg-ink fixed inset-0 z-[75] flex flex-col text-white transition-[opacity,visibility] duration-500 lg:hidden ${
					open ? "visible opacity-100" : "invisible opacity-0"
				}`}
			>
				<div className="wrap border-line-dark flex h-[72px] shrink-0 items-center justify-between border-b">
					<Logo variant="dark" className="h-[26px] w-auto" />
					<button
						type="button"
						onClick={close}
						aria-label="Tutup menu"
						className="grid h-11 w-11 place-items-center border border-white/25"
					>
						<Icon name="close" className="h-5 w-5" />
					</button>
				</div>

				<div className="wrap flex flex-1 flex-col justify-between overflow-y-auto py-8">
					<nav aria-label="Navigasi mobile">
						<ul className="grid gap-1">
							{nav.map((item, index) => (
								<li key={item.href}>
									<a
										href={item.href}
										onClick={close}
										className="border-line-dark flex items-baseline justify-between border-b py-4"
									>
										<span className="display display-3 text-white">
											{item.label}
										</span>
										<span className="mono text-[10px] tracking-[0.2em] text-white/55">
											0{index + 1}
										</span>
									</a>
								</li>
							))}
						</ul>
					</nav>

					<div className="mt-10 grid gap-6">
						<a
							href={waLink(site.whatsappDefault, intro)}
							target="_blank"
							rel="noopener noreferrer"
							onClick={close}
							className="btn btn-red w-full"
						>
							Minta Survey via WhatsApp
							<span className="btn-icon">
								<Icon name="arrow-up-right" />
							</span>
						</a>

						<div className="border-line-dark grid gap-3 border-t pt-6">
							{branches.map((branch) => (
								<p key={branch.id} className="mono-label text-white/68">
									{branch.label} · {branch.phoneDisplay}
								</p>
							))}
						</div>

						<div className="flex gap-4">
							<a
								href={site.socials.instagram}
								target="_blank"
								rel="noopener noreferrer"
								className="mono-label flex items-center gap-2 text-white/70"
							>
								<Icon name="instagram" className="h-4 w-4" /> Instagram
							</a>
							<a
								href={site.socials.tiktok}
								target="_blank"
								rel="noopener noreferrer"
								className="mono-label flex items-center gap-2 text-white/70"
							>
								<Icon name="tiktok" className="h-4 w-4" /> TikTok
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
