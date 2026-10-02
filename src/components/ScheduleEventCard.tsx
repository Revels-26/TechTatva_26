import { Clock, MapPin, Trophy } from "lucide-react";
import type { ScheduleEvent } from "../data/events";

const STATUS_STYLES: Record<ScheduleEvent["status"], string> = {
  Ongoing: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
  "Closing Soon": "bg-amber-400/10 text-amber-300 border-amber-400/30",
  Closed: "bg-gray-400/10 text-gray-400 border-gray-400/30",
};

const ScheduleEventCard = ({ event }: { event: ScheduleEvent }) => {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
          {event.category}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[event.status]}`}
        >
          {event.status}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-white">
        {event.title}
      </h3>
      {event.round && <p className="text-xs text-gray-500">{event.round}</p>}
      <p className="mt-2 flex-1 text-sm text-gray-400">{event.description}</p>

      <div className="mt-4 flex flex-col gap-1.5 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-cyan-400" /> {event.venue}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-cyan-400" /> {event.date}, {event.time}
        </span>
        <span className="flex items-center gap-1.5">
          <Trophy size={14} className="text-cyan-400" /> {event.cashPrize}
        </span>
      </div>
    </div>
  );
};

export default ScheduleEventCard;
