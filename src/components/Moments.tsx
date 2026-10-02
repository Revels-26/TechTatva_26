import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const ROW_1 = [
  { src: "/assets/gallery/robowars.png", alt: "Robowars" },
  { src: "/assets/gallery/cosmic-con.png", alt: "Cosmic Con" },
  { src: "/assets/gallery/kernel.png", alt: "Kernel" },
];

const Moments = () => {
  return (
    <section className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <SectionHeader eyebrow="Moments frozen in time" title="Gallery" />

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {ROW_1.map((photo) => (
            <div
              key={photo.alt}
              data-aos="fade-up"
              className="h-[280px] overflow-hidden rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
            >
              <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-5">
          <div
            data-aos="fade-up"
            className="h-[280px] overflow-hidden rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.5)] sm:col-span-2"
          >
            <img
              src="/assets/gallery/kraftwagen.png"
              alt="Kraftwagen"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            data-aos="fade-up"
            className="h-[280px] overflow-hidden rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.5)] sm:col-span-3"
          >
            <img src="/assets/gallery/quark.png" alt="Quark" className="h-full w-full object-cover" />
          </div>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-[#004aad] bg-[rgba(240,247,255,0.6)] px-5 py-3 font-label text-[10px] uppercase tracking-[1.2px] text-[#022554] transition-colors hover:bg-white"
        >
          View all
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </a>
      </div>
    </section>
  );
};

export default Moments;
