import { useState } from "react";
import { REALITIES } from "../data/realities";

interface RealityFilterProps {
  onChange?: (realityId: string | null) => void;
}

const RealityFilter = ({ onChange }: RealityFilterProps) => {
  const [active, setActive] = useState<string | null>(null);

  const select = (id: string | null) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-[rgba(2,37,84,0.12)] bg-[rgba(240,247,255,0.6)] p-1">
      <button
        type="button"
        onClick={() => select(null)}
        className={`rounded-full px-6 py-3 font-label text-[11px] uppercase tracking-[1.54px] transition-colors ${
          active === null
            ? "border border-[#004aad] bg-[rgba(2,37,84,0.08)] text-[#022554] shadow-[0_0_24px_rgba(0,74,173,0.2)]"
            : "text-[rgba(2,37,84,0.84)] hover:text-[#022554]"
        }`}
      >
        All
      </button>
      {REALITIES.map((reality) => (
        <button
          key={reality.id}
          type="button"
          onClick={() => select(reality.id)}
          className={`rounded-full px-6 py-3 font-label text-[11px] uppercase tracking-[1.54px] transition-colors ${
            active === reality.id
              ? "border bg-[rgba(2,37,84,0.08)] text-[#022554]"
              : "text-[rgba(2,37,84,0.84)] hover:text-[#022554]"
          }`}
          style={active === reality.id ? { borderColor: reality.accent } : undefined}
        >
          {reality.name}
        </button>
      ))}
    </div>
  );
};

export default RealityFilter;
