import type { Metadata } from "next";
import { Branches } from "@/components/Branches";
import { JournalTeaser } from "@/components/blog/JournalTeaser";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Survey } from "@/components/Survey";
import { Types } from "@/components/Types";
import { getAllPosts } from "@/lib/blog";
import { branchSchemas, faqSchema, serviceSchemas } from "@/lib/seo";

export const metadata: Metadata = {
	alternates: { canonical: "/" },
};

export default function HomePage() {
	return (
		<>
			<Hero />
			<Marquee />
			<Services />
			<Types />
			<Process />
			<Branches />
			<JournalTeaser posts={getAllPosts().slice(0, 2)} />
			<Faq />
			<Survey />
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@graph": [...branchSchemas(), ...serviceSchemas(), faqSchema()],
				}}
			/>
		</>
	);
}
