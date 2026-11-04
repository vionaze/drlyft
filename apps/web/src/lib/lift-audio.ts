/**
 * Sound FX lift, disintesis penuh dengan Web Audio (tanpa file audio).
 * Semua fungsi aman dipanggil sebelum AudioContext siap — akan dibuat
 * saat interaksi pertama (klik tombol lantai / toggle suara).
 */

type Engine = {
	ctx: AudioContext;
	master: GainNode;
	reverb: ConvolverNode;
};

let engine: Engine | null = null;

function noiseBuffer(ctx: AudioContext, seconds: number) {
	const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
	const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i += 1) {
		data[i] = Math.random() * 2 - 1;
	}
	return buffer;
}

function impulse(ctx: AudioContext, seconds = 1.3) {
	const length = Math.floor(ctx.sampleRate * seconds);
	const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
	for (let channel = 0; channel < 2; channel += 1) {
		const data = buffer.getChannelData(channel);
		for (let i = 0; i < length; i += 1) {
			data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3.2;
		}
	}
	return buffer;
}

function getEngine(): Engine | null {
	if (typeof window === "undefined") return null;
	if (engine) {
		if (engine.ctx.state === "suspended") void engine.ctx.resume();
		return engine;
	}
	const Ctx = window.AudioContext;
	if (!Ctx) return null;
	try {
		const ctx = new Ctx();
		const master = ctx.createGain();
		master.gain.value = 0.64; // default 20% lebih pelan dari 0.8
		const compressor = ctx.createDynamicsCompressor();
		compressor.threshold.value = -18;
		compressor.knee.value = 18;
		compressor.ratio.value = 6;
		master.connect(compressor);
		compressor.connect(ctx.destination);

		const reverb = ctx.createConvolver();
		reverb.buffer = impulse(ctx);
		const wet = ctx.createGain();
		wet.gain.value = 0.24;
		reverb.connect(wet);
		wet.connect(master);

		engine = { ctx, master, reverb };
		void ctx.resume();
		return engine;
	} catch {
		return null;
	}
}

function bell(
	{ ctx, master, reverb }: Engine,
	frequency: number,
	when: number,
	decay: number,
	level: number,
) {
	const partials: [number, number][] = [
		[1, 1],
		[2.01, 0.5],
		[3.01, 0.26],
		[4.17, 0.14],
		[5.43, 0.07],
	];
	for (const [ratio, amount] of partials) {
		const oscillator = ctx.createOscillator();
		oscillator.type = "sine";
		oscillator.frequency.value = frequency * ratio;
		const gain = ctx.createGain();
		gain.gain.setValueAtTime(0.0001, when);
		gain.gain.linearRampToValueAtTime(level * amount, when + 0.006);
		gain.gain.exponentialRampToValueAtTime(
			0.0001,
			when + decay * (1 - ratio * 0.08),
		);
		oscillator.connect(gain);
		gain.connect(master);
		gain.connect(reverb);
		oscillator.start(when);
		oscillator.stop(when + decay * 1.1);
	}

	const strike = ctx.createBufferSource();
	strike.buffer = noiseBuffer(ctx, 0.04);
	const filter = ctx.createBiquadFilter();
	filter.type = "highpass";
	filter.frequency.value = 2600;
	const strikeGain = ctx.createGain();
	strikeGain.gain.setValueAtTime(level * 0.5, when);
	strikeGain.gain.exponentialRampToValueAtTime(0.0001, when + 0.06);
	strike.connect(filter);
	filter.connect(strikeGain);
	strikeGain.connect(master);
	strike.start(when);
	strike.stop(when + 0.07);
}

function noiseBurst(
	{ ctx, master }: Engine,
	when: number,
	duration: number,
	frequency: number,
	level: number,
	type: BiquadFilterType = "bandpass",
) {
	const source = ctx.createBufferSource();
	source.buffer = noiseBuffer(ctx, duration + 0.05);
	const filter = ctx.createBiquadFilter();
	filter.type = type;
	filter.frequency.value = frequency;
	filter.Q.value = 0.9;
	const gain = ctx.createGain();
	gain.gain.setValueAtTime(0.0001, when);
	gain.gain.linearRampToValueAtTime(level, when + 0.008);
	gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
	source.connect(filter);
	filter.connect(gain);
	gain.connect(master);
	source.start(when);
	source.stop(when + duration + 0.06);
}

export const liftAudio = {
	/** Klik tombol panel — "tick" pendek seperti tombol lift. */
	click() {
		const e = getEngine();
		if (!e) return;
		const now = e.ctx.currentTime;
		const oscillator = e.ctx.createOscillator();
		oscillator.type = "sine";
		oscillator.frequency.value = 1500;
		const gain = e.ctx.createGain();
		gain.gain.setValueAtTime(0.03, now);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
		oscillator.connect(gain);
		gain.connect(e.master);
		oscillator.start(now);
		oscillator.stop(now + 0.07);
		noiseBurst(e, now, 0.03, 3000, 0.02, "highpass");
	},

	/** Pintu menutup: relay, desis, lalu hentakan pelan. */
	doorClose() {
		const e = getEngine();
		if (!e) return;
		const now = e.ctx.currentTime;
		noiseBurst(e, now, 0.05, 1800, 0.045);
		noiseBurst(e, now + 0.05, 0.38, 380, 0.05, "lowpass");

		const thud = e.ctx.createOscillator();
		thud.type = "sine";
		thud.frequency.setValueAtTime(112, now + 0.26);
		thud.frequency.exponentialRampToValueAtTime(48, now + 0.5);
		const thudGain = e.ctx.createGain();
		thudGain.gain.setValueAtTime(0.0001, now + 0.26);
		thudGain.gain.linearRampToValueAtTime(0.075, now + 0.3);
		thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);
		thud.connect(thudGain);
		thudGain.connect(e.master);
		thud.start(now + 0.26);
		thud.stop(now + 0.64);
	},

	/** Motor lift: dengung rendah selama perjalanan. */
	travel(durationSeconds = 0.9) {
		const e = getEngine();
		if (!e) return;
		const now = e.ctx.currentTime;
		const oscillator = e.ctx.createOscillator();
		oscillator.type = "sawtooth";
		oscillator.frequency.setValueAtTime(46, now);
		oscillator.frequency.linearRampToValueAtTime(
			58,
			now + durationSeconds * 0.5,
		);
		oscillator.frequency.linearRampToValueAtTime(42, now + durationSeconds);
		const filter = e.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 150;
		const gain = e.ctx.createGain();
		gain.gain.setValueAtTime(0.0001, now);
		gain.gain.linearRampToValueAtTime(0.018, now + 0.12);
		gain.gain.setValueAtTime(0.018, now + durationSeconds * 0.7);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);
		oscillator.connect(filter);
		filter.connect(gain);
		gain.connect(e.master);
		oscillator.start(now);
		oscillator.stop(now + durationSeconds + 0.05);

		noiseBurst(e, now, durationSeconds, 180, 0.008, "lowpass");
	},

	/** Tiba: ding-dong metalik khas lift. */
	arrival() {
		const e = getEngine();
		if (!e) return;
		const now = e.ctx.currentTime;
		bell(e, 987.77, now, 1.5, 0.11);
		bell(e, 739.99, now + 0.32, 1.8, 0.095);
	},

	/** Pintu membuka: whoosh halus + relay. */
	doorOpen() {
		const e = getEngine();
		if (!e) return;
		const now = e.ctx.currentTime;
		noiseBurst(e, now, 0.06, 2000, 0.03);
		noiseBurst(e, now + 0.02, 0.34, 520, 0.035);
	},

	dispose() {
		if (!engine) return;
		void engine.ctx.close();
		engine = null;
	},
};
