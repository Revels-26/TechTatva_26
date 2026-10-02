import { ArrowUpRight, ShoppingBag } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { SITE } from "../config/site";

const Merchandise = () => {
  return (
    <section className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <SectionHeader eyebrow="Show your support" title="Merchandise" />

        <div
          data-aos="fade-up"
          className="flex w-full flex-col items-center gap-12 overflow-hidden rounded-[28px] border border-[rgba(181,240,255,0.6)] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)] md:flex-row md:p-12"
          style={{
            background:
              "radial-gradient(circle, rgba(12,135,192,1) 0%, rgba(15,84,142,1) 50%, rgba(16,58,116,1) 75%, rgba(17,32,91,1) 100%)",
          }}
        >
          <div className="h-60 w-60 shrink-0 sm:h-80 sm:w-80">
            <img
              src="/assets/merch/astronaut.png"
              alt="TechTatva '26 official merchandise"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col items-start gap-4">
            <p className="font-label text-[9px] uppercase tracking-[1.62px] text-[#b5f0ff]">
              Official collection
            </p>
            <p className="font-display text-4xl font-semibold text-[#deebfa] sm:text-5xl">
              TechTatva &apos;26 Merch
            </p>
            <p className="max-w-xl text-base leading-relaxed text-white/80">
              The Official TechTatva &apos;26 Merchandise. Also available bundled with the
              Flagship and General passes.
            </p>
            <p className="text-sm font-semibold text-white/64">
              Price: [Needed: merch price]
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                href={SITE.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                icon={<ShoppingBag size={16} strokeWidth={2.5} />}
              >
                Buy merch
              </Button>
              <Button
                href={SITE.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
                icon={<ArrowUpRight size={16} strokeWidth={2.5} />}
              >
                View collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Merchandise;
