export function LiftDiagram({ className = "" }: { className?: string }) {
	const floors = [
		{ y: 150, label: "LT 04", elevation: "+12.0m" },
		{ y: 260, label: "LT 03", elevation: "+8.0m" },
		{ y: 370, label: "LT 02", elevation: "+4.0m" },
		{ y: 480, label: "LT 01", elevation: "±0.0m" },
	];

	return (
		<svg
			viewBox="0 0 460 620"
			className={className}
			fill="none"
			aria-hidden="true"
			focusable="false"
		>
			{/* Precision Circular Calibration Dial (Anime.js / Lightweight inspired) */}
			<g className="orbit-slow" opacity="0.22">
				<circle
					cx="230"
					cy="330"
					r="192"
					stroke="currentColor"
					strokeWidth="1"
					strokeDasharray="2 8"
				/>
				<circle
					cx="230"
					cy="330"
					r="174"
					stroke="var(--color-red)"
					strokeWidth="1"
					strokeDasharray="24 46 8 46"
				/>
			</g>
			<circle
				cx="230"
				cy="330"
				r="204"
				stroke="currentColor"
				strokeWidth="0.75"
				opacity="0.14"
			/>

			{/* Corner Crosshairs (+) */}
			{[
				[40, 40],
				[420, 40],
				[40, 580],
				[420, 580],
			].map(([cx, cy]) => (
				<g
					key={`${cx}-${cy}`}
					stroke="currentColor"
					strokeWidth="1.2"
					opacity="0.55"
				>
					<line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} />
					<line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} />
				</g>
			))}

			{/* Outer measurement frame */}
			<g stroke="currentColor" strokeWidth="1" opacity="0.18">
				<line x1="40" y1="40" x2="40" y2="580" />
				<line x1="420" y1="40" x2="420" y2="580" />
				<line x1="40" y1="40" x2="420" y2="40" />
				<line x1="40" y1="580" x2="420" y2="580" />
			</g>

			{/* Building shaft envelope */}
			<rect
				x="92"
				y="66"
				width="276"
				height="514"
				stroke="currentColor"
				strokeWidth="1.25"
				opacity="0.48"
			/>
			<rect
				x="96"
				y="70"
				width="268"
				height="506"
				stroke="currentColor"
				strokeWidth="0.75"
				strokeDasharray="3 5"
				opacity="0.2"
			/>

			{/* Floors & Elevation markers */}
			{floors.map((floor) => (
				<g key={floor.label}>
					<line
						x1="92"
						y1={floor.y}
						x2="368"
						y2={floor.y}
						stroke="currentColor"
						strokeWidth="1"
						opacity="0.32"
					/>
					<circle
						cx="92"
						cy={floor.y}
						r="2.5"
						fill="var(--color-red)"
						opacity="0.85"
					/>
					<text
						x="80"
						y={floor.y - 3}
						fill="currentColor"
						opacity="0.75"
						fontSize="8.5"
						letterSpacing="1.4"
						fontFamily="var(--font-mono)"
						textAnchor="end"
					>
						{floor.label}
					</text>
					<text
						x="80"
						y={floor.y + 9}
						fill="currentColor"
						opacity="0.42"
						fontSize="7.5"
						letterSpacing="1"
						fontFamily="var(--font-mono)"
						textAnchor="end"
					>
						{floor.elevation}
					</text>
				</g>
			))}

			{/* Guide rails */}
			<g stroke="currentColor" strokeWidth="2" className="draw-line">
				<line x1="168" y1="80" x2="168" y2="566" />
				<line x1="292" y1="80" x2="292" y2="566" />
			</g>

			{/* Traction Sheave / Pulley + Hoist Cables */}
			<circle cx="230" cy="84" r="14" stroke="currentColor" strokeWidth="1.4" />
			<circle cx="230" cy="84" r="5" fill="var(--color-red)" />
			<line
				x1="226"
				y1="98"
				x2="226"
				y2="302"
				stroke="currentColor"
				strokeWidth="1"
				strokeDasharray="4 4"
				opacity="0.75"
			/>
			<line
				x1="234"
				y1="98"
				x2="234"
				y2="302"
				stroke="currentColor"
				strokeWidth="1"
				strokeDasharray="4 4"
				opacity="0.45"
			/>
			<line
				x1="244"
				y1="84"
				x2="330"
				y2="84"
				stroke="currentColor"
				strokeWidth="1"
				opacity="0.6"
			/>
			<line
				x1="330"
				y1="84"
				x2="330"
				y2="196"
				stroke="currentColor"
				strokeWidth="1"
				strokeDasharray="4 5"
				opacity="0.6"
			/>

			{/* Counterweight assembly */}
			<rect
				x="316"
				y="196"
				width="28"
				height="104"
				fill="rgba(255,255,255,0.03)"
				stroke="currentColor"
				strokeWidth="1.25"
				opacity="0.85"
			/>
			<g stroke="currentColor" strokeWidth="0.75" opacity="0.45">
				<line x1="316" y1="216" x2="344" y2="216" />
				<line x1="316" y1="236" x2="344" y2="236" />
				<line x1="316" y1="256" x2="344" y2="256" />
				<line x1="316" y1="276" x2="344" y2="276" />
			</g>

			{/* Lift Car / Cabin with Ember Glow */}
			<rect
				x="174"
				y="298"
				width="112"
				height="120"
				stroke="var(--color-red)"
				strokeWidth="0.75"
				strokeDasharray="3 3"
				opacity="0.5"
			/>
			<rect
				x="178"
				y="302"
				width="104"
				height="112"
				fill="rgba(225, 6, 0, 0.08)"
				stroke="var(--color-red)"
				strokeWidth="2"
			/>
			<line
				x1="230"
				y1="302"
				x2="230"
				y2="414"
				stroke="currentColor"
				strokeWidth="1"
				opacity="0.4"
			/>
			<g stroke="currentColor" strokeWidth="1" opacity="0.35">
				{[318, 330, 342, 354, 366, 378, 390, 402].map((y) => (
					<line key={y} x1="178" y1={y} x2="282" y2={y} />
				))}
			</g>

			{/* Palletized Cargo Load */}
			<g stroke="currentColor" strokeWidth="1.2" opacity="0.92">
				<rect
					x="192"
					y="348"
					width="32"
					height="50"
					fill="rgba(255,255,255,0.06)"
				/>
				<rect
					x="228"
					y="362"
					width="38"
					height="36"
					fill="rgba(255,255,255,0.06)"
				/>
				<line
					x1="188"
					y1="404"
					x2="272"
					y2="404"
					stroke="var(--color-red)"
					strokeWidth="1.5"
				/>
			</g>

			{/* Direction Vector Arrows */}
			<g className="pulse-mark" fill="var(--color-red)">
				<path d="M230 122 216 146h28z" />
				<path d="M230 102 216 126h28z" opacity="0.5" />
			</g>

			{/* Dimension Callout: Cabin Height */}
			<g stroke="currentColor" opacity="0.75">
				<line x1="140" y1="302" x2="140" y2="414" />
				<line x1="134" y1="302" x2="146" y2="302" />
				<line x1="134" y1="414" x2="146" y2="414" />
			</g>
			<text
				x="128"
				y="358"
				fill="currentColor"
				opacity="0.85"
				fontSize="8.5"
				letterSpacing="1.6"
				fontFamily="var(--font-mono)"
				textAnchor="middle"
				transform="rotate(-90 128 358)"
			>
				KABIN CUSTOM
			</text>

			{/* Dimension Callout: Travel Height */}
			<g stroke="var(--color-red)" opacity="0.95">
				<line x1="382" y1="80" x2="382" y2="566" />
				<line x1="376" y1="80" x2="388" y2="80" />
				<line x1="376" y1="566" x2="388" y2="566" />
			</g>
			<text
				x="400"
				y="330"
				fill="var(--color-red)"
				fontSize="8.5"
				letterSpacing="1.6"
				fontFamily="var(--font-mono)"
				textAnchor="middle"
				transform="rotate(-90 400 330)"
			>
				TINGGI ANGKAT
			</text>

			{/* Pit buffer base */}
			<g stroke="currentColor" strokeWidth="1.2" opacity="0.55">
				<line x1="160" y1="566" x2="300" y2="566" />
				<rect x="192" y="554" width="16" height="12" />
				<rect x="252" y="554" width="16" height="12" />
			</g>

			<text
				x="230"
				y="604"
				fill="currentColor"
				opacity="0.75"
				fontSize="8.5"
				letterSpacing="1.8"
				fontFamily="var(--font-mono)"
				textAnchor="middle"
			>
				KAPASITAS 500 KG — 10 TON
			</text>
		</svg>
	);
}
