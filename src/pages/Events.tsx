import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EVENTS, EVENT_CATEGORIES } from "../data/events";
import ScheduleEventCard from "../components/ScheduleEventCard";

const Events = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return EVENTS.filter((event) => {
      const matchesQuery = event.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || event.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen w-full bg-[#05070d] pb-24 pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <div data-aos="fade-up" className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
            Full Schedule
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            Events
          </h1>
          <p className="mt-4 text-gray-400">
            Placeholder schedule — swap in the real lineup once finalized.
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-full border border-white/10 bg-white/[0.02] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div
          data-aos="fade-up"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((event) => (
            <ScheduleEventCard key={event.id} event={event} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-gray-500">
            No events match your search.
          </p>
        )}
      </section>
    </div>
  );
};

export default Events;
