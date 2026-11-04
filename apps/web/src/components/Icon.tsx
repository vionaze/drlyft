import type { ReactNode } from "react";

type IconName =
	| "arrow-up-right"
	| "arrow-right"
	| "chevron-down"
	| "plus"
	| "minus"
	| "whatsapp"
	| "instagram"
	| "tiktok"
	| "phone"
	| "pin"
	| "clock"
	| "mail"
	| "check"
	| "build"
	| "install"
	| "service"
	| "parts"
	| "menu"
	| "close"
	| "volume-on"
	| "volume-off";

type IconProps = {
	name: IconName;
	className?: string;
	strokeWidth?: number;
};

const strokeIcons: Partial<Record<IconName, ReactNode>> = {
	"arrow-up-right": (
		<>
			<path d="M7 17 17 7" />
			<path d="M8 7h9v9" />
		</>
	),
	"arrow-right": (
		<>
			<path d="M4 12h15" />
			<path d="m13 6 6 6-6 6" />
		</>
	),
	"chevron-down": <path d="m6 9 6 6 6-6" />,
	plus: (
		<>
			<path d="M12 5v14" />
			<path d="M5 12h14" />
		</>
	),
	minus: <path d="M5 12h14" />,
	phone: (
		<path d="M6.6 3h2.2l1.5 4-2 1.4a12 12 0 0 0 5.3 5.3l1.4-2 4 1.5v2.2A2.6 2.6 0 0 1 16.4 18 13.4 13.4 0 0 1 3 4.6 2.6 2.6 0 0 1 6.6 3Z" />
	),
	pin: (
		<>
			<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
			<circle cx="12" cy="10" r="2.5" />
		</>
	),
	clock: (
		<>
			<circle cx="12" cy="12" r="8.5" />
			<path d="M12 7.5V12l3 2" />
		</>
	),
	mail: (
		<>
			<rect x="3.5" y="5.5" width="17" height="13" rx="1" />
			<path d="m4 7 8 6 8-6" />
		</>
	),
	check: <path d="m4 12 5 5L20 6" />,
	build: (
		<>
			<path d="M14.5 6.5a4 4 0 0 0 5 5L10 21H4v-6L14.5 6.5Z" />
			<path d="M14.5 6.5 17 4l3 3-2.5 2.5" />
		</>
	),
	install: (
		<>
			<path d="M12 3v10" />
			<path d="m8 9 4 4 4-4" />
			<path d="M4 19h16" />
		</>
	),
	service: (
		<>
			<circle cx="12" cy="12" r="3.4" />
			<path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8" />
		</>
	),
	parts: (
		<>
			<path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
			<path d="M4 7.5 12 12l8-4.5M12 12v9" />
		</>
	),
	menu: (
		<>
			<path d="M3 7h18" />
			<path d="M3 12h18" />
			<path d="M3 17h18" />
		</>
	),
	close: (
		<>
			<path d="m5 5 14 14" />
			<path d="M19 5 5 19" />
		</>
	),
	"volume-on": (
		<>
			<path d="M4 10v4h3l4 4V6L7 10H4Z" />
			<path d="M15 8.8a5 5 0 0 1 0 6.4" />
			<path d="M17.7 6.2a8.2 8.2 0 0 1 0 11.6" />
		</>
	),
	"volume-off": (
		<>
			<path d="M4 10v4h3l4 4V6L7 10H4Z" />
			<path d="m16 9.5 5 5" />
			<path d="m21 9.5-5 5" />
		</>
	),
};

const fillIcons: Partial<Record<IconName, ReactNode>> = {
	whatsapp: (
		<path
			fill="currentColor"
			stroke="none"
			d="M20.5 11.6A8.4 8.4 0 0 1 8.1 19L3.6 20.4l1.5-4.4a8.4 8.4 0 1 1 15.4-4.4Zm-8.4-5.9a6.6 6.6 0 0 0-5.6 10l.3.5-.9 2.3 2.4-.8.5.3a6.6 6.6 0 1 0 3.3-12.3Zm3.2 8.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.5.6c-.2.2-.4.2-.6.1a5.3 5.3 0 0 1-2.6-2.3c-.1-.2-.1-.4.1-.6l.5-.5c.1-.2.2-.4.1-.6l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.4 0-.6.4-.6.7-.9 1.5-.7 2.5.3 1.6 1.3 3.1 2.7 4.1 1 .7 2.2 1.1 3.2 1 .7-.1 1.2-.5 1.6-1.2.3-.6.2-1.1-.2-1.3Z"
		/>
	),
	instagram: (
		<>
			<rect
				x="3.4"
				y="3.4"
				width="17.2"
				height="17.2"
				rx="4.6"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<circle
				cx="12"
				cy="12"
				r="4"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
		</>
	),
	tiktok: (
		<path
			fill="currentColor"
			stroke="none"
			d="M15.1 3h2.4c.2 1.8 1.3 3.4 3 3.8v2.5c-1.2 0-2.4-.4-3.3-1v6.8a5.9 5.9 0 1 1-5.1-5.8v2.5a3.5 3.5 0 1 0 2.6 3.4V3Z"
		/>
	),
};

export function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
	const filled = fillIcons[name];

	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
			focusable="false"
		>
			{filled ?? strokeIcons[name]}
		</svg>
	);
}
