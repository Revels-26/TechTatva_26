import { useState } from "react";
import { AppNav, BrutFooter, BrutPage, Button, ConcentricRings } from "../components/Brut";

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

// Shadow colour per universe card, as in the Figma "D4 Events & Schedule" frame (121:800).
const UNIVERSES: { key: UniverseKey; name: string; art: ArtKind; shadow: string }[] = [
  { key: "code", name: "Code", art: "dots", shadow: "#59a7ff" },
  { key: "machines", name: "Machines", art: "stripes", shadow: "#2db84d" },
  { key: "design", name: "Design", art: "rings", shadow: "#ffc93c" },
  { key: "business", name: "Business", art: "cross", shadow: "#59a7ff" },
  { key: "culture", name: "Culture", art: "zig", shadow: "#ff8c42" },
];

// Desktop (1440) and mobile (390) pattern artwork differ in scale, so each has its own asset.
const PATTERNS: Record<"dots" | "stripes" | "cross", { desktop: string; mobile: string }> = {
  dots: { desktop: "/assets/landing/9a7cd.svg", mobile: "/assets/landing/6ed0e.svg" },
  stripes: { desktop: "/assets/landing/51214.svg", mobile: "/assets/landing/8bd9a.svg" },
  cross: { desktop: "/assets/landing/ce5bb.svg", mobile: "/assets/landing/662a3.svg" },
};

// Event cards cycle blue, green, yellow down the grid.
const CARD_SHADOWS = ["#59a7ff", "#2db84d", "#ffc93c"];

type EventEntry = {
  title: string;
  universe: UniverseKey;
  description: string;
  // Day, time, venue, team size, shown as small mono chips.
  chips: [string, string, string, string];
  // Who the event is open to. Defaults to all streams.
  openTo?: string;
};

const ALL_STREAMS = "All streams";

const EVENTS: EventEntry[] = [
  { title: "Hack the Tatverse", universe: "code", description: "A 24 hour hackathon. Build anything that connects two worlds.", chips: ["Day 1 // 29 Oct", "9:00 AM", "CS Lab Block", "Team of 3"] },
  { title: "Capture the Flag", universe: "code", description: "Web, crypto and forensics puzzles, beginner friendly.", chips: ["Day 2 // 30 Oct", "2:00 PM", "Seminar Hall 2", "Team of 2"] },
  { title: "Debug Duel", universe: "code", description: "Two players, one broken program, first to fix it wins.", chips: ["Day 3 // 31 Oct", "11:00 AM", "CS Lab 2", "Solo"] },
  { title: "Line Follower Showdown", universe: "machines", description: "Bring your bot or build one on site. Fastest clean lap wins.", chips: ["Day 1 // 29 Oct", "10:00 AM", "Mechanical Workshop", "Team of 3"] },
  { title: "Drone Dash", universe: "machines", description: "Fly a quadcopter through a gate course against the clock.", chips: ["Day 2 // 30 Oct", "10:30 AM", "Open Ground", "Team of 2"] },
  { title: "Circuit Escape Room", universe: "machines", description: "Solve electronics puzzles to unlock the door.", chips: ["Day 3 // 31 Oct", "12:00 PM", "Electronics Lab", "Team of 3"], openTo: "Engineering and Science streams" },
  { title: "Poster Slam", universe: "design", description: "Design a festival poster live in two hours from a surprise brief.", chips: ["Day 1 // 29 Oct", "3:00 PM", "Design Studio", "Solo"] },
  { title: "Pixel Heist", universe: "design", description: "A UI redesign sprint: fix a confusing app screen in 90 minutes.", chips: ["Day 2 // 30 Oct", "11:00 AM", "Design Studio", "Team of 2"] },
  { title: "Startup Pitch Arena", universe: "business", description: "Pitch an idea in three minutes to a panel of mentors.", chips: ["Day 2 // 30 Oct", "4:00 PM", "Seminar Hall 1", "Team of 4"] },
  { title: "Case Crunch", universe: "business", description: "Solve a real-style business case and defend your answer.", chips: ["Day 3 // 31 Oct", "10:00 AM", "Seminar Hall 1", "Team of 3"], openTo: "Management and all other streams" },
  { title: "Open Mic Night", universe: "culture", description: "Sing, play, rap or recite. Five minutes each.", chips: ["Day 1 // 29 Oct", "6:30 PM", "Canteen Lawn", "Solo"] },
  { title: "Dance-off", universe: "culture", description: "Solo and crew rounds, judged on energy and originality.", chips: ["Day 1 // 29 Oct", "7:30 PM", "Auditorium", "Solo or crew"] },
  { title: "Street Play Showdown", universe: "culture", description: "Twenty minutes, one message, no stage, no mics.", chips: ["Day 2 // 30 Oct", "5:00 PM", "Open Air Theatre", "Team of 8"] },
  { title: "Battle of Bands", universe: "culture", description: "Six bands, one stage, the loudest night of the fest.", chips: ["Day 3 // 31 Oct", "7:30 PM", "Quadrangle", "Band of 3 to 5"] },
];

const HISTORY_TABS = ["Events", "Conclave", "Merchandise"] as const;

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
  shadow,
  count,
  active,
  onClick,
}: {
  name: string;
  art: ArtKind;
  shadow: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`flex w-full cursor-pointer flex-col items-start gap-2 border-3 border-brut-ink p-3 text-left lg:flex-1 ${
      active ? "bg-brut-ink text-brut-cream" : "bg-brut-cream text-brut-ink"
    }`}
    style={{ boxShadow: `6px 6px 0px 0px ${shadow}` }}
  >
    <ArtBox art={art} />
    <span className="font-anton text-[30px] leading-[0.95] uppercase">{name}</span>
    <span
      className={`font-roboto-mono text-[11px] tracking-[0.66px] ${active ? "text-brut-cream" : "text-[#6b675c]"}`}
    >
      {count} events
    </span>
  </button>
);

const EventCard = ({ event, universeName, shadow }: { event: EventEntry; universeName: string; shadow: string }) => (
  <article
    className="flex flex-col items-start gap-2.5 border-3 border-brut-ink bg-white p-4"
    style={{ boxShadow: `6px 6px 0px 0px ${shadow}` }}
  >
    <span className="bg-brut-ink px-2 py-[3px] font-roboto-mono text-[11px] tracking-[0.66px] text-brut-cream uppercase">
      {universeName}
    </span>
    <h3 className="font-anton text-[30px] leading-[0.95] text-brut-ink uppercase">{event.title}</h3>
    <p className="font-inter text-[14px] leading-normal text-brut-body">{event.description}</p>
    <div className="flex flex-wrap gap-2">
      {event.chips.map((chip) => (
        <span
          key={chip}
          className="border-[1.5px] border-brut-ink bg-brut-cream px-2 py-1 font-roboto-mono text-[11px] whitespace-nowrap text-brut-ink"
        >
          {chip}
        </span>
      ))}
    </div>
    <p className="font-inter text-[12px] text-[#6b675c]">Open to: {event.openTo ?? ALL_STREAMS}</p>
  </article>
);

const LockedCard = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <div className="flex justify-center pt-[30px] pb-[70px] lg:pb-[140px]">
    <div className="relative flex w-full max-w-[358px] flex-col items-center gap-4 border-3 border-brut-ink bg-brut-cream px-5 pt-11 pb-[34px] drop-shadow-[9px_9px_0px_#59a7ff] lg:max-w-[640px] lg:px-10">
      <span className="absolute -top-[19px] left-[19px] bg-brut-ink px-3 py-1 font-roboto-mono text-[11px] font-bold tracking-[1.1px] text-brut-cream uppercase">
        Registered travellers only
      </span>
      <img src="/assets/landing/5a718.svg" alt="" aria-hidden="true" className="h-[106px] w-[84px]" />
      <h2 className="text-center font-anton text-[36px] leading-[0.95] text-brut-ink uppercase lg:text-[48px]">
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
  const [historyTab, setHistoryTab] = useState<(typeof HISTORY_TABS)[number]>("Events");

  const universeName = (key: UniverseKey) => UNIVERSES.find((u) => u.key === key)?.name ?? key;
  const visible = activeUniverse ? EVENTS.filter((e) => e.universe === activeUniverse) : EVENTS;
  const activeLabel = activeUniverse ? universeName(activeUniverse) : null;

  return (
    <BrutPage>
      <AppNav onNavigate={onNavigate} page="events" />
      <main className="mx-auto w-full max-w-[1440px] px-4 lg:px-14">
        <h1 className="pt-[30px] pb-5 font-anton text-[84px] leading-[0.95] text-brut-ink uppercase lg:pt-[60px] lg:text-[170px]">
          Events
        </h1>

        {!signedIn && <LockedCard onNavigate={onNavigate} />}

        {signedIn && (
          <>
            <h2 className="pt-6 pb-5 font-anton text-[44px] leading-[0.95] text-brut-ink uppercase lg:text-[60px]">
              Pick your <span className="text-[#1f5fd6]">universe</span>
            </h2>

            <div className="flex flex-col gap-4 pb-2 lg:flex-row lg:gap-5">
              {UNIVERSES.map((u) => (
                <UniverseCard
                  key={u.key}
                  name={u.name}
                  art={u.art}
                  shadow={u.shadow}
                  count={EVENTS.filter((e) => e.universe === u.key).length}
                  active={activeUniverse === u.key}
                  onClick={() => setActiveUniverse(activeUniverse === u.key ? null : u.key)}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-[18px] pb-2">
              <div className="flex gap-3 overflow-x-auto border-3 border-brut-ink bg-brut-cream px-2 py-1.5">
                {EVENTS.slice(0, 6).map((e) => (
                  <span
                    key={e.title}
                    className="shrink-0 border-2 border-brut-ink bg-white px-2.5 py-1 font-roboto-mono text-[11px] whitespace-nowrap text-brut-ink uppercase"
                  >
                    {e.title}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3.5">
                <p className="font-roboto-mono text-[12px] text-[#6b675c]">
                  {activeLabel
                    ? `Showing ${visible.length} events in ${activeLabel}`
                    : `Showing all ${EVENTS.length} events across ${UNIVERSES.length} universes`}
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
            </div>

            <div className="grid grid-cols-1 gap-8 pt-4 pb-[60px] lg:grid-cols-3 lg:gap-7 lg:pb-[80px]">
              {visible.map((event, i) => (
                <EventCard
                  key={event.title}
                  event={event}
                  universeName={universeName(event.universe)}
                  shadow={CARD_SHADOWS[i % CARD_SHADOWS.length]}
                />
              ))}
            </div>

            <h2 className="pb-5 font-anton text-[44px] leading-[0.95] text-brut-ink uppercase lg:text-[60px]">
              Schedule <span className="text-[#1f5fd6]">&amp; history</span>
            </h2>
            <div className="mb-[70px] border-3 border-brut-ink bg-brut-cream drop-shadow-[8px_8px_0px_#aef5c4] lg:mb-[120px]">
              <div className="flex flex-col gap-3 border-b-3 border-brut-ink bg-[#f1f4ee] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="font-inter text-[16px] font-semibold text-brut-ink">Your events &amp; purchase history</p>
                <div role="tablist" aria-label="History" className="flex flex-wrap gap-2.5">
                  {HISTORY_TABS.map((tab) => {
                    const selected = historyTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setHistoryTab(tab)}
                        className={`cursor-pointer border-2 border-brut-ink px-4 py-2 font-anton text-[18px] tracking-[0.9px] uppercase ${
                          selected
                            ? "bg-brut-ink text-brut-cream drop-shadow-[4px_4px_0px_#59a7ff]"
                            : "bg-brut-cream text-brut-ink drop-shadow-[4px_4px_0px_#12110f]"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
                <p className="font-inter text-[16px] font-semibold text-brut-ink">
                  It appears that you haven't either joined any events or created any events Team.
                </p>
                <p className="font-inter text-[15px] text-[#6b675c]">
                  Let's make memories together! Start by joining or creating events Team now.
                </p>
              </div>
            </div>
          </>
        )}
      </main>
      <BrutFooter />
    </BrutPage>
  );
}
