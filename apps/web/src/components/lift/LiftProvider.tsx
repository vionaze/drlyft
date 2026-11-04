"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type Floor, floors } from "@/data/floors";
import { liftAudio } from "@/lib/lift-audio";
import { LiftDoors, type LiftDoorsHandle } from "./LiftDoors";
import { LiftPanel } from "./LiftPanel";
import { LiftShaft } from "./LiftShaft";
import { LiftContext, type LiftContextValue } from "./lift-context";

const HEADER_OFFSET = 84;

function scrollToY(y: number) {
	return new Promise<void>((resolve) => {
		let settled = false;
		const done = () => {
			if (settled) return;
			settled = true;
			resolve();
		};
		const state = { y: window.scrollY };
		gsap.to(state, {
			y,
			duration: 0.85,
			ease: "power3.inOut",
			onUpdate: () => window.scrollTo(0, state.y),
			onComplete: done,
		});
		window.setTimeout(done, 1500);
	});
}

export function LiftProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isHome = pathname === "/" || pathname === "/index.html";
	const [activeId, setActiveId] = useState(floors[0]?.id ?? "top");
	const [moving, setMoving] = useState(false);
	const [direction, setDirection] = useState<"up" | "down" | null>(null);
	const [targetId, setTargetId] = useState<string | null>(null);
	const [arrived, setArrived] = useState(false);
	const [soundOn, setSoundOn] = useState(false);

	const doorsRef = useRef<LiftDoorsHandle>(null);
	const movingRef = useRef(false);
	const activeRef = useRef(activeId);
	const reducedRef = useRef(false);
	const soundRef = useRef(false);
	const arrivalTimer = useRef<number | null>(null);

	const active = useMemo(
		() => floors.find((floor) => floor.id === activeId) ?? floors[0],
		[activeId],
	);
	const target = useMemo(
		() => floors.find((floor) => floor.id === targetId) ?? active,
		[targetId, active],
	);

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => {
			reducedRef.current = query.matches;
		};
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		activeRef.current = activeId;
		document.documentElement.dataset.floor = active.num;
	}, [active, activeId]);

	useEffect(() => {
		try {
			const saved = window.localStorage.getItem("lift-sound") === "on";
			soundRef.current = saved;
			setSoundOn(saved);
		} catch {
			/* localStorage bisa diblokir */
		}
		return () => {
			if (arrivalTimer.current) window.clearTimeout(arrivalTimer.current);
			liftAudio.dispose();
		};
	}, []);

	const toggleSound = useCallback(() => {
		const next = !soundRef.current;
		soundRef.current = next;
		setSoundOn(next);
		try {
			window.localStorage.setItem("lift-sound", next ? "on" : "off");
		} catch {
			/* abaikan */
		}
		if (next) {
			liftAudio.click();
			liftAudio.arrival();
		}
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("lift-home", isHome);
		return () => document.documentElement.classList.remove("lift-home");
	}, [isHome]);

	/* Scroll spy: lantai aktif mengikuti posisi baca. */
	useEffect(() => {
		if (!isHome) return;
		let frame = 0;

		const update = () => {
			frame = 0;
			if (movingRef.current) return;
			const marker = window.scrollY + window.innerHeight * 0.35;
			let current = floors[0];
			for (const floor of floors) {
				const el = document.getElementById(floor.id);
				if (!el) continue;
				const top = el.getBoundingClientRect().top + window.scrollY;
				if (top <= marker) current = floor;
			}
			if (current && current.id !== activeRef.current) {
				activeRef.current = current.id;
				setActiveId(current.id);
			}
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			cancelAnimationFrame(frame);
		};
	}, [isHome]);

	/* Intro hero + penanda lantai saat section masuk. */
	useEffect(() => {
		if (!isHome) return;
		const ctx = gsap.context(() => {
			if (!reducedRef.current) {
				const title = ".hero-stage h1 span";
				gsap.set(title, { clearProps: "transform,opacity" });
				gsap.fromTo(
					title,
					{ y: 38, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1.1,
						stagger: 0.1,
						ease: "expo.out",
						delay: 0.65,
						clearProps: "transform",
					},
				);

				const items =
					".hero-stage .display-3, .hero-stage .lede, .hero-stage .btn, .hero-stage .instrument-frame, .hero-stage dl > div";
				gsap.set(items, { clearProps: "transform,opacity" });
				gsap.fromTo(
					items,
					{ y: 22, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.85,
						stagger: 0.05,
						ease: "power3.out",
						delay: 0.9,
						clearProps: "transform",
					},
				);
			}
		});

		const observed: Element[] = [];
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					entry.target.classList.toggle("is-arrived", entry.isIntersecting);
				}
			},
			{ rootMargin: "0px 0px -24% 0px", threshold: 0.08 },
		);
		for (const floor of floors.slice(1)) {
			const section = document.getElementById(floor.id);
			if (!section) continue;
			observed.push(section);
			observer.observe(section);
		}

		return () => {
			ctx.revert();
			observer.disconnect();
			for (const section of observed) section.classList.remove("is-arrived");
		};
	}, [isHome]);

	const goTo = useCallback(
		(floor: Floor) => {
			if (!isHome || movingRef.current) return;

			const targetIndex = floors.findIndex((item) => item.id === floor.id);
			const currentIndex = floors.findIndex(
				(item) => item.id === activeRef.current,
			);
			if (targetIndex < 0) return;

			movingRef.current = true;
			setMoving(true);
			setArrived(false);
			setTargetId(floor.id);
			setDirection(targetIndex > currentIndex ? "up" : "down");
			if (soundRef.current) liftAudio.click();

			const run = async () => {
				if (!reducedRef.current) {
					if (soundRef.current) liftAudio.doorClose();
					await doorsRef.current?.close();
					if (soundRef.current) liftAudio.travel(0.9);
				}

				const el =
					floor.id === "top" ? null : document.getElementById(floor.id);
				const y = el
					? Math.max(
							0,
							el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
						)
					: 0;

				if (reducedRef.current) {
					window.scrollTo({ top: y, behavior: "auto" });
				} else {
					await scrollToY(y);
				}

				activeRef.current = floor.id;
				setActiveId(floor.id);

				if (soundRef.current) {
					liftAudio.arrival();
					liftAudio.doorOpen();
				}
				setArrived(true);
				if (arrivalTimer.current) window.clearTimeout(arrivalTimer.current);
				arrivalTimer.current = window.setTimeout(() => setArrived(false), 900);

				if (!reducedRef.current) {
					await doorsRef.current?.open();
				}

				movingRef.current = false;
				setMoving(false);
				setTargetId(null);
				setDirection(null);
			};

			void run();
		},
		[isHome],
	);

	const value = useMemo<LiftContextValue>(
		() => ({
			active,
			target,
			moving,
			arrived,
			soundOn,
			toggleSound,
			direction,
			goTo,
			isHome,
		}),
		[
			active,
			target,
			moving,
			arrived,
			soundOn,
			toggleSound,
			direction,
			goTo,
			isHome,
		],
	);

	return (
		<LiftContext.Provider value={value}>
			{children}
			{isHome ? (
				<>
					<LiftShaft />
					<LiftPanel />
					<LiftDoors ref={doorsRef} label={(moving ? target : active).num} />
					<p className="sr-only" aria-live="polite">
						{moving
							? `Lift bergerak menuju lantai ${target.num}, ${target.label}`
							: `Lantai ${active.num}, ${active.label}`}
					</p>
				</>
			) : null}
		</LiftContext.Provider>
	);
}
