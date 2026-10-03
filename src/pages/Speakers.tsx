import { useState } from "react";
import { BrutFooter, BrutNav, BrutPage } from "../components/Brut";

type ArtKind = "stripes" | "cross" | "dots" | "zig" | "rings";
type Tone = "ink" | "red";

type Act = {
  name: string;
  label: string;
  time: string;
  venue: string;
  role: string;
  art: ArtKind;
  tone: Tone;
};

// Lineup per Conclave day, as laid out in the Figma frames (77:2, 77:156, 77:266).
const DAYS: { day: number; acts: Act[] }[] = [
  {
    day: 1,
    acts: [
      { name: "Arjun Mehra", label: "Arjun", time: "5:00 PM", venue: "Quadrangle", role: "Panel speaker", art: "stripes", tone: "ink" },
      { name: "Noora Vale", label: "Noora", time: "8:00 PM", venue: "Open Air Theatre", role: "Conclave artist", art: "rings", tone: "red" },
    ],
  },
  {
    day: 2,
    acts: [
      { name: "Dr. Sana Iqbal", label: "Dr.", time: "4:30 PM", venue: "Seminar Hall", role: "Keynote", art: "cross", tone: "ink" },
      { name: "The Last Bus Home", label: "The", time: "8:30 PM", venue: "Quadrangle", role: "Band", art: "dots", tone: "red" },
    ],
  },
  {
    day: 3,
    acts: [
      { name: "Kabir Tandon", label: "Kabir", time: "5:30 PM", venue: "Auditorium", role: "Stand-up comedian", art: "zig", tone: "ink" },
      { name: "DJ Mirage", label: "DJ", time: "9:00 PM", venue: "Quadrangle", role: "Closing act", art: "rings", tone: "red" },
    ],
  },
];

// Figma asset hashes. Stripes use a different cut for mobile and desktop.
const PATTERN_FILES: Record<Exclude<ArtKind, "rings">, { mobile: string; desktop: string }> = {
  stripes: { mobile: "949b3", desktop: "e94de" },
  cross: { mobile: "768c4", desktop: "768c4" },
  dots: { mobile: "c459c", desktop: "c459c" },
  zig: { mobile: "3bc20", desktop: "3bc20" },
};

// Placement of the pattern artwork inside the art box (desktop lg: and mobile).
const PATTERN_BOX: Record<Exclude<ArtKind, "rings">, { mobile: string; desktop: string }> = {
  stripes: { mobile: "left-[-54.7%] w-[205.7%]", desktop: "left-[-43.7%] w-[186.7%]" },
  cross: { mobile: "", desktop: "" },
  dots: { mobile: "", desktop: "" },
  zig: { mobile: "", desktop: "left-[-43.7%] w-[186%]" },
};

// Concentric rings: 45 on desktop, the first 24 on mobile. Ring n is 16 + 30n px wide.
const RING_FILES = [
  "6ad1e", "cf0e5", "3b0c7", "34df2", "eea2e", "f4b6b", "e6b2a", "7bead",
  "bd795", "ce90c", "9d16e", "bea59", "fb86f", "0755c", "353e1", "cfb2c",
  "95587", "26c05", "6fd6e", "7dbde", "61a34", "e6030", "e28ee", "debcd",
  "a28d5", "493b1", "c7b12", "5fed0", "21592", "6b89d", "4aa68", "7aa2c",
  "2ea87", "94bba", "3930b", "cb3d4", "c4d9a", "a35df", "9621f", "07754",
  "d58f4", "c80f0", "71b10", "12864", "1c4ff",
];
const MOBILE_RING_COUNT = 24;

const RingArt = () => (
  <>
    {RING_FILES.map((file, i) => {
      const size = 16 + i * 30;
      return (
        <img
          key={file}
          src={`/assets/landing/${file}.svg`}
          alt=""
          aria-hidden="true"
          className={`absolute max-w-none -translate-x-1/2 -translate-y-1/2 ${
            i >= MOBILE_RING_COUNT ? "hidden lg:block" : ""
          }`}
          style={{ left: "28.9%", top: "70.3%", width: size, height: size }}
        />
      );
    })}
  </>
);

const PatternArt = ({ art }: { art: Exclude<ArtKind, "rings"> }) => {
  const files = PATTERN_FILES[art];
  const box = PATTERN_BOX[art];
  return (
    <>
      <img
        src={`/assets/landing/${files.mobile}.svg`}
        alt=""
        aria-hidden="true"
        className={`absolute top-0 h-full max-w-none lg:hidden ${box.mobile || "left-0 w-full"}`}
      />
      <img
        src={`/assets/landing/${files.desktop}.svg`}
        alt=""
        aria-hidden="true"
        className={`absolute top-0 hidden h-full max-w-none lg:block ${box.desktop || "left-0 w-full"}`}
      />
    </>
  );
};

const ActCard = ({ act }: { act: Act }) => {
  const isRed = act.tone === "red";
  return (
    <article
      className={`flex min-w-0 flex-1 flex-col items-start gap-3.5 border-3 border-brut-ink p-[18px] ${
        isRed
          ? "bg-brut-red drop-shadow-[8px_8px_0px_#12110f]"
          : "bg-brut-ink drop-shadow-[8px_8px_0px_#ff2d55]"
      }`}
    >
      <div className="relative h-[170px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[260px]">
        {act.art === "rings" ? <RingArt /> : <PatternArt art={act.art} />}
        <span className="absolute bottom-3 left-4 font-anton text-[56px] leading-[0.95] text-brut-cream uppercase lp-shadow-ink lg:bottom-[18px] lg:left-[33px]">
          {act.label}
        </span>
      </div>
      <div className="flex items-start gap-2.5">
        <span className="bg-brut-cream px-2.5 py-[5px] font-roboto-mono text-[12px] font-bold leading-normal whitespace-nowrap text-brut-ink uppercase">
          {act.time}
        </span>
        <span className="border-2 border-brut-ink bg-brut-paper px-2.5 py-[5px] font-roboto-mono text-[12px] font-bold leading-normal whitespace-nowrap text-brut-ink uppercase">
          {act.venue}
        </span>
      </div>
      <h3 className="font-anton text-[44px] leading-[0.95] text-brut-cream uppercase">{act.name}</h3>
      <p className="font-inter text-[16px] font-medium leading-normal text-[rgba(255,253,247,0.9)]">{act.role}</p>
    </article>
  );
};

const Conclave = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activeDay, setActiveDay] = useState(1);
  const current = DAYS.find((d) => d.day === activeDay) ?? DAYS[0];

  return (
    <BrutPage>
      <BrutNav onNavigate={onNavigate} />

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-14 pb-12 lg:px-14 lg:pt-20 lg:pb-[90px]">
        <h1 className="lp-glitch-hero font-anton text-[84px] leading-[0.95] whitespace-nowrap text-brut-ink uppercase lg:text-[190px]">
          Conclave
        </h1>

        <div className="mt-3.5 flex flex-wrap gap-2.5">
          <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
            <span className="text-brut-red">3</span> days
          </span>
          <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
            <span className="text-brut-red">6</span> acts
          </span>
          <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] font-bold uppercase text-brut-ink">
            <span className="text-brut-red">Free with</span> any pass
          </span>
        </div>

        <div role="tablist" aria-label="Conclave days" className="mt-7 flex gap-3.5 lg:mt-10">
          {DAYS.map((d) => {
            const selected = d.day === activeDay;
            return (
              <button
                key={d.day}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveDay(d.day)}
                className={`cursor-pointer border-3 border-brut-ink px-4 py-3 font-anton text-[28px] leading-[0.95] tracking-[1.68px] whitespace-nowrap uppercase lg:px-6 ${
                  selected
                    ? "bg-brut-ink text-brut-cream drop-shadow-[5px_5px_0px_#ff2d55]"
                    : "bg-brut-cream text-brut-ink drop-shadow-[5px_5px_0px_#12110f]"
                }`}
              >
                Day {d.day}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          className="mt-9 flex flex-col gap-10 lg:mt-5 lg:flex-row lg:gap-10"
        >
          {current.acts.map((act) => (
            <ActCard key={act.name} act={act} />
          ))}
        </div>
      </main>

      <BrutFooter />
    </BrutPage>
  );
};

export default Conclave;
