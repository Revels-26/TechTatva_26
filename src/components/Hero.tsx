import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Multiverse hero: the four realities sit in a V around the Convergence logo, which is centred in the section.
// Two fly in from the left and two from the right. Four energy rays run from each reality straight to the centre.
const REALITIES = [
  { name: "Aether", image: "/assets/hero/emblem-aether.png", motion: "hero-aether", glow: "#84d0fc", left: "8%", top: "20%", enter: "hero-fly-left", delay: "0s" },
  { name: "Obsidian", image: "/assets/hero/emblem-obsidian.png", motion: "hero-obsidian", glow: "#d6b181", left: "20%", top: "70%", enter: "hero-fly-left", delay: "0s" },
  { name: "Ember", image: "/assets/hero/emblem-ember.png", motion: "hero-ember", glow: "#f24f05", left: "80%", top: "70%", enter: "hero-fly-right", delay: "0s" },
  { name: "Zenith", image: "/assets/hero/emblem-zenith.png", motion: "hero-zenith", glow: "#c4b3f5", left: "92%", top: "20%", enter: "hero-fly-right", delay: "0s" },
];

type Ray = { name: string; glow: string; x1: number; y1: number; x2: number; y2: number };


// A point along a stream: the straight line from the emblem to the centre, bent sideways by a slow sine wave.
const streamPoint = (ray: Ray, t: number, amplitude: number, frequency: number, phase: number, time: number): [number, number] => {
  const dx = ray.x2 - ray.x1;
  const dy = ray.y2 - ray.y1;
  const length = Math.hypot(dx, dy);
  const nx = -dy / length;
  const ny = dx / length;
  // The crests move along the stream, from the reality towards the centre.
  const bend = length * amplitude * Math.sin(2 * Math.PI * frequency * t + phase - time * 0.7) * Math.sin(Math.PI * t);
  return [ray.x1 + dx * t + nx * bend, ray.y1 + dy * t + ny * bend];
};

// A smooth curving path for a stream. Each stream bends differently, so no two are straight.
const streamPath = (ray: Ray, amplitude: number, frequency: number, phase: number, time = 0) => {
  const points = Array.from({ length: 41 }, (_, step) => streamPoint(ray, step / 40, amplitude, frequency, phase, time));
  return `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)} ` + points.slice(1).map(([x, y]) => `L ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
};

export const Hero = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [stage, setStage] = useState<{ w: number; h: number; rays: Ray[] }>({ w: 0, h: 0, rays: [] });
  const wavePaths = useRef<(SVGPathElement | null)[]>([]);

  // Measure where each emblem sits and draw a ray from it to the centre. Re-measured whenever the stage resizes.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const rays: Ray[] = [];
      REALITIES.forEach((reality, i) => {
        const slot = slotRefs.current[i];
        if (!slot) return;
        const r = slot.getBoundingClientRect();
        // The emblem is square and sits at the top of its slot, so its centre is the slot's centre across, and half its width down.
        rays.push({
          name: reality.name,
          glow: reality.glow,
          x1: r.left - box.left + r.width / 2,
          y1: r.top - box.top + r.width / 2,
          x2: box.width / 2,
          y2: box.height / 2,
        });
      });
      setStage({ w: box.width, h: box.height, rays });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Move the waves: each frame rewrites the three paths of every stream, so the ripples keep travelling inward.
  useEffect(() => {
    if (stage.rays.length === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frameId = 0;
    const draw = (now: number) => {
      const time = (now - start) / 1000;
      stage.rays.forEach((ray, i) => {
        const paths = [
          streamPath(ray, 0.1, 2.2, i * 0.9, time),
          streamPath(ray, 0.16, 2.8, i * 0.9 + 1.7, time),
          streamPath(ray, 0.07, 3.4, i * 0.9 + 3.1, time),
        ];
        paths.forEach((d, k) => wavePaths.current[i * 3 + k]?.setAttribute("d", d));
      });
      if (!reduce) frameId = requestAnimationFrame(draw);
    };
    draw(start);
    return () => cancelAnimationFrame(frameId);
  }, [stage]);

  return (
    <section className="relative overflow-hidden border-b-3 border-brut-ink bg-[#03040a] pt-[64px] text-brut-cream">
      {/* Background: a static universe image, with a faint turning glow and the four realities as glows that blend together */}
      <img src="/assets/hero/universe-bg.jpg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="hero-spin pointer-events-none absolute top-1/2 left-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,#84d0fc,#d6b181,#f24f05,#c4b3f5,#84d0fc)] opacity-10 mix-blend-screen blur-[80px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#03040a_100%)]" />
      {REALITIES.map((reality, i) => (
        <div
          key={reality.name}
          aria-hidden="true"
          className={`hero-blend-${i % 2 === 0 ? "a" : "b"} pointer-events-none absolute h-[70%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 mix-blend-screen blur-[70px]`}
          style={{ left: reality.left, top: reality.top, background: `radial-gradient(circle, ${reality.glow}88 0%, ${reality.glow}22 45%, transparent 70%)` }}
        />
      ))}

      <h1 className="sr-only">TechTatva '26: Convergence. Realities Reengineered.</h1>

      {/* The stage: the logo at the exact centre, the emblems in a V around it, and the rays between them */}
      <div ref={stageRef} className="relative mx-auto h-[calc(100svh-64px)] min-h-[600px] w-full sm:aspect-[4/3] sm:h-auto lg:aspect-auto lg:h-[calc(100svh-64px)] lg:min-h-[600px]">
        {/* Smoky energy streams, thin: each reality releases a curling river of light toward the centre, and they merge at the logo */}
        <svg aria-hidden="true" width={stage.w} height={stage.h} viewBox={`0 0 ${stage.w} ${stage.h}`} className="hero-streams pointer-events-none absolute inset-0">
          <defs>
            <filter id="hero-smoke-flow" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" result="wispy" />
              <feGaussianBlur in="wispy" stdDeviation="7" />
            </filter>
            <filter id="hero-smoke-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            {stage.rays.map((ray) => (
              <linearGradient key={ray.name} id={`hero-stream-${ray.name}`} gradientUnits="userSpaceOnUse" x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2}>
                <stop offset="0" stopColor={ray.glow} stopOpacity="0.2" />
                <stop offset="0.6" stopColor={ray.glow} stopOpacity="0.55" />
                <stop offset="1" stopColor={ray.glow} stopOpacity="0.95" />
              </linearGradient>
            ))}
            <radialGradient id="hero-convergence">
              <stop offset="0" stopColor="#b5f0ff" stopOpacity="0.4" />
              <stop offset="0.4" stopColor="#84d0fc" stopOpacity="0.18" />
              <stop offset="1" stopColor="#b5f0ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g style={{ mixBlendMode: "screen" }}>
            {stage.rays.map((ray, i) => {
              const size = Math.min(stage.w, stage.h);
              const main = streamPath(ray, 0.1, 2.2, i * 0.9);
              const wispA = streamPath(ray, 0.16, 2.8, i * 0.9 + 1.7);
              const wispB = streamPath(ray, 0.07, 3.4, i * 0.9 + 3.1);
              return (
                <g key={ray.name} filter="url(#hero-smoke-flow)" className="hero-ray-pulse">
                  <path ref={(el) => { wavePaths.current[i * 3] = el; }} d={main} fill="none" stroke={`url(#hero-stream-${ray.name})`} strokeWidth={size * 0.12} strokeLinecap="round" opacity={0.6} />
                  <path ref={(el) => { wavePaths.current[i * 3 + 1] = el; }} d={wispA} fill="none" stroke={ray.glow} strokeWidth={size * 0.04} strokeLinecap="round" opacity={0.35} />
                  <path ref={(el) => { wavePaths.current[i * 3 + 2] = el; }} d={wispB} fill="none" stroke={ray.glow} strokeWidth={size * 0.018} strokeLinecap="round" opacity={0.5} />
                </g>
              );
            })}

            {/* The convergence cloud behind the logo, where the four streams merge */}
            <g filter="url(#hero-smoke-soft)">
              <circle cx={stage.w / 2} cy={stage.h / 2} r={Math.min(stage.w, stage.h) * 0.22} fill="url(#hero-convergence)" />
            </g>
          </g>
        </svg>

        <div className="hero-logo-in absolute top-1/2 left-1/2 w-[min(440px,72%)] -translate-x-1/2 -translate-y-1/2">
          <img src="/assets/hero/hero-logo.png" alt="TechTatva '26 Convergence" className="hero-logo h-auto w-full" />
        </div>

        {REALITIES.map((reality, i) => (
          <div
            key={reality.name}
            ref={(el) => {
              slotRefs.current[i] = el;
            }}
            className={`hero-slot-${reality.name.toLowerCase()} absolute flex w-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 sm:w-[18%] lg:w-[11%]`}
            style={{ left: reality.left, top: reality.top }}
          >
            <div className={`hero-fly ${reality.enter} flex w-full flex-col items-center gap-2`} style={{ animationDelay: reality.delay }}>
              <img
                src={reality.image}
                alt=""
                aria-hidden="true"
                className={`w-full object-contain ${reality.motion}`}
                style={{ filter: `drop-shadow(0 0 28px ${reality.glow})` }}
              />
              <span className="font-roboto-mono text-[10px] font-bold tracking-[0.3em] uppercase opacity-90 sm:text-[12px]">{reality.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
