import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import SectionHeader from "./SectionHeader";

const FAQS = [
  {
    question: "Who organizes TechTatva?",
    answer:
      "TechTatva is the annual technical fest of Manipal Institute of Technology, bringing together technology, innovation and competition on a common platform.",
  },
  {
    question: "How many events are there?",
    answer: "This year, 16 categories and 34 events unfold across four alternate realities.",
  },
  {
    question: "What are the four realities?",
    answer:
      "Aether, Obsidian, Ember and Zenith — each defined by its own atmosphere, identity and force.",
  },
  {
    question: "Can students from non-MAHE colleges participate?",
    answer: "[Needed: FAQ answer]",
  },
  {
    question: "Where do I send queries or grievances?",
    answer: "Write to techsec.scmit@manipal.edu.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-12">
        <SectionHeader eyebrow="Questions" title="FAQ" />

        <div
          data-aos="fade-up"
          className="flex w-full flex-col gap-3 rounded-[28px] border border-[rgba(181,240,255,0.6)] bg-[linear-gradient(to_bottom,#153d79_0%,#022554_45%,#01112b_100%)] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`flex flex-col gap-3 rounded-[20px] border px-8 py-6 transition-colors ${
                  isOpen
                    ? "border-[rgba(181,240,255,0.6)] bg-[rgba(240,247,255,0.12)]"
                    : "border-[rgba(240,247,255,0.12)] bg-[rgba(240,247,255,0.04)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="font-display text-xl font-bold text-[#deebfa]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-full p-2 ${
                      isOpen ? "bg-[#f0f7ff] text-[#022554]" : "bg-[rgba(240,247,255,0.08)] text-[#f0f7ff]"
                    }`}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                {isOpen && (
                  <p className="text-base leading-relaxed text-white/80">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
