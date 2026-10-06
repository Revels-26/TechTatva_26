import { useState } from "react";
import { AppNav, BrutFooter, BrutPage } from "../components/Brut";
import { UNIVERSES, type UniverseKey } from "../data/events";
import { categoryLogoSrc, type EventSummary } from "../data/timetable";
import { useEventSummaries, useTimetableRows } from "../lib/liveData";

type EventsPageProps = {
  onNavigate: (page: string) => void;
};

const UniverseCard = ({
  name,
  image,
  shadow,
  active,
  onClick,
}: {
  name: string;
  image: string;
  shadow: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`isolate relative flex w-full cursor-pointer flex-col items-start gap-2 overflow-hidden border-3 border-brut-ink p-3 text-left lg:flex-1 ${
      active ? "bg-brut-ink text-brut-cream" : "bg-brut-cream text-brut-ink"
    }`}
    style={{ boxShadow: `6px 6px 0px 0px ${shadow}` }}
  >
    <img src={image} alt="" aria-hidden="true" className="absolute inset-0 -z-10 size-full object-cover opacity-20" />
    <div className="relative h-[90px] w-full shrink-0 overflow-hidden border-3 border-brut-ink bg-brut-paper lg:h-[110px]">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
    </div>
    <span className="font-anton text-[30px] leading-[0.95] uppercase">{name}</span>
  </button>
);

// Event card as laid out in the Figma "Tech Tatva 26" events frame. Sizes are scaled to the grid column.
// "1" is an individual event. A number or range like "2-4" is a team of that size. Blank means not known yet.
const peopleText = (people: string | null) => {
  if (!people) return "People: TBA";
  if (people.trim() === "1") return "Individual event";
  return `Team of ${people.trim()}`;
};

const EventCard = ({ event }: { event: EventSummary }) => {
  const reality = UNIVERSES.find((u) => u.key === event.reality);
  const rows = [
    { icon: "/assets/events/person.svg", text: peopleText(event.people) },
    { icon: "/assets/events/pin.svg", text: event.venues.join(" · ") || "TBA" },
    {
      icon: "/assets/events/rocket.svg",
      text: `${event.dates.join(", ")}${event.start ? ` · ${event.start}` : ""}`,
    },
  ];

  return (
    <article className="isolate relative flex flex-col pt-6 pb-3" style={{ boxShadow: "6px 6px 0px 0px #12110f" }}>
      <img
        src="/assets/events/photo.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <img
        src="/assets/events/photo.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[270px] w-full object-cover"
      />

      <div className="relative mx-[18px] flex flex-col gap-2.5 bg-[#fafafa] p-[17px]">
        <div className="flex items-start justify-between gap-2.5">
          <img
            src={categoryLogoSrc(event.category)}
            alt=""
            aria-hidden="true"
            className="size-[70px] shrink-0 rounded-full object-cover"
          />
          <span
            className="flex h-[26px] items-center justify-center px-3 font-inter text-[15px] text-black"
            style={{ backgroundColor: reality?.shadow }}
          >
            {reality?.name}
          </span>
        </div>

        <h3 className="font-chakra text-[23px] leading-none text-black">{event.title}</h3>
        <p className="font-inter text-[15px] leading-none text-[#4a4a4a]">{event.category}</p>

        <ul className="flex flex-col gap-2.5 font-inter text-[15px] leading-none text-black">
          {rows.map((row) => (
            <li key={row.icon} className="flex items-center gap-2.5">
              <img src={row.icon} alt="" aria-hidden="true" className="size-[19px] shrink-0" />
              <span className="min-w-0 break-words">{row.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default function EventsPage({ onNavigate }: EventsPageProps) {
  const { data: timetable, error: timetableError } = useTimetableRows();
  const { data: summaries, error: eventsError } = useEventSummaries(timetable);
  const list = summaries ?? [];
  const [activeUniverse, setActiveUniverse] = useState<UniverseKey | null>(null);

  const universeName = (key: UniverseKey) => UNIVERSES.find((u) => u.key === key)?.name ?? key;
  const visible = activeUniverse ? list.filter((e) => e.reality === activeUniverse) : list;
  const activeLabel = activeUniverse ? universeName(activeUniverse) : null;

  return (
    <BrutPage>
      <AppNav onNavigate={onNavigate} page="events" />
      <main className="mx-auto w-full max-w-[1440px] px-4 lg:px-14">
        <h1 className="pt-[30px] pb-5 font-anton text-[84px] leading-[0.95] text-brut-ink uppercase lg:pt-[60px] lg:text-[170px]">
          Events
        </h1>

        <h2 className="pt-6 pb-5 font-anton text-[44px] leading-[0.95] text-brut-ink uppercase lg:text-[60px]">
          Pick your <span className="text-[#1f5fd6]">reality</span>
        </h2>

        <div className="flex flex-col gap-4 pb-2 lg:flex-row lg:gap-5">
          {UNIVERSES.map((u) => (
            <UniverseCard
              key={u.key}
              name={u.name}
              image={`/category_logos/${u.key}.png`}
              shadow={u.shadow}
              active={activeUniverse === u.key}
              onClick={() => setActiveUniverse(activeUniverse === u.key ? null : u.key)}
            />
          ))}
        </div>

        {summaries ? (
          <>
        <div className="flex flex-col gap-3 pt-[18px] pb-2">
          <div className="flex flex-wrap items-center gap-3.5">
            <p className="font-roboto-mono text-[12px] text-[#6b675c]">
              {activeLabel
                ? `Showing ${visible.length} events in ${activeLabel}`
                : `Showing all ${list.length} events across ${UNIVERSES.length} realities`}
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

        <div className="grid grid-cols-1 gap-8 pt-4 pb-[60px] lg:grid-cols-4 lg:gap-6 lg:pb-[80px]">
          {visible.map((event) => (
            <EventCard key={`${event.category}-${event.title}`} event={event} />
          ))}
        </div>
          </>
        ) : (
          <p className="mt-8 mb-[60px] border-3 border-dashed border-brut-ink bg-brut-cream p-6 font-inter text-[16px] text-brut-body lg:mt-10 lg:mb-[100px]">
            {eventsError || timetableError
              ? "The events couldn't load right now. Refresh the page to try again."
              : "Loading the events…"}
          </p>
        )}
      </main>
      <BrutFooter />
    </BrutPage>
  );
}
