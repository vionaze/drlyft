"use client";

import { useEffect, useRef, useState } from "react";
import { LiftDiagram } from "@/components/LiftDiagram";

type Mode = "svg" | "3d";

function canUseWebGL() {
	try {
		const canvas = document.createElement("canvas");
		return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
	} catch {
		return false;
	}
}

export function HeroInstrument() {
	const mountRef = useRef<HTMLDivElement>(null);
	const disposeRef = useRef<(() => void) | null>(null);
	const [mode, setMode] = useState<Mode>("svg");

	useEffect(() => {
		const wide = window.matchMedia("(min-width: 1024px)");
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		let cancelled = false;

		const teardown = () => {
			disposeRef.current?.();
			disposeRef.current = null;
			setMode("svg");
		};

		const boot = async () => {
			if (cancelled || !wide.matches || reduced.matches) return;
			if (disposeRef.current) return;
			const node = mountRef.current;
			if (!node || !canUseWebGL()) return;

			try {
				const { mountLiftScene } = await import("./mountLiftScene");
				if (cancelled || !mountRef.current || disposeRef.current) return;
				disposeRef.current = mountLiftScene(mountRef.current);
				setMode("3d");
			} catch {
				disposeRef.current = null;
			}
		};

		void boot();

		const onMediaChange = () => {
			if (!wide.matches || reduced.matches) {
				teardown();
			} else {
				void boot();
			}
		};

		wide.addEventListener("change", onMediaChange);
		reduced.addEventListener("change", onMediaChange);

		return () => {
			cancelled = true;
			wide.removeEventListener("change", onMediaChange);
			reduced.removeEventListener("change", onMediaChange);
			teardown();
		};
	}, []);

	return (
		<div className="instrument-frame ticks p-4 sm:p-6">
			<div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
				<div className="mono-label flex items-center gap-2 text-white/70">
					<span className="bg-red inline-block h-2 w-2" aria-hidden="true" />
					<span>
						{mode === "3d" ? "LIVE 3D — SHAFT" : "GBR. 01 — POTONGAN SHAFT"}
					</span>
				</div>
				<span className="mono text-[10px] tracking-[0.16em] text-white/50">
					{mode === "3d" ? "DRAG · ROTATE" : "CAD · NON-SKALA"}
				</span>
			</div>

			<div className="relative h-[320px] overflow-hidden rounded-[10px] sm:h-[380px] lg:h-[430px]">
				<div
					ref={mountRef}
					className={`lift-canvas transition-opacity duration-700 ${
						mode === "3d" ? "opacity-100" : "pointer-events-none opacity-0"
					}`}
					aria-hidden="true"
				/>

				<div
					className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
						mode === "3d" ? "pointer-events-none opacity-0" : "opacity-100"
					}`}
				>
					<LiftDiagram className="max-h-full w-auto max-w-[330px] text-white/85" />
				</div>

				{mode === "3d" ? (
					<span className="pointer-events-none absolute bottom-2 left-2 rounded-sm border border-white/15 bg-black/40 px-2 py-1 font-mono text-[8px] tracking-[0.16em] text-white/60 uppercase">
						Geser untuk memutar
					</span>
				) : null}
			</div>

			<div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
				<span className="mono-label text-white/55">
					Penggerak: Traction / Hydraulic
				</span>
				<span className="mono-label text-red">Uji beban &amp; BAST</span>
			</div>
		</div>
	);
}
