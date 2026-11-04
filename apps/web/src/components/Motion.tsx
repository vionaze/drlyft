"use client";

import { useEffect } from "react";

const reveal = (el: Element) => el.classList.add("is-in");

export function Motion() {
	useEffect(() => {
		const reduce =
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reduce || typeof IntersectionObserver === "undefined") {
			document.querySelectorAll("[data-reveal]").forEach(reveal);
			return;
		}

		const observed = new WeakSet<Element>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					reveal(entry.target);
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
		);

		const scan = () => {
			document.querySelectorAll("[data-reveal]").forEach((el) => {
				if (observed.has(el)) return;
				observed.add(el);
				observer.observe(el);
			});
		};

		// Konten bisa ter-stream setelah komponen ini mount; pindai ulang.
		scan();
		const mutation = new MutationObserver(scan);
		mutation.observe(document.body, { childList: true, subtree: true });

		// Pengaman: jangan pernah biarkan konten tak terlihat.
		const safety = window.setTimeout(() => {
			document.querySelectorAll("[data-reveal]:not(.is-in)").forEach(reveal);
		}, 8000);

		return () => {
			observer.disconnect();
			mutation.disconnect();
			window.clearTimeout(safety);
		};
	}, []);

	return null;
}
