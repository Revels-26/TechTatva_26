// Landing hero, built from the TechTatva 26 Figma hero layers (1440 x 960 artboard).
// Every position is a percentage of the artboard, and the stage is a size container, so the hero
// keeps its layout at any screen width. On phones the stage is taller and the emblems are enlarged.
// Landing hero, built from the TechTatva 26 Figma hero layers (1440 x 960 artboard).
// The section fills the screen. The artboard inside it scales to fit the screen and keeps its proportions:
// landscape screens use the 3:2 layout, portrait phones use a taller 3:4 layout with bigger emblems.
export const Hero = () => (
  <section
    className="relative h-[min(100svh,calc(100vw/1.5))] w-full overflow-hidden portrait:h-auto portrait:pt-20"
    style={{
      background:
        "radial-gradient(96% 53% at 50% 42%, #153d79 0%, #0c3167 27.5%, #022554 55%, #01112b 100%)",
    }}
  >
    <img
      src="/assets/hero/starfield.svg"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full object-cover"
    />
    <h1 className="sr-only">TechTatva 26: Convergence. Realities Reengineered.</h1>
    <div
      aria-hidden="true"
      className="hero-stage absolute top-1/2 left-1/2 aspect-[3/2] w-[min(100vw,calc(100svh*1.5))] -translate-x-1/2 -translate-y-1/2 overflow-hidden [--emblem-scale:1] [container-type:inline-size] portrait:relative portrait:top-auto portrait:left-1/2 portrait:w-[110vw] portrait:translate-y-0 portrait:aspect-[3/2]"
    >
        <img src="/assets/hero/aura-ember.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "64.699%", top: "32.119%", width: "37.139%", aspectRatio: "534.8 / 534.8" }} />
        <img src="/assets/hero/aura-obsidian.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "2.618%", top: "46.868%", width: "37.139%", aspectRatio: "534.8 / 534.8" }} />
        <img src="/assets/hero/aura-zenith.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "69.568%", top: "-1.281%", width: "29.167%", aspectRatio: "420 / 420" }} />
        <img src="/assets/hero/aura-aether.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "-2.349%", top: "15.804%", width: "29.167%", aspectRatio: "420 / 420" }} />
        <img src="/assets/hero/orbit-outer.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "-2.265%", top: "8.172%", width: "104.531%", aspectRatio: "1505.25 / 731.1" }} />
        <img src="/assets/hero/orbit-back.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "5.991%", top: "14.644%", width: "87.906%", aspectRatio: "1265.85 / 403.54" }} />
        <img src="/assets/hero/trail-glow-aether.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "5.99%", top: "37.679%", width: "6.244%", aspectRatio: "89.92 / 225.97" }} />
        <img src="/assets/hero/trail-aether.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "5.99%", top: "37.679%", width: "6.244%", aspectRatio: "89.92 / 225.97" }} />
        <img src="/assets/hero/trail-glow-zenith.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "55.283%", top: "14.644%", width: "28.868%", aspectRatio: "415.7 / 57.12" }} />
        <img src="/assets/hero/trail-zenith.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "55.283%", top: "14.644%", width: "28.868%", aspectRatio: "415.7 / 57.12" }} />
        <img src="/assets/hero/core-bloom.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "12.5%", top: "15.208%", width: "75.0%", aspectRatio: "1080 / 620" }} />
        <img src="/assets/hero/orbit-front.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "6.103%", top: "35.821%", width: "87.906%", aspectRatio: "1265.85 / 403.54" }} />
        <img src="/assets/hero/trail-glow-obsidian.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "21.188%", top: "74.722%", width: "31.197%", aspectRatio: "449.23 / 30.09" }} />
        <img src="/assets/hero/trail-obsidian.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "21.188%", top: "74.722%", width: "31.197%", aspectRatio: "449.23 / 30.09" }} />
        <img src="/assets/hero/trail-glow-ember.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "83.268%", top: "36.344%", width: "10.742%", aspectRatio: "154.68 / 226.85" }} />
        <img src="/assets/hero/trail-ember.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "83.268%", top: "36.344%", width: "10.742%", aspectRatio: "154.68 / 226.85" }} />
        <img src="/assets/hero/bead-a.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "72.661%", top: "8.707%", width: "0.22%", aspectRatio: "3.167 / 3.167" }} />
        <img src="/assets/hero/bead-a.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "20.533%", top: "21.092%", width: "0.22%", aspectRatio: "3.167 / 3.167" }} />
        <img src="/assets/hero/bead-b.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "28.485%", top: "23.454%", width: "0.216%", aspectRatio: "3.117 / 3.117" }} />
        <img src="/assets/hero/bead-c.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "39.992%", top: "83.953%", width: "0.379%", aspectRatio: "5.457 / 5.457" }} />
        <img src="/assets/hero/bead-d.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "71.213%", top: "75.57%", width: "0.377%", aspectRatio: "5.425 / 5.425" }} />
        <img src="/assets/hero/bead-e.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "11.381%", top: "68.062%", width: "0.332%", aspectRatio: "4.778 / 4.778" }} />
        <img src="/assets/hero/bead-f.svg" alt="" aria-hidden="true" className="absolute block max-w-none" style={{ left: "73.204%", top: "67.419%", width: "0.372%", aspectRatio: "5.354 / 5.354" }} />
        <img src="/assets/hero/emblem-aether.png" alt="" aria-hidden="true" className="hero-aether absolute block max-w-none" style={{ left: "7.026%", top: "29.867%", width: "calc(10.417% * var(--emblem-scale))", aspectRatio: "1 / 1" }} />
        <img src="/assets/hero/emblem-zenith.png" alt="" aria-hidden="true" className="hero-zenith absolute block max-w-none" style={{ left: "78.943%", top: "12.781%", width: "calc(10.417% * var(--emblem-scale))", aspectRatio: "1 / 1" }} />
        <img src="/assets/hero/emblem-obsidian.png" alt="" aria-hidden="true" className="hero-obsidian absolute block max-w-none" style={{ left: "14.556%", top: "64.774%", width: "calc(13.264% * var(--emblem-scale))", aspectRatio: "1 / 1" }} />
        <img src="/assets/hero/emblem-ember.png" alt="" aria-hidden="true" className="hero-ember absolute block max-w-none" style={{ left: "76.636%", top: "50.025%", width: "calc(13.264% * var(--emblem-scale))", aspectRatio: "1 / 1" }} />
        <span className="hero-label hero-label-aether absolute font-michroma uppercase whitespace-nowrap opacity-80 text-[color:var(--color-text-primary)]" style={{ left: "9.722%", top: "46.354%", fontSize: "clamp(9px, 0.85cqw, 11px)", letterSpacing: "0.14em" }}>Aether</span>
        <span className="hero-label hero-label-zenith absolute font-michroma uppercase whitespace-nowrap opacity-80 text-[color:var(--color-text-primary)]" style={{ left: "81.875%", top: "29.271%", fontSize: "clamp(9px, 0.85cqw, 11px)", letterSpacing: "0.14em" }}>Zenith</span>
        <span className="hero-label hero-label-obsidian absolute font-michroma uppercase whitespace-nowrap opacity-80 text-[color:var(--color-text-primary)]" style={{ left: "18.125%", top: "85.521%", fontSize: "clamp(9px, 0.85cqw, 11px)", letterSpacing: "0.14em" }}>Obsidian</span>
        <span className="hero-label hero-label-ember absolute font-michroma uppercase whitespace-nowrap opacity-80 text-[color:var(--color-text-primary)]" style={{ left: "81.042%", top: "70.729%", fontSize: "clamp(9px, 0.85cqw, 11px)", letterSpacing: "0.14em" }}>Ember</span>
        <img
          src="/assets/hero/hero-logo.png"
          alt=""
          aria-hidden="true"
          className="hero-logo absolute block max-w-none"
          style={{ left: "27.778%", top: "27.917%", width: "44.444%", aspectRatio: "640 / 370" }}
        />
        <p
          className="hero-tagline absolute whitespace-nowrap text-center font-cormorant font-semibold italic text-[color:var(--color-text-display)]"
          style={{ left: "34.167%", top: "61.771%", width: "24.653%", fontSize: "clamp(18px, 3.06cqw, 44px)", lineHeight: 1.05 }}
        >
          Realities Reengineered
        </p>
        <div
          className="absolute inset-x-0 bottom-0 h-[4px]"
          style={{
            background:
              "linear-gradient(90deg, #84d0fc 0%, #d6b181 30%, #ffffff 50%, #c4b3f5 70%, #f24f05 100%)",
          }}
        />
    </div>
  </section>
);
