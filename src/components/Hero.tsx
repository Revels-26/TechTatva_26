import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SITE } from "../config/site";
import Sparkle from "./Sparkle";
import Button from "./Button";
import Particles from "./Particles";
import RealityPlanet from "./RealityPlanet";
import { REALITIES } from "../data/realities";

const aether = REALITIES[0];
const obsidian = REALITIES[1];
const ember = REALITIES[2];
const zenith = REALITIES[3];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#153d79_0%,#0c3167_28%,#022554_55%,#01112b_100%)] pt-28"
    >
      {/* Ambient wash blobs */}
      <div className="pointer-events-none absolute -left-32 -top-24 h-[56rem] w-[56rem] opacity-30 mix-blend-screen" aria-hidden="true">
        <img
          src="/assets/hero/nebula.png"
          alt=""
          className="h-full w-full rounded-full object-cover"
          style={{
            maskImage: "radial-gradient(circle, black 0%, black 35%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle, black 0%, black 35%, transparent 70%)",
          }}
        />
      </div>
      <div className="pointer-events-none absolute -right-32 -top-16 h-[56rem] w-[56rem] opacity-20 mix-blend-screen" aria-hidden="true">
        <img
          src="/assets/hero/aurora.png"
          alt=""
          className="h-full w-full rounded-full object-cover"
          style={{
            maskImage: "radial-gradient(circle, black 0%, black 35%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle, black 0%, black 35%, transparent 70%)",
          }}
        />
      </div>

      <Particles count={70} className="opacity-80" />

      <Sparkle size={28} className="absolute left-1/2 top-[78%] -translate-x-1/2" />

      {/* Orbit rings */}
      <div
        className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-full border border-[rgba(181,240,255,0.15)]"
        style={{ width: "105vw", height: "55vw", maxHeight: 640 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-full border border-[rgba(181,240,255,0.2)]"
        style={{ width: "84vw", height: "42vw", maxHeight: 500 }}
        aria-hidden="true"
      />

      {/* Reality planets — only once there's room in the gutters beside the title column */}
      <RealityPlanet
        name={aether.name}
        domain={aether.domain}
        glow={aether.glow}
        gradient={aether.gradient}
        baseImage={aether.baseImage}
        accentImage={aether.accentImage}
        size={88}
        className="absolute left-4 top-[16%] hidden xl:flex 2xl:left-12"
      />
      <RealityPlanet
        name={ember.name}
        domain={ember.domain}
        glow={ember.glow}
        gradient={ember.gradient}
        baseImage={ember.baseImage}
        accentImage={ember.accentImage}
        size={80}
        className="absolute right-4 top-[14%] hidden xl:flex 2xl:right-12"
      />
      <RealityPlanet
        name={obsidian.name}
        domain={obsidian.domain}
        glow={obsidian.glow}
        gradient={obsidian.gradient}
        baseImage={obsidian.baseImage}
        accentImage={obsidian.accentImage}
        size={68}
        className="absolute left-4 top-[58%] hidden xl:flex 2xl:left-12"
      />
      <RealityPlanet
        name={zenith.name}
        domain={zenith.domain}
        glow={zenith.glow}
        gradient={zenith.gradient}
        baseImage={zenith.baseImage}
        accentImage={zenith.accentImage}
        size={72}
        className="absolute right-4 top-[56%] hidden xl:flex 2xl:right-12"
      />

      {/* Title block */}
      <div
        data-aos="fade-up"
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 text-center"
      >
        <p className="max-w-xs font-label text-[9px] uppercase leading-relaxed tracking-[1.2px] text-white/80 sm:max-w-none sm:tracking-[1.62px]">
          {SITE.tagline}
        </p>

        <img
          src="/assets/hero/logo.png"
          alt={`${SITE.name} ${SITE.edition}`}
          className="my-2 w-52 max-w-full object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)] sm:w-64 md:w-80"
        />

        <h1 className="w-full bg-[linear-gradient(to_bottom,#ffffff_0%,#f0f7ff_55%,#b5f0ff_100%)] bg-clip-text font-label text-xl uppercase tracking-[2px] text-transparent [text-shadow:0_0_36px_rgba(181,240,255,0.3)] sm:text-4xl sm:tracking-[8px] md:text-5xl md:tracking-[12px]">
          Convergence
        </h1>

        <div className="h-[2px] w-18 rounded-full bg-[linear-gradient(90deg,#6ff4fa_0%,#5e17eb_33%,#ffaa06_66%,#00bf63_100%)]" />

        <p className="font-display text-2xl italic text-[#deebfa] sm:text-3xl md:text-4xl">
          Realities Reengineered
        </p>

        <div data-aos="fade-up" data-aos-delay="100" className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Button
            href={SITE.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            icon={<ArrowUpRight size={18} strokeWidth={2.5} />}
          >
            Register now
          </Button>
          <Button href="#realities" variant="secondary" size="lg" icon={<ChevronDown size={18} />}>
            Enter the realities
          </Button>
        </div>
      </div>

      {/* Horizon caption */}
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="relative z-10 mt-16 flex flex-col items-center gap-1 px-6 pb-10 text-center"
      >
        <p className="font-label text-[9px] uppercase tracking-[1.62px] text-white/70">
          Four realities &nbsp;·&nbsp; Sixteen categories &nbsp;·&nbsp; Thirty-four events &nbsp;·&nbsp; One
          timeline
        </p>
        <div className="mt-2 flex flex-col items-center gap-1">
          <div className="h-7 w-px bg-white/20" />
          <ChevronDown size={16} className="text-white/60" />
        </div>
      </div>

      <div className="relative z-10 flex-1" />

      {/* Horizon curve — the sky dissolves into the page's white canvas */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "230vw",
          aspectRatio: "1 / 1",
          top: "81%",
          background:
            "linear-gradient(90deg,#6ff4fa 0%,#e349e5 30%,white 50%,#ffaa06 70%,#00bf63 100%)",
          filter: "blur(60px)",
          opacity: 0.45,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full border-2 border-[rgba(181,240,255,0.5)] bg-[#f0f7ff]"
        style={{ width: "210vw", aspectRatio: "1 / 1", top: "83%" }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" aria-hidden="true" />
    </section>
  );
};

export default Hero;
