import { useState } from "react";
import { AppNav, BrutFooter, BrutPage, ConcentricRings } from "../components/Brut";
import { ALL_STREAMS, EVENTS, UNIVERSES, type ArtKind, type EventEntry, type UniverseKey } from "../data/events";

type EventsPageProps = {
  onNavigate: (page: string) => void;
};

// Desktop (1440) and mobile (390) pattern artwork differ in scale, so each has its own asset.
const PATTERNS: Record<"dots" | "stripes" | "cross", { desktop: string; mobile: string }> = {
  dots: { desktop: "/assets/landing/9a7cd.svg", mobile: "/assets/landing/6ed0e.svg" },
  stripes: { desktop: "/assets/landing/51214.svg", mobile: "/assets/landing/8bd9a.svg" },
  cross: { desktop: "/assets/landing/ce5bb.svg", mobile: "/assets/landing/662a3.svg" },
};

// Event cards cycle blue, green, yellow down the grid.
const CARD_SHADOWS = ["#59a7ff", "#2db84d", "#ffc93c"];


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

export default function EventsPage({ onNavigate }: EventsPageProps) {
  const [activeUniverse, setActiveUniverse] = useState<UniverseKey | null>(null);

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
      </main>
      <BrutFooter />
    </BrutPage>
  );
}
