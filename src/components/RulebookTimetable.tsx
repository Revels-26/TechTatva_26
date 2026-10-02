import { Download } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { SITE } from "../config/site";

const CARDS = [
  {
    title: "Rulebook",
    description: "Complete event guidelines, rules and regulations for TechTatva '26.",
    actionLabel: "Download rulebook",
    href: SITE.downloads.brochure,
  },
  {
    title: "Timetable",
    description: "The full TechTatva '26 timetable. [Needed: timetable file]",
    actionLabel: "Download timetable",
    href: SITE.downloads.timetable,
  },
];

const RulebookTimetable = () => {
  return (
    <section className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
        <SectionHeader eyebrow="Downloads" title="Rulebook & Timetable" />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {CARDS.map((card) => (
            <div
              key={card.title}
              data-aos="fade-up"
              className="flex flex-col items-start gap-4 rounded-[20px] border border-[rgba(181,240,255,0.6)] bg-[linear-gradient(to_bottom,#153d79_0%,#022554_45%,#01112b_100%)] p-8"
            >
              <p className="font-display text-3xl font-bold text-[#deebfa]">{card.title}</p>
              <p className="text-base leading-relaxed text-white/80">{card.description}</p>
              <Button
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                icon={<Download size={16} strokeWidth={2.5} />}
              >
                {card.actionLabel}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RulebookTimetable;
