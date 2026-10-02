import SectionHeader from "./SectionHeader";
import { REALITIES } from "../data/realities";

const EventCategories = () => {
  return (
    <section id="realities" className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16">
        <SectionHeader
          eyebrow="Convergence"
          title="Four Realities"
          description="What if technology could exist across different realities? Sixteen categories come alive across four alternate worlds, each defined by its own atmosphere, identity and force."
        />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REALITIES.map((reality, i) => (
            <div
              key={reality.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="flex flex-col items-center gap-4 rounded-[20px] border border-[rgba(181,240,255,0.6)] px-6 py-8 text-center"
              style={{ background: reality.gradient }}
            >
              <div
                className="relative h-40 w-40 overflow-hidden rounded-full"
                style={{ background: reality.gradient }}
              >
                <img
                  src={reality.baseImage}
                  alt=""
                  className="absolute inset-[-16%] h-[132%] w-[132%] object-cover opacity-85 mix-blend-screen"
                />
                <img
                  src={reality.accentImage}
                  alt=""
                  className="absolute inset-[16%] h-[68%] w-[68%] object-contain mix-blend-screen"
                />
              </div>

              <p
                className="font-label text-[9px] uppercase tracking-[1.62px]"
                style={{ color: reality.accent }}
              >
                {reality.numeral}
              </p>

              <p
                className="font-display text-5xl font-semibold text-[#deebfa]"
                style={{ textShadow: `0 0 32px ${reality.glow}` }}
              >
                {reality.name}
              </p>

              <p className="font-label text-[11px] uppercase tracking-[1.54px] text-[#f0f7ff]">
                {reality.domain}
              </p>

              <p className="text-base leading-relaxed text-white/80">{reality.description}</p>

              <div className="h-px w-full bg-[rgba(240,247,255,0.12)]" />

              <p className="font-label text-[9px] uppercase tracking-[1.62px] text-white/64">
                {reality.categories.join(" · ")}
              </p>
            </div>
          ))}
        </div>

        <p
          data-aos="fade-up"
          className="text-center font-display text-2xl font-bold text-[#022554] sm:text-3xl"
        >
          Four realities. Sixteen categories. One timeline.
        </p>
      </div>
    </section>
  );
};

export default EventCategories;
