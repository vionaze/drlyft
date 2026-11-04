import gsap from "gsap";
import {
	ACESFilmicToneMapping,
	AmbientLight,
	BoxGeometry,
	BufferAttribute,
	BufferGeometry,
	CanvasTexture,
	ConeGeometry,
	CylinderGeometry,
	DirectionalLight,
	EdgesGeometry,
	GridHelper,
	Group,
	HemisphereLight,
	Line,
	LineBasicMaterial,
	LineSegments,
	MathUtils,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	PerspectiveCamera,
	PlaneGeometry,
	PointLight,
	Scene,
	SRGBColorSpace,
	type Texture,
	WebGLRenderer,
} from "three";

/**
 * Scene lift barang 3D yang ringan:
 * - kabin bergerak naik/turun di dalam shaft
 * - kabel & counterweight ikut bergerak
 * - bisa di-drag untuk memutar, parallax mengikuti pointer
 * - render berhenti saat tidak terlihat / tab tidak aktif
 */
export function mountLiftScene(container: HTMLElement): () => void {
	const scene = new Scene();
	const camera = new PerspectiveCamera(34, 1, 0.1, 100);
	camera.position.set(6.6, 5.4, 9.4);
	camera.lookAt(0, 3.05, 0);

	const renderer = new WebGLRenderer({
		antialias: true,
		alpha: true,
		powerPreference: "high-performance",
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
	renderer.setClearColor(0x000000, 0);
	renderer.toneMapping = ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.25;
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.domElement.style.display = "block";
	container.appendChild(renderer.domElement);

	const group = new Group();
	group.rotation.y = -0.28;
	group.position.y = -0.6;
	scene.add(group);

	const metal = new MeshStandardMaterial({
		color: 0x24271f,
		metalness: 0.7,
		roughness: 0.4,
	});
	const darkMetal = new MeshStandardMaterial({
		color: 0x131512,
		metalness: 0.55,
		roughness: 0.52,
	});
	const paleLine = new LineBasicMaterial({
		color: 0x7b8073,
		transparent: true,
		opacity: 0.5,
	});
	const redLine = new LineBasicMaterial({
		color: 0xe10600,
		transparent: true,
		opacity: 0.95,
	});
	const redSolid = new MeshBasicMaterial({ color: 0xe10600 });

	/* ---------- lantai ---------- */
	const floorStep = 1.55;
	for (let i = 0; i < 5; i += 1) {
		const y = i * floorStep;
		const slab = new Mesh(new BoxGeometry(3.1, 0.06, 2.2), darkMetal);
		slab.position.y = y;
		group.add(slab);

		const edges = new LineSegments(new EdgesGeometry(slab.geometry), paleLine);
		edges.position.copy(slab.position);
		group.add(edges);

		const mark = new Mesh(new BoxGeometry(3.1, 0.014, 0.02), redSolid);
		mark.position.set(0, y + 0.045, 1.11);
		group.add(mark);
	}

	/* ---------- label lantai ---------- */
	const makeLabel = (text: string) => {
		const canvas = document.createElement("canvas");
		canvas.width = 128;
		canvas.height = 64;
		const context = canvas.getContext("2d");
		if (context) {
			context.clearRect(0, 0, 128, 64);
			context.fillStyle = "rgba(238, 241, 232, 0.88)";
			context.font = "500 32px ui-monospace, monospace";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText(text, 64, 34);
		}
		const texture = new CanvasTexture(canvas);
		texture.colorSpace = SRGBColorSpace;
		texture.anisotropy = 2;
		return texture;
	};

	const textures: Texture[] = [];
	const floorLabels = ["G", "01", "02", "03", "04"];
	floorLabels.forEach((label, index) => {
		const texture = makeLabel(label);
		textures.push(texture);
		const plane = new Mesh(
			new PlaneGeometry(0.52, 0.26),
			new MeshBasicMaterial({
				map: texture,
				transparent: true,
				depthWrite: false,
			}),
		);
		plane.position.set(0, index * floorStep + 0.28, 1.13);
		group.add(plane);
	});

	/* ---------- display lantai (live) ---------- */
	const displayCanvas = document.createElement("canvas");
	displayCanvas.width = 160;
	displayCanvas.height = 80;
	const displayContext = displayCanvas.getContext("2d");
	const displayTexture = new CanvasTexture(displayCanvas);
	displayTexture.colorSpace = SRGBColorSpace;
	textures.push(displayTexture);

	const drawDisplay = (label: string) => {
		if (!displayContext) return;
		displayContext.clearRect(0, 0, 160, 80);
		displayContext.fillStyle = "#050605";
		displayContext.fillRect(0, 0, 160, 80);
		displayContext.strokeStyle = "rgba(225, 6, 0, 0.6)";
		displayContext.lineWidth = 3;
		displayContext.strokeRect(3, 3, 154, 74);
		displayContext.fillStyle = "#ff3b2f";
		displayContext.font = "600 44px ui-monospace, monospace";
		displayContext.textAlign = "center";
		displayContext.textBaseline = "middle";
		displayContext.shadowColor = "#e10600";
		displayContext.shadowBlur = 14;
		displayContext.fillText(label, 80, 42);
		displayTexture.needsUpdate = true;
	};
	drawDisplay("G");

	const displayBacking = new Mesh(new BoxGeometry(0.92, 0.48, 0.04), darkMetal);
	displayBacking.position.set(0, 6.95, 0.52);
	group.add(displayBacking);

	const displayPlane = new Mesh(
		new PlaneGeometry(0.84, 0.42),
		new MeshBasicMaterial({ map: displayTexture }),
	);
	displayPlane.position.set(0, 6.95, 0.545);
	group.add(displayPlane);

	/* ---------- rel & rangka ---------- */
	const railGeometry = new BoxGeometry(0.055, 6.9, 0.055);
	for (const [x, z] of [
		[-1.35, -1.0],
		[1.35, -1.0],
		[-1.35, 1.0],
		[1.35, 1.0],
	]) {
		const rail = new Mesh(railGeometry, metal);
		rail.position.set(x, 3.05, z);
		group.add(rail);
	}

	const topFrame = new Mesh(new BoxGeometry(2.85, 0.12, 2.1), metal);
	topFrame.position.y = 6.55;
	group.add(topFrame);

	const backGrid = new GridHelper(6.2, 12, 0x3a3f35, 0x22261f);
	backGrid.rotation.x = Math.PI / 2;
	backGrid.position.set(0, 3.2, -1.08);
	group.add(backGrid);

	const ground = new Mesh(
		new PlaneGeometry(14, 14),
		new MeshStandardMaterial({
			color: 0x0b0d0a,
			roughness: 0.95,
			metalness: 0.1,
		}),
	);
	ground.rotation.x = -Math.PI / 2;
	ground.position.y = -0.08;
	scene.add(ground);

	const groundGrid = new GridHelper(10, 20, 0x3c4136, 0x1d211a);
	groundGrid.position.y = -0.06;
	scene.add(groundGrid);

	/* ---------- kabin ---------- */
	const car = new Group();
	car.position.y = 1.2;
	group.add(car);

	const carBody = new Mesh(
		new BoxGeometry(1.9, 2.3, 1.5),
		new MeshStandardMaterial({
			color: 0x2b3027,
			metalness: 0.55,
			roughness: 0.34,
		}),
	);
	car.add(carBody);

	const carFront = new Mesh(
		new PlaneGeometry(1.58, 1.98),
		new MeshStandardMaterial({
			color: 0x23271f,
			metalness: 0.35,
			roughness: 0.62,
		}),
	);
	carFront.position.set(0, 0, 0.756);
	car.add(carFront);

	for (const x of [-0.945, 0.945]) {
		const strip = new Mesh(new BoxGeometry(0.035, 2.28, 0.035), redSolid);
		strip.position.set(x, 0, 0.76);
		car.add(strip);
	}

	const carEdges = new LineSegments(
		new EdgesGeometry(carBody.geometry),
		redLine,
	);
	car.add(carEdges);

	const doorSeam = new Mesh(new BoxGeometry(0.02, 2.14, 0.02), redSolid);
	doorSeam.position.set(0, 0, 0.76);
	car.add(doorSeam);

	const pallet = new Mesh(
		new BoxGeometry(1.25, 0.1, 0.95),
		new MeshStandardMaterial({ color: 0x6b5a3f, roughness: 0.9 }),
	);
	pallet.position.y = -0.82;
	car.add(pallet);

	const crateA = new Mesh(
		new BoxGeometry(0.62, 0.58, 0.58),
		new MeshStandardMaterial({ color: 0x8b7a58, roughness: 0.85 }),
	);
	crateA.position.set(-0.32, -0.48, 0.02);
	car.add(crateA);

	const crateB = new Mesh(
		new BoxGeometry(0.44, 0.44, 0.44),
		new MeshStandardMaterial({ color: 0x6d5f45, roughness: 0.9 }),
	);
	crateB.position.set(0.32, -0.56, -0.02);
	car.add(crateB);

	const carLight = new PointLight(0xe10600, 2.6, 3.2, 2);
	carLight.position.set(0, 0.4, 0.9);
	car.add(carLight);

	const arrowGeometry = new ConeGeometry(0.12, 0.26, 4);
	const arrowA = new Mesh(arrowGeometry, redSolid);
	arrowA.position.set(0, 1.62, 0);
	car.add(arrowA);
	const arrowB = new Mesh(arrowGeometry, redSolid);
	arrowB.position.set(0, 1.92, 0);
	arrowB.material = new MeshBasicMaterial({
		color: 0xe10600,
		transparent: true,
		opacity: 0.45,
	});
	car.add(arrowB);

	/* ---------- kabel & counterweight ---------- */
	const cablePositions = new Float32Array(6);
	const cableGeometry = new BufferGeometry();
	cableGeometry.setAttribute(
		"position",
		new BufferAttribute(cablePositions, 3),
	);
	const cable = new Line(cableGeometry, paleLine);
	group.add(cable);

	const counterweight = new Group();
	const weight = new Mesh(
		new BoxGeometry(0.34, 1.15, 0.26),
		new MeshStandardMaterial({
			color: 0x2a2d26,
			metalness: 0.5,
			roughness: 0.55,
		}),
	);
	counterweight.add(weight);
	const weightEdges = new LineSegments(
		new EdgesGeometry(weight.geometry),
		paleLine,
	);
	counterweight.add(weightEdges);
	counterweight.position.set(1.55, 4.6, -0.86);
	group.add(counterweight);

	const landingMark = new Mesh(new BoxGeometry(3.15, 0.02, 0.07), redSolid);
	group.add(landingMark);

	/* ---------- cahaya ---------- */
	scene.add(new AmbientLight(0xffffff, 0.85));
	const hemi = new HemisphereLight(0xf0f4e8, 0x0a0b0a, 0.95);
	scene.add(hemi);
	const key = new DirectionalLight(0xfff2e6, 2.5);
	key.position.set(5, 9, 6);
	scene.add(key);
	const fill = new DirectionalLight(0xdfe6d6, 0.9);
	fill.position.set(-5, 4, 4);
	scene.add(fill);
	const rim = new PointLight(0xe10600, 6, 11, 2);
	rim.position.set(-2.6, 3.2, 2.8);
	scene.add(rim);

	const pulley = new Mesh(new CylinderGeometry(0.18, 0.18, 0.1, 18), metal);
	pulley.rotation.z = Math.PI / 2;
	pulley.position.set(0, 6.48, 0);
	group.add(pulley);

	/* ---------- animasi kabin ---------- */
	const carTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
	carTimeline
		.to(car.position, { y: 5.35, duration: 2.7, ease: "power2.inOut" })
		.to(car.position, {
			y: 1.2,
			duration: 2.4,
			ease: "power2.inOut",
			delay: 0.9,
		})
		.to(car.position, {
			y: 2.75,
			duration: 1.5,
			ease: "power2.inOut",
			delay: 0.6,
		})
		.to(car.position, {
			y: 1.2,
			duration: 1.3,
			ease: "power2.inOut",
			delay: 0.7,
		});

	/* ---------- interaksi ---------- */
	const pointer = { x: 0, y: 0 };
	const drag = { x: 0, y: 0, active: false, lastX: 0, lastY: 0 };
	const baseRotation = -0.28;

	const onPointerMove = (event: PointerEvent) => {
		const rect = container.getBoundingClientRect();
		pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
		pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
		if (!drag.active) return;
		drag.x += (event.clientX - drag.lastX) * 0.006;
		drag.y += (event.clientY - drag.lastY) * 0.004;
		drag.x = MathUtils.clamp(drag.x, -0.8, 0.8);
		drag.y = MathUtils.clamp(drag.y, -0.35, 0.35);
		drag.lastX = event.clientX;
		drag.lastY = event.clientY;
	};
	const onPointerDown = (event: PointerEvent) => {
		drag.active = true;
		drag.lastX = event.clientX;
		drag.lastY = event.clientY;
		container.style.cursor = "grabbing";
		container.setPointerCapture?.(event.pointerId);
	};
	const onPointerUp = () => {
		drag.active = false;
		container.style.cursor = "grab";
	};

	container.style.cursor = "grab";
	container.addEventListener("pointermove", onPointerMove);
	container.addEventListener("pointerdown", onPointerDown);
	container.addEventListener("pointerup", onPointerUp);
	container.addEventListener("pointercancel", onPointerUp);
	container.addEventListener("pointerleave", onPointerUp);

	let visible = true;
	const intersection = new IntersectionObserver(
		(entries) => {
			visible = entries.some((entry) => entry.isIntersecting);
		},
		{ threshold: 0.05 },
	);
	intersection.observe(container);

	let raf = 0;
	let last = performance.now();
	let lastLanding = -1;
	const render = (now: number) => {
		raf = requestAnimationFrame(render);
		const delta = Math.min(0.05, (now - last) / 1000);
		last = now;

		if (!visible || document.hidden) return;

		group.rotation.y = MathUtils.damp(
			group.rotation.y,
			baseRotation + pointer.x * 0.16 + drag.x,
			4,
			delta,
		);
		group.rotation.x = MathUtils.damp(
			group.rotation.x,
			pointer.y * 0.05 + drag.y,
			4,
			delta,
		);

		const carTop = car.position.y + 1.15;
		cablePositions[0] = 0;
		cablePositions[1] = 6.5;
		cablePositions[2] = 0;
		cablePositions[3] = 0;
		cablePositions[4] = carTop;
		cablePositions[5] = 0;
		cableGeometry.attributes.position.needsUpdate = true;

		counterweight.position.y = 6.4 - car.position.y;
		arrowA.position.y = 1.62 + Math.sin(now * 0.003) * 0.06;
		arrowB.position.y = 1.92 + Math.sin(now * 0.003 + 0.5) * 0.06;

		const landingIndex = Math.max(
			0,
			Math.min(4, Math.round(car.position.y / floorStep)),
		);
		landingMark.position.y = landingIndex * floorStep + 0.06;
		if (landingIndex !== lastLanding) {
			lastLanding = landingIndex;
			drawDisplay(floorLabels[landingIndex] ?? "G");
		}

		renderer.render(scene, camera);
	};
	raf = requestAnimationFrame(render);

	/* ---------- resize ---------- */
	const resize = () => {
		const width = Math.max(1, container.clientWidth);
		const height = Math.max(1, container.clientHeight);
		renderer.setSize(width, height, false);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	};
	resize();
	const observer = new ResizeObserver(resize);
	observer.observe(container);

	/* ---------- cleanup ---------- */
	return () => {
		cancelAnimationFrame(raf);
		carTimeline.kill();
		observer.disconnect();
		intersection.disconnect();
		container.removeEventListener("pointermove", onPointerMove);
		container.removeEventListener("pointerdown", onPointerDown);
		container.removeEventListener("pointerup", onPointerUp);
		container.removeEventListener("pointercancel", onPointerUp);
		container.removeEventListener("pointerleave", onPointerUp);
		container.style.cursor = "auto";

		scene.traverse((object) => {
			if (object instanceof Mesh || object instanceof Line) {
				object.geometry?.dispose();
				const material = object.material;
				if (Array.isArray(material)) {
					for (const item of material) item.dispose();
				} else {
					material?.dispose();
				}
			}
		});

		for (const texture of textures) texture.dispose();
		renderer.dispose();
		renderer.domElement.remove();
	};
}
