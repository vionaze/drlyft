"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { branches, site } from "@/data/site";
import { isPlaceholder, isValidPhone, surveyMessage, waLink } from "@/lib/wa";

const liftOptions = [
	"Lift barang",
	"Lift barang custom",
	"Lift makanan (dumbwaiter)",
	"Lift rumahan (home lift)",
	"Belum tahu",
];
const needOptions = [
	"Unit baru",
	"Servis / maintenance",
	"Perbaikan",
	"Spare part",
	"Konsultasi teknis",
];

type FormState = {
	name: string;
	company: string;
	phone: string;
	city: string;
	branch: string;
	liftType: string;
	capacity: string;
	voidSize: string;
	power: string;
	floors: string;
	need: string;
	notes: string;
};

const initial: FormState = {
	name: "",
	company: "",
	phone: "",
	city: "",
	branch: branches[0]?.id ?? "",
	liftType: liftOptions[0] ?? "",
	capacity: "",
	voidSize: "",
	power: "1 Phase 220 V",
	floors: "",
	need: needOptions[0] ?? "",
	notes: "",
};

export function SurveyForm() {
	const [form, setForm] = useState<FormState>(initial);
	const [errors, setErrors] = useState<
		Partial<Record<keyof FormState, string>>
	>({});
	const [sent, setSent] = useState<string | null>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const branch = params.get("cabang");
		const layanan = params.get("layanan");

		setForm((current) => ({
			...current,
			branch: branches.some((item) => item.id === branch)
				? (branch as string)
				: current.branch,
			notes: layanan ? `Tertarik layanan: ${layanan}` : current.notes,
		}));
	}, []);

	const set = (key: keyof FormState) => (value: string) => {
		setForm((current) => ({ ...current, [key]: value }));
		setErrors((current) => ({ ...current, [key]: undefined }));
	};

	const validate = () => {
		const next: Partial<Record<keyof FormState, string>> = {};
		if (form.name.trim().length < 2) next.name = "Isi nama minimal 2 karakter.";
		if (!isValidPhone(form.phone))
			next.phone = "Gunakan format 08xx atau +62xx.";
		if (form.city.trim().length < 2) next.city = "Isi kota atau lokasi proyek.";
		if (!form.branch) next.branch = "Pilih cabang.";
		if (!form.liftType) next.liftType = "Pilih jenis lift.";
		if (!form.need) next.need = "Pilih kebutuhan.";
		return next;
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const next = validate();
		setErrors(next);

		if (Object.keys(next).length > 0) {
			const first = Object.keys(next)[0];
			document.getElementById(`survey-${first}`)?.focus();
			return;
		}

		const branch =
			branches.find((item) => item.id === form.branch) ?? branches[0];
		if (!branch) return;

		const url = waLink(
			branch.whatsappE164,
			surveyMessage({
				name: form.name.trim(),
				company: form.company.trim(),
				phone: form.phone.trim(),
				city: form.city.trim(),
				branch: branch.label,
				liftType: form.liftType,
				capacity: form.capacity.trim(),
				voidSize: form.voidSize.trim(),
				power: form.power,
				floors: form.floors.trim(),
				need: form.need,
				notes: form.notes.trim(),
			}),
		);

		setSent(url);
		window.open(url, "_blank", "noopener,noreferrer");
	};

	const errorCount = Object.keys(errors).filter(
		(key) => errors[key as keyof FormState],
	).length;
	const branch =
		branches.find((item) => item.id === form.branch) ?? branches[0];

	return (
		<form onSubmit={onSubmit} noValidate className="grid gap-6">
			<div aria-live="polite" className="min-h-[18px]">
				{errorCount > 0 ? (
					<p className="field-error">
						{errorCount} kolom perlu diperiksa sebelum pesan dikirim.
					</p>
				) : null}
			</div>

			<div className="grid gap-6 sm:grid-cols-2">
				<div className="field">
					<label className="field-label" htmlFor="survey-name">
						Nama <span className="text-[#ff6b60]">*</span>
					</label>
					<input
						id="survey-name"
						className={`field-input ${errors.name ? "field-invalid" : ""}`}
						value={form.name}
						onChange={(event) => set("name")(event.target.value)}
						autoComplete="name"
						placeholder="Nama Anda"
						aria-invalid={Boolean(errors.name)}
						aria-describedby={errors.name ? "survey-name-error" : undefined}
					/>
					{errors.name ? (
						<p id="survey-name-error" className="field-error">
							{errors.name}
						</p>
					) : null}
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-company">
						Perusahaan
					</label>
					<input
						id="survey-company"
						className="field-input"
						value={form.company}
						onChange={(event) => set("company")(event.target.value)}
						autoComplete="organization"
						placeholder="Opsional"
					/>
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-phone">
						WhatsApp <span className="text-[#ff6b60]">*</span>
					</label>
					<input
						id="survey-phone"
						type="tel"
						inputMode="tel"
						className={`field-input ${errors.phone ? "field-invalid" : ""}`}
						value={form.phone}
						onChange={(event) => set("phone")(event.target.value)}
						autoComplete="tel"
						placeholder="08xx xxxx xxxx"
						aria-invalid={Boolean(errors.phone)}
						aria-describedby={errors.phone ? "survey-phone-error" : undefined}
					/>
					{errors.phone ? (
						<p id="survey-phone-error" className="field-error">
							{errors.phone}
						</p>
					) : null}
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-city">
						Kota / lokasi proyek <span className="text-[#ff6b60]">*</span>
					</label>
					<input
						id="survey-city"
						className={`field-input ${errors.city ? "field-invalid" : ""}`}
						value={form.city}
						onChange={(event) => set("city")(event.target.value)}
						placeholder="mis. Jakarta Utara"
						aria-invalid={Boolean(errors.city)}
						aria-describedby={errors.city ? "survey-city-error" : undefined}
					/>
					{errors.city ? (
						<p id="survey-city-error" className="field-error">
							{errors.city}
						</p>
					) : null}
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-branch">
						Cabang tujuan
					</label>
					<select
						id="survey-branch"
						className="field-input"
						value={form.branch}
						onChange={(event) => set("branch")(event.target.value)}
					>
						{branches.map((item) => (
							<option key={item.id} value={item.id}>
								{item.label}
							</option>
						))}
					</select>
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-liftType">
						Jenis lift
					</label>
					<select
						id="survey-liftType"
						className="field-input"
						value={form.liftType}
						onChange={(event) => set("liftType")(event.target.value)}
					>
						{liftOptions.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-capacity">
						Kapasitas perkiraan
					</label>
					<input
						id="survey-capacity"
						className="field-input"
						value={form.capacity}
						onChange={(event) => set("capacity")(event.target.value)}
						placeholder="mis. 1.500 kg"
					/>
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-floors">
						Jumlah lantai
					</label>
					<input
						id="survey-floors"
						className="field-input"
						value={form.floors}
						onChange={(event) => set("floors")(event.target.value)}
						placeholder="mis. 3 lantai"
					/>
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-voidSize">
						Ukuran void (P × L × T)
					</label>
					<input
						id="survey-voidSize"
						className="field-input"
						value={form.voidSize}
						onChange={(event) => set("voidSize")(event.target.value)}
						placeholder="mis. 200 × 180 × 400 cm"
					/>
				</div>

				<div className="field">
					<label className="field-label" htmlFor="survey-power">
						Daya listrik
					</label>
					<select
						id="survey-power"
						className="field-input"
						value={form.power}
						onChange={(event) => set("power")(event.target.value)}
					>
						<option value="1 Phase 220 V">1 Phase 220 V</option>
						<option value="3 Phase 380 V">3 Phase 380 V</option>
						<option value="Belum tahu">Belum tahu</option>
					</select>
				</div>

				<div className="field sm:col-span-2">
					<label className="field-label" htmlFor="survey-need">
						Kebutuhan
					</label>
					<select
						id="survey-need"
						className="field-input"
						value={form.need}
						onChange={(event) => set("need")(event.target.value)}
					>
						{needOptions.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className="field sm:col-span-2">
					<label className="field-label" htmlFor="survey-notes">
						Catatan
					</label>
					<textarea
						id="survey-notes"
						className="field-input"
						value={form.notes}
						onChange={(event) => set("notes")(event.target.value)}
						placeholder="Kondisi ruang, akses, barang yang diangkut, atau kendala unit saat ini."
					/>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<noscript>
					<a
						href={waLink(
							branch?.whatsappE164 ?? site.whatsappDefault,
							"Halo Dokter Lift, saya ingin minta survey lift barang. Saya bisa bantu infokan lokasi, ukuran void, dan kapasitasnya. (JavaScript di browser saya nonaktif.)",
						)}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-red w-full self-start sm:w-auto"
					>
						Kirim via WhatsApp
						<span className="btn-icon">
							<Icon name="whatsapp" />
						</span>
					</a>
				</noscript>
				<button
					type="submit"
					className="btn btn-red w-full self-start sm:w-auto"
				>
					Kirim via WhatsApp
					<span className="btn-icon">
						<Icon name="whatsapp" />
					</span>
				</button>

				<p className="mono-label max-w-[52ch] leading-relaxed text-white/55">
					Pesan disusun otomatis dan dikirim ke WhatsApp {branch?.label}. Situs
					ini tidak menyimpan data di server — baca{" "}
					<a
						href="/kebijakan-privasi"
						className="underline decoration-white/30 underline-offset-4"
					>
						kebijakan privasi
					</a>
					.
				</p>

				{process.env.NODE_ENV !== "production" &&
				branch &&
				isPlaceholder(branch.whatsappE164) ? (
					<p className="mono-label border border-white/15 px-3 py-2 text-white/60">
						Nomor WhatsApp masih contoh — ganti di apps/web/src/data/site.ts
					</p>
				) : null}
			</div>

			{sent ? (
				<div
					aria-live="polite"
					className="border border-white/20 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/75"
				>
					<p className="font-medium text-white">
						Pesan WhatsApp sudah disiapkan.
					</p>
					<p className="mt-1">
						Jika tab baru tidak terbuka (pop-up diblokir),{" "}
						<a
							href={sent}
							target="_blank"
							rel="noopener noreferrer"
							className="underline decoration-white/40 underline-offset-4"
						>
							buka WhatsApp di sini
						</a>
						.
					</p>
				</div>
			) : null}
		</form>
	);
}
