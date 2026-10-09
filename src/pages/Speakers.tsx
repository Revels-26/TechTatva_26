import { useState } from "react";
import { AppNav, BrutFooter, BrutPage } from "../components/Brut";
import { openRegistration } from "../lib/navigation";

type ArtKind = "stripes" | "cross" | "dots" | "zig" | "rings";

type Act = {
  name: string;
  label?: string;
  time: string;
  venue: string;
  role: string;
  description: string;
  art?: ArtKind;
  image?: string;
  imagePosition?: string;
};

// Lineup per Conclave day
const DAYS: { day: number; date: string; acts: Act[] }[] = [
  {
    day: 1,
    date: "16 October 2026",
    acts: [
      {
        name: "Avijit Patra",
        label: "Avijit",
        time: "4:30 PM",
        venue: "Quadrangle, AB1",
        role: "Cybersecurity Expert",
        description:
          "A cybersecurity leader and Director of IT Security at PwC India, bringing over two decades of experience in cybersecurity, technology leadership and building resilient digital ecosystems.",
        art: "stripes",
        image: "https://res.cloudinary.com/z3yzbu8u/image/upload/v1791547523/avijit.jpg",
      },
      {
        name: "Noel Curtis",
        label: "Noel",
        time: "4:30 PM",
        venue: "Quadrangle, AB1",
        role: "Technology Leader",
        description:
          "As CTO of BookMyShow, Noel Curtis leads technology at the heart of one of India’s largest entertainment platforms, bringing years of experience in building and scaling technology-driven products.",
        art: "stripes",
        image: "https://res.cloudinary.com/z3yzbu8u/image/upload/v1791547302/noel.avif",
      },
      {
        name: "Pranav Sharma",
        label: "Pranav",
        time: "4:30 PM",
        venue: "Quadrangle, AB1",
        role: "Comedian",
        description:
          "With his relatable storytelling, witty takes on modern relationships and infectious stage presence, Pranav Sharma has quickly built a growing audience both online and across live comedy stages.",
        art: "stripes",
        image: "https://res.cloudinary.com/z3yzbu8u/image/upload/v1791547028/pranav_rz_1.png",
      },
    ],
  },
  {
    day: 2,
    date: "17 October 2026",
    acts: [
      {
        name: "Akash Gupta",
        label: "Akash",
        time: "4:30 PM",
        venue: "Quadrangle, AB1",
        role: "Entrepreneur",
        description:
          "The Co-Founder & CEO of Zypp Electric, Akash Gupta is building India’s EV-powered delivery ecosystem while sharing his journey of entrepreneurship, scaling businesses and creating sustainable solutions.",
        art: "stripes",
        image: "https://res.cloudinary.com/z3yzbu8u/image/upload/v1791545210/akash_gupta_risz.png",
      },
      {
        name: "Anupam Mittal",
        label: "Anupam",
        time: "4:30 PM",
        venue: "Quadrangle, AB1",
        role: "Entrepreneur & Investor",
        description:
          "The founder of Shaadi.com and People Group, and a familiar face from Shark Tank India, Anupam Mittal is a leading entrepreneur and investor with decades of experience building and backing ambitious businesses.",
        art: "stripes",
        image: "https://res.cloudinary.com/z3yzbu8u/image/upload/v1791544358/ANUPAM_resized.jpg",
      },
      {
        name: "Kaustubh Agarwal",
        label: "Kaustubh",
        time: "4:30 PM",
        venue: "Quadrangle, AB1",
        role: "Comedian",
        description:
          "Known for his sharp observational humour and unapologetically honest takes on relationships, dating and everyday chaos, Kaustubh Agarwal is one of the exciting voices in India’s stand-up comedy scene.",
        art: "stripes",
        image: "https://res.cloudinary.com/z3yzbu8u/image/upload/v1791546245/resized-image-compressed.jpg",
      },
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

// Alternating accent colors for cards
const ActCard = ({ act, accent }: { act: Act; accent: "blue" | "green" }) => (
  <article
    className={`flex min-w-0 flex-1 flex-col border-3 border-brut-ink bg-white ${
      accent === "blue" ? "drop-shadow-[8px_8px_0px_#59a7ff]" : "drop-shadow-[8px_8px_0px_#2db84d]"
    }`}
  >
    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden border-b-3 border-brut-ink bg-[#aef5c4] md:aspect-[3/4] lg:aspect-[4/5]">
      {act.image ? (
        <img
          src={act.image}
          alt={act.name}
          className={`absolute inset-0 size-full object-cover ${act.imagePosition ?? "object-top"}`}
        />
      ) : act.art === "rings" ? (
        <RingArt />
      ) : act.art ? (
        <PatternArt art={act.art} />
      ) : null}
    </div>
    <div className="flex flex-1 flex-col items-start justify-between gap-4 p-5 lg:p-6">
      <div className="flex flex-col items-start gap-2.5">
        <p className="font-roboto-mono text-[12px] font-bold tracking-[1.2px] text-[#1f5fd6] uppercase">{act.role}</p>
        <h3 className="font-anton text-[30px] leading-[0.95] text-brut-ink uppercase lg:text-[34px]">{act.name}</h3>
        <p className="font-inter text-[15px] leading-relaxed text-brut-body">{act.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="bg-brut-ink px-2.5 py-1 font-roboto-mono text-[12px] text-brut-cream">{act.time}</span>
        <span className="border-2 border-brut-ink bg-brut-cream px-2.5 py-1 font-roboto-mono text-[12px] text-brut-ink">
          {act.venue}
        </span>
      </div>
    </div>
  </article>
);

const GateNoticeCard = ({ className = "" }: { className?: string }) => (
  <div
    className={`flex flex-col gap-3 border-3 border-brut-ink bg-[#fff5f5] px-5 py-3.5 drop-shadow-[6px_6px_0px_#ff4a4a] sm:flex-row sm:items-center sm:justify-between lg:px-6 ${className}`}
  >
    <div className="flex flex-wrap items-center gap-3">
      <span className="border-2 border-brut-ink bg-[#c8102e] px-2.5 py-0.5 font-roboto-mono text-[11px] font-bold tracking-[1.1px] text-white uppercase">
        Notice
      </span>
      <p className="font-inter text-[15px] font-semibold text-brut-ink lg:text-[16px]">
        Gate closes strictly at <span className="text-[#c8102e] underline decoration-2 underline-offset-2">5:30 PM</span> for Conclave. Please be seated on time.
      </p>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      <span className="border-2 border-brut-ink bg-brut-ink px-3 py-1 font-roboto-mono text-[12px] font-bold text-brut-cream uppercase">
        Last Entry: 5:30 PM
      </span>
    </div>
  </div>
);

const Conclave = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activeDay, setActiveDay] = useState(1);
  const current = DAYS.find((d) => d.day === activeDay) ?? DAYS[0];

  return (
    <BrutPage>
      <AppNav onNavigate={onNavigate} page="speakers" />

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-10 pb-12 lg:px-[100px] lg:pt-[60px] lg:pb-[90px]">
        <h1 className="font-anton text-[84px] leading-[0.95] whitespace-nowrap text-brut-ink uppercase lg:text-[190px]">
          Conclave
        </h1>

        <GateNoticeCard className="mt-6 lg:mt-8" />

        <div className="mt-4 flex flex-col gap-4 border-3 border-brut-ink bg-[#f1f4ee] px-5 py-4 drop-shadow-[8px_8px_0px_#aef5c4] lg:mt-5 lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-5">
          <p className="font-inter text-[16px] text-brut-ink lg:text-[18px]">
            <span className="font-semibold text-[#2db84d]">Join the Conclave</span> and tap into the knowledge of industry experts.
          </p>
          <button
            type="button"
            onClick={openRegistration}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center self-start border-3 border-brut-ink bg-[#1f5fd6] px-6 py-2.5 font-anton text-[20px] leading-[0.95] tracking-[1.2px] whitespace-nowrap text-white uppercase drop-shadow-[5px_5px_0px_#12110f] lg:self-auto"
          >
            Buy ticket
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-inter text-[18px] font-semibold text-brut-ink">Upcoming Conclave Event</p>
            <p className="font-roboto-mono text-[13px] text-[#6b675c]">
              Date : {current.date} - Day {current.day}
            </p>
          </div>

          <div role="tablist" aria-label="Conclave days" className="flex gap-3.5">
            {DAYS.map((d) => {
              const selected = d.day === activeDay;
              return (
                <button
                  key={d.day}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveDay(d.day)}
                  className={`cursor-pointer border-3 border-brut-ink px-4 py-2.5 font-anton text-[22px] leading-[0.95] tracking-[1.32px] whitespace-nowrap uppercase lg:px-6 ${
                    selected
                      ? "bg-brut-ink text-brut-cream drop-shadow-[5px_5px_0px_#59a7ff]"
                      : "bg-white text-brut-ink drop-shadow-[5px_5px_0px_#12110f]"
                  }`}
                >
                  Day {d.day}
                </button>
              );
            })}
          </div>
        </div>

        <div role="tabpanel" className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {current.acts.map((act, i) => (
            <ActCard key={act.name} act={act} accent={i % 2 === 0 ? "blue" : "green"} />
          ))}
        </div>
      </main>

      <BrutFooter />
    </BrutPage>
  );
};

export default Conclave;
