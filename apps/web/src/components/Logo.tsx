type LogoProps = {
	variant?: "light" | "dark";
	className?: string;
	priority?: boolean;
};

const dims = {
	light: { src: "/brand/logo-light.png", width: 700, height: 220 },
	dark: { src: "/brand/logo-dark.png", width: 700, height: 227 },
};

export function Logo({
	variant = "light",
	className = "",
	priority = false,
}: LogoProps) {
	const { src, width, height } = dims[variant];

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={src}
			alt="Dokter Lift — The Art of the Lift"
			width={width}
			height={height}
			className={className}
			fetchPriority={priority ? "high" : "auto"}
			decoding="async"
		/>
	);
}
