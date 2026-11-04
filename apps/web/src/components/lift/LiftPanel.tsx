"use client";

import type { MouseEvent } from "react";
import { Icon } from "@/components/Icon";
import { type Floor, floors } from "@/data/floors";
import { site } from "@/data/site";
import { waLink } from "@/lib/wa";
import { useLift } from "./lift-context";

const callMessage =
	"Halo Dokter Lift, saya ingin minta survey lift barang. Saya bisa bantu infokan lokasi, ukuran void, dan kapasitasnya.";

export function LiftPanel() {
	const {
		active,
		target,
		moving,
		arrived,
		soundOn,
		toggleSound,
		direction,
		goTo,
	} = useLift();
	const ordered = [...floors].reverse();

	const select = (event: MouseEvent<HTMLAnchorElement>, floor: Floor) => {
		event.preventDefault();
		goTo(floor);
	};

	const arrow = moving ? (direction === "up" ? "▲" : "▼") : "•";
	const shown = moving ? target : active;

	return (
		<>
			<aside className="lift-panel" aria-label="Panel lantai">
				<div className="lift-panel__top">
					<span className="lift-panel__eyebrow">DOOR CONTROL</span>
					<div
						className={`lift-led ${moving ? "is-moving" : ""} ${arrived ? "is-arriving" : ""}`}
						aria-hidden="true"
					>
						<span className="lift-led__arrow">{arrow}</span>
						<span className="lift-led__num">{shown.num}</span>
					</div>
					<span className="lift-panel__floor-label">{shown.short}</span>
				</div>

				<div className="lift-panel__floors">
					{ordered.map((floor) => {
						const isActive = active.id === floor.id;
						return (
							<a
								key={floor.id}
								href={`#${floor.id}`}
								onClick={(event) => select(event, floor)}
								aria-current={isActive ? "true" : undefined}
								className={`lift-floor ${isActive ? "is-active" : ""}`}
							>
								<span className="lift-floor__num">{floor.num}</span>
								<span className="lift-floor__label" aria-hidden="true">
									{floor.short}
								</span>
								<span className="sr-only">{floor.label}</span>
								<span className="lift-floor__led" aria-hidden="true" />
							</a>
						);
					})}
				</div>

				<button
					type="button"
					onClick={toggleSound}
					aria-pressed={soundOn}
					aria-label={
						soundOn
							? "SND ON — matikan suara lift"
							: "SND OFF — nyalakan suara lift"
					}
					className={`lift-sound ${soundOn ? "is-on" : ""}`}
				>
					<Icon
						name={soundOn ? "volume-on" : "volume-off"}
						className="h-3.5 w-3.5"
					/>
					<span>{soundOn ? "SND ON" : "SND OFF"}</span>
				</button>

				<a
					href={waLink(site.whatsappDefault, callMessage)}
					target="_blank"
					rel="noopener noreferrer"
					className="lift-call"
				>
					<Icon name="whatsapp" className="h-4 w-4" />
					<span>CALL</span>
					<span className="lift-call__sub">SURVEY</span>
				</a>
			</aside>

			<nav className="lift-console" aria-label="Panel lantai">
				<div className="lift-console__top">
					<div className="lift-console__left">
						<button
							type="button"
							onClick={toggleSound}
							aria-pressed={soundOn}
							aria-label={
								soundOn ? "Matikan suara lift" : "Nyalakan suara lift"
							}
							className={`lift-console__sound ${soundOn ? "is-on" : ""}`}
						>
							<Icon
								name={soundOn ? "volume-on" : "volume-off"}
								className="h-4 w-4"
							/>
						</button>
						<div
							className={`lift-console__readout ${arrived ? "is-arriving" : ""}`}
							aria-hidden="true"
						>
							<span className="lift-console__arrow">{arrow}</span>
							<span className="lift-console__num">{shown.num}</span>
							<span className="lift-console__label">{shown.short}</span>
						</div>
					</div>
					<a
						href={waLink(site.whatsappDefault, callMessage)}
						target="_blank"
						rel="noopener noreferrer"
						className="lift-console__call"
					>
						<Icon name="whatsapp" className="h-3.5 w-3.5" />
						CALL SURVEY
					</a>
				</div>

				<div className="lift-console__rail no-scrollbar">
					{floors.map((floor) => {
						const isActive = active.id === floor.id;
						return (
							<a
								key={floor.id}
								href={`#${floor.id}`}
								onClick={(event) => select(event, floor)}
								aria-current={isActive ? "true" : undefined}
								className={`lift-console__floor ${isActive ? "is-active" : ""}`}
							>
								<span>{floor.num}</span>
								<span className="sr-only">{floor.label}</span>
								<i aria-hidden="true" />
							</a>
						);
					})}
				</div>
			</nav>
		</>
	);
}
