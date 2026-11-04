"use client";

import gsap from "gsap";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";

export type LiftDoorsHandle = {
	open: () => Promise<void>;
	close: () => Promise<void>;
};

type LiftDoorsProps = {
	label: string;
};

function motionAllowed() {
	return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const LiftDoors = forwardRef<LiftDoorsHandle, LiftDoorsProps>(
	function LiftDoors({ label }, ref) {
		const rootRef = useRef<HTMLDivElement>(null);
		const leftRef = useRef<HTMLDivElement>(null);
		const rightRef = useRef<HTMLDivElement>(null);
		const openingRef = useRef(false);

		const complete = (open: boolean) => {
			const root = rootRef.current;
			if (!root) return;
			root.dataset.open = open ? "true" : "false";
			root.style.pointerEvents = open ? "none" : "auto";
		};

		const open = useCallback(async () => {
			const left = leftRef.current;
			const right = rightRef.current;
			if (!left || !right || openingRef.current) return;
			openingRef.current = true;

			if (!motionAllowed()) {
				gsap.set(left, { xPercent: -101 });
				gsap.set(right, { xPercent: 101 });
				complete(true);
				openingRef.current = false;
				return;
			}

			await new Promise<void>((resolve) => {
				const timeline = gsap.timeline({
					onComplete: () => {
						complete(true);
						openingRef.current = false;
						resolve();
					},
				});
				timeline
					.to(left, {
						xPercent: -101,
						duration: 0.72,
						ease: "expo.inOut",
					})
					.to(right, { xPercent: 101, duration: 0.72, ease: "expo.inOut" }, 0);
			});
		}, []);

		const close = useCallback(async () => {
			const left = leftRef.current;
			const right = rightRef.current;
			if (!left || !right || openingRef.current) return;
			openingRef.current = true;
			complete(false);

			if (!motionAllowed()) {
				gsap.set([left, right], { xPercent: 0 });
				openingRef.current = false;
				return;
			}

			await new Promise<void>((resolve) => {
				const timeline = gsap.timeline({
					onComplete: () => {
						openingRef.current = false;
						resolve();
					},
				});
				timeline
					.to(left, { xPercent: 0, duration: 0.4, ease: "power3.inOut" })
					.to(right, { xPercent: 0, duration: 0.4, ease: "power3.inOut" }, 0);
			});
		}, []);

		useImperativeHandle(ref, () => ({ open, close }), [open, close]);

		useEffect(() => {
			const left = leftRef.current;
			const right = rightRef.current;
			if (!left || !right) return;

			gsap.set([left, right], { xPercent: 0 });
			const timer = window.setTimeout(() => {
				void open();
			}, 420);

			return () => window.clearTimeout(timer);
		}, [open]);

		return (
			<div
				ref={rootRef}
				className="lift-doors"
				data-open="false"
				aria-hidden="true"
			>
				<div ref={leftRef} className="lift-door lift-door--left">
					<div className="lift-door__strip" />
					<span className="lift-door__brand">DOKTER LIFT</span>
					<span className="lift-door__tag">THE ART OF THE LIFT</span>
				</div>
				<div ref={rightRef} className="lift-door lift-door--right">
					<div className="lift-door__strip" />
					<div className="lift-door__readout">
						<span className="lift-door__readout-label">LANTAI</span>
						<span className="lift-door__readout-num">{label}</span>
					</div>
					<span className="lift-door__hint">PINTU MENUTUP</span>
				</div>
			</div>
		);
	},
);
