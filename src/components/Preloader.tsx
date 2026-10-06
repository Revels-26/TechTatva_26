import { useEffect, useState } from "react";

// Images the landing page uses. They are fetched while the loader is up, so the page does not lag when it appears.
const PRELOAD = [
  "/assets/hero/hero-logo.png",
  "/assets/hero/emblem-aether.png",
  "/assets/hero/emblem-zenith.png",
  "/assets/hero/emblem-obsidian.png",
  "/assets/hero/emblem-ember.png",
  "/assets/hero/starfield.svg",
  "/assets/combo/flagship-merch.png",
  "/assets/combo/general-merch.png",
  "/assets/merch/astronaut.png",
  "/assets/passes/general.png",
  "/assets/passes/flagship.png",
  "/assets/passes/conclave.png",
  "/assets/socials/post-1.png",
  "/assets/socials/post-2.png",
  "/assets/socials/post-3.png",
  "/assets/socials/post-4.png",
  "/assets/logo/mit-logo.png",
  "/assets/logo/mahe-logo.png",
  "/assets/logo/sc-logo.png",
];

const MIN_SHOW_MS = 1200; // same minimum as the M-26 loader
const MAX_WAIT_MS = 8000; // never keep the visitor waiting longer than this
const SLIDE_MS = 900;

// Full-screen loader shown on first load. It slides up once the landing images are ready.
export const Preloader = () => {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    const started = performance.now();
    const images = Promise.all(
      PRELOAD.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    );
    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, MAX_WAIT_MS));

    let leaveTimer: number | undefined;
    Promise.race([images, timeout]).then(() => {
      const remaining = Math.max(0, MIN_SHOW_MS - (performance.now() - started));
      leaveTimer = window.setTimeout(() => setPhase("leaving"), remaining);
    });
    return () => window.clearTimeout(leaveTimer);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const doneTimer = window.setTimeout(() => setPhase("done"), SLIDE_MS);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-label="Loading Tech Tatva 26"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0B3566] text-brut-cream transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "leaving" ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ transitionDuration: `${SLIDE_MS}ms` }}
    >
      {/* Grid and glows, in the galaxy blues */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(132,208,252,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(132,208,252,0.18)_1px,transparent_1px)] bg-[size:3rem_3rem]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute h-[700px] w-[700px] rounded-full bg-[#84d0fc]/20 blur-[180px]" />
      <div aria-hidden="true" className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[#59a7ff]/20 blur-[150px]" />

      <div className="relative flex flex-col items-center gap-6">
        <img
          src="/assets/hero/hero-logo.png"
          alt="TechTatva 26"
          className="h-64 w-auto object-contain drop-shadow-[0_0_50px_rgba(132,208,252,0.45)] sm:h-80"
        />
        <span className="animate-pulse font-roboto-mono text-xs font-bold tracking-[0.4em] text-[#84d0fc] uppercase sm:text-sm">
          Welcome to Tech Tatva &apos;26
        </span>
      </div>
    </div>
  );
};
