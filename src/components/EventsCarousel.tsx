import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import RealityFilter from "./RealityFilter";
import RealityEventCard from "./RealityEventCard";
import { FEATURED_EVENTS } from "../data/featuredEvents";

const EventsCarousel = () => {
  const [realityId, setRealityId] = useState<string | null>(null);

  const events = useMemo(
    () => (realityId ? FEATURED_EVENTS.filter((e) => e.realityId === realityId) : FEATURED_EVENTS),
    [realityId]
  );

  return (
    <section id="events" className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <SectionHeader
          eyebrow="34 events · 16 categories"
          title="Events"
          description="Check out the line-up, from machines and markets to AI, cybersecurity, science and strategy."
        />

        <RealityFilter onChange={setRealityId} />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <RealityEventCard key={event.id} event={event} />
          ))}
        </div>

        <a
          href="/events"
          className="inline-flex items-center gap-3 rounded-full border border-[rgba(2,37,84,0.12)] bg-[#f0f7ff] px-8 py-5 font-label text-xs uppercase tracking-[1.44px] text-[#022554] shadow-[0_4px_16px_rgba(2,37,84,0.15)] transition-transform hover:scale-105"
        >
          View all 34 events
          <ArrowUpRight size={20} strokeWidth={2.5} />
        </a>
      </div>
    </section>
  );
};

export default EventsCarousel;
