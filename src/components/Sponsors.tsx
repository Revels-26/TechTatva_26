import SectionHeader from "./SectionHeader";

const SPONSOR_SLOTS = 7;

const Sponsors = () => {
  return (
    <section id="sponsors" className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <SectionHeader eyebrow="Powered by" title="Sponsors" />

        <div className="flex flex-wrap items-center justify-center gap-4">
          {Array.from({ length: SPONSOR_SLOTS }, (_, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 50}
              className="flex h-24 w-[140px] items-center justify-center rounded-[20px] border border-dashed border-[rgba(2,37,84,0.2)] bg-[rgba(240,247,255,0.5)] px-3 text-center"
            >
              <p className="text-xs font-medium tracking-[0.12px] text-[rgba(2,37,84,0.7)]">
                [Needed: sponsor logo]
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
