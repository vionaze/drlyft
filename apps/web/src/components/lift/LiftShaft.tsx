"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { floors } from "@/data/floors";
import { useLift } from "./lift-context";

export function LiftShaft() {
	const { active } = useLift();
	const rootRef = useRef<HTMLDivElement>(null);
	const carRef = useRef<HTMLDivElement>(null);
	const fillRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const car = carRef.current;
		const root = rootRef.current;
		if (!car || !root) return;

		const move = gsap.quickTo(car, "y", {
			duration: 0.55,
			ease: "power3.out",
		});

		let frame = 0;
		const update = () => {
			frame = 0;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			const progress =
				max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
			const travel = root.clientHeight - 150;
			move(-progress * travel);
			if (fillRef.current) {
				fillRef.current.style.height = `${8 + progress * 84}%`;
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
	}, []);

	return (
		<div ref={rootRef} className="lift-shaft" aria-hidden="true">
			<span className="lift-shaft__label">SHAFT</span>
			<span className="lift-shaft__line" />
			<span ref={fillRef} className="lift-shaft__fill" />
			<div className="lift-shaft__ticks">
				{floors.map((floor, index) => (
					<span
						key={floor.id}
						className={`lift-shaft__tick ${active.id === floor.id ? "is-active" : ""}`}
						style={{ bottom: `${8 + (index / (floors.length - 1)) * 84}%` }}
					>
						{floor.num}
					</span>
				))}
			</div>
			<div ref={carRef} className="lift-shaft__car">
				<span className="lift-shaft__car-door" />
				<span className="lift-shaft__car-light" />
			</div>
		</div>
	);
}
