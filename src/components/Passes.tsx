import SectionHeader from "./SectionHeader";
import FeatureCard from "./FeatureCard";
import { SITE } from "../config/site";

const PASSES = [
  {
    id: "flagship",
    media: "/assets/passes/flagship.png",
    eyebrow: "Event pass",
    title: "Flagship",
    description: "[Needed: pass inclusions]",
    price: "₹450",
    actionLabel: "Get pass",
  },
  {
    id: "general",
    media: "/assets/passes/general.png",
    eyebrow: "Event pass",
    title: "General",
    description: "[Needed: pass inclusions]",
    price: "₹250",
    actionLabel: "Get pass",
  },
  {
    id: "conclave",
    media: "/assets/passes/conclave.png",
    eyebrow: "Conclave",
    title: "Conclave",
    description: "Join the Conclave and tap into the knowledge of industry experts.",
    price: "[Needed: price]",
    actionLabel: "Buy ticket",
  },
];

const Passes = () => {
  return (
    <section className="relative w-full bg-[#f0f7ff] px-6 py-24 md:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16">
        <SectionHeader eyebrow="Access" title="Passes" />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PASSES.map((pass) => (
            <FeatureCard key={pass.id} {...pass} href={SITE.registerUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Passes;
