export function isPlaceholder(value?: string | null): boolean {
	if (!value) return true;
	return /\[ISI|contoh|xxxx|1234567890/i.test(value);
}

export function normalizePhone(input: string): string {
	const cleaned = input.replace(/[^\d+]/g, "");
	if (cleaned.startsWith("+62")) return cleaned.slice(1);
	if (cleaned.startsWith("62")) return cleaned;
	if (cleaned.startsWith("0")) return `62${cleaned.slice(1)}`;
	return cleaned;
}

export function isValidPhone(input: string): boolean {
	const normalized = normalizePhone(input);
	return /^62\d{8,14}$/.test(normalized);
}

export function waLink(number: string, message: string): string {
	const normalized = normalizePhone(number);
	return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export type SurveyInput = {
	name: string;
	company?: string;
	phone: string;
	city: string;
	branch: string;
	liftType: string;
	capacity: string;
	voidSize?: string;
	power?: string;
	floors: string;
	need: string;
	notes?: string;
};

export function surveyMessage(input: SurveyInput): string {
	const lines = [
		"Halo Dokter Lift, saya ingin minta survey.",
		"",
		`Nama: ${input.name}`,
		input.company ? `Perusahaan: ${input.company}` : null,
		`WhatsApp: ${input.phone}`,
		`Lokasi: ${input.city}`,
		input.branch ? `Tujuan: ${input.branch}` : null,
		`Jenis lift: ${input.liftType}`,
		input.capacity ? `Kapasitas: ${input.capacity}` : null,
		input.voidSize ? `Ukuran void (P×L×T): ${input.voidSize}` : null,
		input.power ? `Daya listrik: ${input.power}` : null,
		input.floors ? `Jumlah lantai: ${input.floors}` : null,
		`Kebutuhan: ${input.need}`,
		input.notes ? `Catatan: ${input.notes}` : null,
	].filter(Boolean);

	return lines.join("\n");
}

export function serviceMessage(service: string): string {
	return `Halo Dokter Lift, saya ingin bertanya tentang layanan ${service}. Bisa dibantu?`;
}

export function branchMessage(branch: string): string {
	return `Halo Dokter Lift ${branch}, saya ingin konsultasi soal lift barang. Bisa dibantu?`;
}
