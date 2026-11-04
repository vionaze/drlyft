import { faqs } from "@/data/content";
import { services } from "@/data/services";
import { branches, site } from "@/data/site";
import { isPlaceholder } from "@/lib/wa";

export const SITE_URL = site.url.replace(/\/$/, "");

export function absolute(path: string): string {
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
	return {
		"@type": "Organization",
		"@id": `${SITE_URL}/#organization`,
		name: site.name,
		legalName: isPlaceholder(site.legalName) ? undefined : site.legalName,
		url: SITE_URL,
		slogan: site.tagline,
		description: site.description,
		sameAs: [site.socials.instagram, site.socials.tiktok],
		email: isPlaceholder(site.email) ? undefined : site.email,
	};
}

export function websiteSchema() {
	return {
		"@type": "WebSite",
		"@id": `${SITE_URL}/#website`,
		url: SITE_URL,
		name: site.name,
		description: site.description,
		inLanguage: "id-ID",
		publisher: { "@id": `${SITE_URL}/#organization` },
	};
}

export function branchSchemas() {
	return branches
		.filter((branch) => !isPlaceholder(branch.addressLine))
		.map((branch) => {
			const openingHours = branch.hours
				.filter((h) => !h.closed)
				.map((h) => ({
					"@type": "OpeningHoursSpecification",
					dayOfWeek: h.days,
					opens: h.open.replace(".", ":"),
					closes: h.close.replace(".", ":"),
				}));

			return {
				"@type": "GeneralContractor",
				"@id": `${SITE_URL}/#${branch.id}`,
				name: site.name,
				url: `${SITE_URL}/#cabang`,
				parentOrganization: { "@id": `${SITE_URL}/#organization` },
				telephone: isPlaceholder(branch.phoneE164)
					? undefined
					: branch.phoneE164,
				address: {
					"@type": "PostalAddress",
					streetAddress: branch.addressLine,
					addressLocality: branch.city,
					postalCode: isPlaceholder(branch.postalCode)
						? undefined
						: branch.postalCode,
					addressCountry: "ID",
				},
				areaServed: branch.coverage,
				openingHoursSpecification:
					openingHours.length > 0 ? openingHours : undefined,
				sameAs: branch.googleProfileUrl ? [branch.googleProfileUrl] : undefined,
			};
		});
}

export function serviceSchemas() {
	return services.map((service) => ({
		"@type": "Service",
		"@id": `${SITE_URL}/#layanan-${service.id}`,
		name: service.title,
		serviceType: service.title,
		description: service.summary,
		provider: { "@id": `${SITE_URL}/#organization` },
		areaServed: site.serviceArea,
	}));
}

export function faqSchema() {
	return {
		"@type": "FAQPage",
		"@id": `${SITE_URL}/#faq`,
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.q,
			acceptedAnswer: { "@type": "Answer", text: faq.a },
		})),
	};
}

export function homeJsonLd() {
	return {
		"@context": "https://schema.org",
		"@graph": [
			organizationSchema(),
			websiteSchema(),
			...branchSchemas(),
			...serviceSchemas(),
			faqSchema(),
		],
	};
}
