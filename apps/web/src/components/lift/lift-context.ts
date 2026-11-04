"use client";

import { createContext, useContext } from "react";
import type { Floor } from "@/data/floors";

export type LiftContextValue = {
	active: Floor;
	target: Floor;
	moving: boolean;
	arrived: boolean;
	soundOn: boolean;
	toggleSound: () => void;
	direction: "up" | "down" | null;
	goTo: (floor: Floor) => void;
	isHome: boolean;
};

export const LiftContext = createContext<LiftContextValue | null>(null);

export function useLift(): LiftContextValue {
	const value = useContext(LiftContext);
	if (!value) {
		throw new Error("useLift harus dipakai di dalam LiftProvider");
	}
	return value;
}
