import { useMemo, useState } from "react";
import { SITE } from "../config/site";
import { EVENTS, UNIVERSES, type EventEntry, type UniverseKey } from "../data/events";
import { AppNav, BrutFooter, BrutPage, Button } from "../components/Brut";

type TimetablePageProps = {
  onNavigate: (page: string) => void;
};

// Offset colours cycle down the list, as on the Events page.
const ROW_SHADOWS = ["#59a7ff", "#2db84d", "#ffc93c"];

// Chips are ["Day 1 // 14 Oct", "9:00 AM", venue, team size]. Split them into the parts the timetable needs.
const parseDay = (chip: string) => {
  const [dayPart, datePart] = chip.split("//").map((s) => s.trim());
  return { day: Number(dayPart.replace("Day", "").trim()), date: datePart };
};

// "9:00 AM" -> minutes since midnight, so events sort in clock order.
const toMinutes = (time: string) => {
  const [clock, meridiem] = time.split(" ");
  const [h, m] = clock.split(":").map(Number);
  const hours = (h % 12) + (meridiem === "PM" ? 12 : 0);
  return hours * 60 + m;
};

type DayGroup = { day: number; date: string; events: EventEntry[] };

// The fest runs 14 to 17 October, so every day gets a tab even if it has no events yet.
const FEST_DAYS = [
  { day: 1, date: "14 Oct" },
  { day: 2, date: "15 Oct" },
  { day: 3, date: "16 Oct" },
  { day: 4, date: "17 Oct" },
];

const buildDays = (): DayGroup[] =>
  FEST_DAYS.map(({ day, date }) => ({
    day,
    date,
    events: EVENTS.filter((e) => parseDay(e.chips[0]).day === day).sort(
      (a, b) => toMinutes(a.chips[1]) - toMinutes(b.chips[1]),
    ),
  }));

const universeName = (key: UniverseKey) => UNIVERSES.find((u) => u.key === key)?.name ?? key;

const TimetableRow = ({ event, shadow }: { event: EventEntry; shadow: string }) => {
  const [time, meridiem] = event.chips[1].split(" ");
  const venue = event.chips[2];
  const team = event.chips[3];
  return (
    <article
      className="grid grid-cols-[104px_1fr] gap-4 border-3 border-brut-ink bg-white p-4 lg:grid-cols-[170px_1fr_260px] lg:items-center lg:gap-8 lg:p-5"
      style={{ boxShadow: `6px 6px 0px 0px ${shadow}` }}
    >
      <div className="flex flex-col items-start border-3 border-brut-ink bg-brut-cream px-3 py-2">
        <span className="font-anton text-[30px] leading-[0.95] text-brut-ink lg:text-[38px]">{time}</span>
        <span className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] text-[#1f5fd6]">{meridiem}</span>
      </div>

      <div className="flex min-w-0 flex-col items-start gap-2">
        <span className="bg-brut-ink px-2 py-[3px] font-roboto-mono text-[11px] tracking-[0.66px] text-brut-cream uppercase">
          {universeName(event.universe)}
        </span>
        <h3 className="font-anton text-[28px] leading-[0.95] text-brut-ink uppercase lg:text-[36px]">{event.title}</h3>
        <p className="font-inter text-[14px] leading-normal text-brut-body">{event.description}</p>
        <p className="font-inter text-[12px] text-[#6b675c] lg:hidden">{venue} · {team}</p>
      </div>

      <div className="hidden flex-col items-start gap-2 lg:flex">
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] text-brut-ink">{venue}</span>
        <span className="border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] text-brut-ink">{team}</span>
        <span className="font-inter text-[12px] text-[#6b675c]">Open to: {event.openTo ?? "All streams"}</span>
      </div>
    </article>
  );
};

export default function Timetable({ onNavigate }: TimetablePageProps) {
  const days = useMemo(() => buildDays(), []);
  const [activeDay, setActiveDay] = useState(days[0]?.day ?? 1);
  const [universe, setUniverse] = useState<UniverseKey | "all">("all");

  const current = days.find((d) => d.day === activeDay) ?? days[0];
  const visible = current.events.filter((e) => universe === "all" || e.universe === universe);
  const countFor = (key: UniverseKey | "all") =>
    current.events.filter((e) => key === "all" || e.universe === key).length;

  return (
    <BrutPage>
      <AppNav onNavigate={onNavigate} page="timetable" />
      <main className="mx-auto w-full max-w-[1440px] px-4 lg:px-14">
        <div className="flex flex-col gap-6 pt-[30px] pb-6 lg:flex-row lg:items-end lg:justify-between lg:pt-[60px]">
          <div className="flex flex-col gap-4">
            <div className="w-fit border-3 border-brut-ink bg-brut-cream px-3 py-1.5 drop-shadow-[5px_5px_0px_#2db84d]">
              <p className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] text-brut-ink uppercase">14 - 17 Oct 2026 · {SITE.venue}</p>
            </div>
            <h1 className="font-anton text-[84px] leading-[0.9] text-brut-ink uppercase lg:text-[170px]">
              Time<span className="text-[#1f5fd6]">table</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={SITE.downloads.timetable} download>
              <Button variant="cream" large>Download PDF</Button>
            </a>
            <Button variant="ink" large onClick={() => onNavigate("events")}>See all events</Button>
          </div>
        </div>

        {/* Day switcher */}
        <div role="tablist" aria-label="Fest day" className="flex flex-wrap gap-3 pb-6">
          {days.map((d) => {
            const selected = d.day === activeDay;
            return (
              <button
                key={d.day}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveDay(d.day)}
                className={`flex cursor-pointer flex-col items-start border-3 border-brut-ink px-5 py-3 text-left ${
                  selected
                    ? "bg-brut-ink text-brut-cream drop-shadow-[6px_6px_0px_#59a7ff]"
                    : "bg-white text-brut-ink drop-shadow-[6px_6px_0px_#12110f]"
                }`}
              >
                <span className="font-anton text-[34px] leading-[0.95] uppercase">Day {d.day}</span>
                <span className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] uppercase">{d.date}</span>
              </button>
            );
          })}
        </div>

        {/* Universe filter */}
        <div role="group" aria-label="Filter by universe" className="flex flex-wrap items-center gap-2.5 pb-7">
          {[{ key: "all" as const, name: "All" }, ...UNIVERSES].map((u) => {
            const selected = universe === u.key;
            return (
              <button
                key={u.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setUniverse(u.key)}
                className={`cursor-pointer border-2 border-brut-ink px-3.5 py-1.5 font-roboto-mono text-[12px] font-bold uppercase ${
                  selected ? "bg-brut-ink text-brut-cream" : "bg-brut-cream text-brut-ink"
                }`}
              >
                {u.name} <span className="opacity-70">({countFor(u.key)})</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-6 pb-[60px] lg:pb-[100px]">
          {current.events.length === 0 && (
            <p className="border-3 border-dashed border-brut-ink bg-brut-cream p-6 font-inter text-[16px] text-brut-body">
              The timetable for {current.date} is coming soon.
            </p>
          )}
          {current.events.length > 0 && visible.length === 0 && (
            <p className="border-3 border-dashed border-brut-ink bg-brut-cream p-6 font-inter text-[16px] text-brut-body">
              No events in this universe on this day. Pick another day or choose All.
            </p>
          )}
          {visible.map((event, i) => (
            <TimetableRow key={event.title} event={event} shadow={ROW_SHADOWS[i % ROW_SHADOWS.length]} />
          ))}
        </div>
      </main>
      <BrutFooter />
    </BrutPage>
  );
}
