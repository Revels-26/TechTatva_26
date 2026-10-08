import { useEffect, useState } from "react";

// Images the landing page uses. They are fetched while the loader is up, so the page does not lag when it appears.
const PRELOAD = [
  "/assets/hero/hero-logo.png",
  "/assets/hero/emblem-aether.png",
  "/assets/hero/emblem-zenith.png",
  "/assets/hero/emblem-obsidian.png",
  "/assets/hero/emblem-ember.png",
  "/assets/hero/universe-bg.jpg",
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

const MIN_SHOW_MS = 2000; // minimum time on screen
const MAX_WAIT_MS = 8000; // never keep the visitor waiting longer than this
const SLIDE_MS = 900;

// Full-screen loader shown on first load, in the same universe as the hero. It slides up once the landing images are ready.
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
    document.documentElement.dataset.heroIntro = "go"; // start the hero intro as the loader lifts
    const doneTimer = window.setTimeout(() => setPhase("done"), SLIDE_MS);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-label="Loading TechTatva '26"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#03040a] text-brut-cream transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "leaving" ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ transitionDuration: `${SLIDE_MS}ms` }}
    >
      {/* The universe: the same static image as the hero, and a glow in the middle */}
      <img src="/assets/hero/universe-bg.jpg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#03040a_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute h-[620px] w-[620px] rounded-full bg-[#84d0fc]/15 blur-[160px]" />

      <div className="relative flex flex-col items-center text-center">
        <img
          src="/assets/hero/hero-logo.png"
          alt="TechTatva '26"
          className="hero-logo h-auto w-[min(360px,70vw)] opacity-60 brightness-75"
        />
      </div>
    </div>
  );
};
