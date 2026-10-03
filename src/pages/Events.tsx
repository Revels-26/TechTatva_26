import { useState } from "react";
import { BrutFooter, BrutNav, BrutPage, Button, ConcentricRings } from "../components/Brut";

type EventsPageProps = {
  onNavigate: (page: string) => void;
};

// Per-viewer convenience flag. Set to "1" by the sign-in flow; anything else means locked.
const SIGNED_IN_KEY = "tt26-signed-in";

const readSignedIn = (): boolean => {
  try {
    return window.localStorage.getItem(SIGNED_IN_KEY) === "1";
  } catch {
    return false;
  }
};

type UniverseKey = "code" | "machines" | "design" | "business" | "culture";
type ArtKind = "dots" | "stripes" | "cross" | "rings" | "zig";

const UNIVERSES: { key: UniverseKey; name: string; art: ArtKind }[] = [
  { key: "code", name: "Code", art: "dots" },
  { key: "machines", name: "Machines", art: "stripes" },
  { key: "design", name: "Design", art: "rings" },
  { key: "business", name: "Business", art: "cross" },
  { key: "culture", name: "Culture", art: "zig" },
];

// Desktop (1440) and mobile (390) pattern artwork differ in scale, so each has its own asset.
const PATTERNS: Record<"dots" | "stripes" | "cross", { desktop: string; mobile: string }> = {
  dots: { desktop: "/assets/landing/9a7cd.svg", mobile: "/assets/landing/6ed0e.svg" },
  stripes: { desktop: "/assets/landing/51214.svg", mobile: "/assets/landing/8bd9a.svg" },
  cross: { desktop: "/assets/landing/ce5bb.svg", mobile: "/assets/landing/662a3.svg" },
};

type EventEntry = {
  title: string;
  universe: UniverseKey;
  description: string;
  // Day, time, venue, team size, shown as small mono chips.
  chips: [string, string, string, string];
  // Pink drop shadow on every other card in the Figma frames.
  accent?: boolean;
};

const EVENTS: EventEntry[] = [
  { title: "Hack the TechTatva 26", universe: "code", description: "A 24 hour hackathon. Build anything that connects two worlds.", chips: ["Day 1 14 Oct", "9:00 AM", "CS Lab Block", "Team of 3"] },
  { title: "Capture the Flag", universe: "code", description: "Web, crypto and forensics puzzles, beginner friendly.", chips: ["Day 2 15 Oct", "2:00 PM", "Seminar Hall 2", "Team of 2"], accent: true },
  { title: "Debug Duel", universe: "code", description: "Two players, one broken program, first to fix it wins.", chips: ["Day 3 16 Oct", "11:00 AM", "CS Lab 2", "Solo"] },
  { title: "Line Follower Showdown", universe: "machines", description: "Bring your bot or build one on site. Fastest clean lap wins.", chips: ["Day 1 14 Oct", "10:00 AM", "Mechanical Workshop", "Team of 3"] },
  { title: "Drone Dash", universe: "machines", description: "Fly a quadcopter through a gate course against the clock.", chips: ["Day 2 15 Oct", "10:30 AM", "Open Ground", "Team of 2"], accent: true },
  { title: "Circuit Escape Room", universe: "machines", description: "Solve electronics puzzles to unlock the door.", chips: ["Day 3 16 Oct", "12:00 PM", "Electronics Lab", "Team of 3"] },
  { title: "Poster Slam", universe: "design", description: "Design a festival poster live in two hours from a surprise brief.", chips: ["Day 1 14 Oct", "3:00 PM", "Design Studio", "Solo"] },
  { title: "Pixel Heist", universe: "design", description: "A UI redesign sprint: fix a confusing app screen in 90 minutes.", chips: ["Day 2 15 Oct", "11:00 AM", "Design Studio", "Team of 2"], accent: true },
  { title: "Startup Pitch Arena", universe: "business", description: "Pitch an idea in three minutes to a panel of mentors.", chips: ["Day 2 15 Oct", "4:00 PM", "Seminar Hall 1", "Team of 4"] },
  { title: "Case Crunch", universe: "business", description: "Solve a real-style business case and defend your answer.", chips: ["Day 3 16 Oct", "10:00 AM", "Seminar Hall 1", "Team of 3"] },
  { title: "Open Mic Night", universe: "culture", description: "Sing, play, rap or recite. Five minutes each.", chips: ["Day 1 14 Oct", "6:30 PM", "Canteen Lawn", "Solo"], accent: true },
  { title: "Dance-off", universe: "culture", description: "Solo and crew rounds, judged on energy and originality.", chips: ["Day 1 14 Oct", "7:30 PM", "Auditorium", "Solo or crew"] },
  { title: "Street Play Showdown", universe: "culture", description: "Twenty minutes, one message, no stage, no mics.", chips: ["Day 2 15 Oct", "5:00 PM", "Open Air Theatre", "Team of 8"] },
  { title: "Battle of Bands", universe: "culture", description: "Six bands, one stage, the loudest night of the fest.", chips: ["Day 3 16 Oct", "7:30 PM", "Quadrangle", "Band of 3 to 5"], accent: true },
];

const PatternArt = ({ kind }: { kind: "dots" | "stripes" | "cross" }) => (
  <>
    <img src={PATTERNS[kind].mobile} alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none object-cover lg:hidden" />
    <img src={PATTERNS[kind].desktop} alt="" aria-hidden="true" className="absolute inset-0 hidden size-full max-w-none object-cover lg:block" />
  </>
);

const ArtBox = ({ art }: { art: ArtKind }) => (
  <div className="relative h-[90px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[110px]">
    {art === "rings" ? <ConcentricRings /> : <PatternArt kind={art === "zig" ? "stripes" : art} />}
  </div>
);

const UniverseCard = ({
  name,
  art,
  count,
  active,
  onClick,
}: {
  name: string;
  art: ArtKind;
  count: number;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`flex w-full cursor-pointer flex-col items-start gap-2 border-3 border-brut-ink p-3 text-left lg:flex-1 ${
      active
        ? "bg-brut-ink text-brut-cream drop-shadow-[6px_6px_0px_#ff2d55]"
        : "bg-brut-cream text-brut-ink drop-shadow-[6px_6px_0px_#12110f]"
    }`}
  >
    <ArtBox art={art} />
    <span className="font-anton text-[30px] leading-[0.95] uppercase">{name}</span>
    <span
      className={`font-roboto-mono text-[11px] font-bold tracking-[0.66px] uppercase ${
        active ? "text-brut-cream" : "text-[#6b675c]"
      }`}
    >
      {count} events
    </span>
  </button>
);

const EventCard = ({ event, universeName }: { event: EventEntry; universeName: string }) => (
  <article
    className={`flex flex-col items-start gap-2.5 border-3 border-brut-ink bg-brut-cream p-4 ${
      event.accent ? "drop-shadow-[6px_6px_0px_#ff2d55]" : "drop-shadow-[6px_6px_0px_#12110f]"
    }`}
  >
    <span className="bg-brut-ink px-2 py-[3px] font-roboto-mono text-[11px] font-bold tracking-[0.66px] text-brut-cream uppercase">
      {universeName}
    </span>
    <h3 className="font-anton text-[30px] leading-[0.95] text-brut-ink uppercase">{event.title}</h3>
    <p className="font-inter text-[14px] leading-normal text-brut-body">{event.description}</p>
    <div className="flex flex-wrap gap-2">
      {event.chips.map((chip) => (
        <span
          key={chip}
          className="border-[1.5px] border-brut-ink bg-brut-paper px-2 py-1 font-roboto-mono text-[11px] font-bold whitespace-nowrap text-brut-ink"
        >
          {chip}
        </span>
      ))}
    </div>
  </article>
);

const LockedCard = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <div className="flex justify-center pt-[30px] pb-[70px] lg:pb-[140px]">
    <div className="relative flex w-full max-w-[358px] flex-col items-center gap-4 border-3 border-brut-ink bg-brut-cream px-5 pt-11 pb-[34px] drop-shadow-[9px_9px_0px_#12110f] lg:max-w-[640px] lg:px-10">
      <span className="absolute -top-[19px] left-[19px] bg-brut-ink px-3 py-1 font-roboto-mono text-[11px] font-bold tracking-[1.1px] text-brut-cream uppercase">
        Registered travellers only
      </span>
      <img src="/assets/landing/5a718.svg" alt="" aria-hidden="true" className="h-[106px] w-[84px]" />
      <h2 className="text-center font-anton text-[36px] leading-[0.95] text-brut-ink uppercase [text-shadow:3px_0px_0px_#ff2d55,-3px_0px_0px_#00b8d9] lg:text-[48px]">
        Events are for registered travellers
      </h2>
      <p className="text-center font-inter text-[16px] leading-normal text-brut-body">
        Register once, or log in, to see every event across the TechTatva 26.
      </p>
      <div className="flex flex-wrap justify-center gap-3.5">
        <Button variant="ink" large onClick={() => onNavigate("signup")}>Register</Button>
        <Button variant="cream" large onClick={() => onNavigate("signin")}>Log in</Button>
      </div>
    </div>
  </div>
);

export default function EventsPage({ onNavigate }: EventsPageProps) {
  const signedIn = readSignedIn();
  const [activeUniverse, setActiveUniverse] = useState<UniverseKey | null>(null);

  const universeName = (key: UniverseKey) => UNIVERSES.find((u) => u.key === key)?.name ?? key;
  const visible = activeUniverse ? EVENTS.filter((e) => e.universe === activeUniverse) : EVENTS;
  const activeLabel = activeUniverse ? universeName(activeUniverse) : null;

  return (
    <BrutPage>
      <BrutNav onNavigate={onNavigate} />
      <main className="mx-auto w-full max-w-[1440px] px-4 lg:px-14">
        <h1 className="pt-[30px] pb-5 font-anton text-[84px] leading-[0.95] text-brut-ink uppercase lp-glitch-hero lg:pt-[60px] lg:text-[170px]">
          Events
        </h1>

        {!signedIn && <LockedCard onNavigate={onNavigate} />}

        {signedIn && (
          <>
            <div className="flex flex-col gap-4 pt-3.5 pb-2 lg:flex-row">
              {UNIVERSES.map((u) => (
                <UniverseCard
                  key={u.key}
                  name={u.name}
                  art={u.art}
                  count={EVENTS.filter((e) => e.universe === u.key).length}
                  active={activeUniverse === u.key}
                  onClick={() => setActiveUniverse(activeUniverse === u.key ? null : u.key)}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-[18px] pb-2">
              <p className="font-roboto-mono text-[13px] font-bold tracking-[0.78px] text-brut-ink uppercase">
                {activeLabel
                  ? `${visible.length} events in ${activeLabel}`
                  : `${EVENTS.length} events across ${UNIVERSES.length} universes`}
              </p>
              {activeUniverse && (
                <button
                  type="button"
                  onClick={() => setActiveUniverse(null)}
                  className="cursor-pointer border-2 border-brut-ink bg-brut-cream px-3.5 py-1.5 font-roboto-mono text-[12px] font-bold text-brut-ink uppercase"
                >
                  Show all
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 pt-3.5 pb-[70px] lg:grid-cols-3 lg:pb-[90px]">
              {visible.map((event) => (
                <EventCard key={event.title} event={event} universeName={universeName(event.universe)} />
              ))}
            </div>
          </>
        )}
      </main>
      <BrutFooter />
    </BrutPage>
  );
}
