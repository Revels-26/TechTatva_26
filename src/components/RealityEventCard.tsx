import { ArrowUpRight, Calendar, Layers, Users } from "lucide-react";
import type { FeaturedEvent } from "../data/featuredEvents";
import { REALITIES } from "../data/realities";
import { SITE } from "../config/site";

const RealityEventCard = ({ event }: { event: FeaturedEvent }) => {
  const reality = REALITIES.find((r) => r.id === event.realityId)!;

  return (
    <div
      data-aos="fade-up"
      className="flex flex-1 flex-col overflow-hidden rounded-[20px] border border-[rgba(181,240,255,0.6)]"
      style={{ background: reality.gradient }}
    >
      <div className="relative h-[200px] w-full overflow-hidden">
        <img src={event.media} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,17,43,0)_0%,#01112b_100%)] opacity-85" />
        <div className="absolute left-5 top-5">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1"
            style={{ borderColor: reality.tagBorder, background: reality.tagBg }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: reality.accent }} />
            <span
              className="font-label text-[9px] uppercase tracking-[1.62px]"
              style={{ color: reality.accent }}
            >
              {reality.name}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-start gap-4 p-6">
        <p
          className="font-label text-[9px] uppercase tracking-[1.62px]"
          style={{ color: reality.accent }}
        >
          {event.category}
        </p>
        <p className="font-display text-[28px] font-bold uppercase tracking-[0.84px] text-[#deebfa]">
          {event.title}
        </p>
        <p className="text-sm leading-relaxed text-white/80">{event.description}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <Users size={18} />
            {event.team}
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <Layers size={18} />
            {event.rounds}
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <Calendar size={18} />
            {event.when}
          </span>
        </div>

        <div className="h-px w-full bg-[rgba(240,247,255,0.12)]" />

        <div className="flex w-full items-center gap-4">
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="font-label text-[9px] uppercase tracking-[1.62px] text-white/64">
              Prize pool
            </p>
            <p className="text-2xl font-bold tracking-[-0.12px]" style={{ color: reality.accent }}>
              {event.prizePool}
            </p>
          </div>
          <a
            href={SITE.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-label text-[10px] uppercase tracking-[1.2px] transition-transform hover:scale-105"
            style={{ borderColor: reality.tagBorder, background: reality.soft, color: reality.onSoft }}
          >
            Register
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RealityEventCard;
