import { useState } from "react";
import { AppNav, BrutFooter, BrutPage, Button } from "../components/Brut";
import { UNIVERSES, type UniverseKey } from "../data/events";
import { CATEGORY_REALITY, categoryLogoSrc, type TimetableRow } from "../data/timetable";
import { useTimetableRows } from "../lib/liveData";

type TimetablePageProps = {
  onNavigate: (page: string) => void;
};

// The fest runs 14 to 17 October, so every day gets a tab even if it has no events yet.
const FEST_DAYS = ["14 Oct", "15 Oct", "16 Oct", "17 Oct"];

// "9:00 AM" -> minutes since midnight, so rounds sort in clock order. Full-day rows have no start and sort first.
const toMinutes = (time: string | null) => {
  if (!time) return -1;
  const [clock, meridiem] = time.split(" ");
  const [h, m] = clock.split(":").map(Number);
  return ((h % 12) + (meridiem === "PM" ? 12 : 0)) * 60 + m;
};

// Time block on the left: the start time, or the duration for full-day events.
const TimeBlock = ({ row }: { row: TimetableRow }) => {
  if (!row.start) {
    return (
      <div className="flex flex-col items-start border-3 border-brut-ink bg-brut-cream px-3 py-2">
        <span className="font-anton text-[24px] leading-[0.95] text-brut-ink lg:text-[30px]">Full day</span>
      </div>
    );
  }
  const [time, meridiem] = row.start.split(" ");
  return (
    <div className="flex flex-col items-start border-3 border-brut-ink bg-brut-cream px-3 py-2">
      <span className="font-anton text-[30px] leading-[0.95] text-brut-ink lg:text-[38px]">{time}</span>
      <span className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] text-[#1f5fd6]">{meridiem}</span>
    </div>
  );
};

const TimetableCard = ({ row }: { row: TimetableRow }) => (
  <article
    className="grid min-w-0 grid-cols-[104px_minmax(0,1fr)] gap-4 border-3 border-brut-ink bg-white p-4 lg:grid-cols-[170px_minmax(0,1fr)_260px] lg:items-center lg:gap-8 lg:p-5"
    style={{ boxShadow: "6px 6px 0px 0px #12110f" }}
  >
    <TimeBlock row={row} />

    <div className="flex min-w-0 flex-col items-start gap-2">
      <span className="flex items-center gap-2 bg-brut-ink py-[3px] pr-2.5 pl-[3px] font-roboto-mono text-[11px] tracking-[0.66px] text-brut-cream uppercase">
        <img src={categoryLogoSrc(row.category)} alt="" aria-hidden="true" className="size-[22px] rounded-full object-cover" />
        {row.category}
      </span>
      <h3 className="font-anton text-[28px] leading-[0.95] text-brut-ink uppercase lg:text-[36px]">{row.event}</h3>
      <p className="font-inter text-[14px] leading-normal text-brut-body">Round {row.round}</p>
      <p className="font-inter text-[12px] break-words text-[#6b675c] lg:hidden">
        {row.venue}
        {row.end && ` · ${row.start} to ${row.end}`}
      </p>
    </div>

    <div className="hidden min-w-0 flex-col items-start gap-2 lg:flex">
      <span className="max-w-full break-words border-2 border-brut-ink bg-brut-cream px-3 py-1.5 font-roboto-mono text-[12px] text-brut-ink">{row.venue}</span>
      {row.start && row.end && (
        <span className="font-inter text-[12px] text-[#6b675c]">
          {row.start} to {row.end}
        </span>
      )}
      {row.duration && <span className="font-inter text-[12px] text-[#6b675c]">{row.duration}</span>}
    </div>
  </article>
);

export default function Timetable({ onNavigate }: TimetablePageProps) {
  const { data: timetable, error: timetableError } = useTimetableRows();
  const status = timetable ? null : timetableError ? "error" : "loading";
  const rows = timetable ?? [];
  const [activeDate, setActiveDate] = useState(FEST_DAYS[0]);
  const [reality, setReality] = useState<UniverseKey | "all">("all");

  const dayRows = rows.filter((r) => r.date === activeDate);
  const visible = dayRows
    .filter((r) => reality === "all" || CATEGORY_REALITY[r.category] === reality)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  const filters = [
    { key: "all" as const, name: "All", color: "#12110f" },
    ...UNIVERSES.map((u) => ({ key: u.key, name: u.name, color: u.shadow })),
  ];

  return (
    <BrutPage>
      <AppNav onNavigate={onNavigate} page="timetable" />
      <main className="mx-auto w-full max-w-[1440px] px-4 lg:px-14">
        <div className="flex flex-col gap-6 pt-[30px] pb-6 lg:flex-row lg:items-end lg:justify-between lg:pt-[60px]">
          <h1 className="font-anton text-[84px] leading-[0.9] text-brut-ink uppercase lg:text-[170px]">
            Time<span className="text-[#1f5fd6]">table</span>
          </h1>
          <div className="flex flex-wrap gap-3">
            <Button variant="ink" large onClick={() => onNavigate("events")}>See all events</Button>
          </div>
        </div>

        {status ? (
          <p className="mt-8 mb-[60px] border-3 border-dashed border-brut-ink bg-brut-cream p-6 font-inter text-[16px] text-brut-body lg:mt-10 lg:mb-[100px]">
            {status === "error"
              ? "The timetable couldn't load right now. Refresh the page to try again."
              : "Loading the timetable…"}
          </p>
        ) : (
          <>
        {/* Phone and tablet: dropdowns for the day and reality filters */}
        <div className="flex flex-col gap-3 pb-6 lg:hidden">
          <label className="flex flex-col gap-1.5">
            <span className="font-roboto-mono text-[11px] font-bold tracking-[0.66px] text-brut-ink uppercase">Day</span>
            <select
              value={activeDate}
              onChange={(event) => setActiveDate(event.target.value)}
              className="w-full cursor-pointer border-3 border-brut-ink bg-white px-4 py-3 font-anton text-[22px] text-brut-ink uppercase drop-shadow-[4px_4px_0px_#12110f]"
            >
              {FEST_DAYS.map((date, i) => (
                <option key={date} value={date}>{`Day ${i + 1} · ${date}`}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-roboto-mono text-[11px] font-bold tracking-[0.66px] text-brut-ink uppercase">Reality</span>
            <select
              value={reality}
              onChange={(event) => setReality(event.target.value as UniverseKey | "all")}
              style={{ backgroundColor: filters.find((f) => f.key === reality)?.color }}
              className={`w-full cursor-pointer border-3 border-brut-ink px-4 py-3 font-anton text-[22px] uppercase drop-shadow-[4px_4px_0px_#12110f] ${
                reality === "all" ? "text-brut-cream" : "text-brut-ink"
              }`}
            >
              {filters.map((f) => (
                <option key={f.key} value={f.key}>{f.name}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Desktop: day switcher */}
        <div role="tablist" aria-label="Fest day" className="hidden flex-wrap gap-3 pb-6 lg:flex">
          {FEST_DAYS.map((date, i) => {
            const selected = date === activeDate;
            return (
              <button
                key={date}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveDate(date)}
                className={`flex cursor-pointer flex-col items-start border-3 border-brut-ink px-5 py-3 text-left ${
                  selected
                    ? "bg-brut-ink text-brut-cream drop-shadow-[6px_6px_0px_#59a7ff]"
                    : "bg-white text-brut-ink drop-shadow-[6px_6px_0px_#12110f]"
                }`}
              >
                <span className="font-anton text-[34px] leading-[0.95] uppercase">Day {i + 1}</span>
                <span className="font-roboto-mono text-[12px] font-bold tracking-[0.6px] uppercase">{date}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop: reality filter */}
        <div role="group" aria-label="Filter by reality" className="hidden flex-wrap items-center gap-2.5 pb-7 lg:flex">
          {filters.map((f) => {
            const selected = reality === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setReality(f.key)}
                className={`cursor-pointer border-2 border-brut-ink px-3.5 py-1.5 font-roboto-mono text-[12px] font-bold uppercase ${
                  selected ? (f.key === "all" ? "text-brut-cream" : "text-brut-ink") : "bg-brut-cream text-brut-ink"
                }`}
                style={selected ? { backgroundColor: f.color } : undefined}
              >
                {f.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-6 pb-[60px] lg:pb-[100px]">
          {dayRows.length === 0 && (
            <p className="border-3 border-dashed border-brut-ink bg-brut-cream p-6 font-inter text-[16px] text-brut-body">
              The timetable for {activeDate} is coming soon.
            </p>
          )}
          {dayRows.length > 0 && visible.length === 0 && (
            <p className="border-3 border-dashed border-brut-ink bg-brut-cream p-6 font-inter text-[16px] text-brut-body">
              No events in this reality on this day. Pick another day or choose All.
            </p>
          )}
          {visible.map((row) => (
            <TimetableCard key={`${row.event}-${row.round}-${row.date}-${row.start}`} row={row} />
          ))}
        </div>
          </>
        )}
      </main>
      <BrutFooter />
    </BrutPage>
  );
}
