import { branches } from "@/data/site";

export function DevRibbon() {
	if (process.env.NODE_ENV === "production") return null;
	const pending = branches.some((branch) => branch.isPlaceholder);
	if (!pending) return null;

	return (
		<div className="bg-ink/95 fixed bottom-4 left-4 z-40 hidden border border-white/20 px-3 py-2 font-mono text-[9px] tracking-[0.14em] text-white/70 uppercase md:block">
			Pratinjau · data bertanda [ISI] belum final
		</div>
	);
}
